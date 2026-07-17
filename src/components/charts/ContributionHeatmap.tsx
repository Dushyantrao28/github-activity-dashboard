'use client';

import { useState } from 'react';
import type { ContributionData } from '@/types/github';
import { formatNumber } from '@/lib/utils';

const LEVELS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function ContributionHeatmap({ data, username }: { data: ContributionData; username: string }) {
  const [tip, setTip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Contribution Activity</h2>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
            <span style={{ color: '#3fb950', fontWeight: 600 }}>{formatNumber(data.totalContributions)}</span> contributions in the last year
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--fg-subtle)' }}>Less</span>
          {LEVELS.map((c, i) => <div key={i} style={{ width: 12, height: 12, background: c, borderRadius: 3 }} />)}
          <span style={{ fontSize: 11, color: 'var(--fg-subtle)' }}>More</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 720 }}>
          {/* Month labels */}
          <div style={{ display: 'flex', paddingLeft: 28, marginBottom: 4 }}>
            {data.weeks.filter((_, i) => i % 4 === 0).map((w, i) => (
              <div key={i} style={{ flex: 1, fontSize: 10, color: 'var(--fg-subtle)' }}>{MONTHS[new Date(w.firstDay).getMonth()]}</div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 3 }}>
            {/* Day labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingRight: 4, paddingTop: 1 }}>
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <div key={i} style={{ height: 12, fontSize: 9, color: 'var(--fg-subtle)', lineHeight: '12px' }}>{d}</div>
              ))}
            </div>
            {/* Grid */}
            {data.weeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {week.days.map((day) => (
                  <div key={day.date} className="heatmap-cell"
                    style={{ width: 12, height: 12, background: LEVELS[day.level] }}
                    onMouseEnter={e => { const r = e.currentTarget.getBoundingClientRect(); setTip({ date: day.date, count: day.count, x: r.left, y: r.top }); }}
                    onMouseLeave={() => setTip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {tip && (
        <div className="tooltip-dark" style={{ position: 'fixed', zIndex: 999, left: tip.x + 14, top: tip.y - 50, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          <div style={{ fontWeight: 600, color: 'var(--fg-default)' }}>{tip.count} contribution{tip.count !== 1 ? 's' : ''}</div>
          <div style={{ color: 'var(--fg-muted)', marginTop: 2 }}>{new Date(tip.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
        </div>
      )}
    </div>
  );
}
