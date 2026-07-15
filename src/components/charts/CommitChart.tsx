'use client';

import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { CommitActivity } from '@/types/github';
import { BarChart3, TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <p style={{ fontSize: '11px', color: '#7d8590', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 700, color: '#38bdf8' }}>{payload[0].value} <span style={{ fontSize: '11px', fontWeight: 400, color: '#7d8590' }}>commits</span></p>
    </div>
  );
};

export function CommitChart({ data }: { data: CommitActivity[] }) {
  const [type, setType] = useState<'bar' | 'area'>('bar');
  const total = data.reduce((s, d) => s + d.commits, 0);

  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Commit Frequency</h2>
          <p className="text-xs mt-1" style={{ color: '#7d8590' }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>{total}</span> commits · last 6 months
          </p>
        </div>
        <div className="flex gap-1.5">
          {(['bar', 'area'] as const).map((t) => (
            <button key={t} onClick={() => setType(t)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={type === t
                ? { background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }
                : { background: 'transparent', color: '#7d8590', border: '1px solid transparent' }
              }
            >
              {t === 'bar' ? <BarChart3 size={13} /> : <TrendingUp size={13} />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {type === 'bar' ? (
          <BarChart data={data} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: '#3d444d', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(data.length / 7)} />
            <YAxis tick={{ fill: '#3d444d', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(56,189,248,0.04)' }} />
            <Bar dataKey="commits" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: '#3d444d', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(data.length / 7)} />
            <YAxis tick={{ fill: '#3d444d', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="commits" stroke="#38bdf8" strokeWidth={2} fill="url(#cg)" dot={false} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
