const STORAGE_KEY = 'petfriendly:auth'

type StoredAuth = {
  accessToken: string
}

export const saveAuth = (auth: StoredAuth) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
}

export const loadAuth = (): StoredAuth | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredAuth
  } catch (error) {
    console.error('Failed to load auth token', error)
    return null
  }
}

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY)
}
