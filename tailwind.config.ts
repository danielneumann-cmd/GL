import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          background: "#FAFBF7",
          card: "#FFFFFF",
          surface: "#F3F6F2",
          border: "#E5E7EB",
        },
        text: {
          primary: "#1F2933",
          secondary: "#6B7280",
          soft: "#9CA3AF",
        },
        good: {
          green: "#35B86B",
          greenSoft: "#E8F8EF",
          greenDeep: "#1F7A46",
          coral: "#FF6B6B",
          coralSoft: "#FFECEC",
          coralDeep: "#C94444",
          blue: "#3B82F6",
          blueSoft: "#EAF2FF",
          blueDeep: "#1D5FD1",
        },
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 18px 45px rgba(31, 41, 51, 0.08)",
        soft: "0 10px 30px rgba(31, 41, 51, 0.06)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
