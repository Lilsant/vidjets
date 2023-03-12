import React from "react";
import "./circle.css";

export default function CircleValue({ value }) {
  return (
    <div className="circle">
      <div className="circle__wrapper">
        <div className="circle__loading-line">
          <span className="circle__value">{value}%</span>
        </div>
      </div>
    </div>
  );
}
