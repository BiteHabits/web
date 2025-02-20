# Running

## Avhengigheter

Denne appen krever at du har følgende lastet ned på datamaskinen din:

- `git@2.x.x`
- `pnpm@9.x.x`

## Hvordan kjøre

For å kjøre applikasjonen må du først passe på at alle avhengigheter er lastet ned. Du kan laste ned avhengigheter med `pnpm install`.

Deretter må du oppdatere databasen til siste migrasjon. Dette kan bli gjort med `pnpm db:migrate`.

For å da kjøre selve nettsiden må du kjøre `pnpm dev`. Da vil nettsiden kjøre på [localhost:5173](http://localhost:5173).
