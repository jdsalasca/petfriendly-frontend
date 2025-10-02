import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'

const DEFAULT_BACKEND_BASE = 'https://pets-adoption-h8e6.onrender.com'
const DEFAULT_API_BASE = `${DEFAULT_BACKEND_BASE}/api/v1`

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      port: 3000,
      open: false
    },
    preview: {
      port: 3000
    },
    test: {
      globals: true,
      environment: 'node',
      env: {
        VITE_BASE_PATH_BACKEND: env.VITE_BASE_PATH_BACKEND ?? DEFAULT_BACKEND_BASE,
        VITE_API_BASE_URL: env.VITE_API_BASE_URL ?? DEFAULT_API_BASE,
        VITE_DEMO_USER_EMAIL: env.VITE_DEMO_USER_EMAIL ?? 'demo.user@petfriendly.dev',
        VITE_DEMO_USER_PASSWORD: env.VITE_DEMO_USER_PASSWORD ?? 'DemoPa55!',
        VITE_DEMO_ADMIN_EMAIL: env.VITE_DEMO_ADMIN_EMAIL ?? 'demo.admin@petfriendly.dev',
        VITE_DEMO_ADMIN_PASSWORD: env.VITE_DEMO_ADMIN_PASSWORD ?? 'AdminPa55!'
      }
    }
  }
})
