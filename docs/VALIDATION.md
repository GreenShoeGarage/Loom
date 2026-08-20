# LOOM v0.3.0 Validation Record

**Validation date:** August 19, 2026  
**Validated artifact:** modular source and offline-generated `dist` production bundle  
**Release focus:** Batch 2 — Controlled Record Lifecycle

## Result summary

| Validation group | Result |
|---|---:|
| Offline production build | Passed |
| Domain, migration, relationship, lifecycle, calculation, and source-transpile checks | **148 of 148 passed** |
| General Chromium interaction and layout checks | **67 of 67 passed** |
| Dedicated Batch 2 controlled-record lifecycle checks | **37 of 37 passed** |
| Browser page exceptions | **0** |
| Browser console errors | **0** |
| Real loopback-origin v0.3.0 rerun | Blocked by browser administrator policy |

Machine-readable results:

- `domain-test-results.json`
- `browser-smoke-results.json`
- `record-lifecycle-results.json`
- `origin-acceptance-results.json`

## Production build validation

The offline production bundle was generated with:

```bash
npm run build:offline
```

The builder generated:

- `dist/index.html`
- `dist/assets/vendor.js`
- `dist/assets/app.js`
- `dist/assets/styles.css`
- `dist/manifest.webmanifest`
- `dist/sw.js`
- `dist/icons/loom-192.png`
- `dist/icons/loom-512.png`
- `dist/THIRD_PARTY_LICENSES.txt`
- `dist/README.txt`

The build completed without source-transpile diagnostics. Generated JavaScript files passed syntax checks, the manifest parsed as valid JavaScript Object Notation (JSON), and delivered asset references resolved.

## Domain and lifecycle validation

Command:

```bash
npm test
```

Result:

```text
148 of 148 passed
```

### Identity and project-model checks

The deterministic suite validates:

- application and schema version 0.3.0
- exact sample-data collection counts
- unique stable record identities
- unique visible identifiers within each controlled collection
- retained history and current revision snapshots
- no dangling requirement, function, object, interface, verification, failure, execution, evidence, budget, inheritance, or typed-link references
- rejection of corrupted revision snapshot identity
- preservation of unknown top-level imported fields

### Controlled-record lifecycle checks

The suite validates:

- all 17 controlled collections can be created through one registry
- new records begin at revision one
- creation produces one immutable snapshot
- snapshots do not recursively embed history
- material edits increment exactly one revision
- changed root fields are retained
- untouched records keep their revisions
- no-op edits create no false revision or audit event
- duplicate visible identifiers are rejected
- earlier snapshots remain immutable
- field comparison identifies changed values
- archive retains identity, history, lifecycle state, actor, and timestamp
- editing an archived record preserves the original archive actor and time
- restoring old fields does not reactivate an archived record
- restore clears archive metadata and preserves lifecycle disposition
- revision recovery creates a new revision and retains intervening history
- missing controlled records are reinserted as archived revisions
- specialist-view edits use the shared reconciler

### Relationship checks

The suite validates:

- typed link creation
- duplicate-link reuse
- compatible direct-reference synchronization
- reciprocal requirement/function allocation
- controlled revision generation after relationship-driven changes
- typed link removal
- direct-array cleanup after removal

### Session-history support calculations

Domain reconciliation checks used by session undo and redo validate:

- controlled state restoration creates new revisions
- archive state remains orthogonal
- record identity remains stable
- project revision continues forward

### Engineering calculations retained from earlier releases

The suite also validates:

- threshold and target margin behavior
- allocation, verification, and evidence states
- seven-condition verification closure
- explainable readiness factors
- FMECA criticality categories
- financial project-budget roll-up and variance
- mass and power technical-budget roll-up, margin, and utilization
- dependency schedule, slack, critical path, and cycle detection
- baseline difference detection
- cockpit exception counts
- exact-value and range metrics
- genuinely empty Fresh Start behavior

### Migration checks

The suite validates:

- schema v0.1.0 to v0.3.0 migration
- schema v0.2.0 to v0.3.0 migration
- schema v0.3.0 loading
- migration-history source and destination versions
- revision-history initialization for every controlled record
- recovery of historical snapshots from available baselines where possible
- stable identity preservation
- unknown-field preservation
- unsupported future-schema rejection

## General Chromium interaction and layout validation

Command:

```bash
npm run test:browser
```

Result:

```text
67 of 67 passed
```

The built Cascading Style Sheets (CSS) and JavaScript were loaded into Chromium at a 1600 × 1000 viewport with a browser-storage-compatible local fallback.

Coverage includes:

- initial render and visible v0.3.0 version
- all eight primary sections
- sample project selection
- desktop requirement-filter layout
- evidence summary alignment and non-overlap
- baseline inspector spacing and chevron containment
- nine-step requirement wizard
- requirement creation
- autosave feedback
- local fallback persistence and recovery in a second browser document
- Easy and Advanced modes
- light and dark themes
- six Kanban lanes and shared sample work records
- project export, Fresh Start, sample, duplication, and archive controls
- Record Studio launch from project actions
- 17 controlled record types
- three-pane layout
- decision creation and second revision
- field-level revision comparison
- typed relationship creation and removal
- archive and restore
- revision recovery
- session undo and redo
- Record Studio keyboard shortcut
- controlled revision persistence in a second browser document
- no page or console errors

Representative screenshots:

- `docs/screenshots/validation-cockpit.png`
- `docs/screenshots/validation-evidence.png`
- `docs/screenshots/validation-baselines.png`
- `docs/screenshots/validation-execution.png`
- `docs/screenshots/validation-record-studio-revisions.png`

## Dedicated Batch 2 browser validation

Command:

```bash
npm run test:batch2
```

Result:

```text
37 of 37 passed
```

Coverage includes:

- undo and redo initially disabled
- Record Studio open and close behavior
- all 17 controlled collections
- initial authoritative requirement projection
- three non-overlapping work panes
- stable visible identifier and current revision
- material requirement edit
- exactly one new revision
- immediate authoritative-list refresh
- immutable snapshots
- title and owner field comparison
- revision-note audit display
- undo restoring earlier values as a new revision
- redo restoring edited values as a new revision
- decision creation through the same lifecycle
- typed relationship and rationale authoring
- archive and restore with text status
- archive and restore audit events
- global search of a new record
- direct opening of the authoritative record
- no page or console errors

Representative screenshot:

- `docs/screenshots/validation-record-studio-lifecycle.png`

## Real-origin deployment attempt

Command:

```bash
npm run test:origin
```

The test attempted to serve the actual production bundle at:

```text
http://127.0.0.1:4195
```

The managed Chromium environment blocked navigation with an administrator policy before the application could be exercised. The result file records:

- `originNavigationBlockedByPolicy: true`
- no successful v0.3.0 real-origin application acceptance
- the exact fatal environment explanation

This validation record does not convert the block into a pass.

The historical `docs/BATCH-1-ACCEPTANCE.md` documents a v0.2.0 48-check real-origin Chromium pass covering IndexedDB, service workers, Cache Storage, offline restart, evidence files, downloads, import rejection, recovery, transaction abort, and cross-profile transfer. Those foundations remain in the v0.3.0 codebase, but final-origin acceptance should be rerun for this release.

## Conventional package-build limitation

The execution environment could not install package-registry dependencies. The local `node_modules` directory therefore did not contain React type declarations, Vite, or the Vite React plug-in, and `npm run check` could not complete the conventional project type check.

This record does not claim a successful conventional `npm run build` or `npm run check` in the current environment.

The release instead used:

- the checked-in React runtime
- the offline builder
- TypeScript source transpilation with no source-transpile diagnostics
- deterministic domain execution
- two independent Chromium interaction suites

Run `npm install`, `npm run check`, and `npm run build` in a normal development environment before publishing changes made after this release.

## Reproduction

### Standard Batch 2 release validation

```bash
npm run validate:batch2
```

This rebuilds the offline bundle, checks the generated application JavaScript syntax, runs the 148-check deterministic suite, and runs the 67-check general Chromium suite. The focused 37-check lifecycle suite is intentionally invoked separately to avoid browser-startup contention when two automated Chromium suites are chained in constrained environments.

### Domain suite only

```bash
npm test
```

### General browser suite only

```bash
npm run test:browser
```

### Controlled-record lifecycle suite only

```bash
npm run test:batch2
```

### Deployment-origin suite in an unrestricted environment

```bash
npm run test:origin
```

### Combined deployment validation

```bash
npm run validate:deployment
```

## Conclusion

The Batch 2 controlled-record scope is accepted based on 252 passing automated checks across the domain and browser suites, with zero browser page exceptions and zero console errors.

The accepted result covers controlled record creation, material revision, field comparison, typed relationships, archive, restore, revision recovery, safe deletion behavior, migration, specialist-view reconciliation, and current-session undo and redo.

Real-origin deployment acceptance remains an explicit external gate because the current browser environment blocked loopback navigation.
