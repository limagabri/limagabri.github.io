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

The actual selected BRACIS portrait is not present. The page shows GL until it is supplied.
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

The initial environment can read Pages settings but cannot read Actions-permission or detailed
branch-protection settings (403); branch metadata reports main unprotected and no rulesets.
Any publication permission failure is recorded in `specs/001-contact-hub/evidence/`.

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
