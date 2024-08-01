'use client'
import React from "react";
import RecipeCard from "./RecipeCard";
import { BlogPost } from "./ui/types";
import { blogPostData, recipeData } from "../data/dummyData";
/*
const BlogPage: React.FC = () => {
  const blogPost: BlogPost = blogPostData;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {blogPost.title}
          </h1>
         
          <RecipeCard recipe={recipeData} />
        </main>

        <aside className="lg:w-1/3">
        </aside>
      </div>
    </div>
  );
}; */

const BlogPage: React.FC = () => {
   const blogPost: BlogPost = blogPostData;
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {blogPost.title}
          </h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.floor(blogPost.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">
              {blogPost.reviews} REVIEWS / {blogPost.rating} AVERAGE
            </span>
          </div>
          <p className="text-gray-700 mb-6">{blogPost.description}</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded mb-6">
            JUMP TO RECIPE
          </button>
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full rounded-lg mb-6"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded mb-6">
            Pin THIS RECIPE
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            IN THIS POST
          </h2>
          <ul className="list-disc pl-6 mb-6">
            {blogPost.inThisPost.map((item, index) => (
              <li
                key={index}
                className="text-purple-600 mb-2">
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            PREPARE FOR A LOT OF FINGER LICKING.
          </h2>
          <div className="flex items-start mb-6">
            <img
              src={blogPost.author.image}
              alt={blogPost.author.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <p className="text-gray-700">{blogPost.content}</p>
          </div>
          <RecipeCard recipe={recipeData} />
        </main>

        <aside className="lg:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <img
              src={blogPost.author.image}
              alt={blogPost.author.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-center mb-2">
              HI! IM {blogPost.author.name.toUpperCase()}.
            </h2>
            <p className="text-center italic mb-4">nice to meet you!</p>
            <p className="text-gray-700 text-center mb-4">
              {blogPost.author.bio}
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded w-full">
              LEARN MORE
            </button>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">FOLLOW US</h2>
            <div className="flex justify-center space-x-4 mb-4">
              {["instagram", "pinterest", "tiktok", "facebook", "twitter"].map(
                (social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="text-white hover:text-gray-300">
                    <i className={`fab fa-${social} fa-2x`}></i>
                  </a>
                )
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              SIGNUP FOR EMAIL UPDATES
            </h3>
            <p className="text-white mb-4">
              Get a Free eCookbook with our top 25 recipes.
            </p>
            <form className="space-y-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-gray-800 px-4 py-2 rounded w-full font-bold">
                GO
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
