"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchPosts } from "@/lib/api/getPosts";
import { fetchCourses } from "@/lib/api/getCourses";

interface Course {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  views: number;
  comment: number;
  valid: boolean;
  user: string;
  courseName: string;
}

const BlogCard: React.FC<Post> = ({
  id,
  courseName,
  title,
  imageUrl,
  views,
  comment,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:w-1/3"
    >
      <Link href={`/home/${id}`}>
        <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
          />
          <div className="p-6">
            <span className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest mb-2">
              {courseName}
            </span>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-3 inline-flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {views}
                </span>
                <span className="inline-flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  {comment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogComponent: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
        setActiveCourse(fetchedCourses[0].name);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts(activeCourse, true);
        setFilteredPosts(posts);
        console.log(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    if (activeCourse) {
      loadPosts();
    }
  }, [activeCourse]);

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Discover Our Latest Articles
        </h2>

        <div className="mb-12">
          <div className="flex justify-center flex-wrap gap-4">
            {courses.map((course) => (
              <motion.button
                key={course.id}
                className={`px-5 py-2 font-semibold rounded-full transition-colors duration-300 ${
                  activeCourse === course.name
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCourse(course.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {course.name}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCourse}
          className="flex flex-wrap -m-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogComponent;
