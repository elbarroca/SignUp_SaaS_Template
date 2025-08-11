import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session) {
      const { user } = session;
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

      if (!profile?.stripe_customer_id) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.user_metadata.full_name,
        });

        await supabase
          .from("profiles")
          .update({ stripe_customer_id: customer.id })
          .eq("id", user.id);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
