"use client";
import React, { useState } from "react";
import { AlertCircle, Info } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

// Types
type Course = {
  id: string;
  name: string;
  enrollment: number;
  isPostgraduate: boolean;
};

type Room = {
  id: string;
  capacity: number;
};

type TimeSlot = {
  id: string;
  day: "MWF" | "TT";
  time: string;
};

type ScheduleItem = {
  courseId: string;
  roomId: string;
  timeSlotId: string;
};

// Generate a large dataset of courses
const generateCourses = (count: number): Course[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `CS${100 + i}`,
    name: `Computer Science ${100 + i}`,
    enrollment: Math.floor(Math.random() * 200) + 10,
    isPostgraduate: i >= count * 0.7, // 30% of courses are postgraduate
  }));
};

// Mock data
const rooms: Room[] = [
  { id: "101", capacity: 25 },
  { id: "115", capacity: 50 },
  { id: "200", capacity: 250 },
  { id: "300", capacity: 100 },
  { id: "400", capacity: 150 },
];

const timeSlots: TimeSlot[] = [
  { id: "MWF9", day: "MWF", time: "9:00" },
  { id: "MWF10", day: "MWF", time: "10:00" },
  { id: "MWF11", day: "MWF", time: "11:00" },
  { id: "MWF2", day: "MWF", time: "14:00" },
  { id: "TT9", day: "TT", time: "9:00" },
  { id: "TT10:30", day: "TT", time: "10:30" },
  { id: "TT2", day: "TT", time: "14:00" },
  { id: "TT3:30", day: "TT", time: "15:30" },
];

const courses = generateCourses(50);

const AdvancedCourseSchedulingSystem: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleScheduleCourse = () => {
    if (!selectedCourse || !selectedRoom || !selectedTimeSlot) {
      setError("Please select a course, room, and time slot.");
      return;
    }

    const newScheduleItem: ScheduleItem = {
      courseId: selectedCourse,
      roomId: selectedRoom,
      timeSlotId: selectedTimeSlot,
    };

    const newSchedule = [...schedule, newScheduleItem];

    const conflictError = checkForConflicts(newSchedule);
    if (conflictError) {
      setError(conflictError);
      return;
    }

    setSchedule(newSchedule);
    clearSelections();
  };

  const checkForConflicts = (newSchedule: ScheduleItem[]): string | null => {
    if (hasConflicts(newSchedule)) {
      return "This scheduling conflicts with an existing course in the same room and time slot.";
    }
    if (exceedsCapacity(newSchedule)) {
      return "The selected room's capacity is less than the course enrollment.";
    }
    if (hasPostgraduateConflicts(newSchedule)) {
      return "There is a postgraduate course conflict with the same time slot.";
    }
    return null;
  };

  const hasConflicts = (newSchedule: ScheduleItem[]): boolean => {
    return newSchedule.some((item, index) =>
      newSchedule
        .slice(index + 1)
        .some(
          (otherItem) =>
            item.roomId === otherItem.roomId &&
            item.timeSlotId === otherItem.timeSlotId,
        ),
    );
  };

  const exceedsCapacity = (newSchedule: ScheduleItem[]): boolean => {
    return newSchedule.some((item) => {
      const course = courses.find((c) => c.id === item.courseId);
      const room = rooms.find((r) => r.id === item.roomId);
      return course && room && course.enrollment > room.capacity;
    });
  };

  const hasPostgraduateConflicts = (newSchedule: ScheduleItem[]): boolean => {
    const postgraduateCourses = newSchedule.filter(
      (item) => courses.find((c) => c.id === item.courseId)?.isPostgraduate,
    );
    return postgraduateCourses.some((item, index) =>
      postgraduateCourses
        .slice(index + 1)
        .some((otherItem) => item.timeSlotId === otherItem.timeSlotId),
    );
  };

  const clearSelections = () => {
    setError(null);
    setSelectedCourse("");
    setSelectedRoom("");
    setSelectedTimeSlot("");
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Advanced Course Scheduling System
      </h1>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select.Root value={selectedCourse} onValueChange={setSelectedCourse}>
          <Select.Trigger className="inline-flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold bg-white border border-gray-300 shadow-sm h-12 w-full">
            <Select.Value placeholder="Select a course" />
            <span className="text-gray-500">▼</span>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg">
              <Select.Viewport className="p-2">
                {courses.map((course) => (
                  <Select.Item
                    key={course.id}
                    value={course.id}
                    className="relative flex items-center px-4 py-2 rounded-lg text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-pointer"
                  >
                    <Select.ItemText>
                      {course.name} ({course.isPostgraduate ? "PG" : "UG"}){" "}
                      {course.enrollment}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <Select.Root value={selectedRoom} onValueChange={setSelectedRoom}>
          <Select.Trigger className="inline-flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold bg-white border border-gray-300 shadow-sm h-12 w-full">
            <Select.Value placeholder="Select a room" />
            <span className="text-gray-500">▼</span>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg">
              <Select.Viewport className="p-2">
                {rooms.map((room) => (
                  <Select.Item
                    key={room.id}
                    value={room.id}
                    className="relative flex items-center px-4 py-2 rounded-lg text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-pointer"
                  >
                    <Select.ItemText>
                      Room {room.id} (Cap: {room.capacity})
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <Select.Root
          value={selectedTimeSlot}
          onValueChange={setSelectedTimeSlot}
        >
          <Select.Trigger className="inline-flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold bg-white border border-gray-300 shadow-sm h-12 w-full">
            <Select.Value placeholder="Select a time slot" />
            <span className="text-gray-500">▼</span>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg">
              <Select.Viewport className="p-2">
                {timeSlots.map((slot) => (
                  <Select.Item
                    key={slot.id}
                    value={slot.id}
                    className="relative flex items-center px-4 py-2 rounded-lg text-sm text-gray-700 font-medium focus:bg-gray-100 cursor-pointer"
                  >
                    <Select.ItemText>
                      {slot.day} {slot.time}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <button
          onClick={handleScheduleCourse}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors font-semibold h-12 w-full"
        >
          Schedule Course
        </button>
      </div>
      {error && (
        <AlertDialog.Root open={!!error}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-black/50 fixed inset-0" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-96">
              <AlertDialog.Title className="text-lg font-medium text-gray-900 mb-2">
                Error
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm text-gray-500 mb-4">
                {error}
              </AlertDialog.Description>
              <div className="flex justify-end">
                <AlertDialog.Cancel asChild>
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    onClick={() => setError(null)}
                  >
                    Okay
                  </button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}

      <h2 className="text-xl font-semibold mb-2">Current Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Room</th>
              {timeSlots.map((slot) => (
                <th key={slot.id} className="border p-2">
                  {slot.day} {slot.time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border p-2">{room.id}</td>
                {timeSlots.map((slot) => {
                  const scheduledCourse = schedule.find(
                    (item) =>
                      item.roomId === room.id && item.timeSlotId === slot.id,
                  );
                  const course = courses.find(
                    (c) => c.id === scheduledCourse?.courseId,
                  );
                  return (
                    <td key={`${room.id}-${slot.id}`} className="border p-2">
                      {course ? (
                        <div className="text-xs">
                          <div>{course.name}</div>
                          <div>({course.isPostgraduate ? "PG" : "UG"})</div>
                          <div>Enroll: {course.enrollment}</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Scheduling Rules
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>No course can be scheduled in the same room at the same time.</li>
          <li>
            The room capacity must be greater than or equal to the course
            enrollment.
          </li>
          <li>Postgraduate courses cannot be scheduled at the same time.</li>
          <li>
            Undergraduate courses are scheduled on a first-come, first-served
            basis.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedCourseSchedulingSystem;
