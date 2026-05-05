import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "coral" | "blue";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-good-green text-white shadow-soft hover:bg-good-greenDeep hover:shadow-card active:translate-y-px disabled:opacity-60",
    secondary:
      "bg-good-greenSoft text-good-greenDeep hover:bg-[#DDF4E7] active:translate-y-px disabled:opacity-60",
    coral:
      "bg-good-coral text-white shadow-soft hover:bg-good-coralDeep active:translate-y-px disabled:opacity-60",
    blue:
      "bg-good-blue text-white shadow-soft hover:bg-good-blueDeep active:translate-y-px disabled:opacity-60",
    ghost:
      "bg-transparent text-text-secondary hover:bg-app-surface active:translate-y-px disabled:opacity-60",
  };

  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-pill px-5 py-3 text-sm font-extrabold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-good-green/20",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
