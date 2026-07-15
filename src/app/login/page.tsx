'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const HEATMAP_DATA = [0,0,1,0,2,0,0,3,1,0,0,2,4,3,1,0,2,0,1,3,2,0,0,3,4,0,1,0,2,1,3,0,0,2,1,4,0,3,2,0,1,0,2,3,0,0,4,2,1,0,3,0,2,1,4,0,0,3,2,1,0,4,0,2,1,3,0,0,2,1];
const HEAT_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') router.push('/dashboard');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 28, height: 28, border: '2px solid #30363d', borderTopColor: '#58a6ff', borderRadius: '50%' }} className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top nav bar ─────────────────── */}
      <header style={{ borderBottom: '1px solid #21262d', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#1f6feb,#8957e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GithubIcon size={18} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.02em' }}>GitPulse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#features" style={{ fontSize: 13, color: '#7d8590', textDecoration: 'none' }}>Features</a>
          <a href="#" style={{ fontSize: 13, color: '#7d8590', textDecoration: 'none' }}>Docs</a>
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
          <h1 className="animate-fade-up delay-50" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#e6edf3', marginBottom: 20 }}>
            Your GitHub activity,
            <br />
            <span className="gradient-text">beautifully visualized.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-100" style={{ fontSize: 18, color: '#7d8590', lineHeight: 1.65, marginBottom: 40, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
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
            <p style={{ fontSize: 12, color: '#484f58' }}>No credit card · Only reads public data · Open source</p>
          </div>

          {/* Dashboard preview window */}
          <div className="animate-fade-up delay-300" style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', textAlign: 'left', maxWidth: 800, margin: '0 auto' }}>

            {/* Window chrome */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #21262d', display: 'flex', alignItems: 'center', gap: 8, background: '#1c2128' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: '3px 16px', fontSize: 12, color: '#484f58', minWidth: 200, textAlign: 'center' }}>gitpulse.vercel.app/dashboard</div>
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
                  <div key={s.label} style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: '#7d8590', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Heatmap */}
              <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>Contribution Activity</span>
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
                <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#7d8590', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Language Breakdown</div>
                  {[['TypeScript', '#3178c6', 68], ['Python', '#3572A5', 18], ['Go', '#00ADD8', 14]].map(([lang, color, pct]) => (
                    <div key={String(lang)} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: String(color) }} />
                          <span style={{ fontSize: 12, color: '#e6edf3' }}>{String(lang)}</span>
                        </div>
                        <span style={{ fontSize: 11, color: '#7d8590' }}>{pct}%</span>
                      </div>
                      <div style={{ height: 4, background: '#21262d', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: String(color), borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#7d8590', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Top Repositories</div>
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

      {/* ── Features section ──────────────── */}
      <section id="features" style={{ padding: '80px 24px', borderTop: '1px solid #21262d' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: '#e6edf3', marginBottom: 8, letterSpacing: '-0.02em' }}>Everything you need to understand your GitHub</h2>
          <p style={{ textAlign: 'center', color: '#7d8590', marginBottom: 48, fontSize: 15 }}>Built for developers who care about their craft</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { emoji: '🟩', title: 'Contribution Heatmap', desc: 'Full year of activity visualized in a GitHub-style grid with hover details' },
              { emoji: '📈', title: 'Commit Analytics', desc: 'Bar and area charts showing push frequency over the last 6 months' },
              { emoji: '🔍', title: 'Repo Explorer', desc: 'Search, filter by language, sort by stars, forks, or last updated' },
              { emoji: '🌐', title: 'Language Stats', desc: 'Donut chart breakdown of your codebase by programming language' },
              { emoji: '👤', title: 'Profile Explorer', desc: 'View any public GitHub user profile — search by username' },
              { emoji: '⚡', title: 'Real-time Data', desc: 'Live data from GitHub REST & GraphQL API with intelligent caching' },
            ].map((f) => (
              <div key={f.title} className="card" style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{f.emoji}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#7d8590', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────── */}
      <footer style={{ borderTop: '1px solid #21262d', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GithubIcon size={16} />
          <span style={{ fontSize: 13, color: '#7d8590' }}>GitPulse · Built during 30-day internship</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ fontSize: 13, color: '#7d8590', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ fontSize: 13, color: '#7d8590', textDecoration: 'none' }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
