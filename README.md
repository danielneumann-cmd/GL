# GoodLoop MVP

GoodLoop ist eine helle, freundliche Habit-/Health-App für kleine gesunde Alltagsziele.

Kernidee:

- kleine Ziele
- einfache Bedienung
- Ernährung, Bewegung und Balance
- Deutsch/Englisch vorbereitet
- kein Ranking
- Social nur vorbereitet, nicht als Kern
- Bottom-Navigation bewusst schlank gehalten
- ruhiges Branding mit dreifarbigem Balance-Loop

## Aktueller Stand: v0.9.0

Enthalten:

- Login und Registrierung über Supabase
- automatisches Profil
- Onboarding
- Zielvorlagen in Deutsch und Englisch
- eigene Ziele erstellen
- Ziele abhaken
- Ziele pausieren, fortsetzen, abschließen und beenden
- Fortschritt der letzten 7 Tage
- Wochenrückblick
- einfache Meilensteine
- Zitat der Woche
- Profil mit Sprache und Sichtbarkeit
- PWA-Manifest
- Erinnerungen im Profil vorbereitet
- Erinnerungszeit speichern
- Freunde-Bereich vorbereitet, aber nicht in der Hauptnavigation
- globale Loading-/Error-/404-Seiten
- finales Logo und App-Icon auf Basis der gewählten Logo-Richtung
- Logo an Login, Onboarding, Home, Goals, Progress, Profile, Friends und Mock eingebaut
- Branding- und Wording-Guides

## Branding

Wichtige Dateien:

```text
BRANDING.md
WORDING_GUIDE.md
public/goodloop-logo.svg
public/app-icon.svg
public/brand-preview.svg
```

Branding-Vorschau:

```text
/mock
```

## Setup

```powershell
npm install
npm run dev
```

## Supabase

1. Neues Supabase-Projekt erstellen.
2. Datei `supabase/schema.sql` im SQL Editor ausführen.
3. `.env.example` zu `.env.local` kopieren.
4. Werte eintragen:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Checks

```powershell
npm run typecheck
npm run build
```

## GitHub

Repository:

```text
https://github.com/danielneumann-cmd/GL.git
```

## Upgrade-Hinweise

Wenn du von v0.7 kommst, ist für v0.9 keine neue Supabase-Migration nötig.

Wenn du von älteren Versionen kommst, beachte zusätzlich:

- v0.4: `supabase/migrations/v0_4_reminders.sql`
- v0.5: `supabase/migrations/v0_5_social.sql`
