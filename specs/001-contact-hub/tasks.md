# Tasks: Personal Contact Hub

**Input**: specs/001-contact-hub/{spec,plan,research,data-model}.md and contracts/ui.md.
**Tests**: Required by spec. Behavior tests precede story implementation and must fail first.

## Phase 1: Setup
- [x] T001 Initialize Vite React TypeScript package, lockfile and scripts in package.json, tsconfig.json, vite.config.ts, index.html and .gitignore.
- [x] T002 Configure production-preview browser testing in playwright.config.ts and tests/contact.spec.ts.

## Phase 2: Foundational
- [x] T003 Centralize exact name, role, language copy, six approved http/https URLs and ordering in src/data/profile.ts; both language keys required, initial language en, no storage.
- [x] T004 [P] Vendor six recognizable service SVGs and licenses in public/icons/ and THIRD_PARTY_NOTICES.md.

## Phase 3: US1 - Reach profiles (P1)
Goal: Six accurate accessible contact cards in approved presentation.
Independent test: Open production preview at 320px and desktop, inspect order/targets, activate native links.
- [x] T005 [US1] Write and observe failing exact-link/order, target-size and responsive checks in tests/contact.spec.ts.
- [x] T006 [US1] Implement one main heading and native full-card links with local icons and outgoing indicators in src/App.tsx and src/main.tsx.
- [x] T007 [US1] Implement compact navy/purple/teal responsive layout, visible focus and reduced motion in src/styles.css.

## Phase 4: US2 - Portuguese (P2)
Goal: In-memory language switching with fresh-load English.
Independent test: Start with Portuguese browser/storage, switch PT, inspect translated copy/lang, reload to English.
- [x] T008 [US2] Write and observe failing translation/reset and no-storage checks in tests/contact.spec.ts.
- [x] T009 [US2] Implement EN/PT buttons, translated labels, description and document language in src/App.tsx using src/data/profile.ts.

## Phase 5: US3 - Maintenance (P3)
Goal: Replaceable local photo and documented stable publication.
Independent test: Serve a valid test image at documented path; verify it replaces GL; simulate error and see fallback.
- [x] T010 [US3] Write and observe failing photo success/error checks in tests/contact.spec.ts.
- [x] T011 [US3] Implement proportional circular portrait and GL load/error fallback in src/App.tsx; document path in public/images/README.md.
- [x] T012 [P] [US3] Document content/photo edits, phone maintenance, checks and publication in README.md.
- [x] T013 [US3] Add automated build/check/Pages deployment in .github/workflows/pages.yml after inspecting settings; use authorized branch/merge.

## Phase 6: Polish and verification
- [x] T014 Run production build and complete browser checks, axe, focus/contrast/reduced-motion/zoom/overflow review; retain evidence in specs/001-contact-hub/evidence/.
- [x] T015 Review all artifacts, execute installed converge skill and append any discovered work to specs/001-contact-hub/tasks.md; resolve feasible findings.
- [ ] T016 Publish through normal GitHub workflow, inspect deploy result and verify https://limagabri.github.io against built output; record evidence in specs/001-contact-hub/evidence/deployment.md.

## Dependencies & Execution Order
T001 -> T002 -> foundation (T003/T004) -> US1 -> US2 -> US3 -> validation -> convergence -> publication.
US2 tests are independently assessable after its UI is added; photo fallback integrates the same header.
T004 and T003 concern independent files. T012 can proceed while T011 is implemented.

## Parallel Examples
US1: icon acquisition (T004) and data design (T003) can run independently after setup.
US2: reset/translation scenarios can be reviewed independently of visual styling; edits to App.tsx remain sequential.
US3: README instructions (T012) and photo handling (T011) can be prepared independently.

## Implementation Strategy
Build the primary contact experience first, validate its story, then add language and maintenance behavior.
Deliver all three stories as one complete product as requested; do not stop at an MVP or publish intermediate slices.
External permissions and the absent owner photo must be reported honestly, never checked off as complete.

## Review
16 tasks, US1:3, US2:2, US3:4, shared/setup/polish:7. Format and coverage reviewed.
No extension hooks are configured. No clarification is needed beyond already documented missing external assets.

## Phase 7: Convergence
- [ ] T017 Enable GitHub Actions as the Pages source with an authorized owner credential, publish via .github/workflows/pages.yml, and verify live output in specs/001-contact-hub/evidence/deployment.md per FR-009, SC-006 and Constitution V (partial, HIGH; HTTP 403 external blocker).
- [ ] T018 Integrate the actual selected owner portrait at public/images/profile.jpg and verify the deployed crop per US3/AC2 and Constitution V (missing, HIGH; owner asset unavailable). Keep the verified GL fallback meanwhile.
