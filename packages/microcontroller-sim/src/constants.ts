import { MCUType, SimulatorType } from "@cognitolab/common";

export const SIMULATOR_MAP: Record<MCUType, SimulatorType> = {
  "arduino-uno": "wokwi",
  "arduino-mega": "wokwi",
  "arduino-nano": "wokwi",
  "esp32": "wokwi",
  "nano-esp32": "wokwi",
  "attiny85": "wokwi",
  "stm32": "renode",
  "stm32f103": "renode",
  "stm32f401": "renode",
  "rp2040": "renode",
  "pico": "renode",
  "nrf52": "renode",
  "cortex-m": "renode",
  "riscv": "renode",
};

