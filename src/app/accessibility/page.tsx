import Navbar from "@/components/Navbar";
import FooterBlock from "@/components/FooterBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | RS Cleaning Services",
  description: "Accessibility Statement for RS Cleaning Services LLC.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-teal-tint px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Accessibility Statement
          </h1>

          <div className="mt-12 space-y-8 text-charcoal">
            <section>
              <p className="leading-relaxed text-charcoal">
                RS Cleaning Services LLC is committed to making this website
                accessible to all users, including those with disabilities. We
                believe everyone should be able to access information about our
                services and contact us with ease.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Our Standards
              </h2>
              <p className="leading-relaxed text-charcoal">
                We aim to conform to the Web Content Accessibility Guidelines
                (WCAG) 2.1 Level AA standards to ensure our website is usable by
                as many people as possible.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Feedback & Contact
              </h2>
              <p className="leading-relaxed text-charcoal">
                If you experience any difficulty accessing this website or have
                suggestions for how we can improve accessibility, please contact
                us. We welcome your feedback.
              </p>
              <ul className="mt-4 space-y-2 text-charcoal">
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:6172128717"
                    className="font-medium text-cyan-accent hover:text-teal-accent"
                  >
                    617-212-8717
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@rscleaningservice.com"
                    className="font-medium text-cyan-accent hover:text-teal-accent"
                  >
                    info@rscleaningservice.com
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <FooterBlock />
    </>
  );
}
