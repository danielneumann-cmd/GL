"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] items-center justify-center px-6">
      <Card className="w-full text-center">
        <p className="text-sm font-extrabold text-good-coralDeep">GoodLoop</p>
        <h1 className="mt-2 text-2xl font-extrabold text-text-primary">Da ist etwas schiefgelaufen.</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Bitte versuche es erneut. Dein Fortschritt bleibt gespeichert.
        </p>
        <Button onClick={reset} className="mt-5 w-full">Nochmal versuchen</Button>
      </Card>
    </div>
  );
}
