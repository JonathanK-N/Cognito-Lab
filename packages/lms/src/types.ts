export interface Course {
  id: string;
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface CourseProgress {
  id: string;
  enrollmentId: string;
  lessonId?: string;
  quizId?: string;
  completed: boolean;
  score?: number;
  createdAt: string;
  updatedAt: string;
}

