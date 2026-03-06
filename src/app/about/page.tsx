import Navbar from "@/components/Navbar";
import FooterBlock from "@/components/FooterBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | RS Cleaning Services",
  description: "About RS Cleaning Services LLC - Professional commercial cleaning in Greater Boston.",
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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-teal-tint px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>About Us</SectionHeading>
          <p className="text-center text-lg leading-relaxed text-charcoal">
            Professional commercial cleaning services serving the Greater Boston
            area for over 20 years. Licensed, bonded, and fully insured.
          </p>
        </div>
      </main>
      <FooterBlock />
    </>
  );
}
