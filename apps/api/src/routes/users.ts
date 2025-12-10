import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/", authorize("admin", "teacher"), getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", authorize("admin"), deleteUser);

