import { Editor } from './editor';

interface IKey {
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  keyCode: string; //
}
interface IWhenCtx {
  isToolDragging: boolean;
}

interface IKeyBinding {
  key: IKey | IKey[];
  winKey?: IKey | IKey[];
  when?: (ctx: IWhenCtx) => boolean;
  actionName: string;
  action: (e: KeyboardEvent) => void;
}

export class KeyBindingManager {
  private keyBindingMap = new Map<number, IKeyBinding>();
  private isBound = false;
  private id = 0;
  constructor(private editor: Editor) {}
  private handleAction = (e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    let isMatch = false;
    const ctx: IWhenCtx = {
      isToolDragging: this.editor.toolManager.isDragging,
    };

    for (const keyBinding of this.keyBindingMap.values()) {
      // match when
      if (!keyBinding.when || keyBinding.when(ctx)) {
        // match windows os
        if (isWindows && keyBinding.winKey) {
          if (this.isKeyMatch(keyBinding.winKey, e)) {
            isMatch = true;
          }
        }
        // match other os
        else if (this.isKeyMatch(keyBinding.key, e)) {
          isMatch = true;
        }
      }

      if (isMatch) {
        e.preventDefault();
        console.log(`[${getKeyStr(e)}] => ${keyBinding.actionName}`);
        keyBinding.action(e);
        break;
      }
    }

    if (!isMatch) {
      console.log(`[${getKeyStr(e)}] => no match`);
    }
  };

  //
  private isKeyMatch(key: IKey | IKey[], e: KeyboardEvent): boolean {
    if (Array.isArray(key)) {
      return key.some((k) => this.isKeyMatch(k, e));
    }

    if (key.keyCode == '*') return true;

    const {
      ctrlKey = false,
      shiftKey = false,
      altKey = false,
      metaKey = false,
    } = key;

    return (
      ctrlKey == e.ctrlKey &&
      shiftKey == e.shiftKey &&
      altKey == e.altKey &&
      metaKey == e.metaKey &&
      key.keyCode == e.code
    );
  }
  bindEvent() {
    if (this.isBound) return;
    this.isBound = true;
    document.addEventListener('keydown', this.handleAction);
  }
}
