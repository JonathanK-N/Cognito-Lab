"use client";

"use client";

import React, { useState } from "react";
import { Course, Lesson } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

interface CourseViewerProps {
  course: Course;
  lessons: Lesson[];
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ course, lessons }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(lessons[0] || null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Leçons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`w-full text-left p-2 rounded ${
                    currentLesson?.id === lesson.id
                      ? "bg-primary-100 text-primary-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {lesson.order}. {lesson.title}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>{currentLesson?.title || course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentLesson?.videoUrl && (
              <div className="mb-4">
                <iframe
                  src={currentLesson.videoUrl}
                  width="100%"
                  height="400"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {currentLesson?.content && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentLesson.content }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

