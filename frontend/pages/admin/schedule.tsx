'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AdminShell, { adminInputStyle } from '../../components/admin/AdminShell'
import AdminLoginForm from '../../components/admin/AdminLoginForm'
import { adminFetch, asList, useAdminAuth } from '../../lib/adminAuth'

type Conference = {
  id: number
  name: string
  year: number
}

type Hall = {
  id: number
  name: string
  slug: string | null
  conference: number
}

type Session = {
  id: number
  topic: string
  description: string
  type: string
  conference: number
  hall: number
  hall_name?: string
  start_datetime: string
  end_datetime: string
  speaker: string
  speaker_bio: string
  speaker_image: string
  youtube_id: string
  video_thumbnail: string
}

type SessionForm = {
  topic: string
  description: string
  type: string
  hall: string
  start_datetime: string
  end_datetime: string
  speaker: string
  speaker_bio: string
  speaker_image: string
  youtube_id: string
  video_thumbnail: string
}

const SESSION_TYPES = ['talk', 'workshop', 'panel', 'break', 'registration', 'networking']

const emptyForm = (hallId = ''): SessionForm => ({
  topic: '',
  description: '',
  type: 'talk',
  hall: hallId,
  start_datetime: '',
  end_datetime: '',
  speaker: '',
  speaker_bio: '',
  speaker_image: '',
  youtube_id: '',
  video_thumbnail: '',
})

function toLocalInput(value?: string) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function toIso(value: string) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? value : d.toISOString()
}

export default function ScheduleAdminPage() {
  const auth = useAdminAuth()
  const [conferences, setConferences] = useState<Conference[]>([])
  const [conferenceId, setConferenceId] = useState<number | null>(null)
  const [halls, setHalls] = useState<Hall[]>([])
  const [hallFilter, setHallFilter] = useState('all')
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)
  const [loadErr, setLoadErr] = useState('')
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Session | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<SessionForm>(emptyForm())
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

  const load = useCallback(async (token: string, preferredConferenceId?: number | null) => {
    setLoading(true)
    setLoadErr('')
    try {
      const confRes = await adminFetch('/conferences/', token)
      ensureAuth(confRes)
      const confData = await confRes.json()
      if (!confRes.ok) throw new Error(confData.detail || confData.error || 'Failed to load conferences')
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
        setSessions([])
        return
      }

      setConferenceId(selected.id)

      const [hallsRes, sessionsRes] = await Promise.all([
        adminFetch(`/halls/?conference=${selected.id}`, token),
        adminFetch(`/sessions/?conference=${selected.id}&all=true`, token),
      ])
      ensureAuth(hallsRes)
      ensureAuth(sessionsRes)
      const hallsData = await hallsRes.json()
      const sessionsData = await sessionsRes.json()
      if (!hallsRes.ok) throw new Error(hallsData.detail || 'Failed to load halls')
      if (!sessionsRes.ok) throw new Error(sessionsData.detail || 'Failed to load sessions')

      const hallList = asList<Hall>(hallsData)
      setHalls(hallList)
      setSessions(asList<Session>(sessionsData))
      setForm((prev) => ({ ...prev, hall: prev.hall || String(hallList[0]?.id || '') }))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load schedule'
      setLoadErr(msg)
      showToast(msg)
    } finally {
      setLoading(false)
    }
  }, [ensureAuth])

  useEffect(() => {
    if (auth.loggedIn && auth.token && auth.ready) {
      load(auth.token)
    }
  }, [auth.loggedIn, auth.token, auth.ready, load])

  const filtered = useMemo(() => {
    return sessions
      .filter((s) => hallFilter === 'all' || String(s.hall) === hallFilter)
      .filter((s) => {
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return `${s.topic} ${s.speaker} ${s.hall_name || ''}`.toLowerCase().includes(q)
      })
      .sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())
  }, [sessions, hallFilter, search])

  const openCreate = () => {
    setEditing(null)
    setCreating(true)
    setForm(emptyForm(String(halls[0]?.id || '')))
  }

  const openEdit = (session: Session) => {
    setCreating(false)
    setEditing(session)
    setForm({
      topic: session.topic || '',
      description: session.description || '',
      type: session.type || 'talk',
      hall: String(session.hall),
      start_datetime: toLocalInput(session.start_datetime),
      end_datetime: toLocalInput(session.end_datetime),
      speaker: session.speaker || '',
      speaker_bio: session.speaker_bio || '',
      speaker_image: session.speaker_image || '',
      youtube_id: session.youtube_id || '',
      video_thumbnail: session.video_thumbnail || '',
    })
  }

  const closeModal = () => {
    setCreating(false)
    setEditing(null)
  }

  const saveSession = async () => {
    if (!auth.token || !conferenceId) return
    if (!form.topic.trim() || !form.hall || !form.start_datetime || !form.end_datetime) {
      showToast('Topic, hall, start and end time are required')
      return
    }
    setSaving(true)
    try {
      const payload = {
        topic: form.topic.trim(),
        description: form.description.trim(),
        type: form.type,
        conference: conferenceId,
        hall: Number(form.hall),
        start_datetime: toIso(form.start_datetime),
        end_datetime: toIso(form.end_datetime),
        speaker: form.speaker.trim(),
        speaker_bio: form.speaker_bio.trim(),
        speaker_image: form.speaker_image.trim(),
        youtube_id: form.youtube_id.trim(),
        video_thumbnail: form.video_thumbnail.trim(),
      }
      const res = editing
        ? await adminFetch(`/sessions/${editing.id}/`, auth.token, {
            method: 'PATCH',
            body: JSON.stringify(payload),
          })
        : await adminFetch('/sessions/', auth.token, {
            method: 'POST',
            body: JSON.stringify(payload),
          })
      ensureAuth(res)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || JSON.stringify(data) || 'Save failed')
      showToast(editing ? 'Session updated' : 'Session created')
      closeModal()
      await load(auth.token, conferenceId)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not save session')
    } finally {
      setSaving(false)
    }
  }

  const deleteSession = async (session: Session) => {
    if (!auth.token) return
    if (!window.confirm(`Delete “${session.topic}”?`)) return
    try {
      const res = await adminFetch(`/sessions/${session.id}/`, auth.token, { method: 'DELETE' })
      ensureAuth(res)
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Delete failed')
      }
      setSessions((prev) => prev.filter((s) => s.id !== session.id))
      showToast('Session deleted')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not delete session')
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
    return (
      <AdminLoginForm
        subtitle="Web3Lagos — Schedule Admin"
        onLogin={async (username, password) => {
          await auth.login(username, password)
        }}
      />
    )
  }

  return (
    <AdminShell
      adminName={auth.adminName}
      onLogout={auth.logout}
      title="Schedule"
      subtitle="Create and edit sessions for each hall. Changes appear on the public live schedule."
      actions={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={conferenceId ?? ''}
            onChange={(e) => {
              const id = Number(e.target.value)
              setConferenceId(id)
              if (auth.token) load(auth.token, id)
            }}
            style={{ ...adminInputStyle, width: 220 }}
          >
            {conferences.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.year})</option>
            ))}
          </select>
          <button onClick={openCreate} style={{ padding: '11px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff' }}>
            + New session
          </button>
        </div>
      }
    >
      {loadErr && (
        <div style={{ background: 'rgba(229,57,53,.1)', border: '1px solid rgba(229,57,53,.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#E53935' }}>
          {loadErr}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Sessions', val: sessions.length, color: '#2979FF' },
          { label: 'Halls', val: halls.length, color: '#00D4B0' },
          { label: 'Showing', val: filtered.length, color: '#F5B642' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: s.color, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <select value={hallFilter} onChange={(e) => setHallFilter(e.target.value)} style={{ ...adminInputStyle, width: 200 }}>
          <option value="all">All halls</option>
          {halls.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
        <input
          style={{ ...adminInputStyle, width: 280 }}
          placeholder="Search topic or speaker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 1fr 1fr 0.8fr 1fr', padding: '12px 16px', background: 'var(--black3)', borderBottom: '1px solid var(--border)' }}>
          {['When', 'Topic', 'Speaker', 'Hall', 'Type', 'Actions'].map((h) => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mid)' }}>{h}</div>
          ))}
        </div>
        {loading && !sessions.length && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--mid)' }}>Loading sessions…</div>
        )}
        {!loading && !filtered.length && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--mid)' }}>No sessions yet.</div>
        )}
        {filtered.map((s) => (
          <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 1fr 1fr 0.8fr 1fr', padding: '14px 16px', borderBottom: '1px solid var(--border)', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--mid)' }}>
              {new Date(s.start_datetime).toLocaleString()}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.topic}</div>
              {s.youtube_id && <div style={{ fontSize: 11, color: 'var(--blue-bright)', marginTop: 2 }}>Replay: {s.youtube_id}</div>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--mid)' }}>{s.speaker || '—'}</div>
            <div style={{ fontSize: 13, color: 'var(--mid)' }}>{s.hall_name || halls.find((h) => h.id === s.hall)?.name || s.hall}</div>
            <div style={{ fontSize: 12, color: 'var(--mid)', textTransform: 'capitalize' }}>{s.type}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(s)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(41,121,255,.15)', color: '#2979FF' }}>Edit</button>
              <button onClick={() => deleteSession(s)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(229,57,53,.12)', color: '#E53935' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <div onClick={(e) => e.target === e.currentTarget && closeModal()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24 }}>{editing ? 'Edit session' : 'New session'}</div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--mid)', fontSize: 22 }}>×</button>
            </div>
            <div style={{ padding: 24, display: 'grid', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Topic *</label>
                <input style={adminInputStyle} value={form.topic} onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Hall *</label>
                  <select style={adminInputStyle} value={form.hall} onChange={(e) => setForm((p) => ({ ...p, hall: e.target.value }))}>
                    {halls.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Type</label>
                  <select style={adminInputStyle} value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
                    {SESSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Speaker</label>
                  <input style={adminInputStyle} value={form.speaker} onChange={(e) => setForm((p) => ({ ...p, speaker: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Start *</label>
                  <input type="datetime-local" style={adminInputStyle} value={form.start_datetime} onChange={(e) => setForm((p) => ({ ...p, start_datetime: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>End *</label>
                  <input type="datetime-local" style={adminInputStyle} value={form.end_datetime} onChange={(e) => setForm((p) => ({ ...p, end_datetime: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea style={{ ...adminInputStyle, minHeight: 90, resize: 'vertical' }} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Speaker bio</label>
                <textarea style={{ ...adminInputStyle, minHeight: 70, resize: 'vertical' }} value={form.speaker_bio} onChange={(e) => setForm((p) => ({ ...p, speaker_bio: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>YouTube ID (archive)</label>
                  <input style={adminInputStyle} value={form.youtube_id} onChange={(e) => setForm((p) => ({ ...p, youtube_id: e.target.value }))} placeholder="dQw4w9WgXcQ" />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Speaker image URL</label>
                  <input style={adminInputStyle} value={form.speaker_image} onChange={(e) => setForm((p) => ({ ...p, speaker_image: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Thumbnail URL</label>
                  <input style={adminInputStyle} value={form.video_thumbnail} onChange={(e) => setForm((p) => ({ ...p, video_thumbnail: e.target.value }))} />
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              <button onClick={saveSession} disabled={saving} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving…' : 'Save session'}
              </button>
              <button onClick={closeModal} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: '1px solid var(--border2)', background: 'var(--black3)', color: 'var(--mid)' }}>
                Cancel
              </button>
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
