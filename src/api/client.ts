import axios from 'axios'
import { appConfig } from '@/lib/config'
import { clearAuth, loadAuth } from '@/lib/auth-storage'

export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const auth = loadAuth()
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth()
    }
    if (import.meta.env.DEV) {
      console.error('API error', error)
    }
    return Promise.reject(error)
  }
)
