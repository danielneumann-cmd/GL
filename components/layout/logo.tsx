import Image from "next/image";
import { clsx } from "clsx";

export type LogoVariant = "full" | "mark" | "header";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "full", className, priority = false }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/app-icon.svg"
        alt="GoodLoop"
        width={54}
        height={54}
        className={clsx("h-12 w-12 rounded-[18px]", className)}
        priority={priority}
      />
    );
  }

  if (variant === "header") {
    return (
      <div className={clsx("flex items-center gap-3", className)}>
        <Image
          src="/app-icon.svg"
          alt="GoodLoop"
          width={44}
          height={44}
          className="h-11 w-11 rounded-2xl"
          priority={priority}
        />
        <div className="leading-tight">
          <p className="text-xl font-black tracking-tight text-[#181A1F]">GoodLoop</p>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-text-soft">Balance</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src="/goodloop-logo.svg"
      alt="GoodLoop · Kleine Ziele. Gute Balance."
      width={360}
      height={114}
      className={clsx("h-auto w-full max-w-[320px]", className)}
      priority={priority}
    />
  );
}
