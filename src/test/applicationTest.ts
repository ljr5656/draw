import { Application } from '../core/application';
class ApplicationTest extends Application {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  public update(elapsedMsec: number, intervalSec: number) {
    console.log(elapsedMsec, intervalSec);
  }
  public render() {}
}

const canvas = document.querySelector('#root') as HTMLCanvasElement;
const app = new ApplicationTest(canvas);
app.start();
