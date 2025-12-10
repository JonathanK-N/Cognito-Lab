import React from "react";

export interface CapacitorProps {
  width?: number;
  height?: number;
  value?: string;
  className?: string;
}

export const Capacitor: React.FC<CapacitorProps> = ({
  width = 40,
  height = 60,
  value = "10µF",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="20" y1="0" x2="20" y2="20" stroke="#000" strokeWidth="2" />
      <line x1="10" y1="20" x2="30" y2="20" stroke="#000" strokeWidth="3" />
      <line x1="10" y1="40" x2="30" y2="40" stroke="#000" strokeWidth="3" />
      <line x1="20" y1="40" x2="20" y2="60" stroke="#000" strokeWidth="2" />
      <text x="20" y="35" textAnchor="middle" fontSize="8" fill="#000">
        {value}
      </text>
    </svg>
  );
};

