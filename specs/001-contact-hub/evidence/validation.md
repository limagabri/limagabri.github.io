# Actual validation evidence

2026-10-20, Node 24.19.0, npm 11.9.0; Chromium 156.0.8078.4 via Playwright.

- Production type check and build passed. See build.log for exact sizes: JS 70.00KB gzip,
  CSS 1.63KB gzip (total under 100KB). All runtime fonts/icons/assets local.
- Eight Playwright browser tests passed against the built production preview; see browser-tests.log.
- Tests exercised exact six URLs/order and native navigation using a route-intercepted destination,
  both languages and labels/meta/document language, fresh-load/new-tab reset with pt-BR browser
  and old local/session preferences, no language storage, missing/corrupt/injected image handling,
  44px targets, overflow at 320/375/768/1440px plus 200% CSS zoom, keyboard focus and reduced motion.
- Axe WCAG 2 A/AA and 2.1 AA checks reported no violations in either language, including contrast.
- Visual inspection of 320px and 1440px screenshots confirmed compact centered presentation,
  all six recognizable icons, text legibility, wrapping and no broken photo artifact.
  Review found the Lattes path inherited black currentColor; added the light root color and rechecked.
- Initial empty-UI run: all 8 tests failed as expected before implementation. First implementation:
  6 passed, 2 narrow-width 200% zoom failures. Container layout correction resolved both.
- npm audit --omit=dev found zero vulnerabilities. git diff --check passed.

Limitations: Chromium desktop browser and emulated viewport/CSS zoom checks only; no physical
phone, NFC tag read or QR scan performed. External destinations may require login/CAPTCHA;
exact approved hrefs and native navigation are tested, not access to every remote profile.
No actual owner photograph was available; injected fixture is a geometric SVG, never a portrait.
Production deployment subsequently succeeded and all eight browser tests passed on the actual
HTTPS URL; deployed JS/CSS matched the tested build. See deployment.md, live-browser-tests.log
and live-assets.json. The missing portrait limitation remains.
