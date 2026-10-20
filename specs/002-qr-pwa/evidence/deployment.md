# Verified QR PWA production deployment

2026-10-20, https://limagabri.github.io/qr/.

PR #3 merged normally without protection bypass. Commit ba55ff1cd243af20f375ba64031393bf28b2e700.
Workflow https://github.com/limagabri/limagabri.github.io/actions/runs/39492527370 completed successfully:
build job 118869125989 (53s), deploy job 118869587174 (28s).

Live verification used the real HTTPS origin, with TLS verification enabled:

```sh
PLAYWRIGHT_BASE_URL=https://limagabri.github.io npm test -- --workers=2
```

**18 passed**. Sixteen browser scenarios used the published pages (8 original root regressions,
8 QR scenarios). The update-lifecycle browser fixture and content-version generator test remained
local isolated tests; these do not mutate the live server. See live-browser-tests.log.
Failure simulation and portrait-error fixtures use browser interception, never server changes.

Production results:
- Direct /qr/ loads with name, actual photo, exact QR and contacts link. Root behavior still passes.
- Independent jsQR decoding of displayed pixels returns exactly https://limagabri.github.io/ online,
  after offline reload, and from a new offline tab with a query string.
- Actual portrait, QR and local icons available from the prepared cache without network.
- Root is outside scope and has no controller after navigation from the QR card.
- Manifest id/start_url/scope /qr/, standalone display, local 192/512 any + 512 maskable PNGs,
  180 Apple PNG dimensions pass. Chromium reports no manifest or installability-criteria errors.
- Language resets to English, PT translations, a11y, target sizes, focus and mobile/zoom checks pass.
- All 13 precached resources plus the generated worker (14 resources total) match the local tested
  build byte-for-byte, including actual photo and generated icons. See live-assets.json SHA-256 hashes.

Phone-only checks not performed: actual Android/iPhone installation, home-screen icon launch and
OS-native standalone presentation, offline reopening of that native installed instance, and scanning
with another phone's camera. README/quickstart provide the manual checklist. Automated display/launch
configuration and screenshot decoding do not establish those hardware results.
