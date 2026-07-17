'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { LayoutDashboard, User, GitBranch, BarChart3, LogOut, Search, Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile',   label: 'Profile',   icon: User },
  { href: '/repos',     label: 'Repos',     icon: GitBranch },
  { href: '/charts',    label: 'Analytics', icon: BarChart3 },
];

export function Navbar() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { data: session } = useSession();
  const [q, setQ]           = useState('');
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu]     = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  const user  = session?.user;
  const login = (session as any)?.user?.login;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { router.push(`/profile?user=${encodeURIComponent(q.trim())}`); setQ(''); setMobile(false); }
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--bg-canvas)',
        borderBottom: '1px solid var(--border-muted)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.2s',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* Logo */}
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#1f6feb,#8957e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GithubIcon size={15} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-default)', letterSpacing: '-0.02em' }}>GitPulse</span>
          </Link>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: '#30363d', flexShrink: 0 }} />

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }} className="hidden-mobile">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link${active ? ' active' : ''}`}>
                  <Icon size={14} />{label}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ position: 'relative', flexShrink: 0 }} className="hidden-mobile">
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#484f58', pointerEvents: 'none' }} />
            <input
              id="global-search"
              className="input"
              type="text"
              placeholder="Search user..."
              value={q}
              onChange={e => setQ(e.target.value)}
              style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 6, paddingBottom: 6, width: 180, fontSize: 13 }}
            />
          </form>

          {/* Theme toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="hidden-mobile"
            style={{
              background: 'transparent', border: '1px solid var(--border-default)',
              borderRadius: 8, padding: '5px 8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg-muted)', flexShrink: 0, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-default)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)'; }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* User */}
          {user && (
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                id="user-menu-btn"
                onClick={() => setMenu(!menu)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 8, background: 'transparent', border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.1s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1c2128'; (e.currentTarget as HTMLElement).style.borderColor = '#30363d'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
              >
                <img
                  src={user.image ?? ''}
                  alt={user.name ?? ''}
                  style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #30363d' }}
                />
                <ChevronDown size={12} style={{ color: '#7d8590', transform: menu ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>

              {menu && (
                <div className="animate-slide-down" style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: 'var(--bg-overlay)', border: '1px solid var(--border-default)', borderRadius: 12,
                  minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 200,
                }}>
                  <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid var(--border-muted)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-default)' }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 1 }}>@{login}</div>
                  </div>
                  <div style={{ padding: '6px' }}>
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                      <Link key={href} href={href} onClick={() => setMenu(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, fontSize: 14, color: 'var(--fg-muted)', textDecoration: 'none', transition: 'all 0.1s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-default)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)'; }}
                      >
                        <Icon size={14} />{label}
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border-muted)', margin: '6px 0' }} />
                    <button
                      id="logout-btn"
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, fontSize: 14, color: '#f85149', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', transition: 'all 0.1s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(248,81,73,0.1)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile toggle */}
          <button onClick={() => setMobile(!mobile)} className="show-mobile"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)', padding: 6, display: 'none' }}
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobile && (
          <div className="animate-slide-down" style={{ borderTop: '1px solid var(--border-muted)', padding: '12px 16px', background: 'var(--bg-canvas)' }}>
            <form onSubmit={handleSearch} style={{ position: 'relative', marginBottom: 10 }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#484f58', pointerEvents: 'none' }} />
              <input className="input" type="text" placeholder="Search GitHub user..." value={q}
                onChange={e => setQ(e.target.value)} style={{ paddingLeft: 32, width: '100%', fontSize: 13 }} />
            </form>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobile(false)}
                className={`nav-link${pathname.startsWith(href) ? ' active' : ''}`}
                style={{ display: 'flex', padding: '10px 12px', marginBottom: 2 }}
              >
                <Icon size={15} />{label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
