# LOOM v0.3.0 Batch 2 Acceptance

**Batch:** Controlled Record Lifecycle  
**Acceptance date:** August 19, 2026  
**Application version:** 0.3.0  
**Project schema:** 0.3.0

## Objective

Batch 2 establishes one consistent lifecycle for controlled engineering records while preserving LOOM’s existing eight-area digital engineering thread.

The release must make record creation, revision, comparison, linking, archive, restore, undo, redo, persistence, and recovery behave as one coherent system rather than as unrelated view-specific features.

## Acceptance scope

The accepted Batch 2 scope is:

1. A reusable controlled-record registry covering the principal project collections.
2. Stable identity and human-readable identifier rules.
3. Field-level revision snapshots and comparison.
4. Revision notes and audit history.
5. Archive and restore without destructive deletion.
6. Restoration of earlier field values as a new revision.
7. Typed relationship authoring and removal.
8. Shared reconciliation for specialist-view mutations.
9. Safe current-session undo and redo.
10. Global Record Studio access and direct record opening.
11. Migration from schema v0.1.0 and v0.2.0 to v0.3.0.
12. Automated domain and browser acceptance evidence.

## Implemented record collections

Record Studio governs 17 controlled collections:

- requirements
- functions
- implementation objects
- interfaces
- verification plans
- test cases
- test executions
- failure modes
- work items
- project budget lines
- technical budgets
- evidence documents
- decisions
- assumptions
- issues and actions
- baselines
- change requests

These collections continue to appear in their specialist views. Record Studio is another projection and editing path for the same authoritative objects.

## Stable identity and revisions

Each controlled record retains:

- stable generated identity
- visible identifier
- title or name
- owner
- lifecycle state
- created and updated dates
- current revision
- event history
- field-level revision history
- notes and tags
- archive state

A material change produces exactly one new controlled revision. An unchanged proposed record retains its existing revision, timestamps, history, and snapshots.

Each revision snapshot includes:

- revision
- actor
- action
- capture date and time
- revision summary
- changed root fields
- structured record data suitable for field comparison

Earlier snapshots remain available after later edits, archive and restore, undo and redo, and revision recovery.

## Archive and restore behavior

Archive is deliberately independent of engineering lifecycle status.

Accepted behavior:

- archive does not delete the record
- stable identity remains unchanged
- history and relationships remain available
- the original archive actor and timestamp remain stable during later archived-record edits
- restoring old field values does not accidentally reactivate an archived record
- restore clears archive metadata and returns the same record to active work
- pre-archive engineering lifecycle state is retained
- omission from a controlled collection is converted to an archived revision rather than silent deletion

## Revision recovery

A user may select an earlier field snapshot and restore its controlled values.

LOOM must:

- retain every later snapshot
- create a new current revision
- record the recovery action
- preserve the current archive state
- avoid changing the stable record identity
- update specialist projections immediately

## Typed relationships

Record Studio can create explainable typed links to any other active controlled record.

Accepted behavior includes:

- source and target identity validation
- duplicate-link prevention
- relationship type and rationale retention
- link removal with confirmation
- synchronized high-frequency direct-reference arrays where a compatible relationship mapping exists
- controlled revisions for records whose direct relationships change
- immediate navigation to linked records

## Session undo and redo

The application maintains up to 50 project-mutation entries in the current browser session.

Accepted behavior includes:

- no-op mutations are not recorded
- rapid ordinary inline edits may be coalesced
- undo and redo are disabled when no action is available
- top-bar controls expose the action summary
- Command/Ctrl+Z performs undo outside text editors
- Command/Ctrl+Shift+Z and Command/Ctrl+Y perform redo
- controlled values are restored through the same reconciler
- undo and redo create new controlled revisions instead of erasing history
- replacement, switching, import, and recovery restoration clear the session stack

Session undo is not persistent across application restarts and is not represented as a substitute for recovery snapshots or baselines.

## User interface acceptance

The Controlled Record Studio must:

- open from the top bar and project menu
- open with Command/Ctrl+Shift+R
- present 17 record types
- use a non-overlapping three-pane desktop layout
- display active and archived counts
- provide search and archive filtering
- display a clear unsaved state
- use contextual details, relationships, and revisions tabs
- keep footer actions inside the modal
- expose archive state with text rather than color alone
- open newly created records from global search
- open authoritative requirements from the Requirement dossier

## Migration acceptance

LOOM v0.3.0 accepts schema versions 0.1.0, 0.2.0, and 0.3.0.

Migration must:

- preserve stable identities
- preserve controlled relationships
- initialize missing field-level revision history
- reconstruct available historical revisions from existing baselines when possible
- record source and destination schemas
- preserve unknown top-level project extensions
- reject unsupported future schemas
- reject invalid revision snapshot identity

## Validation evidence

| Suite | Result |
|---|---:|
| Domain, lifecycle, migration, relationship, calculation, and source-transpile suite | **148 of 148 passed** |
| General Chromium interaction and layout suite | **67 of 67 passed** |
| Dedicated controlled-record lifecycle suite | **37 of 37 passed** |
| Browser page exceptions | **0** |
| Browser console errors | **0** |

Machine-readable evidence:

- `domain-test-results.json`
- `browser-smoke-results.json`
- `record-lifecycle-results.json`

Representative screenshots:

- `docs/screenshots/validation-record-studio-revisions.png`
- `docs/screenshots/validation-record-studio-lifecycle.png`
- `docs/screenshots/batch2-record-studio-initial.png`
- `docs/screenshots/batch2-record-revisions.png`

## Real-origin deployment limitation

A v0.3.0 real-origin acceptance rerun was attempted at a loopback HTTP origin. The managed Chromium environment returned `ERR_BLOCKED_BY_ADMINISTRATOR` before the application could be exercised.

`origin-acceptance-results.json` records that limitation and does not claim a successful v0.3.0 origin pass.

The historical v0.2.0 Batch 1 acceptance record remains included because it documents a successful 48-check real-origin Chromium pass for the underlying IndexedDB, service-worker, offline, recovery, file, and cross-profile foundations. Those code paths remain present, but final deployment acceptance should be rerun on the actual hosting origin or in an unrestricted browser environment.

## Deferred from Batch 2

Batch 2 does not claim completion of:

- persistent cross-session undo history
- cryptographic signatures or multi-user approval authority
- arbitrary organization-defined lifecycle models
- recursive change-impact propagation
- automatic inherited-obligation review queues
- interactive graph layout
- editable traceability matrices
- complete spreadsheet import
- cloud collaboration

These remain later roadmap items.

## Acceptance decision

**Batch 2 is accepted for LOOM v0.3.0.**

The delivered application provides a coherent controlled-record lifecycle across all principal project collections, retains stable identity and revision evidence, prevents silent destructive deletion, exposes typed relationships, and supports traceable session undo and redo.

Deployment-origin acceptance remains a separate environment-specific gate and is explicitly not claimed by this decision.
