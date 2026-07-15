'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Activity, GitBranch, BarChart3, Star, TrendingUp } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const features = [
  { icon: Activity, label: 'Contribution Heatmap', desc: 'Full year of activity at a glance', color: '#38bdf8' },
  { icon: BarChart3, label: 'Commit Analytics', desc: 'Weekly push event frequency charts', color: '#818cf8' },
  { icon: GitBranch, label: 'Repo Explorer', desc: 'Filter, sort & search repositories', color: '#c084fc' },
  { icon: Star, label: 'Language Stats', desc: 'Breakdown across all your repos', color: '#fb923c' },
];

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') router.push('/dashboard');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#38bdf8', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: '#7d8590' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app overflow-hidden relative flex">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute" style={{ top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div className="absolute" style={{ bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(192,132,252,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        {/* ─── Left Panel ──────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 max-w-2xl mx-auto lg:mx-0">

          {/* Brand */}
          <div className="flex items-center gap-3 mb-12 animate-fade-up">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}>
              <TrendingUp size={18} color="white" />
            </div>
            <span className="text-lg font-bold" style={{ color: '#e2e8f0' }}>Git<span className="gradient-text">Pulse</span></span>
          </div>

          {/* Headline */}
          <div className="animate-fade-up delay-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)', color: '#38bdf8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Internship Project — Day 18 of 30
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>
              Your GitHub,<br />
              <span className="gradient-text">beautifully</span> analyzed.
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: '#7d8590', maxWidth: '440px' }}>
              GitPulse turns your GitHub data into stunning charts, heatmaps, and insights. Understand your coding patterns like never before.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 animate-fade-up delay-200">
            {features.map((f) => (
              <div key={f.label} className="flex items-start gap-3 p-4 rounded-xl card-hover" style={{ background: 'rgba(13,17,23,0.6)', border: '1px solid #21262d' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}14`, border: `1px solid ${f.color}25` }}>
                  <f.icon size={15} style={{ color: f.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{f.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7d8590' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-300">
            <button
              id="login-github-btn"
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="btn-primary w-full sm:w-auto"
            >
              <GithubIcon className="w-5 h-5" />
              Continue with GitHub
            </button>
            <p className="mt-4 text-xs" style={{ color: '#3d444d' }}>
              Only requests read access to public GitHub data. No writing.
            </p>
          </div>
        </div>

        {/* ─── Right Panel — Preview ──────────── */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 xl:p-20">
          <div className="w-full max-w-sm space-y-4 animate-fade-up delay-200">

            {/* Heatmap preview card */}
            <div className="card p-5" style={{ border: '1px solid #30363d' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-medium section-label">Contributions</p>
                  <p className="text-2xl font-bold mt-1 gradient-text">1,847</p>
                </div>
                <div className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>+12% this year</div>
              </div>
              <div className="flex gap-[3px] flex-wrap">
                {Array.from({ length: 70 }).map((_, i) => {
                  const levels = [0,0,1,0,0,2,0,1,3,0,2,4,3,1,0,0,2,3,2,0,1,0,0,3,4,2,0,1,0,2,3,1,0,0,1,2,0,0,3,1,0,4,0,2,1,3,0,0,2,1,4,3,0,1,0,2,0,3,1,0,2,4,1,0,0,3,2,1,0,0];
                  const colors = ['#161b22','#0e4429','#006d32','#26a641','#39d353'];
                  return <div key={i} className="w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: colors[levels[i]] }} />;
                })}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Repositories', value: '42', color: '#38bdf8' },
                { label: 'Total Stars', value: '386', color: '#f59e0b' },
                { label: 'Followers', value: '219', color: '#c084fc' },
              ].map((s) => (
                <div key={s.label} className="card p-3 text-center" style={{ border: '1px solid #30363d' }}>
                  <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#7d8590' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Language bars */}
            <div className="card p-4" style={{ border: '1px solid #30363d' }}>
              <p className="text-xs font-medium section-label mb-4">Top Languages</p>
              <div className="space-y-3">
                {[
                  { lang: 'TypeScript', pct: 68, color: '#3178c6' },
                  { lang: 'Python', pct: 18, color: '#3572A5' },
                  { lang: 'Go', pct: 14, color: '#00ADD8' },
                ].map((l) => (
                  <div key={l.lang}>
                    <div className="flex justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                        <span className="text-xs" style={{ color: '#e2e8f0' }}>{l.lang}</span>
                      </div>
                      <span className="text-xs" style={{ color: '#7d8590' }}>{l.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: '#21262d' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${l.pct}%`, backgroundColor: l.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
