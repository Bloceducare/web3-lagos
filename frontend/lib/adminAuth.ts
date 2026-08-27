'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const ADMIN_TOKEN_KEY = 'w3l_admin_token'
export const ADMIN_USER_KEY = 'w3l_admin_user'
export const ADMIN_VERIFIED_AT_KEY = 'w3l_admin_verified_at'

/** How often to hit /admin/me/ while browsing admin pages. */
const VERIFY_TTL_MS = 15 * 60 * 1000

export const API_HOST = (
  process.env.API_URL?.replace(/\/api\/?$/i, '') ||
  'https://giant-dorice-web3bridge-89722e9a.koyeb.app'
).replace(/\/$/, '')

export const API_BASE = `${API_HOST}/api`

export type AdminUser = {
  username?: string
  name?: string
  email?: string
  role?: string
  [key: string]: unknown
}

export function getAdminToken(): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(ADMIN_TOKEN_KEY) || ''
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(ADMIN_USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function getVerifiedAt(): number {
  if (typeof window === 'undefined') return 0
  const raw = sessionStorage.getItem(ADMIN_VERIFIED_AT_KEY)
  const n = raw ? Number(raw) : 0
  return Number.isFinite(n) ? n : 0
}

function markVerifiedNow() {
  sessionStorage.setItem(ADMIN_VERIFIED_AT_KEY, String(Date.now()))
}

function shouldRevalidate(): boolean {
  return Date.now() - getVerifiedAt() > VERIFY_TTL_MS
}

export function setAdminSession(token: string, user: AdminUser) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
  sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user))
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  sessionStorage.removeItem(ADMIN_USER_KEY)
  sessionStorage.removeItem(ADMIN_VERIFIED_AT_KEY)
}

export function adminDisplayName(user: AdminUser | null): string {
  if (!user) return 'Admin'
  return String(user.name || user.username || user.email || 'Admin')
}

export async function adminFetch(path: string, token: string, init: RequestInit = {}) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...(init.headers as Record<string, string> | undefined),
  }
  if (init.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(`${API_BASE}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers,
  })
  return res
}

export function asList<T>(data: any): T[] {
  if (Array.isArray(data)) return data
  return data?.results || []
}

export function useAdminAuth() {
  const [ready, setReady] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState<AdminUser | null>(null)
  const [authError, setAuthError] = useState('')
  const [verifying, setVerifying] = useState(false)

  const logout = useCallback(() => {
    clearAdminSession()
    setLoggedIn(false)
    setToken('')
    setUser(null)
  }, [])

  const applySession = useCallback((nextToken: string, nextUser: AdminUser, opts?: { markVerified?: boolean }) => {
    setAdminSession(nextToken, nextUser)
    if (opts?.markVerified !== false) markVerifiedNow()
    setToken(nextToken)
    setUser(nextUser)
    setLoggedIn(true)
  }, [])

  const verifySession = useCallback(async (authToken: string, opts?: { force?: boolean }) => {
    if (!opts?.force && !shouldRevalidate()) {
      return true
    }
    setVerifying(true)
    setAuthError('')
    try {
      const res = await adminFetch('/admin/me/', authToken)
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Session expired. Please sign in again.')
      }
      const nextUser = (data.user || getAdminUser() || {}) as AdminUser
      applySession(authToken, nextUser)
      return true
    } catch (err) {
      logout()
      setAuthError(err instanceof Error ? err.message : 'Authentication failed')
      return false
    } finally {
      setVerifying(false)
      setReady(true)
    }
  }, [applySession, logout])

  // Hydrate from local session immediately; only hit /admin/me/ when TTL expired.
  useEffect(() => {
    const saved = getAdminToken()
    const savedUser = getAdminUser()
    if (!saved) {
      setReady(true)
      return
    }
    setToken(saved)
    setUser(savedUser)
    setLoggedIn(true)
    setReady(true)

    if (shouldRevalidate()) {
      void verifySession(saved, { force: true })
    }
  }, [verifySession])

  const login = useCallback(async (username: string, password: string) => {
    setAuthError('')
    const res = await fetch(`${API_BASE}/admin/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim(), password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error || data.detail || 'Invalid credentials')
    }
    if (!data.token) {
      throw new Error('Login succeeded but no token returned')
    }
    const nextUser = (data.user || { username }) as AdminUser
    // Login already authenticated; trust local role and skip an immediate /admin/me/.
    applySession(data.token, nextUser)
    setReady(true)
    return nextUser
  }, [applySession])

  const adminName = useMemo(() => adminDisplayName(user), [user])

  return useMemo(
    () => ({
      ready,
      loggedIn,
      token,
      user,
      adminName,
      authError,
      verifying,
      login,
      logout,
      verifySession,
    }),
    [ready, loggedIn, token, user, adminName, authError, verifying, login, logout, verifySession]
  )
}
