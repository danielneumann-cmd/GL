import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import type { Locale } from "@/lib/i18n/config";

export function AppShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 pb-28 pt-5">
      <main className="flex-1">{children}</main>
      <BottomNav locale={locale} />
    </div>
  );
}
