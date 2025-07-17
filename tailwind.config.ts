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
        background: '#111827', // Dark Gray (gray-900)
        foreground: '#e5e7eb', // Light Gray (gray-200)
        card: '#1f2937',      // Lighter Gray for cards (gray-800)
        primary: '#d95f76',   // Vibrant Pink
        secondary: '#e69842', // Vibrant Orange
        muted: '#9ca3af',     // Muted Gray (gray-400)
        border: '#374151',    // Border Color (gray-700)
        input: '#374151',
        ring: '#e69842',
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