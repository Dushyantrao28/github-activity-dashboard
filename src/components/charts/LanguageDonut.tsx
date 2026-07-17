'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { LanguageStat } from '@/types/github';

const Tip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="tooltip-dark">
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }} />
        <span style={{ fontWeight: 600, color: 'var(--fg-default)' }}>{d.name}</span>
      </div>
      <div style={{ color: 'var(--fg-muted)', fontSize: 12, marginTop: 4 }}>{d.percentage}% of codebase</div>
    </div>
  );
};

export function LanguageDonut({ data }: { data: LanguageStat[] }) {
  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Language Breakdown</h2>
      <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 20 }}>Distribution across your repositories</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 130, height: 130, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={2} dataKey="bytes" strokeWidth={0}>
                {data.map(e => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1 }}>
          {data.map(lang => (
            <div key={lang.name} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: lang.color }} />
                  <span style={{ fontSize: 13, color: 'var(--fg-default)' }}>{lang.name}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'monospace' }}>{lang.percentage}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--border-muted)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${lang.percentage}%`, background: lang.color, borderRadius: 2, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
