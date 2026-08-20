# LOOM Changelog

All notable user-facing changes are recorded here.

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
