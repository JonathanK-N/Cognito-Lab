import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";
import { z } from "zod";

const prisma = new PrismaClient();

const addCollaboratorSchema = z.object({
  userId: z.string(),
  permission: z.enum(["view", "edit"]).default("view"),
});

const addCommentSchema = z.object({
  content: z.string().min(1),
  elementId: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
});

export const getCollaborators = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (project.userId !== req.user!.id && req.user!.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  const collaborators = await prisma.projectCollaborator.findMany({
    where: { projectId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: collaborators,
  });
};

export const addCollaborator = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (project.userId !== req.user!.id && req.user!.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  try {
    const { userId, permission } = addCollaboratorSchema.parse(req.body);

    const collaborator = await prisma.projectCollaborator.create({
      data: {
        projectId,
        userId,
        permission,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: collaborator,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const removeCollaborator = async (req: AuthRequest, res: Response) => {
  const { projectId, userId } = req.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (project.userId !== req.user!.id && req.user!.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  await prisma.projectCollaborator.deleteMany({
    where: {
      projectId,
      userId,
    },
  });

  res.json({
    success: true,
    message: "Collaborator removed successfully",
  });
};

export const getComments = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  const comments = await prisma.comment.findMany({
    where: { projectId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({
    success: true,
    data: comments,
  });
};

export const addComment = async (req: AuthRequest, res: Response) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  try {
    const data = addCommentSchema.parse(req.body);

    const comment = await prisma.comment.create({
      data: {
        ...data,
        projectId,
        authorId: req.user!.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw error;
  }
};

