# Upgrade auf GoodLoop v0.8

## Fokus

v0.8 baut keine neuen Produktfunktionen ein. Die Version integriert die gewählte Logo- und Branding-Richtung in die App. Ja, ausnahmsweise mal kein Funktionsnachschlag. Vernünftig, fast verdächtig.

## Neu

- finales `public/goodloop-logo.svg`
- finales `public/app-icon.svg`
- aktualisierte `public/brand-preview.svg`
- Logo-Komponente erweitert
- Logo in Login, Onboarding, Home, Goals, Progress, Profile, Friends und Mock eingebaut
- Package-Version auf `0.8.0` gesetzt

## Supabase

Keine neue Migration nötig.

Wenn v0.7 läuft, muss in Supabase nichts geändert werden.

## Lokal aktualisieren

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
git commit -m "Update GoodLoop branding v0.8"
git push
```
