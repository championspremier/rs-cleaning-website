import Navbar from "@/components/Navbar";
import FooterBlock from "@/components/FooterBlock";
import QuoteForm from "@/components/QuoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | RS Cleaning Services",
  description: "Request a personalized quote for commercial cleaning services.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-14 flex flex-col items-center">
      <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
        {children}
      </h2>
      <span className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-teal-tint px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>Get Your Personalized Quote</SectionHeading>
          <QuoteForm />
        </div>
      </main>
      <FooterBlock />
    </>
  );
}
