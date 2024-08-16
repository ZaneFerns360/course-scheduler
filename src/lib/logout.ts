"use server";

import { cookies } from "next/headers";

const REFRESH_TOKEN = "refresh_token";

export const directusLogout = async (): Promise<void> => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;

    if (!refreshToken) {
      throw new Error("Refresh token is not available");
    }

    console.log(refreshToken);
    console.log(process.env.BACKEND_URL);
    const response = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    if (response.status === 204) {
      console.log("Logout successful");
    } else {
      const errorData = await response.json();
      console.error("Error logging out:", errorData);
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
