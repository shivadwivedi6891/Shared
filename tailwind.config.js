/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // Tailwind blue-500
          DEFAULT: '#1D4ED8', // Tailwind blue-700
          dark: '#1E40AF', // Tailwind blue-800
        },
        secondary: {
          light: '#FACC15', // Tailwind yellow-400
          DEFAULT: '#EAB308', // Tailwind yellow-500
          dark: '#CA8A04', // Tailwind yellow-600
        },
        danger: {
          light: '#F87171', // red-400
          DEFAULT: '#EF4444', // red-500
          dark: '#B91C1C', // red-700
        },
        success: {
          light: '#4ADE80', // green-400
          DEFAULT: '#22C55E', // green-500
          dark: '#15803D', // green-700
        },
        background: {
          light: '#F9FAFB', // gray-50
          dark: '#111827', // gray-900
        },
      },
    },
  },
  plugins: [],
};
