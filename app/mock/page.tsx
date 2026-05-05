import Image from "next/image";
import { Logo } from "@/components/layout/logo";
import { Activity, Apple, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/messages";

export default async function MockPage() {
  const locale = await getRequestLocale();
  const t = createTranslator(locale);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[980px] px-5 py-10">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
        <section className="rounded-[36px] border border-white/75 bg-white/90 p-6 shadow-card backdrop-blur">
          <Logo priority />
          <h1 className="mt-6 text-4xl font-extrabold text-text-primary">{t("mock.title")}</h1>
          <p className="mt-3 text-text-secondary">{t("mock.subtitle")}</p>
          <div className="mt-6 flex gap-3"><Button>Start</Button><Button variant="secondary">Branding</Button></div>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-white/75 bg-app-background">
            <Image src="/brand-preview.svg" alt="GoodLoop Branding Vorschau" width={640} height={405} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[430px] rounded-[42px] border border-white/75 bg-app-background p-5 shadow-card">
          <header className="flex items-center justify-between"><Logo variant="header" /><span className="rounded-pill bg-white px-4 py-2 text-xs font-bold text-good-greenDeep shadow-soft">v0.9</span></header>
          <div className="mt-6"><h2 className="text-3xl font-extrabold">Heute</h2><p className="mt-1 text-text-secondary">Eine kleine gute Entscheidung reicht für heute.</p></div>
          <Card className="mt-6 text-center"><ProgressRing done={2} total={3} /><p className="mt-2 text-sm font-semibold text-text-secondary">2 von 3 geschafft</p></Card>
          <div className="mt-5 space-y-3">
            {[['1 Apfel pro Tag', Apple, 'bg-good-greenSoft text-good-greenDeep', true], ['8000 Schritte', Activity, 'bg-good-blueSoft text-good-blueDeep', false], ['3 Tage kein Energy', HeartPulse, 'bg-good-coralSoft text-good-coralDeep', true]].map(([label, Icon, klass, done]) => {
              const RealIcon = Icon as typeof Apple;
              return <Card key={String(label)} className="flex items-center gap-4"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${klass}`}><RealIcon className="h-6 w-6" /></div><div className="flex-1"><p className="font-bold">{String(label)}</p><p className="text-sm text-text-secondary">{done ? 'Erledigt' : 'Noch offen'}</p></div><span className="text-xl">{done ? '✓' : ''}</span></Card>;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
