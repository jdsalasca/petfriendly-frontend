const STORAGE_KEY = 'petfriendly:auth'

type StoredAuth = {
  accessToken: string
}

const getStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }
  return window.localStorage
}

export const saveAuth = (auth: StoredAuth) => {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(STORAGE_KEY, JSON.stringify(auth))
}

export const loadAuth = (): StoredAuth | null => {
  const storage = getStorage()
  if (!storage) return null

  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredAuth
  } catch (error) {
    console.error('Failed to load auth token', error)
    return null
  }
}

export const clearAuth = () => {
  const storage = getStorage()
  if (!storage) return
  storage.removeItem(STORAGE_KEY)
}
