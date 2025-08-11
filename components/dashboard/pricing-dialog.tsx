"use client"

import { cn } from "@/lib/utils"
import NumberFlow from "@number-flow/react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { useState } from "react"
import { AuroraText } from "../magicui/aurora-text"
import { AuthAwareButton } from "@/components/dashboard/auth-aware-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const handleCheckout = async (priceId: string) => {
  const res = await fetch("/api/stripe", {
    method: "POST",
    body: JSON.stringify({ priceId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { url } = await res.json();
  window.location.href = url;
};

type Plan = "monthly" | "annually"

type PLAN = {
  id: string
  title: string
  desc: string
  monthlyPrice: number
  annuallyPrice: number
  priceId: {
    monthly: string
    annually: string
  }
  badge?: string
  buttonText: string
  features: string[]
  link: string
}
export const PLANS: PLAN[] = [
  {
    id: "pro",
    title: "Pro",
    desc: "Ideal for developers and indie hackers building with Ruixen UI for personal or small commercial projects.",
    monthlyPrice: 8,
    annuallyPrice: 80,
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!,
      annually: process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID!,
    },
    buttonText: "Get Pro Access",
    features: [
      "Access to 50+ UI components",
      "Tailwind-compatible styling",
      "Basic theming support",
      "Starter templates (blog, dashboard)",
      "1 project license",
      "Community support",
      "Early access to updates",
    ],
    link: "#",
  },
  {
    id: "premium",
    title: "Premium",
    desc: "Designed for teams and startups who need advanced UI components, theme customization, and premium support.",
    monthlyPrice: 80,
    annuallyPrice: 180, // Assuming 180 for annual premium, adjust as needed
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
      annually: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_ANNUAL_PRICE_ID!,
    },
    badge: "Best Value",
    buttonText: "Upgrade to Premium",
    features: [
      "Access to 100+ production-grade components",
      "Advanced theming & dark mode",
      "Code snippets & layout presets",
      "Figma design system access",
      "Commercial use for up to 10 projects",
      "Priority GitHub issue support",
      "Team collaboration tools",
    ],
    link: "#",
  },
]

export function PricingDialog({ children, userRole }: { children: React.ReactNode, userRole: string | null }) {
  const [billPlan, setBillPlan] = useState<Plan>("monthly")

  const handleSwitch = () => {
    setBillPlan((prev) => (prev === "monthly" ? "annually" : "monthly"))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold tracking-tighter">
            <AuroraText>Our</AuroraText> Pricing
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Streamline your creative process with AI. Generate, manage, and
            publish content — all in one place.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-4">
          <span className="text-base font-medium">Monthly</span>
          <button
            onClick={handleSwitch}
            className="relative rounded-full focus:outline-none"
          >
            <div className="w-12 h-6 transition rounded-full shadow-md outline-none bg-orange-500"></div>
            <div
              className={cn(
                "absolute inline-flex items-center justify-center w-4 h-4 transition-all duration-500 ease-in-out top-1 left-1 rounded-full bg-white",
                billPlan === "annually" ? "translate-x-6" : "translate-x-0"
              )}
            />
          </button>
          <span className="text-base font-medium">Annually</span>
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 pt-8 lg:pt-12 gap-4 lg:gap-6">
          {PLANS.map((plan) => (
            <Plan key={plan.id} plan={plan} billPlan={billPlan} userRole={userRole} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const Plan = ({ plan, billPlan, userRole }: { plan: PLAN; billPlan: Plan; userRole: string | null }) => {
  const isCurrentPlan = userRole?.toLowerCase() === plan.id.toLowerCase();
  const isPro = plan.id === "pro";
  const isPremium = plan.id === "premium";

  let buttonText = plan.buttonText;
  let isDisabled = false;

  if (isCurrentPlan) {
    buttonText = "Current Plan";
    isDisabled = true;
  } else if (userRole === "Pro" && isPremium) {
    buttonText = "Upgrade to Premium";
  } else if (userRole === "Premium" && isPro) {
    buttonText = "Downgrade to Pro";
  } else if (userRole === "Premium" && isPremium) {
    buttonText = "Current Plan";
    isDisabled = true;
  } else if (userRole === "Free" && isPro) {
    buttonText = "Get Pro Access";
  } else if (userRole === "Free" && isPremium) {
    buttonText = "Upgrade to Premium";
  }

  return (
    <div
      className={cn(
        "flex flex-col relative rounded-2xl lg:rounded-3xl transition-all bg-background/ items-start w-full border border-foreground/10 overflow-hidden",
        plan.title === "Pro" && "border-orange-500"
      )}
    >
      {plan.title === "Pro" && (
        <div className="absolute top-1/2 inset-x-0 mx-auto h-12 -rotate-45 w-full bg-orange-600 rounded-2xl lg:rounded-3xl blur-[8rem] -z-10"></div>
      )}

      <div className="p-4 md:p-8 flex rounded-t-2xl lg:rounded-t-3xl flex-col items-start w-full relative">
        <h2 className="font-medium text-xl text-foreground pt-5">
          {plan.title}
        </h2>
        <h3 className="mt-3 text-2xl font-bold md:text-5xl">
          <NumberFlow
            value={
              billPlan === "monthly" ? plan.monthlyPrice : plan.annuallyPrice
            }
            suffix={billPlan === "monthly" ? "/mo" : "/yr"}
            format={{
              currency: "EUR",
              style: "currency",
              currencySign: "standard",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              currencyDisplay: "narrowSymbol",
            }}
          />
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          {plan.desc}
        </p>
      </div>
      <div className="flex flex-col items-start w-full px-4 py-2 md:px-8">
        <AuthAwareButton
          size="lg"
          className="w-full"
          authenticatedHref="/dashboard"
          unauthenticatedHref="/auth/login"
          onClick={() => handleCheckout(plan.priceId[billPlan])}
          disabled={isDisabled}
        >
          {buttonText}
        </AuthAwareButton>
        <div className="h-8 overflow-hidden w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.span
              key={billPlan}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-sm text-center text-muted-foreground mt-3 mx-auto block"
            >
              {billPlan === "monthly"
                ? "Billed monthly"
                : "Billed in one annual payment"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col items-start w-full p-5 mb-4 ml-1 gap-y-2">
        <span className="text-base text-left mb-2">Includes:</span>
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-center">
              <CheckIcon className="size-5" />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
