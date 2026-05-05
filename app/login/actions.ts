"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isLocale } from "@/lib/i18n/config";

export async function loginAction(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/");
}

export async function registerAction(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "");
  const languageRaw = String(formData.get("language") ?? "de");
  const language = isLocale(languageRaw) ? languageRaw : "de";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName, language } },
  });

  const cookieStore = await cookies();
  cookieStore.set("goodloop-locale", language, { path: "/", maxAge: 60 * 60 * 24 * 365 });

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?registered=1");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
