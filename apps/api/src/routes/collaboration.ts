import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  getCollaborators,
  addCollaborator,
  removeCollaborator,
  getComments,
  addComment,
} from "../controllers/collaborationController";

export const collaborationRouter = Router();

collaborationRouter.use(authenticate);

collaborationRouter.get("/projects/:projectId/collaborators", getCollaborators);
collaborationRouter.post("/projects/:projectId/collaborators", addCollaborator);
collaborationRouter.delete("/projects/:projectId/collaborators/:userId", removeCollaborator);
collaborationRouter.get("/projects/:projectId/comments", getComments);
collaborationRouter.post("/projects/:projectId/comments", addComment);

