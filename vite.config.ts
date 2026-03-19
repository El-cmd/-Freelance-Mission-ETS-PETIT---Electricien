import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: isGithubActions && repoName ? `/${repoName}/` : '/',
})
