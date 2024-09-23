"use client";

// pages/courses.tsx

"use client";

// pages/courses.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

type Course = {
  id: number;
  name: string;
  description: string;
  timings?: string | null;
  requirements?: string | null;
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("http://localhost:8055/items/courses");
      const data = await response.json();
      setCourses(data.data);
    }
    fetchCourses();
  }, []);

  const toggleAccordion = (id: number) => {
    setActiveCourse(activeCourse === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl mt-8 font-bold text-center mb-8">
        Available Courses
      </h1>
      <div className="max-w-2xl mx-auto">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg mb-4">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion(course.id)}
            >
              <h2 className="text-xl font-semibold">{course.name}</h2>
              {activeCourse === course.id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            {activeCourse === course.id && (
              <div className="p-4 border-t border-gray-200">
                <p className="mb-2 text-gray-700">{course.description}</p>
                {course.timings && (
                  <p className="mb-2">
                    <strong>Timings:</strong> {course.timings}
                  </p>
                )}
                {course.requirements && (
                  <p className="mb-4">
                    <strong>Requirements:</strong> {course.requirements}
                  </p>
                )}
                <Link
                  href={`/home/${course.id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Enroll
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
