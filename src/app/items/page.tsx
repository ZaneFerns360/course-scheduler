"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Course = {
  id: string;
  name: string;
  category:
    | "Math"
    | "Science"
    | "English"
    | "History"
    | "Workshop"
    | "Extracurricular";
};

type SelectedCourse = {
  courseId: string;
  preference: 1 | 2 | 3;
};

type Schedule = {
  rollNo: string;
  selectedCourses: SelectedCourse[];
};

const DisplayUserCourses: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8055/items/courses");
        const data = await response.json();
        const formattedCourses = data.data.map((course: any) => ({
          id: course.id.toString(),
          name: course.Name,
          category: course.category,
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    const fetchSchedulesFromLocalStorage = () => {
      const localStorageSchedules: Schedule[] = [];
      for (const [key, value] of Object.entries(localStorage)) {
        try {
          const schedule: Schedule = JSON.parse(value);
          if (schedule.rollNo === key) {
            localStorageSchedules.push(schedule);
          }
        } catch (error) {
          console.error("Failed to parse localStorage item:", error);
        }
      }
      return localStorageSchedules;
    };

    const initializeData = async () => {
      await fetchCourses();
      const schedulesFromStorage = fetchSchedulesFromLocalStorage();
      setSchedules(schedulesFromStorage);
      setLoading(false);
    };

    initializeData();
  }, []);

  const getCourseDetails = (courseId: string) => {
    return courses.find((course) => course.id === courseId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (schedules.length === 0) {
    return <div>No schedules found in localStorage.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Schedules</h1>
      <div className="space-y-10">
        {schedules.map((schedule) => (
          <div key={schedule.rollNo} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Roll Number: {schedule.rollNo}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.selectedCourses.map((selectedCourse) => {
                const courseDetails = getCourseDetails(selectedCourse.courseId);
                return (
                  <div
                    key={selectedCourse.courseId}
                    className="p-4 rounded-lg shadow flex items-center justify-between bg-gray-100 border-l-4 border-blue-500"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {courseDetails?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {courseDetails?.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        Preference: {selectedCourse.preference}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayUserCourses;
