import React from "react";

export interface TransistorProps {
  width?: number;
  height?: number;
  type?: "npn" | "pnp";
  className?: string;
}

export const Transistor: React.FC<TransistorProps> = ({
  width = 60,
  height = 60,
  type = "npn",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="20" fill="none" stroke="#000" strokeWidth="2" />
      <line x1="30" y1="10" x2="30" y2="30" stroke="#000" strokeWidth="2" />
      <line x1="10" y1="30" x2="30" y2="30" stroke="#000" strokeWidth="2" />
      <line x1="30" y1="30" x2="50" y2="30" stroke="#000" strokeWidth="2" />
      <text x="30" y="25" textAnchor="middle" fontSize="10" fill="#000">
        {type.toUpperCase()}
      </text>
    </svg>
  );
};

