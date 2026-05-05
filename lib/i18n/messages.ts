import de from "@/messages/de.json";
import en from "@/messages/en.json";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

type Dictionary = typeof de;
const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function createTranslator(locale: Locale) {
  const dict = getDictionary(locale) as Record<string, unknown>;

  return function t(key: string, values?: Record<string, string | number>) {
    const value = key.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, dict);

    let text = typeof value === "string" ? value : key;

    if (values) {
      Object.entries(values).forEach(([name, replacement]) => {
        text = text.replaceAll(`{${name}}`, String(replacement));
      });
    }

    return text;
  };
}
