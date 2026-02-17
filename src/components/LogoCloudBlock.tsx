"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data — client logos from /public/clients/                          */
/* ------------------------------------------------------------------ */

const logos = [
  { name: "Cedarwood LLC", url: "/clients/cedarwood.png" },
  { name: "New Garden", url: "/clients/new-garden.png" },
  { name: "Row 34", url: "/clients/row34.png" },
  { name: "Shabu Zen", url: "/clients/shabu-zen.png" },
  { name: "Shy Bird", url: "/clients/shy-bird.png" },
];

/* ------------------------------------------------------------------ */
/*  Marquee row                                                        */
/* ------------------------------------------------------------------ */

function MarqueeRow({
  direction,
  speed,
}: {
  direction: "left" | "right";
  speed: number;
}) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-accent/30 hover:shadow-glow-sm sm:h-24 sm:w-44 sm:px-6"
          >
            <Image
              src={logo.url}
              alt={logo.name}
              width={120}
              height={60}
              className="h-auto max-h-14 w-auto max-w-[100px] object-contain sm:max-w-[120px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Block                                                              */
/* ------------------------------------------------------------------ */

export default function LogoCloudBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div ref={containerRef} className="space-y-10">
      {/* Heading + CTA */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          Cleaning made easy
        </h3>

        <div className="mt-6">
          <a
            href="#contact"
            className="group inline-flex items-center rounded-full bg-gradient-to-r from-cyan-accent to-teal-accent px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-lg sm:text-base"
          >
            Get a Quote
            <svg
              className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </motion.div>

      {/* Logo carousel rows */}
      <div className="space-y-6">
        <MarqueeRow direction="left" speed={25} />
        <MarqueeRow direction="right" speed={30} />
      </div>
    </div>
  );
}
