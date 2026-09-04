import { isSessionSecretConfigured } from "@/lib/session";
import { getDiagnostics } from "@/lib/students";

function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          ok ? "bg-[#e6f4ea] text-[#1e7a43]" : "bg-[#fbeee0] text-[#9a5b2e]"
        }`}
      >
        {ok ? "✓" : "✕"}
      </span>
      <span className="text-sm text-[#1c2333]">{label}</span>
    </div>
  );
}

export default function StatusPage() {
  const sessionSecretOk = isSessionSecretConfigured();
  const diag = getDiagnostics();

  return (
    <main className="min-h-screen bg-[#eceef1] px-4 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#caa155]">
            Diagnostics
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#16233f]">
            Deployment status
          </h1>
          <p className="mt-1 text-sm text-[#5b6478]">
            No secrets or personal data below — safe to screenshot and share.
          </p>
        </div>

        <section className="rounded-xl border border-[#e7e2d8] bg-white p-6">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.13em] text-[#5b6478]">
            Environment variables
          </h2>
          <div className="flex flex-col gap-2.5">
            <Check
              ok={sessionSecretOk}
              label={sessionSecretOk ? "SESSION_SECRET is set" : "SESSION_SECRET is NOT set"}
            />
            <Check
              ok={diag.source === "env"}
              label={
                diag.source === "env"
                  ? "STUDENTS_JSON is set (read from environment)"
                  : diag.source === "local-dev-file"
                    ? "STUDENTS_JSON is NOT set — falling back to a local dev file (won't exist on Vercel)"
                    : "STUDENTS_JSON is NOT set, and no local file either"
              }
            />
            {diag.parseError && (
              <div className="rounded-lg bg-[#fbeee0] px-3 py-2 text-xs text-[#9a5b2e]">
                STUDENTS_JSON does not parse as valid JSON: {diag.parseError}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-[#e7e2d8] bg-white p-6">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.13em] text-[#5b6478]">
            Student records loaded: {diag.count}
          </h2>

          {diag.count === 0 ? (
            <p className="text-sm text-[#5b6478]">
              No students loaded — nobody can log in. Check STUDENTS_JSON above.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {diag.students.map((s, i) => (
                <div key={i} className="rounded-lg border border-[#e7e2d8] p-4">
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-sm font-bold text-[#1c2333]">
                      {s.name ?? "(no name)"}
                    </span>
                    <span className="font-mono text-xs text-[#5b6478]">
                      login: {s.username ?? "MISSING"}
                    </span>
                    <span className="font-mono text-xs text-[#5b6478]">id: {s.id ?? "MISSING"}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Check ok={s.hasPasswordHash} label="Password is set" />
                    <Check ok={s.hasPhoto} label="Photo is set" />
                    <Check
                      ok={s.missingFields.length === 0}
                      label={
                        s.missingFields.length === 0
                          ? "All required fields present"
                          : `Missing fields: ${s.missingFields.join(", ")}`
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
