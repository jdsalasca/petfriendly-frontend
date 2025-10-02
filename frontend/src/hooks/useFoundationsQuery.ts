import { useQuery } from '@tanstack/react-query'
import { fetchFoundationById, fetchFoundations, type FoundationFilters } from '@/api/foundations'
import type { Foundation, FoundationListResponse } from '@/types/foundation'

const foundationsKeys = {
  all: ['foundations'] as const,
  list: (filters: FoundationFilters) => ['foundations', filters] as const,
  detail: (id: string) => ['foundations', id] as const
}

export const useFoundationsQuery = (filters: FoundationFilters = {}) => {
  return useQuery<FoundationListResponse>({
    queryKey: foundationsKeys.list(filters),
    queryFn: () => fetchFoundations(filters),
    placeholderData: (previous) => previous
  })
}

export const useFoundationDetailQuery = (id?: string) => {
  return useQuery<Foundation>({
    queryKey: foundationsKeys.detail(id ?? ''),
    queryFn: () => fetchFoundationById(id as string),
    enabled: Boolean(id)
  })
}
