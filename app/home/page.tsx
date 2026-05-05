import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressRing } from "@/components/ui/progress-ring";
import { GoalActionButton, GoalCard } from "@/components/goals/goal-card";
import { QuoteCard } from "@/components/quotes/quote-card";
import { markDoneAction, undoDoneAction } from "@/app/home/actions";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getActiveUserGoals, completeExpiredGoals } from "@/lib/db/user-goals";
import { getTodayGoalLogs } from "@/lib/db/goal-logs";
import { getWeeklyQuote } from "@/lib/db/quotes";
import { createTranslator } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/i18n/locale";

export default async function HomePage() {
  await completeExpiredGoals();
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  const t = createTranslator(locale);
  const goals = await getActiveUserGoals();
  const logs = await getTodayGoalLogs();
  const quote = await getWeeklyQuote(locale);
  const doneGoalIds = new Set(logs.map((log) => log.user_goal_id));
  const doneCount = goals.filter((goal) => doneGoalIds.has(goal.id)).length;
  const totalCount = goals.length;
  const hiddenGoalCount = Math.max(0, goals.length - 3);
  const name = profile?.display_name ?? "GoodLoop";

  return (
    <AppShell locale={locale}>
      <div className="space-y-6">
        <header className="overflow-hidden rounded-[34px] border border-white/75 bg-white/90 p-5 shadow-card backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <Logo variant="header" priority />
            <span className="rounded-pill bg-app-surface px-3 py-1 text-[11px] font-extrabold text-text-soft">v0.9</span>
          </div>
          <div className="mt-6 space-y-1">
            <p className="text-sm font-extrabold text-good-greenDeep">{t("home.greeting", { name })}</p>
            <h1 className="text-4xl font-black tracking-[-0.05em] text-text-primary">{t("home.title")}</h1>
            <p className="max-w-[30ch] text-base leading-7 text-text-secondary">{t("home.subtitle")}</p>
          </div>
        </header>

        <Card className="relative overflow-hidden text-center">
          <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-good-greenSoft" />
          <div className="absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-good-blueSoft" />
          <div className="relative">
            <p className="text-sm font-extrabold text-text-secondary">{t("home.completedToday", { done: doneCount, total: totalCount })}</p>
            <div className="mt-4"><ProgressRing done={doneCount} total={totalCount} /></div>
            <p className="mx-auto mt-3 max-w-[28ch] text-sm font-semibold leading-6 text-text-secondary">{totalCount > 0 && doneCount === totalCount ? t("home.allDone") : t("home.notAllDone")}</p>
          </div>
        </Card>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-text-primary">{t("home.myGoalsToday")}</h2>
            <Link href="/goals" className="text-sm font-bold text-good-greenDeep">{t("home.addGoal")}</Link>
          </div>

          {goals.length > 0 && (
            <Card className="border-white/70 bg-app-surface/85 shadow-none">
              <p className="text-sm font-extrabold text-text-primary">{t("home.focusTitle")}</p>
              <p className="mt-1 text-sm text-text-secondary">{t("home.focusText")}</p>
              {hiddenGoalCount > 0 && <p className="mt-2 text-xs font-bold text-good-blueDeep">{t("home.moreGoals", { count: hiddenGoalCount })}</p>}
            </Card>
          )}

          {goals.length === 0 ? (
            <EmptyState title={t("home.emptyTitle")} text={t("home.emptyText")} href="/goals" action={t("home.addGoal")} />
          ) : (
            goals.slice(0, 3).map((goal) => {
              const done = doneGoalIds.has(goal.id);
              return (
                <GoalCard key={goal.id} title={goal.title} category={goal.category} done={done} doneLabel={t("actions.done")} markLabel={t("actions.markDone")} undoLabel={t("actions.undo")} action={
                  <form action={done ? undoDoneAction.bind(null, goal.id) : markDoneAction.bind(null, goal.id)}>
                    <GoalActionButton done={done} markLabel={t("actions.markDone")} undoLabel={t("actions.undo")} />
                  </form>
                } />
              );
            })
          )}
          <Link href="/goals"><Button variant="secondary" className="w-full">{t("home.addGoal")}</Button></Link>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="bg-good-coralSoft/80 shadow-none">
            <p className="text-sm font-extrabold text-good-coralDeep">{t("home.tipTitle")}</p>
            <p className="mt-1 text-sm text-text-secondary">{t("home.tipText")}</p>
          </Card>

          <Card className="bg-good-blueSoft/80 shadow-none">
            <p className="text-sm font-extrabold text-good-blueDeep">{t("home.microWinTitle")}</p>
            <p className="mt-1 text-sm text-text-secondary">{t("home.microWinText")}</p>
          </Card>
        </div>

        {!profile?.reminder_enabled && goals.length > 0 ? (
          <Card className="bg-good-greenSoft/85 shadow-none">
            <p className="text-sm font-extrabold text-good-greenDeep">{t("home.reminderNudgeTitle")}</p>
            <p className="mt-1 text-sm text-text-secondary">{t("home.reminderNudgeText")}</p>
            <Link href="/profile" className="mt-3 inline-flex text-sm font-bold text-good-greenDeep">
              {t("profile.remindersTitle")}
            </Link>
          </Card>
        ) : null}

        <QuoteCard title={t("home.quoteTitle")} quote={quote?.quote_text} author={quote?.author} />
      </div>
    </AppShell>
  );
}
