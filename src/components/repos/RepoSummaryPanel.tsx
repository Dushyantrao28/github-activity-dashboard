'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, Loader2, X, Cpu, Layers, Zap } from 'lucide-react';

interface AISummary {
  summary: string;
  technologies: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  features: string[];
}

const COMPLEXITY_COLOR: Record<string, string> = {
  Simple: '#3fb950',
  Medium: '#e3b341',
  Complex: '#ff7b72',
};

interface Props {
  repoFullName: string;
  repoName: string;
  description: string | null;
  language: string | null;
  topics: string[];
}

export function RepoSummaryPanel({ repoFullName, repoName, description, language, topics }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AISummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (data) { setOpen(true); return; }
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: repoFullName,
          repoName,
          description,
          language,
          topics,
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error ?? 'Failed to generate summary');
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!data) return;
    const text = `${data.summary}\n\nMain Technologies: ${data.technologies.join(', ')}\nComplexity: ${data.complexity}\n\nMajor Features:\n${data.features.map(f => `• ${f}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const complexityColor = data ? (COMPLEXITY_COLOR[data.complexity] ?? '#7d8590') : '#7d8590';

  return (
    <div>
      {/* Trigger button */}
      <button
        onClick={generate}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
          background: 'rgba(188,140,255,0.1)', border: '1px solid rgba(188,140,255,0.3)',
          color: '#bc8cff', cursor: 'pointer', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(188,140,255,0.2)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(188,140,255,0.1)'; }}
      >
        <Sparkles size={11} />
        AI Summary
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          marginTop: 12, borderRadius: 10,
          background: 'var(--bg-subtle)', border: '1px solid rgba(188,140,255,0.25)',
          overflow: 'hidden', animation: 'fadeUp 0.25s ease both',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderBottom: '1px solid var(--border-muted)',
            background: 'rgba(188,140,255,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={12} style={{ color: '#bc8cff' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#bc8cff' }}>AI Repository Summary</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {data && (
                <button onClick={copyToClipboard} title="Copy summary"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 4 }}
                >
                  {copied ? <Check size={13} style={{ color: '#3fb950' }} /> : <Copy size={13} />}
                </button>
              )}
              <button onClick={() => setOpen(false)} title="Close"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 4 }}
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '14px 16px', fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace" }}>
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#bc8cff', fontSize: 13 }}>
                  <Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} />
                  Analyzing repository with Gemini AI...
                </div>
                {[80, 60, 70, 55, 65].map((w, i) => (
                  <div key={i} className="skeleton" style={{ height: 12, borderRadius: 4, width: `${w}%` }} />
                ))}
              </div>
            )}

            {error && (
              <div style={{ color: '#ff7b72', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚠️</span> {error}
                {error.includes('not configured') && (
                  <span style={{ color: 'var(--fg-muted)', fontSize: 12, display: 'block', marginTop: 6 }}>
                    Add GEMINI_API_KEY to Vercel environment variables.
                  </span>
                )}
              </div>
            )}

            {data && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Summary sentence */}
                <p style={{ fontSize: 13, color: 'var(--fg-default)', lineHeight: 1.55, margin: 0 }}>
                  {data.summary}
                </p>

                {/* Technologies */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                    <Cpu size={12} style={{ color: '#58a6ff' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#58a6ff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Main Technologies</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {data.technologies.map(t => (
                      <span key={t} style={{
                        fontSize: 12, padding: '2px 8px', borderRadius: 4,
                        background: 'rgba(88,166,255,0.1)', color: '#58a6ff',
                        border: '1px solid rgba(88,166,255,0.2)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <Layers size={12} style={{ color: complexityColor }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: complexityColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Complexity</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: complexityColor }}>{data.complexity}</span>
                    <div style={{ flex: 1, height: 4, background: 'var(--border-muted)', borderRadius: 2, maxWidth: 120 }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: complexityColor,
                        width: data.complexity === 'Simple' ? '33%' : data.complexity === 'Medium' ? '66%' : '100%',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                    <Zap size={12} style={{ color: '#e3b341' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#e3b341', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Major Features</span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {data.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--fg-muted)' }}>
                        <span style={{ color: '#e3b341', marginTop: 1, flexShrink: 0 }}>•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
