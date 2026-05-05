import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoalIcon } from "@/lib/goals/icons";
import { getCategoryTheme } from "@/lib/goals/categories";
import type { GoalCategory } from "@/lib/db/goal-templates";

export function GoalCard({
  title,
  category,
  icon,
  done,
  doneLabel,
  markLabel,
  undoLabel,
  action,
}: {
  title: string;
  category: GoalCategory;
  icon?: string | null;
  done: boolean;
  doneLabel: string;
  markLabel: string;
  undoLabel: string;
  action?: ReactNode;
}) {
  const theme = getCategoryTheme(category);
  return (
    <Card className={done ? "border-good-green/20 bg-good-greenSoft/65 shadow-soft" : "hover:shadow-[0_22px_52px_rgba(31,41,51,0.10)]"}>
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] ${done ? "bg-white text-good-greenDeep" : `${theme.bg} ${theme.text}`} shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]`}>
          {done ? <Check className="h-6 w-6" /> : <GoalIcon name={icon} className="h-6 w-6" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-extrabold tracking-[-0.01em] text-text-primary">{title}</p>
          <p className="mt-0.5 text-sm font-medium text-text-secondary">{done ? doneLabel : markLabel}</p>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </Card>
  );
}

export function GoalActionButton({ done, markLabel, undoLabel }: { done: boolean; markLabel: string; undoLabel: string }) {
  return (
    <Button variant={done ? "ghost" : "secondary"} type="submit" className="min-h-10 px-3 py-2 text-xs">
      {done ? undoLabel : markLabel}
    </Button>
  );
}
