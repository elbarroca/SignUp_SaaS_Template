export const runtime = "nodejs";
import { stripe } from '@/lib/stripe'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
    console.log(`Received Stripe event: ${event.type}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }
    return new NextResponse(`Webhook Error: Unknown error`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const customerId = checkoutSession.customer as string;
    const userId = checkoutSession.metadata?.userId;

    if (!userId) {
      console.error("User ID not found in checkout session metadata.");
      return new Response("User ID not found", { status: 400 });
    }

    // Retrieve the line items to get the price ID
    const lineItems = await stripe.checkout.sessions.listLineItems(
      checkoutSession.id,
      { limit: 1 }, // Assuming only one product per checkout
    );

    const priceId = lineItems.data[0]?.price?.id;
    console.log(`Webhook - Price ID from session: ${priceId}`);

    let newRole = "Free"; // Default role

    if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID || priceId === process.env.STRIPE_PRO_ANNUAL_PRICE_ID) {
      newRole = "Pro";
    } else if (priceId === process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || priceId === process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID) {
      newRole = "Premium";
    }
    console.log(`Webhook - Determined new role: ${newRole} for user ${userId}`);

    const supabase = await createAdminClient(); // Use createAdminClient here
    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update({
        role: newRole,
        stripe_customer_id: customerId,
        pro_activated_at: newRole !== "Free" ? new Date().toISOString() : null, // Set current timestamp if upgraded
        last_stripe_payment_at: new Date().toISOString(), // Set current timestamp for any payment
      })
      .eq("id", userId as string) // Explicitly cast userId to string if it's not already, though Supabase client should handle it. The issue might be a deeper type mismatch or how 'eq' handles UUIDs.
      .select(); // Select the updated row to confirm

    if (error) {
      console.error("Error updating user role:", error);
      return new Response("Error updating user role", { status: 500 });
    }
    if (!updatedProfile || updatedProfile.length === 0) {
      console.error(`Supabase update did not affect any rows for user ID: ${userId}`);
      return new Response("User profile not found or not updated", { status: 500 });
    }
    console.log(`User ${userId} updated to role: ${newRole}. Updated profile data:`, updatedProfile[0]);

    // Revalidate the dashboard path to show the updated role
    revalidatePath('/dashboard');

  } else if (event.type === 'customer.subscription.deleted') {
    const supabase = await createClient();
    await supabase
      .from('profiles')
      .update({ stripe_subscription_id: null, role: 'free' })
      .eq('stripe_customer_id', session.customer as string)
  }

  return new NextResponse(null, { status: 200 })
}