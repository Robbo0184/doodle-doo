module.exports = {
    content: [
        "./components/**/*.{js,jsx,ts,tsx}", 
    ],
    plugins: [
      require('@tailwindcss/nesting'), // Add this line
    ],
  };