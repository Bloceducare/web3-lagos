'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/web3lagos2026/Navbar'
import Footer from '@/components/web3lagos2026/Footer'
import { SCHEDULE, SITE } from '@/lib/web3lagos2026-data'

const SESSION_STYLES: Record<string, { bg: string; color: string; label: string; dot: string }> = {
  keynote:    { bg: 'rgba(21,101,216,.15)',  color: '#6BA3FF', label: 'Keynote',    dot: '#1565D8' },
  panel:      { bg: 'rgba(255,107,53,.12)',  color: '#FF8A60', label: 'Panel',      dot: '#FF6B35' },
  workshop:   { bg: 'rgba(0,194,160,.12)',   color: '#00D4B0', label: 'Workshop',   dot: '#00C2A0' },
  talk:       { bg: 'rgba(168,85,247,.12)',  color: '#C084FC', label: 'Talk',       dot: '#A855F7' },
  networking: { bg: 'rgba(245,158,11,.12)',  color: '#F5B642', label: 'Networking', dot: '#F59E0B' },
  break:      { bg: 'rgba(255,255,255,.05)', color: '#7A7F99', label: 'Break',      dot: '#7A7F99' },
  logistics:  { bg: 'rgba(255,255,255,.05)', color: '#7A7F99', label: 'Info',       dot: '#7A7F99' },
}

const PHOTO_DAYS = [
  { day: 'Day 01', date: 'Thursday, Aug 28', href: 'https://drive.google.com/drive/folders/1CXxKYeneiJfk97g2IpbwuSsHVOmF6nFx' },
  { day: 'Day 02', date: 'Friday, Aug 29',   href: 'https://drive.google.com/drive/folders/1GrK7Tv7z2hEPPUwjqF9hN9S-ds-skHs4' },
  { day: 'Day 03', date: 'Saturday, Aug 30', href: 'https://drive.google.com/drive/folders/1PG3elsxk3HhQFpEMUVSsnSNPgx2RCW_c' },
]

type Tab = 'speakers' | 'schedule' | 'photos'

export default function W3LC4Page() {
  const [tab, setTab] = useState<Tab>('speakers')
  const [dayIdx, setDayIdx] = useState(0)
  const [search, setSearch] = useState('')

  const tabStyle = (t: Tab): React.CSSProperties => ({
    fontSize: 14, fontWeight: 600, color: tab === t ? '#fff' : 'var(--mid)',
    padding: '14px 28px', borderBottom: `2px solid ${tab === t ? 'var(--blue-bright)' : 'transparent'}`,
    cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  })

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: 68 }}>

        {/* Hero */}
        <section style={{ background: 'var(--black2)', padding: '80px 5% 0', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 240, color: 'rgba(255,255,255,0.03)', lineHeight: 1, pointerEvents: 'none' }}>2025</div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
              Past Edition
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,96px)', lineHeight: 0.92, letterSpacing: 1, color: '#fff', marginBottom: 20 }}>
              W3LC <em style={{ fontStyle: 'normal', color: 'var(--blue-bright)' }}>4.0</em><br />2025
            </h1>
            <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
              Web3Lagos Conference 4.0 brought together blockchain builders, innovators and community leaders for three powerful days in Lagos, Nigeria.
            </p>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: 'none' }}>
            {[
              { key: 'speakers', label: '👥 Speakers' },
              { key: 'schedule', label: '📅 Schedule' },
              { key: 'photos',   label: '📸 Photos' },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key as Tab)} style={tabStyle(t.key as Tab)}>
                {t.label}
              </button>
            ))}
            <a href={SITE.highlight2025} target="_blank" rel="noopener noreferrer" style={{ ...tabStyle('speakers'), color: 'var(--mid)' }}>
              ▶ Watch Talks
            </a>
          </div>
        </section>

        {/* Speakers tab */}
        {tab === 'speakers' && (
          <section style={{ padding: '80px 5%', background: 'var(--black)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
                  Speakers
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: 1, color: '#fff', lineHeight: 0.95 }}>Meet the Speakers.</h2>
                <p style={{ fontSize: 15, color: 'var(--mid)', marginTop: 8 }}>71 speakers from across Nigeria, Africa and the world took the stage at W3LC 4.0.</p>
              </div>
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search speakers..."
              style={{ width: '100%', maxWidth: 400, background: 'var(--black3)', border: '1.5px solid var(--border2)', borderRadius: 8, padding: '11px 16px', fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: '#fff', outline: 'none', margin: '28px 0' }}
            />
            <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 24 }}>
              Speaker photos available — please upload individual headshots to display them here.
            </p>
            {/* Speaker grid with initials for now */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 14 }}>
              {['Abdulkareem Oyeneye','Abdullateef Olayiwola','Adek!','Adekunle Michael Ajayi','Adugbo Victory','Aguda','Ajidokwu Emmanuel','Akintobi Ayodeji','Akpas','Amani Kanu','Amarachi Ugwu','Aurelia Mutua','Ayanfeoluwa Olajide','Ayomitan Pamilerin','Barnabas Zakariya','Boluwatife Ogunsina','Chisom Felix','Christian Nwobodo','Christian Obi'].filter(n => !search || n.toLowerCase().includes(search.toLowerCase())).map(name => {
                const init = name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()
                return (
                  <div key={name} style={{ background: 'var(--black3)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 16px', textAlign: 'center', transition: 'all 0.2s' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(21,101,216,.2)', border: '2px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: 'var(--blue-bright)' }}>
                      {init}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{name}</div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Schedule tab */}
        {tab === 'schedule' && (
          <section style={{ padding: '80px 5%', background: 'var(--black2)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
              Schedule
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: 1, color: '#fff', lineHeight: 0.95, marginBottom: 8 }}>3-Day Programme.</h2>
            <p style={{ fontSize: 15, color: 'var(--mid)', marginBottom: 32 }}>August 28 – 30, 2025 · Lagos, Nigeria</p>

            {/* Day tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {SCHEDULE.map((d, i) => (
                <button key={i} onClick={() => setDayIdx(i)} style={{
                  padding: '10px 22px', borderRadius: 8, cursor: 'pointer',
                  background: dayIdx === i ? 'var(--blue)' : 'var(--black3)',
                  border: `1px solid ${dayIdx === i ? 'var(--blue)' : 'var(--border2)'}`,
                  textAlign: 'left', transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: dayIdx === i ? 'rgba(255,255,255,.7)' : 'var(--mid)', marginBottom: 3 }}>{d.day}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: dayIdx === i ? '#fff' : 'var(--mid)' }}>{d.date}</div>
                </button>
              ))}
            </div>

            <div style={{ borderLeft: '3px solid var(--blue)', paddingLeft: 12, marginBottom: 20, fontSize: 13, color: 'var(--mid)', fontWeight: 500 }}>
              {SCHEDULE[dayIdx].date}
            </div>

            {SCHEDULE[dayIdx].sessions.map((s, i) => {
              const style = SESSION_STYLES[s.type] || SESSION_STYLES.talk
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '76px 10px 1fr auto', gap: 16, padding: '22px 0', borderBottom: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', alignItems: 'start' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--mid)', paddingTop: 3, fontFamily: 'monospace' }}>{s.time}</div>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: style.dot, marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{s.title}</div>
                    {(s as any).speaker && <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 3 }}>{(s as any).speaker}</div>}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, background: style.bg, color: style.color, whiteSpace: 'nowrap', marginTop: 2 }}>
                    {style.label}
                  </span>
                </div>
              )
            })}
          </section>
        )}

        {/* Photos tab */}
        {tab === 'photos' && (
          <section style={{ padding: '80px 5%', background: 'var(--black)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
              Photo Gallery
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: 1, color: '#fff', lineHeight: 0.95, marginBottom: 8 }}>Event Moments.</h2>
            <p style={{ fontSize: 15, color: 'var(--mid)', marginBottom: 32 }}>Relive the energy of Web3Lagos 4.0 through the lens.</p>

            <div style={{ background: 'rgba(21,101,216,.08)', border: '1px solid rgba(21,101,216,.2)', borderRadius: 12, padding: '24px 28px', marginBottom: 40 }}>
              <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 16 }}>
                📷 The full photo gallery is hosted on Google Drive. Click below to explore photos from each day.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {PHOTO_DAYS.map(d => (
                  <a key={d.day} href={d.href} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'var(--black3)', border: '1px solid var(--border2)',
                    padding: '14px 20px', borderRadius: 8, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-bright)', display: 'block', marginBottom: 2 }}>{d.day}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{d.date}</div>
                    </div>
                    <span style={{ color: 'var(--blue-bright)', fontSize: 16 }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <div style={{ background: 'var(--black2)', padding: '48px 5%', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 600, color: 'var(--mid)', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}>
            ← Back to Web3Lagos 5.0
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
