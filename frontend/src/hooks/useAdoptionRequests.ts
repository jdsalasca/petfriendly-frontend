import { useQuery } from '@tanstack/react-query'
import { fetchAdoptionRequests } from '@/api/adoptions'
import type { AdoptionRequest } from '@/types/adoption'

const adoptionKeys = {
  all: ['adoption-requests'] as const
}

export const useAdoptionRequests = (enabled = true) => {
  return useQuery<AdoptionRequest[]>({
    queryKey: adoptionKeys.all,
    queryFn: () => fetchAdoptionRequests(),
    enabled
  })
}
