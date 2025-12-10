import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";
import { z } from "zod";

const prisma = new PrismaClient();

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  category: z.string().optional(),
});

export const getCourses = async (_req: AuthRequest, res: Response) => {
  const courses = await prisma.course.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: courses,
  });
};

export const getCourseById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      lessons: {
        orderBy: { order: "asc" },
      },
      quizzes: true,
    },
  });

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  res.json({
    success: true,
    data: course,
  });
};

export const createCourse = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== "teacher" && req.user?.role !== "admin") {
    throw new AppError(403, "Only teachers and admins can create courses");
  }

  try {
    const data = courseSchema.parse(req.body);

    const course = await prisma.course.create({
      data: {
        ...data,
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
      data: course,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const updateCourse = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  if (course.authorId !== req.user?.id && req.user?.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  try {
    const data = courseSchema.partial().parse(req.body);

    const updatedCourse = await prisma.course.update({
      where: { id },
      data,
    });

    res.json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  if (course.authorId !== req.user?.id && req.user?.role !== "admin") {
    throw new AppError(403, "Insufficient permissions");
  }

  await prisma.course.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: "Course deleted successfully",
  });
};

export const enrollCourse = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  const existingEnrollment = await prisma.courseEnrollment.findUnique({
    where: {
      userId_courseId: {
        userId: req.user!.id,
        courseId: id,
      },
    },
  });

  if (existingEnrollment) {
    throw new AppError(400, "Already enrolled in this course");
  }

  const enrollment = await prisma.courseEnrollment.create({
    data: {
      userId: req.user!.id,
      courseId: id,
    },
  });

  res.status(201).json({
    success: true,
    data: enrollment,
  });
};

export const getCourseProgress = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const enrollment = await prisma.courseEnrollment.findUnique({
    where: {
      userId_courseId: {
        userId: req.user!.id,
        courseId: id,
      },
    },
    include: {
      progress: true,
    },
  });

  if (!enrollment) {
    throw new AppError(404, "Not enrolled in this course");
  }

  res.json({
    success: true,
    data: enrollment,
  });
};

