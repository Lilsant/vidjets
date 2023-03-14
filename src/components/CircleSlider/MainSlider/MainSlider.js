import React, { useState, useCallback } from "react";
import "./MainSlider.css";

function getResult(theta, step) {
  for (let i = 0; i <= 360; i += step) {
    let preSum = i + step - step / 2;
    if (theta >= preSum && theta <= i + step && theta >= i) {
      if (i + step >= 359.5) {
        return 359.4;
      }
      return i + step;
    }
    if (theta < preSum && theta <= i + step && theta > i) return i;
  }
  return theta;
}

function printCircleShadow(canvas, width, height, dF, dS, rd, piF, piS) {
  canvas.beginPath();
  canvas.globalAlpha = 0.2;
  canvas.setLineDash([dF, dS]);
  canvas.lineWidth = 4;
  canvas.arc(
    width / 2,
    height / 2,
    width / 2 - rd,
    piF * Math.PI,
    piS * Math.PI
  );
  canvas.stroke();
  canvas.closePath();
}
function printSideShapes(canvas, width, height) {
  canvas.beginPath();
  canvas.lineWidth = 10;
  canvas.setLineDash([7, 7]);
  canvas.strokeStyle = "#FFFFFF";
  canvas.arc(width / 2, height / 2, width / 2, 0.75 * Math.PI, 1.25 * Math.PI);
  canvas.stroke();
  canvas.closePath();
  printCircleShadow(canvas, width, height, 6.5, 7.15, 10, 0.75, 1.25);
  printCircleShadow(canvas, width, height, 6, 7.48, 15, 0.75, 1.25);
  printCircleShadow(canvas, width, height, 6.5, 7.15, 10, 1.75, 0.25);
  printCircleShadow(canvas, width, height, 6, 7.48, 15, 1.75, 0.25);
  canvas.beginPath();
  canvas.globalAlpha = 1;
  canvas.setLineDash([7, 7]);
  canvas.lineWidth = 10;
  canvas.arc(width / 2, height / 2, width / 2, 1.75 * Math.PI, 0.25 * Math.PI);
  canvas.stroke();
  canvas.setLineDash([]);
}

function lineAtAngle(x1, y1, length, angle, canvas, lineSize) {
  canvas.moveTo(x1, y1);
  let radians = angle * (Math.PI / 180);
  let x2 = x1 + Math.cos(radians) * length;
  let y2 = y1 + Math.sin(radians) * length;
  canvas.lineWidth = lineSize;
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
  canvas.font = "80px Montserrat";
  canvas.fillStyle = "white";
  canvas.textAlign = "center";
  canvas.fillText(`${Math.round(value)}°`, width / 2 + 14, height / 2 + 30);
  canvas.stroke();
}

function printCirclesBorder(settings, sT) {
  for (let i = 0; i < settings.circlesCount; i++) {
    settings.ctx.beginPath();
    settings.ctx.setLineDash([7, 7]);
    settings.ctx.lineWidth = 2;
    if (sT) {
      settings.ctx.globalAlpha = 0.5;
      settings.ctx.setLineDash([]);
    }
    settings.ctx.strokeStyle = "#FFFFFF";
    settings.ctx.arc(
      settings.width / 2,
      settings.height / 2,
      settings.circleSize +
        (settings.thickness - settings.thickness / 2) +
        i * 10,
      0,
      2 * Math.PI
    );
    settings.ctx.stroke();
    settings.ctx.setLineDash([]);
    settings.ctx.globalAlpha = 1;
  }
}

function printInnerCircle(settings) {
  settings.ctx.beginPath();
  settings.ctx.arc(
    settings.width / 2,
    settings.height / 2,
    settings.circleSize - settings.thickness / 2 - 15,
    0,
    2 * Math.PI
  );
  settings.ctx.lineWidth = 1;
  settings.ctx.stroke();
  settings.ctx.closePath();
}

export default function MainSlider({
  min,
  max,
  groupAdress,
  changeCurrentValue,
}) {
  const [currentValue, setCurrentValue] = useState(min);
  const [isChecked, setIsChecked] = useState(false);
  const [settings, setSettings] = useState({
    ctx: null,
    width: 0,
    height: 0,
    circleSize: 0,
    thickness: 70,
    circlesCount: 6,
    mouseX: 0,
    mouseY: 0,
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
        node.width = settings.width;
        node.height = settings.height;
        let gradient = node
          .getContext("2d")
          .createLinearGradient(250, 0, 0, 500);
        gradient.addColorStop(1, "rgba(255,255,255, 1)");
        gradient.addColorStop(0, "rgba(255,255,255, 0)");
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

  if (settings.ctx != null) {
    settings.ctx.clearRect(0, 0, settings.width, settings.height);
    const step = 360 / (max - min);
    settings.ctx.fillStyle = "black";
    let theta = Math.atan2(
      settings.mouseY - settings.height / 2 / 2,
      settings.mouseX - settings.width / 2 / 2
    );
    let res = getResult(getDegree(theta * (180 / Math.PI)), step);
    let value = Math.round(res / step + min);
    theta = degree2Radian(res);
    settings.ctx.beginPath();
    settings.ctx.setLineDash([2, 2]);
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
    settings.ctx.setLineDash([]);

    const cx =
      settings.width / 2 + Math.cos(theta - 7.85) * settings.circleSize;
    const cy =
      settings.width / 2 + Math.sin(theta - 7.85) * settings.circleSize;
    settings.ctx.beginPath();

    lineAtAngle(cx, cy, 5, res, settings.ctx, settings.thickness);
    printCirclesBorder(settings, false);
    printCirclesBorder(settings, true);
    printSideShapes(settings.ctx, settings.width, settings.height);
    printInnerCircle(settings);
    if (value !== currentValue) setCurrentValue(value);
    printValue(settings.ctx, value, settings.width, settings.height);
  }
  return (
    <div className="circle-slider__wrapper">
      <canvas
        ref={measuredRef}
        className="circle-slider__canvas"
        onMouseMove={(e) => {
          if (!isChecked) return;
          setSettings((stngs) => ({
            ...stngs,
            mouseX: e.nativeEvent.layerX,
            mouseY: e.nativeEvent.layerY,
          }));
        }}
        onTouchMove={(e) => {
          settings.ctx.touchAction = "none";
          setSettings((stngs) => ({
            ...stngs,
            mouseX: e.touches[0].clientX,
            mouseY: Math.abs(e.touches[0].pageY - e.target.offsetTop),
          }));
        }}
        onTouchStart={() => {
          setIsChecked(true);
        }}
        onTouchEnd={() => {
          setIsChecked(false);
          changeCurrentValue(currentValue);
        }}
        onMouseUp={() => {
          setIsChecked(false);
          changeCurrentValue(currentValue);
        }}
        onMouseDown={() => {
          setIsChecked(true);
        }}
      ></canvas>
    </div>
  );
}
