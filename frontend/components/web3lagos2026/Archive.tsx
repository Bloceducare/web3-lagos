import Link from 'next/link'
import { EDITIONS, SITE } from '@/lib/web3lagos2026-data'

const mediaLinks = [
  { label: '▶ YouTube', href: SITE.youtube },
  { label: '𝕏 Twitter / X', href: SITE.twitter },
  { label: '📡 Live Stream', href: SITE.livestream },
  { label: '🗂 Full Archive', href: '/archive' },
]

export default function Archive() {
  return (
    <section id="archive" className="w3lc-mobile-section-x" style={{ padding: '100px 5%', background: 'var(--black)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 16 }}>
        <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
        Archive
      </div>
      <h2 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(40px,5.5vw,72px)',
        letterSpacing: 1, lineHeight: 0.95, color: '#fff', marginBottom: 48,
      }}>
        Our Story So Far.
      </h2>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 16,
      }} className="editions-grid">
        {EDITIONS.map(e => (
          <div key={e.year} style={{
            background: e.latest ? 'rgba(21,101,216,0.06)' : 'var(--black3)',
            border: `1px solid ${e.latest ? 'rgba(21,101,216,0.35)' : 'var(--border)'}`,
            borderRadius: 12, padding: '28px 24px',
            position: 'relative', overflow: 'hidden',
            transition: 'transform 0.2s, border-color 0.2s',
          }}
            className="edition-card"
          >
            {/* Top gradient line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg,var(--blue),var(--teal))',
              opacity: e.latest ? 1 : 0,
              transition: 'opacity 0.3s',
            }} className="edition-line" />

            {e.latest && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'rgba(21,101,216,.2)', border: '1px solid rgba(21,101,216,.35)',
                color: '#6BA3FF', fontSize: 9, fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100, marginBottom: 14,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6BA3FF', animation: 'blink 2s infinite', display: 'inline-block' }} />
                Latest
              </div>
            )}
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', color: 'var(--blue-bright)', marginBottom: 10 }}>
              {e.version} · {e.year}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.25 }}>
              {e.title}
            </div>
            <Link href={e.link} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 12, fontWeight: 700, color: 'var(--blue-bright)',
              marginTop: 16, transition: 'gap 0.2s',
            }}>
              View Past Event →
            </Link>
          </div>
        ))}
      </div>

      {/* Media row */}
      <div style={{ display: 'flex', gap: 12, marginTop: 48, flexWrap: 'wrap' }}>
        {mediaLinks.map(m => (
          <Link
            key={m.label}
            href={m.href}
            target={m.href.startsWith('http') ? '_blank' : undefined}
            rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              padding: '11px 20px', borderRadius: 8,
              border: '1px solid var(--border)', fontSize: 13, fontWeight: 500,
              color: 'rgba(255,255,255,0.6)', background: 'var(--black3)',
              transition: 'all 0.2s',
            }}
          >
            {m.label}
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .edition-card:hover { transform: translateY(-4px); border-color: var(--border2) !important; }
        .edition-card:hover .edition-line { opacity: 1 !important; }
        @media (max-width: 900px) {
          .editions-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .editions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
