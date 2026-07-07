import { LucideIcon, PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon = PackageOpen, title, description, action }: EmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <div>
        <p className="text-white font-semibold text-lg">{title}</p>
        {description && <p className="text-slate-500 text-sm mt-2 max-w-xs">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
