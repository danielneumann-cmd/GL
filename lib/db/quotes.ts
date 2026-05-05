import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";

export type Quote = {
  id: string;
  quote_text: string;
  author: string | null;
};

export async function getWeeklyQuote(locale: Locale): Promise<Quote | null> {
  const supabase = await createClient();
  const week = getCurrentWeekNumber();

  const { data, error } = await supabase
    .from("quotes")
    .select("id,quote_text,author")
    .eq("language", locale)
    .eq("is_active", true)
    .or(`display_week.eq.${week},display_week.is.null`)
    .order("display_week", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return null;
  return data as Quote | null;
}

function getCurrentWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = Number(now) - Number(start);
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.max(1, Math.ceil((diff + start.getDay() * 86400000) / oneWeek));
}
