import { PixiApplication } from '../core/pixi/pixiApplication';

const app = new PixiApplication(
  document.querySelector('#canvas') as HTMLCanvasElement,
);

app.rect();
app.path();
