"use server";

import { redirect } from "next/navigation";
import { updateProfile } from "@/lib/db/profiles";
import { startGoalFromTemplate } from "@/lib/db/user-goals";
import { isLocale } from "@/lib/i18n/config";

export async function onboardingAction(formData: FormData) {
  const displayName = String(formData.get("displayName") ?? "");
  const languageRaw = String(formData.get("language") ?? "de");
  const language = isLocale(languageRaw) ? languageRaw : "de";
  const templateId = String(formData.get("templateId") ?? "");

  await updateProfile({ displayName, language, onboardingCompleted: true });
  if (templateId) await startGoalFromTemplate(templateId, language);
  redirect("/home");
}
