'use client';

import { useEffect, useState } from 'react';

const DARK_VARS: Record<string, string> = {
  '--bg-canvas':      '#0d1117',
  '--bg-overlay':     '#161b22',
  '--bg-subtle':      '#1c2128',
  '--border-default': '#30363d',
  '--border-muted':   '#21262d',
  '--fg-default':     '#e6edf3',
  '--fg-muted':       '#7d8590',
  '--fg-subtle':      '#484f58',
  '--accent-blue':    '#58a6ff',
  '--accent-blue-dk': '#388bfd',
  '--accent-green':   '#3fb950',
  '--accent-purple':  '#bc8cff',
  '--accent-orange':  '#e3b341',
  '--accent-red':     '#f85149',
};

const LIGHT_VARS: Record<string, string> = {
  '--bg-canvas':      '#ffffff',
  '--bg-overlay':     '#f6f8fa',
  '--bg-subtle':      '#eaeef2',
  '--border-default': '#d0d7de',
  '--border-muted':   '#e1e4e8',
  '--fg-default':     '#1f2328',
  '--fg-muted':       '#656d76',
  '--fg-subtle':      '#9198a1',
  '--accent-blue':    '#0969da',
  '--accent-blue-dk': '#0550ae',
  '--accent-green':   '#1a7f37',
  '--accent-purple':  '#8250df',
  '--accent-orange':  '#9a6700',
  '--accent-red':     '#d1242f',
};

function applyTheme(theme: 'dark' | 'light') {
  const vars = theme === 'light' ? LIGHT_VARS : DARK_VARS;
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('gitpulse-theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem('gitpulse-theme', next);
  };

  return { theme, toggle };
}
