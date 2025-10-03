import { apiClient } from './client'
import type { UserProfile } from '@/types/auth'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  city?: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
}

export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload)
  return response.data
}

export const register = async (payload: RegisterPayload) => {
  const response = await apiClient.post<{ message: string }>('/auth/register', payload)
  return response.data
}

export const fetchUserById = async (userId: string) => {
  const response = await apiClient.get<UserProfile>(`/users/${userId}`)
  return response.data
}
