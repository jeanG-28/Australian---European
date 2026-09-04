import fs from "node:fs";
import path from "node:path";

export type Student = {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  dob: string;
  address: string;
  homeUniversity: string;
  homeBadge: string;
  hostUniversity: string;
  hostBadge: string;
  period: string;
  photoDataUri: string;
};

let cached: Student[] | null = null;

function loadRaw(): Student[] {
  if (process.env.STUDENTS_JSON) {
    try {
      return JSON.parse(process.env.STUDENTS_JSON) as Student[];
    } catch (err) {
      console.error("STUDENTS_JSON env var is set but is not valid JSON:", err);
      return [];
    }
  }

  // Local development only: a gitignored file, never committed to the repo.
  const localPath = path.join(process.cwd(), "data", "students.local.json");
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, "utf8")) as Student[];
  }

  return [];
}

export function getStudents(): Student[] {
  if (!cached) cached = loadRaw();
  return cached;
}

function foldForCompare(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip accents so "Léo" and "Leo" match
}

export function findStudentByUsername(username: string): Student | undefined {
  const normalized = foldForCompare(username);
  return getStudents().find((s) => foldForCompare(s.username) === normalized);
}

export function findStudentById(id: string): Student | undefined {
  const normalized = id.trim().toLowerCase();
  return getStudents().find((s) => s.id.toLowerCase() === normalized);
}

export function publicStudent(student: Student) {
  const { passwordHash: _passwordHash, ...rest } = student;
  return rest;
}
