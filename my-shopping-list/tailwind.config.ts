import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-gradient":
          "radial-gradient(60% 80% at 80% 45%, #4CA7BF 0%, #0d001c 100%)",
        "base-gradient":
          "radial-gradient(60% 80% at 50% 45%, #4CA7BF 0%, #0d001c 100%)",
      },

      colors: {
        blueish: "#4CA7BF",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  plugins: [require("daisyui")],
};
export default config;
