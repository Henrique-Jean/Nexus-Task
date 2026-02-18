/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexus-dark': '#0f172a',
        'nexus-card': '#1e293b',
        'nexus-primary': '#3b82f6',
        'nexus-accent': '#8b5cf6'
      }
    },
  },
  plugins: [],
}

