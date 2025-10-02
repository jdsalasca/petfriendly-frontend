import { useQuery } from '@tanstack/react-query'
import { fetchPetById, fetchPets, type FetchPetsParams } from '@/api/pets'
import type { PagedResponse, Pet } from '@/types/pets'

export const petsQueryKeys = {
  all: ['pets'] as const,
  list: (params: FetchPetsParams) => ['pets', params] as const,
  detail: (petId: string) => ['pets', petId] as const
}

export const usePetsQuery = (params: FetchPetsParams = {}) => {
  return useQuery<PagedResponse<Pet>>({
    queryKey: petsQueryKeys.list(params),
    queryFn: () => fetchPets(params),
    placeholderData: (previous) => previous
  })
}

export const usePetDetailQuery = (petId?: string) => {
  return useQuery<Pet>({
    queryKey: petsQueryKeys.detail(petId ?? ''),
    queryFn: () => fetchPetById(petId as string),
    enabled: Boolean(petId)
  })
}
