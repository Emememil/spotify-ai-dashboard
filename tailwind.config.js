/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#000000',           // Main background
          dark: '#121212',            // Primary background
          gray: '#181818',            // Card/module background
          'gray-light': '#242424',    // Hover states
          'gray-border': '#2A2A2A',   // Subtle borders
          green: '#1DB954',           // Primary green
          'green-hover': '#1ed760',   // Green hover state
          white: '#FFFFFF',           // Primary text
          'text-gray': '#B3B3B3',     // Secondary text
          'text-muted': '#6A6A6A',    // Muted text
        }
      },
      backgroundImage: {
        'spotify-gradient': 'linear-gradient(135deg, #121212 0%, #0a0a0a 100%)',
      }
    },
  },
  plugins: [],
}