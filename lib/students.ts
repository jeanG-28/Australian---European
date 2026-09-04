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

const REQUIRED_FIELDS: (keyof Student)[] = [
  "id",
  "username",
  "passwordHash",
  "name",
  "dob",
  "address",
  "homeUniversity",
  "homeBadge",
  "hostUniversity",
  "hostBadge",
  "period",
  "photoDataUri",
];

type LoadResult = {
  students: Student[];
  source: "env" | "local-dev-file" | "none";
  parseError: string | null;
};

let cached: LoadResult | null = null;

function loadRaw(): LoadResult {
  if (process.env.STUDENTS_JSON) {
    try {
      const students = JSON.parse(process.env.STUDENTS_JSON) as Student[];
      return { students, source: "env", parseError: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("STUDENTS_JSON env var is set but is not valid JSON:", message);
      return { students: [], source: "env", parseError: message };
    }
  }

  // Local development only: a gitignored file, never committed to the repo.
  const localPath = path.join(process.cwd(), "data", "students.local.json");
  if (fs.existsSync(localPath)) {
    try {
      const students = JSON.parse(fs.readFileSync(localPath, "utf8")) as Student[];
      return { students, source: "local-dev-file", parseError: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { students: [], source: "local-dev-file", parseError: message };
    }
  }

  return { students: [], source: "none", parseError: null };
}

function load(): LoadResult {
  if (!cached) cached = loadRaw();
  return cached;
}

export function getStudents(): Student[] {
  return load().students;
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
  return getStudents().find((s) => foldForCompare(s.username ?? "") === normalized);
}

export function findStudentById(id: string): Student | undefined {
  const normalized = id.trim().toLowerCase();
  return getStudents().find((s) => s.id.toLowerCase() === normalized);
}

export function publicStudent(student: Student) {
  const { passwordHash: _passwordHash, ...rest } = student;
  return rest;
}

export type StudentDiagnostic = {
  id: string | null;
  username: string | null;
  name: string | null;
  missingFields: string[];
  hasPasswordHash: boolean;
  hasPhoto: boolean;
};

export type Diagnostics = {
  source: "env" | "local-dev-file" | "none";
  parseError: string | null;
  count: number;
  students: StudentDiagnostic[];
};

export function getDiagnostics(): Diagnostics {
  const { students, source, parseError } = load();

  return {
    source,
    parseError,
    count: students.length,
    students: students.map((s) => {
      const record = s as Partial<Student>;
      const missingFields = REQUIRED_FIELDS.filter((field) => {
        const value = record[field];
        return typeof value !== "string" || value.length === 0;
      });
      return {
        id: record.id ?? null,
        username: record.username ?? null,
        name: record.name ?? null,
        missingFields,
        hasPasswordHash: typeof record.passwordHash === "string" && record.passwordHash.startsWith("scrypt:"),
        hasPhoto: typeof record.photoDataUri === "string" && record.photoDataUri.startsWith("data:image/"),
      };
    }),
  };
}
