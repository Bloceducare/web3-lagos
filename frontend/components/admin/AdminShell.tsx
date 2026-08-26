'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV = [
  { href: '/admin', label: 'Applications', match: (path: string) => path === '/admin' || path === '/admin/' },
  { href: '/admin/livestream', label: 'Livestream', match: (path: string) => path.startsWith('/admin/livestream') },
]

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
          width: 220,
          flexShrink: 0,
          background: 'var(--black2)',
          borderRight: '1px solid var(--border)',
          minHeight: '100vh',
          position: 'sticky',
          top: 0,
          alignSelf: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
        }}
      >
        <div style={{ marginBottom: 28, padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>W3LC Admin</span>
            <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--blue)', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>5.0</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--mid)' }}>Conference console</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV.map((item) => {
            const active = item.match(path)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color: active ? '#fff' : 'var(--mid)',
                  background: active ? 'var(--blue)' : 'transparent',
                  border: active ? '1px solid var(--blue)' : '1px solid transparent',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 10, padding: '0 4px' }}>{adminName}</div>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              fontSize: 12,
              color: 'var(--mid)',
              background: 'var(--black3)',
              border: '1px solid var(--border2)',
              padding: '8px 12px',
              borderRadius: 6,
              textAlign: 'left',
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            height: 64,
            background: 'var(--black2)',
            borderBottom: '1px solid var(--border)',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--mid)' }}>
            {NAV.find((n) => n.match(path))?.label || 'Admin'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {actions}
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          {(title || subtitle) && (
            <div style={{ marginBottom: 28 }}>
              {title && (
                <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, letterSpacing: 1, marginBottom: 4 }}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <div style={{ fontSize: 13, color: 'var(--mid)' }}>{subtitle}</div>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
