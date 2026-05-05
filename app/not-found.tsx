import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] items-center justify-center px-6">
      <Card className="w-full text-center">
        <p className="text-sm font-extrabold text-good-blueDeep">404</p>
        <h1 className="mt-2 text-2xl font-extrabold text-text-primary">Diese Seite gibt es nicht.</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Der angeforderte Bereich wurde nicht gefunden.
        </p>
        <Link href="/home" className="mt-5 inline-flex w-full">
          <Button className="w-full">Zurück zu Heute</Button>
        </Link>
      </Card>
    </div>
  );
}
