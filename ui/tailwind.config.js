/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff1f8",
          100: "#ffe4f2",
          200: "#ffcce7",
          300: "#ff9ad1",
          400: "#ff66bb",
          500: "#f641a5",
          600: "#d92683",
          700: "#b51d69",
          800: "#901754",
          900: "#6d1140",
        },
        ink: {
          DEFAULT: "#1a1016",
          soft: "#2a1a24",
          muted: "#6b5560",
        },
      },
      fontFamily: {
        display: ['"Press Start 2P"', "monospace"],
        pixel: ['"Silkscreen"', '"Press Start 2P"', "monospace"],
      },
      boxShadow: {
        pixel: "4px 4px 0 0 rgba(26,16,22,1)",
        "pixel-pink": "4px 4px 0 0 rgba(214,38,131,1)",
        "pixel-lg": "8px 8px 0 0 rgba(26,16,22,1)",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
      },
      animation: {
        blink: "blink 1.2s steps(1) infinite",
        scan: "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
};
