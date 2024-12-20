"use client";
import React, { useState, useEffect } from "react";
import { AlertCircle, Plus, X, Info, CheckCircle } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";

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

type Schedule = {
  rollNo: string;
  selectedCourses: SelectedCourse[];
};

const rules = [
  "Select exactly 8 courses in total.",
  "Choose at least 1 course from each category: Math, Science, English, History, and Workshop.",
  "Select a maximum of 2 Extracurricular courses.",
  "Assign 3 first preferences, 3 second preferences, and 2 third preferences.",
];

const CourseSchedulingSystem: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [rollNo, setRollNo] = useState<string>("");

  useEffect(() => {
    const fetchCourses = () => {
      const courses: Course[] = [
        { id: "1", name: "Calculus 101", category: "Math" },
        { id: "2", name: "Linear Algebra", category: "Math" },
        { id: "3", name: "Statistics Basics", category: "Math" },
        { id: "4", name: "Physics Fundamentals", category: "Science" },
        { id: "5", name: "Chemistry Principles", category: "Science" },
        { id: "6", name: "Biology 101", category: "Science" },
        { id: "7", name: "Literature and Composition", category: "English" },
        { id: "8", name: "Creative Writing", category: "English" },
        { id: "9", name: "Advanced Grammar", category: "English" },
        { id: "10", name: "World History", category: "History" },
        { id: "11", name: "American History", category: "History" },
        { id: "12", name: "Ancient Civilizations", category: "History" },
        { id: "13", name: "Woodworking Basics", category: "Workshop" },
        { id: "14", name: "Metalworking", category: "Workshop" },
        { id: "15", name: "Electronics Workshop", category: "Workshop" },
        { id: "16", name: "Photography", category: "Extracurricular" },
        { id: "17", name: "Music Appreciation", category: "Extracurricular" },
        { id: "18", name: "Drama and Theatre", category: "Extracurricular" },
      ];

      const formattedCourses = courses.map((course) => ({
        id: course.id,
        name: course.name,
        category: course.category,
      }));

      setCourses(formattedCourses);
    };

    fetchCourses();
  }, []);

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
      const schedule: Schedule = {
        rollNo,
        selectedCourses,
      };
      localStorage.setItem(rollNo, JSON.stringify(schedule));
      console.log("Courses submitted successfully:", selectedCourses);
      alert("Courses submitted successfully!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Student Course Scheduling System
      </h1>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Enter Your Roll Number
        </label>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
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
          {courses.map((course) => {
            const isSelected = selectedCourses.some(
              (c) => c.courseId === course.id,
            );
            return (
              <div
                key={course.id}
                className={`p-4 rounded-lg shadow flex items-center justify-between ${
                  isSelected
                    ? "bg-green-100 border-green-500 border-2"
                    : "bg-white"
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.category}</p>
                </div>
                <button
                  onClick={() =>
                    isSelected ? removeCourse(course.id) : addCourse(course.id)
                  }
                  className={`${
                    isSelected
                      ? "text-red-500 hover:text-red-700"
                      : "text-green-500 hover:text-green-700"
                  } focus:outline-none`}
                >
                  {isSelected ? <X /> : <Plus />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Selected Courses</h2>
          <ul className="list-none">
            {selectedCourses.map((selectedCourse) => {
              const course = courses.find(
                (course) => course.id === selectedCourse.courseId,
              );
              return (
                <li
                  key={selectedCourse.courseId}
                  className="p-4 rounded-lg shadow mb-2 bg-white flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{course?.name}</h3>
                    <p className="text-sm text-gray-600">{course?.category}</p>
                  </div>
                  <Select.Root
                    onValueChange={(value) =>
                      updatePreference(
                        selectedCourse.courseId,
                        parseInt(value) as 1 | 2 | 3,
                      )
                    }
                    value={selectedCourse.preference?.toString() || ""}
                  >
                    <Select.Trigger
                      className={`border border-gray-300 p-2 rounded focus:outline-none ${
                        selectedCourse.preference
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      <Select.Value placeholder="Select Preference" />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white shadow-lg rounded p-1">
                        <Select.Viewport>
                          <Select.Item
                            value="1"
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                          >
                            <Select.ItemText>1st Preference</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="2"
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                          >
                            <Select.ItemText>2nd Preference</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="3"
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                          >
                            <Select.ItemText>3rd Preference</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && (
        <div className="mb-6">
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="flex items-center text-red-600">
                <AlertCircle className="mr-2 h-5 w-5" />
                <span>{error}</span>
              </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
              <AlertDialog.Content className="bg-white p-6 rounded-md shadow-lg fixed inset-0 max-w-sm mx-auto">
                <AlertDialog.Title className="text-lg font-bold text-red-600 mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-6 w-6" />
                  Error
                </AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-gray-600">
                  {error}
                </AlertDialog.Description>
                <div className="flex justify-end mt-4">
                  <AlertDialog.Cancel asChild>
                    <button
                      onClick={() => setError(null)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Close
                    </button>
                  </AlertDialog.Cancel>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      )}

      <div className="flex flex-row space-x-3 justify-end">
        <Link
          href="/items"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          Verfiy Schedule
        </Link>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          Submit Courses
        </button>
      </div>
    </div>
  );
};

export default CourseSchedulingSystem;
