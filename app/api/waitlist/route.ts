import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Use admin client so RLS does not block anonymous inserts
    const supabase = await createAdminClient();
    const { error } = await supabase
      .from("waitlist")
      .upsert({ email }, { onConflict: "email" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


