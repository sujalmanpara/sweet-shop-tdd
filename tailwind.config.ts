import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#181a1b',
        foreground: '#e8e6e3',
        primary: '#d9466f',
        secondary: '#e67a42',
        muted: '#3c3f41',
        card: '#1f2122',
      },
      borderRadius: {
        lg: `0.75rem`,
        md: `calc(0.75rem - 2px)`,
        sm: 'calc(0.75rem - 4px)',
      },
    },
  },
  plugins: [],
};
export default config; 