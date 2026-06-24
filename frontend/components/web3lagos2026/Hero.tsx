import Link from 'next/link'
import { SITE, STATS } from '@/lib/web3lagos2026-data'

export default function Hero() {
  return (
    <>
      <section className="w3lc-hero-section" style={{
        minHeight: '100vh', background: 'var(--black)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 5% 0', position: 'relative', overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
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

        <div className="w3lc-hero-inner" style={{
          position: 'relative', zIndex: 2, maxWidth: 900,
          width: '100%', minWidth: 0, boxSizing: 'border-box',
        }}>
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

          {/* Title — min font size must stay small on narrow screens so “CONFERENCE” fits */}
          <h1 className="w3lc-hero-title" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.4rem, 10.5vw + 0.35rem, 10rem)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.03em', color: '#fff',
            overflowWrap: 'break-word', wordBreak: 'break-word', hyphens: 'auto',
            maxWidth: '100%',
          }}>
            WEB3<br />
            <span style={{ color: 'var(--blue-bright)' }}>LAGOS</span><br />
            <span className="w3lc-hero-title-outline" style={{ color: 'transparent' }}>
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
              { label: 'VENUE', value: SITE.venue },
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
            <div className="hero-meta-cta-wrap" style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap' }}>
              <Link href="/register" className="hero-meta-cta hero-meta-cta-primary" style={{
                background: 'var(--blue)', color: '#fff',
                fontWeight: 700, fontSize: 14, padding: '14px 28px',
                borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.25s',
              }}>
                Register →
              </Link>
              <Link href="/speakers" className="hero-meta-cta hero-meta-cta-secondary" style={{
                background: 'transparent', color: '#fff',
                fontWeight: 600, fontSize: 14, padding: '14px 28px',
                borderRadius: 8, border: '1px solid var(--border2)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.25s',
              }}>
                Call for Speakers →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="w3lc-hero-stats" style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: 48, flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid var(--border)',
          padding: '28px 5%',
          width: '100%',
          boxSizing: 'border-box',
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
        .w3lc-hero-title-outline {
          -webkit-text-stroke: 2px rgba(255,255,255,0.22);
          paint-order: stroke fill;
        }
        @media (max-width: 768px) {
          .w3lc-hero-section {
            padding-top: 88px !important;
            padding-left: max(14px, env(safe-area-inset-left)) !important;
            padding-right: max(14px, env(safe-area-inset-right)) !important;
          }
          .w3lc-hero-stats {
            padding-left: max(14px, env(safe-area-inset-left)) !important;
            padding-right: max(14px, env(safe-area-inset-right)) !important;
            gap: 28px !important;
          }
          .hero-meta-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .hero-meta-cta-wrap {
            width: 100%;
            flex-direction: column;
            order: 10;
          }
          .hero-meta-cta { width: 100%; box-sizing: border-box; }
          .hero-meta-cta-secondary { margin-top: 4px; }
          .w3lc-hero-title {
            font-size: clamp(2.1rem, 11.2vw, 5.5rem) !important;
            letter-spacing: -0.04em !important;
          }
          .w3lc-hero-title-outline {
            -webkit-text-stroke: 1px rgba(255,255,255,0.28);
          }
        }
        @media (max-width: 380px) {
          .w3lc-hero-title {
            font-size: clamp(1.95rem, 10vw, 5rem) !important;
          }
        }
      `}</style>
    </>
  )
}
