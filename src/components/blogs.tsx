"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  views: number;
  comments: number;
}

interface BlogComponentProps {
  posts: BlogPost[];
  categories: string[];
}

const BlogCard: React.FC<BlogPost> = ({
  category,
  title,
  excerpt,
  imageUrl,
  views,
  comments,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:w-1/3"
    >
      <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <Image
          className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
          height={1000}
          width={1000}
          src={imageUrl}
          alt={title}
        />
        <div className="p-6">
          <span className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest mb-2">
            {category}
          </span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{excerpt}</p>
          <div className="flex items-center justify-between">
            <Link
              href={"/blog-view"}
              className="text-blue-500 inline-flex items-center transition-colors duration-300 hover:text-blue-600"
            >
              Read More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
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
                {comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlogComponent: React.FC<BlogComponentProps> = ({ posts, categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setFilteredPosts(posts.filter((post) => post.category === activeCategory));
  }, [activeCategory, posts]);

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Discover Our Latest Articles
        </h2>

        <div className="mb-12">
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-5 py-2  font-semibold rounded-full transition-colors duration-300 ${activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}

              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCategory}
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
