"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findStudentById } from "@/lib/students";
import { verifyPassword } from "@/lib/passwords";
import { createSessionToken, COOKIE_NAME, MAX_AGE_SECONDS } from "@/lib/session";

export type LoginState = { error?: string };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const id = String(formData.get("id") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!id || !password) {
    return { error: "Please enter your student ID and password." };
  }

  const student = findStudentById(id);
  if (!student || !verifyPassword(password, student.passwordHash)) {
    return { error: "Invalid student ID or password." };
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
