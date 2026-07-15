'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { LanguageStat } from '@/types/github';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{d.name}</span>
      </div>
      <p style={{ fontSize: '11px', color: '#7d8590', marginTop: '4px' }}>{d.percentage}% of codebase</p>
    </div>
  );
};

export function LanguageDonut({ data }: { data: LanguageStat[] }) {
  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <h2 className="text-sm font-semibold mb-1" style={{ color: '#e2e8f0' }}>Language Breakdown</h2>
      <p className="text-xs mb-5" style={{ color: '#7d8590' }}>Top languages across repositories</p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div style={{ width: 140, height: 140, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={46} outerRadius={68} paddingAngle={2} dataKey="bytes" strokeWidth={0}>
                {data.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2.5 w-full">
          {data.map((lang) => (
            <div key={lang.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-xs" style={{ color: '#e2e8f0' }}>{lang.name}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: '#7d8590' }}>{lang.percentage}%</span>
              </div>
              <div className="h-1" style={{ background: '#21262d', borderRadius: '9999px', overflow: 'hidden' }}>
                <div className="h-full rounded-full" style={{ width: `${lang.percentage}%`, backgroundColor: lang.color, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
