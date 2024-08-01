"use client";
import React, { useState, useEffect } from "react";
import { Eye, MessageCircle } from "lucide-react";

// Define the types for the props
interface Post {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  views: number;
  comment: number;
  valid: boolean; // Add valid property to determine if the post is accepted or rejected
}

interface BlogDisplayCardProps {
  posts: Post[];
  categories: string[];
}

const BlogDisplayCard: React.FC<BlogDisplayCardProps> = ({
  posts,
  categories,
}) => {
  const updatePostStatus = async (id: number, valid: boolean) => {
    try {
      const response = await fetch(`http://localhost:8055/items/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valid }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      // Update the posts state after a successful update
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? { ...post, valid } : post))
      );
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 pt-20">Blog Posts</h1>
      <div className="mb-6">
        {/* <h2 className="text-2xl font-semibold mb-2">Categories</h2> */}
        {/* Uncomment to use categories */}
        {/* <ul className="list-disc pl-5">
          {categories.map((category) => (
            <li key={category} className="text-lg">{category}</li>
          ))}
        </ul> */}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <p className="text-lg">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`bg-white border rounded-lg shadow-md overflow-hidden ${post.valid ? "bg-green-100" : "bg-red-100"}`}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <p className="text-gray-600 mb-2">
                  Category: <span className="font-medium">{post.category}</span>
                </p>
                <div className="flex items-center text-gray-600">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-2">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>{post.comment}</span>
                </div>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => updatePostStatus(post.id, true)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updatePostStatus(post.id, false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const categories = ["All", "Technology", "Design", "Marketing"]; // You might want to fetch these from Directus as well

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8055/items/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // Transform the data to match the expected format
        const transformedPosts: Post[] = data.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          category: post.category || "Uncategorized", // You might need to add a category field in Directus
          excerpt: post.description,
          imageUrl: post.image
            ? `http://localhost:8055/assets/${post.image}`
            : "https://via.placeholder.com/150",
          views: post.views || 0, // You might need to add a views field in Directus
          comment: post.comments || 0, // You might need to add a comments field in Directus
          valid: post.valid ?? false, // Default to false if valid is not defined
        }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <BlogDisplayCard posts={posts} categories={categories} />
    </div>
  );
};

export default Page;
