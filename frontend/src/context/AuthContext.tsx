import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { login as loginRequest, register as registerRequest, fetchUserById } from '@/api/auth'
import { clearAuth, loadAuth, saveAuth } from '@/lib/auth-storage'
import { decodeJwt } from '@/lib/jwt'
import type { AuthTokens, UserProfile } from '@/types/auth'

interface AuthContextValue {
  user: UserProfile | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    payload: Parameters<typeof registerRequest>[0]
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUserProfile = useCallback(async (accessToken: string) => {
    const payload = decodeJwt(accessToken)
    const userId = typeof payload?.sub === 'string' ? payload.sub : undefined
    if (!userId) {
      return
    }

    try {
      const profile = await fetchUserById(userId)
      setUser(profile)
    } catch (error) {
      console.error('Failed to fetch user profile', error)
    }
  }, [])

  useEffect(() => {
    const stored = loadAuth()
    if (stored?.accessToken) {
      setTokens(stored)
      void loadUserProfile(stored.accessToken)
    }
    setIsLoading(false)
  }, [loadUserProfile])

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      try {
        const result = await loginRequest({ email, password })
        const authTokens: AuthTokens = { accessToken: result.accessToken }
        setTokens(authTokens)
        saveAuth(authTokens)
        await loadUserProfile(result.accessToken)
      } finally {
        setIsLoading(false)
      }
    },
    [loadUserProfile]
  )

  const register = useCallback(
    async (payload: Parameters<typeof registerRequest>[0]) => {
      await registerRequest(payload)
      await login(payload.email, payload.password)
    },
    [login]
  )

  const logout = useCallback(() => {
    setTokens(null)
    setUser(null)
    clearAuth()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken: tokens?.accessToken ?? null,
      isAuthenticated: Boolean(tokens?.accessToken),
      isLoading,
      login,
      register,
      logout
    }),
    [isLoading, login, logout, register, tokens?.accessToken, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
