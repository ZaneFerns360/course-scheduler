import React from "react";
import BlogComponent from "@/components/blogs";
import { comment } from "postcss";

const HomePage: React.FC = () => {
  const categories = ["All", "Technology", "Design", "Marketing"];
  const posts = [
   {
    id:1,
    title: "Post 1",
    category: "Technology",
    excerpt: "This is a excerpt for post 1",
    imageUrl: "https://via.placeholder.com/150",
    views: 100,
    comment: 10
    },
    {
    id:2,
    title: "Post 2",
    category: "Design",
    excerpt: "This is a excerpt for post 2",
    imageUrl: "https://via.placeholder.com/150",
    views: 200,
    comment: 20
    },
    {
    id:3,
    title: "Post 3",
    category: "Marketing",
    excerpt: "This is a excerpt for post 3",
    imageUrl: "https://via.placeholder.com/150",
    views: 300,
    comment: 30
    },
    {
    id:4,
    title: "Post 4",
    category: "Technology",
    excerpt: "This is a excerpt for post 4",
    imageUrl: "https://via.placeholder.com/150",
    views: 400,
    comment: 40
    },
    {
    id:5,
    title: "Post 5",
    category: "Design",
    excerpt: "This is a excerpt for post 5",
    date: "2021-09-05",
    imageUrl: "https://via.placeholder.com/150",
    views: 500,
    comment: 50
    },
    {
    id:6,
    title: "Post 6",
    category: "Marketing",
    excerpt: "This is a excerpt for post 6",
    date: "2021-09-06",
    imageUrl: "https://via.placeholder.com/150",
    views: 600,
    comment: 60
    },
    
    // Add more posts here...
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">My Blog</h1>
      <BlogComponent
        posts={posts}
        categories={categories}
      />
    </div>
  );
};

export default HomePage;




