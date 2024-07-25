import React from "react";
import Navbar from "@/components/HomeNavbar";
import BlogComponent from "@/components/blogs";
import { posts, categories } from "@/data/blogsdata";

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl text-blue-950 font-bold text-center my-8">
        My Blog
      </h1>
      <BlogComponent
        posts={posts}
        categories={categories}
      />
    </div>
  );
};

export default HomePage;
