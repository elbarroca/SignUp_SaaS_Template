"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { Logo } from "@/components/landing/logo";
import { Providers } from "@/components/landing/data/providers";

export default function Page() {
  return (
    <Providers>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm flex flex-col items-center gap-6">
          <Logo />
          <SignUpForm />
        </div>
      </div>
    </Providers>
  );
}
