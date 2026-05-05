# GoodLoop v0.2.2 Build-Fix

Diese Version behebt die gemeldeten TypeScript-Fehler:

- `lib/db/goal-logs.ts`: Supabase-Relation `user_goals(category)` wird jetzt explizit typisiert.
- `components/ui/empty-state.tsx`: `href` ist jetzt kompatibel mit Next Link und typed routes.
- `package.json`: Next ist bewusst auf `15.5.6` gepinnt, damit das Projekt nicht automatisch auf Next 16.2.x springt.
- `tsconfig.json`: `.next/dev` wird ausgeschlossen.

## Wichtig beim Aktualisieren

Bitte alte Installations- und Build-Artefakte löschen:

```powershell
rd /s /q .next
rd /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
npm run typecheck
npm run build
npm run dev
```

Falls `rd /s /q node_modules` wegen gesperrter Dateien scheitert: VS Code, Terminal und laufenden Dev-Server schließen.
