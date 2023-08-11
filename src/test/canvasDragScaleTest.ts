import { RoughApplication } from '../core/rough/roughApplication';

const root = document.querySelector('#root') as HTMLDivElement;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
root?.appendChild(canvas);
canvas.setAttribute('width', '1000');
canvas.setAttribute('height', '1000');
canvas.style.border = '1px solid red';
const app = new RoughApplication(canvas);
app.start();

const dragButton = document.createElement('button');
dragButton.innerText = 'drag';
const drawButton = document.createElement('button');
drawButton.innerText = 'draw';
const zoomIn = document.createElement('button');
zoomIn.innerText = '-';
const zoomOut = document.createElement('button');
zoomOut.innerText = '+';

const wrapper = document.createElement('div');
wrapper.appendChild(zoomIn);
wrapper.appendChild(dragButton);
wrapper.appendChild(drawButton);
wrapper.appendChild(zoomOut);
document.body.appendChild(wrapper);

dragButton.addEventListener('click', () => {
  app.setDrag();
});
drawButton.addEventListener('click', () => {
  app.setDraw();
});
zoomIn.addEventListener('click', () => {
  app.setZoomIn();
});
zoomOut.addEventListener('click', () => {
  app.setZoomOut();
});
