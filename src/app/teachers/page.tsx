"use client";
import React, { useState } from "react";
import { Info } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

type Teacher = {
  id: string;
  name: string;
};

type ScheduleItem = {
  teacherId: string;
  day: string;
  timeSlot: string;
  activityType: "lecture" | "meeting" | "paperCorrection";
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["9:00", "10:00", "11:00"];

const generateTeachers = (): Teacher[] => {
  return [
    { id: "T1", name: "Teacher 1" },
    { id: "T2", name: "Teacher 2" },
    { id: "T3", name: "Teacher 3" },
  ];
};

const teachers = generateTeachers();

const TeacherSchedulingSystem: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedActivityType, setSelectedActivityType] = useState<
    "lecture" | "meeting" | "paperCorrection"
  >("lecture");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const isValidSchedule = (newSchedule: ScheduleItem[]): boolean => {
    const teacherSchedules = newSchedule.reduce(
      (acc, item) => {
        if (!acc[item.teacherId]) acc[item.teacherId] = [];
        acc[item.teacherId].push(item);
        return acc;
      },
      {} as Record<string, ScheduleItem[]>,
    );

    const errors: string[] = [];

    for (const teacherId in teacherSchedules) {
      const teacherSchedule = teacherSchedules[teacherId];

      const lecturesPerDay = days.map(
        (day) =>
          teacherSchedule.filter(
            (item) => item.day === day && item.activityType === "lecture",
          ).length,
      );

      if (lecturesPerDay.some((count) => count > 4)) {
        errors.push(`Teacher ${teacherId} has more than 4 lectures on a day.`);
      }

      if (lecturesPerDay.some((count) => count < 3)) {
        errors.push(`Teacher ${teacherId} has fewer than 3 lectures on a day.`);
      }

      const meetingsPerWeek = teacherSchedule.filter(
        (item) => item.activityType === "meeting",
      ).length;
      if (meetingsPerWeek !== 1) {
        errors.push(
          `Teacher ${teacherId} must have exactly 1 meeting per week.`,
        );
      }

      const paperCorrectionsPerWeek = teacherSchedule.filter(
        (item) => item.activityType === "paperCorrection",
      ).length;
      if (paperCorrectionsPerWeek !== 2) {
        errors.push(
          `Teacher ${teacherId} must have exactly 2 paper correction sessions per week.`,
        );
      }

      const timeConflicts = teacherSchedule.some((item1, index) =>
        teacherSchedule.some(
          (item2, idx) =>
            index !== idx &&
            item1.day === item2.day &&
            item1.timeSlot === item2.timeSlot,
        ),
      );
      if (timeConflicts) {
        errors.push(
          `Teacher ${teacherId} has a time conflict in their schedule.`,
        );
      }
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleScheduleActivity = () => {
    if (
      !selectedTeacher ||
      !selectedDay ||
      !selectedTimeSlot ||
      !selectedActivityType
    ) {
      setErrorMessages(["Please fill in all fields before scheduling."]);
      return;
    }

    const newScheduleItem: ScheduleItem = {
      teacherId: selectedTeacher,
      day: selectedDay,
      timeSlot: selectedTimeSlot,
      activityType: selectedActivityType,
    };

    setSchedule([...schedule, newScheduleItem]);
    // Reset selections after adding the schedule item
    setSelectedTeacher("");
    setSelectedDay("");
    setSelectedTimeSlot("");
    setSelectedActivityType("lecture");
  };

  const checkSchedule = () => {
    isValidSchedule(schedule);
  };

  const getScheduleItemForSlot = (
    teacherId: string,
    day: string,
    timeSlot: string,
  ) => {
    return schedule.find(
      (item) =>
        item.teacherId === teacherId &&
        item.day === day &&
        item.timeSlot === timeSlot,
    );
  };

  const getActivityTypeColor = (
    activityType: "lecture" | "meeting" | "paperCorrection",
  ) => {
    switch (activityType) {
      case "lecture":
        return "bg-blue-200 text-blue-800";
      case "meeting":
        return "bg-green-200 text-green-800";
      case "paperCorrection":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-100";
    }
  };

  const renderScheduleGrid = () => (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Teacher</th>
            {days.map((day) => (
              <th key={day} className="border p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border p-2 font-medium">{teacher.name}</td>
              {days.map((day) => (
                <td key={`${teacher.id}-${day}`} className="border p-2">
                  <div className="grid grid-cols-2 gap-1">
                    {timeSlots.map((timeSlot) => {
                      const scheduleItem = getScheduleItemForSlot(
                        teacher.id,
                        day,
                        timeSlot,
                      );
                      return (
                        <Tooltip.Provider
                          key={`${teacher.id}-${day}-${timeSlot}`}
                        >
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div
                                className={`p-1 text-xs rounded ${
                                  scheduleItem
                                    ? getActivityTypeColor(
                                        scheduleItem.activityType,
                                      )
                                    : "bg-gray-100"
                                }`}
                              >
                                {timeSlot}
                                {scheduleItem && (
                                  <span className="block mt-1 text-xs">
                                    {scheduleItem.activityType}
                                  </span>
                                )}
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                className="bg-white p-2 rounded shadow-lg z-50 border border-gray-200"
                                sideOffset={5}
                              >
                                {scheduleItem ? (
                                  <>
                                    <p>
                                      <strong>Activity:</strong>{" "}
                                      {scheduleItem.activityType}
                                    </p>
                                    <p>
                                      <strong>Time:</strong>{" "}
                                      {scheduleItem.timeSlot}
                                    </p>
                                  </>
                                ) : (
                                  <p>No activity scheduled</p>
                                )}
                                <Tooltip.Arrow className="fill-white" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSchedulingForm = () => (
    <div className="mb-4 flex space-x-4 flex-wrap">
      <select
        value={selectedTeacher}
        onChange={(e) => setSelectedTeacher(e.target.value)}
        className="border border-gray-300 rounded h-9 px-2"
      >
        <option value="">Select a teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>

      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="border border-gray-300 rounded h-9 px-2"
      >
        <option value="">Select a day</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select
        value={selectedTimeSlot}
        onChange={(e) => setSelectedTimeSlot(e.target.value)}
        className="border border-gray-300 rounded h-9 px-2"
      >
        <option value="">Select a time slot</option>
        {timeSlots.map((timeSlot) => (
          <option key={timeSlot} value={timeSlot}>
            {timeSlot}
          </option>
        ))}
      </select>

      <select
        value={selectedActivityType}
        onChange={(e) =>
          setSelectedActivityType(
            e.target.value as "lecture" | "meeting" | "paperCorrection",
          )
        }
        className="border border-gray-300 rounded h-9 px-2"
      >
        <option value="lecture">Lecture</option>
        <option value="meeting">Meeting</option>
        <option value="paperCorrection">Paper Correction</option>
      </select>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleScheduleActivity}
      >
        Add Activity
      </button>

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={checkSchedule}
      >
        Check Schedule
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Scheduling System</h1>

      {errorMessages.length > 0 && (
        <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
          <ul className="list-disc pl-5">
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {renderSchedulingForm()}

      {renderScheduleGrid()}
    </div>
  );
};

export default TeacherSchedulingSystem;
