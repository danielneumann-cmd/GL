import { createClient } from "@/lib/supabase/server";
import { getLastDays, getWeekStartISO } from "@/lib/date";

export type GoalLog = {
  id: string;
  user_goal_id: string;
  user_id: string;
  log_date: string;
  status: "done" | "skipped";
};

type GoalCategory = "healthy" | "move" | "balance";

type GoalLogWithGoal = {
  user_goal_id: string;
  user_goals: { category: GoalCategory | null } | Array<{ category: GoalCategory | null }> | null;
};

function normalizeGoalCategory(row: GoalLogWithGoal): GoalCategory | null {
  const goal = Array.isArray(row.user_goals) ? row.user_goals[0] : row.user_goals;
  const category = goal?.category;

  if (category === "healthy" || category === "move" || category === "balance") {
    return category;
  }

  return null;
}

export async function getTodayGoalLogs(): Promise<GoalLog[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("goal_logs")
    .select("id,user_goal_id,user_id,log_date,status")
    .eq("user_id", user.id)
    .eq("log_date", today);

  if (error) throw new Error(error.message);
  return (data ?? []) as GoalLog[];
}

export async function markGoalDoneToday(goalId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("mark_goal_done_today", { goal_uuid: goalId });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function unmarkGoalDoneToday(goalId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("unmark_goal_done_today", { goal_uuid: goalId });
  if (error) throw new Error(error.message);
}

export async function getProgressStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { weekCount: 0, streak: 0, lastSevenDays: [] as Array<{ date: string; count: number }> };
  }

  const weekStart = getWeekStartISO();
  const lastDays = getLastDays(7);

  const { data, error } = await supabase
    .from("goal_logs")
    .select("log_date,status")
    .eq("user_id", user.id)
    .eq("status", "done")
    .gte("log_date", lastDays[0]);

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as Array<{ log_date: string; status: string }>;
  const lastSevenDays = lastDays.map((date) => ({ date, count: rows.filter((row) => row.log_date === date).length }));
  const weekCount = rows.filter((row) => row.log_date >= weekStart).length;

  let streak = 0;
  for (const day of [...lastSevenDays].reverse()) {
    if (day.count > 0) streak += 1;
    else break;
  }

  return { weekCount, streak, lastSevenDays };
}

export async function getCategoryProgressStats(): Promise<Record<GoalCategory, number>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { healthy: 0, move: 0, balance: 0 };

  const weekStart = getWeekStartISO();
  const { data, error } = await supabase
    .from("goal_logs")
    .select("user_goal_id,user_goals(category)")
    .eq("user_id", user.id)
    .eq("status", "done")
    .gte("log_date", weekStart);

  if (error) throw new Error(error.message);

  const counts: Record<GoalCategory, number> = { healthy: 0, move: 0, balance: 0 };
  const rows = (data ?? []) as unknown as GoalLogWithGoal[];

  for (const row of rows) {
    const category = normalizeGoalCategory(row);
    if (category) counts[category] += 1;
  }

  return counts;
}
