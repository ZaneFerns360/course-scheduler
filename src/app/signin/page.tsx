"use client";
import { Switch } from "@/components/Toggle";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function checkIfTeacher() {
    setIsStudent(false);
  }

  function handleSignIn(e: { preventDefault: () => void }) {
    e.preventDefault();

    // Store roll number and password in session storage
    sessionStorage.setItem("rollNumber", rollNumber);
    sessionStorage.setItem("password", password);

    // Navigate based on user type
    if (isStudent) {
      router.push("/home/home-page");
    } else {
      router.push("/home/my-blogs");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center mx-auto min-w-[100vw] h-screen">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <form onSubmit={handleSignIn}>
            <div className="relative mb-4">
              <label
                htmlFor="roll-number"
                className="leading-7 text-sm text-gray-600"
              >
                Roll Number
              </label>
              <input
                type="text"
                id="roll-number"
                name="roll-number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="text-white w-full mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </form>
          <div className="flex flex-row mt-3 ">
            <Switch onCheckedChange={checkIfTeacher} />
            <h2 className="pl-2 text-gray-900 text-lg font-medium title-font -translate-y-[3px]">
              Teachers
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
