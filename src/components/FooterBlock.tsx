"use client";

import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/#services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

const serviceAreas = [
  "Boston",
  "Cambridge",
  "Somerville",
  "Brookline",
  "Greater Boston Area",
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export default function FooterBlock() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/full-light-logo.png"
              alt="RS Cleaning Services"
              width={180}
              height={60}
              className="h-auto w-40"
            />
            <p className="mt-4 text-sm leading-relaxed text-light-gray">
              Professional commercial cleaning services serving the Greater
              Boston area for over 20 years. Licensed, bonded, and fully
              insured.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-light-gray transition-colors hover:border-cyan-accent/30 hover:text-cyan-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-light-gray transition-colors hover:border-cyan-accent/30 hover:text-cyan-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-light-gray transition-colors hover:text-cyan-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-3">
              {serviceAreas.map((area) => (
                <li key={area} className="text-sm text-light-gray">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get In Touch
            </h4>
            <div className="mt-4 space-y-3 text-sm text-light-gray">
              <p>
                <a
                  href="tel:6172128717"
                  className="transition-colors hover:text-cyan-accent"
                >
                  617-212-8717
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@rscleaningservice.com"
                  className="transition-colors hover:text-cyan-accent"
                >
                  info@rscleaningservice.com
                </a>
              </p>
              <p>Mon–Sat: 7:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-light-gray sm:text-left">
            © 2025 RS Cleaning Services LLC. All rights reserved. Licensed &
            Insured.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:justify-end">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-light-gray transition-colors hover:text-cyan-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
