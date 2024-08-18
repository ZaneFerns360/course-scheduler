"use client";
import { motion } from "framer-motion";
import { getauth } from "@/lib/getAuth";
import { checkUsername } from "@/lib/getUser";
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
  const [step, setStep] = useState(1);
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
      const authToken = await getauth();
      const username = await checkUsername();
      console.log(authToken);
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
        user: username,
      };

      const response = await fetch("http://localhost:8055/items/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Add auth token to post submission
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
  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {step === 1 ? "Create New Post" : "Write Your Post"}
            </h2>
            <div className="mb-8">
              <div className="flex items-center">
                <div
                  className={`w-1/2 h-1 ${step === 1 ? "bg-indigo-600" : "bg-gray-200"}`}
                ></div>
                <div
                  className={`w-1/2 h-1 ${step === 2 ? "bg-indigo-600" : "bg-gray-200"}`}
                ></div>
              </div>
            </div>
            {step === 1 ? (
              <form>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter your post title..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      onChange={handleChange}
                      value={post.title}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      placeholder="Write your description here which will be visible on the thumbnail..."
                      onChange={handleChange}
                      value={post.description}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="file"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select a Course
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setPost({ ...post, courseName: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            "Technology",
                            "Design",
                            "Marketing",
                            "Culinary Art",
                            "Fashion",
                            "Music",
                            "Sports Technology",
                            "Fitness",
                            "Health",
                            "Social Work",
                          ].map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Next
                  </motion.button>
                </div>
              </form>
            ) : (
              <div>
                <Content onContentChange={handleContentChange} />
                <div className="mt-8 space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Submit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                  >
                    Back
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPost;
