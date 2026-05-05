import { Card } from "@/components/ui/card";
import { getCategoryTheme } from "@/lib/goals/categories";
import type { GoalCategory } from "@/lib/db/goal-templates";

export function CategoryCard({ category, title, description }: { category: GoalCategory; title: string; description: string }) {
  const theme = getCategoryTheme(category);
  const Icon = theme.Icon;
  return (
    <Card className={`group border ${theme.border} shadow-soft hover:shadow-card`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] ${theme.bg} ${theme.text} transition-transform duration-200 group-hover:scale-[1.03]`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-black tracking-[-0.02em] text-text-primary">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-text-secondary">{description}</p>
        </div>
      </div>
    </Card>
  );
}
