# Changelog

## v0.8.0

- Finalized selected GoodLoop logo direction.
- Replaced logo and app icon SVG assets with the chosen Healthy/Heart/Move balance mark.
- Added the finalized brand mark to Login, Onboarding, Home, Goals, Progress, Profile, Friends and Mock screens.
- Updated brand preview SVG to reflect the v0.8 identity.
- Updated app metadata/package version.
- No required Supabase schema changes.


## v0.7.0

- Branding and wording release.
- Refined GoodLoop logo and app icon.
- Added `public/brand-preview.svg`.
- Added `BRANDING.md` and `WORDING_GUIDE.md`.
- Smoothed German and English app wording.
- Removed overly sarcastic in-app copy in favor of calm, supportive product language.
- No required Supabase schema changes.

## v0.6.0

- Stabilization and simplification release.
- Removed Friends from the bottom navigation to keep the MVP focused and calm.
- Friends remains available from the Profile page as an optional prepared area.
- Added global loading, error and not-found screens.
- No required Supabase schema changes.
- No new product feature layer added intentionally.

## v0.5.0

- Added Friends area under `/friends`.
- Added optional milestone sharing preparation in Profile.
- Added Supabase migration for `friend_connections`, `milestone_shares` and `profiles.share_milestones_enabled`.
- Social remains intentionally prepared only: no rankings, no public feed, no automatic negative updates.

## v0.4.0

- Added reminder preparation in the Profile page.
- Added reminder enabled/time fields to profiles.
- Added Home nudge for users with active goals but disabled reminders.
- Added Supabase migration for reminder fields.
- Updated German and English translations.
- No real push notifications yet, intentionally.

## v0.3.0

- Added weekly review card on the Progress page.
- Added simple weekly GoodLoop score.
- Added best-day calculation for the last 7 days.
- Added friendly progress insights.
- Added milestone card without competitive ranking.
- Added micro-win card on the Home page.
- Added PWA/install information in Profile.
- Extended German and English translations.
- No required Supabase schema changes.

## v0.2.2

- Fixed TypeScript issues around Supabase relation typing.
- Fixed typed route issue with empty-state links.
- Pinned Next.js version for a more stable build.

## v0.2.0

- Added goal management.
- Added pause/resume/complete/cancel actions.
- Added goal progress labels.
- Added profile visibility preparation.
- Added PWA manifest.
