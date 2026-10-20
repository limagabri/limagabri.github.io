# Gabriel de Souza Lima

Personal contact page for https://limagabri.github.io, built with React, TypeScript and Vite.
One unified contact list, English on every fresh load, and a manual Brazilian Portuguese option.
No analytics, backend, stored language preference, remote fonts or runtime icon services.

## Local development and checks

Use Node 24 and npm:

```sh
npm ci
npm run dev
```

For production validation:

```sh
npm run build
npx playwright install --with-deps chromium
npm test
npm run preview
```

The browser suite checks exact profile destinations/order and native navigation, language switching
and fresh-load reset with Portuguese browser settings, absent/corrupt/supplied photo handling,
keyboard focus, accessible names, WCAG A/AA automated checks, reduced motion, target sizes and overflow
at 320/375/768/1440px including 200% CSS zoom. Screenshots and traces are in `test-results/`,
and the interactive report is in `playwright-report/` (both ignored by Git).
Automated checks do not replace actual physical-device, NFC or QR tests.

## Update the photograph

The selected BRACIS portrait is stored at `public/images/profile.jpg` and reused by both pages.
GL remains the fallback for image loading errors.
Save the owner's photo as **`public/images/profile.jpg`** (exact spelling). Prefer a natural square
head-and-shoulders crop, 400–600px and under 150KB. The circular crop preserves proportions.
Replace this same file and commit; no component edits are needed. A missing/invalid image falls back
to GL. Test images are intercepted browser fixtures, never portraits published as owner photographs.

## Edit contacts and languages

Edit **`src/data/profile.ts`** to change the name, introduction, ordered contacts or translations.
The contact array controls visible order. Each contact has an `id`, `name`, `href`, and descriptions
for `en` and `pt-BR`; keep both translations. Put any added service's matching SVG in
`public/icons/<id>.svg`, preserve its attribution/license, and update the browser contract if the
approved contact list changes. The current six destinations are from PROFILE_CONTENT.md.
The Lattes URL intentionally preserves the exact owner-provided HTTP address.

`src/App.tsx` renders the data. `src/styles.css` controls presentation. Language is memory-only:
reloading always starts in English, regardless of browser language or previous choice.

## Publication

GitHub **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**.
The workflow `.github/workflows/pages.yml` checks PRs and, on `main`, installs from the lockfile,
type-checks/builds, runs browser checks and publishes only `dist` through the `github-pages` environment.
It uses restricted permissions and GitHub's Pages OIDC deployment flow. Follow repository branch
and environment rules; do not bypass protections. A successful build is not proof of a deployed site:
inspect the deployment job and open the permanent URL to verify the served page.

The initial integration could not change the Pages source (403). The owner enabled GitHub Actions
and the production build/deploy succeeded. The live URL passed all eight browser scenarios, and
its JS/CSS matched the tested build byte-for-byte. Evidence, workflow links and remaining photo
limitations are recorded in `specs/001-contact-hub/evidence/deployment.md`.

## Maintain from a phone

1. Open this repository on GitHub in your mobile browser and sign in as the owner.
2. For text/links, open `src/data/profile.ts`, choose the edit pencil, update both languages,
   and use **Commit changes** on a branch, then open a pull request.
3. For a photo, open `public/images`, choose **Add file → Upload files** (use the browser's desktop-site
   view if needed), select `profile.jpg`, and commit through a branch/PR. Alternatively use GitHub's
   web editor opened with the `.` shortcut on a keyboard or **Open with github.dev** where available.
4. Review checks, merge through GitHub's normal controls, then watch **Actions** and **Deployments**.
5. Open https://limagabri.github.io and reload to verify the update. The URL remains unchanged,
   so an NFC tag or printed external QR code pointing there does not need to be rewritten.

## Official Spec Kit evidence

Specify CLI **1.2.2** was installed with `uv tool install specify-cli` and initialized with
`specify init --here --integration codex --force` in the existing repository.
Codex integration installs `.agents/skills/speckit-*/SKILL.md`. The agent executes these instructions
as `$speckit-constitution`, `$speckit-specify`, `$speckit-plan`, `$speckit-tasks`,
`$speckit-implement`, and `$speckit-converge`; these are agent skills, not CLI prose generators.
Generated constitution, scripts, resolved templates, spec, plan, design contracts, tasks and review
records are retained under `.specify/` and `specs/001-contact-hub/`.
See evidence for exact outcomes and outstanding external limitations.

Service logos and licenses: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Offline QR companion and installation

Open **https://limagabri.github.io/qr/** on your phone. The large black-on-white code points exactly
to https://limagabri.github.io/ and is generated locally at build time, without a QR service.
The card reuses the name, role and actual portrait from the contact page. EN is the initial language
on each fresh load; PT selection stays in memory only. The original root contact UI is unchanged.

Wait for **Ready offline** before disconnecting. This confirms the scoped worker has successfully
prepared its complete local version, including QR, actual photo, styles and home-screen icons.
If saving fails, connect and use the retry button. Once ready, reload or reopen `/qr/` offline.
The **Open contacts** link leads to `/`, which still requires internet; external profiles also need internet.
Browser storage can be cleared/evicted, so reconnect and wait for readiness again if necessary.

To install:

- Android: open `/qr/` in a supporting browser, then its menu → **Install app** or **Add to Home Screen**.
- iPhone: open `/qr/` in Safari, then **Share → Add to Home Screen**. The browser controls the available options.

The manifest configures id/start_url/scope `/qr/`, display `standalone`, local normal 192/512 icons,
a maskable 512 icon and Apple touch 180 icon. Installation UI/availability varies by browser/OS.
The installed icon is configured to launch `/qr/`, not the root contact page.

### Maintain the QR and offline cache

`src/data/qr.ts` centralizes the exact QR target and bilingual companion copy.
`scripts/generate-qr-assets.mjs` creates the QR SVG and original vector GL app icons during prebuild.
Do not manually edit generated files under `public/qr/code.svg` or `public/qr/icons/`; edit the generator.
`public/qr/manifest.webmanifest` defines installation identity.
`qr/index.html` is the real GitHub Pages directory entry, not a client-side routing fallback.

`scripts/build-qr-worker.mjs` runs after Vite, follows the QR build dependency graph and emits
`dist/qr/sw.js`. Its version hashes all resource contents, including fixed-name photo/icons and
worker generation logic. The worker is registered only by `/qr/`, with scope `/qr/`; root pages are
not controlled. A new complete version waits until old QR clients close before activation.
After an update, close all open QR windows/tabs and reopen online once; then wait for readiness.
Only this feature's old `gabriel-qr-` caches are removed. No language preference is cached or persisted.

### Automated and phone checks

`npm run build` and `npm test` cover both pages. The QR tests independently decode rendered pixels
with jsQR, check exact payload, actual photo and icons after offline reload/new-tab launch, truthful
cache failure/retry, safe update lifecycle and content versioning, manifest/local icon dimensions,
Chromium installability criteria, root isolation, translations, accessibility and mobile layouts.
Evidence and Spec Kit artifacts: `specs/002-qr-pwa/`.

Automated configuration checks do **not** prove installation on a real phone. On your phone:

1. Install from `/qr/`, launch from its home-screen icon, and confirm `/qr/` opens without browser chrome.
2. Wait for readiness online, close/reopen offline and inspect the photo and QR.
3. Scan the displayed code from another phone at typical brightness/distance; confirm it opens the root contacts URL.
4. Check Android and iPhone separately if both platforms matter. Hardware installation and camera scans are not claimed as performed here.
