import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentStudent } from "@/lib/currentStudent";
import { publicStudent } from "@/lib/students";
import { logout } from "@/app/login/actions";
import StudentCard from "@/components/StudentCard";

export default async function DashboardPage() {
  const student = await getCurrentStudent();
  if (!student) redirect("/login");

  return (
    <main className="min-h-screen bg-[#eceef1] px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#caa155]">
              Welcome back
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#16233f]">
              {student.name.split(" ")[0]}&rsquo;s space
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-[#e7e2d8] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#5b6478] transition hover:border-[#caa155] hover:text-[#16233f]"
            >
              Log out
            </button>
          </form>
        </div>

        <StudentCard student={publicStudent(student)} />

        <Link
          href="/present"
          className="mx-auto flex w-full max-w-[720px] items-center justify-center gap-2 rounded-xl bg-[#16233f] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(20,25,45,0.4)] transition hover:bg-[#1c2c4d]"
        >
          Present my card for canteen access
        </Link>
      </div>
    </main>
  );
}
