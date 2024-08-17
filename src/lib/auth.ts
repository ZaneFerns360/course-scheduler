// app/directusLogin.ts

// app/directusLogin.ts

"use server";
import { cookies } from "next/headers";
import { generateToken } from "./crypto";
const COOKIE_NAME = "auth_token";
const REFRESH = "refresh_token";
const USERNAME = "username";
const TEACHER_COOKIE_NAME = "teacher";

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

interface Teacher {
  id: number;
  name: string;
}

const fetchTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch("http://localhost:8055/items/teachers");
  if (!response.ok) {
    console.error("Error fetching teachers:", response.statusText);
    throw new Error("Failed to fetch teachers");
  }
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

export const directusLogin = async (
  credentials: Credentials,
): Promise<User> => {
  console.log(credentials.identifier);
  console.log(credentials.password);

  try {
    // Authenticate the user
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

    // Generate and encrypt a token
    const encryptedToken: string = await generateToken();
    // Handle cookies
    const formattedData = user.data.access_token;
    cookies().set(COOKIE_NAME, formattedData);
    cookies().set(USERNAME, credentials.identifier);
    cookies().set(REFRESH, user.data.refresh_token);

    // Fetch teacher data
    const teachers = await fetchTeachers();
    console.log(teachers);
    const isTeacher = teachers.some(
      (teacher) => teacher.name === credentials.identifier,
    );

    // Set the "teacher" cookie if applicable
    if (isTeacher) {
      cookies().set(TEACHER_COOKIE_NAME, encryptedToken);
    }

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};
