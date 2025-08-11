<h1 align="center">MVP SaaS Template — Next.js + Supabase + Stripe</h1>

An opinionated, production‑ready Next.js starter that gets you from sign‑up to paid in one codebase. It ships with Supabase Auth (SSR), Stripe Checkout + webhooks, a polished dashboard UI, and sensible defaults for SEO, theming, and performance. Swap the logo, set envs, and ship.

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Database schema (Supabase)](#database-schema-supabase)
- [Stripe setup and local testing](#stripe-setup-and-local-testing)
- [Key files](#key-files)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Project structure](#project-structure)
- [Development scripts](#development-scripts)
- [License](#license)

## Features

- **Next.js App Router**: server components, route handlers, middleware
- **Supabase Auth (SSR)**: cookie‑based sessions on client, server, and middleware
- **Stripe billing**: Checkout + webhook updates user role based on Price ID
- **Dashboard UI**: Tailwind CSS + shadcn/ui + subtle animations
- **Pricing dialog**: Reads public Stripe Price IDs from env
- **SEO & favicon**: Next Metadata API and `app/icon.svg` (with `favicon.ico` fallback)
- **TypeScript**, **ESLint**, Turbopack dev server

## What’s included

- **Authentication & accounts**
  - Supabase Auth with SSR cookies across client, server, and middleware
  - Ready‑made pages: `app/auth/login`, `app/auth/sign-up`, `app/auth/forgot-password`, `app/auth/update-password`, and `app/auth/callback`
  - Session refresh middleware: `middleware.ts` + `lib/supabase/middleware.ts`
- **Billing & roles**
  - Stripe Checkout handler: `app/api/stripe/route.ts`
  - Stripe webhook with role mapping by Price ID: `app/api/stripe/webhook/route.ts`
  - Pricing UI wired to env Price IDs: `components/dashboard/pricing-dialog.tsx`
- **Dashboard**
  - Shell and sidebar: `app/dashboard/layout.tsx`, `components/dashboard/app-sidebar.tsx`
  - Example widgets: charts, tables, settings page
- **Landing pages**
  - Sections for hero, features, pricing, testimonials, footer in `components/landing/*`
- **UX & foundations**
  - Tailwind CSS + shadcn/ui, dark mode with `next-themes`
  - SEO via Next Metadata API: `app/metadata.ts`; favicon/logo via `app/icon.svg`
  - Performance hooks: Vercel Analytics + Speed Insights

## Requirements

- Node.js 18+ (recommended LTS)
- A Supabase project (URL + anon key)
- Stripe account

## Quick start

1) Clone and install

```bash
git clone <your-repo-url>
cd Saas_Template
npm install
```

2) Create `.env.local` (copy and paste this):

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID=
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_PREMIUM_ANNUAL_PRICE_ID=

STRIPE_PRO_MONTHLY_PRICE_ID=
STRIPE_PRO_ANNUAL_PRICE_ID=
STRIPE_PREMIUM_MONTHLY_PRICE_ID=
STRIPE_PREMIUM_ANNUAL_PRICE_ID=
```

3) Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Environment variables

- Base URL: `NEXT_PUBLIC_BASE_URL`
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Stripe price IDs (public UI): `NEXT_PUBLIC_STRIPE_*`
- Stripe price IDs (server webhook): `STRIPE_*`

Never commit real secrets.

## Database schema (Supabase)

Create a `profiles` table and optional trigger. Minimal schema:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'Free',
  stripe_customer_id text,
  pro_activated_at timestamptz,
  last_stripe_payment_at timestamptz,
  stripe_subscription_id text
);

alter table public.profiles enable row level security;
create policy "Profiles are readable by owners" on public.profiles
  for select using (auth.uid() = id);
```

On sign‑in we ensure a Stripe customer exists and update `profiles` in `app/auth/callback/route.ts`.

### Full SQL (copy/paste)

```sql
-- Waitlist table used by /api/waitlist
create table if not exists public.waitlist (
  id uuid not null default gen_random_uuid (),
  email text not null,
  created_at timestamptz null default now(),
  constraint waitlist_pkey primary key (id),
  constraint waitlist_email_key unique (email),
  constraint waitlist_email_check check ((position('@' in email) > 1))
) tablespace pg_default;

-- Profiles table storing user role and Stripe linkage
create table if not exists public.profiles (
  id uuid not null,
  role text not null default 'Free',
  stripe_customer_id text null,
  stripe_subscription_id text null,
  pro_activated_at timestamptz null,
  last_stripe_payment_at timestamptz null,
  full_name text null,
  avatar_url text null,
  created_at timestamptz null default now(),
  updated_at timestamptz null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_stripe_customer_id_key unique (stripe_customer_id),
  constraint unique_profile_id unique (id),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
  constraint default_role_check check (role = any (array['Free','Pro','Premium'])),
  constraint profiles_role_check check (role = any (array['Free','Pro','Premium']))
) tablespace pg_default;

create index if not exists idx_profiles_stripe_customer_id on public.profiles using btree (stripe_customer_id) tablespace pg_default;

-- Optional trigger to auto-update updated_at
create or replace function update_modified_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_profiles_modtime on public.profiles;
create trigger update_profiles_modtime
before update on public.profiles
for each row execute function update_modified_column();
```

## Stripe setup and local testing

1) Create Prices (Pro monthly/annual, Premium monthly/annual) and paste IDs into env (both public and server variants).
2) Set `STRIPE_SECRET_KEY`.
3) Add a webhook endpoint to `https://your-domain.com/api/stripe/webhook` with `checkout.session.completed` and `customer.subscription.deleted` events. Paste the signing secret into `STRIPE_WEBHOOK_SECRET`.
4) Local testing with Stripe CLI:

```bash
brew install stripe/stripe-cli/stripe   # macOS
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Webhooks will update `profiles.role` based on Price ID.

## Key files

- Metadata & favicon: `app/metadata.ts`, `app/icon.svg`
- Root layout: `app/layout.tsx`
- Stripe Checkout: `app/api/stripe/route.ts`
- Stripe Webhook: `app/api/stripe/webhook/route.ts`
- Supabase clients: `lib/supabase/{client,server,middleware}.ts`
- Pricing UI: `components/dashboard/pricing-dialog.tsx`
- Helpers: `lib/utils.ts`

## Customization

- Branding: update titles/descriptions in `app/metadata.ts` and `app/layout.tsx`
- Favicon/logo: replace `app/icon.svg` (keeps `app/favicon.ico` fallback)
- Pricing: edit plans in `components/dashboard/pricing-dialog.tsx`
- Styles: Tailwind config in `tailwind.config.ts`, shadcn components under `components/ui`

## Deployment

- Vercel recommended. Set env vars in Project Settings → Environment Variables.
- Add the Stripe webhook URL: `https://your-domain.com/api/stripe/webhook`.

## Troubleshooting

- Blank pricing buttons: ensure all `NEXT_PUBLIC_STRIPE_*` envs are set.
- Webhook not updating roles: verify `STRIPE_*` server envs and `SUPABASE_SERVICE_ROLE_KEY`.
- Auth session missing on server: confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and middleware is active.
- Wrong absolute URLs: set `NEXT_PUBLIC_BASE_URL` correctly.

## Project structure

```
app/               # routes, layouts, metadata, API handlers
components/        # UI components and modules (dashboard, landing, ui, magicui)
lib/               # supabase clients, utils, stripe
public/            # static assets
```

## Development scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production build locally
npm run lint     # lint
```

## License

MIT. Replace branding as needed.
