import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  text: string;
  href?: Route | URL;
  action?: string;
};

export function EmptyState({ title, text, href, action }: EmptyStateProps) {
  return (
    <Card className="text-center">
      <div className="mx-auto mb-4 h-2 w-12 rounded-full bg-good-green" />
      <h3 className="text-lg font-black tracking-[-0.02em] text-text-primary">{title}</h3>
      <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-6 text-text-secondary">{text}</p>
      {href && action ? (
        <Link href={href} className="mt-4 inline-flex">
          <Button>{action}</Button>
        </Link>
      ) : null}
    </Card>
  );
}
