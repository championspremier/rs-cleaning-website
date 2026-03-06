import Navbar from "@/components/Navbar";
import FooterBlock from "@/components/FooterBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RS Cleaning Services",
  description: "Privacy Policy for RS Cleaning Services LLC.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-teal-tint px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-12 text-sm text-gray-500">Last updated: March 2026</p>

          <div className="space-y-8 text-charcoal">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                About Us
              </h2>
              <p className="leading-relaxed text-charcoal">
                RS Cleaning Services LLC is a professional commercial cleaning
                company based in the Greater Boston, MA area.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                What We Collect
              </h2>
              <p className="leading-relaxed text-charcoal">
                When you submit a quote request through our contact form, we
                collect your name, email address, phone number, company name,
                service interest, and any additional information you choose to
                provide.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Why We Collect It
              </h2>
              <p className="leading-relaxed text-charcoal">
                We use this information to respond to your quote requests and to
                communicate with you about our cleaning services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Sharing Your Data
              </h2>
              <p className="leading-relaxed text-charcoal">
                We do not sell or share your personal data with third parties.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Cookies
              </h2>
              <p className="leading-relaxed text-charcoal">
                We do not use cookies for tracking purposes on this website.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Data Security & Retention
              </h2>
              <p className="leading-relaxed text-charcoal">
                Your data is stored securely and retained only as long as
                necessary to fulfill the purposes described above or as required
                by law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-charcoal">
                Contact Us
              </h2>
              <p className="leading-relaxed text-charcoal">
                If you have any questions about this privacy policy or would like
                to request deletion of your data, please contact us at{" "}
                <a
                  href="mailto:info@rscleaningservice.com"
                  className="font-medium text-cyan-accent hover:text-teal-accent"
                >
                  info@rscleaningservice.com
                </a>
                .
              </p>
            </section>

            <p className="text-sm italic text-gray-500">
              This is a general privacy policy and does not constitute legal
              advice. We recommend consulting with a legal professional for
              advice specific to your situation.
            </p>
          </div>
        </div>
      </main>
      <FooterBlock />
    </>
  );
}
