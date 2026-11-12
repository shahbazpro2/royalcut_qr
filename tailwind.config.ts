import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      colors: {
        royal: {
          navy: "#060A14",
          midnight: "#0A1224",
          card: "#0E1830",
          sapphire: "#12244E",
          gold: "#D4AF37",
          "gold-light": "#FDF4D8",
          "gold-dark": "#9B7829",
        },
        gold: {
          light: "#FDF4D8",
          DEFAULT: "#D4AF37",
          dark: "#9B7829",
        }
      },
    },
  },
  plugins: [],
};
export default config;
