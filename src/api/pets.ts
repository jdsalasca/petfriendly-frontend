import { apiClient } from './client'
import type { PagedResponse, Pet } from '@/types/pets'

export interface FetchPetsParams {
  page?: number
  size?: number
  city?: string
  foundationId?: string
  species?: string
  status?: string
}

export const fetchPets = async (params: FetchPetsParams = {}) => {
  const response = await apiClient.get<PagedResponse<Pet>>('/pets', {
    params: {
      status: 'Available',
      size: 12,
      page: 0,
      ...params
    }
  })

  return response.data
}

export const fetchPetById = async (petId: string) => {
  const response = await apiClient.get<Pet>(`/pets/${petId}`)
  return response.data
}
