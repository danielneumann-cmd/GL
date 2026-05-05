import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getSocialStats } from "@/lib/db/social";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/messages";

export default async function FriendsPage() {
  const profile = await getCurrentProfile();
  const locale = await getRequestLocale(profile?.language);
  const t = createTranslator(locale);
  const stats = await getSocialStats();

  return (
    <AppShell locale={locale}>
      <div className="space-y-6">
        <header className="space-y-3 pt-2">
          <Logo variant="header" />
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">{t("friends.title")}</h1>
            <p className="text-base text-text-secondary">{t("friends.subtitle")}</p>
          </div>
        </header>

        <Card className="bg-good-blueSoft">
          <p className="text-sm font-extrabold text-good-blueDeep">{t("friends.statusTitle")}</p>
          <p className="mt-2 text-sm text-text-secondary">{t("friends.statusText")}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-good-blueDeep">{stats.acceptedFriends}</p>
              <p className="text-xs text-text-secondary">{t("friends.friends")}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-good-coralDeep">{stats.pendingRequests}</p>
              <p className="text-xs text-text-secondary">{t("friends.requests")}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-good-greenDeep">{stats.sharedMilestones}</p>
              <p className="text-xs text-text-secondary">{t("friends.shared")}</p>
            </div>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-sm font-extrabold text-text-primary">{t("friends.privacyTitle")}</p>
          <p className="text-sm text-text-secondary">{t("friends.privacyText")}</p>
          <div className="rounded-3xl bg-app-surface p-4">
            <p className="text-sm font-bold text-text-primary">{t("friends.currentVisibility")}</p>
            <p className="mt-1 text-sm text-text-secondary">{profile?.visibility === "friends" ? t("friends.visibilityFriends") : profile?.visibility === "public" ? t("friends.visibilityPublic") : t("friends.visibilityPrivate")}</p>
          </div>
          <Link href="/profile">
            <Button variant="secondary" className="w-full">{t("friends.editPrivacy")}</Button>
          </Link>
        </Card>

        <Card className="space-y-3 bg-good-greenSoft">
          <p className="text-sm font-extrabold text-good-greenDeep">{t("friends.shareTitle")}</p>
          <p className="text-sm text-text-secondary">{t("friends.shareText")}</p>
          <div className="rounded-2xl bg-white/75 p-3">
            <p className="text-sm font-bold text-text-primary">{t("friends.shareSetting")}</p>
            <p className="mt-1 text-sm text-text-secondary">{profile?.share_milestones_enabled ? t("friends.shareOn") : t("friends.shareOff")}</p>
          </div>
        </Card>

        <Card className="space-y-3 bg-good-coralSoft">
          <p className="text-sm font-extrabold text-good-coralDeep">{t("friends.whatComesNext")}</p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• {t("friends.nextOne")}</li>
            <li>• {t("friends.nextTwo")}</li>
            <li>• {t("friends.nextThree")}</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
