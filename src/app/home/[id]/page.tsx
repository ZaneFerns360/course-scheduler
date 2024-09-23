"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { User, Book, Eye, MessageSquare, Calendar } from "lucide-react";

export default function Page({ params }: { params: { id: number } }) {
  const [course, setCourse] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<boolean | null>(
    null,
  );
  const [alreadyEnrolled, setAlreadyEnrolled] = useState<boolean>(false);

  const { id } = params;

  useEffect(() => {
    async function fetchCourseDetails() {
      const response = await fetch(`http://localhost:8055/items/courses/${id}`);
      const data = await response.json();
      setCourse(data.data);
    }

    function checkUsername() {
      const usernameCookie = { value: "cj" };
      return usernameCookie.value;
    }

    async function checkEnrollmentStatus() {
      const username = checkUsername();
      setUsername(username);

      const registrationResponse = await fetch(
        `http://localhost:8055/items/registrations?filter[user][_eq]=${username}`,
      );
      const registrationData = await registrationResponse.json();
      const registration = registrationData.data[0];

      if (registration && registration.enrolled?.split(",").includes(id)) {
        setAlreadyEnrolled(true);
      }
    }

    fetchCourseDetails();
    checkEnrollmentStatus();
  }, [id]);

  const handleEnrollment = async () => {
    if (!username || alreadyEnrolled) return;

    setLoading(true);

    const registrationResponse = await fetch(
      `http://localhost:8055/items/registrations?filter[user][_eq]=${username}`,
    );
    const registrationData = await registrationResponse.json();
    const registration = registrationData.data[0];

    if (registration) {
      const updatedEnrolled = registration.enrolled
        ? `${registration.enrolled},${id}`
        : `${id}`;
      await fetch(
        `http://localhost:8055/items/registrations/${registration.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enrolled: updatedEnrolled,
          }),
        },
      );
    } else {
      await fetch("http://localhost:8055/items/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username,
          enrolled: `${id}`,
        }),
      });
    }

    setLoading(false);
    setEnrollmentSuccess(true);
    setAlreadyEnrolled(true);
  };

  const handleUnenrollment = async () => {
    if (!username || !alreadyEnrolled) return;

    setLoading(true);

    const registrationResponse = await fetch(
      `http://localhost:8055/items/registrations?filter[user][_eq]=${username}`,
    );
    const registrationData = await registrationResponse.json();
    const registration = registrationData.data[0];

    if (registration) {
      const enrolledArray = registration.enrolled
        .split(",")
        .filter((courseId: string) => courseId !== id.toString());
      const updatedEnrolled = enrolledArray.join(",");

      await fetch(
        `http://localhost:8055/items/registrations/${registration.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enrolled: updatedEnrolled,
          }),
        },
      );
    }

    setLoading(false);
    setEnrollmentSuccess(false);
    setAlreadyEnrolled(false);
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">
        {course.name}
      </h1>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <Image
            src="/course-image-placeholder.jpg"
            alt={course.name}
            width={600}
            height={300}
            className="rounded-lg"
          />
        </div>
        <p className="mb-6 text-lg text-gray-800">{course.description}</p>
        {course.timings && (
          <p className="mb-4 flex items-center text-gray-700">
            <Calendar className="w-6 h-6 mr-2 text-gray-500" />
            <strong className="mr-2">Timings:</strong> {course.timings}
          </p>
        )}
        {course.requirements && (
          <p className="mb-4 flex items-center text-gray-700">
            <Book className="w-6 h-6 mr-2 text-gray-500" />
            <strong className="mr-2">Requirements:</strong>{" "}
            {course.requirements}
          </p>
        )}

        <div className="mt-8">
          {enrollmentSuccess ? (
            <p className="text-green-600 text-center text-lg">
              Enrolled successfully!
            </p>
          ) : alreadyEnrolled ? (
            <div className="flex flex-col items-center">
              <p className="text-red-600 text-center text-lg mb-4">
                You are already enrolled in this course.
              </p>
              <button
                onClick={handleUnenrollment}
                disabled={loading}
                className={`w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Processing..." : "Unenroll from this course"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEnrollment}
              disabled={loading}
              className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Enrolling..." : "Are you sure you want to enroll?"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
