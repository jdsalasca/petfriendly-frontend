export type UserRole = 'Visitor' | 'User' | 'Foundation Admin' | 'Super Admin'

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  city?: string
  role: UserRole
  active?: boolean
  foundationId?: string
}

export interface AuthTokens {
  accessToken: string
}
