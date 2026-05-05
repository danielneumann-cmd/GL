# Upgrade v0.7

GoodLoop v0.7 ist ein Branding- und Wording-Update.

## Neu

- Logo überarbeitet
- App-Icon überarbeitet
- Branding-Vorschau als `public/brand-preview.svg`
- `BRANDING.md` ergänzt
- `WORDING_GUIDE.md` ergänzt
- App-Wording in Deutsch und Englisch geglättet
- Texte weniger sarkastisch, ruhiger und produktnäher
- README und CHANGELOG aktualisiert

## Supabase

Keine neue Migration nötig.

Wenn du von v0.6 kommst, musst du in Supabase nichts ausführen.

## Test

```powershell
rd /s /q .next
npm install
npm run typecheck
npm run build
npm run dev
```
