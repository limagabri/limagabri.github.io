# Quickstart validation

Requires Node 24 and npm. From the repository root:

```sh
npm ci
npx playwright install chromium
npm run build
npm test
npm run dev
```

Build must type-check and create dist. Tests start a production preview, verify both languages and
fresh-load reset, exact approved destinations/order, portrait fallback and supplied-photo display,
keyboard focus, target sizes, responsive overflow and accessibility. Inspect the produced screenshots
at 320px and desktop widths. `npm run preview` serves built output locally, not production.
See [UI contract](contracts/ui.md) and [data model](data-model.md).

Publication: use the Pages workflow from main after authorized merge. Inspect its deploy job and
https://limagabri.github.io; verify the served asset hashes match dist. Do not label NFC or physical
QR testing as passing without hardware. The selected BRACIS photograph is still missing.
