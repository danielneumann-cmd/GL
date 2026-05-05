import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-card border border-app-border bg-app-card p-5 shadow-card", className)}>{children}</section>;
}
