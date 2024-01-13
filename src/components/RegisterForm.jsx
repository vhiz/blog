"use client";
import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
export default function RegisterForm() {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();
  useEffect(() => {
    state?.success && router.push("/login");
  }, [state, router]);
  return (
    <form action={formAction} className="flex flex-col text-center gap-6">
      <input
        className="p-3 bg-primary text-white rounded"
        type="text"
        placeholder="Username"
        name="username"
        required
      />
      <input
        className="p-3 bg-primary text-white rounded"
        type="email"
        placeholder="Email"
        name="email"
        required
      />
      <input
        className="p-3 bg-primary text-white rounded"
        type="password"
        placeholder="Password"
        name="password"
        required
      />
      <input
        className="p-3 bg-primary text-white rounded"
        type="password"
        placeholder="Repeat Password"
        name="passwordRepeat"
        required
      />
      <button className="p-3 bg-accent text-white">Sign Up</button>
      <Link href={'/login'} className="font-[300] text-[0.7rem] text-blue-500">Have An Account With Us?</Link>
      <span className="text-sm font-bold text-red-600">{state?.error}</span>
    </form>
  );
}
