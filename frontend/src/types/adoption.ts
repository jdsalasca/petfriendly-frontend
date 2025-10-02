export type AdoptionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'

export interface AdoptionRequest {
  id: string
  userId: string
  petId: string
  message: string
  experience?: string
  livingSituation?: string
  reviewNotes?: string
  status: AdoptionStatus
  createdAt: string
  updatedAt: string
  reviewedAt?: string
}
