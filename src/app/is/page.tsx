"use server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/crypto";
const CheckTeacherCookie = async () => {
  // Retrieve the cookies
  const cookieStore = cookies();
  const teacherCookie = cookieStore.get("teacher");

  if (!teacherCookie) {
    return <div>No teacher cookie found</div>;
  }

  try {
    // Decrypt the cookie value

    // Check if the decrypted value is valid
    const isValid = await validateToken(teacherCookie.value);

    // Display the result
    return (
      <div>
        {isValid ? (
          <p>
            The decrypted teacher cookie value is valid and matches the original
            string.
          </p>
        ) : (
          <p>
            The decrypted teacher cookie value does not match the original
            string.
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error decrypting cookie:", error);
    return <div>Failed to decrypt the teacher cookie</div>;
  }
};

export default CheckTeacherCookie;
