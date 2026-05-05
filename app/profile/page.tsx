import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getProfileStats } from "@/lib/db/profiles";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/messages";
import { logoutAction, updateProfileAction } from "@/app/profile/actions";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  const t = createTranslator(locale);
  const stats = await getProfileStats();

  return (
    <AppShell locale={locale}>
      <div className="space-y-6">
        <header className="space-y-3 pt-2">
          <Logo variant="header" />
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">{t("profile.title")}</h1>
            <p className="text-base text-text-secondary">{t("app.claim")}</p>
          </div>
        </header>

        <Card>
          <form action={updateProfileAction} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">Name</label>
              <input name="displayName" defaultValue={profile?.display_name ?? ""} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">{t("profile.language")}</label>
              <select name="language" defaultValue={locale} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green">
                <option value="de">{t("profile.german")}</option>
                <option value="en">{t("profile.english")}</option>
              </select>
            </div>

            <div className="space-y-2 rounded-3xl bg-app-surface p-4">
              <label className="block text-sm font-bold text-text-primary">{t("profile.visibility")}</label>
              <p className="text-sm text-text-secondary">{t("profile.visibilityText")}</p>
              <select name="visibility" defaultValue={profile?.visibility ?? "private"} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green">
                <option value="private">{t("profile.private")}</option>
                <option value="friends">{t("profile.friends")}</option>
                <option value="public">{t("profile.public")}</option>
              </select>
              <p className="text-xs text-text-soft">{t("profile.privateHelp")}</p>
            </div>


            <div className="space-y-3 rounded-3xl bg-good-blueSoft p-4">
              <div>
                <label className="block text-sm font-bold text-good-blueDeep">{t("profile.shareMilestonesTitle")}</label>
                <p className="mt-1 text-sm text-text-secondary">{t("profile.shareMilestonesText")}</p>
              </div>
              <label className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 text-sm font-semibold text-text-primary">
                <input
                  name="shareMilestonesEnabled"
                  type="checkbox"
                  defaultChecked={profile?.share_milestones_enabled ?? false}
                  className="h-4 w-4 accent-good-blue"
                />
                {t("profile.shareMilestonesEnabled")}
              </label>
              <p className="text-xs text-text-secondary">{t("profile.shareMilestonesHelp")}</p>
            </div>

            <div className="space-y-3 rounded-3xl bg-good-greenSoft p-4">
              <div>
                <label className="block text-sm font-bold text-good-greenDeep">{t("profile.remindersTitle")}</label>
                <p className="mt-1 text-sm text-text-secondary">{t("profile.remindersText")}</p>
              </div>

              <label className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 text-sm font-semibold text-text-primary">
                <input
                  name="reminderEnabled"
                  type="checkbox"
                  defaultChecked={profile?.reminder_enabled ?? false}
                  className="h-4 w-4 accent-good-green"
                />
                {t("profile.reminderEnabled")}
              </label>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-text-primary">{t("profile.reminderTime")}</label>
                <input
                  name="reminderTime"
                  type="time"
                  defaultValue={profile?.reminder_time ?? "09:00"}
                  className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none focus:border-good-green"
                />
              </div>

              <p className="text-xs text-text-secondary">{t("profile.reminderHelp")}</p>
              <p className="rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold text-good-greenDeep">
                {t("profile.reminderPreview", {
                  status: profile?.reminder_enabled ? t("profile.reminderOn") : t("profile.reminderOff"),
                  time: profile?.reminder_time ?? "09:00"
                })}
              </p>
            </div>

            <Button type="submit" className="w-full">{t("profile.saveProfile")}</Button>
          </form>
        </Card>

        <Card className="grid grid-cols-3 gap-2 text-center">
          <div><p className="text-2xl font-extrabold text-good-greenDeep">{stats.activeGoals}</p><p className="text-xs text-text-secondary">{t("profile.activeGoals")}</p></div>
          <div><p className="text-2xl font-extrabold text-good-blueDeep">{stats.completedGoals}</p><p className="text-xs text-text-secondary">{t("profile.completedGoals")}</p></div>
          <div><p className="text-2xl font-extrabold text-good-coralDeep">{stats.bestStreak}</p><p className="text-xs text-text-secondary">{t("profile.bestStreak")}</p></div>
        </Card>

        <Card className="space-y-3 bg-good-blueSoft">
          <p className="text-sm font-extrabold text-good-blueDeep">{t("social.title")}</p>
          <p className="text-sm text-text-secondary">{t("social.subtitle")}</p>
          <Link href="/friends" className="inline-flex text-sm font-bold text-good-blueDeep">{t("social.openFriends")}</Link>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-3"><p className="text-sm font-bold">{t("social.privateFirst")}</p><p className="text-xs text-text-secondary">{t("social.privateFirstText")}</p></div>
            <div className="rounded-2xl bg-white/70 p-3"><p className="text-sm font-bold">{t("social.shareLater")}</p><p className="text-xs text-text-secondary">{t("social.shareLaterText")}</p></div>
          </div>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="bg-good-greenSoft shadow-none">
            <p className="text-sm font-extrabold text-good-greenDeep">{t("profile.pwaTitle")}</p>
            <p className="mt-1 text-sm text-text-secondary">{t("profile.pwaText")}</p>
          </Card>
          <Card className="bg-good-coralSoft shadow-none">
            <p className="text-sm font-extrabold text-good-coralDeep">{t("profile.nextStepsTitle")}</p>
            <p className="mt-1 text-sm text-text-secondary">{t("profile.nextStepsText")}</p>
          </Card>
        </div>

        <form action={logoutAction}>
          <Button type="submit" variant="ghost" className="w-full">{t("auth.logout")}</Button>
        </form>
      </div>
    </AppShell>
  );
}
