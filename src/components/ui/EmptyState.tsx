import { LucideIcon, PackageOpen } from 'lucide-react';

export function EmptyState({ icon: Icon = PackageOpen, title, description, action }: {
  icon?: LucideIcon; title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-4 text-center" style={{ padding: '48px 24px' }}>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
        <Icon size={22} style={{ color: '#3d444d' }} />
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{title}</p>
        {description && <p className="text-xs mt-1" style={{ color: '#7d8590', maxWidth: '260px' }}>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
