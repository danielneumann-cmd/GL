# GoodLoop v0.6 Qualitätscheck

Vor einem Test mit anderen Nutzern prüfen:

## Lokal

```powershell
npm run typecheck
npm run build
npm run dev
```

## App-Fluss

- Registrierung funktioniert.
- Login funktioniert.
- Onboarding führt zu `/home`.
- Zielvorlagen werden angezeigt.
- Ziel kann gestartet werden.
- Ziel erscheint auf Heute.
- Ziel kann abgehakt und rückgängig gemacht werden.
- Fortschritt zeigt letzte 7 Tage.
- Profil kann gespeichert werden.
- Sprache DE/EN kann gewechselt werden.
- Erinnerungsdaten bleiben gespeichert.
- Freunde-Seite ist über Profil erreichbar, aber nicht aufdringlich in der Hauptnavigation.

## Supabase

Wenn du von v0.5 kommst: keine neue Migration nötig.

Wenn du neu startest: `supabase/schema.sql` komplett ausführen.
