"use client";
import React, { useState } from "react";
import { Info } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
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
  const [error, setError] = useState<string | null>(null);

  const isValidSchedule = (newSchedule: ScheduleItem[]): boolean => {
    const teacherSchedules = newSchedule.reduce(
      (acc, item) => {
        if (!acc[item.teacherId]) acc[item.teacherId] = [];
        acc[item.teacherId].push(item);
        return acc;
      },
      {} as Record<string, ScheduleItem[]>,
    );

    for (const teacherId in teacherSchedules) {
      const teacherSchedule = teacherSchedules[teacherId];

      const lecturesPerDay = days.map(
        (day) =>
          teacherSchedule.filter(
            (item) => item.day === day && item.activityType === "lecture",
          ).length,
      );
      if (lecturesPerDay.some((count) => count > 4)) {
        setError(`Teacher ${teacherId} has more than 4 lectures on a day.`);
        return false;
      }

      if (lecturesPerDay.some((count) => count < 3)) {
        setError(`Teacher ${teacherId} has fewer than 3 lectures on a day.`);
        return false;
      }

      const meetingsPerWeek = teacherSchedule.filter(
        (item) => item.activityType === "meeting",
      ).length;
      if (meetingsPerWeek !== 1) {
        setError(
          `Teacher ${teacherId} does not have exactly 1 meeting per week.`,
        );
        return false;
      }

      const paperCorrectionsPerWeek = teacherSchedule.filter(
        (item) => item.activityType === "paperCorrection",
      ).length;
      if (paperCorrectionsPerWeek !== 2) {
        setError(
          `Teacher ${teacherId} does not have exactly 2 paper correction sessions per week.`,
        );
        return false;
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
        setError(`Teacher ${teacherId} has a time conflict in their schedule.`);
        return false;
      }
    }

    return true;
  };

  const handleScheduleActivity = () => {
    if (
      !selectedTeacher ||
      !selectedDay ||
      !selectedTimeSlot ||
      !selectedActivityType
    ) {
      setError("Please select all fields before scheduling.");
      return;
    }

    const newScheduleItem: ScheduleItem = {
      teacherId: selectedTeacher,
      day: selectedDay,
      timeSlot: selectedTimeSlot,
      activityType: selectedActivityType,
    };

    const newSchedule = [...schedule, newScheduleItem];

    if (isValidSchedule(newSchedule)) {
      setSchedule(newSchedule);
      setError(null);
      setSelectedTeacher("");
      setSelectedDay("");
      setSelectedTimeSlot("");
      setSelectedActivityType("lecture");
    } else {
      setError(
        "This scheduling conflicts with existing rules. Please try a different combination.",
      );
    }
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
      <Select.Root value={selectedTeacher} onValueChange={setSelectedTeacher}>
        <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-white border border-gray-300 h-9 w-[200px]">
          <Select.Value placeholder="Select a teacher" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.Viewport className="p-2">
              {teachers.map((teacher) => (
                <Select.Item
                  key={teacher.id}
                  value={teacher.id}
                  className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-default"
                >
                  <Select.ItemText>{teacher.name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Select.Root value={selectedDay} onValueChange={setSelectedDay}>
        <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-white border border-gray-300 h-9 w-[200px]">
          <Select.Value placeholder="Select a day" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.Viewport className="p-2">
              {days.map((day) => (
                <Select.Item
                  key={day}
                  value={day}
                  className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-default"
                >
                  <Select.ItemText>{day}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Select.Root value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
        <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-white border border-gray-300 h-9 w-[200px]">
          <Select.Value placeholder="Select a time slot" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.Viewport className="p-2">
              {timeSlots.map((slot) => (
                <Select.Item
                  key={slot}
                  value={slot}
                  className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-default"
                >
                  <Select.ItemText>{slot}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Select.Root
        value={selectedActivityType}
        onValueChange={(value) =>
          setSelectedActivityType(
            value as "lecture" | "meeting" | "paperCorrection",
          )
        }
      >
        <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-white border border-gray-300 h-9 w-[200px]">
          <Select.Value placeholder="Select activity type" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.Viewport className="p-2">
              {["lecture", "meeting", "paperCorrection"].map((type) => (
                <Select.Item
                  key={type}
                  value={type}
                  className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-default"
                >
                  <Select.ItemText>{type}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <button
        onClick={handleScheduleActivity}
        className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        Schedule Activity
      </button>
    </div>
  );

  const renderErrorAlert = () =>
    error ? (
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <div className="flex items-center text-red-600 cursor-pointer">
            <Info className="w-4 h-4 mr-1" />
            {error}
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <AlertDialog.Content className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 max-w-md mx-auto shadow-lg">
            <AlertDialog.Title className="text-lg font-medium text-gray-900">
              Error
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-gray-600">
              {error}
            </AlertDialog.Description>
            <div className="mt-4 flex justify-end">
              <AlertDialog.Action asChild>
                <button className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
                  Close
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    ) : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Scheduling System</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Rules:</h2>
        <ul className="list-disc pl-5">
          <li>No teacher should have more than 4 lectures per day.</li>
          <li>No teacher should have fewer than 3 lectures per day.</li>
          <li>Each teacher should have exactly 1 meeting per week.</li>
          <li>
            Each teacher should have exactly 2 paper correction sessions per
            week.
          </li>
          <li>
            No teacher should have overlapping activities at the same time and
            day.
          </li>
        </ul>
      </div>
      {renderErrorAlert()}
      {renderSchedulingForm()}
      {renderScheduleGrid()}
    </div>
  );
};

export default TeacherSchedulingSystem;
