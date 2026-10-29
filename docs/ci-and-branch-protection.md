# CI and branch protection

## Pull request checks

`.github/workflows/ci.yml` runs on pull requests into `dev` and `main` and on pushes to those branches. It defines two stable check names for rulesets: **CI / validate** and **CI / secret-scan**. Validation installs with the frozen pnpm lockfile, runs ESLint and TypeScript, audits dependencies, reports source-file size warnings, and builds the production app. There is no test script in this project, so CI does not invent or run a test command.

The dependency audit uses a **high** severity threshold (`pnpm audit --audit-level=high`), so it reports high and critical advisories. It is temporarily non-blocking because the current lockfile reports 101 findings (41 high and 6 critical), including critical advisories affecting the locked Next.js 16.2.12. Making this required check block immediately would prevent all PRs from passing. The audit step can show as failed, but `continue-on-error` lets the validation job pass. Review and address the existing findings, then make the audit blocking after establishing an explicitly reviewed baseline for any accepted exceptions. Lower severity findings remain visible in pnpm's output. The line-count report is advisory and always exits successfully when it can read the tracked source files.

The workflow uses Node.js 22, pnpm 11.5.2 (pinned in `package.json`), read-only repository permissions, and full commit SHAs for third-party actions. The secret-scan job uses TruffleHog OSS to scan commit changes; both its action and container image are pinned. Pull request jobs receive no deployment credentials or write permissions and need no scanner license secret.

## Source-file size recommendation

`.github/scripts/check-source-lines.py` counts physical lines in tracked `.ts`, `.tsx`, `.js`, and `.jsx` files under the application source directories. It excludes generated directories and files, build output, and dependencies. It does not scan configuration, JSON, YAML, or lockfiles. Files above 120 lines are reported with their path and actual count. The check is informational and does not impose a hard limit. Review current warnings before considering enforcement; any future hard limit should include explicit, documented exceptions approved by the maintainers.

## Ownership

`CODEOWNERS` names `@atlas-devel` as owner for all paths, including CI and dependency/type/lint configuration. A CODEOWNERS entry only requests review; it does not make approval mandatory unless the applicable branch ruleset requires code-owner review.

## GitHub ruleset settings to apply

The existing active ruleset `production-rules` currently has no included or excluded branch patterns. Its deletion and non-fast-forward rules therefore apply to every branch. This unintentionally constrains unrelated feature branches. Edit this existing ruleset rather than creating a duplicate:

1. Set included refs to exactly `refs/heads/main` and `refs/heads/dev`; leave exclusions empty. This narrows its scope while preserving the existing deletion and force-push protections for both protected branches.
2. Add a pull request requirement with at least one approval, stale approval dismissal, approval of the latest reviewable push by someone other than its pusher, required code-owner review, and resolved conversations. This blocks direct updates to the protected branches.
3. Require branches to be up to date before merging and require linear history.
4. Require the exact checks **CI / validate** and **CI / secret-scan**.
5. Leave the bypass list empty for routine collaborators. If an emergency bypass is needed, document the specific actor and reason separately.
6. In repository Settings → General → Pull Requests, enable squash merging as the standard method and disable merge commits and rebase merging; linear history remains required by the ruleset.
7. Confirm there is no overlapping classic branch protection or other ruleset that weakens or contradicts these requirements.

With the global CODEOWNERS entry and “require code-owner review” enabled, `@atlas-devel` is the required code owner reviewer for pull requests to both branches. Merely adding CODEOWNERS does not enforce their approval. After applying the ruleset, inspect its effective branch scope and test the review requirement with a draft/test pull request before describing it as active.

The current environment can read the public ruleset but does not have authenticated GitHub settings access. A repository administrator must make and verify the settings above. The API currently reports `production-rules` as active with only `deletion` and `non_fast_forward` rules and an empty branch include list; branch-protection details and mutation requests require authentication.
