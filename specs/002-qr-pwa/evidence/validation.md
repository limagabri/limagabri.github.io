# Automated local validation

Node 24, Specify CLI 1.2.2, React/TypeScript/Vite production build and Chromium browser checks.
Build passed; browser suite **18 passed**: 8 original root scenarios and 10 QR/PWA scenarios.
See build.log and browser-tests.log for actual outputs, red-tests.log for pre-implementation failures.

- QR screenshot decoded with jsQR independently of qrcode generator to exactly https://limagabri.github.io/.
- Decode passed online, offline reload and new offline tab; actual owner portrait loaded from cache.
- All local app icons/manifest/photo included in the 13-resource allowlist and fetched offline.
- Manifest id/start_url/scope /qr/, display standalone; local PNG dimensions/purposes and Apple icon pass.
- Chromium CDP Page.getAppManifest reports no errors; Page.getInstallabilityErrors returns no criteria errors.
  This does not assert that a native phone installation was performed.
- Real resource failure returns truthful offline error; online retry installs successfully; unrelated cache survives.
- Updated worker remains waiting while old QR client is open, activates after it closes, removes only older
  QR versions, and the new version reopens offline. Fixed-name photo/icon edits change content version.
- All original root link/language/portrait/layout/keyboard/axe checks pass; root controller is null even
  after coming from a controlled QR tab. Root App.tsx, main.tsx, data/profile.ts and styles.css unchanged.
- 320/375/768/1440px, both languages, 44px controls, no overflow including 200% CSS zoom, visible focus,
  reduced-motion browser context and axe A/AA checks pass. 320px screenshot visually reviewed.
- npm audit --omit=dev: zero vulnerabilities. git diff --check passed.

Review fixes: corrected an ambiguous test locator matching both installation instructions; worker
version now includes generator logic as well as every asset; GL icon uses vector paths for reproducibility.

Not performed: actual Android/iPhone home-screen installation, physical standalone icon launch,
or another phone's camera scan. Follow quickstart/README hardware checklist for those checks.
