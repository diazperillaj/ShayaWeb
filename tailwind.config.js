/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#F9F5EF",
        ivory:    "#F0E9DC",
        terra:    "#C07B52",
        moss:     "#5A8270",
        espresso: "#271409",
        mocha:    "#6B3F22",
        latte:    "#D9C9B0",
      },
      fontFamily: {
        display: ["'Libre Baskerville'", "Georgia", "serif"],
        sans:    ["'Outfit'", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(44px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%":      { transform: "translateX(-50%) translateY(7px)" },
        },
      },
      animation: {
        "fade-up-1": "fadeUp .95s cubic-bezier(.16,1,.3,1) .10s both",
        "fade-up-2": "fadeUp .95s cubic-bezier(.16,1,.3,1) .27s both",
        "fade-up-3": "fadeUp .95s cubic-bezier(.16,1,.3,1) .43s both",
        "fade-up-4": "fadeUp .95s cubic-bezier(.16,1,.3,1) .57s both",
        "bounce-arr": "bounceSlow 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

