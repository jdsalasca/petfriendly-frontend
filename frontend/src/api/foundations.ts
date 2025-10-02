import { apiClient } from './client'
import type { Foundation, FoundationListResponse } from '@/types/foundation'

export interface FoundationFilters {
  city?: string
  status?: string
}

const normalizeFoundationList = (data: FoundationListResponse | Foundation[] | undefined): FoundationListResponse => {
  if (Array.isArray(data)) {
    return {
      content: data,
      totalElements: data.length,
      totalPages: 1,
      size: data.length,
      number: 0
    }
  }

  return (
    data ?? {
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0
    }
  )
}

export const fetchFoundations = async (filters: FoundationFilters = {}) => {
  const response = await apiClient.get<FoundationListResponse | Foundation[]>('/foundations', {
    params: {
      size: 20,
      page: 0,
      ...filters
    }
  })

  return normalizeFoundationList(response.data)
}

export const fetchFoundationById = async (id: string) => {
  const response = await apiClient.get<Foundation>(`/foundations/${id}`)
  return response.data
}
