export interface JwtPayload {
  sub?: string
  email?: string
  role?: string | string[]
  [key: string]: unknown
}

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded) as JwtPayload
  } catch (error) {
    console.error('Failed to decode JWT', error)
    return null
  }
}
