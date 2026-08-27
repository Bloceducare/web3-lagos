'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

const CSV_HEADERS = [
  'topic',
  'description',
  'type',
  'hall',
  'start_datetime',
  'end_datetime',
  'speaker',
  'speaker_bio',
  'speaker_image',
  'youtube_id',
  'video_thumbnail',
] as const

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

/** Accept a raw 11-char id or any common YouTube URL and return the video id. */
function extractYoutubeId(value: string): string {
  const raw = (value || '').trim()
  if (!raw) return ''
  if (/^[\w-]{11}$/.test(raw)) return raw

  try {
    const url = new URL(raw.startsWith('http') ? raw : `https://${raw}`)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean)[0]?.split('?')[0] || ''
    }
    const v = url.searchParams.get('v')
    if (v) return v
    const parts = url.pathname.split('/').filter(Boolean)
    const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'live' || p === 'shorts')
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1]
  } catch {
    // fall through
  }

  const m =
    raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|live\/|shorts\/|watch\?.*?v=))([\w-]{11})/) ||
    raw.match(/([\w-]{11})/)
  return m?.[1] || raw
}

function youtubeEmbedUrl(idOrUrl: string): string | null {
  const id = extractYoutubeId(idOrUrl)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}`
}

function escapeCsv(value: string | number | null | undefined): string {
  const s = value == null ? '' : String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function downloadTextFile(filename: string, content: string, mime = 'text/csv;charset=utf-8') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/** Minimal CSV parser: handles commas, newlines, and double-quoted fields. */
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  const pushCell = () => {
    row.push(cell)
    cell = ''
  }
  const pushRow = () => {
    if (row.length === 1 && row[0] === '' && rows.length === 0) {
      row = []
      return
    }
    rows.push(row)
    row = []
  }

  const src = text.replace(/^\uFEFF/, '')
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    const next = src[i + 1]
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      pushCell()
    } else if (ch === '\n') {
      pushCell()
      pushRow()
    } else if (ch === '\r') {
      // ignore; handle \r\n via \n
    } else {
      cell += ch
    }
  }
  pushCell()
  if (row.length > 1 || (row.length === 1 && row[0] !== '')) pushRow()

  if (!rows.length) return []
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
  return rows.slice(1).filter((r) => r.some((c) => c.trim())).map((r) => {
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = (r[idx] ?? '').trim()
    })
    return obj
  })
}

function resolveHallId(halls: Hall[], value: string): number | null {
  const v = value.trim()
  if (!v) return null
  if (/^\d+$/.test(v)) {
    const id = Number(v)
    return halls.some((h) => h.id === id) ? id : null
  }
  const lower = v.toLowerCase()
  const byName = halls.find((h) => h.name.toLowerCase() === lower)
  if (byName) return byName.id
  const bySlug = halls.find((h) => (h.slug || '').toLowerCase() === lower)
  return bySlug?.id ?? null
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--mid)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 6,
}

const ghostBtn: React.CSSProperties = {
  padding: '11px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 700,
  border: '1px solid var(--border2)',
  background: 'var(--black3)',
  color: 'var(--white)',
  cursor: 'pointer',
}

export default function ScheduleAdminPage() {
  const auth = useAdminAuth()
  const loadedTokenRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
  const [preview, setPreview] = useState<Session | null>(null)
  const [form, setForm] = useState<SessionForm>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importReport, setImportReport] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
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
    if (!auth.ready || !auth.loggedIn || !auth.token) return
    if (loadedTokenRef.current === auth.token) return
    loadedTokenRef.current = auth.token
    load(auth.token)
  }, [auth.ready, auth.loggedIn, auth.token, load])

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
    setPreview(null)
    setEditing(null)
    setCreating(true)
    setForm(emptyForm(String(halls[0]?.id || '')))
  }

  const openEdit = (session: Session) => {
    setPreview(null)
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

  const openPreview = (session: Session) => {
    setCreating(false)
    setEditing(null)
    setPreview(session)
  }

  const closeModal = () => {
    setCreating(false)
    setEditing(null)
    setPreview(null)
  }

  const saveSession = async () => {
    if (!auth.token || !conferenceId) return
    if (!form.topic.trim() || !form.hall || !form.start_datetime || !form.end_datetime) {
      showToast('Topic, hall, start and end time are required')
      return
    }
    setSaving(true)
    try {
      const yt = extractYoutubeId(form.youtube_id)
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
        youtube_id: yt,
        video_thumbnail: form.video_thumbnail.trim() || (yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : ''),
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
      if (preview?.id === session.id) setPreview(null)
      showToast('Session deleted')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not delete session')
    }
  }

  const exportCsv = () => {
    const conf = conferences.find((c) => c.id === conferenceId)
    const lines = [
      CSV_HEADERS.join(','),
      ...filtered.map((s) => {
        const hallLabel = s.hall_name || halls.find((h) => h.id === s.hall)?.name || String(s.hall)
        return [
          escapeCsv(s.topic),
          escapeCsv(s.description),
          escapeCsv(s.type),
          escapeCsv(hallLabel),
          escapeCsv(s.start_datetime),
          escapeCsv(s.end_datetime),
          escapeCsv(s.speaker),
          escapeCsv(s.speaker_bio),
          escapeCsv(s.speaker_image),
          escapeCsv(s.youtube_id),
          escapeCsv(s.video_thumbnail),
        ].join(',')
      }),
    ]
    const stamp = new Date().toISOString().slice(0, 10)
    const name = conf ? `schedule-${conf.year}-${stamp}.csv` : `schedule-${stamp}.csv`
    downloadTextFile(name, lines.join('\n'))
    showToast(`Exported ${filtered.length} session${filtered.length === 1 ? '' : 's'}`)
  }

  const downloadTemplate = () => {
    const sampleHall = halls[0]?.name || 'Main Stage'
    const sample = [
      CSV_HEADERS.join(','),
      [
        escapeCsv('Opening Keynote'),
        escapeCsv('Welcome to Web3 Lagos'),
        'talk',
        escapeCsv(sampleHall),
        '2026-09-04T09:00:00',
        '2026-09-04T09:45:00',
        escapeCsv('Jane Doe'),
        escapeCsv('Founder bio here'),
        '',
        'dQw4w9WgXcQ',
        '',
      ].join(','),
    ].join('\n')
    downloadTextFile('schedule-template.csv', sample)
    showToast('Template downloaded — hall column accepts name, slug, or id')
  }

  const importCsvFile = async (file: File) => {
    if (!auth.token || !conferenceId) {
      showToast('Select a conference first')
      return
    }
    if (!halls.length) {
      showToast('Create halls for this conference before importing')
      return
    }

    setImporting(true)
    setImportReport(null)
    try {
      const text = await file.text()
      const rows = parseCsv(text)
      if (!rows.length) {
        showToast('CSV has no data rows')
        return
      }

      let ok = 0
      const errors: string[] = []

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const line = i + 2
        const topic = (row.topic || '').trim()
        const hallRaw = (row.hall || row.hall_name || row.hall_slug || '').trim()
        const start = (row.start_datetime || row.start || '').trim()
        const end = (row.end_datetime || row.end || '').trim()

        if (!topic || !hallRaw || !start || !end) {
          errors.push(`Row ${line}: topic, hall, start_datetime, end_datetime are required`)
          continue
        }

        const hallId = resolveHallId(halls, hallRaw)
        if (!hallId) {
          errors.push(`Row ${line}: unknown hall “${hallRaw}”`)
          continue
        }

        const type = (row.type || 'talk').trim().toLowerCase()
        if (!SESSION_TYPES.includes(type)) {
          errors.push(`Row ${line}: invalid type “${type}”`)
          continue
        }

        const yt = extractYoutubeId(row.youtube_id || row.youtube || '')
        const payload = {
          topic,
          description: (row.description || '').trim(),
          type,
          conference: conferenceId,
          hall: hallId,
          start_datetime: toIso(start),
          end_datetime: toIso(end),
          speaker: (row.speaker || '').trim(),
          speaker_bio: (row.speaker_bio || '').trim(),
          speaker_image: (row.speaker_image || '').trim(),
          youtube_id: yt,
          video_thumbnail:
            (row.video_thumbnail || '').trim() ||
            (yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : ''),
        }

        try {
          const res = await adminFetch('/sessions/', auth.token, {
            method: 'POST',
            body: JSON.stringify(payload),
          })
          ensureAuth(res)
          if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            errors.push(`Row ${line}: ${data.detail || data.error || JSON.stringify(data) || 'failed'}`)
            continue
          }
          ok += 1
        } catch (err) {
          errors.push(`Row ${line}: ${err instanceof Error ? err.message : 'failed'}`)
        }
      }

      await load(auth.token, conferenceId)
      const summary = `Imported ${ok}/${rows.length} sessions${errors.length ? ` · ${errors.length} error(s)` : ''}`
      setImportReport(
        errors.length
          ? `${summary}\n\n${errors.slice(0, 20).join('\n')}${errors.length > 20 ? `\n…and ${errors.length - 20} more` : ''}`
          : summary
      )
      showToast(summary)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'CSV import failed')
    } finally {
      setImporting(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
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

  const previewEmbed = preview ? youtubeEmbedUrl(preview.youtube_id) : null
  const formYtPreview = youtubeEmbedUrl(form.youtube_id)

  return (
    <AdminShell
      adminName={auth.adminName}
      onLogout={() => { loadedTokenRef.current = null; auth.logout() }}
      title="Schedule"
      subtitle="Create and edit sessions for each hall. Click a row to preview the archive video. Changes appear on the public live schedule."
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
          <button type="button" onClick={exportCsv} style={ghostBtn} disabled={!filtered.length}>
            Export CSV
          </button>
          <button type="button" onClick={downloadTemplate} style={ghostBtn}>
            CSV template
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={ghostBtn}
            disabled={importing || !conferenceId}
          >
            {importing ? 'Importing…' : 'Import CSV'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void importCsvFile(file)
            }}
          />
          <button onClick={openCreate} style={{ padding: '11px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff', cursor: 'pointer' }}>
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

      {importReport && (
        <div style={{ background: 'var(--black2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, whiteSpace: 'pre-wrap', color: 'var(--white)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
            <strong>Import result</strong>
            <button type="button" onClick={() => setImportReport(null)} style={{ background: 'none', border: 'none', color: 'var(--mid)', cursor: 'pointer' }}>Dismiss</button>
          </div>
          {importReport}
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
        {filtered.map((s) => {
          const hasVideo = Boolean(extractYoutubeId(s.youtube_id))
          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => openPreview(s)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openPreview(s)
                }
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.6fr 1fr 1fr 0.8fr 1fr',
                padding: '14px 16px',
                borderBottom: '1px solid var(--border)',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                background: preview?.id === s.id ? 'rgba(41,121,255,.08)' : undefined,
              }}
              onMouseEnter={(e) => {
                if (preview?.id !== s.id) e.currentTarget.style.background = 'rgba(255,255,255,.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = preview?.id === s.id ? 'rgba(41,121,255,.08)' : ''
              }}
            >
              <div style={{ fontSize: 12, color: 'var(--mid)' }}>
                {new Date(s.start_datetime).toLocaleString()}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{s.topic}</div>
                {hasVideo ? (
                  <div style={{ fontSize: 11, color: 'var(--blue-bright)', marginTop: 2 }}>▶ Watch replay</div>
                ) : (
                  <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 2 }}>No video linked</div>
                )}
              </div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{s.speaker || '—'}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)' }}>{s.hall_name || halls.find((h) => h.id === s.hall)?.name || s.hall}</div>
              <div style={{ fontSize: 12, color: 'var(--mid)', textTransform: 'capitalize' }}>{s.type}</div>
              <div style={{ display: 'flex', gap: 8 }} onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={() => openEdit(s)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(41,121,255,.15)', color: '#2979FF', cursor: 'pointer' }}>Edit</button>
                <button type="button" onClick={() => deleteSession(s)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', background: 'rgba(229,57,53,.12)', color: '#E53935', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Session preview with YouTube player */}
      {preview && (
        <div onClick={(e) => e.target === e.currentTarget && closeModal()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, width: '100%', maxWidth: 860, maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, lineHeight: 1.1 }}>{preview.topic}</div>
                <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 4 }}>
                  {preview.speaker || 'No speaker'} · {preview.hall_name || halls.find((h) => h.id === preview.hall)?.name || 'Hall'} · {new Date(preview.start_datetime).toLocaleString()}
                </div>
              </div>
              <button type="button" onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--mid)', fontSize: 22, cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ aspectRatio: '16 / 9', background: '#000', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                {previewEmbed ? (
                  <iframe
                    src={previewEmbed}
                    title={preview.topic}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mid)', fontSize: 14, padding: 24, textAlign: 'center' }}>
                    No YouTube ID on this session yet. Edit the session to add an archive video.
                  </div>
                )}
              </div>

              {preview.description && (
                <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.55, color: 'var(--white)' }}>{preview.description}</p>
              )}
              {preview.speaker_bio && (
                <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: 'var(--mid)' }}>{preview.speaker_bio}</p>
              )}
              {preview.youtube_id && (
                <a
                  href={`https://www.youtube.com/watch?v=${extractYoutubeId(preview.youtube_id)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: 'var(--blue-bright)' }}
                >
                  Open on YouTube ↗
                </a>
              )}
            </div>

            <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              <button type="button" onClick={() => openEdit(preview)} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff', cursor: 'pointer' }}>
                Edit session
              </button>
              <button type="button" onClick={closeModal} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: '1px solid var(--border2)', background: 'var(--black3)', color: 'var(--mid)', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {(creating || editing) && (
        <div onClick={(e) => e.target === e.currentTarget && closeModal()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24 }}>{editing ? 'Edit session' : 'New session'}</div>
              <button type="button" onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--mid)', fontSize: 22, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: 24, display: 'grid', gap: 12 }}>
              <div>
                <label style={labelStyle}>Topic *</label>
                <input style={adminInputStyle} value={form.topic} onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Hall *</label>
                  <select style={adminInputStyle} value={form.hall} onChange={(e) => setForm((p) => ({ ...p, hall: e.target.value }))}>
                    {halls.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Type</label>
                  <select style={adminInputStyle} value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
                    {SESSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Speaker</label>
                  <input style={adminInputStyle} value={form.speaker} onChange={(e) => setForm((p) => ({ ...p, speaker: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Start *</label>
                  <input type="datetime-local" style={adminInputStyle} value={form.start_datetime} onChange={(e) => setForm((p) => ({ ...p, start_datetime: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>End *</label>
                  <input type="datetime-local" style={adminInputStyle} value={form.end_datetime} onChange={(e) => setForm((p) => ({ ...p, end_datetime: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...adminInputStyle, minHeight: 90, resize: 'vertical' }} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Speaker bio</label>
                <textarea style={{ ...adminInputStyle, minHeight: 70, resize: 'vertical' }} value={form.speaker_bio} onChange={(e) => setForm((p) => ({ ...p, speaker_bio: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>YouTube ID / URL (archive)</label>
                  <input style={adminInputStyle} value={form.youtube_id} onChange={(e) => setForm((p) => ({ ...p, youtube_id: e.target.value }))} placeholder="dQw4w9WgXcQ or full URL" />
                </div>
                <div>
                  <label style={labelStyle}>Speaker image URL</label>
                  <input style={adminInputStyle} value={form.speaker_image} onChange={(e) => setForm((p) => ({ ...p, speaker_image: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Thumbnail URL</label>
                  <input style={adminInputStyle} value={form.video_thumbnail} onChange={(e) => setForm((p) => ({ ...p, video_thumbnail: e.target.value }))} />
                </div>
              </div>
              {formYtPreview && (
                <div style={{ aspectRatio: '16 / 9', background: '#000', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <iframe
                    src={formYtPreview}
                    title="YouTube preview"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              <button type="button" onClick={saveSession} disabled={saving} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', background: 'var(--blue)', color: '#fff', opacity: saving ? 0.7 : 1, cursor: 'pointer' }}>
                {saving ? 'Saving…' : 'Save session'}
              </button>
              <button type="button" onClick={closeModal} style={{ flex: 1, padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 700, border: '1px solid var(--border2)', background: 'var(--black3)', color: 'var(--mid)', cursor: 'pointer' }}>
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
