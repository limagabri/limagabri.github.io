# Feature Specification: Offline QR Contact Card

**Feature Branch**: `002-qr-pwa`

**Created**: 2026-10-20

**Status**: Reviewed

**Input**: Owner requests a mobile /qr/ companion, installable with standalone launch at /qr/,
showing a large high-contrast QR to https://limagabri.github.io/, name, photo and contact button;
offline after first load, English initial/PT selector, preserve root, deploy and verify.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Present my contact QR (Priority: P1)
Gabriel opens /qr/ on a phone and shows a clear QR to someone who wants his contact profiles.

**Why this priority**: Sharing the permanent contact URL is the central user outcome.

**Independent Test**: Open /qr/ at 320px and larger, decode the displayed QR and follow the contacts button.

**Acceptance Scenarios**:
1. **Given** /qr/, **When** it loads, **Then** the exact approved name and current local portrait appear,
   with a large black-on-white square QR encoding exactly https://limagabri.github.io/.
2. **Given** the card, **When** the contacts button is activated, **Then** the existing root page opens
   using a native link; no contact destinations or root interface behavior change.
3. **Given** the English initial screen, **When** PT is chosen, **Then** all descriptive/accessibility
   copy and document language change to Brazilian Portuguese; a fresh load returns to English.

### User Story 2 - Show the card without internet (Priority: P1)
After one complete online load, Gabriel reopens or reloads /qr/ without connectivity.

**Why this priority**: Conference connectivity is unreliable and the code must remain available.

**Independent Test**: Wait for confirmed offline readiness, disconnect browser network, reopen /qr/
in a new tab and verify QR decoding, actual photo, icons, language switching and layout.

**Acceptance Scenarios**:
1. **Given** one successful complete online visit, **When** offline and reloading or reopening /qr/,
   **Then** QR, portrait, all local icons, styles and language controls work without failed assets.
2. **Given** incomplete offline preparation, **When** a required resource fails, **Then** offline
   readiness is not falsely reported, and a later online retry can complete preparation.
3. **Given** a newer published version, **When** returning online, **Then** the offline card can update
   as a complete version without mixing incompatible resources; unrelated site caches are retained.

### User Story 3 - Install the QR card on my phone (Priority: P2)
Gabriel installs the companion from a supporting phone browser and launches it from the home screen.

**Why this priority**: A home-screen shortcut makes the QR quick to present at events.

**Independent Test**: Validate launch/display/icon configuration automatically, then follow the
phone-specific installation and scanning checklist on actual hardware.

**Acceptance Scenarios**:
1. **Given** a supported installation flow, **When** installed and launched, **Then** its configured
   initial page is /qr/ in standalone display, with recognizable local app icons.
2. **Given** browser-specific installation differences, **When** viewing installation guidance,
   **Then** Android and iPhone steps are concise, translated and do not claim installation occurred.
3. **Given** installed/offline usage, **When** reopening the app, **Then** the same offline QR card
   is available after its earlier successful online preparation.

### Edge Cases
- Fresh device offline before any online visit: no offline guarantee; communicate preparation state accurately.
- Missing/corrupt portrait: use the existing GL fallback; currently available owner photo must be included in normal offline preparation.
- Offline preparation fails or storage is unavailable/evicted: no false ready message; retry on reload/online.
- Install prompt not supported (including iPhone browser differences): show honest manual instructions.
- Small phone, portrait/landscape, 200% zoom and reduced motion: content remains usable without horizontal overflow.
- QR has an unobstructed white quiet zone, no embedded logo or portrait, no external QR service.
- Contact destination needs internet; the offline promise applies to /qr/, not external profiles or root navigation.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Serve /qr/ directly at the permanent origin, including direct navigation and reload.
- **FR-002**: Render an independently decodable high-contrast QR with exact payload https://limagabri.github.io/.
- **FR-003**: Display approved name/current photo and an accessible native link to the root contacts.
- **FR-004**: Start English every fresh load; PT translates visible/accessibility copy and document language with no language persistence.
- **FR-005**: Keep the card, QR, actual portrait and all its local icons available offline after a complete first online load.
- **FR-006**: Configure installation to launch /qr/ standalone with locally hosted home-screen icons.
- **FR-007**: Restrict offline interception to the companion; preserve root page interface, destinations and language behavior.
- **FR-008**: Make offline preparation truthful, recoverable after resource errors, and updateable across complete versions.
- **FR-009**: Provide translated installation guidance and document cache, asset maintenance and real-phone checks.
- **FR-010**: Preserve mobile accessibility: 44px targets, visible focus, AA text contrast, reduced motion and no 320px overflow.
- **FR-011**: No backend, paid services, third-party QR/image dependencies at runtime, analytics, emojis or em dashes.
- **FR-012**: Build, test, deploy via the normal repository workflow and verify /qr/ and root in production.

### Key Entities
- QR card: approved profile identity, permanent target URL, high-contrast scannable graphic.
- Offline version: complete local card resources, readiness state and update lifecycle.
- Install identity: app name, launch location, standalone mode and local normal/maskable/touch icons.
- Language: en initially, pt-BR after manual selection, reset at next full load.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: Independent decoding of the QR rendered in browser screenshots returns the exact approved URL online and offline.
- **SC-002**: After one successful online load, a disconnected reload and new-tab launch retain the actual photo, QR and icons without missing resources.
- **SC-003**: Installation configuration consistently identifies /qr/ as the standalone launch page; all declared icons load and have their declared dimensions.
- **SC-004**: All original contact-page browser scenarios still pass; root has no companion offline controller.
- **SC-005**: Both languages pass accessible-name, keyboard, target-size and automated A/AA checks, with no overflow at 320/375/768/1440px and 200% zoom.
- **SC-006**: Automated build/deployment succeeds and live /qr/ passes QR, manifest, offline and root-regression checks.
- **SC-007**: The final report clearly separates automated results from actual phone installation, camera scanning and OS-specific standalone checks not performed here.

## Assumptions
- The actual owner photo is now present at public/images/profile.jpg and must be reused as-is.
- /qr/ is reached directly/bookmarked or installed. No new root-page control or layout change is required.
- Offline first load means preparation has completed successfully, not merely that the first HTML byte arrived.
- Browser storage may be evicted by the OS or user; one later complete online visit restores offline support.
- Installation prompts and physical camera scans depend on browser/OS/hardware; automated configuration and decoded screenshots do not prove physical installation or camera readability.
