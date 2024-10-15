"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { XCircle, CheckCircle } from "lucide-react";
import clsx from "clsx"; // For conditional styling
import { Separator } from "@radix-ui/react-separator";

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

type CourseStats = {
  courseId: string;
  name: string;
  category: string;
  points: number;
};

type Teacher = {
  id: number;
  name: string;
  category: string;
};

const DisplayUserCourses: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseStats, setCourseStats] = useState<CourseStats[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<SelectedCourse[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState<string[][][]>([]); // For grid layout
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

        fetch("http://localhost:8055/items/teachers")
          .then((res) => res.json())
          .then((data) => {
            setTeachers(data.data);
          });
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

    const calculateCourseStats = (schedules: Schedule[], courses: Course[]) => {
      const coursePoints: { [key: string]: number } = {};
      schedules.forEach((schedule) => {
        schedule.selectedCourses.forEach((selectedCourse) => {
          if (!coursePoints[selectedCourse.courseId]) {
            coursePoints[selectedCourse.courseId] = 0;
          }
          coursePoints[selectedCourse.courseId] +=
            4 - selectedCourse.preference;
        });
      });

      const stats = Object.keys(coursePoints).map((courseId) => {
        const course = courses.find((course) => course.id === courseId);
        return {
          courseId,
          name: course?.name || "Unknown",
          category: course?.category || "Unknown",
          points: coursePoints[courseId],
        };
      });
      setCourseStats(stats);
    };

    const initializeData = async () => {
      await fetchCourses();
      const schedulesFromStorage = fetchSchedulesFromLocalStorage();
      setSchedules(schedulesFromStorage);
      setLoading(false);
      calculateCourseStats(schedulesFromStorage, courses);
    };

    initializeData();
  }, [courses]);

  const getCourseDetails = (courseId: string) => {
    return courses.find((course) => course.id === courseId);
  };

  const discardLowPointCourses = () => {
    const threshold = 3;
    const filtered = courseStats
      .filter((stat) => stat.points >= threshold)
      .map((stat) => stat.courseId);
    const updatedSchedules = schedules.map((schedule) => ({
      ...schedule,
      selectedCourses: schedule.selectedCourses.filter((course) =>
        filtered.includes(course.courseId)
      ),
    }));
    setSchedules(updatedSchedules);
    setFilteredCourses(
      updatedSchedules.flatMap((schedule) => schedule.selectedCourses)
    );
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
  ];

  const categoryColors = {
    Math: "bg-red-300",
    Science: "bg-green-300",
    English: "bg-blue-300",
    History: "bg-yellow-300",
    Workshop: "bg-purple-300",
    Extracurricular: "bg-pink-300",
  };
  const generateTimetable = () => {
    const tempTimetable: string[][][] = Array.from({ length: 5 }, () =>
      Array.from({ length: 9 }, () => [])
    ); // 5 days and 9 time slots

    const teacherMap: { [category: string]: Teacher[] } = teachers.reduce(
      (acc, teacher) => {
        if (!acc[teacher.category]) acc[teacher.category] = [];
        acc[teacher.category].push(teacher);
        return acc;
      },
      {} as { [category: string]: Teacher[] }
    );

    if (!filteredCourses.length) {
      console.error("No filtered courses available.");
      return;
    }

    filteredCourses.forEach((selectedCourse) => {
      const course = courses.find((c) => c.id === selectedCourse.courseId);
      if (!course) {
        console.error(`Course with ID ${selectedCourse.courseId} not found.`);
        return;
      }

      const { category } = course;
      const availableTeachers = teacherMap[category] || [];
      if (availableTeachers.length > 0) {
        let assigned = false;
        for (let dayIndex = 0; dayIndex < 5 && !assigned; dayIndex++) {
          for (let slotIndex = 0; slotIndex < 9; slotIndex++) {
            const teacher =
              availableTeachers[
                Math.floor(Math.random() * availableTeachers.length)
              ].name;

            // Check if this time slot is already taken
            if (!tempTimetable[dayIndex][slotIndex].length) {
              tempTimetable[dayIndex][slotIndex].push(
                `${course.name} - ${teacher}`
              );
              assigned = true;
              break;
            }
          }
        }
        if (!assigned) {
          console.error(
            `Could not assign course ${course.name} to any time slot.`
          );
        }
      } else {
        console.error(`No available teachers for category ${category}.`);
      }
    });

    setTimetable(tempTimetable);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (schedules.length === 0) {
    return <div>No schedules found in localStorage.</div>;
  }

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Schedules</h1>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={courseStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="points" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={courseStats}
              dataKey="points"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
            >
              {courseStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <button
        onClick={discardLowPointCourses}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Discard Low Point Courses
      </button>
      <button
        onClick={generateTimetable}
        className="mb-8 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
      >
        Generate Random Timetable
      </button>
      <div className="space-y-10">
        {schedules.map((schedule) => (
          <div key={schedule.rollNo} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Roll Number: {schedule.rollNo}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.selectedCourses.map((selectedCourse) => {
                const courseDetails = getCourseDetails(selectedCourse.courseId);
                const courseStat = courseStats.find(
                  (stat) => stat.courseId === selectedCourse.courseId
                );
                const isLowPoint = courseStat && courseStat.points < 5;
                return (
                  <div
                    key={selectedCourse.courseId}
                    className={`p-4 rounded-lg shadow flex items-center justify-between ${
                      isLowPoint
                        ? "bg-red-100 border-l-4 border-red-500"
                        : "bg-gray-100 border-l-4 border-blue-500"
                    }`}
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
                      {isLowPoint ? (
                        <XCircle className="text-red-500" />
                      ) : (
                        <CheckCircle className="text-green-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={generateTimetable}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Timetable
        </button>
        <div className="mt-4 grid grid-cols-6 gap-4">
          <div></div>
          {days.map((day, index) => (
            <div key={index} className="font-bold text-lg">
              {day}
            </div>
          ))}

          {timeSlots.map((slot, timeIndex) => (
            <React.Fragment key={timeIndex}>
              <div className="font-bold text-lg">{slot}</div>
              {timetable.map((dayTimetable, dayIndex) => (
                <div
                  key={`${timeIndex}-${dayIndex}`}
                  className="p-4 border rounded-lg h-24 flex justify-center items-center"
                >
                  {dayTimetable[timeIndex]?.length > 0 ? (
                    dayTimetable[timeIndex].map((entry, idx) => {
                      const [courseName, teacherName] = entry.split(" - ");
                      const course = courses.find((c) => c.name === courseName);
                      const color = course
                        ? categoryColors[course.category]
                        : "bg-gray-300";
                      return (
                        <div
                          key={idx}
                          className={`text-sm font-semibold text-center p-2 ${color} rounded`}
                        >
                          {courseName}
                          <br />
                          <span className="text-xs font-light">
                            {teacherName}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-500">Free</div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayUserCourses;
