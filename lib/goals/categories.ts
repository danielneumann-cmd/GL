import { Activity, Apple, HeartPulse } from "lucide-react";
import type { GoalCategory } from "@/lib/db/goal-templates";

export const goalCategories: GoalCategory[] = ["healthy", "move", "balance"];

export function getCategoryTheme(category: GoalCategory) {
  switch (category) {
    case "healthy":
      return { bg: "bg-good-greenSoft", text: "text-good-greenDeep", accent: "bg-good-green", border: "border-good-green/20", Icon: Apple };
    case "move":
      return { bg: "bg-good-blueSoft", text: "text-good-blueDeep", accent: "bg-good-blue", border: "border-good-blue/20", Icon: Activity };
    case "balance":
      return { bg: "bg-good-coralSoft", text: "text-good-coralDeep", accent: "bg-good-coral", border: "border-good-coral/20", Icon: HeartPulse };
  }
}
