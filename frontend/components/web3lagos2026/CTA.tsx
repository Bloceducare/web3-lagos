import Link from 'next/link'
import { SITE } from '@/lib/web3lagos2026-data'

export default function CTA() {
  return (
    <section id="register" style={{
      background: 'var(--black)', padding: '120px 5%',
      textAlign: 'center', borderTop: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse,rgba(21,101,216,.14) 0%,transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(48px,8vw,100px)',
          letterSpacing: 2, lineHeight: 0.9, color: '#fff',
        }}>
          CALL FOR<br />
          <em style={{ fontStyle: 'normal', color: 'var(--blue-bright)' }}>LAGOS</em><br />
          SPEAKERS.
        </h2>
        <p style={{
          fontSize: 17, color: 'var(--mid)', maxWidth: 480,
          margin: '24px auto 40px', lineHeight: 1.75,
        }}>
          Attendee registration is currently closed. Speaker applications are open for Web3Lagos 5.0.
        </p>
        <Link href="/speakers" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--blue)', color: '#fff',
          fontWeight: 700, fontSize: 15, padding: '14px 32px',
          borderRadius: 8, transition: 'all 0.25s',
        }}>
          Apply as Speaker →
        </Link>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          marginTop: 36, background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)', padding: '12px 24px',
          borderRadius: 100, fontSize: 13, color: 'var(--mid)',
        }}>
          📅 {SITE.dateShort} &nbsp;·&nbsp; <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Venue TBA, Lagos, Nigeria</strong>
        </div>
      </div>
    </section>
  )
}
