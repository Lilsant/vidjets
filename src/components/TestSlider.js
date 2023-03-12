import React, { useState, useRef, useEffect, useCallback } from "react";
import "./test.css";

export default function TestSlider({ min, max }) {
  const [isChecked, setIsChecked] = useState(true);
  const canvasRef = useRef(0);
  const [settings, setSettings] = useState({
    ctx: null,
    width: 1000,
    height: 1000,
    mouseX: null,
    mouseY: null,
    gradient: null,
    circleSize: 300,
    thickness: 60,
    circlesCount: 6,
    lineSize: 64,
  });
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      node.width = settings.width;
      node.height = settings.height;
      setSettings((stngs) => ({ ...stngs, ctx: node.getContext("2d") }));
      console.log(node.width);
    }
  }, []);
  //   useEffect(() => {
  //     console.log(canvasRef);
  //     setSettings((stngs) => ({
  //       ...stngs,
  //       ctx: canvasRef.current.getContext("2d"),
  //     }));
  //   }, [canvasRef.current]);
  const degree2Radian = (degrees) => degrees * (Math.PI / 180);

  if (settings.ctx != null) {
    console.log(settings.ctx.canvas);
    // NOTE: Set gradient color for stroke
    let gradient = settings.ctx.createLinearGradient(250, 0, 0, 500);
    gradient.addColorStop(1, "#FFFFFF");
    gradient.addColorStop(0, "#ffffff56");

    if (isChecked) render();

    //   canvas.addEventListener("mousedown", () => {
    //     canvas.width = settings.width;
    //     canvas.height = settings.height;
    //     setIsChecked(true);
    //     render();
    //   });

    function getDegree(theta) {
      if (theta >= -90 && theta <= 180) {
        theta += 90;
      }
      if (theta >= -180 && theta < -90) {
        theta += 450;
      }
      return theta;
    }
    // 398 386 400 250
    function render() {
      settings.ctx.clearRect(0, 0, settings.width, settings.height);
      const step = 360 / (max - min);
      settings.ctx.fillStyle = "black";
      let theta = Math.atan2(
        settings.mouseY -
          //   (settings.ctx.canvas.offsetTop - settings.ctx.canvas.offsetHeight) -
          settings.height / 2 / 2,
        settings.mouseX - settings.width / 2 / 2
      );
      let res = getResult(getDegree(theta * (180 / Math.PI)), step);
      let value = res / step;
      theta = degree2Radian(res);
      settings.ctx.beginPath();
      settings.ctx.arc(
        settings.width / 2,
        settings.height / 2,
        settings.circleSize,
        degree2Radian(-90),
        theta - 7.95
      );
      settings.ctx.strokeStyle = gradient;
      settings.ctx.lineWidth = settings.thickness;
      settings.ctx.stroke();
      function getResult(theta, step) {
        for (let i = 0; i <= 360; i += step) {
          let preSum = Math.abs((i + step - i) / 2);
          if (theta >= preSum && theta <= i + step && theta >= i)
            return i + step;
          if (theta < preSum && theta <= i + step && theta >= i) return i;
        }
      }
      const cx =
        settings.width / 2 + Math.cos(theta - 7.95) * settings.circleSize;
      const cy =
        settings.width / 2 + Math.sin(theta - 7.95) * settings.circleSize;
      settings.ctx.beginPath();
      lineAtAngle(cx, cy, 5, res - 6, settings.ctx);
      for (let i = 0; i < settings.circlesCount; i++) {
        settings.ctx.beginPath();
        settings.ctx.arc(
          settings.width / 2,
          settings.height / 2,
          settings.width / 3 + i * 10,
          0,
          2 * Math.PI
        );
        settings.ctx.lineWidth = 2;
        settings.ctx.strokeStyle = "#FFFFFF";
        settings.ctx.stroke();
      }
      settings.ctx.beginPath();
      settings.ctx.arc(
        settings.width / 2,
        settings.height / 2,
        settings.width / 3 - (settings.thickness + 20),
        0,
        2 * Math.PI
      );
      settings.ctx.lineWidth = 5;
      settings.ctx.stroke();
      settings.ctx.beginPath();
      settings.ctx.font = "90px Arial";
      settings.ctx.fillStyle = "white";
      settings.ctx.fillText(
        `${Math.round(value + min)}°`,
        settings.width / 2,
        settings.height / 2 + 30
      );
      settings.ctx.textAlign = "center";
      settings.ctx.stroke();
      console.log(theta);
    }
    function lineAtAngle(x1, y1, length, angle, canvas) {
      canvas.moveTo(x1, y1);
      let radians = angle * (Math.PI / 180);
      let x2 = x1 + Math.cos(radians) * length;
      let y2 = y1 + Math.sin(radians) * length;
      canvas.lineWidth = settings.lineSize;
      canvas.strokeStyle = "#31799D";
      canvas.lineTo(x2, y2);
      canvas.stroke();
    }
  }
  return (
    <div>
      <canvas
        ref={measuredRef}
        className="canvas"
        onMouseMove={(e) => {
          setSettings((stngs) => ({
            ...stngs,
            mouseX: e.clientX,
            mouseY: Math.abs(e.pageY - e.target.offsetTop),
          }));
        }}
        onMouseUp={() => setIsChecked(false)}
        onMouseDown={() => {
          setIsChecked(true);
        }}
      ></canvas>
    </div>
  );
}
