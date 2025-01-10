import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Store-Management-System/',
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});
