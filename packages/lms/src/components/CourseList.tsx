"use client";

import React from "react";
import { Course } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

interface CourseListProps {
  courses: Course[];
}

export const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <p className="text-sm text-gray-500">{course.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  course.difficulty === "beginner"
                    ? "bg-green-100 text-green-800"
                    : course.difficulty === "intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {course.difficulty}
              </span>
              {course.category && (
                <span className="text-xs text-gray-500">{course.category}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

