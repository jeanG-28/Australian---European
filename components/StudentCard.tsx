import Image from "next/image";
import GlobeMotif from "./GlobeMotif";
import type { Student } from "@/lib/students";

type CardStudent = Omit<Student, "passwordHash">;

export default function StudentCard({
  student,
  size = "normal",
}: {
  student: CardStudent;
  size?: "normal" | "large";
}) {
  const scale = size === "large" ? "w-full max-w-[900px]" : "w-full max-w-[720px]";

  return (
    <div
      className={`${scale} mx-auto overflow-hidden rounded-2xl bg-[#faf9f6] shadow-[0_24px_60px_-20px_rgba(20,25,45,0.35),0_2px_10px_rgba(20,25,45,0.10)]`}
    >
      <div className="flex items-center justify-between gap-4 bg-[#16233f] px-8 py-6 text-white">
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-70">
            University Exchange Office
          </div>
          <div className="max-w-[420px] text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
            Australia&ndash;Europe Student Exchange Program
          </div>
        </div>
        <GlobeMotif />
      </div>

      <div className="flex flex-col gap-6 p-8 sm:flex-row">
        <div className="flex flex-shrink-0 flex-col gap-3 sm:w-44">
          <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-lg border border-[#e7e2d8] bg-white">
            <Image
              src={student.photoDataUri}
              alt={`Photo of ${student.name}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
              Student ID
            </div>
            <div className="font-mono text-base font-semibold tracking-wide text-[#1c2333]">
              {student.id}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5">
          <div>
            <div className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
              Student Name
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-[#1c2333]">
              {student.name}
            </div>
            <div className="mt-1 text-xs font-semibold text-[#5b6478]">
              Date of birth: {student.dob}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex h-[17px] items-center justify-center rounded-full border border-[#caa155] px-2 text-[9.5px] font-extrabold tracking-wide text-[#caa155]">
                  {student.homeBadge}
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
                  Home University
                </span>
              </div>
              <div className="text-[15px] font-bold text-[#1c2333]">{student.homeUniversity}</div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex h-[17px] items-center justify-center rounded-full border border-[#caa155] px-2 text-[9.5px] font-extrabold tracking-wide text-[#caa155]">
                  {student.hostBadge}
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
                  Host University
                </span>
              </div>
              <div className="text-[15px] font-bold text-[#1c2333]">{student.hostUniversity}</div>
            </div>
          </div>

          <div>
            <div className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
              Exchange Period
            </div>
            <div className="text-[15px] font-bold text-[#1c2333]">{student.period}</div>
          </div>

          <div>
            <div className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
              Address
            </div>
            <div className="text-[12.5px] font-semibold leading-snug text-[#5b6478]">
              {student.address}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-8 items-center border-t-2 border-[#caa155] px-8">
        <div className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#5b6478]">
          Student Exchange Card
        </div>
      </div>
    </div>
  );
}
