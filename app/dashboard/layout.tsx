import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isPremium = profile?.role === 'pro'
  console.log("User profile role:", profile?.role)
  console.log("Is premium:", isPremium)

  return (
    <SidebarProvider>
      <AppSidebar user={user} isPremium={isPremium} />
      {children}
    </SidebarProvider>
  );
}
