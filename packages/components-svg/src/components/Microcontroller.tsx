import React from "react";

export interface MicrocontrollerProps {
  width?: number;
  height?: number;
  type?: string;
  className?: string;
}

export const Microcontroller: React.FC<MicrocontrollerProps> = ({
  width = 80,
  height = 80,
  type = "MCU",
  className,
}) => {
  const pins = 14;
  const pinSpacing = height / (pins + 1);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="10" width="40" height="60" fill="#1e40af" stroke="#000" strokeWidth="2" />
      <text x="40" y="45" textAnchor="middle" fontSize="10" fill="#fff">
        {type}
      </text>
      {/* Pins gauche */}
      {Array.from({ length: pins }).map((_, i) => (
        <rect
          key={`left-${i}`}
          x="10"
          y={10 + (i + 1) * pinSpacing - 2}
          width="10"
          height="4"
          fill="#000"
        />
      ))}
      {/* Pins droite */}
      {Array.from({ length: pins }).map((_, i) => (
        <rect
          key={`right-${i}`}
          x="60"
          y={10 + (i + 1) * pinSpacing - 2}
          width="10"
          height="4"
          fill="#000"
        />
      ))}
    </svg>
  );
};

