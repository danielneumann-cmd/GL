import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GoalIcon } from "@/lib/goals/icons";
import { getCategoryTheme } from "@/lib/goals/categories";
import type { GoalCategory } from "@/lib/db/goal-templates";
import type { ReactNode } from "react";

type ActiveGoalManageCardProps = {
  title: string;
  category: GoalCategory;
  durationDays: number;
  doneDays: number;
  remainingDays: number;
  statusLabel: string;
  progressLabel: string;
  remainingLabel: string;
  icon?: string | null;
  actions: ReactNode;
};

export function ActiveGoalManageCard({ title, category, durationDays, doneDays, remainingDays, statusLabel, progressLabel, remainingLabel, icon, actions }: ActiveGoalManageCardProps) {
  const theme = getCategoryTheme(category);
  const percentage = durationDays > 0 ? Math.min(100, Math.round((doneDays / durationDays) * 100)) : 0;

  return (
    <Card className="space-y-4">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.bg} ${theme.text}`}>
          <GoalIcon name={icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="font-extrabold text-text-primary">{title}</p>
            <span className={`rounded-pill px-3 py-1 text-xs font-extrabold ${theme.bg} ${theme.text}`}>{statusLabel}</span>
          </div>
          <p className="mt-1 text-sm text-text-secondary">{progressLabel}</p>
          <p className="text-xs font-semibold text-text-soft">{remainingLabel}</p>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-app-surface">
        <div className={`h-full ${theme.accent}`} style={{ width: `${percentage}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{actions}</div>
    </Card>
  );
}

export function SmallGoalButton({ children, action, variant = "ghost" }: { children: ReactNode; action: ((formData: FormData) => void | Promise<void>) | (() => void | Promise<void>); variant?: "primary" | "secondary" | "ghost" | "coral" | "blue" }) {
  return (
    <form action={action}>
      <Button type="submit" variant={variant} className="w-full min-h-10 px-3 py-2 text-xs">
        {children}
      </Button>
    </form>
  );
}
