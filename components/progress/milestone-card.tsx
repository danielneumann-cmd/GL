import { Card } from "@/components/ui/card";

export function MilestoneCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Array<{ label: string; reached: boolean }>;
}) {
  return (
    <Card className="space-y-4 bg-app-surface shadow-none">
      <div>
        <h2 className="text-lg font-extrabold text-text-primary">{title}</h2>
        <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
      </div>

      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3">
            <div className={item.reached ? "flex h-8 w-8 items-center justify-center rounded-full bg-good-green text-white" : "flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-soft"}>
              {item.reached ? "✓" : "·"}
            </div>
            <p className={item.reached ? "text-sm font-bold text-text-primary" : "text-sm font-semibold text-text-secondary"}>{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
