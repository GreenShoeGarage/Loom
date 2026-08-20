# LOOM v0.3.0

**Systems Engineering Project Control**

> **Trace requirements down. Build evidence back up.**

LOOM is a local-first systems-engineering workbench built around one digital engineering thread:

**REQUIREMENTS → VERIFICATION INTENT → FAILURE ANALYSIS → FUNCTIONS → ALLOCATION → DECOMPOSITION → IMPLEMENTATION → UNIT VERIFICATION → INTEGRATION → SYSTEM VERIFICATION → OPERATIONAL VALIDATION → EVIDENCE → ACCEPTANCE → BASELINE**

LOOM is not a generic task manager with engineering records attached afterward. Requirements, functions, implementation objects, interfaces, verification, Failure Modes, Effects, and Criticality Analysis (FMECA), evidence, work, budgets, baselines, and changes are connected through one normalized project model with stable identities and typed relationships.

## Release status

| Item | Status |
|---|---|
| Application | **LOOM v0.3.0** |
| Project schema | **v0.3.0** |
| Release focus | **Batch 2 — Controlled Record Lifecycle** |
| Operation | Local-first, single-user, offline-capable |
| Required account | None |
| Required server | None after the application files are served locally or hosted |
| Telemetry or analytics | None |

LOOM v0.3.0 is a working engineering instrument with a prebuilt production application and modular TypeScript source. It does not claim that its records automatically establish compliance, safety, verification, validation, acceptance, approval, or certification.

## What changed in v0.3.0

Batch 2 establishes a common controlled-record lifecycle across LOOM instead of leaving revision, archive, and relationship behavior scattered among specialist views.

### Controlled Record Studio

The new **Controlled Record Studio** is a global three-pane workspace for 17 authoritative record collections:

1. Requirements
2. Functions
3. Implementation objects
4. Interfaces
5. Verification plans
6. Test cases
7. Test executions
8. Failure modes
9. Work items
10. Project budget lines
11. Technical budgets
12. Evidence documents
13. Decisions
14. Assumptions
15. Issues and actions
16. Baselines
17. Change requests

Record Studio supports:

- create and edit through one consistent interaction pattern
- stable internal identities and human-readable identifiers
- ownership, lifecycle state, tags, notes, and revision notes
- record-specific engineering fields
- direct record references
- typed traceability relationships with rationale
- active and archived record filtering
- archive and restore without destructive deletion
- immutable field snapshots for each controlled revision
- revision-to-revision field comparison
- restoration of older field values as a new revision
- direct opening from global search and Requirement dossiers

Open Record Studio from the top bar, the project menu, or with:

```text
Command/Ctrl + Shift + R
```

### Field-level revision history

Every controlled record now carries a `revisionHistory` collection in addition to its event history. Each revision snapshot records:

- revision number
- capture date and time
- actor
- action
- revision note
- changed root fields
- a structured field snapshot

Changing a controlled record increments its revision exactly once. Saving an unchanged record does not manufacture a false revision. Earlier snapshots remain available after later changes.

Large binary evidence payloads and complete baseline contents are not recursively copied into every field snapshot. The authoritative record retains that content while the revision snapshot retains identifying and comparison metadata.

### Archive and restore

Archive state is now orthogonal to engineering lifecycle state.

Archiving a record:

- preserves its stable identity
- preserves history and revision snapshots
- preserves typed relationships
- records the archive actor and time
- removes it from ordinary active-record lists
- does not force its engineering lifecycle into an artificial `archived` status

Restoring returns the same record to active work with its earlier engineering lifecycle disposition intact.

A controlled record omitted by an editing path is reinserted as an archived revision rather than being silently deleted.

### Safe session undo and redo

LOOM now provides a 50-entry project-mutation history for the current browser session.

- Undo and redo are available in the top bar.
- Ordinary rapid inline edits are coalesced when appropriate.
- No-op changes are not added to the stack.
- Undo and redo restore project values through the same controlled-record reconciler.
- A controlled undo or redo creates a new revision; it does not erase audit history.
- A project replacement, project switch, import, or recovery restore begins a new session history.

Keyboard commands:

```text
Command/Ctrl + Z          Undo
Command/Ctrl + Shift + Z  Redo
Command/Ctrl + Y          Redo
```

Undo and redo are intentionally session-local. They are not a replacement for named baselines, recovery snapshots, or external project backups.

### Shared lifecycle reconciliation

All meaningful project mutations pass through one reconciliation layer that:

- detects material field changes
- ignores volatile revision timestamps during comparison
- increments changed records once
- retains unchanged record revisions
- records field-level differences
- initializes new records at revision one
- protects missing controlled records from silent deletion
- keeps specialist views and Record Studio on the same authoritative objects

### Expanded validation

The delivered v0.3.0 artifacts passed:

| Validation suite | Result |
|---|---:|
| Domain, migration, relationship, lifecycle, calculation, and source-transpile checks | **148 of 148 passed** |
| General Chromium interaction and layout checks | **67 of 67 passed** |
| Dedicated Batch 2 controlled-record lifecycle checks | **37 of 37 passed** |
| Browser page exceptions | **0** |
| Browser console errors | **0** |

A real loopback Hypertext Transfer Protocol (HTTP) origin rerun was attempted for v0.3.0, but the managed Chromium environment blocked loopback navigation by administrator policy. That limitation is recorded in `origin-acceptance-results.json`; it is not reported as a successful v0.3.0 origin test. The v0.2.0 Batch 1 acceptance document remains included as historical evidence for the unchanged Indexed Database Application Programming Interface (IndexedDB), service-worker, offline, recovery, and cross-profile foundations.

## Primary work areas

LOOM keeps a small, stable eight-area shell. Record Studio strengthens those areas rather than becoming a disconnected ninth module.

### 1. Cockpit

The Cockpit concentrates on actionable exceptions:

- requirements by definition state
- allocation and verification coverage
- passed, failed, blocked, and unverified requirements
- unresolved inherited obligations
- high-criticality failure modes
- open mitigations
- late work and blocked milestones
- financial project-budget variance
- technical-budget margins
- evidence completeness and staleness
- readiness by integration level
- pending reviews and changes

Counts and indicators open the underlying engineering records wherever the current implementation supports direct drill-down.

### 2. Requirements

Requirements provide:

- nine-step guided intake
- structured source, rationale, stakeholder, owner, and reviewer information
- threshold, target, tolerance, bounds, condition, and acceptance-rule fields
- Technical Performance Measure (TPM) trends and margin
- non-blocking requirement-quality prompts
- parent and child decomposition
- separate definition, allocation, implementation, verification, validation, and evidence states
- list, tree, coupon, performance, and traceability views
- persistent Requirement Coupons
- full requirement dossiers
- Record Studio access to the same authoritative requirement

A Requirement Coupon is a view of the controlled requirement record. Moving or opening a coupon never creates a duplicate requirement.

### 3. Architecture

Architecture provides:

- separate function and implementation hierarchies
- hardware, software, firmware, human/process, facility, and external-system domains
- many-to-many requirement, function, and object allocation
- first-class interface records
- inherited obligations with explicit dispositions
- allocation and orphan-coverage indicators
- linked V-model presentation

Functions and implementation objects remain distinct. Software is not forced into hardware-only decomposition terminology.

### 4. Verification

Verification supports methods broader than test:

- test
- analysis
- inspection
- demonstration
- similarity
- certification
- combination
- not yet determined

The work area includes:

- verification plans
- reusable test cases
- as-run execution records
- retained result history
- unit, integration, subsystem, system, and operational levels
- explicit closure conditions
- explainable readiness factors
- level-specific structured exports

A manually selected label alone cannot close a requirement. Closure is derived from approved intent, completed execution, passing disposition, acceptance criteria, evidence, reviewer disposition, and tested configuration.

### 5. Failure Analysis

The integrated Failure Modes, Effects, and Criticality Analysis workbench provides:

- requirement, function, object, interface, test, and observation origins
- cause and local, next-level, and end effects
- severity, likelihood, detectability, and criticality category
- controls and detection methods
- mitigation and residual concern
- owner, due date, status, evidence, and review
- creation of linked mitigation work
- structured report export

LOOM does not present one numerical scoring method as universally authoritative.

### 6. Execution

Execution uses shared authoritative work records for:

- Kanban lanes
- Gantt scheduling
- owners, priority, dates, percent complete, and blockers
- dependencies, cycle detection, slack, and critical path
- financial project budgets
- separate technical engineering budgets
- actions

Kanban and Gantt do not maintain separate task databases.

### 7. Evidence

Evidence supports:

- attached local files
- web links
- evidence notes
- file metadata
- Secure Hash Algorithm 256-bit (SHA-256) fingerprints
- revision-preserving replacement
- current, stale, and superseded states
- evidence gaps
- requirement dossiers
- report generation

Evidence fingerprints are integrity and change-detection aids. They are not digital signatures or proof of legal authenticity.

### 8. Baselines

Baselines provide:

- named snapshots
- exact controlled collections and relationships
- added, removed, and changed-record comparison
- changed-field inspection
- change-request records
- direct-impact presentation

A baseline comparison does not silently rewrite current engineering records.

## Controlled-record workflow

A typical Batch 2 workflow is:

1. Open **Record Studio**.
2. Select a controlled-record type.
3. Select an existing record or create a new one.
4. Enter identity, ownership, lifecycle, tags, notes, and record-specific fields.
5. Add a concise revision note explaining why the record changed.
6. Save the new record or new revision.
7. Open **Relationships** to add typed traceability and rationale.
8. Open **Revisions** to compare field snapshots.
9. Restore an earlier field state when needed; LOOM creates a new revision.
10. Archive a record when it leaves active work; restore the same record if it returns.

The complete interaction loop is:

**ENTRY → ACTION → STATE CHANGE → FEEDBACK → PERSISTENCE → RECOVERY**

## Quick start: production application

The production ZIP is ready to serve without installing Node.js dependencies.

### Python local server

From the extracted production directory:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173
```

### Included Node.js server

The complete-source package includes a dependency-free static server:

```bash
npm run preview:offline
```

The default address is:

```text
http://127.0.0.1:4173
```

### Do not rely on `file://`

Opening `index.html` directly may render the interface, but browser security restrictions can prevent or alter:

- service-worker registration
- offline caching
- IndexedDB behavior
- installability
- file and download behavior

Serve the directory from a local or hosted HTTP or Hypertext Transfer Protocol Secure (HTTPS) origin.

## Install as a web application

Where supported by the browser and operating system:

1. Serve or host the production directory.
2. Open LOOM in the browser.
3. Use the browser’s install-app command.

The included manifest defines application identity, scope, standalone display, categories, theme, and 192-pixel and 512-pixel icons.

Install prompts and operating-system integration differ by browser. LOOM remains fully usable in an ordinary browser tab.

## First-run project choices

LOOM opens with a realistic portable environmental monitor sample project demonstrating:

- parent and derived requirements
- threshold and target values
- a Technical Performance Measure
- function and hardware/software allocation
- inherited obligations
- FMECA and mitigation
- unit, integration, system, and operational results
- supporting evidence
- schedule and budgets
- baselines and change impact

Use:

- **Fresh Start** for a genuinely empty project
- **Load sample project** to restore the demonstration
- **Duplicate project** to create a separate local copy
- **Archive project** to remove a project from the active selector without deleting it

## Data safety and recovery

### Authoritative storage

LOOM stores complete project records in IndexedDB. If IndexedDB is unavailable, it attempts local browser storage as a recovery fallback and reports the active backend.

Browser storage belongs to a particular combination of:

- browser
- browser profile
- protocol
- hostname
- port

For example, `http://localhost:4173` and `http://127.0.0.1:4173` are different origins and therefore different local storage locations.

### Autosave states

The interface reports:

- Unsaved
- Saving
- Saved
- Error
- Recovery
- Imported

Autosave writes are serialized so an older write cannot finish after and overwrite a newer project revision.

### Recovery snapshots

LOOM can create and restore local recovery snapshots. Automatic snapshots are created before safety-sensitive replacement or deletion operations, including:

- Fresh Start
- sample-project replacement
- import replacement
- recovery restoration
- permanent project deletion

The newest eight recovery snapshots are retained for each project.

Recovery snapshots protect against local workflow mistakes. They are stored on the same browser origin and are not a substitute for an external backup.

### Persistent storage request

The **Data safety and recovery** workspace can request persistent browser storage. The browser decides whether to grant the request. A denied request does not mean the application failed, but the browser may be more willing to evict storage under pressure.

### External backups

Export the full project regularly and before:

- clearing browser data
- changing hostnames or ports
- changing browsers or browser profiles
- reinstalling an operating system
- replacing a device
- making a destructive project change

## Project export and import

### Export format

Full-project JavaScript Object Notation (JSON) export includes a versioned exchange manifest with:

- exchange format and format version
- export date and time
- application identity and version
- schema version
- complete project data
- relationships, revisions, histories, settings, baselines, and attachment data currently stored in the project

### Import behavior

Before replacement, LOOM performs:

1. file-size validation
2. JSON parsing
3. project extraction
4. structural validation
5. schema review
6. supported migration
7. duplicate-identity detection
8. controlled-relationship validation
9. current-project preservation
10. pre-import recovery snapshot
11. imported-project commit

Malformed JSON, unsupported future schemas, duplicate stable identities, and dangling relationships are rejected without replacing the active project.

### Supported schemas

LOOM v0.3.0 accepts:

- schema v0.1.0, migrated to v0.3.0
- schema v0.2.0, migrated to v0.3.0
- schema v0.3.0

Migration initializes missing field-level revision history, records the source and destination schema, preserves stable record identities, and retains unknown top-level project fields.

## Offline behavior and updates

### Offline behavior

After one successful served load, the service worker caches the application shell. The production bundle has no runtime content-delivery-network dependency.

Project records remain local. Offline use does not require a LOOM account or cloud service.

### Application updates

The v0.3.0 service worker uses:

```text
loom-shell-v0.3.0
loom-runtime-v0.3.0
```

When activated, it removes older LOOM caches and claims open application pages. Navigation requests use a network-first strategy with cached fallback. Local assets use cached content while refreshing when a network response is available.

When an older release appears after deployment:

1. reload the page
2. close and reopen the installed application
3. inspect the browser’s service-worker controls
4. clear only the application cache if necessary, after exporting the project

Do not clear all site data without first exporting the project.

## Reports and structured exports

Current outputs include:

- project status report in Markdown
- printable project status report suitable for Portable Document Format (PDF) output
- requirement dossier in Markdown
- Requirements Traceability Matrix in Comma-Separated Values (CSV)
- FMECA report in CSV
- evidence index in CSV
- unit, integration, subsystem, system, and operational verification summaries in CSV

Reports are constructed from the project model rather than captured as screenshots of the interface.

Not every report named in the full product specification has a separately formatted PDF layout yet. See `docs/IMPLEMENTATION-COVERAGE.md`.

## Develop from source

### Requirements

For the conventional development path:

- Node.js 20.19 or later, or Node.js 22.12 or later
- npm

Install dependencies and start Vite:

```bash
npm install
npm run dev
```

Conventional production build:

```bash
npm run build
```

Type check:

```bash
npm run check
```

### Offline-oriented build

The repository includes a deterministic builder that uses the checked-in React runtime and a locally available TypeScript compiler:

```bash
npm run build:offline
```

This creates `dist/` without a runtime content-delivery-network dependency.

The current execution environment could not install registry packages, so this release does not claim that the conventional Vite/type-check path was completed here. The offline builder transpiled the complete modular source with no source-transpile diagnostics, and the resulting production bundle was exercised by the browser suites.

## Validation commands

### Domain and lifecycle validation

```bash
npm test
```

This writes:

```text
domain-test-results.json
```

### General Chromium interaction and layout suite

```bash
npm run test:browser
```

This writes:

```text
browser-smoke-results.json
```

### Dedicated Batch 2 lifecycle suite

```bash
npm run test:batch2
```

This writes:

```text
record-lifecycle-results.json
```

### Complete Batch 2 validation available in this environment

```bash
npm run validate:batch2
```

This rebuilds the offline bundle, checks the generated application JavaScript syntax, and runs the domain and 67-check general Chromium suite. The general suite already covers Record Studio creation, revision comparison, relationships, archive/restore, prior-value recovery, undo/redo, keyboard access, and persistence.

Run the focused 37-check lifecycle suite separately with `npm run test:batch2`. Keeping the second Chromium process separate avoids browser-startup contention in constrained automation environments.

### Real-origin deployment acceptance

```bash
npm run test:origin
```

This suite requires a browser environment that permits navigation to the loopback HTTP origin. It exercises real IndexedDB, service workers, Cache Storage, offline restart, browser-profile persistence, file input, downloads, imports, and recovery.

The combined deployment command is:

```bash
npm run validate:deployment
```

In a managed browser that blocks loopback navigation, this command will correctly report the environment limitation rather than falsely claiming deployment-origin acceptance.

## Delivered validation evidence

| File | Purpose |
|---|---|
| `domain-test-results.json` | 148 deterministic domain, migration, relationship, lifecycle, and source-transpile checks |
| `browser-smoke-results.json` | 67 general Chromium interaction, persistence-fallback, layout, and lifecycle checks |
| `record-lifecycle-results.json` | 37 focused Record Studio, revision, relationship, archive, search, undo, and redo checks |
| `origin-acceptance-results.json` | Current real-origin attempt and administrator-policy limitation |
| `docs/VALIDATION.md` | Human-readable validation record |
| `docs/BATCH-2-ACCEPTANCE.md` | Batch 2 objectives, evidence, boundaries, and acceptance decision |
| `docs/screenshots/validation-record-studio-revisions.png` | Revision comparison workspace |
| `docs/screenshots/validation-record-studio-lifecycle.png` | Archive, restore, and audit history |

## Architecture

LOOM separates authoritative engineering data from its visual projections.

### Domain layer

Key files:

- `src/domain/types.ts` — normalized project and record types
- `src/domain/factory.ts` — stable identities, snapshots, reconciliation, and project factories
- `src/domain/recordLifecycle.ts` — controlled-record registry and lifecycle operations
- `src/domain/calculations.ts` — reproducible engineering calculations
- `src/domain/schedule.ts` — dependencies, slack, and critical path
- `src/domain/migrations.ts` — schema validation and migration
- `src/domain/validation.ts` — controlled identity and relationship validation

### Persistence and exchange layer

- `src/services/db.ts` — IndexedDB projects, recovery snapshots, serialized writes, and fallback storage
- `src/services/files.ts` — project exchange, CSV generation, evidence conversion, and SHA-256 fingerprints
- `src/services/reports.ts` — semantic reports built from domain records

### Application state layer

`src/hooks/ProjectContext.tsx` owns:

- the active project and project library
- debounced autosave
- serialized persistence
- recovery-aware replacement
- project switching, duplication, archive, restore, and deletion
- session undo and redo
- global controlled-record reconciliation
- notifications and storage diagnostics

### Presentation layer

The eight primary views remain under `src/views/`. Shared controls include:

- `ControlledRecordStudio.tsx`
- `RequirementWizard.tsx`
- `RequirementCoupon.tsx`
- `RequirementInspector.tsx`
- readiness, metric, modal, table, and evidence components

A requirement coupon, Kanban card, Gantt row, verification queue entry, hierarchy node, global-search result, and Record Studio row are projections of shared records rather than independent copies.

## Repository structure

```text
src/
  components/       Shared interface and controlled-record components
  data/             Realistic sample project
  domain/           Entities, lifecycle, calculations, validation, migrations
  hooks/            Project state, autosave, undo/redo, and persistence orchestration
  services/         Database, project exchange, evidence, and reports
  utils/            Identifiers, dates, and text helpers
  views/             Eight primary LOOM work areas
public/
  icons/             Installable application icons
  manifest.webmanifest
  sw.js              Versioned offline service worker
scripts/
  build-offline.mjs
  serve-dist.mjs
  test-domain.mjs
  browser-smoke.py
  browser-batch2.py
  browser-origin.py
vendor/
  react-18.2.0/      Checked-in runtime and third-party notices
docs/
  ARCHITECTURE.md
  IMPLEMENTATION-COVERAGE.md
  VALIDATION.md
  BATCH-1-ACCEPTANCE.md
  BATCH-2-ACCEPTANCE.md
  screenshots/
dist/                Prebuilt production application
```

## Privacy and network behavior

LOOM:

- requires no account
- includes no analytics, advertising, trackers, or telemetry
- performs no silent transmission of project content
- stores records and attached evidence locally by default
- bundles its runtime dependencies
- contacts only the origin from which the user deliberately serves or hosts the application
- opens external evidence links only after user action

A user-controlled hosted origin can still have its own server logging or hosting policy. LOOM itself does not add telemetry.

## Supported and validated environments

The delivered v0.3.0 production assets were exercised with the available system Chromium browser at a 1600 × 1000 viewport through a synthetic document with a browser-storage-compatible local fallback.

The current managed environment blocked direct loopback-origin navigation. Therefore, this release does not claim a fresh v0.3.0 real-origin pass for:

- IndexedDB over the final deployment origin
- service-worker installation and control
- Progressive Web Application installation
- operating-system-specific file and download permissions
- Firefox or WebKit behavior

The v0.2.0 Batch 1 historical acceptance record documents a prior 48-check real-origin Chromium pass for those foundations. Re-run `npm run test:origin` on the final hosting origin or an unrestricted local environment before treating deployment acceptance as complete.

## Troubleshooting

### The interface opens, but offline or storage features do not work

Serve the production folder through HTTP or HTTPS. Do not rely on `file://`.

### Record Studio did not save a revision

A material field change is required. LOOM intentionally ignores a no-op save so the audit record is not polluted with false revisions.

### An archived record seems missing

Open Record Studio, select the record type, and enable **Show archived records**. The record retains its identity, history, and relationships.

### Undo is disabled

Undo applies only to mutations made in the current project session. Project replacement, switching, import, and recovery restoration reset the session stack.

### Undo restored values but the revision increased

That is expected for a controlled record. Undo and redo create new traceable revisions rather than erasing the intervening history.

### The Data Safety workspace reports local browser storage fallback

IndexedDB was unavailable or failed. Export the project, inspect browser privacy/storage settings, and try the application from a normal served origin.

### Another tab is blocking the database upgrade

Close older LOOM tabs using the same origin, then reload the new release.

### A project disappeared after changing the address

Return to the exact earlier protocol, hostname, and port, then export the project and import it into the desired origin.

### The application appears to be an older version

Reload, close and reopen an installed application, and inspect service-worker/cache state. Export project data before clearing site storage.

### An import is rejected

Read the error message. LOOM rejects malformed JSON, unsupported future schemas, duplicate stable identities, and dangling relationships before replacement.

### The browser did not grant persistent storage

Continue using LOOM, but maintain external backups. Browser storage persistence is controlled by the browser.

### The origin acceptance test cannot open the local address

The browser may be managed by an administrator policy. Run the test in an unrestricted browser environment or validate the deployed HTTPS origin manually.

## Current boundaries

LOOM v0.3.0 is a coherent local single-user engineering instrument. It is not currently:

- a cloud collaboration platform
- an enterprise Product Lifecycle Management (PLM) replacement
- an enterprise Application Lifecycle Management (ALM) replacement
- a source-code repository
- a computer-aided design or simulation system
- an automatic certification authority
- a substitute for engineering judgment, independent safety review, or approved organizational processes

Important future work includes recursive impact propagation, automatic inheritance-review queues, configurable readiness policies, advanced relationship graphs and editable matrices, complete scheduling calendars and resource leveling, custom technical-budget formulas, portable compressed evidence packages, full spreadsheet import, and additional formatted reports.

## Documentation map

- `README.md` — operator, deployment, development, recovery, and troubleshooting guide
- `CHANGELOG.md` — release history
- `docs/BATCH-2-ACCEPTANCE.md` — Batch 2 acceptance record
- `docs/BATCH-1-ACCEPTANCE.md` — historical v0.2.0 deployment and data-safety acceptance
- `docs/IMPLEMENTATION-COVERAGE.md` — exact implemented, partial, deferred, and excluded scope
- `docs/ARCHITECTURE.md` — domain, lifecycle, persistence, state, presentation, and deployment architecture
- `docs/RECORD-LIFECYCLE.md` — operator and developer rules for identity, revisions, archive, links, and undo/redo
- `docs/VALIDATION.md` — validation evidence and limitations

## License and third-party notices

No project license has been assigned in this release.

React, React DOM, and Scheduler third-party notices are included in:

```text
vendor/react-18.2.0/THIRD_PARTY_LICENSES.txt
dist/THIRD_PARTY_LICENSES.txt
```
