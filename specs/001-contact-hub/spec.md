# Feature Specification: Personal Contact Hub

**Feature Branch**: `001-contact-hub`

**Created**: 2026-10-20

**Status**: Reviewed

**Input**: Build the complete contact page defined by PRODUCT_BRIEF.md and PROFILE_CONTENT.md.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reach Gabriel's profiles (Priority: P1)
A conference visitor opens the permanent page and chooses one of Gabriel's six profiles.

**Why this priority**: Connecting with Gabriel is the product's primary purpose.

**Independent Test**: Open the page at phone and desktop sizes and activate each contact link.

**Acceptance Scenarios**:
1. **Given** a fresh visit, **When** the page loads, **Then** Gabriel de Souza Lima and
   AI Engineer · Researcher appear with LinkedIn, Instagram, X / Twitter, GitHub, ORCID, Lattes in order.
2. **Given** any card, **When** activated by keyboard or touch, **Then** it navigates to the exact
   corresponding approved destination in PROFILE_CONTENT.md, without a simulated success message.
3. **Given** a narrow screen, **When** viewing contacts, **Then** all six remain in one compact stack
   with recognizable service icons and no horizontal scrolling.

### User Story 2 - Read in Portuguese (Priority: P2)
A visitor selects Portuguese and reads the same profile and contact descriptions in Brazilian Portuguese.

**Why this priority**: Both local and international conference visitors must understand the page.

**Independent Test**: Select PT, inspect all visible and accessible copy, then reload.

**Acceptance Scenarios**:
1. **Given** English, **When** PT is selected, **Then** the introduction becomes
   Engenheiro de IA · Pesquisador, all descriptive and accessible copy is translated, and page language is pt-BR.
2. **Given** Portuguese, **When** reloading, opening a new tab, or starting with a Portuguese browser,
   **Then** the page starts in English regardless of previous preferences or browser settings.
3. **Given** either language, **When** switching, **Then** brand names and destinations remain unchanged.

### User Story 3 - Maintain the permanent contact page (Priority: P3)
Gabriel updates a photo, contact, or translation from the repository, including on a phone.

**Why this priority**: Printed QR codes and NFC tags must keep working after content updates.

**Independent Test**: Follow the maintenance instructions to replace a photo and edit contact data.

**Acceptance Scenarios**:
1. **Given** a missing or broken photo, **When** the page loads, **Then** a GL avatar appears without a broken-image artifact.
2. **Given** a supplied portrait at the documented path, **When** published, **Then** the portrait
   appears circular, proportionally cropped, with no component changes or external image service.
3. **Given** content changes, **When** the authorized publication succeeds, **Then** the same permanent URL serves the update.

### Edge Cases
- Photo unavailable, undecodable, or temporarily failing: use GL; never substitute another person's image.
- Long translated text, 320px viewport, 200% zoom, safe areas: wrap without truncation or horizontal overflow.
- Reduced motion: no decorative animation; focus remains visible for keyboard users.
- External profiles may require login or CAPTCHA; preserve the approved URL and do not claim destination ownership verification.
- Deployment permissions unavailable: retain reviewable work and report the actual external blocker.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Show the exact approved name, bilingual introduction, six destinations and order.
- **FR-002**: Present one unified stack of native full-card links with service icons and outgoing indicators.
- **FR-003**: Initialize English on every load; allow EN/PT switching without storing preference.
- **FR-004**: Translate descriptive copy, accessible labels and document language together; preserve brands and links.
- **FR-005**: Display the owner's supplied circular photo or GL when unavailable, with an obvious replacement path.
- **FR-006**: Preserve the approved navy base, subtle purple/teal gradients, centered limited width and compact layout.
- **FR-007**: Support keyboard, visible focus, 44px targets, reduced motion and sufficient contrast.
- **FR-008**: Keep content and translations centrally editable; document local checks and phone maintenance.
- **FR-009**: Publish at the permanent URL through automated repository publication and verify the live result.
- **FR-010**: Exclude extra contact channels, portfolio, QR widget, copy action, decorative slogans,
  emojis, em dashes, invented statuses, trackers, and language persistence.

### Key Entities
- **Profile**: Approved name, introduction in two languages, portrait location and fallback initials.
- **Contact**: Service identity, approved destination, ordering and bilingual short description.
- **Language**: English initial state or manually selected Brazilian Portuguese for the current visit.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: All six rendered destinations exactly match the approved list and order.
- **SC-002**: Every fresh-load scenario starts in English; Portuguese selection changes all relevant copy.
- **SC-003**: No horizontal overflow at 320, 375, 768 and 1440 CSS pixels, including 200% zoom checks.
- **SC-004**: All interactive targets measure at least 44px in both dimensions, and text meets WCAG AA contrast.
- **SC-005**: Keyboard users can reach and activate every action with visible focus; automated accessibility checks find no serious or critical issues.
- **SC-006**: The live permanent URL serves the tested page following a successful automated publication.
- **SC-007**: Photo and link edits require no presentation changes; documented instructions cover mobile repository editing.

## Assumptions
- PROFILE_CONTENT.md resolves the older brief's pending URLs and introduction.
- The actual selected BRACIS portrait is absent. GL is authorized for independent implementation;
  missing portrait remains a material limitation, not a completed production asset.
- Same-tab native link navigation is the least surprising default and avoids unsolicited new tabs.
- Actual NFC reading, QR scanning and physical-device testing require hardware and are not simulated as passing.
- No final content approval is requested again: CODEX_TASK.md and the current owner request authorize publication.
