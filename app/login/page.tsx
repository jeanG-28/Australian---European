import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eceef1] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl bg-[#faf9f6] p-8 shadow-[0_24px_60px_-20px_rgba(20,25,45,0.35),0_2px_10px_rgba(20,25,45,0.10)]">
        <div className="mb-8 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#caa155]">
            University Exchange Office
          </div>
          <h1 className="mt-1 text-xl font-extrabold tracking-tight text-[#16233f]">
            Student Exchange Portal
          </h1>
          <p className="mt-2 text-xs text-[#5b6478]">
            Sign in with your student ID to access your card.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
