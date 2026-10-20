# Validation guide

Node 24, npm and Chromium via Playwright required.

```sh
npm ci
npx playwright install --with-deps chromium
npm run build
npm test -- --workers=2
npm run preview
```

Open / and /qr/. Tests must independently decode the rendered QR to the exact root URL,
wait for activated scoped worker and offline readiness, then disable network and reload/new-tab /qr/.
Check actual portrait and icons from cache, English reset and Portuguese switch; root remains uncontrolled.
Inspect manifest declared dimensions/purpose and direct start_url. Exercise failed-cache retry and version updates.
Review screenshots at 320px and desktop and accessibility/focus/reduced-motion/200% zoom results.

Deploy with normal PR/merge and Pages Actions, inspect actual deploy, then repeat QR/offline/manifest
and root checks against HTTPS production. Production cold offline remains outside the guarantee.

Physical-phone follow-up, not automated proof: install via Android browser menu or iPhone Safari Share,
launch from home screen and confirm standalone /qr/, disconnect/reopen, and scan QR with another phone.

To reuse the same browser contracts on production (no local preview server), run:

```sh
PLAYWRIGHT_BASE_URL=https://limagabri.github.io npm test -- --workers=2
```

The update/version tests still use isolated local fixtures; the remaining browser scenarios use the
provided production origin. Offline route fixtures simulate failures and do not mutate production.
