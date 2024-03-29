import React, { useState, useCallback, useLayoutEffect } from "react";
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
  canvas.lineWidth = width / 160;
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
  canvas.lineWidth = width / 64;
  canvas.setLineDash([7, 7]);
  canvas.strokeStyle = "#FFFFFF";
  canvas.arc(width / 2, height / 2, width / 2, 0.75 * Math.PI, 1.25 * Math.PI);
  canvas.stroke();
  canvas.closePath();
  printCircleShadow(canvas, width, height, 6.5, 7.15, width / 64, 0.75, 1.25);
  printCircleShadow(canvas, width, height, 6, 7.48, width / 42, 0.75, 1.25);
  printCircleShadow(canvas, width, height, 6.5, 7.15, width / 64, 1.75, 0.25);
  printCircleShadow(canvas, width, height, 6, 7.48, width / 42, 1.75, 0.25);
  canvas.beginPath();
  canvas.globalAlpha = 1;
  canvas.setLineDash([7, 7]);
  canvas.lineWidth = width / 64;
  canvas.arc(width / 2, height / 2, width / 2, 1.75 * Math.PI, 0.25 * Math.PI);
  canvas.stroke();
  canvas.setLineDash([]);
  canvas.closePath();
}

function lineAtAngle(x1, y1, length, angle, canvas, lineSize) {
  canvas.beginPath();
  canvas.moveTo(x1, y1);
  let radians = angle * (Math.PI / 180);
  let x2 = x1 + Math.cos(radians) * length;
  let y2 = y1 + Math.sin(radians) * length;
  canvas.lineWidth = lineSize;
  canvas.strokeStyle = "#31799D";
  canvas.lineTo(x2, y2);
  canvas.stroke();
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
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

function checkUpdate(mouseX, mouseY, width, height, max, min) {
  const step = 360 / (max - min);
  let theta = Math.atan2(mouseY - height / 2 / 2, mouseX - width / 2 / 2);
  let res = getResult(getDegree(theta * (180 / Math.PI)), step);
  return res;
}

function printValue(canvas, value, width, height) {
  canvas.beginPath();
  canvas.font = `${Math.round(width / 8.5)}px Montserrat`;
  canvas.fillStyle = "white";
  canvas.textAlign = "center";
  canvas.fillText(
    `${Math.round(value)}°`,
    width / 2 + width / 48,
    height / 2 + height / 23
  );
  canvas.stroke();
  canvas.closePath();
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
        i * (settings.width / 64),
      0,
      2 * Math.PI
    );
    settings.ctx.stroke();
    settings.ctx.setLineDash([]);
    settings.ctx.globalAlpha = 1;
    settings.ctx.closePath();
  }
}

function printInnerCircle(settings) {
  settings.ctx.beginPath();

  settings.ctx.stroke();
  settings.ctx.fill();
  settings.ctx.lineWidth = settings.width / 2 / 70;
  settings.ctx.strokeStyle = "#FFFFFF";
  settings.ctx.arc(
    settings.width / 2,
    settings.height / 2,
    settings.circleSize - settings.thickness / 2 - settings.width / 42,
    0,
    2 * Math.PI
  );
  settings.ctx.stroke();
  settings.ctx.closePath();
}

export default function MainSlider({
  min,
  max,
  groupAdress,
  currentTemp,
  nowTemp,
  changeCurrentValue,
}) {
  const [currentValue, setCurrentValue] = useState(currentTemp);
  const [isChecked, setIsChecked] = useState(false);
  const size = useWindowSize();

  const [settings, setSettings] = useState({
    ctx: null,
    width: 0,
    height: 0,
    circleSize: 0,
    thickness: 70,
    circlesCount: 6,
    theta: (360 / (max - min)) * currentTemp,
    gradient: null,
  });

  const measuredRef = useCallback(
    (node) => {
      if (node !== null) {
        setSettings((stngs) => ({
          ...stngs,
          width: node.offsetWidth * 2,
          height: node.offsetHeight * 2,
          thickness: Math.round(node.offsetWidth / 4.85),
          circleSize: Math.round((node.offsetWidth * 2) / 3.3333),
        }));
        node.width = node.offsetWidth * 2;
        node.height = node.offsetHeight * 2;
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
    [size[0]]
  );

  const degree2Radian = (degrees) => degrees * (Math.PI / 180);

  if (settings.ctx != null) {
    settings.ctx.clearRect(0, 0, settings.width, settings.height);
    settings.ctx.fillStyle = "black";
    let theta = degree2Radian(settings.theta);
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
    settings.ctx.closePath();

    const cx =
      settings.width / 2 + Math.cos(theta - 7.85) * settings.circleSize;
    const cy =
      settings.height / 2 + Math.sin(theta - 7.85) * settings.circleSize;

    lineAtAngle(
      cx,
      cy,
      settings.width / 68,
      settings.theta,
      settings.ctx,
      settings.thickness
    );
    printInnerCircle(settings);
    printCirclesBorder(settings, false);
    printCirclesBorder(settings, true);
    printSideShapes(settings.ctx, settings.width, settings.height);
    isChecked
      ? printValue(settings.ctx, currentValue, settings.width, settings.height)
      : printValue(settings.ctx, nowTemp, settings.width, settings.height);
  }
  return (
    <div className="circle-slider__wrapper">
      <canvas
        ref={measuredRef}
        className="circle-slider__canvas"
        onMouseMove={(e) => {
          if (!isChecked) return;
          let res = checkUpdate(
            e.nativeEvent.layerX,
            e.nativeEvent.layerY,
            settings.width,
            settings.height,
            max,
            min
          );
          let value = Math.round(res / (360 / (max - min)) + min);
          if (currentValue !== value) {
            setCurrentValue(value);
            setSettings((stngs) => ({
              ...stngs,
              theta: res,
            }));
          }
        }}
        onTouchMove={(e) => {
          if (!isChecked) return;

          let rect = e.target.getBoundingClientRect();
          let res = checkUpdate(
            e.touches[0].pageX - rect.left,
            e.touches[0].pageY - rect.top,
            settings.width,
            settings.height,
            max,
            min
          );
          let value = Math.round(res / (360 / (max - min)) + min);
          if (currentValue !== value) {
            setCurrentValue(value);
            setSettings((stngs) => ({
              ...stngs,
              theta: res,
            }));
          }
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
