# Research

Research agent consulted as required by the installed plan skill; primary sources reviewed.

## Entry isolation
Decision: Vite multi-page root index.html plus qr/index.html; no router or rewrite.
Rationale: GitHub Pages serves real directory HTML; original root entry remains unchanged.
Alternative: SPA fallback/404 routing rejected.
Source: https://vite.dev/guide/build.html#multi-page-app

## Scoped offline lifecycle
Decision: register /qr/sw.js with scope /qr/ only from QR entry; precache a generated explicit
QR dependency allowlist with addAll; content-hash cache version includes photo/icons and HTML.
Use normal waiting updates, activate cleanup of QR-prefixed caches only, clients.claim on first install.
Rationale: root stays uncontrolled, first successful preparation supports reload, fixed-name edits
invalidate worker version, old pages are not forcibly switched to new incompatible assets.
Alternatives: root SW, runtime cache of arbitrary URLs, unconditional skipWaiting and photo-less
shell rejected. Cache eviction/first-ever offline load cannot be guaranteed by a web app.
Sources: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

## Installation
Decision: id/start_url/scope /qr/, standalone, local 192/512 any and 512 maskable PNG, Apple 180 PNG.
Provide English/PT manual Android and iPhone menu guidance, not a universal fake install button.
Rationale: iOS installation and available prompts differ; metadata can be verified but native install
and icon launch still require actual phone checks.
Sources: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/start_url
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display
https://web.dev/learn/pwa/installation

## QR generation and independent decoding
Decision: qrcode development-only generates static SVG, error correction M, 4-module white margin,
black modules, exact target https://limagabri.github.io/. Decode browser-rendered PNG pixels with jsQR,
a different library, online/offline. sharp generates original GL app icons locally, pngjs reads screenshots.
Rationale: no runtime paid/remote service, no unnecessary QR runtime JS; screenshot test verifies output.
Alternative: comparing only source payload or QR generator input rejected as insufficient validation.
Sources: https://github.com/soldair/node-qrcode and https://github.com/cozmo/jsQR

## Owner changes
Current main now includes actual public/images/profile.jpg and an approved CSS crop. Reuse both;
do not restore the older missing-photo state or undo owner edits.
