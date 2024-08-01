"use client";

import { Switch } from "@/components/Toggle";
import Link from "next/link";
import React, { useState, useRef } from "react";

const page = () => {
  const user = "";
  const [student, isStudent] = useState(true);

  function checkIfTeacher() {
    isStudent(false);
  }

  return (
    <>
      <div className="flex justify-center items-center mx-auto min-w-[100vw] h-screen">
        <div className=" lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              Roll Number
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <Link href={"/home/home-page"}>
            <button className="text-white w-full mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Submit
            </button>
          </Link>
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

export default page;
