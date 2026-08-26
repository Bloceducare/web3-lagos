'use client'
import React, { useState } from 'react'

type AdminLoginFormProps = {
  title?: string
  subtitle?: string
  onLogin: (username: string, password: string) => Promise<void>
}

export default function AdminLoginForm({
  title = 'ADMIN ACCESS',
  subtitle = 'Web3Lagos — Admin Console',
  onLogin,
}: AdminLoginFormProps) {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loading, setLoading] = useState(false)

  const input: React.CSSProperties = {
    width: '100%',
    background: 'var(--black3)',
    border: '1px solid var(--border2)',
    borderRadius: 8,
    padding: '11px 14px',
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: 14,
    color: '#fff',
    outline: 'none',
  }

  const submit = async () => {
    setLoginErr('')
    setLoading(true)
    try {
      await onLogin(username, pass)
      setPass('')
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
      <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, padding: 40, width: 360, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 28 }}>{subtitle}</div>
        <div style={{ marginBottom: 14, textAlign: 'left' }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Username</label>
          <input style={input} value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder="admin" autoComplete="username" />
        </div>
        <div style={{ marginBottom: 14, textAlign: 'left' }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Password</label>
          <input type="password" style={input} value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder="••••••••" autoComplete="current-password" />
        </div>
        <button onClick={submit} disabled={loading} style={{ width: '100%', background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 8, border: 'none', marginTop: 6, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
        {loginErr && <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 10 }}>{loginErr}</p>}
        <p style={{ fontSize: 11, color: 'var(--mid)', marginTop: 18, lineHeight: 1.4 }}>
          Admin-only. Authenticated via the auth server.
        </p>
      </div>
    </div>
  )
}
