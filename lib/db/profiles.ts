import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";

export type Profile = {
  id: string;
  user_id: string;
  display_name: string | null;
  language: Locale;
  visibility: "private" | "friends" | "public";
  onboarding_completed: boolean;
  reminder_enabled: boolean;
  reminder_time: string;
  share_milestones_enabled: boolean;
};

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id,user_id,display_name,language,visibility,onboarding_completed,reminder_enabled,reminder_time,share_milestones_enabled")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Profile | null;
}

export async function updateProfile(input: { displayName?: string; language?: Locale; visibility?: "private" | "friends" | "public"; onboardingCompleted?: boolean; reminderEnabled?: boolean; reminderTime?: string; shareMilestonesEnabled?: boolean }) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const updatePayload: Record<string, unknown> = {};
  if (typeof input.displayName === "string") updatePayload.display_name = input.displayName.trim();
  if (input.language) updatePayload.language = input.language;
  if (input.visibility) updatePayload.visibility = input.visibility;
  if (typeof input.onboardingCompleted === "boolean") updatePayload.onboarding_completed = input.onboardingCompleted;
  if (typeof input.reminderEnabled === "boolean") updatePayload.reminder_enabled = input.reminderEnabled;
  if (typeof input.reminderTime === "string" && /^\d{2}:\d{2}$/.test(input.reminderTime)) updatePayload.reminder_time = input.reminderTime;
  if (typeof input.shareMilestonesEnabled === "boolean") updatePayload.share_milestones_enabled = input.shareMilestonesEnabled;

  const { error } = await supabase
    .from("profiles")
    .update(updatePayload)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  if (input.language) {
    const cookieStore = await cookies();
    cookieStore.set("goodloop-locale", input.language, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
}

export async function getProfileStats() {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return { activeGoals: 0, completedGoals: 0, bestStreak: 0 };

  const [{ count: activeGoals }, { count: completedGoals }] = await Promise.all([
    supabase.from("user_goals").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active"),
    supabase.from("user_goals").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "completed"),
  ]);

  return { activeGoals: activeGoals ?? 0, completedGoals: completedGoals ?? 0, bestStreak: 0 };
}
