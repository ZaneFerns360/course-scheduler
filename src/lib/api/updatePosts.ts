"use server";
import { getauth } from "../getAuth";

export async function updatePostStatusOnServer(id: number, valid: boolean) {
  const authToken = await getauth();
  const response = await fetch(`http://localhost:8055/items/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ valid }),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }
}
