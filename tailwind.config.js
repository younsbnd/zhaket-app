/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode based on a CSS class (instead of system preference)
  darkMode: 'class', // 'class' = manually toggle with a class like "dark" applied to <html>

  // Specify the paths to all template files so Tailwind can purge unused CSS
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // All files inside the "app" directory
    "./components/**/*.{js,ts,jsx,tsx}", // All files inside the "components" directory
  ],

  theme: {
    extend: {
      // Add custom font family
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"], // Set "Vazirmatn" as the primary sans-serif font
      },
    },
  },

  // No additional Tailwind plugins in use
  plugins: [],
};
