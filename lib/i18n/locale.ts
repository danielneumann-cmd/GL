import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export async function getRequestLocale(profileLocale?: string | null): Promise<Locale> {
  if (isLocale(profileLocale)) return profileLocale;

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("goodloop-locale")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const headerStore = await headers();
  const acceptedLanguage = headerStore.get("accept-language") ?? "";
  const first = acceptedLanguage.split(",")[0]?.split("-")[0];
  if (isLocale(first)) return first;

  return defaultLocale;
}
