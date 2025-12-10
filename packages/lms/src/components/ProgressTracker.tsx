"use client";

import React from "react";
import { CourseProgress } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

interface ProgressTrackerProps {
  progress: CourseProgress[];
  totalLessons: number;
  totalQuizzes: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  totalLessons,
  totalQuizzes,
}) => {
  const completedLessons = progress.filter((p) => p.lessonId && p.completed).length;
  const completedQuizzes = progress.filter((p) => p.quizId && p.completed).length;
  const totalItems = totalLessons + totalQuizzes;
  const completedItems = completedLessons + completedQuizzes;
  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progression globale</span>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Leçons complétées</p>
              <p className="text-2xl font-bold">
                {completedLessons} / {totalLessons}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Quiz complétés</p>
              <p className="text-2xl font-bold">
                {completedQuizzes} / {totalQuizzes}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

