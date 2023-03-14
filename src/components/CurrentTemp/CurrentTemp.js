import React from "react";
import "./CurrentTemp.css";

export default function CircleValue({ value, groupAdress }) {
  return (
    <div className="circle">
      <div className="circle__wrapper">
        <div className="circle__loading-line">
          <span className="circle__value">{value}°</span>
        </div>
      </div>
    </div>
  );
}
