export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] items-center justify-center px-6">
      <div className="w-full rounded-card border border-app-border bg-white p-6 text-center shadow-card">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-good-greenSoft" />
        <p className="mt-4 text-sm font-extrabold text-text-primary">GoodLoop lädt …</p>
        <p className="mt-1 text-sm text-text-secondary">Einen Moment, dein Fortschritt wird geladen.</p>
      </div>
    </div>
  );
}
