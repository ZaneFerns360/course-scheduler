"use server";
import { getauth } from "../getAuth";

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  views: number;
  comment: number;
  valid: boolean;
  user: string;
  courseName: string;
  description: string;
  content: string;
}

export async function fetchSinglePost(id: number): Promise<Post> {
  const authToken = await getauth();
  const url = `http://localhost:8055/items/posts/${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await response.json();

  return {
    id: data.data.id,
    title: data.data.title || "",
    courseName: data.data.courseName || "Uncategorized",
    description: data.data.description || "",
    content: data.data.content || "",
    imageUrl: data.data.image
      ? `http://localhost:8055/assets/${data.data.image}`
      : "https://via.placeholder.com/150",
    views: data.data.views || 0,
    comment: data.data.comment || 0,
    valid: data.data.valid ?? false,
    user: data.data.user || "none",
  };
}
