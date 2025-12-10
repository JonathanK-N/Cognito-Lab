import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";

const prisma = new PrismaClient();

export const getUsers = async (req: AuthRequest, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  res.json({
    success: true,
    data: users,
  });
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (req.user?.id !== id && req.user?.role !== "admin" && req.user?.role !== "teacher") {
    throw new AppError(403, "Insufficient permissions");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  res.json({
    success: true,
    data: user,
  });
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (req.user?.id !== id && req.user?.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  const { name, role } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(role && req.user?.role === "admin" && { role }),
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  res.json({
    success: true,
    data: user,
  });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: "User deleted successfully",
  });
};

