import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoalIcon } from "@/lib/goals/icons";
import { getCategoryTheme } from "@/lib/goals/categories";
import type { GoalCategory } from "@/lib/db/goal-templates";

export function GoalTemplateCard({ title, description, category, icon, duration, durationLabel, actionLabel, action }: { title: string; description?: string | null; category: GoalCategory; icon?: string | null; duration: number; durationLabel: string; actionLabel: string; action: ReactNode }) {
  const theme = getCategoryTheme(category);
  return (
    <Card className="space-y-4">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.bg} ${theme.text}`}>
          <GoalIcon name={icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-text-primary">{title}</h3>
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
          <p className="mt-2 text-xs font-semibold text-text-soft">{duration} {durationLabel}</p>
        </div>
      </div>
      <div className="flex justify-end">{action ?? <Button>{actionLabel}</Button>}</div>
    </Card>
  );
}
