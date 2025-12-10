import React from "react";

export interface BatteryProps {
  width?: number;
  height?: number;
  voltage?: string;
  className?: string;
}

export const Battery: React.FC<BatteryProps> = ({
  width = 30,
  height = 50,
  voltage = "9V",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="5" width="20" height="40" fill="#10b981" stroke="#000" strokeWidth="2" />
      <line x1="15" y1="0" x2="15" y2="5" stroke="#000" strokeWidth="3" />
      <line x1="15" y1="45" x2="15" y2="50" stroke="#000" strokeWidth="3" />
      <text x="15" y="30" textAnchor="middle" fontSize="8" fill="#000">
        {voltage}
      </text>
    </svg>
  );
};

