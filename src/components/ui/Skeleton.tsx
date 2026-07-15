export function Skeleton({ width, height, borderRadius = 6, style = {} }: { width?: string | number; height?: string | number; borderRadius?: number; style?: React.CSSProperties }) {
  return (
    <div className="skeleton" style={{ width, height, borderRadius, ...style }} />
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
        <Skeleton width={64} height={64} borderRadius={12} />
        <div style={{ flex: 1 }}>
          <Skeleton height={16} style={{ marginBottom: 8, width: '60%' }} />
          <Skeleton height={12} style={{ marginBottom: 8, width: '40%' }} />
          <Skeleton height={12} style={{ width: '80%' }} />
        </div>
      </div>
      <Skeleton height={12} style={{ marginBottom: 6, width: '70%' }} />
      <Skeleton height={12} style={{ marginBottom: 16, width: '50%' }} />
      <div style={{ borderTop: '1px solid #21262d', paddingTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ textAlign: 'center' }}>
            <Skeleton height={20} style={{ marginBottom: 6, width: '60%', margin: '0 auto 6px' }} />
            <Skeleton height={10} style={{ width: '80%', margin: '0 auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <Skeleton height={14} style={{ marginBottom: 10, width: '50%' }} />
      <Skeleton height={12} style={{ marginBottom: 6, width: '100%' }} />
      <Skeleton height={12} style={{ marginBottom: 16, width: '75%' }} />
      <div style={{ borderTop: '1px solid #21262d', paddingTop: 10, display: 'flex', gap: 12 }}>
        <Skeleton height={10} width={60} />
        <Skeleton height={10} width={40} />
        <Skeleton height={10} width={40} />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <Skeleton height={15} style={{ marginBottom: 8, width: '35%' }} />
      <Skeleton height={12} style={{ marginBottom: 24, width: '25%' }} />
      <Skeleton height={220} style={{ borderRadius: 8 }} />
    </div>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="card" style={{ padding: '20px 24px' }}>
      <Skeleton height={15} style={{ marginBottom: 8, width: '40%' }} />
      <Skeleton height={12} style={{ marginBottom: 20, width: '30%' }} />
      <Skeleton height={110} style={{ borderRadius: 8 }} />
    </div>
  );
}
