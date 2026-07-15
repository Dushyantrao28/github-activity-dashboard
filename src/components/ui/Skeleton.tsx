import { cn } from '@/lib/utils';

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={cn('shimmer rounded-xl', className)} aria-hidden="true" style={{ background: '#161b22', ...style }} />;
}

export function ProfileCardSkeleton() {
  return (
    <div className="card" style={{ padding: '20px' }}>
      <div className="flex items-start gap-4">
        <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <div className="mt-5 pt-4 grid grid-cols-3 gap-3" style={{ borderTop: '1px solid #21262d' }}>
        {[1,2,3].map(i => (
          <div key={i} className="text-center space-y-1.5">
            <Skeleton className="h-6 w-12 mx-auto" />
            <Skeleton className="h-2.5 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="card" style={{ padding: '16px' }}>
      <Skeleton className="h-4 w-32 mb-3" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-3/4 mb-4" />
      <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid #21262d' }}>
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <Skeleton className="h-4 w-40 mb-1" />
      <Skeleton className="h-3 w-28 mb-5" />
      <Skeleton className="w-full rounded-xl" style={{ height: '220px' }} />
    </div>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <Skeleton className="h-4 w-48 mb-1" />
      <Skeleton className="h-3 w-36 mb-5" />
      <Skeleton className="w-full rounded-xl" style={{ height: '120px' }} />
    </div>
  );
}
