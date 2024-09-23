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
    console.log(selectedCourses);
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
      // Here you would typically send the data to a server
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none flex items-center"
                disabled={selectedCourses.some((c) => c.courseId === course.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                {selectedCourses.some((c) => c.courseId === course.id)
                  ? "Added"
                  : "Add Course"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Selected Courses</h2>
        <ul className="space-y-2">
          {selectedCourses.map((selection) => {
            const course = courses.find((c) => c.id === selection.courseId);
            return (
              <li
                key={selection.courseId}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span>
                  {course?.name} - {course?.category}
                </span>
                <div className="flex items-center">
                  <Select.Root
                    onValueChange={(value) =>
                      updatePreference(
                        selection.courseId,
                        parseInt(value) as 1 | 2 | 3,
                      )
                    }
                    value={selection.preference?.toString() || ""}
                  >
                    <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm leading-none h-9 gap-1 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none">
                      <Select.Value placeholder="Set preference" />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
                        <Select.Viewport className="p-2">
                          {[1, 2, 3].map((pref) => (
                            <Select.Item
                              key={pref}
                              value={pref.toString()}
                              className="relative flex items-center h-8 px-8 rounded text-sm text-gray-700 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none select-none"
                            >
                              <Select.ItemText>
                                {pref}st Preference
                              </Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  <button
                    onClick={() => removeCourse(selection.courseId)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none"
        disabled={selectedCourses.length !== 8}
      >
        Submit Course Selection
      </button>

      <AlertDialog.Root open={!!error}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black/50 fixed inset-0" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full">
            <AlertDialog.Title className="text-lg font-bold flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Error
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-gray-500">
              {error}
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => setError(null)}
              >
                Okay
              </button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default CourseSchedulingSystem;
