'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GitBranch, BarChart3, Activity, Star, Zap } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const features = [
    { icon: Activity, label: 'Contribution Heatmap', desc: 'Visualize 12 months of activity' },
    { icon: BarChart3, label: 'Commit Analytics', desc: 'Charts powered by Recharts' },
    { icon: GitBranch, label: 'Repo Explorer', desc: 'Filter, sort & search all repos' },
    { icon: Star, label: 'Language Stats', desc: 'Breakdown of your coding languages' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left — Hero */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start px-8 lg:px-16 py-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">GitPulse</span>
          </div>

          {/* Headline */}
          <div className="max-w-xl animate-fade-in delay-100">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your GitHub,{' '}
              <span className="gradient-text">beautifully</span>{' '}
              visualized.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              GitPulse transforms your GitHub data into stunning charts, heatmaps, and insights.
              Track contributions, explore repos, and understand your coding patterns.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((f, i) => (
                <div
                  key={f.label}
                  className={`glass rounded-xl p-4 flex items-start gap-3 card-hover animate-fade-in delay-${(i + 2) * 100}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              id="login-github-btn"
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-base hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <GithubIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              Continue with GitHub
            </button>
            <p className="mt-4 text-xs text-slate-600 text-center sm:text-left">
              Only requests read access to your public GitHub data.
            </p>
          </div>
        </div>

        {/* Right — Preview decoration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-16">
          <div className="w-full max-w-sm space-y-4 animate-fade-in delay-300">
            {/* Mock stat cards */}
            <div className="glass rounded-2xl p-5 card-hover">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Contributions this year</p>
              <p className="text-4xl font-bold gradient-text">1,847</p>
              <div className="mt-3 flex gap-1 flex-wrap">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: ['#161b22','#0e4429','#006d32','#26a641','#39d353'][
                        [0,0,0,1,0,0,2,0,1,3,0,2,4,3,1,0,0,2,3,2,0,1,0,0,3,4,2,0,1,0,2,3,1,0,0][i]
                      ],
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-4 card-hover">
                <p className="text-xs text-slate-500 mb-1">Repositories</p>
                <p className="text-2xl font-bold text-white">42</p>
              </div>
              <div className="glass rounded-2xl p-4 card-hover">
                <p className="text-xs text-slate-500 mb-1">Total Stars</p>
                <p className="text-2xl font-bold text-amber-400">386</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 card-hover">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Top Languages</p>
              <div className="space-y-2">
                {[
                  { lang: 'TypeScript', pct: 68, color: '#3178c6' },
                  { lang: 'Python', pct: 18, color: '#3572A5' },
                  { lang: 'Go', pct: 14, color: '#00ADD8' },
                ].map((l) => (
                  <div key={l.lang} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-xs text-slate-300 flex-1">{l.lang}</span>
                    <span className="text-xs text-slate-500">{l.pct}%</span>
                    <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                      />
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
