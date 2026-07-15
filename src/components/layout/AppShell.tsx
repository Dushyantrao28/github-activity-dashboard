import { Navbar } from './Navbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117' }}>
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        {children}
      </main>
    </div>
  );
}
