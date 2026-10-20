# Research and decisions

## Official toolchain
Decision: Specify CLI 1.2.2, installed with `uv tool install specify-cli`, initialized with
`specify init --here --integration codex --force`. The force flag merged new toolkit artifacts
into the existing documentation-only checkout; the three owner documents were preserved.
Rationale: official current README and integration reference prescribe skills named
`$speckit-constitution`, `$speckit-specify`, `$speckit-plan`, `$speckit-tasks`,
`$speckit-implement`, `$speckit-converge` for Codex, not Copilot slash syntax.
Alternatives: manual lookalike documents rejected. Skills are executed by this agent following
installed SKILL.md instructions and toolkit scripts; the CLI does not generate product prose itself.
Sources: https://github.com/github/spec-kit and https://github.github.io/spec-kit/reference/integrations.html

## Static publishing
Decision: Vite base /, dist artifact, GitHub Actions build and deploy-pages with OIDC.
Rationale: this is a user site at the domain root, as documented in https://vite.dev/guide/static-deploy.html#github-pages.
Alternatives: project-name base rejected; legacy root publishing would expose source and skip automated build.
Pages GET reports legacy/main/root; Actions permissions and branch-protection settings GET return 403.
Branch metadata separately confirms protected:false and repository rulesets returns an empty list.
Do not infer write authority from readable public metadata; normal publication must succeed on actual API calls.

## Runtime and verification
Decision: React state for language, native links, inline/local SVG assets, system font, Playwright plus axe.
Rationale: meaningful browser tests exercise reload, translations, destinations, photo errors, mobile sizes,
keyboard focus and accessibility against built output. No test framework is needed for data constants alone.
Alternatives: persistent preferences, browser-language initialization, icon/font CDNs and backend rejected.
Source: https://react.dev/reference/react/useState and https://playwright.dev/docs/test-webserver

## Portrait
Decision: request public/images/profile.jpg at runtime and use GL on load/error until an actual owner asset is supplied.
Rationale: no photograph exists in the repository or attached accessible files. Never invent or fetch a substitute.
Alternatives: generated portrait or unrelated GitHub avatar rejected by the explicit owner contract.
