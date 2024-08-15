// app/directusLogin.ts

"use server";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth_token";
const USERNAME = "username";

interface Credentials {
  identifier: string;
  password: string;
}

interface User {
  data: {
    access_token: string;
    expires: number;
    refresh_token: string;
  };
}

export const directusLogin = async (
  credentials: Credentials,
): Promise<User> => {
  console.log(credentials.identifier);
  console.log(credentials.password);

  try {
    const res = await fetch("http://localhost:8055/auth/login/ldap", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("Error response from server:", res.statusText);
      throw new Error("Failed to log in");
    }

    const user: User = await res.json();

    if (!user) {
      throw new Error("No user data returned");
    }

    // Handle cookies
    const formattedData = user.data.access_token;
    cookies().set(COOKIE_NAME, formattedData);
    cookies().set(USERNAME, credentials.identifier);

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};
