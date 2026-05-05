# GoodLoop Supabase Setup

## 1. Neues Supabase-Projekt erstellen

1. Supabase Dashboard öffnen
2. Neues Projekt erstellen
3. Region auswählen
4. Datenbank-Passwort speichern, weil Menschen Passwörter sonst erst verlieren und dann überrascht sind

## 2. Auth konfigurieren

Für den MVP am einfachsten:

- Authentication → Providers → Email aktiv lassen
- Optional für lokale Tests: Email confirmations deaktivieren
- Oder wenn aktiviert: Site URL setzen auf `http://localhost:3000`
- Später für Produktivbetrieb: Site URL auf deine echte Domain setzen

## 3. SQL ausführen

Im Supabase SQL Editor die Datei ausführen:

```text
supabase/schema.sql
```

Diese Datei erstellt:

- `profiles`
- `goal_templates`
- `user_goals`
- `goal_logs`
- `quotes`
- RLS Policies
- Trigger
- RPC-Funktionen
- Seed-Daten für Zielvorlagen und erste Zitate

## 4. API Keys kopieren

Supabase → Project Settings → API:

- Project URL
- anon public key

In `.env.local` eintragen:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 5. Lokal starten

```powershell
npm install
npm run dev
```

Dann öffnen:

```text
http://localhost:3000
```

## 6. Wichtige Hinweise

- Die Zitate sind bewusst als `zugeschrieben` markiert und sollten vor echter Veröffentlichung geprüft werden.
- `goal_templates` nutzt `slug`, dadurch können Seed-Daten mehrfach aktualisiert werden.
- Nutzer sehen durch RLS nur eigene Ziele und Logs.
- Social-Funktionen sind absichtlich noch nicht enthalten. Ja, das ist Absicht, nicht Vergessen.
