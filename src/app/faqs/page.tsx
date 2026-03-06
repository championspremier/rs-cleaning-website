import Navbar from "@/components/Navbar";
import FooterBlock from "@/components/FooterBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | RS Cleaning Services",
  description: "Frequently asked questions about RS Cleaning Services.",
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

export default function FAQsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-teal-tint px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>FAQs</SectionHeading>
          <p className="text-center text-lg leading-relaxed text-charcoal">
            Frequently asked questions — content coming soon.
          </p>
        </div>
      </main>
      <FooterBlock />
    </>
  );
}
