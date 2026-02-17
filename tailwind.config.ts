import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        charcoal: {
          DEFAULT: "#1A1A2E",
          light: "#1F1F35",
        },
        cyan: {
          accent: "#22D3EE",
        },
        teal: {
          accent: "#14B8A6",
        },
        "light-gray": "#D1D5DB",
        "teal-tint": "#F0FDFA",
      },
      boxShadow: {
        glow: "0 0 25px rgba(34, 211, 238, 0.4), 0 0 50px rgba(34, 211, 238, 0.2)",
        "glow-lg":
          "0 0 35px rgba(34, 211, 238, 0.5), 0 0 70px rgba(34, 211, 238, 0.25)",
        "glow-sm":
          "0 0 15px rgba(34, 211, 238, 0.3), 0 0 30px rgba(34, 211, 238, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
