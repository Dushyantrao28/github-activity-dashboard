'use client';

import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { CommitActivity } from '@/types/github';
import { BarChart3, TrendingUp } from 'lucide-react';

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip-dark">
      <div style={{ fontSize: 11, color: '#7d8590', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#58a6ff' }}>{payload[0].value} <span style={{ fontSize: 11, color: '#7d8590', fontWeight: 400 }}>commits</span></div>
    </div>
  );
};

export function CommitChart({ data }: { data: CommitActivity[] }) {
  const [t, setT] = useState<'bar' | 'area'>('bar');
  const total = data.reduce((s, d) => s + d.commits, 0);

  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Commit Frequency</h2>
          <p style={{ fontSize: 13, color: '#7d8590' }}>
            <span style={{ color: '#58a6ff', fontWeight: 600 }}>{total}</span> commits · last 6 months
          </p>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['bar', 'area'] as const).map(type => (
            <button key={type} onClick={() => setT(type)}
              className={t === type ? 'btn btn-primary' : 'btn btn-ghost'}
              style={{ padding: '5px 12px', fontSize: 12, gap: 5 }}
            >
              {type === 'bar' ? <BarChart3 size={13} /> : <TrendingUp size={13} />}
              {type === 'bar' ? 'Bar' : 'Area'}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        {t === 'bar' ? (
          <BarChart data={data} barCategoryGap="35%" barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: '#484f58', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(data.length / 7)} />
            <YAxis tick={{ fill: '#484f58', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<Tip />} cursor={{ fill: 'rgba(88,166,255,0.05)' }} />
            <Bar dataKey="commits" fill="#1f6feb" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1f6feb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1f6feb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: '#484f58', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(data.length / 7)} />
            <YAxis tick={{ fill: '#484f58', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="commits" stroke="#1f6feb" strokeWidth={2} fill="url(#cg)" dot={false} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
