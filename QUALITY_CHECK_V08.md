# GoodLoop v0.8 Quality Check

## Manuell prüfen

- Login-Seite zeigt das neue GoodLoop-Logo.
- Onboarding zeigt das neue GoodLoop-Logo.
- Home zeigt den neuen kleinen Header mit App-Icon und GoodLoop-Schriftzug.
- Goals, Progress, Profile und Friends zeigen die neue Header-Marke.
- `/mock` zeigt die aktualisierte Branding-Vorschau.
- Browser-Tab/Favicon nutzt `app-icon.svg`.
- PWA-Manifest zeigt weiterhin `app-icon.svg`.

## Technische Checks

```powershell
npm run typecheck
npm run build
```

## Supabase

Keine neue Migration nötig. Wenn ein Fehler zu `profiles.reminder_enabled` oder `share_milestones_enabled` kommt, fehlen noch ältere Migrationen aus v0.4/v0.5. Klassiker: App weiter als Datenbank.
