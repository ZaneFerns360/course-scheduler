import React from "react";
import Navbar from "@/components/StudentNavbar";
import BlogComponent from "@/components/blogs";
import { posts, categories } from "@/data/blogsdata";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <BlogComponent posts={posts} categories={categories} />
      </div>
    </>
  );
};

export default HomePage;
