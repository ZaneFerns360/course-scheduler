"use server";

import { cookies } from "next/headers";
import { validateToken } from "@/lib/crypto";

export async function isTeacherCookieValid(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const teacherCookie = cookieStore.get("teacher");

    if (!teacherCookie) {
      return false; // No cookie found
    }

    const isValid = await validateToken(teacherCookie.value);
    return isValid;
  } catch (error) {
    console.error("Error validating teacher cookie:", error);
    return false; // Return false on any error
  }
}
