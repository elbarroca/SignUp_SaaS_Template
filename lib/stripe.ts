import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(secretKey, {
  // Pin to a stable API version you have tested against
  apiVersion: '2025-07-30.basil',
  typescript: true,
});
