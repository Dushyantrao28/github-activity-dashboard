import { Navbar } from './Navbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app">
      <Navbar />
      <main style={{ paddingTop: '58px' }}>
        {children}
      </main>
    </div>
  );
}
