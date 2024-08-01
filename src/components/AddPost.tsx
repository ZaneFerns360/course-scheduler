"use client";
import React, { useState, useRef, useMemo } from "react";
import Content from "./postComponents/content";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

const AddPost = () => {
  const [startdone, isStartDone] = useState(false);

  const [post, setPost] = useState({
    title: "",
    content: "",
    descreption: "",
    courseName: "",
  });

  function checkIfStartDone(e: any) {
    isStartDone(true);
    e.preventDefault();
  }

  function handleChange(e: any) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mx-auto">
      {startdone ? (
        <></>
      ) : (
        <div className="md:w-[50%] w-[85%] h-[80%] md:h-[85%]">
          <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full h-full md:mt-0">
            <div className="relative mb-4">
              <label
                htmlFor="title"
                className="leading-7 text-sm text-gray-600"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Title
                </h2>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title..."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="descreption"
                className="block mb-2 text-sm font-medium text-black"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Descreption
                </h2>
              </label>
              <textarea
                id="descreption"
                name="descreption"
                className="w-full min-h-[300px] max-h-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Write your descreption here which will be visible on the thumbnail..."
                onChange={handleChange}
              />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    <SelectItem value="pineappl">Pineapple</SelectItem>
                    <SelectItem value="pineapp">Pineapple</SelectItem>
                    <SelectItem value="pineap">Pineapple</SelectItem>
                    <SelectItem value="pine">Pineapple</SelectItem>
                    <SelectItem value="pi">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={checkIfStartDone}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {startdone && (
        <div className="md:w-[95%] w-[90%] h-[90%] md:h-[90%]">
          <div className=" bg-gray-100 rounded-lg p-4 flex flex-col md:m-auto w-full min-h-fit">
            <Content />
            <Link href={"/home/home-page"}>
              <button className="text-white w-full mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Submit
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
