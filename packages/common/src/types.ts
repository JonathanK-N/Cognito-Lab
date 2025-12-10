export type UserRole = "admin" | "teacher" | "student" | "guest";

export type ProjectType = "circuit" | "schematic" | "pcb" | "microcontroller" | "robotics";

export type MCUType =
  | "arduino-uno"
  | "arduino-mega"
  | "arduino-nano"
  | "esp32"
  | "nano-esp32"
  | "attiny85"
  | "stm32"
  | "stm32f103"
  | "stm32f401"
  | "rp2040"
  | "pico"
  | "nrf52"
  | "cortex-m"
  | "riscv";

export type SimulatorType = "wokwi" | "renode" | "internal";

export interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation?: number;
  properties?: Record<string, any>;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  fromPin: string;
  toPin: string;
}

export interface Circuit {
  components: Component[];
  connections: Connection[];
}

export interface Schematic {
  symbols: Component[];
  nets: Connection[];
  hierarchy?: any;
}

export interface PCB {
  layers: Layer[];
  components: PCBComponent[];
  traces: Trace[];
  vias: Via[];
}

export interface Layer {
  id: string;
  name: string;
  type: "signal" | "power" | "ground";
  number: number;
}

export interface PCBComponent {
  id: string;
  footprint: string;
  x: number;
  y: number;
  rotation: number;
  layer: number;
}

export interface Trace {
  id: string;
  layer: number;
  width: number;
  points: Array<{ x: number; y: number }>;
}

export interface Via {
  id: string;
  x: number;
  y: number;
  diameter: number;
  drill: number;
  layers: number[];
}

export interface Robot {
  id: string;
  name: string;
  urdf: string;
  type: "fanuc" | "kuka" | "ur" | "mycobot" | "custom";
}

export interface RobotPose {
  jointAngles: number[];
  position: [number, number, number];
  orientation: [number, number, number, number]; // quaternion
}

