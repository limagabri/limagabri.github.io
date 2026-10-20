# UI contract

- Single main landmark and h1 Gabriel de Souza Lima.
- EN and PT native buttons, aria-pressed reflects active language; their accessible names include
  English/Português so the target language is identifiable in either current language.
- document.documentElement.lang is en initially, pt-BR after Portuguese selection.
- Contact navigation contains six native anchors in PROFILE_CONTENT.md order and exact destinations.
  Each anchor contains visible brand and translated short description, decorative local service icon
  and outgoing indicator. No JS navigation or extra new-tab behavior.
- Photo alt is translated when loaded. GL fallback is readable with a translated accessible name.
- No storage writes, external runtime requests, tracking, portfolio or invented copy.
- 320px viewport has no horizontal overflow; targets are >=44x44; focus is visible; motion is reduced.
- /images/profile.jpg is the documented replaceable owner asset path.
