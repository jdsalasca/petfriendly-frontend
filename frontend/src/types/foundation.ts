export interface Foundation {
  id: string
  name: string
  city?: string
  state?: string
  country?: string
  description?: string
  address?: string
  email?: string
  phone?: string
  website?: string
  status?: string
  imageUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface FoundationListResponse {
  content: Foundation[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
