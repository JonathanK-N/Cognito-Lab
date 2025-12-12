import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { courseRouter } from "./routes/courses";
import { projectRouter } from "./routes/projects";
import { aiRouter } from "./routes/ai";
import { collaborationRouter } from "./routes/collaboration";
import { errorHandler } from "./middleware/errorHandler";
import { setupSocketIO } from "./socket";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/projects", projectRouter);
app.use("/api/ai", aiRouter);
app.use("/api/collaboration", collaborationRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "cognitolab-api",
    timestamp: new Date().toISOString(),
  });
});

// Socket.IO setup
setupSocketIO(io);

// Error handler
app.use(errorHandler);

httpServer.listen(Number(PORT), HOST, () => {
  console.log(`🚀 API Server running on ${HOST}:${PORT}`);
});

export { app, io };

