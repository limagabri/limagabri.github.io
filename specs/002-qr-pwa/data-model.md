# Data model

- QR target: exact immutable string https://limagabri.github.io/; no query, fragment or /qr/ destination.
- Profile identity: shared profile.ts name, photo, initials and bilingual role; no copied portrait.
- Language: en | pt-BR; initial en, explicit button transition only, reload resets; never persisted.
- Offline state: preparing -> ready after active scoped worker/cache install, or error on rejection/redundancy.
  Retry online returns to preparing. Cache-storage failure cannot produce ready.
- Precache version: SHA-256 of ordered URL/content pairs, prefix gabriel-qr-; all resources same origin.
  Installation stages new complete cache; normal waiting retains active version until old clients close.
- Install identity: id/start_url/scope /qr/, display standalone, local icon size/purpose declarations.
