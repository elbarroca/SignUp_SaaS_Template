"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Home,
  Settings2,
  SquareTerminal,
  Sparkles,
} from "lucide-react"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { User } from "@supabase/supabase-js"
import { PricingDialog } from "./pricing-dialog"
import { createClient } from "@/lib/supabase/client"

const data = {
  navMain: [
    {
      title: "Main",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Playground",
      url: "/dashboard/playground",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({
  user,
  isPremium,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User | null; isPremium: boolean }) {
  const [userRole, setUserRole] = React.useState<string | null>(null)
  const supabase = createClient()

  React.useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

        if (error) {
          console.error("Error fetching user role:", error)
        } else if (data) {
          setUserRole(data.role)
        }
      }
    }

    fetchUserRole()
  }, [user?.id, supabase])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-2 pt-4 items-center">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="text-md group-data-[collapsible=icon]:hidden">
            Asme Inc.
          </span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              {userRole === "Free" ? (
                <PricingDialog userRole={userRole}>
                  <SidebarMenuButton className="flex justify-start items-center">
                    <Sparkles className="size-4" />
                    <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                      Role: <span style={{ color: 'gray' }}>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
                    </span>
                    <span className="text-xs ml-1">Upgrade to Pro</span>
                  </SidebarMenuButton>
                </PricingDialog>
              ) : userRole === "Pro" ? (
                <PricingDialog userRole={userRole}>
                  <SidebarMenuButton className="flex justify-start items-center">
                    <Sparkles className="size-4" />
                    <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                      Role: <span style={{ color: 'orange' }}>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
                    </span>
                    <span className="text-xs ml-1">Upgrade to Premium</span>
                  </SidebarMenuButton>
                </PricingDialog>
              ) : userRole === "Premium" ? (
                <SidebarMenuButton className="flex justify-start items-center">
                  <Sparkles className="size-4" />
                  <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                    Role: <span style={{ color: 'gold' }}>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
                  </span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton className="flex justify-start items-center">
                  <Sparkles className="size-4" />
                  <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                    Role: Loading...
                  </span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="border rounded-lg">
            
          </div>
          <NavUser
            user={{
              name: user?.user_metadata?.full_name || user?.email || "User",
              email: user?.email || "",
              avatar: user?.user_metadata?.avatar_url,
            }}
            isPremium={isPremium}
          />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
