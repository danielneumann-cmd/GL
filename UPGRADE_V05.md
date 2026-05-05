# Upgrade auf GoodLoop v0.5

Diese Version ergänzt die sanfte Social-Vorbereitung. Natürlich nicht als Ranking-Hölle, sondern als Fundament für spätere freiwillige Meilensteine.

## 1. Supabase-Migration ausführen

Wenn du bereits v0.4 nutzt, führe im Supabase SQL Editor aus:

```text
supabase/migrations/v0_5_social.sql
```

Die Migration ergänzt:

- `profiles.share_milestones_enabled`
- `friend_connections`
- `milestone_shares`
- RLS-Policies
- Indexe

## 2. Lokal neu starten

```powershell
rd /s /q .next
npm run typecheck
npm run build
npm run dev
```

## 3. Neu testen

- Profil öffnen
- Meilenstein-Freigabe aktivieren/deaktivieren
- Freunde-Bereich öffnen
- Sichtbarkeit prüfen

## Hinweis

Echte Freundschaftsanfragen und geteilte Meilensteine sind noch nicht vollständig aktiv. v0.5 bereitet Datenbank und UI vor, damit v0.6+ sauber weiterbauen kann.
