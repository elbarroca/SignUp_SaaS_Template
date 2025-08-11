"use client";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/landing/logo";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}
