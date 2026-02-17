import Image from "next/image";
import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12" />
      </svg>
    ),
    title: "Restaurant Cleaning",
    description: "Kitchen-ready hygiene standards for your dining establishment.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "School & Education Buildings",
    description: "Safe, sanitized learning environments for students and staff.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Office Cleaning",
    description: "Professional workspaces that impress clients and boost productivity.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
    title: "Warehouse Cleaning",
    description: "Industrial-grade cleaning for large commercial spaces.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Tile & Hard Wood Floor Care",
    description: "Restore the shine to your tile and hardwood surfaces.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Carpet Cleaning",
    description: "Deep extraction cleaning that removes stains and allergens.",
  },
];

const clients = [
  { name: "Cedarwood LLC", href: "https://cedarwoodllc.com/", logo: "/clients/cedarwood.png" },
  { name: "New Garden", href: "https://www.newgardenfallriverma.com/", logo: "/clients/new-garden.png" },
  { name: "Shabu Zen", href: "https://www.shabuzen.com/", logo: "/clients/shabu-zen.png" },
  { name: "Shy Bird", href: "https://www.shybird.com/", logo: "/clients/shy-bird.png" },
  { name: "Road 34", href: "https://www.road34.com/", logo: "/clients/road34.png" },
];

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

      {/* ── 1. Hero (light) ──────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-teal-tint px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.07)_0%,_transparent_70%)]" />

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          <div className="mb-10">
            <Image
              src="/logo.png"
              alt="RS Cleaning logo"
              width={180}
              height={180}
              priority
              className="h-auto w-[140px] sm:w-[180px]"
            />
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Spotless Homes,{" "}
            <span className="bg-gradient-to-r from-cyan-accent to-teal-accent bg-clip-text text-transparent">
              Happy Families
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500 sm:text-xl">
            Trusted local cleaners delivering sparkling results&nbsp;&mdash;
            every time.
          </p>

          <a
            href="#contact"
            className="group mt-10 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent px-8 py-4 text-base font-bold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-lg sm:px-10 sm:py-4 sm:text-lg"
          >
            Get A Quote
            <svg
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ── 2. Trusted By (dark) ─────────────────────────────────── */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading>Trusted By</SectionHeading>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max gap-5">
            {clients.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-24 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-accent/30 hover:shadow-glow-sm sm:h-28 sm:px-10"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={120}
                  height={60}
                  className="h-auto w-[100px] sm:w-[120px]"
                />
              </a>
            ))}
            {clients.map((c) => (
              <a
                key={`${c.name}-dup`}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden="true"
                className="group flex h-24 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-accent/30 hover:shadow-glow-sm sm:h-28 sm:px-10"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={120}
                  height={60}
                  className="h-auto w-[100px] sm:w-[120px]"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Quote Form (light) ────────────────────────────────── */}
      <section id="contact" className="bg-teal-tint px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionHeading dark>Get Your Personalized Quote</SectionHeading>
          <QuoteForm />
        </div>
      </section>

      {/* ── 4. Services (dark) ───────────────────────────────────── */}
      <section id="services" className="bg-charcoal px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading>Our Services</SectionHeading>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-cyan-accent/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-accent/30 hover:shadow-glow-sm"
              >
                <div className="mb-5 inline-flex rounded-xl bg-cyan-accent/10 p-3 text-cyan-accent">
                  {s.icon}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">
                  {s.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-light-gray">
                  {s.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-medium text-cyan-accent transition-colors hover:text-teal-accent"
                >
                  Get a Quote
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
