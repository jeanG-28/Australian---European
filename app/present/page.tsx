import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentStudent } from "@/lib/currentStudent";
import { studentQrDataUri } from "@/lib/qr";
import LiveClock from "./LiveClock";

export default async function PresentPage() {
  const student = await getCurrentStudent();
  if (!student) redirect("/login");

  const issuedAt = Date.now();
  const qrDataUri = await studentQrDataUri(student.id, issuedAt);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0f1a30] px-4 py-12 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-[#faf9f6] p-8 text-center text-[#1c2333] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#caa155]">
          <Image
            src={student.photoDataUri}
            alt={`Photo of ${student.name}`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div>
          <div className="text-2xl font-extrabold tracking-tight">{student.name}</div>
          <div className="mt-1 font-mono text-sm text-[#5b6478]">{student.id}</div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[#e6f4ea] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#1e7a43]">
          <span className="h-2 w-2 rounded-full bg-[#1e7a43]" />
          Access granted
        </div>

        <Image
          src={qrDataUri}
          alt="Canteen access QR code"
          width={220}
          height={220}
          unoptimized
          className="rounded-lg border border-[#e7e2d8] bg-white p-2"
        />

        <div className="grid w-full grid-cols-2 gap-4 text-left">
          <div>
            <div className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
              Home university
            </div>
            <div className="text-sm font-bold">{student.homeUniversity}</div>
          </div>
          <div>
            <div className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-[#5b6478]">
              Host university
            </div>
            <div className="text-sm font-bold">{student.hostUniversity}</div>
          </div>
        </div>

        <div className="text-xs font-semibold text-[#5b6478]">
          Shown at <LiveClock />
        </div>
      </div>

      <Link href="/dashboard" className="text-xs font-bold uppercase tracking-wide text-white/70 hover:text-white">
        &larr; Back to my space
      </Link>
    </main>
  );
}
