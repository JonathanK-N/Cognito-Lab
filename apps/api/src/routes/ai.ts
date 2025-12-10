import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  generateCircuit,
  analyzeCircuit,
  generateCode,
  generateRobotTrajectory,
  generatePCB,
} from "../controllers/aiController";

export const aiRouter = Router();

aiRouter.use(authenticate);

aiRouter.post("/circuit/generate", generateCircuit);
aiRouter.post("/circuit/analyze", analyzeCircuit);
aiRouter.post("/code/generate", generateCode);
aiRouter.post("/robot/trajectory", generateRobotTrajectory);
aiRouter.post("/pcb/generate", generatePCB);

