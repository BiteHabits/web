# Applikasjonens arkitektur

For web-server bruker vi SvelteKit som kjøre det lett å skrive både server og reaktiv klient-kode. SvelteKit vil derfor være en BfF (Backend-for-frontend) for vår Svelte-applikasjon, og kan også fungere som en proxy for andre tjenester vi ønsker å lage/integrere med.

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
    D -->|SQL Queries| B
    B -->|Query Results| D
```
