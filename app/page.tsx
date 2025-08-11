// app/page.tsx
import { HeroSection } from "@/components/landing/hero-section";
import { GlowingEffectDemo } from "@/components/landing/grid";
import { FeaturesSectionWithHoverEffects } from "@/components/landing/features";
import Pricing from "@/components/landing/pricing";
import { WaitlistSection } from "@/components/landing/waitlist";
import { Footer } from "@/components/landing/footer";
import { FeatureImages } from "@/components/landing/feature-images";
import { AnimatedSection } from "@/components/landing/animated-section";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { createClient } from "@/lib/supabase/server";


export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-7xl">
        <AnimatedSection>
          <HeroSection user={user} />
        </AnimatedSection>        
        
        <AnimatedSection delay={0.4}>
          <section id="features" className="scroll-mt-24">
            <div className="container mx-auto px-4 md:px-8 text-center mt-16">
                <div className="flex justify-center">
                <div className="border py-1 px-4 rounded-lg"><LineShadowText>Features</LineShadowText></div>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 font-sans">
                Feature <AuroraText>Focus</AuroraText>
              </h2>
              <p className="text-center mt-5 opacity-75">
                Discover the key features that make our product stand out.
              </p>
                <div className="mb-24 mt-12">
                <GlowingEffectDemo />
                </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0.5}>
          <FeatureImages />
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <div className="container mx-auto px-4 md:px-8 text-center mt-16">
              <div className="flex justify-center">
              <div className="border py-1 px-4 rounded-lg">More Features</div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 font-sans">
              Additional <AuroraText>Features</AuroraText>
            </h2>
            <p className="text-center mt-5 opacity-75">
              Explore more features that enhance your experience.
            </p>
              <FeaturesSectionWithHoverEffects />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.7}>
          <section id="pricing" className="scroll-mt-24">
            <Pricing />
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0.8}>
          <WaitlistSection />
        </AnimatedSection>
        {/** Testimonials and CTA preserved in codebase but hidden on landing for now */}
        <Footer />
    </main>
  );
}
