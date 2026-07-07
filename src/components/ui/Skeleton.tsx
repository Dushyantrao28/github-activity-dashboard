import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('shimmer rounded-lg bg-slate-800', className)}
      aria-hidden="true"
    />
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-start gap-5">
        <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[1,2,3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-3 pt-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <Skeleton className="h-6 w-64" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}
