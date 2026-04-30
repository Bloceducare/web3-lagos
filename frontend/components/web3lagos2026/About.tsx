import { PILLARS, TAGS, STATS } from '@/lib/web3lagos2026-data'

const tagColors: Record<string, { bg: string; color: string; border: string }> = {
  blue:   { bg: 'rgba(21,101,216,.2)', color: '#6BA3FF', border: 'rgba(21,101,216,.3)' },
  teal:   { bg: 'rgba(0,194,160,.15)', color: '#00D4B0', border: 'rgba(0,194,160,.25)' },
  orange: { bg: 'rgba(255,107,53,.15)', color: '#FF8A60', border: 'rgba(255,107,53,.25)' },
}

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 5%', background: 'var(--black2)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 20 }}>
        <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
        About the Conference
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, marginTop: 0, alignItems: 'start',
      }} className="about-grid">
        {/* Left */}
        <div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px,5.5vw,72px)',
            letterSpacing: 1, lineHeight: 0.95, color: '#fff', marginBottom: 20,
          }}>
            Empowering Africa<br />Through Blockchain.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.75, marginBottom: 40, maxWidth: 500 }}>
            Web3bridge believes education is the foundation of blockchain adoption. W3LC is where builders, innovators and community come alive — three transformative days in the heart of Lagos.
          </p>

          {/* Pillars */}
          <div>
            {PILLARS.map((p, i) => (
              <div key={i} style={{
                display: 'flex', gap: 20, padding: '24px 0',
                borderBottom: '1px solid var(--border)',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, color: 'var(--blue-bright)', opacity: 0.5,
                  minWidth: 36, lineHeight: 1.1,
                }}>
                  {p.num}
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Quote card */}
          <div style={{
            background: 'var(--black3)', border: '1px solid var(--border2)',
            borderRadius: 16, padding: 40, position: 'relative', overflow: 'hidden',
            marginBottom: 20,
          }}>
            <div style={{
              position: 'absolute', right: -10, top: -10,
              fontSize: 100, fontWeight: 900, color: 'rgba(255,255,255,0.03)',
              lineHeight: 1, pointerEvents: 'none', fontFamily: 'sans-serif',
            }}>
              2026
            </div>
            <blockquote style={{
              fontSize: 21, fontWeight: 300, color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.55, fontStyle: 'italic',
              borderLeft: '3px solid var(--blue-bright)', paddingLeft: 20,
              position: 'relative', zIndex: 2,
            }}>
              &ldquo;Building the next generation of blockchain innovators from the African continent and beyond.&rdquo;
            </blockquote>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24, position: 'relative', zIndex: 2 }}>
              {TAGS.map(t => {
                const s = tagColors[t.color]
                return (
                  <span key={t.label} style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.8px',
                    textTransform: 'uppercase', padding: '4px 12px',
                    borderRadius: 100, background: s.bg, color: s.color,
                    border: `1px solid ${s.border}`,
                  }}>
                    {t.label}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: 1, background: 'var(--border)',
            borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)',
          }}>
            {STATS.slice(0, 3).map(s => (
              <div key={s.label} style={{ background: 'var(--black3)', padding: '24px 20px', textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 44, letterSpacing: 1, color: '#fff', lineHeight: 1,
                }}>
                  {s.num.replace('+', '')}<em style={{ fontStyle: 'normal', color: 'var(--blue-bright)' }}>+</em>
                </div>
                <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
