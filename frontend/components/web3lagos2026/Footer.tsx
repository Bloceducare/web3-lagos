import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/web3lagos2026-data'

export default function Footer() {
  return (
    <footer className="w3lc-footer w3lc-mobile-section-x" style={{
      background: '#080A14',
      borderTop: '1px solid var(--border)',
      padding: '64px 5% 36px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}>
      <div className="w3lc-footer-grid" style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
        gap: 64, marginBottom: 40,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Image src="/images/logo-icon.png" alt="Web3Lagos" width={28} height={28} style={{ objectFit: 'contain', opacity: 0.7, filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>
              Web3Lagos
              <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--blue)', color: '#fff', padding: '2px 6px', borderRadius: 4, marginLeft: 4, verticalAlign: 'middle' }}>5.0</span>
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 280 }}>
            The largest Web3 conference in Lagos, Nigeria — hosted by Web3bridge. Educating and empowering the next generation of blockchain builders since 2022.
          </p>
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 18 }}>
            Event
          </div>
          {[
            { label: 'Register', href: '/register' },
            { label: 'Live Stream', href: SITE.livestream, external: true },
            { label: 'Past Editions', href: '/#archive' },
          ].map(l => (
            <Link key={l.label} href={l.href} target={(l as any).external ? '_blank' : undefined}
              style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 12, transition: 'color 0.2s' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 18 }}>
            Connect
          </div>
          {[
            { label: 'X / Twitter', href: SITE.twitter, external: true },
            { label: SITE.email, href: `mailto:${SITE.email}` },
            { label: 'Sponsor Deck', href: SITE.sponsorDeck, external: true },
          ].map(l => (
            <Link key={l.label} href={l.href} target={(l as any).external ? '_blank' : undefined}
              style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 12, transition: 'color 0.2s' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--border)', paddingTop: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Web3bridge. All rights reserved.</span>
        <a href={`mailto:${SITE.email}`} style={{ fontSize: 13, color: 'var(--blue)' }}>{SITE.email}</a>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .w3lc-footer { padding-top: 48px !important; padding-bottom: 28px !important; }
          .w3lc-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
