import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "coral" | "blue";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-good-green text-white shadow-sm hover:bg-good-greenDeep disabled:opacity-60",
    secondary: "bg-good-greenSoft text-good-greenDeep hover:bg-green-100 disabled:opacity-60",
    coral: "bg-good-coral text-white hover:bg-good-coralDeep disabled:opacity-60",
    blue: "bg-good-blue text-white hover:bg-good-blueDeep disabled:opacity-60",
    ghost: "bg-transparent text-text-secondary hover:bg-app-surface disabled:opacity-60",
  };

  return (
    <button className={cn("inline-flex min-h-11 items-center justify-center rounded-pill px-5 py-3 text-sm font-semibold transition", variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
