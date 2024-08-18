"use server";
import { getauth } from "../getAuth";

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

export async function fetchPosts(): Promise<Post[]> {
  "use server";
  const authToken = await getauth();
  const response = await fetch("http://localhost:8055/items/posts", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return data.data.map((post: any) => ({
    id: post.id,
    title: post.title,
    category: post.category || "Uncategorized",
    excerpt: post.description,
    imageUrl: post.image
      ? `http://localhost:8055/assets/${post.image}`
      : "https://via.placeholder.com/150",
    views: post.views || 0,
    comment: post.comments || 0,
    valid: post.valid ?? false,
    user: post.user || "none",
  }));
}
