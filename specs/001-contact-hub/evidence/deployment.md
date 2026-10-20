# Verified production publication

Verified 2026-10-20 at https://limagabri.github.io/.

- Owner changed Pages Source to GitHub Actions; GET Pages now confirms build_type workflow.
- PR #1 merged through the ordinary GitHub merge path without bypassing any protection.
- Deployed commit: 107bb52556e184141276d75d4430c1befc917cdb.
- Workflow: https://github.com/limagabri/limagabri.github.io/actions/runs/39485753221
- Build job 118845596490: success, 35 seconds; includes production build and 8 Chromium browser checks.
- Deploy job 118845894437: success, 19 seconds; configure-pages and deploy-pages both succeeded.
- HTTPS GET serves the React page with English initial HTML and the expected Vite assets.
- Both deployed JS/CSS assets match the local tested build byte-for-byte; SHA-256 values are
  retained in live-assets.json.
- Reused all eight existing browser scenarios against the actual production URL: **8 passed**.
  The temporary config kept tests/contact.spec.ts unchanged, used baseURL https://limagabri.github.io,
  Chromium, 2 workers, no local webServer, and the configured HTTPS proxy with TLS verification enabled.
  See live-browser-tests.log. Portrait failure/success and external navigation use controlled route
  fixtures as in the local suite; actual production currently displays the GL fallback.
- Screenshots at 320px and 1440px from production retained as live-320-pt.png and live-1440-pt.png.

The earlier HTTP 403 was resolved by the owner's Pages setting change. It was not bypassed.
The selected BRACIS photograph is still unavailable. Actual physical-device/NFC/QR tests were not performed.
No full product/asset completion or Spec Kit convergence is claimed while the selected photograph remains missing.
