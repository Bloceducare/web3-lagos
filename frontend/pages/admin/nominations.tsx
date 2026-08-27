'use client'
import React, { useCallback, useEffect, useState } from 'react'
import AdminShell, { adminInputStyle } from '../../components/admin/AdminShell'
import AdminLoginForm from '../../components/admin/AdminLoginForm'
import { API_BASE, adminFetch, asList, useAdminAuth } from '../../lib/adminAuth'

type Nomination = {
  id: number
  nominee_name?: string
  name?: string
  email?: string
  nominee_email?: string
  [key: string]: unknown
}

export default function NominationsAdminPage() {
  const auth = useAdminAuth()
  const [items, setItems] = useState<Nomination[]>([])
  const [loading, setLoading] = useState(false)
  const [loadErr, setLoadErr] = useState('')
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Nomination | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const logout = auth.logout

  const ensureAuth = useCallback((res: Response) => {
    if (res.status === 401 || res.status === 403) {
      logout()
      throw new Error('Admin access required. Please sign in again.')
    }
  }, [logout])

  const load = useCallback(async (token: string) => {
    setLoading(true)
    setLoadErr('')
    try {
      const collected: Nomination[] = []
      let nextUrl: string | null = `${API_BASE}/speaker-nominations/?page=1`

      while (nextUrl) {
        const res: Response = await fetch(nextUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        ensureAuth(res)
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || data.error || 'Failed to load nominations')

        if (Array.isArray(data)) {
          collected.push(...data)
          nextUrl = null
        } else {
          collected.push(...asList<Nomination>(data))
          nextUrl = typeof data.next === 'string' ? data.next : null
        }
      }
      setItems(collected)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load nominations'
      setLoadErr(msg)
      showToast(msg)
    } finally {
      setLoading(false)
    }
  }, [ensureAuth])

  useEffect(() => {
    if (auth.loggedIn && auth.token && auth.ready) load(auth.token)
  }, [auth.loggedIn, auth.token, auth.ready, load])

  const remove = async (item: Nomination) => {
    if (!auth.token) return
    if (!window.confirm('Delete this nomination?')) return
    try {
      const res = await adminFetch(`/speaker-nominations/${item.id}/`, auth.token, { method: 'DELETE' })
      ensureAuth(res)
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Delete failed')
      }
      setItems((prev) => prev.filter((x) => x.id !== item.id))
      if (selected?.id === item.id) setSelected(null)
      showToast('Nomination deleted')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not delete')
    }
  }

  const filtered = items.filter((n) => {
    if (!search.trim()) return true
    return JSON.stringify(n).toLowerCase().includes(search.toLowerCase())
  })

  if (!auth.ready || auth.verifying) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)', color: 'var(--mid)' }}>
        Checking admin session…
      </div>
    )
  }

  if (!auth.loggedIn) {
    return <AdminLoginForm subtitle="Web3Lagos — Nominations Admin" onLogin={async (u, p) => { await auth.login(u, p) }} />
  }

  return (
    <AdminShell
      adminName={auth.adminName}
      onLogout={auth.logout}
      title="Speaker Nominations"
      subtitle="Community nominations submitted via the public form. Admin-only list."
    >
      {loadErr && (
        <div style={{ background: 'rgba(229,57,53,.1)', border: '1px solid rgba(229,57,53,.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#E53935' }}>
          {loadErr}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input style={{ ...adminInputStyle, width: 320 }} placeholder="Search nominations..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div style={{ fontSize: 13, color: 'var(--mid)', alignSelf: 'center' }}>{filtered.length} shown</div>
      </div>

      <div style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {loading && !items.length && <div style={{ padding: 40, textAlign: 'center', color: 'var(--mid)' }}>Loading…</div>}
        {!loading && !filtered.length && <div style={{ padding: 40, textAlign: 'center', color: 'var(--mid)' }}>No nominations.</div>}
        {filtered.map((n) => {
          const name = String(n.speaker_name || n.nominee_name || n.name || 'Nomination')
          const email = String(n.your_email || n.nominee_email || n.email || '—')
          const topic = String(n.topic || '')
          return (
            <div key={n.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1.5fr 1fr', padding: '14px 16px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>#{n.id}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{topic || '—'}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{email}</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setSelected(n)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(255,255,255,.06)', color: 'var(--mid)' }}>View</button>
                <button onClick={() => remove(n)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(229,57,53,.12)', color: '#E53935' }}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <div onClick={(e) => e.target === e.currentTarget && setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24 }}>Nomination #{selected.id}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--mid)', fontSize: 22 }}>×</button>
            </div>
            {Object.entries(selected).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--mid)', textTransform: 'uppercase', fontWeight: 700 }}>{k}</div>
                <div style={{ fontSize: 13, textAlign: 'right', wordBreak: 'break-word' }}>{String(v ?? '—')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, background: 'var(--black3)', border: '1px solid var(--border2)', borderRadius: 10, padding: '14px 20px', fontSize: 13 }}>
          {toast}
        </div>
      )}
    </AdminShell>
  )
}
