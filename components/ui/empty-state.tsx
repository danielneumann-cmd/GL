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
      <h3 className="text-lg font-bold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary">{text}</p>
      {href && action ? (
        <Link href={href} className="mt-4 inline-flex">
          <Button>{action}</Button>
        </Link>
      ) : null}
    </Card>
  );
}
