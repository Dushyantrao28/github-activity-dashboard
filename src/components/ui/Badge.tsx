import { cn, getLanguageColor } from '@/lib/utils';

export function Badge({ label, variant = 'default', className }: {
  label: string;
  variant?: 'default' | 'language' | 'success' | 'warning' | 'error';
  className?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(48,54,61,0.6)', color: '#7d8590', border: '1px solid #30363d' },
    success: { background: 'rgba(34,197,94,0.08)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' },
    warning: { background: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' },
    error: { background: 'rgba(248,81,73,0.08)', color: '#f85149', border: '1px solid rgba(248,81,73,0.2)' },
    language: {},
  };
  const color = variant === 'language' ? getLanguageColor(label) : null;
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium', className)}
      style={variant === 'language'
        ? { background: `${color}14`, color: color ?? '#7d8590', border: `1px solid ${color}25` }
        : styles[variant]
      }
    >
      {variant === 'language' && color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
      {label}
    </span>
  );
}
