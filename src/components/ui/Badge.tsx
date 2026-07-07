import { cn, getLanguageColor } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'language' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700/60 text-slate-300 border-slate-600/50',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    language: '',
  };

  const color = variant === 'language' ? getLanguageColor(label) : null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {variant === 'language' && color && (
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      )}
      {label}
    </span>
  );
}
