'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const API_HOST = (
  process.env.API_URL?.replace(/\/api\/?$/i, '') ||
  'https://giant-dorice-web3bridge-89722e9a.koyeb.app'
).replace(/\/$/, '')
const API_BASE = `${API_HOST}/api`

type Conference = {
  id: number
  name: string
  year: number
  start_date: string
  end_date: string
  venue: string
}

type Hall = {
  id: number
  name: string
  slug: string | null
  conference: number
  embed_url: string
  is_live: boolean
  stream_active?: boolean
}

type HallDraft = {
  name: string
  slug: string
  embed_url: string
  is_live: boolean
}

const emptyDraft = (): HallDraft => ({
  name: '',
  slug: '',
  embed_url: '',
  is_live: false,
})

function asList<T>(data: any): T[] {
  if (Array.isArray(data)) return data
  return data?.results || []
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function LivestreamAdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [adminName, setAdminName] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadErr, setLoadErr] = useState('')
  const [toast, setToast] = useState('')

  const [conferences, setConferences] = useState<Conference[]>([])
  const [conferenceId, setConferenceId] = useState<number | null>(null)
  const [halls, setHalls] = useState<Hall[]>([])
  const [drafts, setDrafts] = useState<Record<number, HallDraft>>({})
  const [savingId, setSavingId] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [newHall, setNewHall] = useState<HallDraft>(emptyDraft())

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const authHeaders = (authToken: string) => ({
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  })

  const loadData = useCallback(async (authToken: string, preferredConferenceId?: number | null) => {
    setLoading(true)
    setLoadErr('')
    try {
      const confRes = await fetch(`${API_BASE}/conferences/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const confData = await confRes.json()
      if (!confRes.ok) {
        throw new Error(confData.detail || confData.error || 'Failed to load conferences')
      }

      const confList = asList<Conference>(confData)
      setConferences(confList)

      const year = new Date().getFullYear()
      const selected =
        confList.find((c) => c.id === preferredConferenceId) ||
        confList.find((c) => c.year === year) ||
        confList[0] ||
        null

      if (!selected) {
        setConferenceId(null)
        setHalls([])
        setDrafts({})
        return
      }

      setConferenceId(selected.id)

      const hallsRes = await fetch(`${API_BASE}/halls/?conference=${selected.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const hallsData = await hallsRes.json()
      if (!hallsRes.ok) {
        throw new Error(hallsData.detail || hallsData.error || 'Failed to load halls')
      }

      const hallList = asList<Hall>(hallsData)
      setHalls(hallList)
      const nextDrafts: Record<number, HallDraft> = {}
      hallList.forEach((h) => {
        nextDrafts[h.id] = {
          name: h.name,
          slug: h.slug || '',
          embed_url: h.embed_url || '',
          is_live: Boolean(h.is_live),
        }
      })
      setDrafts(nextDrafts)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load livestream data'
      setLoadErr(msg)
      showToast(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem('w3l_admin_token')
    const user = sessionStorage.getItem('w3l_admin_user')
    if (saved && user) {
      const parsed = JSON.parse(user)
      setToken(saved)
      setLoggedIn(true)
      setAdminName(parsed.name || parsed.username || 'Admin')
      loadData(saved)
    }
  }, [loadData])

  const login = async () => {
    setLoginErr('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/admin/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: pass }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid credentials')
      if (!data.token) throw new Error('Login succeeded but no token returned')
      const user = data.user || { username }
      sessionStorage.setItem('w3l_admin_token', data.token)
      sessionStorage.setItem('w3l_admin_user', JSON.stringify(user))
      setToken(data.token)
      setLoggedIn(true)
      setAdminName(user.name || user.username || 'Admin')
      setPass('')
      await loadData(data.token)
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('w3l_admin_token')
    sessionStorage.removeItem('w3l_admin_user')
    setLoggedIn(false)
    setToken('')
    setAdminName('')
    setHalls([])
    setConferences([])
    setDrafts({})
  }

  const updateDraft = (id: number, patch: Partial<HallDraft>) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }))
  }

  const saveHall = async (hall: Hall, override?: Partial<HallDraft>) => {
    if (!token || !conferenceId) return
    const draft = { ...drafts[hall.id], ...override }
    setSavingId(hall.id)
    try {
      const res = await fetch(`${API_BASE}/halls/${hall.id}/`, {
        method: 'PATCH',
        headers: authHeaders(token),
        body: JSON.stringify({
          name: draft.name.trim(),
          slug: (draft.slug || slugify(draft.name)).trim(),
          embed_url: draft.embed_url.trim(),
          is_live: Boolean(draft.is_live),
          conference: conferenceId,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || data.error || JSON.stringify(data) || 'Update failed')
      }
      setHalls((prev) => prev.map((h) => (h.id === hall.id ? { ...h, ...data } : h)))
      setDrafts((prev) => ({
        ...prev,
        [hall.id]: {
          name: data.name,
          slug: data.slug || '',
          embed_url: data.embed_url || '',
          is_live: Boolean(data.is_live),
        },
      }))
      showToast(data.is_live ? `● ${data.name} is LIVE` : `Saved ${data.name}`)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not save hall')
    } finally {
      setSavingId(null)
    }
  }

  const toggleLive = async (hall: Hall) => {
    const next = !drafts[hall.id]?.is_live
    updateDraft(hall.id, { is_live: next })
    await saveHall(hall, { is_live: next })
  }

  const createHall = async () => {
    if (!token || !conferenceId) return
    if (!newHall.name.trim()) {
      showToast('Hall name is required')
      return
    }
    setCreating(true)
    try {
      const res = await fetch(`${API_BASE}/halls/`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({
          name: newHall.name.trim(),
          slug: (newHall.slug || slugify(newHall.name)).trim(),
          embed_url: newHall.embed_url.trim(),
          is_live: Boolean(newHall.is_live),
          conference: conferenceId,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || data.error || JSON.stringify(data) || 'Create failed')
      }
      setNewHall(emptyDraft())
      showToast(`Created ${data.name}`)
      await loadData(token, conferenceId)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not create hall')
    } finally {
      setCreating(false)
    }
  }

  const selectedConference = conferences.find((c) => c.id === conferenceId)
  const liveCount = halls.filter((h) => h.is_live).length

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

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
        <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, padding: 40, width: 360, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, marginBottom: 6 }}>ADMIN ACCESS</div>
          <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 28 }}>Web3Lagos — Livestream Control</div>
          <div style={{ marginBottom: 14, textAlign: 'left' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Username</label>
            <input style={input} value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} placeholder="admin" autoComplete="username" />
          </div>
          <div style={{ marginBottom: 14, textAlign: 'left' }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" style={input} value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button onClick={login} disabled={loading} style={{ width: '100%', background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 8, border: 'none', marginTop: 6, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
          {loginErr && <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 10 }}>{loginErr}</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div style={{ height: 64, background: 'var(--black2)', borderBottom: '1px solid var(--border)', padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>W3LC Admin</span>
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link href="/admin" style={{ fontSize: 12, color: 'var(--mid)' }}>Applications</Link>
            <Link href="/admin/livestream" style={{ fontSize: 12, color: 'var(--blue-bright)', fontWeight: 700 }}>Livestream</Link>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--mid)' }}>{adminName}</span>
          <button onClick={logout} style={{ fontSize: 12, color: 'var(--mid)', background: 'none', border: '1px solid var(--border2)', padding: '6px 14px', borderRadius: 6 }}>Sign Out</button>
        </div>
      </div>

      <div style={{ padding: '40px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, letterSpacing: 1, marginBottom: 4 }}>Livestream Control</h1>
            <p style={{ fontSize: 13, color: 'var(--mid)' }}>
              Set YouTube embed URLs and go live per hall. Public pages show the stream only when a hall is marked live.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <select
              value={conferenceId ?? ''}
              onChange={(e) => {
                const id = Number(e.target.value)
                setConferenceId(id)
                if (token) loadData(token, id)
              }}
              style={{ ...input, width: 260 }}
            >
              {conferences.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.year})
                </option>
              ))}
            </select>
            <a
              href="/live"
              target="_blank"
              rel="noreferrer"
              style={{ padding: '11px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--black3)', border: '1px solid var(--border2)', color: '#fff', whiteSpace: 'nowrap' }}
            >
              Open /live ↗
            </a>
          </div>
        </div>

        {loadErr && (
          <div style={{ background: 'rgba(229,57,53,.1)', border: '1px solid rgba(229,57,53,.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#E53935' }}>
            {loadErr}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 36 }}>
          {[
            { label: 'Halls', val: halls.length, color: '#2979FF' },
            { label: 'Live now', val: liveCount, color: '#E53935' },
            { label: 'Conference', val: selectedConference?.year || '—', color: '#00D4B0' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 20px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, letterSpacing: 1, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {loading && !halls.length && (
            <div style={{ color: 'var(--mid)', fontSize: 14 }}>Loading halls...</div>
          )}
          {!loading && !halls.length && (
            <div style={{ color: 'var(--mid)', fontSize: 14 }}>No halls for this conference yet. Create one below.</div>
          )}
          {halls.map((hall) => {
            const draft = drafts[hall.id] || emptyDraft()
            const publicPath =
              hall.slug && (hall.slug.includes('main') || hall.name.toLowerCase().includes('main'))
                ? '/live'
                : hall.slug
                  ? `/live/${hall.slug}`
                  : '/live'
            return (
              <div key={hall.id} style={{ background: 'var(--black2)', border: `1px solid ${draft.is_live ? 'rgba(229,57,53,.45)' : 'var(--border)'}`, borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <h2 style={{ fontSize: 18, fontWeight: 700 }}>{hall.name}</h2>
                      {draft.is_live && (
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, background: 'rgba(229,57,53,.15)', color: '#E53935' }}>
                          ● Live
                        </span>
                      )}
                    </div>
                    <a href={publicPath} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--blue-bright)' }}>
                      {publicPath} ↗
                    </a>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => toggleLive(hall)}
                      disabled={savingId === hall.id}
                      style={{
                        padding: '9px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        border: 'none',
                        background: draft.is_live ? 'rgba(229,57,53,.15)' : 'rgba(0,194,160,.15)',
                        color: draft.is_live ? '#E53935' : '#00D4B0',
                        opacity: savingId === hall.id ? 0.6 : 1,
                      }}
                    >
                      {draft.is_live ? 'Stop stream' : 'Go live'}
                    </button>
                    <button
                      onClick={() => saveHall(hall)}
                      disabled={savingId === hall.id}
                      style={{ padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff', opacity: savingId === hall.id ? 0.6 : 1 }}
                    >
                      {savingId === hall.id ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Name</label>
                    <input style={input} value={draft.name} onChange={(e) => updateDraft(hall.id, { name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Slug</label>
                    <input style={input} value={draft.slug} onChange={(e) => updateDraft(hall.id, { slug: e.target.value })} placeholder="main-stage" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>YouTube embed / watch URL</label>
                    <input
                      style={input}
                      value={draft.embed_url}
                      onChange={(e) => updateDraft(hall.id, { embed_url: e.target.value })}
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 1, marginBottom: 16 }}>Add hall / stage</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr auto', gap: 12, alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Name</label>
              <input style={input} value={newHall.name} onChange={(e) => setNewHall((p) => ({ ...p, name: e.target.value, slug: p.slug || slugify(e.target.value) }))} placeholder="Emerald Hall" />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Slug</label>
              <input style={input} value={newHall.slug} onChange={(e) => setNewHall((p) => ({ ...p, slug: e.target.value }))} placeholder="emerald" />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Embed URL</label>
              <input style={input} value={newHall.embed_url} onChange={(e) => setNewHall((p) => ({ ...p, embed_url: e.target.value }))} placeholder="https://www.youtube.com/embed/..." />
            </div>
            <button
              onClick={createHall}
              disabled={creating || !conferenceId}
              style={{ padding: '12px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff', opacity: creating ? 0.6 : 1, whiteSpace: 'nowrap' }}
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, background: 'var(--black3)', border: '1px solid var(--border2)', borderRadius: 10, padding: '14px 20px', fontSize: 13, fontWeight: 500, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
