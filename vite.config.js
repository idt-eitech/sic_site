import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9010
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure assets are referenced with the correct base path
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})
