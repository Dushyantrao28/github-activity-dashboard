'use client';

import { useState } from 'react';
import type { ContributionData } from '@/types/github';
import { formatNumber } from '@/lib/utils';

interface Props {
  data: ContributionData;
  username: string;
}

const LEVEL_COLORS = [
  '#161b22',   // 0 - none
  '#0e4429',   // 1 - light
  '#006d32',   // 2 - medium
  '#26a641',   // 3 - high
  '#39d353',   // 4 - highest
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export function ContributionHeatmap({ data, username }: Props) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Contribution Activity</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            <span className="gradient-text font-semibold">{formatNumber(data.totalContributions)}</span>
            {' '}contributions in the last year
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Month labels */}
          <div className="flex mb-2 pl-8">
            {data.weeks.filter((_, i) => i % 4 === 0).map((week) => {
              const month = new Date(week.firstDay).getMonth();
              return (
                <div key={week.firstDay} className="flex-1 text-xs text-slate-600">
                  {MONTHS[month]}
                </div>
              );
            })}
          </div>

          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] pr-2">
              {DAYS.map((day, i) => (
                <div key={day} className="h-[11px] text-[9px] text-slate-600 flex items-center">
                  {i % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            {/* Cells */}
            {data.weeks.map((week, wi) => (
              <div key={week.firstDay} className="flex flex-col gap-[3px]">
                {week.days.map((day) => (
                  <div
                    key={day.date}
                    className="heatmap-cell"
                    style={{
                      width: 11,
                      height: 11,
                      backgroundColor: LEVEL_COLORS[day.level],
                      borderRadius: 2,
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({ date: day.date, count: day.count, x: rect.x, y: rect.y });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-xs text-slate-600">Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{ width: 11, height: 11, backgroundColor: color, borderRadius: 2 }}
              />
            ))}
            <span className="text-xs text-slate-600">More</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white shadow-xl pointer-events-none"
          style={{ left: tooltip.x + 20, top: tooltip.y - 40 }}
        >
          <span className="font-semibold">{tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}</span>
          <br />
          <span className="text-slate-400">{new Date(tooltip.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
}
