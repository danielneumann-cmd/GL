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
    <main className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 py-8">
      <Logo className="mx-auto" priority />
      <header className="mt-4 space-y-2 text-center">
        <h1 className="text-3xl font-extrabold text-text-primary">{t("onboarding.title")}</h1>
        <p className="text-sm text-text-secondary">{t("onboarding.subtitle")}</p>
      </header>
      <Card className="mt-6">
        <form action={onboardingAction} className="space-y-4">
          <input name="displayName" defaultValue={profile?.display_name ?? ""} placeholder={t("onboarding.displayName")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green" />
          <select name="language" defaultValue={locale} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green"><option value="de">Deutsch</option><option value="en">English</option></select>
          <div>
            <p className="mb-3 text-sm font-bold text-text-primary">{t("onboarding.chooseGoal")}</p>
            <div className="space-y-2">
              {firstTemplates.map((template, index) => (
                <label key={template.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-app-border bg-white p-3 text-sm font-semibold text-text-primary">
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
