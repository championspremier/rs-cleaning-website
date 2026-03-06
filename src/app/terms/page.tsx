import Navbar from "@/components/Navbar";
import FooterBlock from "@/components/FooterBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RS Cleaning Services",
  description: "Terms of Service for RS Cleaning Services LLC.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-teal-tint px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mb-12 text-sm text-gray-500">Last updated: March 2026</p>

          <div className="space-y-8 text-charcoal">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Informational Purposes
              </h2>
              <p className="leading-relaxed text-charcoal">
                This website is provided for informational purposes only. The
                content is intended to give you general information about RS
                Cleaning Services LLC and our commercial cleaning services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Quotes & Pricing
              </h2>
              <p className="leading-relaxed text-charcoal">
                Any quotes provided through this website or by our team are
                estimates only and do not constitute binding contracts. Final
                pricing is determined after an on-site assessment of your
                facility.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Right to Decline
              </h2>
              <p className="leading-relaxed text-charcoal">
                RS Cleaning Services LLC reserves the right to decline service at
                our discretion.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                No Warranties
              </h2>
              <p className="leading-relaxed text-charcoal">
                This website is provided &quot;as is&quot; without warranties of
                any kind, either express or implied.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Limitation of Liability
              </h2>
              <p className="leading-relaxed text-charcoal">
                RS Cleaning Services LLC is not liable for any website downtime,
                errors, or interruptions in service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Age Requirement
              </h2>
              <p className="leading-relaxed text-charcoal">
                You must be 18 years of age or older to submit the contact form
                on this website.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Governing Law
              </h2>
              <p className="leading-relaxed text-charcoal">
                These terms are governed by the laws of the Commonwealth of
                Massachusetts.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Contact Us
              </h2>
              <p className="leading-relaxed text-charcoal">
                If you have any questions about these terms, please contact us at{" "}
                <a
                  href="mailto:info@rscleaningservice.com"
                  className="font-medium text-cyan-accent hover:text-teal-accent"
                >
                  info@rscleaningservice.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterBlock />
    </>
  );
}
