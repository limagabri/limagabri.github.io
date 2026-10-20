# Tasks: Offline QR Contact Card

Input: spec.md, plan.md, research.md, data-model.md, contracts/pwa.md.
Tests explicitly required. Deliver all stories and verify production, not just scaffolding.

## Phase 1: Setup
- [x] T001 Add development-only generation/decoder dependencies and build hooks in package.json and package-lock.json.
- [x] T002 Add QR build input while preserving root input in vite.config.ts and qr/index.html.

## Phase 2: Foundation
- [x] T003 Centralize exact target https://limagabri.github.io/ and both required en/pt-BR copy keys in src/data/qr.ts; no persisted language.
- [x] T004 [P] Generate black/white 4-module-margin QR and normal/maskable/touch PNG icons in scripts/generate-qr-assets.mjs and public/qr/.

## Phase 3: US1 - Present card (P1)
Independent test: Decode displayed pixels at phone widths, inspect actual portrait and native contacts link.
- [x] T005 [US1] Write and observe failing QR decode, language/reset and mobile/a11y scenarios in tests/qr.spec.ts.
- [x] T006 [US1] Implement isolated bilingual card with shared portrait/name, large QR and root link in src/QrPage.tsx, src/qr-main.tsx and src/qr.css.

## Phase 4: US2 - Offline (P1)
Independent test: First completed visit, offline reload/new tab, actual photo/icons and QR decoding.
- [x] T007 [US2] Write and observe failing offline, scope, failed-preparation/retry and update-lifecycle scenarios in tests/qr.spec.ts.
- [x] T008 [US2] Generate versioned allowlisted precache from QR build graph and all local asset bytes in scripts/build-qr-worker.mjs; prefix gabriel-qr-, no skipWaiting or root navigation interception.
- [x] T009 [US2] Register scope /qr/ and render truthful preparing/ready/error plus retry behavior in src/qr-offline.ts and src/QrPage.tsx.

## Phase 5: US3 - Install (P2)
Independent test: Validate local manifest/icons/start URL and document physical-phone checklist separately.
- [x] T010 [US3] Write and observe failing manifest/icon/launch metadata checks in tests/qr.spec.ts.
- [x] T011 [US3] Add id/start_url/scope /qr/, standalone and local icon metadata in public/qr/manifest.webmanifest and qr/index.html; add translated manual phone installation guidance in src/QrPage.tsx.
- [x] T012 [P] [US3] Document QR maintenance, offline lifecycle, install steps and phone-only checks in README.md and specs/002-qr-pwa/quickstart.md.

## Phase 6: Review and delivery
- [x] T013 Run production build, all root regressions and QR scenarios, screenshot/a11y/keyboard/zoom/reduced-motion checks; retain evidence in specs/002-qr-pwa/evidence/.
- [x] T014 Review current code against artifacts through installed converge skill; append and resolve findings in specs/002-qr-pwa/tasks.md until buildable scope converges.
- [x] T015 Publish by normal PR/merge via .github/workflows/pages.yml and verify actual deploy plus live QR/manifest/offline/root; record specs/002-qr-pwa/evidence/deployment.md.

## Dependencies and parallel opportunities
Setup -> foundation -> US1 -> US2 -> US3 -> review -> publication.
US1 T005 precedes T006. US2 T007 precedes T008/T009. US3 T010 precedes T011.
T003 data and T004 asset generator use distinct files. US3 README can be drafted while metadata is implemented.
No parallel edits to the same UI files. Existing root tests remain independently executable.

## Implementation strategy
Build and validate QR sharing first, then offline, then installation configuration; ship all together.
No root UI edits or added root controls. Tests may run in separate isolated browser contexts to avoid cache leakage.

## Review
15 tasks: setup/foundation 4, US1 2, US2 3, US3 3, delivery 3. IDs/paths and story coverage checked.
No extension hooks configured. Physical phone installation/camera tests are documented follow-up, not automated gates.

## Phase 7: Convergence
- [x] T016 Complete publication and verify actual /qr/ HTTPS manifest, decoded QR, offline reload/new tab and root regressions; retain specs/002-qr-pwa/evidence/deployment.md per FR-012 and SC-006 (partial). Local code and 18 tests satisfy the remaining buildable scope.
