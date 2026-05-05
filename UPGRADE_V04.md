# Upgrade auf GoodLoop v0.4.0

v0.4 bereitet Erinnerungen sauber vor, ohne echte Push-Benachrichtigungen zu aktivieren.

## Neu

- Erinnerungen im Profil aktivieren/deaktivieren
- Erinnerungszeit speichern
- Hinweis auf dem Heute-Screen, wenn Erinnerungen noch aus sind
- Datenbankfelder `reminder_enabled` und `reminder_time`
- Migration `supabase/migrations/v0_4_reminders.sql`

## Supabase

Wenn deine Datenbank bereits aus v0.3 besteht, führe im Supabase SQL Editor aus:

```sql
-- Datei: supabase/migrations/v0_4_reminders.sql
```

Bei einem neuen Supabase-Projekt reicht weiterhin die komplette Datei:

```text
supabase/schema.sql
```

## Lokal testen

```powershell
rd /s /q .next
npm install
npm run typecheck
npm run build
npm run dev
```

## Hinweis

Push-Benachrichtigungen sind in v0.4 bewusst noch nicht aktiv. Die App speichert nur die gewünschte Erinnerungseinstellung, damit eine spätere PWA-Notification-Phase sauber darauf aufbauen kann.
