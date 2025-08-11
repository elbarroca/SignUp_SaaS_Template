"use client";

import { FloatingPaths } from "@/components/landing/cta";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function WaitlistSection() {
  const placeholders = [
    "Enter your email",
    "you@example.com",
    "name@company.com",
  ];
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  return (
    <section id="waitlist" className="relative py-24">
      <div className="relative h-[28rem] w-full rounded-xl overflow-hidden border">
        <div className="absolute inset-0 z-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6">
          <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight">
            Join the <AuroraText>waitlist</AuroraText>
          </h2>
          <p className="mt-3 max-w-xl text-center text-muted-foreground">
            Be the first to know when we launch. No spam, unsubscribe anytime.
          </p>
          <p className="mt-1 max-w-xl text-center text-muted-foreground">
            Early members get priority access and exclusive launch perks.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={() => {}}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget as HTMLFormElement;
                      const input = form.querySelector("input");
                      const email = (input as HTMLInputElement)?.value;
                      if (!email) return;
                      try {
                        setStatus("loading");
                        const res = await fetch("/api/waitlist", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        });
                        if (!res.ok) throw new Error("Request failed");
                        setStatus("success");
                      } catch {
                        setStatus("error");
                      }
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="flex items-center justify-center gap-3 rounded-full bg-green-600 text-white dark:bg-green-500 px-4 py-3 shadow-sm ring-1 ring-green-700/40"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Thanks! You’re on the list. We’ll be in touch soon.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-500">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}


