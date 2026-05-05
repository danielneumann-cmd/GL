# Fix TypeScript / Next.js Validator

Wenn der Fehler in `.next/dev/types/validator.ts` erscheint:

```text
Type '"/goals"' does not satisfy the constraint 'never'
```

wurden die Next.js-Routentypen nicht sauber erzeugt oder es liegen alte `.next`-Typen herum.

## Schritte

```powershell
rd /s /q .next
rd /s /q node_modules
npm install
npm run typecheck
npm run build
npm run dev
```

In `next.config.ts` ist `typedRoutes: true` gesetzt, damit Next die App-Routen als Typen erzeugt.
