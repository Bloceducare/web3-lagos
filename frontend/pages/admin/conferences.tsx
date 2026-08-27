'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminShell, { adminInputStyle } from '../../components/admin/AdminShell'
import AdminLoginForm from '../../components/admin/AdminLoginForm'
import { adminFetch, asList, useAdminAuth } from '../../lib/adminAuth'

type Conference = {
  id: number
  name: string
  year: number
  start_date: string
  end_date: string
  venue: string
  description: string
}

type Form = {
  name: string
  year: string
  start_date: string
  end_date: string
  venue: string
  description: string
}

const emptyForm = (): Form => ({
  name: 'Web3 Lagos Conference',
  year: String(new Date().getFullYear()),
  start_date: '',
  end_date: '',
  venue: '',
  description: '',
})

export default function ConferencesAdminPage() {
  const auth = useAdminAuth()
  const loadedTokenRef = useRef<string | null>(null)
  const [items, setItems] = useState<Conference[]>([])
  const [loading, setLoading] = useState(false)
  const [loadErr, setLoadErr] = useState('')
  const [toast, setToast] = useState('')
  const [editing, setEditing] = useState<Conference | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<Form>(emptyForm())
  const [saving, setSaving] = useState(false)

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
      const res = await adminFetch('/conferences/', token)
      ensureAuth(res)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || 'Failed to load conferences')
      setItems(asList<Conference>(data))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load conferences'
      setLoadErr(msg)
      showToast(msg)
    } finally {
      setLoading(false)
    }
  }, [ensureAuth])

  useEffect(() => {
    if (!auth.ready || !auth.loggedIn || !auth.token) return
    if (loadedTokenRef.current === auth.token) return
    loadedTokenRef.current = auth.token
    load(auth.token)
  }, [auth.ready, auth.loggedIn, auth.token, load])

  const openCreate = () => {
    setEditing(null)
    setCreating(true)
    setForm(emptyForm())
  }

  const openEdit = (c: Conference) => {
    setCreating(false)
    setEditing(c)
    setForm({
      name: c.name,
      year: String(c.year),
      start_date: c.start_date,
      end_date: c.end_date,
      venue: c.venue || '',
      description: c.description || '',
    })
  }

  const closeModal = () => {
    setCreating(false)
    setEditing(null)
  }

  const save = async () => {
    if (!auth.token) return
    if (!form.name.trim() || !form.year || !form.start_date || !form.end_date || !form.venue.trim()) {
      showToast('Name, year, dates and venue are required')
      return
    }
    setSaving(true)
    try {
      const payload = {
        name: form.name.trim(),
        year: Number(form.year),
        start_date: form.start_date,
        end_date: form.end_date,
        venue: form.venue.trim(),
        description: form.description.trim(),
      }
      const res = editing
        ? await adminFetch(`/conferences/${editing.id}/`, auth.token, { method: 'PATCH', body: JSON.stringify(payload) })
        : await adminFetch('/conferences/', auth.token, { method: 'POST', body: JSON.stringify(payload) })
      ensureAuth(res)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || JSON.stringify(data) || 'Save failed')
      showToast(editing ? 'Conference updated' : 'Conference created')
      closeModal()
      await load(auth.token)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not save conference')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (c: Conference) => {
    if (!auth.token) return
    if (!window.confirm(`Delete “${c.name} ${c.year}”? This can remove related halls/sessions.`)) return
    try {
      const res = await adminFetch(`/conferences/${c.id}/`, auth.token, { method: 'DELETE' })
      ensureAuth(res)
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Delete failed')
      }
      setItems((prev) => prev.filter((x) => x.id !== c.id))
      showToast('Conference deleted')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not delete conference')
    }
  }

  if (!auth.ready || auth.verifying) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)', color: 'var(--mid)' }}>
        Checking admin session…
      </div>
    )
  }

  if (!auth.loggedIn) {
    return <AdminLoginForm subtitle="Web3Lagos — Conferences Admin" onLogin={async (u, p) => { await auth.login(u, p) }} />
  }

  return (
    <AdminShell
      adminName={auth.adminName}
      onLogout={() => { loadedTokenRef.current = null; auth.logout() }}
      title="Conferences"
      subtitle="Manage conference years, dates and venues used by schedule and livestream pages."
      actions={
        <button onClick={openCreate} style={{ padding: '11px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff' }}>
          + New conference
        </button>
      }
    >
      {loadErr && (
        <div style={{ background: 'rgba(229,57,53,.1)', border: '1px solid rgba(229,57,53,.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#E53935' }}>
          {loadErr}
        </div>
      )}

      <div style={{ display: 'grid', gap: 14 }}>
        {loading && !items.length && <div style={{ color: 'var(--mid)' }}>Loading…</div>}
        {!loading && !items.length && <div style={{ color: 'var(--mid)' }}>No conferences yet.</div>}
        {items.map((c) => (
          <div key={c.id} style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{c.name} · {c.year}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 6 }}>{c.start_date} → {c.end_date}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 4 }}>{c.venue}</div>
              {c.description && <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 8, maxWidth: 640 }}>{c.description}</div>}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <button onClick={() => openEdit(c)} style={{ padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', background: 'rgba(41,121,255,.15)', color: '#2979FF' }}>Edit</button>
              <button onClick={() => remove(c)} style={{ padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', background: 'rgba(229,57,53,.12)', color: '#E53935' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <div onClick={(e) => e.target === e.currentTarget && closeModal()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, width: '100%', maxWidth: 560 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24 }}>{editing ? 'Edit conference' : 'New conference'}</div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--mid)', fontSize: 22 }}>×</button>
            </div>
            <div style={{ padding: 24, display: 'grid', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Name *</label>
                <input style={adminInputStyle} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Year *</label>
                  <input style={adminInputStyle} value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Start *</label>
                  <input type="date" style={adminInputStyle} value={form.start_date} onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>End *</label>
                  <input type="date" style={adminInputStyle} value={form.end_date} onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Venue *</label>
                <input style={adminInputStyle} value={form.venue} onChange={(e) => setForm((p) => ({ ...p, venue: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea style={{ ...adminInputStyle, minHeight: 90, resize: 'vertical' }} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              <button onClick={save} disabled={saving} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff' }}>{saving ? 'Saving…' : 'Save'}</button>
              <button onClick={closeModal} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: '1px solid var(--border2)', background: 'var(--black3)', color: 'var(--mid)' }}>Cancel</button>
            </div>
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
