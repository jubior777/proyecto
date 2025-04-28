module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { // Agregamos extend aquí
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: { 
          DEFAULT: '#2563EB',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        secondary: { /* ... colores personalizados ... */ },
      },
      ringOffsetColor: {
        DEFAULT: '#ffffff',
      },
    },
  },
  plugins: [],
};
