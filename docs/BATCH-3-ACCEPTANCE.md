# LOOM v0.4.0 Batch 3 Acceptance

**Batch:** Change Impact and Inheritance Control  
**Acceptance date:** August 19, 2026  
**Application version:** 0.4.0  
**Project schema:** 0.4.0

## Objective

Batch 3 makes a controlled engineering change produce an explainable review of potentially affected records without silently rewriting downstream requirements, verification plans, implementation records, results, or evidence.

The accepted release must connect change detection, traceability traversal, inherited-obligation review, result and evidence currency, engineering disposition, actions, change requests, persistence, and recovery through the same authoritative project model established in Batches 1 and 2.

## Acceptance scope

The accepted Batch 3 scope is:

1. Controlled impact reviews as first-class, revisioned records.
2. Material-change detection at the central project mutation boundary.
3. Deterministic traversal of direct relationships, typed links, hierarchy, inheritance, verification, evidence, schedule, budgets, baselines, and change control.
4. Directional propagation that avoids rebounding through shared allocations into unrelated sibling records.
5. Bounded traversal and terminal record handling.
6. Source revision, changed-field, and before-and-after value retention.
7. Explainable relationship paths for affected records.
8. Parent-requirement change handling and inherited-obligation review.
9. Potentially stale verification-result and evidence detection.
10. Explicit result and evidence currency disposition.
11. Impact-item dispositions with rationale rules.
12. Controlled action creation from impact items.
13. Change-request creation from impact reviews.
14. Cockpit, Architecture, Verification, Evidence, Baselines, Requirement Coupon, and dossier integration.
15. Schema migration from v0.1.0, v0.2.0, and v0.3.0 to v0.4.0.
16. Automated domain and browser acceptance evidence.

## Controlled impact-review record

Every generated impact review retains:

- stable internal identity
- human-readable impact-review identifier
- controlled record revision and history
- generation key preventing duplicate review creation for the same source revision and changed-field set
- changed source identity and collection
- previous and target source revisions
- materially changed root fields
- before-and-after controlled values
- generation date and trigger summary
- open, in-review, or resolved state
- reviewer
- affected items

Each affected item retains:

- affected record identity and collection
- affected record revision at detection
- one or more impact categories
- severity
- reason for inclusion
- ordered relationship path
- owner
- review disposition and rationale
- reviewer and review date
- staleness-candidate information where applicable
- inherited-obligation identity where applicable
- linked action or change request where applicable

Impact reviews participate in Controlled Record Studio, project export and import, baseline snapshots, validation, and controlled lifecycle reconciliation.

## Material-change policy

Impact automation runs at the shared project mutation boundary after a specialist edit is proposed and before controlled-record reconciliation finalizes the project revision.

The release generates impact reviews for significant engineering changes to supported source collections, including:

- requirements
- functions
- implementation objects
- interfaces
- verification plans
- test cases
- failure modes
- work items
- financial project-budget lines
- technical budgets
- assumptions when invalidated

Administrative edits such as notes, tags, ordinary timestamps, archive metadata, and other non-engineering fields do not create impact noise.

## Propagation policy

The Batch 3 propagation policy is intentionally deterministic and conservative.

### Relationship sources

The graph includes:

- direct authoritative reference arrays
- typed traceability links
- requirement, function, and implementation hierarchies
- inherited obligations
- verification-plan, test-case, and as-run execution links
- failure-analysis links
- evidence links
- schedule and dependency links
- financial and technical budget links
- decisions, assumptions, issues, and actions
- baseline membership
- change-request relationships

### Directionality

The engine assigns engineering layers to controlled collections. A changed record may identify an immediately connected upstream dependency as context, but traversal does not continue upward and rebound through that dependency into unrelated siblings.

Hierarchy traversal continues only within the changed source record’s domain. A requirement change may reach child requirements, but reaching a function or object does not automatically fan through that function or object’s complete hierarchy.

### Bounds

The current engine:

- limits traversal to two relationship steps
- limits one generated review to 160 affected items
- stops traversal at terminal record collections such as results, evidence, work, budgets, baselines, and change requests
- excludes archived records
- excludes the source record itself
- includes each affected record once using the first accepted explainable path

These limits prevent a small change from producing an unreviewable project-wide graph explosion.

## Parent changes and inherited obligations

When a requirement changes, directly inherited obligations for that requirement are marked pending review.

LOOM retains:

- previous obligation state
- previous source requirement revision
- target source requirement revision
- review-required date
- review reason
- review history

Available dispositions are:

- accepted as written
- accepted with local parameters
- tailored
- decomposed into derived requirements
- satisfied at the parent level
- not applicable
- superseded
- pending review

Tailored, not-applicable, and superseded dispositions require rationale. Accepted-with-local-parameters requires the local parameters to be recorded.

Resolving an obligation creates a review-history entry and resolves its associated impact item. It does not copy changed parent text into the child object or rewrite approved child requirements.

## Result and evidence currency

Test executions and verification-relevant evidence may be marked potentially stale when reached from a materially changed source.

The engineer may disposition the record as:

- potentially stale
- confirmed current
- stale
- superseded

Confirmed-current, stale, and superseded decisions require rationale.

The record retains:

- currency state
- stale-source identities
- stale-detection date
- rationale
- historical result or evidence content

A potentially stale result no longer satisfies verification closure as though it were an unexplained current pass.

## Review dispositions

Impact items support:

- pending review
- confirmed
- dismissed
- deferred
- resolved
- action created
- change request linked

Dismissed, deferred, and resolved dispositions require rationale.

An action created from an impact item is a controlled action linked to the source impact review, source record, and affected record. A change request created from an impact review includes all affected record identities and preliminary engineering, schedule, budget, risk, and verification assessments.

## User interface acceptance

The accepted interface provides:

- a dedicated **Impact review** tab under Baselines
- impact summary cards
- controlled-change library
- affected-record library
- selected-item inspector
- source revision and changed-field summary
- old and new source values
- explainable path presentation
- impact disposition controls
- result and evidence currency controls
- inherited-obligation controls
- action creation
- change-request creation
- controlled-record navigation
- change-impact report export
- Cockpit exception counts and navigation
- inherited-obligation warnings in Architecture
- result currency in Verification
- evidence currency in Evidence

Status is communicated with text as well as visual treatment.

## Sample-project acceptance

The sample project contains a retained `IR-001` review for the controlled change to `REQ-001` from revision 1 to revision 2.

The example:

- changes the endurance target from 30 hours to 36 hours
- retains the complete metric before and after the change
- produces 28 bounded affected records
- reaches both derived child requirements
- excludes unrelated requirements
- reaches functions and implementation objects
- creates a critical inherited-obligation review item
- reaches interfaces and failure analysis
- marks two affected test executions potentially stale
- marks one verification evidence document potentially stale
- reaches schedule, financial budget, technical budget, baselines, and change control

The sample retains one additional unrelated unresolved inherited obligation in the broader project, demonstrating that the impact review resolves only the obligation connected to the changed source.

## Validation evidence

| Suite | Result |
|---|---:|
| Domain, migration, lifecycle, calculation, impact, and source-transpile suite | **188 of 188 passed** |
| General Chromium interaction and layout suite | **67 of 67 passed** |
| Controlled-record lifecycle regression suite | **37 of 37 passed** |
| Dedicated Batch 3 impact and inheritance suite | **76 of 76 passed** |
| **Accepted executable checks** | **368 of 368 passed** |
| Browser page exceptions across accepted suites | **0** |
| Browser console errors across accepted suites | **0** |

Machine-readable evidence:

- `domain-test-results.json`
- `browser-smoke-results.json`
- `record-lifecycle-results.json`
- `impact-review-results.json`
- `origin-acceptance-results.json`

Representative screenshots:

- `docs/screenshots/validation-impact-review-workspace.png`
- `docs/screenshots/validation-impact-inheritance-review.png`
- `docs/screenshots/validation-impact-review-thread.png`
- `docs/screenshots/validation-impact-review-dispositions.png`
- `docs/screenshots/validation-record-studio-revisions.png`
- `docs/screenshots/validation-record-studio-lifecycle.png`

## Deployment-origin limitation

A fresh v0.4.0 real-origin acceptance run was attempted against the served production bundle at:

```text
http://127.0.0.1:4195
```

The managed Chromium environment returned `ERR_BLOCKED_BY_ADMINISTRATOR` before LOOM loaded. `origin-acceptance-results.json` records two harness checks passing and the origin-navigation gate failing. The blocked navigation is not counted as successful application acceptance.

The historical Batch 1 record documents a successful real-origin Chromium pass for IndexedDB, service workers, Cache Storage, offline restart, evidence file handling, downloads, recovery, transaction abort, malformed-import rejection, and cross-profile transfer. Those foundations remain present, but v0.4.0 final-origin acceptance must be repeated on the selected deployment origin or in an unrestricted browser environment.

## Conventional build limitation

The execution environment does not contain the registry-installed React type declarations, Vite, or the Vite React plug-in. `npm run check` and `npm run build` were attempted and could not complete because those dependencies were unavailable.

The release therefore does not claim a successful conventional TypeScript/Vite check or build in this environment. The modular source was transpiled by the checked-in offline builder without source-transpile diagnostics, the generated JavaScript passed syntax validation, and the resulting application passed all 368 accepted executable checks.

## Deferred from Batch 3

Batch 3 does not claim completion of:

- organization-authored impact-propagation languages
- arbitrary scripting of propagation rules
- probabilistic impact scoring
- automatic downstream rewriting
- unlimited recursive graph traversal
- advanced force-directed graph authoring
- multi-user review and approval authority
- cryptographic signatures
- automatic compliance, safety, or certification conclusions

These remain outside this release.

## Acceptance decision

**Batch 3 is accepted for LOOM v0.4.0.**

The release provides deterministic, bounded, explainable change-impact review; explicit inherited-obligation disposition; controlled result and evidence currency; linked actions and change requests; migration; persistence; and retained engineering history without silent downstream propagation.

Deployment-origin acceptance remains an explicit environment-specific gate and is not claimed by this decision.
