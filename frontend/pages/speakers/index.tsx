import Link from 'next/link'
import Navbar from '@/components/web3lagos2026/Navbar'
import Footer from '@/components/web3lagos2026/Footer'

export default function SpeakersPage() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-full box-border overflow-x-hidden" style={{ minHeight: '100vh', paddingTop: 68, background: 'var(--black)' }}>
        <section className="w3lc-mobile-section-x" style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 5%', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 2, background: 'var(--blue-bright)', display: 'inline-block' }} />
            Web3Lagos 5.0
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px,8vw,110px)', lineHeight: 0.92, letterSpacing: 1, color: '#fff', marginBottom: 24 }}>
            CALL FOR<br />
            <em style={{ fontStyle: 'normal', color: 'var(--blue-bright)' }}>SPEAKERS</em>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.75, maxWidth: 680, marginBottom: 34 }}>
            Help shape the lineup. Nominate builders, researchers, founders, educators, and voices you want on stage — we use community suggestions to guide outreach.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/apply/speaker" style={{ background: 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 8 }}>
              Suggest a Speaker →
            </Link>
            <Link href="/" style={{ background: 'transparent', color: 'var(--mid)', border: '1px solid var(--border2)', fontWeight: 600, fontSize: 14, padding: '14px 24px', borderRadius: 8 }}>
              Back to Home
            </Link>
          </div>

          <div style={{ marginTop: 36, background: 'var(--black2)', border: '1px solid var(--border2)', borderRadius: 12, padding: '20px 22px', color: 'var(--mid)', fontSize: 14, lineHeight: 1.7 }}>
            Community nominations are open. Attendee registration is currently closed.
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
