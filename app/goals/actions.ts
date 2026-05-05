"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { startGoalFromTemplate, createCustomGoal, updateUserGoalStatus } from "@/lib/db/user-goals";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getRequestLocale } from "@/lib/i18n/locale";
import type { GoalCategory } from "@/lib/db/goal-templates";

function refreshGoalViews() {
  revalidatePath("/goals");
  revalidatePath("/home");
  revalidatePath("/progress");
  revalidatePath("/profile");
}

export async function startTemplateGoalAction(templateId: string) {
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  await startGoalFromTemplate(templateId, locale);
  refreshGoalViews();
  redirect("/home");
}

export async function createCustomGoalAction(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const category = String(formData.get("category") ?? "healthy") as GoalCategory;
  const durationDays = Number(formData.get("durationDays") ?? 7);
  await createCustomGoal(title, category, durationDays);
  refreshGoalViews();
  redirect("/home");
}

export async function pauseGoalAction(goalId: string) {
  await updateUserGoalStatus(goalId, "paused");
  refreshGoalViews();
}

export async function resumeGoalAction(goalId: string) {
  await updateUserGoalStatus(goalId, "active");
  refreshGoalViews();
}

export async function completeGoalAction(goalId: string) {
  await updateUserGoalStatus(goalId, "completed");
  refreshGoalViews();
}

export async function cancelGoalAction(goalId: string) {
  await updateUserGoalStatus(goalId, "cancelled");
  refreshGoalViews();
}
