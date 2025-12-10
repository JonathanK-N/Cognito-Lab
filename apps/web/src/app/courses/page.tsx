"use client";

import React from "react";
import { CourseList } from "@cognitolab/lms";
import { Course } from "@cognitolab/lms";

export default function CoursesPage() {
  // TODO: Charger depuis l'API
  const courses: Course[] = [];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Cours</h1>
      <CourseList courses={courses} />
    </div>
  );
}

