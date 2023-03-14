import React, { useState } from "react";
import "./clock.css";

export default function Clock() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,
  });

  setTimeout(() => {
    let now = new Date();
    setTime((tm) => ({
      ...tm,
      miliseconds: String(Math.floor(now.getMilliseconds() / 10)).padStart(
        2,
        "0"
      ),
      seconds: String(now.getSeconds()).padStart(2, "0"),
      minutes: String(now.getMinutes()).padStart(2, "0"),
      hours: String(now.getHours()).padStart(2, "0"),
    }));
  }, 10);

  return (
    <div className="circle-slider__clock">
      <div className="circle-slider__clock-wrapper">
        <div className="circle-slider__clock-dial">
          <span id="h">{time.hours} : </span>
          <span id="m">{time.minutes} : </span>
          <span id="s">{time.seconds} : </span>
          <span id="mi">{time.miliseconds}</span>
        </div>
        <span className="circle-slider__clock-title">TIME</span>
      </div>
    </div>
  );
}
