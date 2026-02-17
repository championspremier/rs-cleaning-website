import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuoteForm from "@/components/QuoteForm";
import TestimonialsBlock from "@/components/TestimonialsBlock";
import LogoCloudBlock from "@/components/LogoCloudBlock";

/* ------------------------------------------------------------------ */
/*  Shared tiny components                                             */
/* ------------------------------------------------------------------ */

function SectionHeading({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-14 flex flex-col items-center">
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-charcoal" : "text-white"
        }`}
      >
        {children}
      </h2>
      <span className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ── Navbar ───────────────────────────────────────────────── */}
      <Navbar />

      {/* ── 1. Hero + Services (light) ──────────────────────────── */}
      <HeroSection />

      {/* ── 2. Social Proof (dark) — Testimonials + Trusted By ──── */}
      <section className="bg-charcoal py-20 sm:py-28">
        {/* Testimonials */}
        <TestimonialsBlock />

        {/* Logo Cloud Carousel + CTA */}
        <div className="pt-20 sm:pt-24">
          <LogoCloudBlock />
        </div>
      </section>

      {/* ── 3. Quote Form (light) ────────────────────────────────── */}
      <section id="contact" className="bg-teal-tint px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionHeading dark>Get Your Personalized Quote</SectionHeading>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
