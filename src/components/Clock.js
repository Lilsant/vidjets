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
      miliseconds: now.getMilliseconds(),
      seconds: now.getSeconds(),
      minutes: now.getMinutes(),
      hours: now.getHours(),
    }));
  }, 10);

  return (
    <div className="clock">
      <span id="h">{time.hours}:</span>
      <span id="m">{time.minutes}:</span>
      <span id="s">{time.seconds}:</span>
      <span id="mi">{time.miliseconds}</span>
    </div>
  );
}
