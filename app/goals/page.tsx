import { AppShell } from "@/components/layout/app-shell";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryCard } from "@/components/goals/category-card";
import { GoalTemplateCard } from "@/components/goals/goal-template-card";
import { ActiveGoalManageCard, SmallGoalButton } from "@/components/goals/active-goal-manage-card";
import { cancelGoalAction, completeGoalAction, createCustomGoalAction, pauseGoalAction, resumeGoalAction, startTemplateGoalAction } from "@/app/goals/actions";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/messages";
import { getGoalTemplates, localizeTemplate, type GoalCategory } from "@/lib/db/goal-templates";
import { getActiveUserGoals, getGoalDoneCounts, getPausedUserGoals } from "@/lib/db/user-goals";
import { goalCategories } from "@/lib/goals/categories";
import { daysBetweenInclusive, todayISO } from "@/lib/date";

export default async function GoalsPage() {
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  const t = createTranslator(locale);
  const [templates, activeGoals, pausedGoals] = await Promise.all([getGoalTemplates(), getActiveUserGoals(), getPausedUserGoals()]);
  const doneCounts = await getGoalDoneCounts([...activeGoals, ...pausedGoals].map((goal) => goal.id));

  const categoryDescriptionKey: Record<GoalCategory, string> = {
    healthy: "categories.healthyDescription",
    move: "categories.moveDescription",
    balance: "categories.balanceDescription",
  };

  return (
    <AppShell locale={locale}>
      <div className="space-y-6">
        <header className="rounded-[34px] border border-white/75 bg-white/90 p-5 shadow-card backdrop-blur-xl">
          <Logo variant="header" />
          <div className="mt-5 space-y-1">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-text-primary">{t("goals.title")}</h1>
            <p className="text-base leading-7 text-text-secondary">{t("goals.subtitle")}</p>
          </div>
        </header>

        <section className="grid gap-3">
          {goalCategories.map((category) => <CategoryCard key={category} category={category} title={t(`categories.${category}`)} description={t(categoryDescriptionKey[category])} />)}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("goals.management")}</h2>
          {activeGoals.length === 0 ? <p className="rounded-2xl bg-white p-4 text-sm text-text-secondary shadow-soft">{t("goals.noActive")}</p> : activeGoals.map((goal) => {
            const doneDays = doneCounts.get(goal.id) ?? 0;
            const elapsedDays = daysBetweenInclusive(goal.start_date, todayISO());
            const remainingDays = Math.max(0, goal.duration_days - elapsedDays);
            return (
              <ActiveGoalManageCard
                key={goal.id}
                title={goal.title}
                category={goal.category}
                durationDays={goal.duration_days}
                doneDays={doneDays}
                remainingDays={remainingDays}
                statusLabel={t("goals.statusActive")}
                progressLabel={t("goals.doneDays", { done: doneDays, total: goal.duration_days })}
                remainingLabel={t("goals.remainingDays", { count: remainingDays })}
                actions={
                  <>
                    <SmallGoalButton action={pauseGoalAction.bind(null, goal.id)}>{t("goals.pause")}</SmallGoalButton>
                    <SmallGoalButton action={completeGoalAction.bind(null, goal.id)} variant="blue">{t("goals.complete")}</SmallGoalButton>
                    <SmallGoalButton action={cancelGoalAction.bind(null, goal.id)} variant="coral">{t("goals.cancel")}</SmallGoalButton>
                  </>
                }
              />
            );
          })}
        </section>

        {pausedGoals.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-text-primary">{t("goals.pausedGoals")}</h2>
            {pausedGoals.map((goal) => {
              const doneDays = doneCounts.get(goal.id) ?? 0;
              return (
                <ActiveGoalManageCard
                  key={goal.id}
                  title={goal.title}
                  category={goal.category}
                  durationDays={goal.duration_days}
                  doneDays={doneDays}
                  remainingDays={0}
                  statusLabel={t("goals.statusPaused")}
                  progressLabel={t("goals.doneDays", { done: doneDays, total: goal.duration_days })}
                  remainingLabel=""
                  actions={<SmallGoalButton action={resumeGoalAction.bind(null, goal.id)} variant="secondary">{t("goals.resume")}</SmallGoalButton>}
                />
              );
            })}
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("goals.newGoals")}</h2>
          {templates.map((template) => {
            const localized = localizeTemplate(template, locale);
            return (
              <GoalTemplateCard key={template.id} title={localized.title} description={localized.description} category={localized.category} icon={localized.icon} duration={localized.durationDays} durationLabel={t("goals.days")} actionLabel={t("goals.startGoal")} action={
                <form action={startTemplateGoalAction.bind(null, template.id)}>
                  <Button type="submit">{t("goals.startGoal")}</Button>
                </form>
              } />
            );
          })}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("goals.customTitle")}</h2>
          <Card>
            <form action={createCustomGoalAction} className="space-y-3">
              <input name="title" required minLength={2} placeholder={t("goals.customName")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green" />
              <select name="category" className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green">
                <option value="healthy">Healthy</option>
                <option value="move">Move</option>
                <option value="balance">Balance</option>
              </select>
              <select name="durationDays" defaultValue="7" className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green">
                <option value="1">1 {t("goals.day")}</option>
                <option value="3">3 {t("goals.days")}</option>
                <option value="5">5 {t("goals.days")}</option>
                <option value="7">7 {t("goals.days")}</option>
                <option value="14">14 {t("goals.days")}</option>
              </select>
              <Button type="submit" className="w-full">{t("goals.createCustom")}</Button>
            </form>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
