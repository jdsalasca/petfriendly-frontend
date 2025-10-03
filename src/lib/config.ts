const backendBasePath = (import.meta.env.VITE_BASE_PATH_BACKEND ?? 'https://pets-adoption-h8e6.onrender.com').replace(/\/$/, '')
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? `${backendBasePath}/api/v1`

export const appConfig = {
  backendBasePath,
  apiBaseUrl: API_BASE_URL
}
