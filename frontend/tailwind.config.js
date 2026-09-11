/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 30px rgba(45, 212, 191, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.12) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
