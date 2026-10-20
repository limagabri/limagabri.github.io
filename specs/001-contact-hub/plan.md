# Implementation Plan: Personal Contact Hub

**Branch**: `001-contact-hub` | **Date**: 2026-10-20 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-contact-hub/spec.md`

## Summary
Build one static React contact hub with centralized bilingual content, six local service icons,
a circular local portrait or GL fallback, and a compact dark responsive presentation.
Use official Codex Spec Kit skills and retain generated artifacts and actual verification evidence.

## Technical Context
**Language/Version**: TypeScript 5+, Node 24 LTS, React 19.
**Primary Dependencies**: React, React DOM, Vite and its React plugin. Playwright and axe for development checks.
**Storage**: None; language is React state initialized to en, assets are local files.
**Testing**: Playwright Chromium end-to-end checks against the production preview, axe accessibility checks,
TypeScript checking and production build. Manual screenshot/focus/contrast review.
**Target Platform**: Modern mobile and desktop browsers; GitHub Pages at root base /.
**Project Type**: Static single-page web application; no router or backend.
**Performance Goals**: Under 100KB compressed application JS/CSS, no external font or runtime icon downloads.
**Constraints**: No persistent state, approved content only, 44px targets, 320px width, WCAG AA text contrast.
**Scale/Scope**: One page, two languages, six contacts, one replaceable photo.

## Constitution Check
Pre-research: PASS. Approved content and stack fixed; no competing data sources or additional features.
Post-design: PASS. Native links/buttons, local SVGs, memory-only language, external permission gates respected.
Portrait absence remains an explicit limitation. Production success requires actual deployment evidence.
No unjustified complexity or constitution violations.

## Project Structure
### Documentation (this feature)
```text
specs/001-contact-hub/
  spec.md
  plan.md
  research.md
  data-model.md
  contracts/ui.md
  quickstart.md
  tasks.md
  checklists/requirements.md
  evidence/
```
### Source Code (repository root)
```text
src/
  App.tsx
  main.tsx
  styles.css
  data/profile.ts
public/
  images/README.md
  icons/
tests/contact.spec.ts
.github/workflows/pages.yml
playwright.config.ts
package.json
index.html
```
**Structure Decision**: Single Vite project; keep presentation, data, local assets and browser checks distinct.
No service layer or state framework is warranted.
