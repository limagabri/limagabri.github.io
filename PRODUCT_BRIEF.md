# Personal contact page — Spec Kit input

Owner: Gabriel de Souza Lima.
Repository: limagabri/limagabri.github.io.
Target production URL: https://limagabri.github.io.
Status: planning only; Spec Kit, implementation and deployment have not yet been completed.

## Product goal
Create a polished personal contact hub for people who meet Gabriel at conferences or professionally. Access is through a permanent URL, an NFC tag, or a QR code. Optimize for mobile, with a centered limited-width layout on desktop.

## Required development workflow
Use the official GitHub Spec Kit with Codex. Check the current official documentation before installation. Establish principles, specify the complete product, resolve important uncertainties, produce the technical plan and tasks, implement, and validate through the supported workflow.
This brief is input to Spec Kit; do not claim Spec Kit was installed or executed merely because this document exists.
Let Spec Kit determine task decomposition. Do not predivide the product into separate releases or stop after scaffolding. Missing profile data must not prevent useful independent engineering work, but must be resolved before declaring the production product complete.
Inspect the repository and any applicable instructions before changing files.

## Agreed technology
- React, TypeScript, Vite.
- Static output on GitHub Pages.
- Automated build and deployment through GitHub Actions.
- No backend, database, authentication, paid hosting, or link aggregation provider.
- Keep dependencies and architecture proportional to the page.

## Content
Show a circular profile photo, the name Gabriel de Souza Lima, a concise bilingual introduction, and one unified stack of links in this order:
1. LinkedIn
2. Instagram
3. X / Twitter
4. GitHub
5. ORCID
6. Lattes

Personal contacts must stay alongside LinkedIn near the top. Do not divide links into professional, academic, or personal sections.
Do not add individual articles, posters, projects, or a portfolio section; academic profiles provide access to research.
Email, phone, CV download, and contact-card download are not part of the agreed initial scope.
An on-page QR code and copy-address action were discussed but not finalized; confirm before adding them. An external QR code may simply point to the permanent page URL.

## Language requirements
- Always start in English on every fresh page load.
- Ignore browser language and prior manual choices for initialization.
- Keep an EN / PT selector visible near the top.
- PT means Brazilian Portuguese.
- Translate interface copy, descriptions, accessible labels, and document language when switching.
- Preserve brand names and link destinations.
- Keep manual selection in page memory only. Do not use localStorage, sessionStorage, or cookies to persist language. Reloading starts in English.

## Visual reference approved in conversation
Dark navy base with subtle purple and teal ambient gradients; circular portrait; prominent name; short introduction; compact language selector; stacked rounded contact cards.
Cards include a recognizable service icon, service name, optional short translated description, and a discreet outgoing-link indicator. The entire card must be a real accessible link.
Use compact, comfortable touch targets and avoid excessive scrolling. Keep all six links easy to find.
The demo used GL initials as a photo placeholder and simulated link buttons. Production must use real profile destinations, proper service icons, and a real photo when supplied.
Do not publish demo notices, simulated success messages, invented availability badges, or implementation details in the product.
Respect reduced motion, contrast, keyboard navigation, and device safe areas.

## Easy maintenance
- Put the replaceable profile photo at an obvious repository path, proposed: public/images/profile.jpg.
- Replacing the file and committing must update the deployed photo without editing components.
- Preserve image proportions and crop within the circle without distortion.
- Centralize name, biography, ordered links, and bilingual copy, proposed: src/data/profile.ts or an equally clear documented structure.
- Document how to replace the photo, update/reorder/add links, edit translations, run checks, and deploy, including through GitHub on a phone.
- Preserve the permanent page URL when content changes so the NFC tag does not need rewriting.

## Acceptance criteria
- Six accurate owner-provided profile URLs appear in the agreed order.
- Every fresh page load starts in English, including after switching to Portuguese.
- Language switching updates all relevant interface text and document language.
- Links work via touch, keyboard, and assistive technology; focus remains visible.
- Touch targets are at least 44 by 44 CSS pixels; text is legible and contrast sufficient.
- No horizontal overflow at 320 CSS pixels; mobile and desktop layouts remain usable.
- Optimized photo, lightweight production build, and proportionate dependencies.
- Photo and contact updates require no component edits.
- Meaningful checks verify language behavior and configured links; avoid implementation-mirroring tests.
- Production build and Pages workflow succeed; verify the live URL before claiming deployment.
- Report browser/device checks that could not be performed. Actual NFC reading and QR scanning require real-device verification.

## Pending inputs
- Actual profile photograph.
- Exact LinkedIn, Instagram, X/Twitter, ORCID, and Lattes URLs.
- GitHub profile candidate: https://github.com/limagabri (authenticated account; confirm destination).
- Final introduction in English and Portuguese.
- Location is optional, not a required element. The demo used Americana, Sao Paulo, Brazil.
- Final content review before production publication.

## Handoff
Use this document as the authoritative agreed product brief. Apply Spec Kit rather than bypassing it with ad hoc generation. Preserve the approved visual direction, unified contacts, Lattes, React stack, easy photo/configuration maintenance, and English initialization on every load.
