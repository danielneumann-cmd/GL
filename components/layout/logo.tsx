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
        className={clsx("h-12 w-12 rounded-[18px] shadow-soft", className)}
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
          width={42}
          height={42}
          className="h-10 w-10 rounded-2xl shadow-soft"
          priority={priority}
        />
        <div className="leading-tight">
          <p className="text-xl font-black tracking-[-0.04em] text-[#181A1F]">GoodLoop</p>
          <p className="text-[11px] font-bold tracking-[0.08em] text-text-soft">Kleine Ziele</p>
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
      className={clsx("h-auto w-full max-w-[320px] drop-shadow-[0_12px_22px_rgba(31,41,51,0.06)]", className)}
      priority={priority}
    />
  );
}
