import { create } from "zustand";
import { Robot, RobotPose } from "@cognitolab/common";

interface RobotState {
  robot: Robot | null;
  currentPose: RobotPose | null;
  trajectory: RobotPose[];
  setRobot: (robot: Robot) => void;
  setPose: (pose: RobotPose) => void;
  setTrajectory: (trajectory: RobotPose[]) => void;
  clear: () => void;
}

export const useRobotStore = create<RobotState>((set) => ({
  robot: null,
  currentPose: null,
  trajectory: [],

  setRobot: (robot) => set({ robot }),

  setPose: (pose) => set({ currentPose: pose }),

  setTrajectory: (trajectory) => set({ trajectory }),

  clear: () =>
    set({
      robot: null,
      currentPose: null,
      trajectory: [],
    }),
}));

