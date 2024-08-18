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
}

export async function fetchPosts(courseName?: string): Promise<Post[]> {
  "use server";
  const authToken = await getauth();
  let url = "http://localhost:8055/items/posts";

  if (courseName) {
    url += `?filter[courseName]=${courseName}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return data.data.map((post: any) => ({
    id: post.id,
    title: post.title,
    courseName: post.courseName || "Uncategorized",
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
