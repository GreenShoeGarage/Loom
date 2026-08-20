# LOOM v0.5.0 Implementation Coverage

This document distinguishes working LOOM v0.5.0 capability from partial foundations, later roadmap work, and deliberate non-goals. Interface presence, sample records, or architectural preparation must not be mistaken for complete implementation.

## Release composition

LOOM v0.5.0 combines five coherent increments:

1. **v0.1.0 — Digital engineering thread:** requirements, architecture, verification intent, failure analysis, execution, evidence, budgets, baselines, and reports.
2. **v0.2.0 — Deployment acceptance and data safety:** transaction-safe local storage, recovery snapshots, safer import and export, storage diagnostics, and offline application behavior.
3. **v0.3.0 — Controlled record lifecycle:** stable identity, field-level revisions, archive and restore, typed relationships, Record Studio, and session undo and redo.
4. **v0.4.0 — Change impact and inheritance control:** bounded explainable propagation, inherited-obligation review, result and evidence currency, and impact dispositions.
5. **v0.5.0 — Verification, validation, and readiness closure:** method-specific verification, reusable setups, parameterized cases, exact as-run configuration, structured exceptions, controlled reruns, operational validation, readiness policies, and local controlled overrides.

## Batch 4 implemented and validated

### Verification methods

LOOM supports verification intent and as-run records for:

- test
- analysis
- inspection
- demonstration
- similarity
- certification
- combination
- not yet determined

Method-specific execution records capture the information appropriate to the selected method. Test is not treated as the only valid means of verification.

### Verification workbench

The Verification area contains eight task-oriented tabs:

1. Plans
2. Setups
3. Test cases
4. Executions
5. Results
6. Exceptions
7. Operational validation
8. Readiness

These views operate on shared controlled records rather than independent copies.

### Reusable verification setups

Verification setups are first-class controlled records supporting:

- applicable verification methods
- required configuration
- environment
- equipment
- instrumentation
- personnel
- safety considerations
- calibration requirements
- supporting documents
- revision history
- archive and restore

Plans and test cases may reference a setup rather than copy its contents. Executions retain the exact setup revision used.

### Parameterized test cases

Test cases support:

- reusable steps and expected results
- shared setup text
- parameter definitions
- text, numeric, and Boolean parameter types
- units
- required parameters
- default values
- execution-specific parameter values
- expected evidence
- inherited acceptance-rule state
- exact test-case revision capture

### As-run verification executions

Every execution retains:

- exact verification-plan revision
- exact test-case revision when applicable
- exact setup revision when applicable
- method and verification level
- execution number and rerun sequence
- date and time
- operator and reviewer
- exact system configuration
- hardware revision
- software version
- firmware version
- environment
- equipment
- calibration reference
- inputs and outputs
- observations and deviations
- parameter values
- method-specific details
- operational-validation context when applicable
- acceptance-criteria disposition
- configuration conformance
- reviewer disposition and notes
- linked exceptions
- retest state and rationale
- result state
- evidence
- result currency and staleness trace

### Result history and controlled reruns

LOOM preserves failed and superseded executions. A later passing rerun creates a new controlled execution and does not erase or rewrite the earlier failure.

Rerun behavior includes:

- source execution reference
- incremented execution and rerun sequence
- copied plan, case, setup, configuration, and parameter context
- independent as-run observations, result, reviewer disposition, and evidence
- retained exception and retest history
- updated requirement verification state derived from current records

Creating a new execution does not incorrectly mark that same new execution or its newly linked evidence stale merely because traceability references were added during creation.

### Structured verification exceptions

Deviations, anomalies, defects, and observations are controlled records with:

- source execution
- severity
- description
- affected requirements
- owner and due date
- status
- disposition
- retest requirement
- supporting evidence
- revision history
- archive and restore

An unresolved exception can prevent closure. A retest obligation remains visible until completed or explicitly waived.

### Operational validation

Operational-level executions capture:

- stakeholder need
- operational scenario
- representative user
- mission or use objective
- environment and exact configuration
- suitability observations
- acceptance recommendation
- supporting evidence

Acceptance recommendations include accept, conditional, reject, additional evaluation, and not assessed. Operational validation is evaluated separately from lower-level technical verification while still participating in the same evidence and readiness model.

### Verification closure

Closure is derived from stored facts rather than a manually selected label. The current service evaluates up to sixteen visible conditions, with fourteen always-blocking conditions and two additional blocking operational conditions when the execution is operational:

- approved verification plan
- completed execution
- acceptable result
- current result
- complete method-specific record
- defined acceptance criteria
- acceptance criteria recorded as satisfied
- as-run configuration recorded
- configuration conformity accepted
- exact plan, case, and setup revisions recorded
- accepted reviewer disposition
- deviations, anomalies, and defects resolved
- required retest completed or waived
- current evidence attached
- complete operational context when applicable
- acceptable operational recommendation when applicable

Every unmet condition is displayed with its reason and supporting record references.

### Readiness policies and roll-up

LOOM provides controlled readiness policies at:

- unit
- integration
- subsystem
- system
- operational

The default policy framework evaluates sixteen factors:

- allocation coverage
- inherited obligations
- implementation completion
- lower-level verification
- interface verification
- high-criticality failure treatment
- approved verification plan
- defined configuration
- verification closure
- resolved deviations and retests
- current evidence
- resolved blocking work
- schedule readiness
- budget availability
- dispositioned impact reviews
- operational validation

Each factor is explainable and includes:

- met or unmet state
- required or weighted state
- weight
- human-readable reason
- related record identifiers

A readiness policy controls the minimum score and whether every required factor must pass. Policies are controlled, revisioned, and level-specific. LOOM does not expose an unrestricted scripting language for readiness formulas.

### Lower-level readiness behavior

Readiness builds upward from traceable facts. A failed or unclosed lower-level result can prevent a parent requirement from becoming ready at a higher level. A later result can restore readiness only after the applicable closure, currency, evidence, exception, and review conditions are satisfied.

### Controlled readiness exceptions

Local single-user readiness overrides support:

- waiver
- conditional approval
- manual override
- target requirement and level
- affected readiness factors
- requester
- reviewer
- rationale
- approval state
- optional expiration
- affected records
- visible override state
- revision history

Only an approved, unexpired override affects readiness. Overrides do not rewrite the underlying engineering facts and do not erase failed factors.

### Verification reporting

Batch 4 adds semantic outputs for:

- verification cross-reference
- verification exceptions
- verification status
- V-model readiness
- operational validation

These supplement the existing requirement dossier, project status, Requirements Traceability Matrix, Failure Modes, Effects, and Criticality Analysis, evidence index, change-impact report, and level-specific verification exports.

### Schema and migration

LOOM v0.5.0 accepts and migrates:

- schema v0.1.0
- schema v0.2.0
- schema v0.3.0
- schema v0.4.0
- native schema v0.5.0

Migration initializes:

- verification setups
- structured verification exceptions
- readiness policies
- readiness overrides
- method-specific execution details
- operational-validation context
- exact revision references
- configuration conformance
- reviewer disposition
- retest and rerun fields
- current closure and readiness defaults

Migration preserves stable project and record identities, relationships, histories, revisions, baselines, evidence, impact reviews, and unknown top-level extension fields. Unsupported future schemas and dangling relationships remain rejected before project replacement.

### Batch 4 validation

The delivered release passed:

- 250 of 250 deterministic domain, migration, lifecycle, impact, verification, readiness, report, and source-transpile checks
- 67 of 67 general Chromium interaction and layout checks
- 37 of 37 controlled-record lifecycle regression checks
- 76 of 76 change-impact and inheritance regression checks
- 91 of 91 dedicated Batch 4 verification and readiness checks
- 521 of 521 accepted automated checks in total
- zero browser page exceptions
- zero browser console errors

## Controlled record coverage

Controlled Record Studio governs 22 authoritative collections:

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

Every collection participates in stable identity, controlled revisions, archive and restore, search, Record Studio editing, persistence, import and export, and shared project reconciliation.

## Earlier capabilities retained

### Local-first project foundation

- named local projects
- recent-project selector
- truly empty Fresh Start
- realistic sample project
- project duplication
- project archive and restore
- permanent project deletion protected by recovery snapshots
- visible version and autosave state
- light and dark themes
- Easy and Advanced modes
- collapsible navigation and optional inspector
- global controlled-record search
- no required account, cloud service, telemetry, analytics, or trackers

### Data safety and recovery

- Indexed Database Application Programming Interface (IndexedDB) project store
- separate recovery-snapshot store
- serialized writes
- debounced autosave
- local browser storage fallback
- storage diagnostics
- persistent-storage request
- automatic snapshots before project replacement or deletion
- manual snapshots
- newest-eight retention by project
- schema-safe import
- duplicate-identity and dangling-reference checks
- unknown-field preservation
- versioned full-project JavaScript Object Notation exchange
- versioned service-worker caches and offline shell

### Requirements and architecture

- nine-step guided requirement intake
- threshold, target, tolerance, bounds, conditions, and acceptance criteria
- Technical Performance Measure tracking and margin
- requirement-quality prompts
- parent and child decomposition
- separate requirement status dimensions
- persistent Requirement Coupons
- requirement dossier
- function hierarchy
- implementation hierarchy across hardware, software, firmware, human/process, facility, and external-system domains
- interfaces
- many-to-many allocation
- explicit inherited obligations
- V-model presentation

### Failure analysis

- linked Failure Modes, Effects, and Criticality Analysis records
- cause and local, next-level, and end effects
- severity, likelihood, detectability, and criticality
- controls and detection
- mitigation and residual concern
- evidence and review
- linked mitigation actions

### Change impact and inheritance

- bounded deterministic impact traversal
- readable relationship paths
- old and new source revisions
- impact-review queue
- inherited-obligation review
- result and evidence currency
- assumption invalidation
- follow-up actions and change requests
- impact-review persistence, revisions, and reports

### Execution and budgets

- shared Kanban and Gantt work items
- drag-and-drop status changes
- dependencies, slack, critical path, and cycle detection
- financial project budget
- separate technical engineering budgets
- actions register

### Evidence, reports, baselines, and change control

- local file attachments, links, and notes
- Secure Hash Algorithm 256-bit fingerprints
- evidence revisions
- current, potentially stale, stale, reviewed-current, and superseded currency
- evidence gaps
- semantic Markdown and structured reports
- named baselines
- baseline comparison
- controlled change requests

## Partially implemented

### Readiness governance

Readiness policies are controlled, level-specific, weighted, and explainable. The release does not provide an arbitrary organization-authored expression language, executable scripts, or role-directory-backed approval authority.

### Approvals

Reviewer, approval, waiver, and override records are suitable for a local single-user engineering record. They are not cryptographic signatures, identity-provider-backed approvals, or multi-user authorization controls.

### Impact propagation

Impact propagation is bounded, directional, and conservative. It does not implement arbitrary organization-defined propagation languages, probabilistic impact scoring, or automatic rewriting of downstream controlled records.

### Gantt scheduling

Dependencies, critical path, slack, dates, and synchronized work records are present. Complete working calendars, all lead and lag nuances, resource loading, and resource leveling remain later work.

### Technical budgets

Sum, minimum, maximum, percentage, and general roll-up behavior are present. A safe weighted model is partially supported. Unrestricted arbitrary custom formulas, uncertainty simulation, and Monte Carlo forecasting are not complete.

### Evidence package

Attachments are preserved in full-project JSON exchange. A separate compressed package with an attachment directory, external manifest, and independent integrity-verification workflow is not yet implemented.

### Reports

The highest-value semantic reports are available, including the new verification and readiness reports. Not every report in the full specification has an individually designed PDF layout.

### Traceability authoring

Trees, allocation views, typed links, traceability tables, impact paths, and Record Studio relationship authoring are present. Editable large matrices, multi-cell bulk linking, and a full interactive relationship-graph editor remain later work.

### Specialist editors

All principal records can be managed through Record Studio, and specialist mutations pass through shared reconciliation. Some specialist views intentionally expose only the fields needed for their focused workflow.

### Undo and redo

Current-session undo and redo are working and traceable. The stack is intentionally not persisted across restarts and does not provide branching history.

### Browser and build coverage

The complete v0.5.0 bundle passed synthetic-document Chromium interaction suites. A fresh loopback-origin run was blocked before application load by managed-browser policy. Firefox and WebKit were unavailable. The conventional registry-dependent TypeScript/Vite build could not complete in the constrained environment because required packages and type declarations were unavailable.

## Designed for later implementation

- editable traceability matrices and bulk relationship authoring
- richer interactive relationship visualization
- configurable hierarchy editors and arbitrary controlled custom fields
- saved matrix and board configurations beyond current local state
- complete work calendars and resource-loaded scheduling
- resource leveling
- Monte Carlo schedule and budget forecasting
- portable compressed evidence packages
- Microsoft Excel Workbook import and export with column mapping, preview, duplicate policy, rollback, and detailed errors
- Requirements Interchange Format exchange
- external document-management and source-control connectors
- persistent or branching undo history
- optional cloud collaboration and concurrent editing
- cryptographic approvals and multi-user authority

## Deliberate non-goals

LOOM v0.5.0 does not present itself as:

- an enterprise Product Lifecycle Management replacement
- an enterprise Application Lifecycle Management replacement
- a computer-aided design or simulation system
- a source-code repository
- an automatic certification authority
- an automatic compliance or safety determination system
- a substitute for engineering judgment
- a substitute for independent safety review
- a substitute for approved organizational processes
