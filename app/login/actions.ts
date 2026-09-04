"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findStudentByUsername } from "@/lib/students";
import { verifyPassword } from "@/lib/passwords";
import { createSessionToken, COOKIE_NAME, MAX_AGE_SECONDS } from "@/lib/session";

export type LoginState = { error?: string };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("id") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Please enter your first name and password." };
  }

  const student = findStudentByUsername(username);
  if (!student || !verifyPassword(password, student.passwordHash)) {
    return { error: "Invalid first name or password." };
  }

  const token = createSessionToken(student.id);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });

  redirect("/dashboard");
}

export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  redirect("/login");
}
