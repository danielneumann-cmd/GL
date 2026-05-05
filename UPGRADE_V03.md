# GoodLoop v0.3 Upgrade

## Inhalt

v0.3 baut bewusst auf v0.2.2 auf und hält die App weiterhin schlank.

Neu:

- Wochenrückblick auf der Fortschritt-Seite
- einfacher GoodLoop-Score für die Woche
- bester Tag der letzten 7 Tage
- freundliche Fortschritts-Insights
- kleine Meilensteine ohne Ranking
- zusätzliche Mikro-Motivation auf dem Heute-Screen
- PWA-/Installationshinweis im Profil
- aktualisierte DE/EN-Texte

## Supabase

Für v0.3 sind keine neuen Pflicht-Tabellen notwendig.

Wenn du v0.2.2 bereits nutzt, musst du in Supabase nichts Neues ausführen.

## Lokal aktualisieren

Wenn du den Ordner ersetzt:

```powershell
cd C:\Projekte
ren goodloop goodloop_alt
```

Dann ZIP nach `C:\Projekte\goodloop` entpacken und `.env.local` übernehmen:

```powershell
copy C:\Projekte\goodloop_alt\.env.local C:\Projekte\goodloop\.env.local
```

Danach:

```powershell
cd C:\Projekte\goodloop
rd /s /q .next
npm install
npm run typecheck
npm run build
npm run dev
```

## GitHub

```powershell
git add .
git commit -m "Update GoodLoop MVP v0.3"
git push
```
