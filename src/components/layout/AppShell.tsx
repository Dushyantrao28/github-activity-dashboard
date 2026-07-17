import { Navbar } from './Navbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', color: 'var(--fg-default)', transition: 'background 0.2s, color 0.2s' }}>
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        {children}
      </main>
    </div>
  );
}
