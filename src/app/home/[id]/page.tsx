"use server";
import { fetchSinglePost } from "@/lib/api/getOnePost";
import Image from "next/image";
import { User, Book, Eye, MessageSquare, Calendar } from "lucide-react";

export default async function Page({ params }: { params: { id: number } }) {
  const post = await fetchSinglePost(params.id);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        {post.imageUrl && (
          <div className="relative h-80 w-full lg:h-96">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center"
            />
          </div>
        )}
        <div className="px-6 py-10 sm:px-10 sm:py-16">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-500 mb-8">
            <span className="flex items-center space-x-2">
              <User size={18} />
              <span>{post.user || "Anonymous"}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Book size={18} />
              <span>{post.courseName}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Eye size={18} />
              <span>{post.views} views</span>
            </span>
            <span className="flex items-center space-x-2">
              <MessageSquare size={18} />
              <span>{post.comment} comments</span>
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 mb-10">
            <p className="text-center text-xl italic">{post.description}</p>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-700 mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
