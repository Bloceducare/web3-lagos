'use client'
import React, { useState, useEffect, useCallback } from 'react'

const API_HOST = (
  process.env.API_URL?.replace(/\/api\/?$/i, '') ||
  'https://giant-dorice-web3bridge-89722e9a.koyeb.app'
).replace(/\/$/, '')
const API_BASE = `${API_HOST}/api`

const TRACK_LABELS: Record<string, string> = {
  defi: 'DeFi & Protocols', dev: 'Developer Tools', nft: 'NFTs & RWAs',
  edu: 'Web3 Education', vc: 'Funding & VCs', community: 'Community',
}

const ATTEND_LABELS: Record<string, string> = {
  physical: 'In-Person', virtual: 'Virtual', undecided: 'Not Sure',
}

type Reg = {
  id: number
  name: string
  email: string
  phone: string
  country: string
  location?: string | null
  role?: string | null
  organisation?: string | null
  xhandle?: string | null
  track?: string | null
  attend_type?: string | null
  visa_needed?: boolean
  notes?: string | null
  status?: 'pending' | 'approved' | 'rejected'
  reviewed_at?: string | null
  reviewed_by?: string | null
  submitted_at?: string | null
}

type App = Reg & {
  ref: string
  firstname: string
  lastname: string
  city: string
  org: string
  twitter: string
  attend: string
  visa: boolean
  submitted: string
}

const statusColor = {
  pending:  { bg: 'rgba(245,166,35,.15)',  color: '#F5B642' },
  approved: { bg: 'rgba(0,194,160,.15)',   color: '#00D4B0' },
  rejected: { bg: 'rgba(229,57,53,.12)',   color: '#E53935' },
}

function toApp(reg: Reg): App {
  const [firstname, ...rest] = reg.name.trim().split(/\s+/)
  return {
    ...reg,
    status: reg.status || 'pending',
    ref: `W3L-${String(reg.id).padStart(6, '0')}`,
    firstname: firstname || '',
    lastname: rest.join(' '),
    city: reg.location || '',
    org: reg.organisation || '',
    twitter: reg.xhandle || '',
    attend: reg.attend_type || '',
    visa: Boolean(reg.visa_needed),
    submitted: reg.submitted_at || '',
  }
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [adminName, setAdminName] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [apps, setApps] = useState<App[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<App | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const loadApps = useCallback(async (authToken: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/general-registrations/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const data = await res.json()
      if (!res.ok) {
        const msg = res.status === 403
          ? 'Your account does not have admin access.'
          : (data.detail || data.error || 'Failed to load registrations')
        throw new Error(msg)
      }
      const list = Array.isArray(data) ? data : data.results || []
      setApps(list.map(toApp))
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to load registrations')
      sessionStorage.removeItem('w3l_admin_token')
      sessionStorage.removeItem('w3l_admin_user')
      setLoggedIn(false)
      setToken('')
      setAdminName('')
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
      loadApps(saved)
    }
  }, [loadApps])

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
      await loadApps(data.token)
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
    setApps([])
    setSelected(null)
    setAdminName('')
  }

  const changeStatus = async (app: App, status: 'approved' | 'rejected') => {
    if (!token) { logout(); return }
    try {
      const res = await fetch(`${API_BASE}/general-registrations/${app.id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || 'Update failed')
      const mapped = toApp(data)
      setApps(prev => prev.map(a => (a.id === app.id ? mapped : a)))
      if (selected?.id === app.id) setSelected(mapped)
      showToast(status === 'approved' ? '✓ Application approved' : '✗ Application rejected')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not update application')
    }
  }

  const exportCSV = () => {
    const headers = ['Ref','First Name','Last Name','Email','Phone','Country','City','Org','Role','Twitter','Track','Attend','Visa','Status','Submitted']
    const rows = apps.map(a => [a.ref,a.firstname,a.lastname,a.email,a.phone,a.country,a.city,a.org||'',a.role||'',a.twitter||'',TRACK_LABELS[a.track||'']||a.track||'',ATTEND_LABELS[a.attend]||a.attend||'',a.visa?'Yes':'No',a.status,a.submitted].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    Object.assign(document.createElement('a'), { href: url, download: 'w3lc-applications.csv' }).click()
    URL.revokeObjectURL(url)
  }

  const filtered = apps
    .filter(a => filter === 'all' || a.status === filter)
    .filter(a => !search || `${a.firstname} ${a.lastname} ${a.email}`.toLowerCase().includes(search.toLowerCase()))

  const stats = { total: apps.length, pending: apps.filter(a=>a.status==='pending').length, approved: apps.filter(a=>a.status==='approved').length, rejected: apps.filter(a=>a.status==='rejected').length }

  const input: React.CSSProperties = { width: '100%', background: 'var(--black3)', border: '1px solid var(--border2)', borderRadius: 8, padding: '11px 14px', fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: '#fff', outline: 'none' }

  if (!loggedIn) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
      <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, padding: 40, width: 360, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, marginBottom: 6 }}>ADMIN ACCESS</div>
        <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 28 }}>Web3Lagos 5.0 — Application Dashboard</div>
        <div style={{ marginBottom: 14, textAlign: 'left' }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Username</label>
          <input style={input} value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="admin" autoComplete="username" />
        </div>
        <div style={{ marginBottom: 14, textAlign: 'left' }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mid)', display: 'block', marginBottom: 6 }}>Password</label>
          <input type="password" style={input} value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="••••••••" autoComplete="current-password" />
        </div>
        <button onClick={login} disabled={loading} style={{ width: '100%', background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 8, border: 'none', marginTop: 6, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
        {loginErr && <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 10 }}>{loginErr}</p>}
      </div>
    </div>
  )

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div style={{ height: 64, background: 'var(--black2)', borderBottom: '1px solid var(--border)', padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>W3LC Admin</span>
          <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--blue)', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>5.0</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--mid)' }}>{adminName}</span>
          <button onClick={logout} style={{ fontSize: 12, color: 'var(--mid)', background: 'none', border: '1px solid var(--border2)', padding: '6px 14px', borderRadius: 6 }}>Sign Out</button>
        </div>
      </div>

      <div style={{ padding: '40px 5%' }}>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, letterSpacing: 1, marginBottom: 4 }}>Applications Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          Review, approve or reject registrations for Web3Lagos Conference 5.0
          {loading ? ' — loading...' : ''}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 36 }}>
          {[
            { label: 'Total', val: stats.total, color: '#2979FF' },
            { label: 'Pending', val: stats.pending, color: '#F5B642' },
            { label: 'Approved', val: stats.approved, color: '#00D4B0' },
            { label: 'Rejected', val: stats.rejected, color: '#E53935' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 20px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, letterSpacing: 1, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4 }}>{s.label} Applications</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {['all','pending','approved','rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 18px', borderRadius: 100, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.5px', textTransform: 'uppercase',
              background: filter === f ? 'var(--blue)' : 'transparent',
              border: `1px solid ${filter === f ? 'var(--blue)' : 'var(--border2)'}`,
              color: filter === f ? '#fff' : 'var(--mid)',
            }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <input
            style={{ marginLeft: 'auto', background: 'var(--black3)', border: '1px solid var(--border2)', borderRadius: 8, padding: '9px 14px 9px 36px', fontSize: 13, color: '#fff', outline: 'none', width: 240 }}
            placeholder="🔍 Search name or email..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
          <button onClick={exportCSV} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--black3)', border: '1px solid var(--border2)', color: 'var(--mid)' }}>⬇ Export CSV</button>
        </div>

        <div style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1.2fr 1fr 1.2fr', padding: '12px 20px', background: 'var(--black3)', borderBottom: '1px solid var(--border)' }}>
            {['Name','Email','Location','Track','Status','Actions'].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mid)' }}>{h}</div>
            ))}
          </div>
          {!filtered.length && (
            <div style={{ textAlign: 'center', padding: '64px 20px', fontSize: 14, color: 'var(--mid)' }}>
              {loading ? 'Loading applications...' : 'No applications found.'}
            </div>
          )}
          {filtered.map(a => (
            <div key={a.id} onClick={() => setSelected(a)} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1.2fr 1fr 1.2fr', padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.firstname} {a.lastname}</div>
                <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 2 }}>{a.ref}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{a.email}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{a.city ? `${a.city}, ` : ''}{a.country}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{TRACK_LABELS[a.track || ''] || a.track || '—'}</div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, background: statusColor[a.status].bg, color: statusColor[a.status].color }}>
                  {a.status}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
                {a.status !== 'approved' && <button onClick={() => changeStatus(a, 'approved')} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(0,194,160,.15)', color: '#00D4B0' }}>✓</button>}
                {a.status !== 'rejected' && <button onClick={() => changeStatus(a, 'rejected')} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(229,57,53,.1)', color: '#E53935' }}>✗</button>}
                <button onClick={() => setSelected(a)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(255,255,255,.06)', color: 'var(--mid)' }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div onClick={e => e.target === e.currentTarget && setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 1 }}>{selected.firstname} {selected.lastname}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--mid)', fontSize: 22, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              {[
                ['Ref', <span key="ref-value" style={{ color: 'var(--blue-bright)', fontFamily: 'monospace' }}>{selected.ref}</span>],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Location', `${selected.city ? `${selected.city}, ` : ''}${selected.country}`],
                ['Organisation', selected.org || '—'],
                ['Role', selected.role || '—'],
                ['Twitter', selected.twitter || '—'],
                ['Track', TRACK_LABELS[selected.track || ''] || selected.track || '—'],
                ['Attendance', ATTEND_LABELS[selected.attend] || selected.attend || '—'],
                ['Visa Needed', selected.visa ? 'Yes' : 'No'],
                ...(selected.notes ? [['Notes', selected.notes]] : []),
                ['Status', <span key="status-value" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, background: statusColor[selected.status].bg, color: statusColor[selected.status].color }}>{selected.status}</span>],
                ['Submitted', selected.submitted ? new Date(selected.submitted).toLocaleString() : '—'],
                ...(selected.reviewed_at ? [['Reviewed', `${new Date(selected.reviewed_at).toLocaleString()} by ${selected.reviewed_by || 'Admin'}`]] : []),
              ].map(([k, v]: [string, React.ReactNode]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)', gap: 20 }}>
                  <div style={{ fontSize: 12, color: 'var(--mid)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', minWidth: 130 }}>{k}</div>
                  <div style={{ fontSize: 14, textAlign: 'right', flex: 1 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              {selected.status !== 'approved' && <button onClick={() => changeStatus(selected, 'approved')} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'rgba(0,194,160,.2)', color: '#00D4B0' }}>✓ Approve</button>}
              {selected.status !== 'rejected' && <button onClick={() => changeStatus(selected, 'rejected')} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'rgba(229,57,53,.15)', color: '#E53935' }}>✗ Reject</button>}
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: '1px solid var(--border2)', background: 'var(--black3)', color: 'var(--mid)' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, background: 'var(--black3)', border: '1px solid var(--border2)', borderRadius: 10, padding: '14px 20px', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
