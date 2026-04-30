'use client'

const items = [
  'Web3Lagos 5.0', 'Aug 27–29, 2026', 'Lagos, Nigeria',
  'Blockchain', 'DeFi', 'Hackathon', 'Networking',
  'Web3 Education', 'NFTs & RWAs',
]

export default function Ticker() {
  const repeated = [...items, ...items]
  return (
    <div style={{ background: 'var(--blue)', padding: '13px 0', overflow: 'hidden' }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        animation: 'ticker 30s linear infinite',
      }}>
        {[0, 1].map(set => (
          <div key={set} style={{ display: 'flex', alignItems: 'center' }}>
            {items.map((item, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)',
                padding: '0 40px', display: 'inline-flex', alignItems: 'center', gap: 40,
              }}>
                {item}
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8 }}>◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
