import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getCourseProgress,
} from "../controllers/courseController";

export const courseRouter = Router();

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get("/:id/progress", authenticate, getCourseProgress);

courseRouter.use(authenticate);

courseRouter.post("/", createCourse);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);
courseRouter.post("/:id/enroll", enrollCourse);

