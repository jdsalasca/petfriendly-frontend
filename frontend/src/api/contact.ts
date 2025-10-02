import { apiClient } from './client'

export interface ContactMessageInput {
  foundationId: string
  senderName: string
  senderEmail: string
  message: string
  subject?: string
}

export const sendContactMessage = async ({ foundationId, ...rest }: ContactMessageInput) => {
  const response = await apiClient.post<{ message: string }>('/contact-messages', {
    ...rest,
    foundation: {
      id: foundationId
    }
  })
  return response.data
}
