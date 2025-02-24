# Applikasjonens arkitektur

For web-server bruker vi SvelteKit som kjøre det lett å skrive både server og reaktiv klient-kode. SvelteKit vil derfor være en BfF (Backend-for-frontend) for vår Svelte-applikasjon, og kan også fungere som en proxy for andre tjenester vi ønsker å lage/integrere med.

SvelteKit serveren våres er hva brukeren samhandler med. Dette kan være enten gjennom statiske filer på serveren som HTML, CSS og JavaScript, eller dynamiske API-endepunkter som brukerene kan sende forespørsler til.

De dynamiske API-endepunktene kan der igjen hente ut informasjon fra databasen basert på brukeren sin forespørsel.

```mermaid
graph TD
    subgraph Client
      A[User Browser]
    end

    subgraph Server
        subgraph SvelteKit_App["SvelteKit Application"]
          B[API Endpoints]
          C[Static Files]
        end

        subgraph Database
          D[SQLite Database]
        end
    end

    A -->|Loads static files| C
    A -->|Requests endpoints| B
    B -->|SQL Queries| D
    D -->|Query Results| B
    SvelteKit_App -->|Requested files| A
```
