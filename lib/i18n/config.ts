export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "de" || value === "en";
}
