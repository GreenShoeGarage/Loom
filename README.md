# LOOM v0.5.0

**Systems Engineering Project Control**

> **Trace requirements down. Build evidence back up.**

LOOM is a local-first systems-engineering workbench organized around one digital engineering thread:

**REQUIREMENTS → VERIFICATION INTENT → FAILURE ANALYSIS → FUNCTIONS → ALLOCATION → DECOMPOSITION → IMPLEMENTATION → UNIT VERIFICATION → INTEGRATION → SYSTEM VERIFICATION → OPERATIONAL VALIDATION → EVIDENCE → ACCEPTANCE → BASELINE → CHANGE IMPACT → REVERIFICATION**

LOOM is not a generic project manager with engineering records attached afterward. Requirements, functions, implementation objects, interfaces, verification records, Failure Modes, Effects, and Criticality Analysis (FMECA), evidence, work, budgets, baselines, changes, and impact reviews share one normalized project model with stable identities and typed relationships.

## Release status

| Item | Status |
|---|---|
| Application | **LOOM v0.5.0** |
| Project schema | **v0.5.0** |
| Release focus | **Batch 4 — Verification, Validation, and Readiness Closure** |
| Operation | Local-first, single-user, offline-capable |
| Required account | None |
| Required remote service | None |
| Telemetry, analytics, advertising, or trackers | None |

LOOM v0.5.0 is a working engineering instrument with a prebuilt production application and modular TypeScript source. It organizes engineering intent, execution, evidence, and decisions; it does not claim that its records automatically establish compliance, safety, verification, validation, acceptance, approval, or certification.

## Foundational design rules

LOOM preserves several deliberate systems-engineering distinctions:

- Ask how a requirement will be **verified**, not only how it will be tested. Verification may use test, analysis, inspection, demonstration, similarity, certification, a combination, or an intentionally undetermined method.
- Treat parent flow-down as explicit **inherited obligations** that must be accepted, parameterized, tailored, decomposed, satisfied at the parent level, declared not applicable, superseded, or left pending review.
- Keep logical functions separate from hardware, software, firmware, human, process, facility, and external-system implementation objects.
- Use software-appropriate and firmware-appropriate decomposition rather than forcing every domain into a hardware hierarchy.
- Treat every Requirement Coupon, Kanban card, Gantt row, verification queue entry, impact item, and readiness row as a projection of one authoritative record.
- Keep financial project budgets separate from technical engineering budgets such as mass, power, energy, thermal dissipation, bandwidth, memory, and latency.

## What changed in v0.5.0

Batch 4 completes the first coherent **build-evidence-back-up** workflow. Verification intent can now become a controlled plan, reusable setup, parameterized case, exact as-run activity, retained result, structured exception, operational validation record, closure decision, and explainable readiness gate.

### Verification is broader than testing

The verification workbench supports:

- test
- analysis
- inspection
- demonstration
- similarity
- certification
- combination
- not yet determined

Method-specific execution details are stored on the as-run record. Analysis records can retain models, tools, assumptions, and calculation summaries. Inspection records retain the inspected item, method, and sample. Demonstrations retain scenarios and participants. Similarity retains the reference, basis, and differences. Certification retains the authority, certificate, scope, and expiration. Combination records identify the contributing methods and their supporting details.

### Eight verification work areas

Advanced Mode exposes eight task-oriented tabs:

1. **Plans** — verification intent, method, level, acceptance criteria, configuration, environment, equipment, approval, and covered requirements.
2. **Setups** — reusable controlled configurations, environments, equipment, instrumentation, personnel, safety considerations, calibration requirements, and documents.
3. **Test cases** — repeatable steps, expected results, parameter definitions, default values, evidence expectations, shared setup, and inherited acceptance rules.
4. **Executions** — exact as-run plan, case, and setup revisions; configuration and versions; operator and reviewer; parameters; data; observations; deviations; evidence; result; and rerun lineage.
5. **Results** — method, level, currency, evidence, and every verification-closure condition.
6. **Exceptions** — deviations, anomalies, defects, and observations with severity, disposition, retest requirements, evidence, and corrective rerun linkage.
7. **Operational validation** — stakeholder need, operational scenario, representative user, mission or use objective, suitability observations, and acceptance recommendation.
8. **Readiness** — controlled gate policies, weighted factors, required factors, scores, next actions, waivers, conditional approvals, and manual overrides.

Easy Mode continues to present the essential guided workflow rather than merely hiding arbitrary controls.

### Reusable setups and parameterized cases

A reusable verification setup is a first-class controlled record. A plan or test case can reference it without copying the setup text into every execution. Each execution records the exact setup revision actually used.

Parameterized cases support text, number, and Boolean inputs with:

- name
- description
- unit
- data type
- default value
- required state
- as-run value

A case retains repeatable instructions and expected results. Creating an execution from a case carries the case, setup, and parameter defaults into the as-run form while preserving the operator’s ability to record the actual values used.

### Exact as-run configuration and revision capture

Every verification execution retains:

- exact verification-plan revision
- exact test-case revision, when applicable
- exact reusable-setup revision, when applicable
- date and time
- operator and reviewer
- system configuration
- hardware revision
- software version
- firmware version
- environment
- equipment
- calibration reference
- parameter values
- input and output data
- observations
- deviations
- method-specific details
- operational-validation context
- result
- reviewer disposition
- configuration conformance
- evidence
- currency state
- retest state and rationale

A status label alone cannot close a requirement.

### Retained failures and controlled reruns

A later pass never overwrites an earlier failure. **Clone as rerun** creates a new execution that:

- references the source execution
- retains the source operator, configuration, plan, case, setup, parameters, and retest reason as starting values
- receives its own stable identity and execution number
- records its own result, reviewer disposition, evidence, and exact revisions
- updates the prior run’s retest state without changing the prior result
- links corrective verification exceptions to the new rerun where applicable

Recording a valid as-run result intentionally suppresses automatic change-impact generation for the bookkeeping references added during that transaction. This prevents a newly recorded result or its evidence from being marked stale merely because it was linked to the requirement it verifies. Material requirement, configuration, plan, interface, or assumption changes still use the Batch 3 impact engine.

### Structured exceptions

Verification exceptions are controlled records for:

- deviation
- anomaly
- defect
- observation

They retain the originating execution, affected requirements, severity, description, owner, status, disposition, evidence, due date, retest requirement, and corrective rerun. An exception that requires retest keeps closure open until the retest is complete or deliberately waived through a controlled decision.

### Operational validation

Operational-level verification is treated primarily as validation in an intended or representative use context. The as-run record can retain:

- stakeholder need
- operational scenario
- representative user
- mission or use objective
- suitability observations
- acceptance recommendation

Verification state and validation state remain separate. A passing laboratory result does not silently become operational acceptance.

### Explainable verification closure

The closure service evaluates the applicable combination of:

- approved verification plan
- completed verification execution
- acceptable result
- current or reviewed-current currency
- method-specific record completeness
- defined acceptance criteria
- explicit acceptance-criteria satisfaction
- as-run configuration
- accepted configuration conformance
- exact plan, case, and setup revisions
- accepted reviewer disposition
- resolved deviations, anomalies, defects, and observations
- completed or waived retest
- attached current evidence

Every condition displays its result and supporting detail. A manually selected pass label cannot bypass the missing conditions.

### Explainable readiness governance

LOOM includes controlled readiness policies for unit, integration, subsystem, system, and operational levels. Policies define:

- minimum score
- whether all required factors must pass
- enabled factors
- required factors
- factor weights
- approval state
- controlled revision history

The current readiness factors are:

1. requirement allocation coverage
2. inherited obligations resolved
3. implementation complete
4. lower-level verification complete
5. required interfaces verified
6. high-criticality failures addressed
7. verification plan approved
8. required configuration identified
9. verification closure complete
10. deviations and anomalies resolved
11. evidence complete and current
12. blocking work resolved
13. schedule readiness
14. budget availability
15. change impacts dispositioned
16. operational validation accepted

Readiness displays the evaluated policy, numerical score, textual state, supporting facts, open records, and next actions. Lower-level failures can block higher-level readiness. No unexplained green indicator is used.

### Controlled waivers and overrides

A readiness exception is another controlled record, not an invisible switch. LOOM supports:

- waiver
- conditional approval
- manual override

The record retains target, level, affected factors, rationale, requester, reviewer, approval state, effective date, optional expiration, affected records, revision history, and audit history. An approved exception remains visibly associated with the readiness result. It changes the displayed disposition but does not erase the underlying failed or incomplete factors.

### Batch 4 sample thread

The portable environmental-monitor sample now demonstrates:

- two reusable setups
- five verification plans using test, combination, and demonstration methods
- three parameterized cases
- six retained as-run executions
- an original timing failure and a separate successful controlled rerun
- structured deviation, defect, and observation records
- operational validation with representative users and acceptance recommendation
- five readiness policies
- one controlled readiness request
- current, potentially stale, reviewed-current, stale, and superseded currency behavior
- verification, cross-reference, exception, readiness, and operational reports

## Current application capability

LOOM keeps a stable eight-area shell. Batch 4 deepens the verification thread without adding a disconnected top-level module.

### 1. Cockpit

The Cockpit concentrates on actionable exceptions:

- requirement definition, allocation, verification, and validation coverage
- open impact reviews and pending impact items
- unresolved inherited obligations
- potentially stale results and evidence
- open verification exceptions
- readiness overrides awaiting review
- high-criticality failure modes and mitigations
- late work and blocked milestones
- financial and technical-budget variance
- evidence completeness
- readiness by integration level

Indicators open the underlying work wherever direct drill-down is available.

### 2. Requirements

Requirements provide:

- nine-step guided intake
- source, rationale, stakeholder, owner, reviewer, and hierarchy
- threshold, target, tolerance, bounds, conditions, and acceptance rule
- Technical Performance Measure (TPM) trend and margin
- requirement-quality prompts
- separate definition, allocation, implementation, verification, validation, and evidence states
- list, tree, coupon, performance, and traceability views
- persistent Requirement Coupons
- complete requirement dossiers

### 3. Architecture

Architecture provides:

- separate function and implementation hierarchies
- hardware, software, firmware, human/process, facility, and external-system domains
- many-to-many requirement, function, and object allocation
- first-class interfaces
- explicit inherited obligations and parent-change review
- allocation and orphan-coverage indicators
- linked V-model presentation

### 4. Verification

Verification now provides the complete Batch 4 workbench described above. It supports all eight verification-intent methods, reusable setups, parameterized cases, exact as-run records, retained failures, controlled reruns, structured exceptions, operational validation, closure explanations, readiness policies, and controlled exceptions.

### 5. Failure Analysis

Failure Analysis provides integrated FMECA records with:

- requirement, function, object, interface, test, and field-observation origins
- cause and local, next-higher-level, and end effects
- severity, likelihood, detectability, and criticality
- prevention and detection controls
- mitigations, owners, dates, residual concern, and evidence
- linked mitigation work

### 6. Execution

Execution uses shared authoritative work records for:

- Kanban
- Gantt
- owners, dates, priority, completion, blockers, and dependencies
- cycle detection, slack, and critical path
- financial project budgets
- separate technical engineering budgets
- actions

Kanban and Gantt do not maintain separate task databases.

### 7. Evidence

Evidence supports:

- local files, web links, and notes
- file metadata and Secure Hash Algorithm 256-bit (SHA-256) fingerprints
- revision-preserving replacement
- current, potentially stale, reviewed-current, stale, and superseded currency
- evidence gaps
- requirement dossiers
- generated semantic reports

Fingerprints are integrity and change-detection aids; they are not digital signatures or proof of legal authenticity.

### 8. Baselines

Baselines provide:

- named exact snapshots
- controlled revision and relationship comparison
- added, removed, and changed-record inspection
- changed-field inspection
- impact-review queue
- change requests
- source revision comparison and explainable propagation paths

## Controlled Record Studio

The global Controlled Record Studio governs 22 authoritative collections:

1. requirements
2. functions
3. implementation objects
4. interfaces
5. verification plans
6. verification setups
7. test cases
8. verification executions
9. verification exceptions
10. readiness policies
11. readiness overrides
12. failure modes
13. work items
14. project budget lines
15. technical budgets
16. evidence documents
17. impact reviews
18. decisions
19. assumptions
20. issues and actions
21. baselines
22. change requests

It provides stable identity, controlled revisions, field comparison, archive and restore, typed relationships, search, and direct opening from specialist views. It is a universal lifecycle workspace, not a replacement for the task-oriented Requirements, Verification, Failure Analysis, Evidence, Execution, or Baselines workflows.

Open it from the top bar, project menu, or:

```text
Command/Ctrl + Shift + R
```

## Quick start: production application

The production package is prebuilt. It does not require Node.js dependencies to run.

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

The complete-source package includes a dependency-free server:

```bash
npm run preview:offline
```

The default address is:

```text
http://127.0.0.1:4173
```

### Do not rely on `file://`

Opening `index.html` directly may render part of the interface, but browser security restrictions can prevent or alter:

- Indexed Database Application Programming Interface (IndexedDB) storage
- service-worker registration
- offline caching
- installability
- file input and download behavior

Serve the directory from a local or hosted Hypertext Transfer Protocol (HTTP) or Hypertext Transfer Protocol Secure (HTTPS) origin.

## First-run project choices

LOOM opens with the portable environmental-monitor sample project.

Use:

- **Fresh Start** for a genuinely empty project
- **Load sample project** to restore the demonstration
- **Duplicate project** to create an independent local copy
- **Archive project** to remove a project from the active selector without deleting it

## Data safety and recovery

### Authoritative storage

Complete project objects are stored transactionally in IndexedDB. If IndexedDB is unavailable, LOOM attempts local browser storage as a recovery fallback and reports the backend that completed the save.

Browser storage belongs to a specific browser profile and origin. Protocol, hostname, and port all matter. For example, `http://localhost:4173` and `http://127.0.0.1:4173` use different local storage.

### Autosave

The interface reports:

```text
Unsaved → Saving → Saved
```

Error, unavailable, recovery, and imported states are also supported. Saves are serialized so an older asynchronous write cannot finish after and overwrite a newer revision.

### Recovery snapshots

LOOM creates or supports recovery snapshots before:

- Fresh Start
- sample replacement
- imported-project replacement
- snapshot restoration
- permanent project deletion

The newest eight snapshots are retained per project. Recovery snapshots protect the local workflow but are not external backups.

### External backups

Export the full project before clearing site data, changing origins, changing browser profiles, reinstalling a device, or making a destructive project change.

## Project import and export

The full-project JavaScript Object Notation (JSON) exchange package includes:

- exchange format and format version
- export date
- application and schema versions
- complete project data
- relationships
- record revisions and histories
- settings
- baselines
- attachment data stored in the project

Before replacement, import performs file-size, syntax, shape, schema, identity, and relationship validation; applies supported migrations; preserves the current project; creates a recovery snapshot; and commits the replacement before changing the interface.

LOOM v0.5.0 accepts schema versions v0.1.0 through v0.5.0 and migrates older supported projects to v0.5.0 while preserving stable identities and unknown top-level extension fields.

## Offline behavior and updates

After one successful served load, the service worker caches the application shell. The production bundle has no runtime content-delivery-network dependency.

The v0.5.0 cache names are versioned. On activation, the service worker removes older LOOM caches, claims open pages, uses network-first navigation with cached fallback, and serves local assets from cache while refreshing them when possible.

Export project data before clearing all site storage to resolve an update issue.

## Reports and structured exports

Current semantic outputs include:

- project status report
- requirement dossier
- Requirements Traceability Matrix
- FMECA report
- evidence index
- change-impact report
- verification and validation status report
- verification cross-reference
- verification exception register
- V-model readiness report
- operational validation summary
- unit, integration, subsystem, system, and operational structured summaries

Reports are built from the project model rather than captured as screenshots. Markdown, printable Hypertext Markup Language (HTML) suitable for Portable Document Format (PDF) output, and Comma-Separated Values (CSV) are used where currently appropriate.

## Develop from source

### Conventional development path

Requirements:

- Node.js 20.19 or later, or Node.js 22.12 or later
- npm

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Type check:

```bash
npm run check
```

Build through Vite:

```bash
npm run build
```

The delivered environment did not contain the registry-installed React type declarations, Vite, or the Vite React plug-in. The conventional check and build were attempted but could not complete here. This is reported as an external environment boundary, not converted into a passing result.

### Offline-oriented build

The repository includes a deterministic builder using the checked-in React runtime and a locally available TypeScript compiler:

```bash
npm run build:offline
```

This produces `dist/` without contacting a package registry and without a runtime content-delivery-network dependency.

## Validation

### Complete executable Batch 4 validation

```bash
npm run validate:batch4
```

This runs the offline build, generated-JavaScript syntax check, deterministic domain suite, general Chromium suite, controlled lifecycle regression, Batch 3 impact regression, and dedicated Batch 4 verification/readiness suite.

### Individual commands

```bash
npm test
npm run test:browser
npm run test:lifecycle
npm run test:batch3
npm run test:batch4
npm run test:origin
```

### Delivered accepted results

| Suite | Result |
|---|---:|
| Domain, migration, lifecycle, impact, verification, readiness, calculation, and source-transpile checks | **250 of 250 passed** |
| General Chromium interaction and layout checks | **67 of 67 passed** |
| Controlled-record lifecycle regression checks | **37 of 37 passed** |
| Batch 3 impact and inheritance regression checks | **76 of 76 passed** |
| Dedicated Batch 4 verification, validation, and readiness checks | **91 of 91 passed** |
| **Total accepted automated checks** | **521 of 521 passed** |
| Browser page exceptions across accepted browser suites | **0** |
| Browser console errors across accepted browser suites | **0** |

Machine-readable evidence:

- `domain-test-results.json`
- `browser-smoke-results.json`
- `record-lifecycle-results.json`
- `impact-review-results.json`
- `verification-readiness-results.json`
- `origin-acceptance-results.json`

Representative Batch 4 screenshots:

- `docs/screenshots/validation-verification-executions.png`
- `docs/screenshots/validation-verification-readiness.png`

### Validation boundaries

The real-origin test server started at `http://127.0.0.1:4195`, but managed Chromium blocked loopback navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. The navigation gate is not counted as passed. Run `npm run test:origin` in an unrestricted browser environment or on the final hosting origin.

The conventional TypeScript/Vite path was attempted but could not resolve registry-installed development dependencies. The release therefore claims the successful offline build and accepted executable suites, not a conventional Vite build in this environment.

## Architecture

LOOM separates:

- normalized domain entities and typed relationships
- controlled record lifecycle and revision snapshots
- verification, closure, readiness, impact, schedule, and budget calculations
- persistence, recovery, import, export, and evidence handling
- application state, autosave, undo, and project replacement
- task-oriented views and shared components
- semantic reports
- deployment and validation scripts

See `docs/ARCHITECTURE.md` and `docs/VERIFICATION-READINESS.md` for the detailed design.

## Repository structure

```text
src/
  components/       Shared interface and controlled-record components
  data/             Portable environmental-monitor sample project
  domain/           Entities, lifecycle, verification, readiness, impact, calculations, validation, migrations
  hooks/            Project state, autosave, undo/redo, persistence orchestration
  services/         Database, exchange, evidence, and semantic reports
  utils/            Identifiers, dates, and text helpers
  views/             Eight primary LOOM work areas
public/
  icons/             Installable application icons
  manifest.webmanifest
  sw.js              Versioned service worker
scripts/
  build-offline.mjs
  serve-dist.mjs
  test-domain.mjs
  browser-smoke.py
  browser-batch2.py
  browser-batch3.py
  browser-batch4.py
  browser-origin.py
vendor/
  react-18.2.0/      Checked-in runtime and third-party notices
docs/
  Architecture, coverage, validation, acceptance, operator guides, screenshots
dist/
  Prebuilt production application
```

## Privacy and network behavior

LOOM:

- requires no account
- includes no telemetry, analytics, advertising, or trackers
- performs no silent transmission of project content
- stores project records and attached evidence locally by default
- bundles runtime dependencies
- contacts only the origin from which the user deliberately serves or hosts the application
- opens external evidence links only after user action

A user-selected hosting service may retain ordinary server logs under its own policy. LOOM itself does not add telemetry.

## Current boundaries

LOOM v0.5.0 is a coherent local, single-user engineering instrument. It is not currently:

- a cloud collaboration platform
- an enterprise Product Lifecycle Management (PLM) replacement
- an enterprise Application Lifecycle Management (ALM) replacement
- a source-code repository
- a computer-aided design or simulation system
- an automatic certification authority
- a substitute for engineering judgment, independent safety review, or approved organizational processes

Important later work includes efficient traceability matrices and bulk link authoring, portable compressed evidence packages, complete spreadsheet exchange, deeper project calendars and budget behavior, additional formatted reports, performance hardening, and broader deployment acceptance.

## Documentation map

- `README.md` — operator, deployment, development, recovery, and troubleshooting guide
- `CHANGELOG.md` — release history
- `docs/BATCH-4-ACCEPTANCE.md` — Batch 4 scope, evidence, limitations, and acceptance decision
- `docs/VERIFICATION-READINESS.md` — verification, validation, closure, rerun, exception, and readiness guide
- `docs/BATCH-3-ACCEPTANCE.md` — historical Batch 3 impact and inheritance acceptance
- `docs/IMPACT-AND-INHERITANCE.md` — change-impact and inherited-obligation rules
- `docs/BATCH-2-ACCEPTANCE.md` — historical controlled-record lifecycle acceptance
- `docs/RECORD-LIFECYCLE.md` — record identity, revisions, archive, relationships, and undo/redo
- `docs/BATCH-1-ACCEPTANCE.md` — historical deployment and data-safety acceptance
- `docs/IMPLEMENTATION-COVERAGE.md` — exact implemented, partial, deferred, and excluded scope
- `docs/ARCHITECTURE.md` — domain, verification, impact, persistence, presentation, and deployment architecture
- `docs/VALIDATION.md` — validation evidence and explicit boundaries
- `docs/LOOM_BUILD_SPECIFICATION.md` — original complete product specification

## License and third-party notices

No project license has been assigned in this release.

React, React DOM, and Scheduler third-party notices are included in:

```text
vendor/react-18.2.0/THIRD_PARTY_LICENSES.txt
dist/THIRD_PARTY_LICENSES.txt
```
