import { Activity, Apple, Cookie, Droplet, Footprints, Moon, Salad, Smartphone, Soup, StretchHorizontal, Utensils, WineOff, ZapOff } from "lucide-react";

const iconMap = {
  apple: Apple,
  salad: Salad,
  droplet: Droplet,
  utensils: Utensils,
  cookie: Cookie,
  footprints: Footprints,
  activity: Activity,
  walk: Footprints,
  stretch: StretchHorizontal,
  stairs: Activity,
  "zap-off": ZapOff,
  "wine-off": WineOff,
  "cup-soda": Soup,
  smartphone: Smartphone,
  moon: Moon,
};

export function GoalIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = name && name in iconMap ? iconMap[name as keyof typeof iconMap] : Activity;
  return <Icon className={className} />;
}
