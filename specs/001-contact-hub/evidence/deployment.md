# Publication state and external blocker

Repository: limagabri/limagabri.github.io. Intended URL: https://limagabri.github.io.

Observed 2026-10-20 through the configured gh CLI identity:
- GET /repos/limagabri/limagabri.github.io/pages: status built, build_type legacy,
  source main:/, https_enforced true. This describes the existing documentation site.
- GET /actions/permissions: 403 Resource not accessible by integration.
- GET /branches/main/protection: 403 Resource not accessible by integration.
- GET /branches/main: protected false; GET /rulesets: []. No protection bypass attempted.
- PUT /repos/limagabri/limagabri.github.io/pages with build_type=workflow:
  **403 Resource not accessible by integration**. This is the current publication blocker.

Owner action: open repository Settings -> Pages -> Build and deployment -> Source and select
GitHub Actions, or configure an identity with the necessary Pages/Administration write access.
The prepared workflow builds, tests, uploads dist and deploys on main after normal merge.
Do not substitute legacy built-output commits or claim build success is deployment success.
Actual workflow and live verification remain pending.
