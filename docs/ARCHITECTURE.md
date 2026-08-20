# LOOM v0.5.0 Architecture

## Architectural intent

LOOM is organized around one authoritative, normalized digital engineering thread. A Requirement Coupon, hierarchy row, verification queue item, Kanban card, Gantt row, evidence gap, impact item, readiness factor, baseline comparison row, and Controlled Record Studio entry are projections of shared records rather than independent copies.

The v0.5.0 architecture extends the earlier releases with a complete verification, validation, and readiness domain while retaining:

- local-first project persistence
- schema-safe import and migration
- controlled record identity and revision history
- archive protection
- typed relationships
- bounded change-impact traversal
- inherited-obligation review
- result and evidence currency
- session undo and redo
- semantic report generation

The implementation follows five layers:

1. domain
2. persistence and exchange
3. application state
4. presentation
5. deployment and validation

---

# 1. Domain layer

## 1.1 Normalized project model

`src/domain/types.ts` defines the project schema and the controlled engineering records. The project root contains:

- application and schema versions
- migration history
- stable project identity
- project revision and timestamps
- settings
- requirements
- functions
- implementation objects
- interfaces
- verification plans
- verification setups
- test cases
- verification executions
- verification exceptions
- readiness policies
- readiness overrides
- failure modes
- work items
- schedule dependencies
- project budget lines
- technical budgets
- evidence documents
- impact reviews
- decisions
- assumptions
- issues and actions
- baselines
- change requests
- typed traceability links

Stable generated identifiers are authoritative. Human-readable identifiers such as `REQ-001`, `VP-001`, `RUN-001`, or `GATE-001` are labels and are not database keys. Array positions, titles, and visible row numbers are never treated as identity.

## 1.2 Common controlled-record contract

Every principal controlled record implements the shared `ControlledRecord` fields:

- stable identity
- visible identifier
- title
- owner
- lifecycle state
- current revision
- created and updated dates
- event history
- immutable revision snapshots
- notes
- tags
- archive state
- archive actor and date

Domain-specific fields remain on the concrete record. For example:

- a requirement retains separate definition, allocation, implementation, verification, validation, and evidence states
- a verification setup retains equipment, environment, personnel, calibration, and configuration
- an execution retains exact plan, case, and setup revisions plus the as-run condition
- an exception retains severity, disposition, retest state, and evidence
- a readiness policy retains level-specific factor rules
- a readiness override retains approval, rationale, target, factor scope, and expiration

Archive state remains orthogonal to the domain lifecycle state.

## 1.3 Controlled collection registry

`src/domain/recordLifecycle.ts` defines `controlledCollectionDescriptors` for 22 collections:

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

The registry drives:

- Controlled Record Studio navigation
- record creation
- visible identifier allocation
- global search
- active and archived counts
- destination-module navigation
- reconciliation
- validation coverage

## 1.4 Record creation and revision snapshots

`createDefaultControlledRecord` creates a valid draft for every controlled collection. It:

- generates stable identity
- allocates the next human-readable identifier
- initializes common controlled fields
- applies safe domain defaults
- initializes empty references
- creates the first immutable revision snapshot

`RecordRevisionSnapshot` stores:

- snapshot identity
- record revision
- capture date
- actor
- action
- summary
- changed field paths
- controlled record data

Snapshot generation removes recursive history and selected large or volatile payloads while retaining enough information for deterministic field comparison.

## 1.5 Shared reconciliation boundary

`reconcileProjectControlledRecords` in `src/domain/factory.ts` is the lifecycle boundary for project mutations. It compares the project before and after a mutation and handles:

- unchanged records without false revisions
- new records at revision one
- material changes with exactly one revision increment
- changed-field calculation
- event and snapshot creation
- accidental omission as archive rather than silent deletion

All specialist views pass mutations through the same boundary, so editing a requirement in Requirements, a test execution in Verification, or a decision in Record Studio produces the same controlled lifecycle behavior.

## 1.6 Typed traceability relationships

Typed links remain first-class project records. A link includes:

- stable identity
- source identity
- target identity
- relationship type
- rationale
- creation date
- creator

Supported semantics include derivation, decomposition, refinement, constraint, dependency, conflict, allocation, performance, realization, interface, verification, validation, evidence support, mitigation, scheduling, funding, change, supersession, blocking, and impact.

The lifecycle service validates endpoints, prevents equivalent duplicate links, and synchronizes compatible direct-reference arrays used by frequently traversed views.

---

# 2. Verification, validation, and readiness domain

## 2.1 Verification is method-neutral

`src/domain/verification.ts` treats verification as broader than testing. The domain supports:

- test
- analysis
- inspection
- demonstration
- similarity
- certification
- combination
- not yet determined

`VerificationMethodDetails` provides structured method-specific fields:

### Analysis

- model
- tool
- assumptions
- calculation summary

### Inspection

- inspected item
- method
- sample inspected

### Demonstration

- scenario
- participants

### Similarity

- reference
- basis
- relevant differences

### Certification

- authority
- certificate reference
- scope
- expiration

### Combination

- selected constituent methods
- method-specific details for the applicable constituents

`methodSpecificRequirements` and `methodSpecificCompleteness` determine whether the selected as-run method record contains the required information.

## 2.2 Verification plans

A `VerificationPlan` records:

- covered requirements
- method
- level
- objective
- acceptance criteria
- preconditions
- configuration
- environment
- equipment
- instrumentation
- personnel
- safety considerations
- procedure
- data to collect
- sample size
- pass/fail logic
- owner and reviewer
- planned date
- dependencies
- supporting documents
- approval state
- reusable setup reference
- inherited-environment and inherited-acceptance flags
- required reviewer disposition
- conditional-acceptance policy
- linked test cases

The plan revision is captured exactly by each execution.

## 2.3 Reusable verification setups

A `VerificationSetup` is a controlled, revisioned record containing reusable:

- configuration
- environment
- equipment
- instrumentation
- personnel
- safety considerations
- calibration requirements
- documents
- applicable verification methods

Plans and cases reference setup identity. Executions record the exact setup revision, preserving the as-run basis even after the reusable setup is later revised.

## 2.4 Parameterized test cases

A `TestCase` contains:

- linked plan
- optional reusable setup
- shared setup description
- ordered steps and expected results
- parameter definitions
- parameter values
- expected evidence
- inherited-acceptance-rule state

A parameter definition includes identity, name, description, unit, data type, default value, and required state. Execution-specific parameter values are stored on the execution, so one case can support controlled reruns or scenario variations without duplicating the case.

## 2.5 As-run verification executions

A `TestExecution` is the general as-run verification record despite retaining the historical collection name. It supports every verification method and stores:

- plan identity and exact revision
- method and level
- case identity and exact revision when applicable
- setup identity and exact revision when applicable
- requirement identities
- execution number
- rerun source and rerun sequence
- execution date and time
- operator and reviewer
- system configuration
- hardware revision
- software version
- firmware version
- environment
- equipment
- calibration reference
- input and output data
- observations and deviations
- parameter values
- method-specific record
- operational-validation record
- acceptance-criteria disposition
- configuration conformance
- reviewer disposition, date, and notes
- exception identities
- retest state and reason
- result
- evidence identities
- currency state and stale-source trace

Failed, blocked, inconclusive, conditional, waived, and superseded executions remain available after later reruns.

## 2.6 Structured exceptions and retest control

A `VerificationException` captures a deviation, anomaly, defect, or observation. It links to an execution and records:

- severity
- description
- affected requirements
- owner
- due date
- status
- disposition
- retest requirement
- evidence

`exceptionsForExecution` and `unresolvedExceptions` provide deterministic closure inputs. Accepted, corrected, and closed exceptions are dispositioned; open and under-review records remain blocking where required.

Executions separately retain `retestState` and `retestReason`. A required or scheduled retest prevents closure until completed or waived.

## 2.7 Controlled reruns

A rerun creates a new execution. It copies the applicable plan, case, setup, configuration, method, level, parameters, and requirement context, then receives an independent as-run result and evidence set.

The original execution remains unchanged. The rerun increments sequence and execution number and references the source execution.

Execution creation is a special mutation boundary: adding a new as-run record necessarily adds traceability references to requirements and evidence. `VerificationView` suppresses automatic change-impact generation for that creation transaction with `{ generateImpact: false }`. This prevents the new execution or its newly attached evidence from being marked stale merely because its own traceability links were created. Later substantive edits still pass through ordinary impact generation.

## 2.8 Operational validation

`OperationalValidationContext` stores:

- stakeholder need
- operational scenario
- representative user
- mission or use objective
- suitability observations
- acceptance recommendation

`operationalValidationCompleteness` requires the applicable context for operational-level closure. Recommendations include accept, conditional, reject, additional evaluation, and not assessed.

Operational validation remains distinct from lower-level technical verification, but uses the same controlled execution, evidence, exception, review, and readiness infrastructure.

## 2.9 Verification closure

`verificationExecutionClosure` derives closure from records. It evaluates sixteen visible conditions:

1. approved verification plan
2. completed execution
3. acceptable result
4. current result
5. complete method-specific record
6. defined acceptance criteria
7. acceptance criteria satisfied
8. as-run configuration recorded
9. configuration conformance accepted
10. exact plan, case, and setup revisions
11. accepted reviewer disposition
12. resolved deviations, anomalies, and defects
13. completed or waived retest
14. attached and current evidence
15. complete operational context when applicable
16. acceptable operational recommendation when applicable

The first fourteen are always blocking. The final two become blocking for operational-level executions. The result contains the full condition list and the unmet blocking subset.

A manually selected status label cannot close a requirement.

## 2.10 Readiness factors

Readiness is calculated from sixteen `ReadinessFactorKey` values:

- allocation coverage
- inherited obligations
- implementation complete
- lower-level verification
- interfaces verified
- high-criticality failures addressed
- approved verification plan
- configuration defined
- verification closure
- deviations resolved
- evidence current
- blocking work resolved
- schedule ready
- budget available
- impact reviews dispositioned
- operational validation

`rawReadinessFactors` evaluates each factor and returns:

- met state
- explanation
- related record identities

## 2.11 Readiness policies

A `ReadinessPolicy` is a controlled record for one verification level. It contains:

- minimum score
- whether every required factor must pass
- enabled factor rules
- required/optional state
- factor weight
- approval state

`evaluateRequirementReadiness` selects the newest approved policy for the level, calculates a weighted score, identifies required failures, and returns explicit next actions.

A requirement is ready only when:

- its score meets the policy threshold, and
- all required factors pass when the policy requires them.

The current design deliberately uses controlled templates and weights rather than an unrestricted expression or scripting language.

## 2.12 Lower-level roll-up

`descendantRequirements`, `verificationLevelRank`, and the readiness factor service connect lower-level verification to higher-level readiness.

For levels above unit, derived requirements are inspected for closed executions at lower verification levels. A failed or incomplete child result therefore prevents an unexplained parent-ready state.

## 2.13 Readiness overrides

A `ReadinessOverride` records:

- target record
- verification level
- waiver, conditional approval, or manual override kind
- rationale
- requester
- reviewer
- approval state
- optional expiration
- affected records
- affected factor keys

`activeReadinessOverride` considers only approved, unexpired records. An active override changes the displayed readiness disposition to overridden or conditionally ready but does not modify the underlying factor results.

---

# 3. Change impact and inheritance domain

## 3.1 Impact graph

`src/domain/impact.ts` constructs a directional engineering graph from:

- typed links
- direct references
- requirement hierarchy
- function and object allocation
- interfaces
- inheritance
- verification plans, cases, executions, and evidence
- failure analysis
- work and schedule
- project and technical budgets
- assumptions
- baselines and changes

Propagation is bounded and conservative. The current policy limits traversal depth and item count, avoids archived records, and prevents uncontrolled rebound into unrelated siblings.

## 3.2 Explainable impact reviews

An impact review preserves:

- changed source identity
- source revisions before and after
- changed fields and values
- affected records
- first accepted relationship path
- category and severity
- item disposition
- staleness candidate state
- inherited-obligation review state
- linked actions and change requests

Impact traversal does not rewrite downstream records.

## 3.3 Inherited obligations

Inherited obligations retain their source requirement revision, disposition, local parameters, rationale, review state, and history. Parent changes place affected obligations into review. Tailored, superseded, and not-applicable dispositions require rationale.

## 3.4 Result and evidence currency

Verification executions and evidence documents retain a currency state independent of pass/fail or approval state:

- current
- potentially stale
- stale
- reviewed current
- superseded

Potential staleness records the change source and rationale. A potentially stale result does not satisfy closure as unquestionably current.

---

# 4. Calculation services

`src/domain/calculations.ts` provides reproducible calculations for:

- requirement completeness
- threshold and target margin
- allocation state
- latest verification state
- evidence state
- verification closure integration
- failure criticality
- requirement and object readiness summaries
- project-budget roll-up
- technical-budget roll-up and margin
- baseline comparison
- Cockpit exceptions

`src/domain/verification.ts` provides the full Batch 4 verification and readiness calculations.

`src/domain/schedule.ts` calculates:

- dependency order
- earliest and latest dates
- slack
- critical path
- cycle detection

Derived status is not stored as an unexplained manual label when it can be reproduced from controlled facts.

---

# 5. Migration and validation

## 5.1 Schema migration

`src/domain/migrations.ts` is the supported entry point for imported or previously stored projects.

LOOM v0.5.0 supports:

- v0.1.0 to v0.5.0
- v0.2.0 to v0.5.0
- v0.3.0 to v0.5.0
- v0.4.0 to v0.5.0
- native v0.5.0

Migration:

- preserves stable project and record identity
- preserves relationships
- preserves event and revision history
- preserves baselines and impact reviews
- preserves unknown top-level extension fields
- initializes all Batch 4 collections and fields
- records source and destination schemas
- rejects unsupported future schemas

## 5.2 Relationship validation

`src/domain/validation.ts` checks:

- required project shape
- duplicate stable identities
- duplicate visible identifiers where controlled
- revision-snapshot identity
- direct requirement, function, object, interface, verification, failure, evidence, work, dependency, budget, inheritance, baseline, change, readiness, and exception references
- typed-link endpoints
- no dangling controlled references

Malformed or unsupported imported projects are rejected before active-project replacement.

---

# 6. Persistence and exchange layer

## 6.1 IndexedDB and fallback storage

`src/services/db.ts` stores complete project objects transactionally in IndexedDB. Separate stores retain:

- projects
- recovery snapshots

A local browser storage fallback supports recovery when IndexedDB is unavailable. The interface reports the backend used for the latest save.

## 6.2 Serialized saves

The application state layer serializes persistence writes so an older asynchronous save cannot complete after and overwrite a newer revision.

## 6.3 Recovery snapshots

Recovery snapshots protect the whole project independently of controlled-record revisions. Automatic snapshots are created before:

- Fresh Start
- sample replacement
- project import replacement
- recovery restoration
- permanent project deletion

Manual snapshots are also supported. The newest eight snapshots are retained per project.

## 6.4 Project exchange

`src/services/files.ts` produces a versioned JavaScript Object Notation exchange package containing application identity, versions, export time, and the complete project.

Import performs:

- file-size guard
- parse and structural validation
- schema review and migration
- duplicate-identity validation
- relationship validation
- current-project preservation
- recovery snapshot
- replacement commit

Unknown top-level project fields are preserved.

## 6.5 Evidence files

Evidence attachments retain:

- filename
- Multipurpose Internet Mail Extensions type
- size
- local data reference
- Secure Hash Algorithm 256-bit fingerprint
- revision metadata
- currency state
- stale-source references

Replacing evidence creates a new evidence revision rather than silently modifying the former artifact.

## 6.6 Reports

`src/services/reports.ts` constructs semantic reports from domain records rather than screen captures. Current outputs include:

- project status
- requirement dossier
- Requirements Traceability Matrix
- Failure Modes, Effects, and Criticality Analysis
- evidence index
- change impact
- verification cross-reference
- verification exceptions
- verification status
- V-model readiness
- operational validation
- verification-level summaries

---

# 7. Application state layer

`src/hooks/ProjectContext.tsx` owns:

- active project
- project library
- loading state
- autosave state
- last save time
- notifications
- storage diagnostics
- recovery snapshots
- current-session undo and redo

Every meaningful in-application mutation uses `updateProject`. The sequence is:

1. clone current state
2. optionally record undo state
3. apply the specialist mutation
4. reconcile controlled records
5. optionally generate bounded impact review
6. increment project revision and timestamps
7. clear redo after a forward change
8. update React state
9. schedule serialized autosave

Options allow narrowly justified behavior such as suppressing impact generation during new execution creation while retaining ordinary revision reconciliation.

Project replacement saves and snapshots the current project before switching the interface to the replacement. Project switching, import, Fresh Start, sample replacement, and recovery restoration clear session undo/redo to prevent cross-project state application.

---

# 8. Presentation layer

## 8.1 Application shell

`src/App.tsx` contains:

- eight-section navigation
- project selector and project menu
- Easy and Advanced modes
- theme control
- global thread search
- Controlled Record Studio launch
- undo and redo controls
- save state
- inspector coordination
- report shortcuts
- About and data-safety workspaces

## 8.2 Primary views

The stable primary views are:

- `CockpitView.tsx`
- `RequirementsView.tsx`
- `ArchitectureView.tsx`
- `VerificationView.tsx`
- `FailureAnalysisView.tsx`
- `ExecutionView.tsx`
- `EvidenceView.tsx`
- `BaselinesView.tsx`

## 8.3 Verification workbench

`VerificationView.tsx` provides the Batch 4 workflows:

- plan creation and revision
- reusable setup authoring
- parameterized case authoring
- as-run execution creation
- method-specific record editing
- exact revision capture
- reviewer and configuration disposition
- evidence selection
- result history
- exception creation and disposition
- controlled rerun creation
- operational-validation authoring
- readiness evaluation
- readiness-policy revision
- readiness override creation
- semantic report actions

The specialist view uses the same authoritative records shown in Record Studio and other LOOM modules.

## 8.4 Controlled Record Studio

`ControlledRecordStudio.tsx` remains a global lifecycle workspace rather than a replacement for specialist engineering workflows. It provides:

- collection navigation
- search
- active and archived filters
- common and record-specific editing
- typed relationship authoring
- revision comparison
- historical-value restoration
- archive and restore

## 8.5 Impact workspace

`ImpactReviewWorkspace.tsx` provides source comparison, explainable paths, item disposition, inherited-obligation review, currency review, action creation, and change-request creation.

---

# 9. Deployment layer

## 9.1 Conventional development path

The repository includes a conventional React, TypeScript, and Vite path:

```bash
npm install
npm run check
npm run dev
npm run build
```

This path requires registry-installed dependencies and type declarations.

## 9.2 Offline-oriented build

`scripts/build-offline.mjs` builds the production application from the modular source and checked-in React runtime without a runtime content-delivery-network dependency:

```bash
npm run build:offline
```

The generated bundle contains:

- `dist/index.html`
- `dist/assets/vendor.js`
- `dist/assets/app.js`
- `dist/assets/styles.css`
- `dist/manifest.webmanifest`
- `dist/sw.js`
- application icons
- third-party notices
- operator readme

## 9.3 Service worker

`public/sw.js` uses v0.5.0 shell and runtime cache names. It:

- precaches the application shell
- removes older LOOM caches on activation
- claims open clients
- uses network-first navigation with cached fallback
- serves local assets from cache while refreshing when possible
- ignores cross-origin requests

---

# 10. Validation architecture

## 10.1 Deterministic domain suite

`scripts/test-domain.mjs` validates:

- schema and sample counts
- stable identity and references
- migration
- controlled lifecycle
- calculations
- impact and inheritance
- result and evidence currency
- every verification method
- method-specific completeness
- exact revision capture
- exceptions and retest
- retained failed results and reruns
- operational validation
- closure conditions
- readiness factors and policies
- overrides
- lower-level roll-up
- reports
- source transpilation

## 10.2 Browser suites

- `browser-smoke.py` — general interaction, layout, persistence fallback, themes, modes, navigation, and prior workflows
- `browser-batch2.py` — controlled record lifecycle regression
- `browser-batch3.py` — impact and inheritance regression
- `browser-batch4.py` — verification, validation, rerun, exceptions, operational validation, readiness policy, and override acceptance
- `browser-origin.py` — real-origin IndexedDB, service worker, cache, offline, file, download, import, recovery, and transfer behavior when loopback navigation is permitted

`run-browser-suite.py` loads the built production assets into a controlled Chromium document for deterministic interface suites in environments where direct loopback navigation is restricted.

## 10.3 Current validation boundary

The accepted v0.5.0 suites exercise the offline-generated production bundle. The managed browser blocked a fresh real-origin run before application load, and the constrained package environment lacked the complete registry-installed toolchain required for conventional type-check and Vite build acceptance. Those limitations are recorded rather than converted into passes.
