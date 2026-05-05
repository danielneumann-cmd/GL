# GoodLoop v0.2 Upgrade

Wenn du v0.1 bereits lokal laufen hast, kannst du diese Version einfach über den Projektordner legen oder die geänderten Dateien übernehmen.

## Supabase

Wenn du `supabase/schema.sql` aus dem ersten ZIP bereits vollständig ausgeführt hast, ist für v0.2 normalerweise keine große SQL-Änderung nötig.

Optional im Supabase SQL Editor ausführen:

```sql
-- siehe supabase/migrations/v0_2_notes.sql
```

Diese Migration prüft die vorbereitete Sichtbarkeit im Profil.

## Lokal testen

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

Falls `npm run build` wegen Supabase-ENV meckert, zuerst `.env.local` prüfen.

## Neue Funktionen

- Ziele pausieren, fortsetzen, abschließen und beenden
- Fortschrittsbalken pro Ziel
- Kategorien-Mix auf der Fortschritt-Seite
- Sichtbarkeit im Profil für spätere Social-Funktion
- PWA-Manifest
