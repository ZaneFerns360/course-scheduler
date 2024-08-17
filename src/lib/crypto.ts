"use server";

import crypto from "crypto";

const SECRET_KEY =
  process.env.SECRET_KEY || "Gc4IK2wzu26riVZcsfqcoFTl+bbGK+7o8vvAtRsP7pI=";
const algorithm = "aes-256-cbc";
const key = Buffer.from(SECRET_KEY, "base64");

export async function generateToken(): Promise<string> {
  const randomToken = crypto.randomBytes(32).toString("hex");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(randomToken, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const [ivHex, encryptedText] = token.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    // If we got here, decryption was successful
    return true;
  } catch (error) {
    console.error("Error decrypting token:", error);
    return false;
  }
}
