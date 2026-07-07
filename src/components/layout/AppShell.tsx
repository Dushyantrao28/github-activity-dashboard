import { Navbar } from './Navbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}
