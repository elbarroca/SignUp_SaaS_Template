"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface AuthAwareButtonProps extends Omit<ButtonProps, 'asChild'> {
  children: React.ReactNode;
  authenticatedHref?: string;
  unauthenticatedHref?: string;
  className?: string;
  onClick?: () => void;
}

export function AuthAwareButton({ 
  children, 
  authenticatedHref = "/dashboard", 
  unauthenticatedHref = "/auth/login",
  className,
  onClick,
  ...props 
}: AuthAwareButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <Button disabled className={className} {...props}>
        {children}
      </Button>
    );
  }

  if (onClick) {
    return (
      <Button className={className} onClick={onClick} {...props}>
        {children}
      </Button>
    );
  }

  const href = user ? authenticatedHref : unauthenticatedHref;

  return (
    <Button asChild className={className} {...props}>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
}