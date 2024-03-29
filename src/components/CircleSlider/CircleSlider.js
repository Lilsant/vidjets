import React, { useState } from "react";
import Clock from "./Clock/Clock";
import MainSlider from "./MainSlider/MainSlider";
import "./CircleSlider.css";

export default function CircleSlider({ min, max, currentTemp, groupAdress }) {
  const [currentValue, setCurrentValue] = useState(currentTemp);
  const changeCurrentValue = (value) => setCurrentValue(value);

  console.log(currentValue);

  return (
    <div className="circle-slider">
      <MainSlider
        min={min}
        max={max}
        currentTemp={currentTemp}
        groupAdress={groupAdress}
        nowTemp={currentValue}
        changeCurrentValue={changeCurrentValue}
      />
      <Clock />
      <Drops />
    </div>
  );
}

function Drops() {
  return (
    <div className="circle-slider__drops-box">
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon"></i>
      <i className="circle-slider__drops-icon circle-slider__drops-icon--transp"></i>
      <i className="circle-slider__drops-icon circle-slider__drops-icon--transp"></i>
      <i className="circle-slider__drops-icon circle-slider__drops-icon--transp"></i>
      <i className="circle-slider__drops-icon circle-slider__drops-icon--transp"></i>
    </div>
  );
}
