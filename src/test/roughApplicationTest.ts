import { RoughApplication } from '../core/rough/roughApplication';

const root = document.querySelector('#root') as HTMLDivElement;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
root?.appendChild(canvas);
canvas.setAttribute('width', '1000');
canvas.setAttribute('height', '1000');
canvas.style.border = '1px solid red';
const app = new RoughApplication(canvas);
app.start();
