'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { LayoutDashboard, User, GitBranch, BarChart3, LogOut, Search, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function GitPulseLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill="#38bdf8"/>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
      <path d="M12 7v5l3 3" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/repos', label: 'Repos', icon: GitBranch },
  { href: '/charts', label: 'Analytics', icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = session?.user;
  const login = (session as any)?.user?.login;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/profile?user=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(6,9,18,0.92)', borderBottom: '1px solid #21262d', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[58px]">

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0f172a,#1e1b4b)', border: '1px solid rgba(56,189,248,0.2)' }}>
                <GitPulseLogo />
              </div>
              <span className="text-[15px] font-bold tracking-tight hidden sm:block" style={{ color: '#e2e8f0' }}>
                Git<span className="gradient-text">Pulse</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} className={cn('nav-item', active && 'active')}>
                    <item.icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
                <Search size={14} className="absolute left-3 pointer-events-none" style={{ color: '#3d444d' }} />
                <input
                  id="global-search-input"
                  type="text"
                  placeholder="Search user..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-dark pl-9 pr-3 py-[7px] text-sm w-40 focus:w-52 transition-all"
                  style={{ fontSize: '13px' }}
                />
              </form>

              {/* User dropdown */}
              {user && (
                <div className="relative">
                  <button
                    id="user-menu-btn"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#161b22] transition-colors"
                  >
                    {user.image ? (
                      <img src={user.image} alt={user.name ?? ''} className="w-7 h-7 rounded-full" style={{ border: '2px solid #30363d' }} />
                    ) : (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', color: 'white' }}>
                        {user.name?.[0] ?? 'U'}
                      </div>
                    )}
                    <span className="text-xs hidden sm:block" style={{ color: '#7d8590' }}>{login}</span>
                    <ChevronDown size={12} className={cn('transition-transform', userMenuOpen && 'rotate-180')} style={{ color: '#7d8590' }} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 card animate-slide-down" style={{ padding: '6px' }}>
                      <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #21262d', marginBottom: '4px' }}>
                        <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{user.name}</p>
                        <p className="text-xs" style={{ color: '#7d8590' }}>@{login}</p>
                      </div>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-[#161b22] transition-colors"
                        style={{ color: '#7d8590' }}
                      >
                        <User size={14} /> View Profile
                      </Link>
                      <button id="logout-btn" onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/10 transition-colors"
                        style={{ color: '#f85149' }}
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button id="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[#161b22] transition-colors"
                style={{ color: '#7d8590' }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden animate-slide-down" style={{ borderTop: '1px solid #21262d', padding: '12px 16px', background: 'rgba(6,9,18,0.98)' }}>
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#3d444d' }} />
              <input
                type="text" placeholder="Search GitHub user..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="input-dark w-full pl-9 pr-3 py-2.5 text-sm"
              />
            </form>
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className={cn('nav-item w-full', active && 'active')}
                    style={{ padding: '10px 14px' }}
                  >
                    <item.icon size={16} /> {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
