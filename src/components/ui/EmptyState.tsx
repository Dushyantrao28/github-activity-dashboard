import { LucideIcon, PackageOpen } from 'lucide-react';

export function EmptyState({ icon: Icon = PackageOpen, title, description, action }: {
  icon?: LucideIcon; title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div className="card" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-subtle)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={22} style={{ color: 'var(--fg-subtle)' }} />
      </div>
      <div>
        <p style={{ fontWeight: 600, color: 'var(--fg-default)', marginBottom: 4 }}>{title}</p>
        {description && <p style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 280 }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
