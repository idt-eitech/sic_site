import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Get the repository name from the environment variable (if set in GitHub Actions)
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/';

console.log(`The repository name is ${repoName}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9010
  },
  base: repoName,
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
  
})
