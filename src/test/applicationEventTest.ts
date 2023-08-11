import { Application } from '../core/application';
class ApplicationEventTest extends Application {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  protected dispatchMouseDown(ev: MouseEvent): void {
    console.log('mouse down');
  }

  protected dispatchMouseMove(ev: MouseEvent): void {
    console.log('mouse move');
  }

  protected dispatchMouseUp(ev: MouseEvent): void {
    console.log('mouse up');
  }

  protected dispatchKeyDown(ev: KeyboardEvent): void {
    console.log(`key down, ${ev.key}`);
  }

  protected dispatchKeyPress(ev: KeyboardEvent): void {
    console.log(`key press, ${ev.key}`);
  }

  protected dispatchKeyUp(ev: KeyboardEvent): void {
    console.log(`key up, ${ev.key}`);
  }
}

const canvas = document.querySelector('#root') as HTMLCanvasElement;
const app = new ApplicationEventTest(canvas);
app.start();
