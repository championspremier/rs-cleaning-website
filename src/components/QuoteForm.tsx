"use client";

import { useRef, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/*  Service options (icon + label)                                     */
/* ------------------------------------------------------------------ */

const serviceOptions = [
  {
    label: "Restaurant Cleaning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12" />
      </svg>
    ),
  },
  {
    label: "School & Education Buildings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    label: "Office Cleaning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    label: "Warehouse Cleaning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
  },
  {
    label: "Tile & Hard Wood Floor Care",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    label: "Carpet Cleaning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    label: "Other",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleService(label: string) {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      company_name: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      services: selectedServices,
      additional_info: formData.get("info") as string,
    };

    const { error: dbError } = await supabase
      .from("quote_requests")
      .insert([payload]);

    setLoading(false);

    if (dbError) {
      setError(
        "Something went wrong. Please call us at 617-212-8717."
      );
      return;
    }

    setSubmitted(true);
    setSelectedServices([]);
    formRef.current?.reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-charcoal">Thank you!</h3>
        <p className="mt-2 text-gray-600">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  /* Shared input styles — light theme */
  const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 outline-none transition-all focus:border-cyan-accent focus:ring-2 focus:ring-cyan-accent/20";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl space-y-6"
    >
      {/* Name row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          required
          className={inputCls}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          required
          className={inputCls}
        />
      </div>

      {/* Company */}
      <input
        type="text"
        name="company"
        placeholder="Company Name *"
        required
        className={inputCls}
      />

      {/* Email + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          className={inputCls}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          required
          className={inputCls}
        />
      </div>

      {/* Service selection cards */}
      <div>
        <p className="mb-3 text-sm font-medium text-charcoal">
          Service Interested In *
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {serviceOptions.map((svc) => {
            const active = selectedServices.includes(svc.label);
            return (
              <button
                key={svc.label}
                type="button"
                onClick={() => toggleService(svc.label)}
                className={`relative flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-center transition-all duration-200 ${
                  active
                    ? "border-cyan-accent bg-cyan-accent/5 shadow-glow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {/* Checkmark */}
                {active && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                )}
                <span className={active ? "text-cyan-accent" : "text-gray-400"}>
                  {svc.icon}
                </span>
                <span className="text-xs font-medium leading-tight text-charcoal">
                  {svc.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional info */}
      <textarea
        name="info"
        rows={4}
        placeholder="Additional Information *"
        required
        className={`${inputCls} resize-none`}
      />

      {/* Error message */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent px-8 py-4 text-base font-bold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-lg disabled:pointer-events-none disabled:opacity-70 sm:w-auto sm:text-lg"
        >
          {loading ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Send My Message"
          )}
        </button>
      </div>
    </form>
  );
}
