# LOOM Changelog

All notable user-facing changes are recorded here.

## v0.5.0 — Verification, Validation, and Readiness Closure

**Release date:** August 20, 2026  
**Roadmap batch:** Batch 4

### Added

- Verification setups as reusable controlled records for configuration, environment, equipment, instrumentation, personnel, safety, calibration, and documents.
- Method-specific as-run records for test, analysis, inspection, demonstration, similarity, certification, combination, and undetermined verification intent.
- Parameterized test cases with text, numeric, and Boolean parameters, units, default values, required values, and execution-specific values.
- Exact verification-plan, test-case, and setup revision capture on every execution.
- Structured reviewer disposition, configuration conformance, acceptance-criteria disposition, retest state, and rerun sequence.
- Verification exceptions for deviations, anomalies, defects, and observations with severity, disposition, retest requirement, evidence, and controlled history.
- Controlled rerun workflow that preserves failed executions and creates independent later results.
- Operational-validation context for stakeholder need, scenario, representative user, mission objective, suitability observations, and acceptance recommendation.
- Readiness policies for unit, integration, subsystem, system, and operational levels.
- Sixteen explainable readiness factors with required/weighted rules, score thresholds, related records, and next actions.
- Controlled readiness overrides for waivers, conditional approvals, and manual overrides with factor scope, rationale, reviewer, approval state, and expiration.
- Verification cross-reference, verification exceptions, verification status, V-model readiness, and operational-validation reports.
- Dedicated Batch 4 browser acceptance suite and verification/readiness screenshots.
- Migration from project schemas v0.1.0 through v0.4.0 to v0.5.0.
- Batch 4 acceptance, verification/readiness, architecture, coverage, validation, lifecycle, and impact documentation updates.

### Changed

- Application and project schema version advanced to v0.5.0.
- Controlled Record Studio now governs 22 authoritative collections.
- Verification is represented by a general method-neutral execution record while retaining backward-compatible collection names.
- Verification closure now evaluates fourteen always-blocking conditions plus two operational conditions when applicable.
- Potentially stale, stale, or superseded executions no longer satisfy closure as current evidence.
- Readiness is calculated by level-specific controlled policies rather than a single unexplained status.
- Lower-level closure participates in higher-level readiness roll-up.
- A failed execution remains visible after a successful rerun.
- Execution creation suppresses automatic impact generation for its own traceability-link bookkeeping, preventing a new execution and newly linked evidence from becoming stale because of their own creation.
- Baseline snapshots and project exchange include setups, exceptions, readiness policies, and overrides.
- Service-worker shell and runtime cache names advanced to v0.5.0.

### Fixed

- Recording a valid rerun no longer marks the new execution or its newly attached evidence potentially stale merely because the execution creation added requirement, plan, case, setup, exception, or evidence references.
- Verification closure no longer treats a manually selected passed state as sufficient without exact configuration, revisions, review, resolved exceptions, completed retest obligations, and current evidence.
- Parent readiness no longer appears ready when required lower-level verification remains failed or unclosed.

### Validation

- Offline production build: passed.
- Generated production JavaScript syntax: passed.
- Domain, migration, lifecycle, calculation, impact, verification, readiness, report, and source-transpile suite: 250 of 250 passed.
- General Chromium application suite: 67 of 67 passed.
- Controlled lifecycle Chromium regression suite: 37 of 37 passed.
- Change-impact and inheritance Chromium regression suite: 76 of 76 passed.
- Dedicated Batch 4 verification and readiness suite: 91 of 91 passed.
- Accepted executable checks: 521 of 521 passed.
- Accepted Chromium suites: zero page exceptions and zero console errors.
- Fresh v0.5.0 real-origin execution was blocked by managed Chromium administrator policy before application load and is not claimed as passed.
- Conventional TypeScript/Vite check and build were attempted but could not complete because the constrained environment lacked registry-installed React type declarations, Vite, and the Vite React plug-in.

## v0.4.0 — Change Impact and Inheritance Control

**Release date:** August 19, 2026
**Roadmap batch:** Batch 3

### Added

- Controlled impact reviews as the eighteenth authoritative record collection.
- Material-change detection at the shared project mutation boundary.
- Deterministic relationship graph assembled from direct references, typed links, hierarchy, inheritance, verification, evidence, schedule, budgets, baselines, and change control.
- Directional two-step impact traversal with terminal records and a 160-item safety bound.
- Explainable relationship paths for every affected record.
- Source revision and before-and-after field retention.
- Parent-requirement change handling for inherited obligations.
- Prior obligation state, prior source revision, target source revision, review reason, and review history.
- Current, potentially stale, reviewed-current, stale, and superseded result/evidence currency states.
- Impact-item dispositions, rationale rules, reviewer, and review date.
- Controlled action creation from impact items.
- Controlled change-request creation from impact reviews.
- Change-impact Markdown report.
- Impact review workspace under Baselines.
- Cockpit, Architecture, Verification, Evidence, Requirement Coupon, and dossier integration.
- Dedicated Batch 3 Chromium acceptance suite and screenshots.
- Migration from schema v0.1.0, v0.2.0, and v0.3.0 to v0.4.0.
- Batch 3 acceptance, impact/inheritance, architecture, coverage, and validation documentation.

### Changed

- Application and project schema version advanced to v0.4.0.
- Controlled Record Studio now governs 18 collections.
- Verification closure requires a current or reviewed-current passing result.
- Readiness and Cockpit calculations account for unresolved impact and currency concerns.
- Baseline snapshots include impact reviews.
- Test executions and evidence retain stale-source identity and rationale.
- The sample project includes a bounded 28-record impact review for the REQ-001 endurance-target change.
- Impact propagation no longer rebounds through shared upstream allocations into unrelated sibling requirements.
- Service-worker shell and runtime cache names advanced to v0.4.0.

### Validation

- Offline production build: passed.
- Generated JavaScript syntax: passed.
- Domain, migration, lifecycle, calculation, impact, and source-transpile suite: 188 of 188 passed.
- General Chromium application suite: 67 of 67 passed.
- Controlled lifecycle Chromium regression suite: 37 of 37 passed.
- Dedicated Batch 3 impact and inheritance suite: 76 of 76 passed.
- Accepted executable checks: 368 of 368 passed.
- Accepted Chromium suites: zero page exceptions and zero console errors.
- Fresh v0.4.0 real-origin execution was blocked by the managed Chromium administrator policy before application load and is not claimed as passed.
- Conventional TypeScript/Vite check and build were attempted but could not complete because registry-installed development dependencies were unavailable.

## v0.3.0 — Controlled Record Lifecycle

**Release date:** August 19, 2026
**Roadmap batch:** Batch 2

### Added

- Controlled Record Studio with collection, record-library, and record-workspace panes.
- Shared lifecycle editing for 17 controlled record collections.
- Immutable `RecordRevisionSnapshot` field snapshots.
- Field-level comparison between any two retained revisions.
- Restore-prior-values workflow that creates a new revision without erasing history.
- Shared archive and restore behavior with retained identity and relationships.
- Session undo and redo controls with keyboard shortcuts and up to 50 in-memory entries.
- Typed relationship creation and removal from Record Studio.
- Synchronization between compatible typed links and frequently traversed direct identifier arrays.
- Global search across all controlled collections with direct Record Studio handoff.
- Migration from schema v0.1.0 and v0.2.0 to v0.3.0 with revision-history seeding.
- Validation of revision numbers, snapshot identity, snapshot chronology, changed fields, and archived metadata.
- Dedicated Batch 2 browser lifecycle suite and screenshots.
- Batch 2 acceptance and controlled-lifecycle documentation.

### Changed

- Application and project schema version advanced to v0.3.0.
- All existing view mutations now pass through one controlled-record reconciliation service.
- Meaningful changes create one monotonic record revision; no-op changes retain the current revision.
- Missing controlled records are reinserted as archived revisions instead of being silently deleted.
- Undo and redo restore values as new controlled revisions rather than erasing audit history.
- Record snapshots omit embedded evidence payloads and summarize complete baseline snapshots to control project growth.
- Project import validates controlled revision history before replacement.
- The default Batch 2 validation command now runs only suites executable in managed environments; real-origin acceptance remains a separate command.

### Validation

- Offline production build: passed.
- Domain, migration, relationship, calculation, and lifecycle suite: 148 of 148 passed.
- Chromium application interaction and layout suite: 67 of 67 passed.
- Dedicated Controlled Record Studio lifecycle suite: 37 of 37 passed.
- Successful Chromium suites: zero page exceptions and zero console errors.
- Fresh real-origin execution was blocked by the current environment’s Chromium administrator policy and is not claimed as passed.
- Conventional npm/Vite build and full static type check were not executed because package-registry name resolution timed out.

## v0.2.0 — Deployment Acceptance and Data Safety

**Release date:** August 19, 2026
**Roadmap batch:** Batch 1

### Added

- IndexedDB recovery-snapshot store.
- Data Safety and Recovery workspace.
- Manual and automatic recovery snapshots.
- Persistent-storage diagnostics and request control.
- Versioned project-exchange manifest.
- Relationship-safe import validation and rollback behavior.
- Versioned service-worker shell and runtime caches.
- Installable web-app manifest and application icons.
- Real-origin browser acceptance harness.

### Changed

- IndexedDB database advanced to version 2.
- Project writes became serialized and transaction-aware.
- Project replacements are committed before the interface switches state.
- Fresh Start, sample loading, import, snapshot restore, and permanent deletion create recovery snapshots.
- Legacy schema v0.1.0 projects migrate to v0.2.0.

### Validation

- Domain and data-safety suite: 89 of 89 passed.
- Chromium interaction and layout suite: 39 of 39 passed.
- Historical real-origin Batch 1 suite: 48 of 48 passed in its original execution environment.

## v0.1.0 — Initial Coherent Engineering Thread

**Release date:** August 19, 2026

Initial local-first implementation of Cockpit, Requirements, Architecture, Verification, Failure Analysis, Execution, Evidence, and Baselines with a realistic cross-domain sample project.
