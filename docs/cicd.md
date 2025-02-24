# CI/CD

## CI

Vi har en enkel CI-pipeline som er satt opp i GitHub Actions. Den blir kjørt hver gang noen pusher noe til `main`-branchen eller lager en PR til `main`. Den sjekker at koden følger bestemte regler og standarder, bygger koden og kjører tester.

Den består hovedsakelig av 4 deler:

### 1. Avhengigheter

Først henter vi koden fra GitHub og laster ned nødvendige avhengigheter som `node` og `pnpm`. Deretter bruker vi `pnpm` til å laste ned repoets avhengigheter.

### 2. Linting og statisk analyse

Deretter kjører vi `pnpm lint` for gjør statisk analyse av koden. Dette er for å sikre at koden følger bestemte regler og standarder.

### 3. Bygging

Når lintingen er ferdig kjører vi `pnpm build` for å bygge koden. Dette er for å generere en kjørbar versjon av koden.

### 4. Tester

Etter det kjører vi `pnpm build` for å migrere databasen. Vi bruker en lokal SQLite-database. `DATABASE_URL` er også definert øverst i GitHub Actions-filen.

Så til slutt må vi laste ned nettleserne med `pnpm exec playwright install` sånn at vi kan kjøre ende-til-ende tester med Playwright. Vi kjører også enklere unit-tester med Vitest i samme kommando.

## CD

Vi har ingen continuous deployment enda...
