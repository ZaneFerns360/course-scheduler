"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Eye, MessageCircle, CheckCircle } from "lucide-react";
import { getauth } from "@/lib/getAuth";
import { isTeacherCookieValid } from "@/lib/isTeacher";
import { useRouter } from "next/navigation";
import { updatePostStatusOnServer } from "@/lib/api/updatePosts";
import { fetchPosts } from "@/lib/api/getPosts";

interface Post {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  views: number;
  comment: number;
  valid: boolean;
  user: string;
}

interface BlogDisplayCardProps {
  posts: Post[];
  categories: string[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const BlogDisplayCard: React.FC<BlogDisplayCardProps> = ({
  posts,
  categories,
  setPosts,
}) => {
  const updateLocalPostStatus = (id: number, valid: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? { ...post, valid } : post)),
    );
  };

  const updatePostStatus = async (id: number, valid: boolean) => {
    updateLocalPostStatus(id, valid);
    try {
      await updatePostStatusOnServer(id, valid);
    } catch (error) {
      console.error("Error updating post status:", error);
      // Optionally, you could revert the local state here if the server update fails
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 pt-20 text-center">
        Posts to be approved
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <p className="text-lg">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`border rounded-lg shadow-md overflow-hidden flex flex-col justify-between ${
                post.valid ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.user}</p>
                <p className="text-gray-600 mb-2">
                  Category: <span className="font-medium">{post.category}</span>
                </p>
                <div className="flex items-center text-gray-600 mb-2">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>{post.comment}</span>
                </div>
                {post.valid && (
                  <div className="flex items-center text-green-600 mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Approved</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between p-4 bg-gray-100">
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
          ))
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const categories = ["All", "Technology", "Design", "Marketing"];
  const router = useRouter();

  useLayoutEffect(() => {
    const loadPosts = async () => {
      const isTeacher = await isTeacherCookieValid();
      if (!isTeacher) {
        router.push("/");
        return;
      }
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    loadPosts();
  }, [router]);
  return (
    <div>
      <BlogDisplayCard
        posts={posts}
        categories={categories}
        setPosts={setPosts}
      />
    </div>
  );
};

export default Page;
