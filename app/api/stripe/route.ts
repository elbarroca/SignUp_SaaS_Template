export const runtime = "nodejs";
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { priceId } = await req.json()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  console.log("User ID:", user.id);
  console.log("Profile data:", profile);
  console.log("Profile error:", profileError);

  if (!profile) {
    console.error("Profile not found for user:", user.id);
    return new NextResponse('Profile not found', { status: 404 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    customer: profile.stripe_customer_id,
    metadata: {
      userId: user.id, // Pass the user ID here
    },
    success_url: absoluteUrl('/dashboard'),
    cancel_url: absoluteUrl('/dashboard'),
  })

  return new NextResponse(JSON.stringify({ url: session.url }))
}
