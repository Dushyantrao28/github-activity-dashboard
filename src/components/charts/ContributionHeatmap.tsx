'use client';

import { useState } from 'react';
import type { ContributionData } from '@/types/github';
import { formatNumber } from '@/lib/utils';

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['','Mon','','Wed','','Fri',''];

export function ContributionHeatmap({ data, username }: { data: ContributionData; username: string }) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Contribution Activity</h2>
          <p className="text-xs mt-1" style={{ color: '#7d8590' }}>
            <span className="font-semibold" style={{ color: '#39d353' }}>{formatNumber(data.totalContributions)}</span>{' '}contributions in the last year
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]" style={{ color: '#3d444d' }}>Less</span>
          {LEVEL_COLORS.map((c, i) => (
            <div key={i} className="w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[10px]" style={{ color: '#3d444d' }}>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: '700px' }}>
          {/* Month labels */}
          <div className="flex mb-2" style={{ paddingLeft: '28px' }}>
            {data.weeks.filter((_, i) => i % 4 === 0).map((week) => (
              <div key={week.firstDay} className="flex-1 text-[10px]" style={{ color: '#3d444d' }}>
                {MONTHS[new Date(week.firstDay).getMonth()]}
              </div>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] pr-2">
              {DAYS.map((day, i) => (
                <div key={i} className="flex items-center" style={{ height: '11px', fontSize: '9px', color: '#3d444d' }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            {data.weeks.map((week) => (
              <div key={week.firstDay} className="flex flex-col gap-[3px]">
                {week.days.map((day) => (
                  <div
                    key={day.date}
                    className="heatmap-cell"
                    style={{ width: 11, height: 11, backgroundColor: LEVEL_COLORS[day.level] }}
                    onMouseEnter={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      setTooltip({ date: day.date, count: day.count, x: r.left, y: r.top });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {tooltip && (
        <div className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x + 16,
            top: tooltip.y - 44,
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: '#e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontWeight: 600 }}>{tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}</span><br />
          <span style={{ color: '#7d8590' }}>{new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
}
