export type PetStatus = 'Available' | 'Pending Adoption' | 'Adopted' | 'Unavailable'

export interface PetImage {
  id: string
  imageUrl: string
  isPrimary: boolean
  altText?: string
  petId: string
  createdAt: string
  updatedAt: string
}

export interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age?: number
  gender?: string
  size?: string
  description?: string
  status: PetStatus
  city?: string
  foundationId: string
  createdAt: string
  updatedAt: string
  images?: PetImage[]
}

export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
