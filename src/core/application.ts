export enum EEventType {
  MOUSE_DOWN = 'mousedown',
  MOUSE_MOVE = 'mousemove',
  MOUSE_UP = 'mouseup',
  KEYBOARD_DOWN = 'keydown',
  KEYBOARD_PRESS = 'keypress',
  KEYBOARD_UP = 'keyup',
}

export class Application implements EventListenerObject {
  public canvas: HTMLCanvasElement;
  private _start: boolean = false;
  private _requestId: number = -1;
  private _startTime: number = -1;
  private _lastTime: number = -1;
  private _fps: number = 0;

  public isSupportMouseMove: boolean;
  protected _isMouseDown: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.canvas.addEventListener(EEventType.MOUSE_DOWN, this, false);
    this.canvas.addEventListener(EEventType.MOUSE_MOVE, this, false);
    this.canvas.addEventListener(EEventType.MOUSE_UP, this, false);

    window.addEventListener(EEventType.KEYBOARD_DOWN, this, false);
    window.addEventListener(EEventType.KEYBOARD_PRESS, this, false);
    window.addEventListener(EEventType.KEYBOARD_UP, this, false);

    this._isMouseDown = false;
    this.isSupportMouseMove = false;
  }

  private init() {
    this._start = false; // 是否处于动画循环
    this._requestId = -1; // request
    this._startTime = -1;
    this._lastTime = -1;
  }

  public get fps() {
    return this._fps;
  }

  public start() {
    this.init();
    this._start = true;
    this._requestId = requestAnimationFrame((timestamp: number) => {
      this.step(timestamp);
    });
  }

  public step(timestamp) {
    if (this._startTime === -1) this._startTime = timestamp;
    if (this._lastTime === -1) this._lastTime = timestamp;
    let elapsedMsec = timestamp - this._startTime;
    let intervalSec = timestamp - this._lastTime;

    if (intervalSec !== 0) {
      this._fps = 1000.0 / intervalSec;
    }
    intervalSec /= 1000;
    this._lastTime = timestamp;

    this.update(elapsedMsec, intervalSec);
    this.render();
    this._requestId = requestAnimationFrame((elapsedMsec: number) => {
      this.step(elapsedMsec);
    });
  }

  public stop(): void {
    if (this._start === true) {
      cancelAnimationFrame(this._requestId);
      this.init();
    }
  }

  public update(elapsedMsec: number, intervalSec: number): void {}

  public render(): void {}

  public handleEvent(ev: Event): void {
    switch (ev.type) {
      case EEventType.MOUSE_DOWN:
        this._isMouseDown = true;
        this.dispatchMouseDown(ev as MouseEvent);
        break;
      case EEventType.MOUSE_MOVE:
        this._isMouseDown && this.dispatchMouseMove(ev as MouseEvent);
        break;
      case EEventType.MOUSE_UP:
        this._isMouseDown = false;
        this.dispatchMouseUp(ev as MouseEvent);
        break;
      case EEventType.KEYBOARD_DOWN:
        this.dispatchKeyUp(ev as KeyboardEvent);
        break;
      case EEventType.KEYBOARD_PRESS:
        this.dispatchKeyPress(ev as KeyboardEvent);
        break;
      case EEventType.KEYBOARD_UP:
        this.dispatchKeyDown(ev as KeyboardEvent);
        break;
    }
  }

  protected dispatchMouseDown(ev: MouseEvent): void {
    return;
  }

  protected dispatchMouseUp(ev: MouseEvent): void {
    return;
  }

  protected dispatchMouseMove(ev: MouseEvent): void {
    return;
  }

  protected dispatchKeyDown(ev: KeyboardEvent): void {
    return;
  }

  protected dispatchKeyUp(ev: KeyboardEvent): void {
    return;
  }

  protected dispatchKeyPress(ev: KeyboardEvent): void {
    return;
  }
}
