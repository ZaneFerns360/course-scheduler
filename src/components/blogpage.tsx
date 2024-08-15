"use client";
import React from "react";
import RecipeCard from "./RecipeCard";
import { BlogPost } from "./ui/types";
import { blogPostData, recipeData } from "../data/dummyData";
import { motion } from "framer-motion";
const BlogPage: React.FC = () => {
  const blogPost: BlogPost = blogPostData;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <main className="lg:w-2/3">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            {blogPost.title}
          </motion.h1>
          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < Math.floor(blogPost.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-3 text-gray-600 text-lg">
              {blogPost.reviews} REVIEWS / {blogPost.rating} AVERAGE
            </span>
          </div>
          <p className="text-gray-700 text-xl mb-8 leading-relaxed">{blogPost.description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold mb-8 transition-colors duration-300 hover:bg-purple-700"
          >
            JUMP TO RECIPE
          </motion.button>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full rounded-2xl mb-8 shadow-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold mb-8 transition-colors duration-300 hover:bg-red-700"
          >
            Pin THIS RECIPE
          </motion.button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">IN THIS POST</h2>
          <ul className="list-none pl-6 mb-8">
            {blogPost.inThisPost.map((item, index) => (
              <motion.li
                key={index}
                className="text-purple-600 mb-3 text-lg flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="mr-3">•</span> {item}
              </motion.li>
            ))}
          </ul>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">PREPARE FOR A LOT OF FINGER LICKING.</h2>
          <div className="flex items-start mb-8">
            <img
              src={blogPost.author.image}
              alt={blogPost.author.name}
              className="w-20 h-20 rounded-full mr-6"
            />
            <p className="text-gray-700 text-lg leading-relaxed">{blogPost.content}</p>
          </div>
          <RecipeCard recipe={recipeData} />
        </main>
        <aside className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-2xl mb-8 shadow-lg"
          >
            <img
              src={blogPost.author.image}
              alt={blogPost.author.name}
              className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-white shadow-md"
            />
            <h2 className="text-3xl font-bold text-center mb-3 text-purple-800">
              HI! I'M {blogPost.author.name.toUpperCase()}.
            </h2>
            <p className="text-center italic mb-6 text-purple-600 text-lg">nice to meet you!</p>
            <p className="text-gray-700 text-center mb-6 text-lg leading-relaxed">
              {blogPost.author.bio}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold w-full transition-colors duration-300 hover:bg-purple-700"
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
