'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props { children: React.ReactNode; fallback?: React.ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorCard message={this.state.error?.message ?? 'Unknown error'} onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

export function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-4 text-center" style={{ padding: '40px 24px' }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.2)' }}>
        <AlertTriangle size={18} style={{ color: '#f85149' }} />
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Failed to load</p>
        <p className="text-xs mt-1" style={{ color: '#7d8590', maxWidth: '240px' }}>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
          <RefreshCw size={13} /> Try again
        </button>
      )}
    </div>
  );
}
