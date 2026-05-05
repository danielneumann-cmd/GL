# Upgrade auf GoodLoop v0.9

v0.9 ist ein UI-Feinschliff. Es werden keine neuen Produktfunktionen und keine neuen Supabase-Tabellen eingeführt. Ja, wirklich. Ein Feature-Stopp, die seltene Orchidee der Softwareentwicklung.

## Enthalten

- ruhigere App-Shell
- hochwertigere Bottom-Navigation
- stärkere Header-/Logo-Flächen
- feinere Karten, Buttons und Zielkarten
- besserer Home-Hero
- Prozentanzeige im Fortschrittsring
- Login und Onboarding visuell geglättet

## Supabase

Wenn v0.8 läuft, musst du in Supabase nichts Neues ausführen.

## Lokal aktualisieren

```powershell
cd C:\Projekte\goodloop
rd /s /q .next
npm install
npm run typecheck
npm run build
npm run dev
```

## GitHub

```powershell
git add .
git commit -m "Polish GoodLoop UI v0.9"
git push
```
