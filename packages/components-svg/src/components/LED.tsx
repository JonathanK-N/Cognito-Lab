import React from "react";

export interface LEDProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const LED: React.FC<LEDProps> = ({
  width = 40,
  height = 40,
  color = "#ef4444",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="20" x2="10" y2="20" stroke="#000" strokeWidth="2" />
      <circle cx="20" cy="20" r="10" fill={color} stroke="#000" strokeWidth="2" />
      <line x1="30" y1="20" x2="40" y2="20" stroke="#000" strokeWidth="2" />
      <line x1="20" y1="10" x2="20" y2="0" stroke="#000" strokeWidth="2" />
    </svg>
  );
};

