"use client"

import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();
  useEffect(() => {
    state?.success && router.push("/");
  }, [state, router]);
  return (
    <form className="flex flex-col text-center gap-6" action={formAction}>
      <input
        className="p-3 bg-primary text-white rounded"
        type="text"
        placeholder="Username"
        name="username"
        required
      />
      <input
        className="p-3 bg-primary text-white rounded"
        type="password"
        placeholder="Password"
        name="password"
        required
      />
      <button className="p-3 bg-accent text-white">
        Login with Credentials
      </button>
      <Link href={'/register'} className="font-[300] text-[0.7rem] text-blue-500">Sign Up?</Link>
      <span className="text-sm font-bold text-red-600">{state?.error}</span>
    </form>
  );
}
