import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  projectId?: string;
}

export function setupSocketIO(io: Server) {
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      socket.userId = decoded.id;

      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected`);

    socket.on("join-project", async (projectId: string) => {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
          collaborators: true,
        },
      });

      if (!project) {
        socket.emit("error", { message: "Project not found" });
        return;
      }

      const hasAccess =
        project.userId === socket.userId ||
        project.collaborators.some((c) => c.userId === socket.userId) ||
        (await prisma.user.findUnique({ where: { id: socket.userId } }))?.role === "admin";

      if (!hasAccess) {
        socket.emit("error", { message: "Access denied" });
        return;
      }

      socket.join(`project:${projectId}`);
      socket.projectId = projectId;

      socket.to(`project:${projectId}`).emit("user-joined", {
        userId: socket.userId,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("leave-project", (projectId: string) => {
      socket.leave(`project:${projectId}`);
      socket.to(`project:${projectId}`).emit("user-left", {
        userId: socket.userId,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("cursor-move", (data: { x: number; y: number; projectId: string }) => {
      socket.to(`project:${data.projectId}`).emit("cursor-move", {
        userId: socket.userId,
        x: data.x,
        y: data.y,
      });
    });

    socket.on("project-update", async (data: { projectId: string; changes: any }) => {
      const project = await prisma.project.findUnique({
        where: { id: data.projectId },
      });

      if (!project) {
        socket.emit("error", { message: "Project not found" });
        return;
      }

      // Broadcast to other users in the project
      socket.to(`project:${data.projectId}`).emit("project-update", {
        userId: socket.userId,
        changes: data.changes,
        timestamp: new Date().toISOString(),
      });

      // Save to database (debounced in production)
      await prisma.project.update({
        where: { id: data.projectId },
        data: {
          data: {
            ...(project.data as object),
            ...data.changes,
          },
        },
      });
    });

    socket.on("disconnect", () => {
      if (socket.projectId) {
        socket.to(`project:${socket.projectId}`).emit("user-left", {
          userId: socket.userId,
          timestamp: new Date().toISOString(),
        });
      }
      console.log(`User ${socket.userId} disconnected`);
    });
  });
}

