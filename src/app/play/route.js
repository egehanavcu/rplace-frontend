"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  if (token) {
    cookies().set({
      name: "user_token",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  return redirect("/");
}
