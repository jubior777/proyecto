import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";


import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        {
          "@tailwindcss/postcss": {},
          autoprefixer: {},
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 5173, // Cambia el puerto si es necesario
    open: true, // Abre el navegador automáticamente
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Cambia esto a tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
  theme: {
    extend: {
      maxWidth: {
        200: "78rem",
      },
      width: {
        20: '6rem'
      },
    },
  },
  
})

