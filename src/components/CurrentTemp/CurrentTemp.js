import React from "react";
import "./CurrentTemp.css";

export default function CircleValue({ value, groupAdress }) {
  return (
    <div className="current-temp">
      <div className="current-temp__circle">
        <div className="current-temp__circle-wrapper">
          <div className="current-temp__circle-loading-line">
            <span className="current-temp__circle-value">{value}°</span>
          </div>
        </div>
      </div>
      {/* Место для Switch */}
    </div>
  );
}
