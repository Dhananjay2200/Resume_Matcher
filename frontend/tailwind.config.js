/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens — "scan console" palette.
        // ink   : primary text / dark surfaces (near-black navy)
        // paper : main background (soft warm-white, like a document)
        // teal  : "match / verified" accent
        // coral : "missing / gap" accent
        // slate : secondary text
        // gold  : sparing emphasis (score highlight only)
        ink: {
          DEFAULT: "#12171F",
          soft: "#232B37",
        },
        paper: {
          DEFAULT: "#F7F5F0",
          dim: "#EFEBE2",
        },
        teal: {
          DEFAULT: "#1F7A6C",
          soft: "#E4F1EE",
          deep: "#155B50",
        },
        coral: {
          DEFAULT: "#C4432B",
          soft: "#FBEAE6",
        },
        slate: {
          DEFAULT: "#5B6472",
        },
        gold: {
          DEFAULT: "#D9A441",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(18,23,31,0.04), 0 8px 24px rgba(18,23,31,0.06)",
        pressed: "inset 0 1px 3px rgba(18,23,31,0.12)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        scanline: "scanline 1.8s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
