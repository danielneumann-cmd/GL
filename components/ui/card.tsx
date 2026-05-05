import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur transition-shadow duration-200",
        className
      )}
    >
      {children}
    </section>
  );
}
