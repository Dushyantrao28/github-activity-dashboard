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
    <div className="card" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AlertTriangle size={18} style={{ color: '#f85149' }} />
      </div>
      <div>
        <p style={{ fontWeight: 600, color: 'var(--fg-default)', marginBottom: 4 }}>Failed to load data</p>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 280 }}>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary" style={{ padding: '7px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
          <RefreshCw size={13} /> Retry
        </button>
      )}
    </div>
  );
}
