export type LastSevenDay = {
  date: string;
  count: number;
};

export type ProgressInsightKey =
  | "empty"
  | "started"
  | "steady"
  | "strong"
  | "balanced";

export function getProgressInsightKey(params: {
  weekCount: number;
  streak: number;
  activeGoals: number;
  completedGoals: number;
  categories: { healthy: number; move: number; balance: number };
}): ProgressInsightKey {
  const { weekCount, streak, activeGoals, completedGoals, categories } = params;
  const activeCategoryCount = [categories.healthy, categories.move, categories.balance].filter((value) => value > 0).length;

  if (weekCount === 0 && activeGoals === 0 && completedGoals === 0) return "empty";
  if (activeCategoryCount >= 3 && weekCount >= 3) return "balanced";
  if (weekCount >= 7 || streak >= 5 || completedGoals >= 2) return "strong";
  if (weekCount >= 3 || streak >= 2) return "steady";
  return "started";
}

export function getWeeklyReviewScore(weekCount: number): number {
  return Math.min(100, Math.round((weekCount / 14) * 100));
}

export function getBestDay(days: LastSevenDay[]): LastSevenDay | null {
  if (days.length === 0) return null;

  return days.reduce<LastSevenDay | null>((best, day) => {
    if (!best || day.count > best.count) return day;
    return best;
  }, null);
}
