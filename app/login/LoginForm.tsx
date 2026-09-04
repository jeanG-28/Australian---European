"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="id" className="text-xs font-bold uppercase tracking-[0.13em] text-[#5b6478]">
          Student ID
        </label>
        <input
          id="id"
          name="id"
          type="text"
          autoComplete="username"
          required
          placeholder="AEP26-00000"
          className="rounded-lg border border-[#e7e2d8] bg-white px-4 py-2.5 font-mono text-sm text-[#1c2333] outline-none focus:border-[#caa155] focus:ring-2 focus:ring-[#caa155]/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-xs font-bold uppercase tracking-[0.13em] text-[#5b6478]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-[#e7e2d8] bg-white px-4 py-2.5 text-sm text-[#1c2333] outline-none focus:border-[#caa155] focus:ring-2 focus:ring-[#caa155]/30"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-semibold text-[#b5533c]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-lg bg-[#16233f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1c2c4d] disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
