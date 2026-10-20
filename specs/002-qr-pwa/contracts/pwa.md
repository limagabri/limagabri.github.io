# PWA and UI contract

/qr/ is real HTML, document language en, manifest /qr/manifest.webmanifest, Apple touch icon local.
Main contains approved h1, current portrait/fallback, high-contrast QR image with translated alt,
exact printed URL and native Open contacts/Abrir contatos anchor to /.
EN/PT buttons expose pressed state and translated group label; document/meta copy changes together.
Offline status reflects actual preparation, not navigator.onLine alone. Error shows online retry action.
Install instructions identify Android browser menu and iPhone Safari Share/Add to Home Screen in both languages.

Manifest: id=/qr/, start_url=/qr/, scope=/qr/, display=standalone, local 192/512 any,
512 maskable and local 180 Apple PNG. No root manifest or worker registration.
Worker path /qr/sw.js, scope ends /qr/. Root navigation is never intercepted.
All required QR assets including photo and icons are precached before ready; unrelated cache keys survive.
QR navigation with query resolves same card offline; arbitrary out-of-scope/non-GET requests are untouched.
Updates wait for old QR clients to close. No persisted language, external QR API or backend.
