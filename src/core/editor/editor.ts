import { KeyBindingManager } from './key_binding_manager';
import { Setting } from './setting';

interface IEditorOptions {
  containerElement: HTMLDivElement;
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
}

export class Editor {
  containerElement: HTMLDivElement;
  canvasElement: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  setting: Setting;

  keybindingManager: KeyBindingManager;
  constructor(options) {
    const { containerElement, clientX, clientY, width, height } = options;
    this.containerElement = containerElement;
    this.canvasElement = document.createElement('canvas');
    this.containerElement.appendChild(this.canvasElement);
    this.ctx = this.canvasElement.getContext('2d')!;

    this.setting = new Setting();
    if (options.offsetX) {
      this.setting.set('offsetX', options.offsetX);
    }
    if (options.offsetY) {
      this.setting.set('offsetY', options.offsetY);
    }

    this.keybindingManager = new KeyBindingManager(this);
    this.keybindingManager.bindEvent();
  }
}
