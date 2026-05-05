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
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[410px] -translate-x-1/2 rounded-[30px] border border-white/75 bg-white/90 px-2.5 py-2 shadow-card backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-h-[58px] flex-col items-center justify-center rounded-[22px] px-2 py-2 text-[11px] font-extrabold transition-all duration-200",
                active
                  ? "bg-good-greenSoft text-good-greenDeep shadow-[inset_0_0_0_1px_rgba(53,184,107,0.10)]"
                  : "text-text-soft hover:bg-app-surface hover:text-text-primary"
              )}
            >
              {active ? <span className="absolute top-1.5 h-1 w-5 rounded-full bg-good-green" /> : null}
              <Icon className="mb-1 mt-1 h-5 w-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
