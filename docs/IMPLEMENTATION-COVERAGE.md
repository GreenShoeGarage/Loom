# LOOM v0.3.0 Implementation Coverage

This document distinguishes working v0.3.0 capability from partial foundations and future development. Interface presence, sample data, or architectural preparation must not be mistaken for completion of every item in the full product specification.

## Release scope

LOOM v0.3.0 contains:

- the coherent requirement-to-evidence digital engineering thread introduced in v0.1.0
- the deployment, storage, recovery, migration, and offline safeguards introduced in v0.2.0
- the common controlled-record lifecycle introduced in v0.3.0

## Batch 2 implemented and validated

### Controlled Record Studio

- global workspace available from the top bar and project menu
- Command/Ctrl+Shift+R shortcut
- 17 controlled record collections
- three-pane record type, library, and editor layout
- active and archived counts
- per-collection search
- archived-record filter
- contextual details, relationships, and revisions tabs
- direct opening from global search
- direct opening from Requirement dossiers

### Common record creation and editing

- shared registry and descriptor model
- safe default records for every controlled collection
- generated stable identity
- next available human-readable identifier
- duplicate visible-identifier rejection
- ownership, lifecycle state, tags, notes, and revision notes
- record-specific field editing
- direct-reference editing
- immediate authoritative-list update

### Revision history

- field-level revision snapshots
- actor, action, date, revision note, and changed-field retention
- previous/current snapshot comparison
- immutable earlier snapshots
- no-op revision prevention
- material changes increment exactly once
- revision restoration as a new current revision
- baseline-assisted initialization of available older revisions
- source-transpile and corrupted-snapshot validation

### Archive and restore

- archive without deletion
- stable identity preservation
- relationship and history preservation
- archive actor and timestamp
- original archive metadata retained during archived-record edits
- archive state independent of engineering lifecycle state
- restore of the same record
- restoration of old field values without changing archive state
- omission converted to archived revision instead of destructive deletion

### Typed relationships

- relationship type selection
- target-record selection across active controlled collections
- rationale retention
- duplicate-link prevention
- relationship navigation
- confirmation before removal
- synchronization of compatible direct-reference arrays
- controlled revisions after relationship-driven field changes

### Session undo and redo

- 50-entry in-memory mutation history
- no-op exclusion
- limited coalescing for rapid inline edits
- top-bar action labels
- Command/Ctrl+Z undo
- Command/Ctrl+Shift+Z and Command/Ctrl+Y redo
- controlled reconciliation during undo and redo
- new revision rather than erased audit history
- history reset on project replacement, switching, import, or recovery restoration

### Batch 2 migration

- schema v0.1.0 to v0.3.0
- schema v0.2.0 to v0.3.0
- schema v0.3.0 loading
- field-level revision-history initialization
- stable identity preservation
- migration-history recording
- unknown top-level field preservation
- unsupported future-schema rejection

### Batch 2 validation

- 148 of 148 domain checks passed
- 67 of 67 general Chromium interaction and layout checks passed
- 37 of 37 dedicated lifecycle checks passed
- zero browser page exceptions
- zero browser console errors

## Batch 1 foundations retained

### Transaction and save safety

- IndexedDB database version 2
- separate project and recovery-snapshot stores
- serialized save queue
- debounced autosave
- fallback local browser storage
- explicit save backend and state feedback
- project replacement committed before interface switch

### Recovery

- automatic snapshots before Fresh Start
- automatic snapshots before sample replacement
- automatic snapshots before import replacement
- automatic snapshots before snapshot restoration
- automatic snapshots before permanent deletion
- manual snapshot creation
- snapshot restoration and removal
- newest-eight retention by project

### Storage diagnostics

- current origin
- authoritative backend
- secure-context status
- persistent-storage status and request
- service-worker state
- storage usage and quota
- recovery list and metadata

### Import and export safety

- versioned full-project JSON exchange manifest
- file-size guard
- structural validation
- schema validation and migration
- duplicate stable-identity detection
- dangling relationship detection
- unknown-field preservation
- active-project preservation before replacement
- recovery snapshot before replacement

### Offline application

- local runtime bundle
- no runtime content-delivery-network dependency
- versioned shell and runtime caches
- old-cache removal
- network-first navigation with offline fallback
- cached local assets with refresh
- install manifest and icons

## Core engineering capability implemented and working

### Project foundation

- named local projects and recent-project selector
- Fresh Start with no sample engineering records
- realistic end-to-end sample project
- duplicate, archive, restore, and permanent delete
- JavaScript Object Notation import/export
- schema validation and migration
- light and dark themes
- true Easy and Advanced navigation differences
- collapsible navigation and optional inspector
- global controlled-record search
- visible versioning and autosave state

### Requirements and Technical Performance Measures

- nine-step guided requirement intake
- threshold, target, tolerance, bounds, comparison direction, conditions, and acceptance criteria
- threshold margin calculation
- Technical Performance Measure trend visualization
- non-blocking requirement-quality prompts
- parent/child decomposition
- separate status dimensions
- Requirement Coupons across requirement and execution views
- complete dossier inspector
- list, hierarchy, coupon, performance, and traceability tabs
- filtering, selection, and selected bulk state changes
- Record Studio editing and revisions

### Architecture, allocation, and inheritance

- separate function and implementation hierarchies
- hardware, software, firmware, human/process, facility, and external-system domains
- many-to-many requirement/function/object relationships
- first-class interfaces
- explicit inherited obligations with seven disposition states
- V-model presentation
- allocation and orphan-coverage indicators
- Record Studio functions, objects, interfaces, and relationships

### Verification and build-back-up

- eight verification-intent methods
- reusable test cases
- as-run execution records
- retained result history
- unit, integration, subsystem, system, and operational levels
- derived verification state
- explicit seven-condition closure
- explainable readiness factors
- verification-level CSV summaries
- Record Studio plans, cases, and executions

### Failure analysis

- linked FMECA records
- cause and local/next-level/end effects
- severity, likelihood, detectability, and criticality category
- controls, detection, mitigation, residual ratings, owner, date, and evidence
- mitigation status updates
- linked mitigation work actions
- FMECA CSV export
- Record Studio failure-mode lifecycle

### Execution and budgets

- shared Kanban and Gantt work items
- drag-and-drop state changes
- work owners, dates, priority, blockers, percent complete, and links
- dependency records, cycle detection, slack, and critical path
- financial project budget
- separate technical engineering budgets
- technical allocation, estimate, measured actual, reserve, threshold, target, uncertainty, confidence, margin, and utilization
- actions register
- Record Studio work, budget, decision, assumption, and issue/action records

### Evidence, reports, baselines, and changes

- attached local files, links, and evidence notes
- file metadata and SHA-256 fingerprint
- revision-preserving evidence replacement
- stale/current control
- evidence gaps
- Markdown and printable project status report
- Markdown requirement dossier
- Requirements Traceability Matrix CSV
- FMECA CSV
- evidence-index CSV
- verification-level CSV summaries
- named baseline snapshots
- baseline comparison of records and fields
- change-request register and direct-impact presentation
- Record Studio evidence, baseline, and change records

## Partially implemented

### Impact analysis

Direct relationships and baseline impacts are shown. A complete recursive impact engine with user-configurable propagation policies is not implemented.

### Inheritance review

Inherited obligations and affected-parent-change state are modeled. Automatic creation and disposition of a complete impact-review queue for every parent edit is not complete.

### Readiness governance

Requirement and object readiness are calculated and explained. Arbitrary organization-defined gates, formulas, waiver authorities, and approval roles are not configurable.

### Gantt scheduling

Dependencies, critical path, slack, dates, and synchronized records are present. Full working calendars, resource leveling, and all lead/lag scheduling behavior are not complete.

### Technical budgets

Sum, minimum, maximum, percentage, and general roll-up behavior are present. Weighted and arbitrary safe custom-formula execution is not complete.

### Evidence package

Attachments are embedded in full-project JSON. A separate compressed package with an external attachment directory and integrity manifest is not implemented.

### Reports

Key reports are working. Not every report in the specification has a dedicated formatted PDF layout.

### Approvals

Approval fields and states exist. Cryptographic signatures, role-based authority, and multi-user workflow are outside this local single-user release.

### Undo and redo

Current-session undo and redo are working. The mutation stack is intentionally not persisted across browser restarts and does not yet offer selective history branching.

### Specialist editors

All principal records can be managed through Record Studio, and existing specialist mutations are reconciled into revision history. Some specialist views still provide only the editing paths required by their focused workflow rather than exposing every field.

### Browser coverage

Chromium synthetic-document interaction is validated. The current managed environment blocked a fresh v0.3.0 real-origin run, and Firefox and WebKit were unavailable.

## Designed for later implementation

- recursive impact propagation and review queues
- organization-defined hierarchy editors
- arbitrary controlled custom fields
- persistent saved board and matrix configurations beyond current local view state
- persistent or branching undo history
- interactive relationship graph layout
- editable traceability matrices and bulk link authoring
- configurable readiness gates and scoring policies
- parameterized test expansion and reusable inherited test setup
- full work calendars and resource-loaded scheduling
- Monte Carlo uncertainty and forecasting
- weighted and safe custom technical-budget formulas
- portable compressed evidence packages
- Microsoft Excel Workbook import/export with column mapping, preview, duplicate policy, rollback, and detailed errors
- Requirements Interchange Format (ReqIF)
- cloud collaboration and concurrent editing
- external document-management and source-control connectors
- cryptographic approvals and multi-user authority

## Deliberate non-goals

LOOM v0.3.0 does not present itself as:

- an enterprise Product Lifecycle Management replacement
- an enterprise Application Lifecycle Management replacement
- a computer-aided design or simulation system
- a source-code repository
- a certification authority
- an automatic compliance or safety determination system
- a substitute for engineering judgment, independent safety review, or approved organizational processes
