# Implementation Plan: Offline QR Contact Card

**Branch**: `002-qr-pwa` | **Date**: 2026-10-20 | **Spec**: [spec.md](spec.md)

**Input**: `/specs/002-qr-pwa/spec.md`

## Summary
Add an isolated Vite multi-page /qr/ entry, static generated black-on-white QR, current local
portrait, bilingual React UI and installation instructions. A scoped /qr/ service worker precaches
an atomic version of its complete dependency graph. Root UI/entry remains unchanged.

## Technical Context
**Language/Version**: existing Node 24, React 19, TypeScript 7, Vite 8; Specify CLI 1.2.2.
**Primary Dependencies**: Existing React runtime only. qrcode + sharp development-only for assets;
jsqr + pngjs development-only for independent screenshot decoding. No runtime QR API/library.
**Storage**: Feature-specific Cache Storage for offline resources only. Language remains memory-only.
**Testing**: Existing 8 root browser scenarios plus QR decode, real-photo offline reload/new-tab,
manifest/icon/scope, failed install/retry, safe update lifecycle, accessibility and mobile checks.
**Target Platform**: HTTPS GitHub Pages, Chromium/Android and Safari/iOS PWA-capable browsers.
**Project Type**: Static multi-page site, no backend/router/paid service.
**Performance Goals**: QR runtime adds no QR generator library; precache only QR dependencies and local assets.
**Constraints**: Root outside SW scope; no language persistence; normal lifecycle updates;
quiet zone >=4 modules; black/white QR with no logo overlays; 44px touch targets and 320px layout.
**Scale/Scope**: One companion, two languages, fixed permanent QR payload, one existing photo.

## Constitution Check
Pre-research PASS: owner explicitly authorizes scoped QR exception; constitution 1.1.0 preserves all root rules.
Post-design PASS: locally generated assets, native actions, scoped worker, real readiness, truthful phone-test limits.
No open design clarifications, no additional user approval required. Profile asset now exists.

## Project Structure
### Documentation (this feature)
```text
specs/002-qr-pwa/
  spec.md plan.md research.md data-model.md quickstart.md tasks.md
  contracts/pwa.md checklists/requirements.md evidence/
```
### Source Code (repository root)
```text
qr/index.html
src/qr-main.tsx
src/QrPage.tsx
src/qr.css
src/data/qr.ts
src/qr-offline.ts
scripts/generate-qr-assets.mjs
scripts/build-qr-worker.mjs
public/qr/manifest.webmanifest
public/qr/code.svg
public/qr/icons/
tests/qr.spec.ts
```
**Structure Decision**: Keep src/App.tsx and main.tsx intact; QR imports existing shared CSS/data.
Vite build manifests drive recursive QR precache dependencies. Asset generator runs prebuild,
worker generator postbuild. Existing CI npm run build/npm test covers both entries.

## Offline and installation design
Manifest id/start_url/scope /qr/, display standalone, any-purpose 192/512 PNGs, maskable 512 PNG,
Apple touch icon 180 PNG. Manual Android/iPhone installation instructions are always available;
no fake installation action. Optional browser prompts are not required for native menu installation.
Register /qr/sw.js only from QR entry, scope /qr/. Generate version from bytes of every precache
resource including fixed-name photo/icons/manifest. Install addAll atomically; failed installs never
report ready. Active worker claims in-scope clients. Cache-first known GET local assets and canonical
QR navigation; no root navigation interception or cross-origin caching. Cleanup only QR prefix.
Do not skipWaiting: a ready update waits for old QR clients to close, preventing mixed-version takeover.
Report real preparation ready/error and allow online retry if installation fails.
