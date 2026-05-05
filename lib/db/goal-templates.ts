import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";

export type GoalCategory = "healthy" | "move" | "balance";

export type GoalTemplate = {
  id: string;
  slug: string;
  title_de: string;
  title_en: string;
  category: GoalCategory;
  description_de: string | null;
  description_en: string | null;
  default_duration_days: number;
  icon: string | null;
  sort_order: number;
};

export async function getGoalTemplates(): Promise<GoalTemplate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("goal_templates")
    .select("id,slug,title_de,title_en,category,description_de,description_en,default_duration_days,icon,sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as GoalTemplate[];
}

export function localizeTemplate(template: GoalTemplate, locale: Locale) {
  return {
    id: template.id,
    slug: template.slug,
    title: locale === "en" ? template.title_en : template.title_de,
    description: locale === "en" ? template.description_en : template.description_de,
    category: template.category,
    durationDays: template.default_duration_days,
    icon: template.icon,
  };
}
