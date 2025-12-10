import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";
import { z } from "zod";

const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(["circuit", "schematic", "pcb", "microcontroller", "robotics"]),
  data: z.any().optional(),
});

export const getProjects = async (req: AuthRequest, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      userId: req.user!.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  res.json({
    success: true,
    data: projects,
  });
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (project.userId !== req.user!.id && req.user!.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  res.json({
    success: true,
    data: project,
  });
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const data = projectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: {
        ...data,
        userId: req.user!.id,
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (project.userId !== req.user!.id && req.user!.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  try {
    const data = projectSchema.partial().parse(req.body);

    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });

    res.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (project.userId !== req.user!.id && req.user!.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  await prisma.project.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: "Project deleted successfully",
  });
};

