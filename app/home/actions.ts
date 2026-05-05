"use server";

import { revalidatePath } from "next/cache";
import { markGoalDoneToday, unmarkGoalDoneToday } from "@/lib/db/goal-logs";

export async function markDoneAction(goalId: string) {
  await markGoalDoneToday(goalId);
  revalidatePath("/home");
  revalidatePath("/progress");
}

export async function undoDoneAction(goalId: string) {
  await unmarkGoalDoneToday(goalId);
  revalidatePath("/home");
  revalidatePath("/progress");
}
