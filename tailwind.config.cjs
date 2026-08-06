module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-cream": "#f5f4ef",
        "text-primary": "#111827",
        "text-muted": "#374151",
        "accent-start": "#7c3aed",
        "accent-end": "#06b6d4"
      },
      fontFamily: {
        heading: ["\"Playfair Display\"", 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },

  plugins: []
}
