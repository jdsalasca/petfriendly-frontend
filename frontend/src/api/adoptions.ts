import { apiClient } from './client'

export interface AdoptionRequestInput {
  petId: string
  message: string
  experience?: string
  livingSituation?: string
}

export const submitAdoptionRequest = async (payload: AdoptionRequestInput) => {
  const response = await apiClient.post<{ message: string }>('/adoption-requests', payload)
  return response.data
}
