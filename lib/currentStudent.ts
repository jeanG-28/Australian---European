import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";
import { findStudentById, type Student } from "@/lib/students";

export async function getCurrentStudent(): Promise<Student | null> {
  const cookieStore = await cookies();
  const sid = verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
  if (!sid) return null;
  return findStudentById(sid) ?? null;
}
