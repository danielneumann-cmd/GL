import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoalIcon } from "@/lib/goals/icons";
import { getCategoryTheme } from "@/lib/goals/categories";
import type { GoalCategory } from "@/lib/db/goal-templates";

export function GoalCard({ title, category, icon, done, doneLabel, markLabel, undoLabel, action }: { title: string; category: GoalCategory; icon?: string | null; done: boolean; doneLabel: string; markLabel: string; undoLabel: string; action?: ReactNode }) {
  const theme = getCategoryTheme(category);
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.bg} ${theme.text}`}>
        {done ? <Check className="h-6 w-6" /> : <GoalIcon name={icon} className="h-6 w-6" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{done ? doneLabel : markLabel}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </Card>
  );
}

export function GoalActionButton({ done, markLabel, undoLabel }: { done: boolean; markLabel: string; undoLabel: string }) {
  return <Button variant={done ? "ghost" : "secondary"} type="submit" className="min-h-10 px-3 py-2 text-xs">{done ? undoLabel : markLabel}</Button>;
}
