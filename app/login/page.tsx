import { Logo } from "@/components/layout/logo";
import { loginAction, registerAction } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createTranslator } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/i18n/locale";

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = await getRequestLocale();
  const t = createTranslator(locale);
  const error = typeof params.error === "string" ? params.error : null;
  const registered = params.registered === "1";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[450px] flex-col justify-center px-5 py-8 sm:px-6">
      <div className="mb-6 rounded-[34px] border border-white/75 bg-white/90 p-6 text-center shadow-card backdrop-blur-xl">
        <Logo className="mx-auto" priority />
        <p className="mt-2 text-sm text-text-secondary">{t("auth.subtitle")}</p>
      </div>

      {error ? <div className="mb-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}
      {registered ? <div className="mb-4 rounded-2xl bg-good-greenSoft p-3 text-sm font-semibold text-good-greenDeep">{t("auth.successRegister")}</div> : null}

      <div className="space-y-4">
        <Card>
          <h1 className="text-xl font-extrabold text-text-primary">{t("auth.login")}</h1>
          <form action={loginAction} className="mt-4 space-y-3">
            <input name="email" type="email" required placeholder={t("auth.email")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10" />
            <input name="password" type="password" required placeholder={t("auth.password")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10" />
            <Button className="w-full" type="submit">{t("auth.login")}</Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-extrabold text-text-primary">{t("auth.register")}</h2>
          <form action={registerAction} className="mt-4 space-y-3">
            <input name="displayName" type="text" placeholder={t("auth.displayName")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10" />
            <input name="email" type="email" required placeholder={t("auth.email")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10" />
            <input name="password" type="password" required minLength={6} placeholder={t("auth.password")} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10" />
            <select name="language" defaultValue={locale} className="w-full rounded-2xl border border-app-border bg-white px-4 py-3 outline-none transition focus:border-good-green focus:ring-4 focus:ring-good-green/10">
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
            <Button className="w-full" variant="blue" type="submit">{t("auth.register")}</Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
