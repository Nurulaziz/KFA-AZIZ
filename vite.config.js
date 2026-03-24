import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose ke semua network interface (bisa diakses dari HP)
    port: 5173,
  },
})
