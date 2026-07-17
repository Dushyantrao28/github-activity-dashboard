'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ContactSection } from '@/components/layout/ContactSection';

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const HEATMAP_DATA = [0,0,1,0,2,0,0,3,1,0,0,2,4,3,1,0,2,0,1,3,2,0,0,3,4,0,1,0,2,1,3,0,0,2,1,4,0,3,2,0,1,0,2,3,0,0,4,2,1,0,3,0,2,1,4,0,0,3,2,1,0,4,0,2,1,3,0,0,2,1];
const HEAT_COLORS = ['var(--bg-overlay)', '#0e4429', '#006d32', '#26a641', '#39d353'];

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') router.push('/dashboard');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 28, height: 28, border: '2px solid #30363d', borderTopColor: '#58a6ff', borderRadius: '50%' }} className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top nav bar ─────────────────── */}
      <header style={{ borderBottom: '1px solid #21262d', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#1f6feb,#8957e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GithubIcon size={18} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg-default)', letterSpacing: '-0.02em' }}>GitPulse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#features" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>Features</a>
          <a href="#" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>Docs</a>
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="btn btn-github"
            style={{ padding: '6px 16px', fontSize: 13, borderRadius: 8 }}
          >
            <GithubIcon size={15} /> Sign in
          </button>
        </div>
      </header>

      {/* ── Hero ────────────────────────── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Background glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(31,111,235,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(ellipse, rgba(137,87,229,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '8%', width: 250, height: 250, background: 'radial-gradient(ellipse, rgba(63,185,80,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, width: '100%' }}>

          {/* Badge */}
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <span className="badge badge-green">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3fb950', display: 'inline-block' }} className="animate-pulse" />
              Open Source · Internship Project
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-50" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-default)', marginBottom: 20 }}>
            Your GitHub activity,
            <br />
            <span className="gradient-text">beautifully visualized.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-100" style={{ fontSize: 18, color: 'var(--fg-muted)', lineHeight: 1.65, marginBottom: 40, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            GitPulse transforms your GitHub data into stunning contribution heatmaps, commit analytics, language breakdowns, and repository insights.
          </p>

          {/* CTA group */}
          <div className="animate-fade-up delay-150" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 56 }}>
            <button
              id="login-github-btn"
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="btn btn-github"
              style={{ fontSize: 15, padding: '13px 32px', borderRadius: 12, boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.2)' }}
            >
              <GithubIcon size={18} />
              Continue with GitHub — it&apos;s free
            </button>
            <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>No credit card · Only reads public data · Open source</p>
          </div>

          {/* Dashboard preview window */}
          <div className="animate-fade-up delay-300 preview-window" style={{ background: 'var(--bg-overlay)', border: '1px solid #30363d', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', textAlign: 'left', maxWidth: 800, margin: '0 auto' }}>

            {/* Window chrome */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #21262d', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'var(--bg-canvas)', border: '1px solid #30363d', borderRadius: 6, padding: '3px 16px', fontSize: 12, color: 'var(--fg-subtle)', minWidth: 200, textAlign: 'center' }}>gitpulse.vercel.app/dashboard</div>
              </div>
            </div>

            {/* Dashboard content */}
            <div style={{ padding: '20px 24px' }}>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Contributions', value: '1,847', color: '#3fb950' },
                  { label: 'Repositories', value: '42', color: '#58a6ff' },
                  { label: 'Total Stars', value: '386', color: '#e3b341' },
                  { label: 'Followers', value: '219', color: '#bc8cff' },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'var(--bg-canvas)', border: '1px solid #21262d', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Heatmap */}
              <div style={{ background: 'var(--bg-canvas)', border: '1px solid #21262d', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-default)' }}>Contribution Activity</span>
                  <span style={{ fontSize: 12, color: '#3fb950' }}>1,847 contributions this year</span>
                </div>
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {HEATMAP_DATA.map((level, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: HEAT_COLORS[level] }} />
                  ))}
                </div>
              </div>

              {/* Bottom row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'var(--bg-canvas)', border: '1px solid #21262d', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Language Breakdown</div>
                  {[['TypeScript', '#3178c6', 68], ['Python', '#3572A5', 18], ['Go', '#00ADD8', 14]].map(([lang, color, pct]) => (
                    <div key={String(lang)} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: String(color) }} />
                          <span style={{ fontSize: 12, color: 'var(--fg-default)' }}>{String(lang)}</span>
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{pct}%</span>
                      </div>
                      <div style={{ height: 4, background: 'var(--border-muted)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: String(color), borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--bg-canvas)', border: '1px solid #21262d', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Top Repositories</div>
                  {[
                    { name: 'github-dashboard', stars: 142 },
                    { name: 'ml-experiments', stars: 98 },
                    { name: 'nextjs-starter', stars: 76 },
                  ].map((r) => (
                    <div key={r.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: '#58a6ff' }}>{r.name}</span>
                      <span style={{ fontSize: 11, color: '#e3b341' }}>★ {r.stars}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Stats bar ──────────────── */}
      <section style={{ borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d', padding: '28px 24px', background: 'var(--bg-canvas)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
          {[
            { value: '100%', label: 'Free & Open Source' },
            { value: 'GitHub API', label: 'Powered by REST + GraphQL' },
            { value: '6 Pages', label: 'Dashboard, Charts, Repos & more' },
            { value: 'Vercel', label: 'Edge-deployed globally' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--fg-default)', letterSpacing: '-0.02em', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features section ──────────────── */}
      <section id="features" style={{ padding: '96px 24px', background: 'var(--bg-canvas)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span className="badge badge-purple" style={{ fontSize: 12, padding: '4px 12px' }}>Features</span>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--fg-default)', letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.15 }}>
              Everything you need to understand
              <br />
              <span style={{ background: 'linear-gradient(135deg,#58a6ff,#bc8cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                your GitHub activity
              </span>
            </h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
              Built for developers who take their craft seriously. Real data, beautiful visualizations, zero fluff.
            </p>
          </div>

          {/* Feature grid — 3 cols on desktop, 2 on tablet, 1 on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border-muted)', borderRadius: 20, overflow: 'hidden', border: '1px solid #21262d' }}>
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="4" height="4" rx="1" fill="#3fb950" stroke="none" />
                    <rect x="9" y="3" width="4" height="4" rx="1" fill="#006d32" stroke="none" />
                    <rect x="15" y="3" width="4" height="4" rx="1" fill="#26a641" stroke="none" />
                    <rect x="3" y="9" width="4" height="4" rx="1" fill="#0e4429" stroke="none" />
                    <rect x="9" y="9" width="4" height="4" rx="1" fill="#3fb950" stroke="none" />
                    <rect x="15" y="9" width="4" height="4" rx="1" fill="#39d353" stroke="none" />
                    <rect x="3" y="15" width="4" height="4" rx="1" fill="#26a641" stroke="none" />
                    <rect x="9" y="15" width="4" height="4" rx="1" fill="#0e4429" stroke="none" />
                    <rect x="15" y="15" width="4" height="4" rx="1" fill="#006d32" stroke="none" />
                  </svg>
                ),
                color: '#3fb950',
                bg: 'rgba(63,185,80,0.08)',
                title: 'Contribution Heatmap',
                desc: 'Full 12-month activity calendar in the classic GitHub green grid with hover tooltips showing exact counts per day.',
                tag: 'GraphQL API',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                color: '#58a6ff',
                bg: 'rgba(88,166,255,0.08)',
                title: 'Commit Frequency',
                desc: 'Interactive bar and area charts showing your push frequency over the past 6 months. Toggle between chart types.',
                tag: 'Recharts',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#bc8cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                ),
                color: '#bc8cff',
                bg: 'rgba(188,140,255,0.08)',
                title: 'Repo Explorer',
                desc: 'Browse all your public repos in a filterable grid. Search by name, filter by language, sort by stars, forks, or date.',
                tag: 'REST API',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e3b341" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                  </svg>
                ),
                color: '#e3b341',
                bg: 'rgba(227,179,65,0.08)',
                title: 'Language Breakdown',
                desc: 'Animated donut chart showing the exact percentage split of your codebase across all programming languages.',
                tag: 'Recharts',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff7b72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                color: '#ff7b72',
                bg: 'rgba(255,123,114,0.08)',
                title: 'Profile Explorer',
                desc: 'Search any GitHub username to view their full public profile — avatar, bio, stats, heatmap and top repos. No login needed.',
                tag: 'Public route',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                color: '#58a6ff',
                bg: 'rgba(88,166,255,0.08)',
                title: 'Real-time GitHub Data',
                desc: 'Live REST and GraphQL API calls with React Query caching. Streaks, stars, forks, and gists all updated on every session.',
                tag: 'React Query',
              },
            ].map((f, i) => (
              <div key={f.title} style={{
                background: 'var(--bg-canvas)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                position: 'relative',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-canvas)'; }}
              >
                {/* Top accent line on hover */}
                <div style={{ position: 'absolute', top: 0, left: 28, right: 28, height: 1, background: `linear-gradient(90deg, transparent, ${f.color}40, transparent)` }} />

                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: f.bg,
                  border: `1px solid ${f.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>

                {/* Text */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-default)' }}>{f.title}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>

                {/* Tag */}
                <div style={{ marginTop: 'auto' }}>
                  <span style={{
                    fontSize: 11, padding: '3px 10px', borderRadius: 20,
                    background: `${f.color}12`, color: f.color,
                    border: `1px solid ${f.color}25`, fontWeight: 500,
                  }}>{f.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}


        </div>

        {/* Responsive style for features grid */}
        <style>{`
          @media (max-width: 900px) {
            #features > div > div[style*="repeat(3"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 560px) {
            #features > div > div[style*="repeat(3"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      <ContactSection />

      <div style={{ textAlign: 'center', padding: '0 24px 64px 24px', background: 'var(--bg-canvas)' }}>
        <p style={{ color: 'var(--fg-muted)', fontSize: 14, marginBottom: 20 }}>
          Ready to see your GitHub story?
        </p>
        <button
          onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            padding: '12px 28px', borderRadius: 10, border: '1px solid var(--border-default)',
            background: 'var(--bg-overlay)', color: 'var(--fg-default)', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#58a6ff'; (e.currentTarget as HTMLElement).style.color = '#58a6ff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-default)'; }}
        >
          ↑ Back to top
        </button>
      </div>

      {/* ── Footer ──────────────────────── */}
      <footer style={{ borderTop: '1px solid #21262d', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GithubIcon size={16} />
          <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>GitPulse · Built during 30-day internship</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
