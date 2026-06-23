'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { label: 'About',        href: '/#about' },
  { label: 'Past Editions', href: '/#archive' },
  { label: 'Call for Speakers', href: '/speakers' },
  { label: 'Live Stream',  href: '/live', external: true },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['about', 'archive', 'register']
      let current = ''
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) current = id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <nav className="w3lc-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        height: 68, padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,8,16,0.97)' : 'rgba(6,8,16,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/images/logo-icon.png" alt="Web3Lagos" width={32} height={32} style={{ objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: -0.3 }}>
            Web3Lagos
            <span style={{
              fontSize: 9, fontWeight: 700, background: 'var(--blue)', color: '#fff',
              padding: '2px 6px', borderRadius: 4, marginLeft: 4, verticalAlign: 'middle',
            }}>5.0</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              style={{
                fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 6,
                color: active && `#${l.href.split('#')[1]}` === `#${active}` ? '#fff' : 'var(--mid)',
                background: active && `#${l.href.split('#')[1]}` === `#${active}` ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            className="nav-bar-ctas"
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <Link href="/speakers" style={{
              background: 'transparent', color: '#fff',
              fontWeight: 600, fontSize: 13, padding: '9px 16px',
              borderRadius: 6, border: '1px solid var(--border2)',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
              Call for Speakers
            </Link>
            <Link href="/register" style={{
              background: 'var(--blue)', color: '#fff',
              fontWeight: 600, fontSize: 13, padding: '9px 16px',
              borderRadius: 6, border: '1px solid var(--blue)',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
              Register
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Menu"
            className="nav-hamburger"
            style={{
              display: 'none', flexDirection: 'column', gap: 5,
              background: 'none', border: 'none', padding: 4,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: 'rgba(255,255,255,0.7)', borderRadius: 2,
                transformOrigin: 'center',
                transform: drawerOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)'
                  : 'none',
                opacity: drawerOpen && i === 1 ? 0 : 1,
                transition: 'all 0.3s',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
          background: 'rgba(6,8,16,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 5% 20px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={closeDrawer}
              target={l.external ? '_blank' : undefined}
              style={{
                fontSize: 15, fontWeight: 500, color: 'var(--mid)',
                padding: '12px 16px', borderRadius: 8,
                transition: 'all 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/speakers" onClick={closeDrawer} style={{
            marginTop: 8, background: 'var(--blue)', color: '#fff',
            fontWeight: 600, textAlign: 'center',
            padding: '12px 16px', borderRadius: 8,
          }}>
            Call for Speakers
          </Link>
          <Link href="/register" onClick={closeDrawer} style={{
            marginTop: 8, background: 'var(--blue)', color: '#fff',
            fontWeight: 600, textAlign: 'center',
            padding: '12px 16px', borderRadius: 8,
          }}>
            Register
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .w3lc-nav {
            padding-left: max(12px, env(safe-area-inset-left)) !important;
            padding-right: max(12px, env(safe-area-inset-right)) !important;
          }
          .nav-desktop { display: none !important; }
          .nav-bar-ctas { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
