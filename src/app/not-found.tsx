import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h2 className="text-2xl font-bold text-white mb-3">Page not found</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          The page you're looking for doesn't exist or the GitHub user wasn't found.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/repos"
            className="flex items-center gap-2 px-5 py-2.5 glass border border-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Search className="w-4 h-4" />
            Explore Repos
          </Link>
        </div>
      </div>
    </div>
  );
}
