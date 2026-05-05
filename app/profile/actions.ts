"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/lib/db/profiles";
import type { Locale } from "@/lib/i18n/config";

export async function updateProfileAction(formData: FormData) {
  const displayName = String(formData.get("displayName") ?? "");
  const language = String(formData.get("language") ?? "de") as Locale;
  const visibility = String(formData.get("visibility") ?? "private") as "private" | "friends" | "public";
  const reminderEnabled = formData.get("reminderEnabled") === "on";
  const reminderTime = String(formData.get("reminderTime") ?? "09:00");
  const shareMilestonesEnabled = formData.get("shareMilestonesEnabled") === "on";

  await updateProfile({ displayName, language, visibility, reminderEnabled, reminderTime, shareMilestonesEnabled });
  revalidatePath("/profile");
  revalidatePath("/home");
  redirect("/profile");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
