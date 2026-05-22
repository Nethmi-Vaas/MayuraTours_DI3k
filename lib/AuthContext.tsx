"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { api, UserProfile } from "./api"

interface AuthState {
  user: UserProfile | null
  token: string | null
  isLoggedIn: boolean
  loading: boolean
  login: (token: string, userId: number) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  isLoggedIn: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async (t: string) => {
    try {
      const profile = await api.auth.getMe(t)
      setUser(profile)
    } catch {
      localStorage.removeItem("user_token")
      localStorage.removeItem("user_id")
      setToken(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem("user_token")
    if (stored) {
      setToken(stored)
      fetchUser(stored).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [fetchUser])

  const login = useCallback(async (t: string, userId: number) => {
    localStorage.setItem("user_token", t)
    localStorage.setItem("user_id", String(userId))
    setToken(t)
    await fetchUser(t)
  }, [fetchUser])

  const logout = useCallback(() => {
    localStorage.removeItem("user_token")
    localStorage.removeItem("user_id")
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    if (token) await fetchUser(token)
  }, [token, fetchUser])

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
