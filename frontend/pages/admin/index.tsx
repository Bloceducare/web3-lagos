'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import AdminShell from '../../components/admin/AdminShell'

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

const PAGE_SIZE = 20

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

type PaginatedResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Reg[]
}

type App = Omit<Reg, 'status'> & {
  status: 'pending' | 'approved' | 'rejected'
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
  const [signingIn, setSigningIn] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [allApps, setAllApps] = useState<App[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<App | null>(null)
  const [toast, setToast] = useState('')
  const [loadErr, setLoadErr] = useState('')
  const [page, setPage] = useState(1)
  const [serverTotal, setServerTotal] = useState<number | null>(null)
  const [pagesFetched, setPagesFetched] = useState(0)
  const loadGenRef = useRef(0)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const loadApps = useCallback(async (authToken: string) => {
    const gen = ++loadGenRef.current
    setLoadingMore(true)
    setLoadErr('')
    setAllApps([])
    setPage(1)
    setServerTotal(null)
    setPagesFetched(0)

    try {
      let nextUrl: string | null = `${API_BASE}/general-registrations/?page=1`
      let fetchedPages = 0

      while (nextUrl) {
        if (gen !== loadGenRef.current) return

        const res = await fetch(nextUrl, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        const data = await res.json()
        if (!res.ok) {
          const msg = res.status === 403
            ? 'Your account does not have admin access.'
            : (data.detail || data.error || 'Failed to load registrations')
          throw new Error(msg)
        }

        if (gen !== loadGenRef.current) return

        if (Array.isArray(data)) {
          const batch = data.map(toApp)
          setAllApps(batch)
          setServerTotal(batch.length)
          setPagesFetched(1)
          nextUrl = null
        } else {
          const paginated = data as PaginatedResponse
          const batch = (paginated.results || []).map(toApp)
          fetchedPages += 1
          setServerTotal(typeof paginated.count === 'number' ? paginated.count : null)
          setPagesFetched(fetchedPages)
          setAllApps((prev) => {
            const seen = new Set(prev.map((a) => a.id))
            const merged = [...prev]
            batch.forEach((item) => {
              if (!seen.has(item.id)) merged.push(item)
            })
            return merged
          })
          nextUrl = paginated.next
        }
      }
    } catch (err) {
      if (gen !== loadGenRef.current) return
      const msg = err instanceof Error ? err.message : 'Failed to load registrations'
      setLoadErr(msg)
      showToast(msg)
    } finally {
      if (gen === loadGenRef.current) setLoadingMore(false)
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
    setSigningIn(true)
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
      loadApps(data.token)
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setSigningIn(false)
    }
  }

  const logout = () => {
    loadGenRef.current += 1
    sessionStorage.removeItem('w3l_admin_token')
    sessionStorage.removeItem('w3l_admin_user')
    setLoggedIn(false)
    setToken('')
    setAllApps([])
    setApps([])
    setSelected(null)
    setAdminName('')
    setPage(1)
    setServerTotal(null)
    setPagesFetched(0)
    setLoadingMore(false)
  }

  const goToPage = (pageNum: number) => {
    if (pageNum < 1) return
    const totalPages = Math.max(1, Math.ceil(filteredApps.length / PAGE_SIZE))
    if (pageNum > totalPages) return
    setPage(pageNum)
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
      setAllApps(prev => prev.map(a => (a.id === app.id ? mapped : a)))
      if (selected?.id === app.id) setSelected(mapped)
      showToast(status === 'approved' ? '✓ Application approved' : '✗ Application rejected')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not update application')
    }
  }

  const exportCSV = () => {
    if (!allApps.length) {
      showToast('Nothing to export yet')
      return
    }
    const headers = ['Ref','First Name','Last Name','Email','Phone','Country','City','Org','Role','Twitter','Track','Attend','Visa','Status','Submitted']
    const rows = allApps.map(a => [a.ref,a.firstname,a.lastname,a.email,a.phone,a.country,a.city,a.org||'',a.role||'',a.twitter||'',TRACK_LABELS[a.track||'']||a.track||'',ATTEND_LABELS[a.attend]||a.attend||'',a.visa?'Yes':'No',a.status,a.submitted].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    Object.assign(document.createElement('a'), { href: url, download: 'w3lc-applications.csv' }).click()
    URL.revokeObjectURL(url)
    showToast(
      loadingMore
        ? `Exported ${allApps.length} loaded so far (still fetching more)`
        : `Exported ${allApps.length} applications`
    )
  }

  const filteredApps = allApps
    .filter(a => filter === 'all' || a.status === filter)
    .filter(a => !search || `${a.firstname} ${a.lastname} ${a.email}`.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const filtered = allApps
      .filter(a => filter === 'all' || a.status === filter)
      .filter(a => !search || `${a.firstname} ${a.lastname} ${a.email}`.toLowerCase().includes(search.toLowerCase()))
    const start = (page - 1) * PAGE_SIZE
    setApps(filtered.slice(start, start + PAGE_SIZE))
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE) || 1)
    if (page > totalPages) setPage(totalPages)
  }, [allApps, filter, search, page])

  const totalCount = filteredApps.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE) || 1)
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount)
  const hasPrev = page > 1
  const hasNext = page < totalPages

  const stats = {
    total: allApps.length,
    pending: allApps.filter(a=>a.status==='pending').length,
    approved: allApps.filter(a=>a.status==='approved').length,
    rejected: allApps.filter(a=>a.status==='rejected').length,
  }

  const loadProgressLabel = (() => {
    if (!loadingMore && !allApps.length) return ''
    if (loadingMore) {
      if (serverTotal != null) {
        return `Loading ${allApps.length} of ${serverTotal}… (page ${pagesFetched})`
      }
      return `Loading… ${allApps.length} loaded (page ${pagesFetched || 1})`
    }
    if (serverTotal != null && allApps.length < serverTotal) {
      return `Loaded ${allApps.length} of ${serverTotal}`
    }
    return `Loaded ${allApps.length}`
  })()

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
        <button onClick={login} disabled={signingIn} style={{ width: '100%', background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 8, border: 'none', marginTop: 6, opacity: signingIn ? 0.7 : 1 }}>
          {signingIn ? 'Signing in...' : 'Sign In →'}
        </button>
        {loginErr && <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 10 }}>{loginErr}</p>}
      </div>
    </div>
  )

  return (
    <AdminShell
      adminName={adminName}
      onLogout={logout}
      title="Applications Dashboard"
      subtitle={
        <>
          Review, approve or reject registrations for Web3Lagos Conference 5.0
          {loadProgressLabel ? ` — ${loadProgressLabel}` : ''}
        </>
      }
      actions={
        loadingMore ? (
          <span style={{ fontSize: 12, color: '#F5B642', fontWeight: 600 }}>
            Fetching pages…
          </span>
        ) : null
      }
    >
      {loadErr && (
        <div style={{ background: 'rgba(229,57,53,.1)', border: '1px solid rgba(229,57,53,.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#E53935' }}>
          {loadErr}
        </div>
      )}

      {loadingMore && serverTotal != null && serverTotal > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ height: 4, background: 'var(--black3)', borderRadius: 100, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, Math.round((allApps.length / serverTotal) * 100))}%`,
                background: 'linear-gradient(90deg,var(--blue),var(--teal))',
                transition: 'width 0.25s ease',
              }}
            />
          </div>
        </div>
      )}

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
          <button key={f} onClick={() => { setFilter(f); setPage(1) }} style={{
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
          value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
        />
        <button onClick={exportCSV} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--black3)', border: '1px solid var(--border2)', color: 'var(--mid)' }}>⬇ Export CSV</button>
      </div>

      <div style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1.2fr 1fr 1.2fr', padding: '12px 20px', background: 'var(--black3)', borderBottom: '1px solid var(--border)' }}>
          {['Name','Email','Location','Track','Status','Actions'].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mid)' }}>{h}</div>
          ))}
        </div>
        {!filteredApps.length && (
          <div style={{ textAlign: 'center', padding: '64px 20px', fontSize: 14, color: 'var(--mid)' }}>
            {loadingMore ? 'Loading first page…' : 'No applications found.'}
          </div>
        )}
        {apps.map(a => (
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
        {loadingMore && filteredApps.length > 0 && (
          <div style={{ padding: '12px 20px', fontSize: 12, color: 'var(--mid)', borderTop: '1px solid var(--border)' }}>
            Loading more pages in the background…
          </div>
        )}
      </div>

      {totalCount > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--mid)' }}>
            Showing {rangeStart}–{rangeEnd} of {totalCount} loaded
            {serverTotal != null && loadingMore ? ` (${serverTotal} total)` : ''}
            {filter !== 'all' || search ? ' matching current filters' : ''}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => goToPage(page - 1)}
              disabled={!hasPrev}
              style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--black3)', border: '1px solid var(--border2)', color: hasPrev ? '#fff' : 'var(--mid)', opacity: hasPrev ? 1 : 0.5 }}
            >
              ← Previous
            </button>
            <span style={{ fontSize: 13, color: 'var(--mid)', padding: '0 8px' }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={!hasNext}
              style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--black3)', border: '1px solid var(--border2)', color: hasNext ? '#fff' : 'var(--mid)', opacity: hasNext ? 1 : 0.5 }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

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
              ].map((row) => {
                const k = String(row[0])
                const v = row[1] as React.ReactNode
                return (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)', gap: 20 }}>
                  <div style={{ fontSize: 12, color: 'var(--mid)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', minWidth: 130 }}>{k}</div>
                  <div style={{ fontSize: 14, textAlign: 'right', flex: 1 }}>{v}</div>
                </div>
                )
              })}
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
    </AdminShell>
  )
}
