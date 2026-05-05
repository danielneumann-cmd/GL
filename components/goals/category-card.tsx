import { Card } from "@/components/ui/card";
import { getCategoryTheme } from "@/lib/goals/categories";
import type { GoalCategory } from "@/lib/db/goal-templates";

export function CategoryCard({ category, title, description }: { category: GoalCategory; title: string; description: string }) {
  const theme = getCategoryTheme(category);
  const Icon = theme.Icon;
  return (
    <Card className={`border ${theme.border}`}>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bg} ${theme.text}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-extrabold text-text-primary">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary">{description}</p>
    </Card>
  );
}
