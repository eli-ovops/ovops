# Phase 4.1B.1 Backend Security Fix Report

Status: PASS (awaiting independent PMO review)

## Root causes

- The old public namespace coupled its form cookie to `Path=/api/leads`. A canonical inquiry request cannot receive that nonce cookie.
- A real Next development request used the runtime's `localhost` origin while the first probe sent `127.0.0.1` in `Origin`; the strict same-origin check correctly rejected that host mismatch with `403 SUBMISSION_REJECTED`.
- `verifyFormToken` parsing/signature exceptions were not converted at the anonymous boundary, so malformed input could fall through to the generic 500 mapper.
- Lead, LeadNote, and User collection updates previously had direct collection update access, so they did not consistently pass through one service-level transition, allowlist, and audit sequence.
- `PAYLOAD_SECRET` had a fixed fallback and did not fail at Payload config construction.
- There was no database-level guard against removal or suspension of the final active `super_admin`.
- The former security fixture cleanup left synthetic Users behind and relied on post-suite deletion patterns that are unsuitable for testing the last-admin trigger.
- The initial `systemOperation` string context was forgeable by any Local API caller. The systemError recovery audit found that its first attempted replacement was incomplete and unverified.
- Independent QA then found P1 in that first replacement: its three exported capability factories could be imported by any future internal module to mint a valid request and bypass service allowlists, transitions, and audit paths.

## Fixed

- Canonical public API is only `GET /api/inquiries/form-token` and `POST /api/inquiries`. No `src/app/api/leads` route remains; a real `POST /api/leads` returns 404.
- Form token cookie path is `/api/inquiries`; real loopback HTTP obtains token/cookie, waits for the anti-automation delay, and receives `202 { receiptId, status: "accepted" }`.
- Malformed, tampered, and expired form tokens are now caught at verification and return only `403 { error: { code: "SUBMISSION_REJECTED" } }`; parsing or signature details are not exposed and no guard is relaxed.
- `PAYLOAD_SECRET` has no fallback. Missing, placeholder, and under-32-character values fail when Payload config is loaded.
- `LeadWorkflowService` is the only application path for Lead transition and LeadNote create/update. It reloads the actor from persisted Users, checks active role, restricts fields, validates transition, updates via `overrideAccess:false`, and writes the audit event in the same transaction.
- Access control now requires one module-private `Symbol` capability per named service/repository, not a string. Capability issuance is a non-exported closure inside `PayloadIntakeRepository`, `LeadWorkflowService` (including LeadNote workflow), and `UserSecurityService`; the old generic issuer module was deleted. `access.ts` imports only their read-only verifiers. A public sentinel preserves each private Symbol through Payload's Local API context cloning but grants nothing by itself. REST, Admin, ordinary Local API, copied strings, Symbols, and objects therefore fail access checks.
- Service callers may supply an existing request only to inherit its transaction ID; services always create their own capability-bearing request. Application services do not use `overrideAccess:true`; that flag is confined to test bootstrap/read assertions.
- `UserSecurityService` reloads the actor as a persisted active `super_admin`, accepts only explicit status updates or named deletion, and audits each action.
- Migration `20260725_081200_security_guards` installs a PostgreSQL trigger with `pg_advisory_xact_lock` to prevent disabling, demoting, or deleting the last active `super_admin`, including a direct privileged Local API attempt.
- `payload-security.integration.test.ts` now opens one outer transaction per test. Normal cases call `killTransaction` in `afterEach`; Payload's own abort on a failing collection operation is retained. Every `afterEach` asserts `users`, `leads`, `lead-notes`, `audit-events`, and `intake-requests` are all zero. No trigger is disabled, no table is truncated, and no fixture is manually privileged-deleted.

## TDD and verification

- Recovery/TDD checkpoints: a Test DB run first proved that Payload discards a Symbol-only context; the capability now includes a non-authorizing sentinel solely to survive that framework behavior. A second red test proved a rejected forged request can abort a shared fixture transaction; the forged Local API negative now uses no fixture transaction. Neither change relaxes access.
- The independent-QA P1 red test proved the generic issuer export remained available. The final export-surface test proves that `internal-operation.ts` is absent, no `create*`/`issue*`/`runWith*` capability issuer is exported, three modules export only their read-only verifier, and synthetic string/Symbol/object requests fail every verifier.
- The final security integration test rejects direct Payload mutation plus forged string and Symbol/object contexts, then accepts named public, lead workflow/LeadNote, and user-security service paths and verifies their audit behavior. It also rejects mass assignment and illegal transitions.
- No-DB suite: 14 passed, 11 explicitly skipped database integrations (25 total).
- Test-DB suite: 25 passed, 0 skipped, including export-surface verification, direct/forged Local API negatives, legal service+audit paths, last-super-admin trigger protection, real Next HTTP token contracts, and retired-route 404.
- Real Next HTTP integration: tampered-token response is stable 403 `SUBMISSION_REJECTED`; paired token/cookie happy path is 202; retired `/api/leads` is 404.
- Lint, strict typecheck, and `next build` passed.
- Local and Test migration status: `20260725_075553_lead_foundation` and `20260725_081200_security_guards` are present in both databases.
- Final Test-DB read-only counts: `users=0`, `leads=0`, `lead_notes=0`, `audit_events=0`, `intake_requests=0`. Local business tables were not queried or cleared.
- The final read-only 4184 listener probe returned no listener. This task did not start, stop, or modify the Static V1 runtime.

## Security invariants and remaining risks

- `privacy-v1-draft` remains test-only; unknown/non-test runtime fails closed for public submission.
- Public boundary still enforces JSON, 12KiB declared/streamed limits, same-origin, trusted test client IP, honeypot, form token/cookie, delay, rate limit, idempotency, and transaction rollback.
- The rate limiter is explicitly L1 process-local, single-instance local/test only. It is not shared-store or multi-instance safe and must not be represented as production-ready; unknown runtime remains fail-closed.
- No real account, secret, notification, Storage, AI, Portal, frontend UI, preview, or deployment was created.
- Production/Dedicated proxy trust chain, shared rate-limit storage, backup/restore ownership, and approved privacy notice remain unresolved; do not enable public collection.

## PMO recommendation

Request an independent PMO recheck of the absent issuer export surface, forged-context negative, bad-token HTTP contract, zero-residue fixture proof, direct-update trigger denial, and migration trigger. If accepted, PMO may issue `PHASE4_1_BACKEND_API_ACCEPTED_RELEASE_FRONTEND` to the frontend owner.
