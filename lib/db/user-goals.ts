import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";
import type { GoalCategory } from "@/lib/db/goal-templates";

export type UserGoalStatus = "active" | "paused" | "completed" | "cancelled";

export type UserGoal = {
  id: string;
  user_id: string;
  template_id: string | null;
  title: string;
  category: GoalCategory;
  duration_days: number;
  start_date: string;
  end_date: string;
  status: UserGoalStatus;
};

export async function getActiveUserGoals(): Promise<UserGoal[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_goals")
    .select("id,user_id,template_id,title,category,duration_days,start_date,end_date,status")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as UserGoal[];
}

export async function getCompletedUserGoals(): Promise<UserGoal[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_goals")
    .select("id,user_id,template_id,title,category,duration_days,start_date,end_date,status")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("updated_at", { ascending: false })
    .limit(10);

  if (error) throw new Error(error.message);
  return (data ?? []) as UserGoal[];
}

export async function startGoalFromTemplate(templateId: string, language: Locale) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("start_goal_from_template", {
    template_uuid: templateId,
    selected_language: language,
  });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function createCustomGoal(title: string, category: GoalCategory, durationDays: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_custom_goal", {
    goal_title: title,
    goal_category: category,
    goal_duration_days: durationDays,
  });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function getPausedUserGoals(): Promise<UserGoal[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_goals")
    .select("id,user_id,template_id,title,category,duration_days,start_date,end_date,status")
    .eq("user_id", user.id)
    .eq("status", "paused")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as UserGoal[];
}

export async function updateUserGoalStatus(goalId: string, status: Extract<UserGoalStatus, "active" | "paused" | "completed" | "cancelled">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("user_goals")
    .update({ status })
    .eq("id", goalId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

export async function getGoalDoneCounts(goalIds: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || goalIds.length === 0) return new Map<string, number>();

  const { data, error } = await supabase
    .from("goal_logs")
    .select("user_goal_id")
    .eq("user_id", user.id)
    .eq("status", "done")
    .in("user_goal_id", goalIds);

  if (error) throw new Error(error.message);

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.user_goal_id, (counts.get(row.user_goal_id) ?? 0) + 1);
  }
  return counts;
}

export async function completeExpiredGoals() {
  const supabase = await createClient();
  await supabase.rpc("complete_expired_goals");
}
