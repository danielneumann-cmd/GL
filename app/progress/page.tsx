import { AppShell } from "@/components/layout/app-shell";
import { Logo } from "@/components/layout/logo";
import { Card } from "@/components/ui/card";
import { LastSevenDays } from "@/components/progress/last-seven-days";
import { WeeklyReviewCard } from "@/components/progress/weekly-review-card";
import { MilestoneCard } from "@/components/progress/milestone-card";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getCategoryProgressStats, getProgressStats } from "@/lib/db/goal-logs";
import { getCompletedUserGoals, getActiveUserGoals } from "@/lib/db/user-goals";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/messages";

function CategoryBar({ label, value, className }: { label: string; value: number; className: string }) {
  const width = Math.min(100, value * 12);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-bold text-text-primary">{label}</span>
        <span className="text-text-secondary">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-app-surface">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default async function ProgressPage() {
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  const t = createTranslator(locale);
  const [progress, categories, completed, active] = await Promise.all([
    getProgressStats(),
    getCategoryProgressStats(),
    getCompletedUserGoals(),
    getActiveUserGoals(),
  ]);

  const milestoneItems = [
    { label: t("progress.milestoneFirst"), reached: progress.weekCount >= 1 },
    { label: t("progress.milestoneThree"), reached: progress.weekCount >= 3 },
    { label: t("progress.milestoneSeven"), reached: progress.weekCount >= 7 },
    { label: t("progress.milestoneBalanced"), reached: categories.healthy > 0 && categories.move > 0 && categories.balance > 0 },
  ];

  return (
    <AppShell locale={locale}>
      <div className="space-y-6">
        <header className="space-y-3 pt-2">
          <Logo variant="header" />
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">{t("progress.title")}</h1>
            <p className="text-base text-text-secondary">{t("progress.subtitle")}</p>
          </div>
        </header>

        <WeeklyReviewCard
          title={t("progress.weeklyReview")}
          subtitle={t("progress.weeklyReviewSubtitle")}
          scoreLabel={t("progress.weeklyScore")}
          bestDayLabel={t("progress.bestDay")}
          insightLabel={{
            empty: t("progress.insightEmpty"),
            started: t("progress.insightStarted"),
            steady: t("progress.insightSteady"),
            strong: t("progress.insightStrong"),
            balanced: t("progress.insightBalanced"),
          }}
          weekCount={progress.weekCount}
          streak={progress.streak}
          activeGoals={active.length}
          completedGoals={completed.length}
          categories={categories}
          lastSevenDays={progress.lastSevenDays}
          locale={locale}
        />

        <Card className="grid grid-cols-1 gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-soft">{t("progress.thisWeek")}</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-good-greenSoft p-3">
              <p className="text-2xl font-extrabold text-good-greenDeep">{progress.weekCount}</p>
              <p className="text-xs text-text-secondary">{t("progress.goodDecisions", { count: progress.weekCount })}</p>
            </div>
            <div className="rounded-2xl bg-good-blueSoft p-3">
              <p className="text-2xl font-extrabold text-good-blueDeep">{progress.streak}</p>
              <p className="text-xs text-text-secondary">{t("progress.activeStreak", { count: progress.streak })}</p>
            </div>
            <div className="rounded-2xl bg-good-coralSoft p-3">
              <p className="text-2xl font-extrabold text-good-coralDeep">{completed.length}</p>
              <p className="text-xs text-text-secondary">{t("progress.completedGoals", { count: completed.length })}</p>
            </div>
          </div>
        </Card>

        <MilestoneCard title={t("progress.milestones")} subtitle={t("progress.milestonesSubtitle")} items={milestoneItems} />

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("progress.categoryMix")}</h2>
          <Card className="space-y-4">
            <CategoryBar label={t("progress.healthy")} value={categories.healthy} className="bg-good-green" />
            <CategoryBar label={t("progress.move")} value={categories.move} className="bg-good-blue" />
            <CategoryBar label={t("progress.balance")} value={categories.balance} className="bg-good-coral" />
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("progress.lastSevenDays")}</h2>
          <LastSevenDays days={progress.lastSevenDays} />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("progress.activeGoals")}</h2>
          {active.length === 0 ? (
            <p className="rounded-2xl bg-white p-4 text-sm text-text-secondary shadow-soft">{t("progress.empty")}</p>
          ) : (
            active.map((goal) => (
              <Card key={goal.id}>
                <p className="font-bold">{goal.title}</p>
                <p className="text-sm text-text-secondary">{goal.start_date} → {goal.end_date}</p>
              </Card>
            ))
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-text-primary">{t("progress.completedRecently")}</h2>
          {completed.length === 0 ? (
            <p className="rounded-2xl bg-white p-4 text-sm text-text-secondary shadow-soft">{t("progress.noCompleted")}</p>
          ) : (
            completed.map((goal) => (
              <Card key={goal.id}>
                <p className="font-bold">✓ {goal.title}</p>
                <p className="text-sm text-text-secondary">{goal.end_date}</p>
              </Card>
            ))
          )}
        </section>
      </div>
    </AppShell>
  );
}
