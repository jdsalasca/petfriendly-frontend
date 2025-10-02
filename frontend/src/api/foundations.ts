import { apiClient } from './client'
import type { Foundation, FoundationListResponse } from '@/types/foundation'

export interface FoundationFilters {
  city?: string
  status?: string
}

export const fetchFoundations = async (filters: FoundationFilters = {}) => {
  const response = await apiClient.get<FoundationListResponse>('/foundations', {
    params: {
      size: 20,
      page: 0,
      ...filters
    }
  })

  return response.data
}

export const fetchFoundationById = async (id: string) => {
  const response = await apiClient.get<Foundation>(`/foundations/${id}`)
  return response.data
}
