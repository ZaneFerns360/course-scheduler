"use client";
import React, { useState } from "react";
import { AlertCircle, Plus, X, Info } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";

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
  preference: 1 | 2 | 3 | null;
};

const courses: Course[] = [
  { id: "math1", name: "Algebra", category: "Math" },
  { id: "math2", name: "Geometry", category: "Math" },
  { id: "math3", name: "Calculus", category: "Math" },
  { id: "sci1", name: "Biology", category: "Science" },
  { id: "sci2", name: "Chemistry", category: "Science" },
  { id: "sci3", name: "Physics", category: "Science" },
  { id: "eng1", name: "Literature", category: "English" },
  { id: "eng2", name: "Creative Writing", category: "English" },
  { id: "his1", name: "World History", category: "History" },
  { id: "his2", name: "US History", category: "History" },
  { id: "wks1", name: "Woodworking", category: "Workshop" },
  { id: "wks2", name: "Robotics", category: "Workshop" },
  { id: "ext1", name: "Drama Club", category: "Extracurricular" },
  { id: "ext2", name: "Debate Team", category: "Extracurricular" },
  { id: "ext3", name: "Chess Club", category: "Extracurricular" },
];

const rules = [
  "Select exactly 8 courses in total.",
  "Choose at least 1 course from each category: Math, Science, English, History, and Workshop.",
  "Select a maximum of 2 Extracurricular courses.",
  "Assign 3 first preferences, 3 second preferences, and 2 third preferences.",
];

const CourseSchedulingSystem: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);

  const addCourse = (courseId: string) => {
    if (selectedCourses.length >= 8) {
      setError("You cannot select more than 8 courses.");
      return;
    }
    if (selectedCourses.some((c) => c.courseId === courseId)) {
      setError("This course is already in your list.");
      return;
    }
    const course = courses.find((c) => c.id === courseId);
    if (
      course?.category === "Extracurricular" &&
      selectedCourses.filter(
        (c) =>
          courses.find((course) => course.id === c.courseId)?.category ===
          "Extracurricular",
      ).length >= 2
    ) {
      setError("You can select a maximum of 2 Extracurricular courses.");
      return;
    }
    setSelectedCourses([...selectedCourses, { courseId, preference: null }]);
    setError(null);
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.courseId !== courseId));
    setError(null);
  };

  const updatePreference = (courseId: string, preference: 1 | 2 | 3) => {
    const preferenceCounts = selectedCourses.reduce(
      (acc, selection) => {
        if (selection.preference && selection.courseId !== courseId) {
          acc[selection.preference] = (acc[selection.preference] || 0) + 1;
        }
        return acc;
      },
      {} as Record<number, number>,
    );

    if ((preferenceCounts[preference] || 0) >= 3) {
      setError(
        `You can only assign ${preference} as a preference to 3 courses.`,
      );
      return;
    }

    const updatedCourses = selectedCourses.map((course) =>
      course.courseId === courseId ? { ...course, preference } : course,
    );
    setSelectedCourses(updatedCourses);
    setError(null);
  };

  const validateSelection = (): boolean => {
    const categoryCounts = selectedCourses.reduce(
      (acc, selection) => {
        const course = courses.find((c) => c.id === selection.courseId);
        if (course) {
          acc[course.category] = (acc[course.category] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    if (selectedCourses.length !== 8) {
      setError("You must select exactly 8 courses.");
      return false;
    }

    const categories = [
      "Math",
      "Science",
      "English",
      "History",
      "Workshop",
    ] as const;
    for (const category of categories) {
      if ((categoryCounts[category] || 0) < 1) {
        setError(`You must select at least 1 ${category} course.`);
        return false;
      }
    }

    if ((categoryCounts["Extracurricular"] || 0) > 2) {
      setError("You can select a maximum of 2 Extracurricular courses.");
      return false;
    }

    const preferenceCounts = selectedCourses.reduce(
      (acc, selection) => {
        if (selection.preference) {
          acc[selection.preference] = (acc[selection.preference] || 0) + 1;
        }
        return acc;
      },
      {} as Record<number, number>,
    );

    if (
      preferenceCounts[1] !== 3 ||
      preferenceCounts[2] !== 3 ||
      preferenceCounts[3] !== 2
    ) {
      setError(
        "You must assign 3 first preferences, 3 second preferences, and 2 third preferences.",
      );
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (validateSelection()) {
      console.log("Courses submitted successfully:", selectedCourses);
      alert("Courses submitted successfully!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Student Course Scheduling System
      </h1>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          Course Selection Rules
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none">
                  <Info className="h-5 w-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-white p-2 rounded shadow-lg max-w-xs">
                  <p className="text-sm text-gray-700">
                    Click to expand/collapse the rules
                  </p>
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </h2>
        <button
          onClick={() => setShowRules(!showRules)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-2"
        >
          {showRules ? "Hide Rules" : "Show Rules"}
        </button>
        {showRules && (
          <ul className="list-disc list-inside">
            {rules.map((rule, index) => (
              <li key={index} className="text-sm text-gray-700">
                {rule}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.category}</p>
              <button
                onClick={() => addCourse(course.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Selected Courses</h2>
        {selectedCourses.length === 0 ? (
          <p className="text-gray-600">No courses selected.</p>
        ) : (
          <ul className="space-y-4">
            {selectedCourses.map((selection, index) => {
              const course = courses.find((c) => c.id === selection.courseId);
              return (
                <li
                  key={selection.courseId}
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {course?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {course?.category}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Preference:</span>
                      <Select.Root
                        value={selection.preference?.toString() || ""}
                        onValueChange={(value) =>
                          updatePreference(
                            selection.courseId,
                            parseInt(value) as 1 | 2 | 3,
                          )
                        }
                      >
                        <Select.Trigger className="inline-flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                          <Select.Value placeholder="Select" />
                          <Select.Icon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 00-.894.553l-6 11A1 1 0 004 16h12a1 1 0 00.894-1.447l-6-11A1 1 0 0010 3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="z-10 bg-white rounded shadow-lg">
                            <Select.Viewport className="p-2">
                              <Select.Item value="1">
                                <Select.ItemText>1</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="2">
                                <Select.ItemText>2</Select.ItemText>
                              </Select.Item>
                              <Select.Item value="3">
                                <Select.ItemText>3</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCourse(selection.courseId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <AlertDialog.Root open={!!error} onOpenChange={() => setError(null)}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <AlertDialog.Title className="text-lg font-semibold text-red-600 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" /> Error
              </AlertDialog.Title>
              <AlertDialog.Description className="mt-2 text-sm text-gray-700">
                {error}
              </AlertDialog.Description>
              <div className="mt-4 flex justify-end">
                <AlertDialog.Cancel
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={() => setError(null)}
                >
                  Close
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
      >
        Submit Courses
      </button>
    </div>
  );
};

export default CourseSchedulingSystem;
