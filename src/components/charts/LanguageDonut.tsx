'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { LanguageStat } from '@/types/github';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
          <span className="text-white font-semibold text-sm">{d.name}</span>
        </div>
        <p className="text-slate-400 text-xs mt-1">{d.percentage}% of codebase</p>
      </div>
    );
  }
  return null;
};

export function LanguageDonut({ data }: { data: LanguageStat[] }) {
  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-white mb-1">Language Breakdown</h2>
      <p className="text-sm text-slate-500 mb-5">Top languages across your repositories</p>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-44 h-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={2}
                dataKey="bytes"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2.5 w-full">
          {data.map((lang) => (
            <div key={lang.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
              <span className="text-sm text-slate-300 flex-1 truncate">{lang.name}</span>
              <span className="text-xs text-slate-500 font-mono">{lang.percentage}%</span>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
