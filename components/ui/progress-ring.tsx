export function ProgressRing({ done, total }: { done: number; total: number }) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.min(100, Math.round((done / safeTotal) * 100));
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90">
        <circle cx="70" cy="70" r={radius} stroke="#E5E7EB" strokeWidth="14" fill="none" />
        <circle cx="70" cy="70" r={radius} stroke="url(#goodloopGradient)" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} />
        <defs>
          <linearGradient id="goodloopGradient" x1="0" x2="140" y1="0" y2="140">
            <stop stopColor="#35B86B" />
            <stop offset="0.52" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#FF6B6B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-text-primary">{done}</span>
        <span className="text-xs font-semibold text-text-secondary">/ {total}</span>
      </div>
    </div>
  );
}
