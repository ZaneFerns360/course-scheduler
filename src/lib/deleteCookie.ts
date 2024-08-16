"use server";

import { cookies } from "next/headers";

const AUTH_TOKEN = "auth_token";
const USERNAME = "username";
const REFRESH_TOKEN = "refresh_token";

export async function deleteCookies() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_TOKEN);
  cookieStore.delete(USERNAME);
  cookieStore.delete(REFRESH_TOKEN);
  console.log("Cookies deleted");
}
