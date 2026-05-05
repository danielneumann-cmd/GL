import { Logo } from "@/components/layout/logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { onboardingAction } from "@/app/onboarding/actions";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getGoalTemplates, localizeTemplate } from "@/lib/db/goal-templates";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/messages";

export default async function OnboardingPage() {
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  const t = createTranslator(locale);
  const templates = await getGoalTemplates();
  const firstTemplates = templates.slice(0, 6).map((template) => localizeTemplate(template, locale));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[450px] flex-col px-5 py-8 sm:px-6">
      <section className="rounded-[34px] border border-white/75 bg-white/90 p-6 text-center shadow-card backdrop-blur-xl">
        <Logo className="mx-auto" priority />
        <header className="mt-5 space-y-2">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-text-primary">{t("onboarding.title")}</h1>
          <p className="mx-auto max-w-[30ch] text-sm leading-6 text-text-secondary">{t("onboarding.subtitle")}</p>
        </header>
      </section>
      <Card className="mt-6">
        <form action={onboardingAction} className="space-y-4">
          <input name="displayName" defaultValue={profile?.display_name ?? ""} placeholder={t("onboarding.displayName")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10" />
          <select name="language" defaultValue={locale} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10"><option value="de">Deutsch</option><option value="en">English</option></select>
          <div>
            <p className="mb-3 text-sm font-bold text-text-primary">{t("onboarding.chooseGoal")}</p>
            <div className="space-y-2">
              {firstTemplates.map((template, index) => (
                <label key={template.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-app-border bg-white p-3 text-sm font-semibold text-text-primary transition hover:border-good-green/35 hover:bg-good-greenSoft/35">
                  <input type="radio" name="templateId" value={template.id} defaultChecked={index === 0} />
                  {template.title}
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">{t("onboarding.start")}</Button>
        </form>
      </Card>
    </main>
  );
}
