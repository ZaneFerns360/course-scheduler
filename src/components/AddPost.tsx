"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { useRouter } from "next/navigation";
const Content = dynamic(() => import("./postComponents/content"), {
  ssr: false,
});
const AddPost = () => {
  const router = useRouter();
  const [startdone, isStartDone] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    description: "",
    courseName: "",
  });
  const [file, setFile] = useState(null);

  function checkIfStartDone(e: any) {
    e.preventDefault();
    isStartDone(true);
  }

  function handleChange(e: any) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function handleContentChange(newContent: any) {
    setPost({ ...post, content: newContent });
  }

  function handleFileChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      let imageId = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const imageResponse = await fetch("http://localhost:8055/files", {
          method: "POST",
          body: formData,
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageId = imageData.data.id;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      const postData = {
        status: "published",
        title: post.title,
        description: post.description,
        content: post.content,
        image: imageId,
      };

      const response = await fetch("http://localhost:8055/items/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Post submitted successfully");
        router.push("/");

        // Redirect or show success message
      } else {
        console.error("Failed to submit post");
        // Show error message
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      // Show error message
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mx-auto">
      {!startdone ? (
        <div className="md:w-[50%] w-[85%] h-[80%] md:h-[85%]">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full h-full md:mt-0">
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
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-black"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Description
                </h2>
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full min-h-[300px] max-h-[300px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Write your description here which will be visible on the thumbnail..."
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="file"
                className="block mb-2 text-sm font-medium text-black"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Upload Image
                </h2>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
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
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="md:w-[95%] w-[90%] h-[90%] md:h-[90%]">
          <div className="bg-gray-100 rounded-lg p-4 flex flex-col md:m-auto w-full min-h-fit">
            <Content onContentChange={handleContentChange} />
            <button
              onClick={handleSubmit}
              className="text-white w-full mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
            <Link href={"/home/home-page"}>
              <button className="text-white w-full mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Back
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
