import Link from 'next/link'
import { SITE, STATS } from '@/lib/web3lagos2026-data'

export default function Hero() {
  return (
    <>
      <section style={{
        minHeight: '100vh', background: 'var(--black)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 5% 0', position: 'relative', overflow: 'hidden',
      }}>
        {/* Glows */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '60vw', height: '80vh', borderRadius: '50%',
          background: 'radial-gradient(ellipse at center,rgba(21,101,216,.12) 0%,transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '5%',
          width: '35vw', height: '50vh', borderRadius: '50%',
          background: 'radial-gradient(ellipse at center,rgba(0,194,160,.06) 0%,transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 700, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'var(--blue-bright)',
            marginBottom: 24,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%', background: 'var(--blue-bright)',
              animation: 'blink 2s ease-in-out infinite',
            }} />
            {SITE.tagline}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(72px,11vw,160px)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: -2, color: '#fff',
          }}>
            WEB3<br />
            <span style={{ color: 'var(--blue-bright)' }}>LAGOS</span><br />
            <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent' }}>
              CONFERENCE
            </span>
          </h1>

          {/* Meta row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr) auto',
            gap: 20, marginTop: 48, paddingTop: 36,
            borderTop: '1px solid var(--border)',
            paddingBottom: 64, alignItems: 'end',
          }} className="hero-meta-row">
            {[
              { label: 'DATE', value: SITE.date },
              { label: 'VENUE', value: SITE.venue, muted: true },
              { label: 'FORMAT', value: SITE.format },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 6 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 18, fontWeight: m.muted ? 400 : 600, color: m.muted ? 'var(--mid)' : '#fff', fontStyle: m.muted ? 'italic' : 'normal' }}>
                  {m.value}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/speakers" style={{
                background: 'var(--blue)', color: '#fff',
                fontWeight: 700, fontSize: 14, padding: '14px 28px',
                borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.25s',
              }}>
                Call for Speakers →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: 48, flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid var(--border)',
          padding: '28px 5%',
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32, color: '#fff', lineHeight: 1,
              }}>
                {s.num.replace('+', '')}<span style={{ color: 'var(--blue-bright)' }}>+</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @media (max-width: 768px) {
          .hero-meta-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
