import React, { useRef, useState } from "react";
import "./slider.css";

export default function Slider({ min, max, groupAdress }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const selectionRef = useRef(null);
  function scrollSlider(e) {
    console.log(selectionRef);
    let output = e.target.getElementsByClassName("selection")[0],
      text = e.target.getElementsByClassName("holder")[0],
      styleafter = document.head.appendChild(document.createElement("style")),
      elpos = e.target.getBoundingClientRect(),
      cX = elpos.width / 2,
      cY = elpos.height / 2,
      eX = e.pageX - elpos.left,
      eY = e.pageY - elpos.top,
      dX = 0,
      dY = 0,
      angle = Math.atan2(cX - eX, cY - eY) * (180 / Math.PI),
      value = 0;
    if (Math.abs(eX - cX) >= Math.abs(eY - cY)) {
      dX = 150 / 2 + (Math.sign(eX - cX) * 150) / 2;
      dY = 150 / 2 + (((eY - cY) / Math.abs(eX - cX)) * 150) / 2;
    } else {
      dX = 150 / 2 + (((eX - cX) / Math.abs(eY - cY)) * 150) / 2;
      dY = 150 / 2 + (Math.sign(eY - cY) * 150) / 2;
    }
    dX = Math.round((dX / 150) * 100);
    dY = Math.round((dY / 150) * 100);
    if (0 <= dX && dX < 50 && dY === 0) {
      output.style =
        "clip-path: polygon(" + dX + "% " + dY + "%, 50% 0%, 50% 50%);";
      value = Math.round(((50 - dX) / 50) * 12.5);
    } else if (dX === 0 && 0 <= dY && dY <= 100) {
      output.style =
        "clip-path: polygon(" + dX + "% " + dY + "%, 0% 0%, 50% 0%, 50% 50%);";
      value = Math.round(12.5 + (dY / 100) * 25);
    } else if (0 <= dX && dX <= 100 && dY === 100) {
      output.style =
        "clip-path: polygon(" +
        dX +
        "% " +
        dY +
        "%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
      value = Math.round(37.5 + (dX / 100) * 25);
    } else if (dX === 100 && 0 <= dY && dY <= 100) {
      output.style =
        "clip-path: polygon(" +
        dX +
        "% " +
        dY +
        "%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
      value = Math.round(62.5 + ((100 - dY) / 100) * 25);
    } else if (50 <= dX && dX <= 100 && dY === 0) {
      output.style =
        "clip-path: polygon(" +
        dX +
        "% " +
        dY +
        "%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
      value = Math.round(87.5 + ((100 - dX) / 50) * 12.5);
    }
    console.log(dX, dY);
    styleafter.innerHTML =
      ".round-slider .selection:after {transform: rotate(" + -angle + "deg);}";
    text.innerHTML = value + "%";
  }
  return (
    <div className="slider__wrapper">
      <div
        class="round-slider"
        onMouseDown={() => setIsClicked(!isClicked)}
        onClick={(e) => scrollSlider(e)}
        onMouseMove={(e) => {
          if (isClicked && (e.buttons === 1 || e.buttons === 3)) {
            scrollSlider(e);
          }
        }}
      >
        <div class="selection" ref={selectionRef}></div>
        <div class="holder">100%</div>
      </div>
    </div>
  );
}
