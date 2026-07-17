'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { BookOpen, Code, Sparkles, Shield } from 'lucide-react';

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function DocsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── Top nav bar ─────────────────── */}
      <header style={{ borderBottom: '1px solid var(--border-muted)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#1f6feb,#8957e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <GithubIcon size={18} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg-default)', letterSpacing: '-0.02em' }}>GitPulse</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/login" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>Home</Link>
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="btn btn-github"
            style={{ padding: '6px 16px', fontSize: 13, borderRadius: 8 }}
          >
            <GithubIcon size={15} /> Sign in
          </button>
        </div>
      </header>

      {/* ── Main Content ─────────────────── */}
      <main style={{ flex: 1, maxWidth: 800, margin: '0 auto', padding: '64px 24px', width: '100%' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--fg-default)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Documentation
        </h1>
        <p style={{ fontSize: 18, color: 'var(--fg-muted)', marginBottom: 48, lineHeight: 1.6 }}>
          Everything you need to know about GitPulse, how it connects to your GitHub data, and how to get the most out of our features.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: 8, borderRadius: 8, background: 'rgba(31,111,235,0.1)', color: '#58a6ff' }}>
                <BookOpen size={20} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--fg-default)' }}>What is GitPulse?</h2>
            </div>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, fontSize: 15 }}>
              GitPulse is a developer-focused analytics dashboard that visualizes your GitHub profile data in beautiful, easy-to-read charts. It was built to solve the problem of hard-to-parse commit histories and scattered repository statistics. With GitPulse, your impact as a developer is immediately clear.
            </p>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: 8, borderRadius: 8, background: 'rgba(63,185,80,0.1)', color: '#3fb950' }}>
                <Code size={20} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--fg-default)' }}>Core Features</h2>
            </div>
            <ul style={{ color: 'var(--fg-muted)', lineHeight: 1.7, fontSize: 15, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><strong>Contribution Heatmap:</strong> A visual grid showing your commit density over the past 365 days, modeled after GitHub's iconic graph but with richer data tooltips.</li>
              <li><strong>Language Breakdown:</strong> A precise percentage split of all programming languages used across your public repositories.</li>
              <li><strong>Top Repositories:</strong> Instantly sorts your repositories by star count, forks, and recent activity, allowing you to highlight your best work.</li>
            </ul>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: 8, borderRadius: 8, background: 'rgba(137,87,229,0.1)', color: '#bc8cff' }}>
                <Sparkles size={20} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--fg-default)' }}>AI Repository Summaries</h2>
            </div>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, fontSize: 15, marginBottom: 16 }}>
              GitPulse integrates with Google's Gemini AI to automatically read and summarize your repository's README and codebase structure.
            </p>
            <div style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-muted)', padding: 20, borderRadius: 12 }}>
              <h4 style={{ color: 'var(--fg-default)', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>How to use it:</h4>
              <ol style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6, paddingLeft: 20, margin: 0 }}>
                <li>Navigate to any repository card in your dashboard or on the <code>/repos</code> page.</li>
                <li>Click the <strong>✨ AI Summary</strong> button at the bottom of the card.</li>
                <li>Wait a few seconds while the AI analyzes your README.md.</li>
                <li>Review the generated summary, tech stack, and key features!</li>
              </ol>
            </div>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: 8, borderRadius: 8, background: 'rgba(210,153,34,0.1)', color: '#d29922' }}>
                <Shield size={20} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--fg-default)' }}>Privacy & Security</h2>
            </div>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, fontSize: 15 }}>
              We take your data seriously. GitPulse <strong>only requests read access to your public GitHub data</strong>. We do not ask for, nor do we have access to, your private repositories, source code, or organization secrets. The application is completely open-source, so you can verify exactly what data is being fetched and how it's being used.
            </p>
          </section>

        </div>
      </main>

      {/* ── Footer ──────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border-muted)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GithubIcon size={16} />
          <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>GitPulse · Built during 30-day internship</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/login" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>Home</Link>
          <a href="https://github.com/Dushyantrao28/github-activity-dashboard" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
