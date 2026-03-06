import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollCleanVideo from "@/components/ScrollCleanVideo";
import TestimonialsBlock from "@/components/TestimonialsBlock";
import LogoCloudBlock from "@/components/LogoCloudBlock";
import QuoteForm from "@/components/QuoteForm";
import FooterBlock from "@/components/FooterBlock";

export default function Home() {
  return (
    <>
      {/* ── Navbar ───────────────────────────────────────────────── */}
      <Navbar />

      {/* ── 1. Scroll-driven frame animation (dark) — FIRST ─────── */}
      <ScrollCleanVideo />

      {/* ── 2. Hero + Services (light) ──────────────────────────── */}
      <HeroSection />

      {/* ── 3. Social Proof (dark) — Testimonials + Trusted By ──── */}
      <section className="bg-charcoal py-20 sm:py-28">
        {/* Testimonials */}
        <TestimonialsBlock />

        {/* Logo Cloud Carousel + CTA */}
        <div className="pt-20 sm:pt-24">
          <LogoCloudBlock />
        </div>
      </section>

      {/* ── 5. Quote Form (light) ───────────────────────────────── */}
      <section className="bg-teal-tint px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Get Your Personalized Quote
            </h2>
            <span className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent" />
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* ── 6. Footer (dark) — last on page ─────────────────────── */}
      <FooterBlock />
    </>
  );
}
