import { Response } from "express";
import OpenAI from "openai";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCircuitSchema = z.object({
  description: z.string().min(10),
});

const analyzeCircuitSchema = z.object({
  circuit: z.any(),
});

const generateCodeSchema = z.object({
  description: z.string().min(10),
  mcuType: z.string(),
  language: z.enum(["arduino", "c", "cpp", "micropython"]),
});

const generateTrajectorySchema = z.object({
  robotType: z.string(),
  startPose: z.array(z.number()).length(6),
  endPose: z.array(z.number()).length(6),
  constraints: z.any().optional(),
});

const generatePCBSchema = z.object({
  schematic: z.any(),
  constraints: z.any().optional(),
});

export const generateCircuit = async (req: AuthRequest, res: Response) => {
  try {
    const { description } = generateCircuitSchema.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert electrical engineer. Generate circuit schematics in JSON format with components, connections, and properties.",
        },
        {
          role: "user",
          content: `Generate a circuit based on this description: ${description}. Return a JSON object with components array and connections array.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const circuit = JSON.parse(completion.choices[0].message.content || "{}");

    res.json({
      success: true,
      data: circuit,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw new AppError(500, "Failed to generate circuit");
  }
};

export const analyzeCircuit = async (req: AuthRequest, res: Response) => {
  try {
    const { circuit } = analyzeCircuitSchema.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert electrical engineer. Analyze circuits and provide explanations, identify issues, and suggest improvements.",
        },
        {
          role: "user",
          content: `Analyze this circuit: ${JSON.stringify(circuit)}. Provide analysis, voltage/current explanations, and any issues found.`,
        },
      ],
    });

    const analysis = completion.choices[0].message.content;

    res.json({
      success: true,
      data: { analysis },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw new AppError(500, "Failed to analyze circuit");
  }
};

export const generateCode = async (req: AuthRequest, res: Response) => {
  try {
    const { description, mcuType, language } = generateCodeSchema.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert ${language} programmer for ${mcuType} microcontrollers. Generate clean, well-commented code.`,
        },
        {
          role: "user",
          content: `Generate ${language} code for ${mcuType} based on: ${description}`,
        },
      ],
    });

    const code = completion.choices[0].message.content;

    res.json({
      success: true,
      data: { code },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw new AppError(500, "Failed to generate code");
  }
};

export const generateRobotTrajectory = async (req: AuthRequest, res: Response) => {
  try {
    const { robotType, startPose, endPose, constraints } = generateTrajectorySchema.parse(
      req.body
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert robotics engineer. Generate robot trajectories with waypoints, joint angles, and timing.",
        },
        {
          role: "user",
          content: `Generate trajectory for ${robotType} from ${JSON.stringify(startPose)} to ${JSON.stringify(endPose)}. Constraints: ${JSON.stringify(constraints || {})}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const trajectory = JSON.parse(completion.choices[0].message.content || "{}");

    res.json({
      success: true,
      data: trajectory,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw new AppError(500, "Failed to generate trajectory");
  }
};

export const generatePCB = async (req: AuthRequest, res: Response) => {
  try {
    const { schematic, constraints } = generatePCBSchema.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert PCB designer. Generate PCB layouts with component placement, routing, and layer information.",
        },
        {
          role: "user",
          content: `Generate PCB layout from schematic: ${JSON.stringify(schematic)}. Constraints: ${JSON.stringify(constraints || {})}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const pcb = JSON.parse(completion.choices[0].message.content || "{}");

    res.json({
      success: true,
      data: pcb,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw new AppError(500, "Failed to generate PCB");
  }
};

