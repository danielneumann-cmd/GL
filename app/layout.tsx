import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getRequestLocale } from "@/lib/i18n/locale";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "GoodLoop",
  description: "GoodLoop hilft dir, kleine gesunde Alltagsziele einfach umzusetzen.",
  icons: { icon: "/app-icon.svg" },
  manifest: "/manifest.webmanifest",
  themeColor: "#35B86B",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getRequestLocale();
  return (
    <html lang={locale} className={manrope.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
