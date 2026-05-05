import { Card } from "@/components/ui/card";

export function QuoteCard({ title, quote, author }: { title: string; quote?: string; author?: string | null }) {
  if (!quote) return null;
  return (
    <Card className="bg-app-surface shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-soft">{title}</p>
      <blockquote className="mt-3 text-base font-semibold leading-relaxed text-text-primary">„{quote}“</blockquote>
      {author ? <p className="mt-3 text-sm text-text-secondary">{author}</p> : null}
    </Card>
  );
}
