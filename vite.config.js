import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Get the repository name from the environment variable (if set in GitHub Actions)
const base = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './';


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9010
  },
  base,
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
