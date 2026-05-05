# Upgrade auf GoodLoop v0.6

GoodLoop v0.6 ist eine Stabilisierungsversion. Sie fügt bewusst keine große neue Produktlogik hinzu.

## Wichtig

Von v0.5 auf v0.6 ist keine neue Supabase-Migration nötig.

## Änderungen

- Bottom-Navigation wieder auf vier zentrale Bereiche reduziert: Heute, Ziele, Fortschritt, Profil.
- Freunde/Social bleibt vorbereitet und ist weiter über das Profil erreichbar.
- Globale Ladeanzeige ergänzt.
- Globale Fehlerseite ergänzt.
- 404-Seite ergänzt.

## Update lokal

```powershell
cd C:\Projekte\goodloop
rd /s /q .next
npm install
npm run typecheck
npm run build
npm run dev
```

## Warum kein neues Feature?

GoodLoop soll einfach bleiben. Nach v0.5 ist genug Funktionalität vorhanden, um die App sinnvoll zu testen. v0.6 räumt daher auf und reduziert sichtbare Komplexität, statt weitere Funktionen in die App zu kippen.
