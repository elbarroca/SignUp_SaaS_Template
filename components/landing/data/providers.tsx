'use client';

import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

const DynamicDefaultSeo = dynamic(
  () => import("next-seo").then((mod) => mod.DefaultSeo),
  { ssr: false }
);

const DynamicSidebarProvider = dynamic(
  () => import("@/components/ui/sidebar").then((mod) => mod.SidebarProvider),
  { ssr: false }
);

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DynamicDefaultSeo
        title="MVP SaaS Template by Barroca"
        description="Production-ready Next.js SaaS starter with Supabase Auth, Stripe billing, shadcn/ui, charts, and a modern dashboard."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://mvptemplate-git-main-elbarrocas-projects.vercel.app',
          site_name: 'MVP SaaS Template by Barroca',
        }}
      />
      <DynamicSidebarProvider>
        {children}
      </DynamicSidebarProvider>
    </ThemeProvider>
  );
}
