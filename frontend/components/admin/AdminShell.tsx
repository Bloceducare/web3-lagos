'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV_SECTIONS = [
  {
    title: 'Registration',
    items: [
      { href: '/admin', label: 'Applications', match: (path: string) => path === '/admin' || path === '/admin/' },
      { href: '/admin/nominations', label: 'Nominations', match: (path: string) => path.startsWith('/admin/nominations') },
    ],
  },
  {
    title: 'Event',
    items: [
      { href: '/admin/schedule', label: 'Schedule', match: (path: string) => path.startsWith('/admin/schedule') },
      { href: '/admin/conferences', label: 'Conferences', match: (path: string) => path.startsWith('/admin/conferences') },
      { href: '/admin/livestream', label: 'Livestream', match: (path: string) => path.startsWith('/admin/livestream') },
    ],
  },
]

const FLAT_NAV = NAV_SECTIONS.flatMap((s) => s.items)

type AdminShellProps = {
  adminName: string
  onLogout: () => void
  children: React.ReactNode
  title?: string
  subtitle?: React.ReactNode
  actions?: React.ReactNode
}

export default function AdminShell({
  adminName,
  onLogout,
  children,
  title,
  subtitle,
  actions,
}: AdminShellProps) {
  const router = useRouter()
  const path = router.pathname

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex' }}>
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: 'var(--black2)',
          borderRight: '1px solid var(--border)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          alignSelf: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 14px',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: 24, padding: '0 8px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>W3LC Admin</span>
            <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--blue)', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>5.0</span>
          </div>
          <div style={{ fontSize: 11, color: '#9aa0b8' }}>Conference console</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: '0 0 auto' }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#6b728a',
                  padding: '0 12px',
                  marginBottom: 8,
                }}
              >
                {section.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {section.items.map((item) => {
                  const active = item.match(path)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: 'block',
                        padding: '10px 12px',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: active ? 700 : 500,
                        color: active ? '#fff' : '#d0d4e4',
                        background: active ? 'var(--blue)' : 'transparent',
                        border: active ? '1px solid var(--blue)' : '1px solid transparent',
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 'auto', flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: '#9aa0b8', marginBottom: 10, padding: '0 4px' }}>{adminName}</div>
          <Link
            href="/live"
            target="_blank"
            style={{
              display: 'block',
              width: '100%',
              fontSize: 12,
              color: 'var(--blue-bright)',
              background: 'transparent',
              border: '1px solid var(--border2)',
              padding: '8px 12px',
              borderRadius: 6,
              marginBottom: 8,
              boxSizing: 'border-box',
              textDecoration: 'none',
            }}
          >
            Open /live ↗
          </Link>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              fontSize: 12,
              color: '#9aa0b8',
              background: 'var(--black3)',
              border: '1px solid var(--border2)',
              padding: '8px 12px',
              borderRadius: 6,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            minHeight: 64,
            background: 'var(--black2)',
            borderBottom: '1px solid var(--border)',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            position: 'sticky',
            top: 0,
            zIndex: 50,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {FLAT_NAV.map((item) => {
              const active = item.match(path)
              return (
                <Link
                  key={`top-${item.href}`}
                  href={item.href}
                  style={{
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    color: active ? '#fff' : '#c5cada',
                    background: active ? 'var(--blue)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? 'var(--blue)' : 'var(--border2)'}`,
                    padding: '6px 10px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {actions}
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          {(title || subtitle) && (
            <div style={{ marginBottom: 28 }}>
              {title && (
                <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, letterSpacing: 1, marginBottom: 4, color: '#fff' }}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <div style={{ fontSize: 13, color: '#9aa0b8' }}>{subtitle}</div>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export const adminInputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--black3)',
  border: '1px solid var(--border2)',
  borderRadius: 8,
  padding: '11px 14px',
  fontFamily: "'Space Grotesk',sans-serif",
  fontSize: 14,
  color: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}
