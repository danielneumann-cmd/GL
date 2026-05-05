import { Card } from "@/components/ui/card";
import { getBestDay, getProgressInsightKey, getWeeklyReviewScore, type LastSevenDay } from "@/lib/progress-insights";

function formatDate(value: string, locale: "de" | "en") {
  try {
    return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).format(new Date(`${value}T12:00:00`));
  } catch {
    return value;
  }
}

export function WeeklyReviewCard({
  title,
  subtitle,
  scoreLabel,
  bestDayLabel,
  insightLabel,
  weekCount,
  streak,
  activeGoals,
  completedGoals,
  categories,
  lastSevenDays,
  locale,
}: {
  title: string;
  subtitle: string;
  scoreLabel: string;
  bestDayLabel: string;
  insightLabel: Record<"empty" | "started" | "steady" | "strong" | "balanced", string>;
  weekCount: number;
  streak: number;
  activeGoals: number;
  completedGoals: number;
  categories: { healthy: number; move: number; balance: number };
  lastSevenDays: LastSevenDay[];
  locale: "de" | "en";
}) {
  const score = getWeeklyReviewScore(weekCount);
  const bestDay = getBestDay(lastSevenDays);
  const insightKey = getProgressInsightKey({ weekCount, streak, activeGoals, completedGoals, categories });
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="overflow-hidden bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-good-greenDeep">{title}</p>
          <h2 className="text-xl font-extrabold text-text-primary">{subtitle}</h2>
          <p className="text-sm text-text-secondary">{insightLabel[insightKey]}</p>
        </div>

        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#35B86B"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-good-greenDeep">{score}</span>
            <span className="text-[10px] font-bold uppercase text-text-soft">%</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-good-greenSoft p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-good-greenDeep">{scoreLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-good-greenDeep">{weekCount}</p>
        </div>
        <div className="rounded-3xl bg-good-blueSoft p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-good-blueDeep">{bestDayLabel}</p>
          <p className="mt-1 text-lg font-extrabold text-good-blueDeep">
            {bestDay && bestDay.count > 0 ? `${formatDate(bestDay.date, locale)} · ${bestDay.count}` : "–"}
          </p>
        </div>
      </div>
    </Card>
  );
}
