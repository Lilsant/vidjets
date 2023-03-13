import React, { useState, useCallback } from "react";
import "./test.css";

function getResult(theta, step) {
  for (let i = 0; i <= 360; i += step) {
    let preSum = i + step - step / 2;
    if (theta >= preSum && theta <= i + step && theta >= i) {
      if (i + step >= 360) {
        return i + step - 0.6;
      }
      return i + step;
    }
    if (theta < preSum && theta <= i + step && theta > i) return i;
  }
  return theta;
}

function lineAtAngle(x1, y1, length, angle, canvas, lineSize) {
  canvas.moveTo(x1, y1);
  let radians = angle * (Math.PI / 180);
  let x2 = x1 + Math.cos(radians) * length;
  let y2 = y1 + Math.sin(radians) * length;
  canvas.lineWidth = lineSize - 4;
  canvas.strokeStyle = "#31799D";
  canvas.lineTo(x2, y2);
  canvas.stroke();
}

function getDegree(theta) {
  if (theta >= -90 && theta <= 180) {
    theta += 90;
  }
  if (theta >= -180 && theta < -90) {
    theta += 450;
  }
  return theta;
}

function printValue(canvas, value, width, height) {
  canvas.lineWidth = 5;
  canvas.stroke();
  canvas.beginPath();
  canvas.font = "90px Arial";
  canvas.fillStyle = "white";
  canvas.fillText(`${Math.round(value)}°`, width / 2, height / 2 + 30);
  canvas.textAlign = "center";
  canvas.stroke();
}

function printCirclesBorder(width, height, canvas, circlesCount, thickness) {
  for (let i = 0; i < circlesCount; i++) {
    canvas.beginPath();
    canvas.arc(
      width / 2,
      height / 2,
      width / 3 + thickness * 0.15 + i * 10,
      0,
      2 * Math.PI
    );
    canvas.lineWidth = 2;
    canvas.strokeStyle = "#FFFFFF";
    canvas.stroke();
  }
}

export default function TestSlider({ min, max }) {
  const [currentValue, setCurrentValue] = useState(min);
  const [isChecked, setIsChecked] = useState(false);
  const [settings, setSettings] = useState({
    ctx: null,
    width: 0,
    height: 0,
    circleSize: 0,
    thickness: 100,
    circlesCount: 6,
    lineSize: 104,
    currentValue: 10,
    mouseX: null,
    mouseY: null,
    gradient: null,
  });

  const measuredRef = useCallback(
    (node) => {
      if (node !== null) {
        setSettings((stngs) => ({
          ...stngs,
          width: node.offsetWidth * 2,
          height: node.offsetHeight * 2,
          circleSize: Math.round((node.offsetWidth * 2) / 3.3333),
        }));
        console.log(settings.width, settings.height, settings.circleSize);
        node.width = settings.width;
        node.height = settings.height;
        let gradient = node
          .getContext("2d")
          .createLinearGradient(250, 0, 0, 500);
        gradient.addColorStop(1, "#FFFFFF");
        gradient.addColorStop(0, "#ffffff56");
        console.dir(node);
        setSettings((stngs) => ({
          ...stngs,
          ctx: node.getContext("2d"),
          gradient,
        }));
      }
    },
    [settings.width, settings.height]
  );

  const degree2Radian = (degrees) => degrees * (Math.PI / 180);
  if (settings.ctx != null && isChecked) {
    settings.ctx.clearRect(0, 0, settings.width, settings.height);
    const step = 360 / (max - min);
    settings.ctx.fillStyle = "black";
    let theta = Math.atan2(
      settings.mouseY - settings.height / 2 / 2,
      settings.mouseX - settings.width / 2 / 2
    );
    let res = getResult(getDegree(theta * (180 / Math.PI)), step);
    let value = res / step + min;
    theta = degree2Radian(res);
    settings.ctx.beginPath();
    settings.ctx.arc(
      settings.width / 2,
      settings.height / 2,
      settings.circleSize,
      degree2Radian(-90),
      theta - 7.85
    );
    settings.ctx.strokeStyle = settings.gradient;
    settings.ctx.lineWidth = settings.thickness;
    settings.ctx.stroke();

    const cx =
      settings.width / 2 + Math.cos(theta - 7.85) * settings.circleSize;
    const cy =
      settings.width / 2 + Math.sin(theta - 7.85) * settings.circleSize;
    settings.ctx.beginPath();

    lineAtAngle(cx, cy, 5, res, settings.ctx, settings.lineSize);

    printCirclesBorder(
      settings.width,
      settings.height,
      settings.ctx,
      settings.circlesCount,
      settings.thickness
    );

    settings.ctx.beginPath();
    settings.ctx.arc(
      settings.width / 2,
      settings.height / 2,
      settings.width * 0.275,
      0,
      2 * Math.PI
    );
    // 75;
    if (value !== currentValue) setCurrentValue(value);
    printValue(settings.ctx, value, settings.width, settings.height);
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
        onTouchMove={(e) => {
          if (!isChecked) return;
          settings.ctx.touchAction = "none";
          setSettings((stngs) => ({
            ...stngs,
            mouseX: e.touches[0].clientX,
            mouseY: Math.abs(e.touches[0].pageY - e.target.offsetTop),
          }));
          console.log(settings.mouseY);
        }}
        onTouchStart={() => {
          setIsChecked(true);
        }}
        onTouchEnd={() => {
          setIsChecked(false);
        }}
        onMouseUp={() => {
          setIsChecked(false);
        }}
        onMouseDown={() => {
          setIsChecked(true);
        }}
      ></canvas>
    </div>
  );
}
