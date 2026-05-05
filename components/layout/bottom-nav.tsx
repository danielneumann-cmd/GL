"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CircleCheck, Target, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTranslator } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";

const items = [
  { href: "/home", labelKey: "nav.today", icon: CircleCheck },
  { href: "/goals", labelKey: "nav.goals", icon: Target },
  { href: "/progress", labelKey: "nav.progress", icon: BarChart3 },
  { href: "/profile", labelKey: "nav.profile", icon: User },
] as const;

export function BottomNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = createTranslator(locale);

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[390px] -translate-x-1/2 rounded-[28px] border border-app-border bg-white/90 px-3 py-2 shadow-card backdrop-blur">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs font-semibold transition", active ? "bg-good-greenSoft text-good-greenDeep" : "text-text-soft hover:bg-app-surface hover:text-text-primary")}>
              <Icon className="mb-1 h-5 w-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
