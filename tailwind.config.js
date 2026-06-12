/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          500: "#4f6ef7",
          600: "#3b57e8",
          700: "#2d44cc",
        },
        surface: "#0B1220",
        panel:   "#111B2E",
        border:  "#1E293B",
        muted:   "#94A3B8",
        neon: {
          cyan:    "#00F0FF",
          purple:  "#D946EF",
          pink:    "#EC4899",
          lime:    "#ADFF2F",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        glow: "0 0 20px 0 rgba(79, 110, 247, 0.2)",
        neon: "0 0 30px rgba(217, 70, 239, 0.4)",
      },
      backgroundImage: {
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "gradient-neon": "linear-gradient(135deg, #00F0FF 0%, #D946EF 50%, #EC4899 100%)",
        "gradient-cyan": "linear-gradient(135deg, #00F0FF 0%, #0EA5E9 100%)",
        "gradient-purple": "linear-gradient(135deg, #D946EF 0%, #9333EA 100%)",
        "gradient-pink": "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
        "gradient-lime": "linear-gradient(135deg, #ADFF2F 0%, #84CC16 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};