import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "MVP SaaS Template by Barroca",
    template: "%s | MVP SaaS Template",
  },
  description:
    "Production-ready Next.js SaaS starter with Supabase Auth, Stripe billing, shadcn/ui, charts, animations, and a modern dashboard.",
  keywords: [
    "Next.js",
    "Supabase",
    "Stripe",
    "SaaS",
    "Starter Template",
    "shadcn/ui",
    "Tailwind CSS",
  ],
  authors: [{ name: "Barroca" }],
  creator: "Barroca",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "MVP SaaS Template by Barroca",
    description:
      "Production-ready Next.js SaaS starter with Supabase Auth, Stripe billing, shadcn/ui, charts, and a modern dashboard.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "MVP SaaS Template",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP SaaS Template by Barroca",
    description:
      "Production-ready Next.js SaaS starter with Supabase Auth, Stripe billing, shadcn/ui, charts, and a modern dashboard.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
};
