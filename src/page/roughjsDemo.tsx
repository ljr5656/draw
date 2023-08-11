import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import tough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Config, Options, ResolvedOptions, Drawable } from 'roughjs/bin/core';

enum EPenType {
  SELECT,
  RECT,
}

const RoughjsDemo: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [penType, setPenType] = useState<EPenType>(EPenType.RECT);
  useEffect(() => {
    console.log(penType);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rc = tough.canvas(canvas);
      let isDraw: boolean = false;
      let shapes: Drawable[] = [];
      let shape: Drawable | undefined;
      let width: number = 0;
      let height: number = 0;
      let x: number = 0;
      let y: number = 0;
      canvas.addEventListener('mousedown', (ev: MouseEvent) => {
        if (penType === EPenType.RECT) {
          const { clientX, clientY } = ev;
          (x = clientX), (y = clientY);
          isDraw = true;
          shape = rc.rectangle(x, y, width, height);
        }
      });

      canvas.addEventListener('mousemove', (ev: MouseEvent) => {
        if (penType === EPenType.RECT) {
          if (isDraw && shape && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
            shapes.forEach((_shape) => {
              rc.draw(_shape);
            });

            const { clientX, clientY } = ev;
            width = clientX - x;
            height = clientY - y;
            shape = rc.rectangle(x, y, width, height);
          }
        }
      });

      canvas.addEventListener('mouseup', (ev: MouseEvent) => {
        if (penType === EPenType.RECT) {
          if (isDraw === true && shape !== undefined) {
            isDraw = false;
            shapes.push(shape);
            shape = undefined;
            width = 0;
            height = 0;
            x = 0;
            y = 0;
          }
        }
      });
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        style={{ border: '1px solid red' }}
      ></canvas>
      <div>
        <button
          onClick={() => {
            setPenType(EPenType.SELECT);
          }}
        >
          select
        </button>
        <button
          onClick={() => {
            setPenType(EPenType.RECT);
          }}
        >
          rect
        </button>
        <div>{penType}</div>
      </div>
    </div>
  );
};

export default RoughjsDemo;
