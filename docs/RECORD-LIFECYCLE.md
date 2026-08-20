# LOOM Controlled Record Lifecycle

**Feature introduced:** LOOM v0.3.0  
**Applies to:** LOOM v0.3.0 and later  
**Current application and schema:** v0.5.0

## Purpose

LOOM treats engineering records as controlled, evidence-bearing objects rather than disposable interface rows.

The shared lifecycle service ensures that identity, revisions, audit history, archive state, traceability, undo, persistence, and recovery behave consistently regardless of which application view initiated a change.

## Covered collections

The shared lifecycle applies to 22 authoritative collections:

1. Requirements
2. Functions
3. Implementation objects
4. Interfaces
5. Verification plans
6. Verification setups
7. Test cases
8. Verification executions
9. Verification exceptions
10. Readiness policies
11. Readiness overrides
12. Failure modes
13. Work items
14. Project budget lines
15. Technical budgets
16. Evidence documents
17. Impact reviews
18. Decisions
19. Assumptions
20. Issues and actions
21. Baselines
22. Change requests

Specialist screens, global search, the Cockpit, Requirement Coupons, the Verification workbench, impact review, and Controlled Record Studio are projections and editing paths for these same records. They are not parallel databases.

## Record identity

Each controlled record has two identifiers:

- `id` — stable generated internal identity
- `identifier` — visible engineering label such as `REQ-001`, `RUN-004`, or `GATE-003`

The stable `id` does not change when a record is revised, archived, restored, renamed, rerun, or given a different visible identifier.

Visible names, array positions, table row numbers, and current sort order are not record identity.

## Revision model

A controlled record stores:

```text
revision
history[]
revisionHistory[]
```

`history` is the concise audit trail. `revisionHistory` contains immutable controlled-field snapshots.

A snapshot includes:

```text
id
revision
capturedAt
capturedBy
action
summary
changedFields[]
data
```

### Meaningful changes

Before committing a project mutation, LOOM compares proposed controlled values with the prior record. Volatile fields such as current revision, update time, and selected derived values are excluded from the substantive comparison.

When material fields changed:

1. the record revision increases by one
2. the modified time changes
3. an audit event is appended
4. an immutable field snapshot is appended
5. changed field paths are recorded

When material fields did not change, the existing revision, history, snapshots, and timestamps are retained. Saving an unchanged form does not create a false revision.

### New records

New controlled records begin at revision 1 and receive creation history plus an initial snapshot.

### Specialist edits

Controlled Record Studio is not a separate data store. Changes made in Requirements, Architecture, Verification, Failure Analysis, Execution, Evidence, Baselines, or Record Studio all pass through `reconcileProjectControlledRecords()`.

For example, revising a verification plan in the Verification workbench follows the same revision rules as revising that plan in Record Studio.

## Verification-specific lifecycle behavior

Batch 4 adds controlled lifecycle behavior for:

- reusable verification setups
- parameterized test cases
- method-neutral verification executions
- deviations, anomalies, defects, and observations
- readiness policies
- readiness overrides

### Exact as-run revisions

A verification execution records exact plan, case, and setup revisions. Later revisions of those source records do not rewrite the historical execution.

### Retained failures and reruns

A rerun creates a new execution. It does not turn the earlier failed execution into a pass. The source execution, rerun sequence, exact configuration, exceptions, evidence, reviewer disposition, and currency remain independently inspectable.

### Execution creation and impact generation

Creating an as-run execution necessarily adds references from requirements, plans, cases, setups, and evidence. That creation transaction suppresses automatic impact generation for those bookkeeping links so the new record and its own evidence are not immediately marked potentially stale.

This does not bypass revision control. The new execution still receives controlled identity, history, exact revision references, persistence, and validation. Later substantive edits use normal change-impact behavior.

### Readiness policies and overrides

Readiness policies and overrides are controlled records. Editing a policy creates a new policy revision. An override records its target, level, factor scope, requester, reviewer, rationale, approval state, and expiration without rewriting the readiness factors it affects.

## Revision comparison

Record Studio can compare retained snapshots.

Nested values are presented as field paths, for example:

```text
verificationIntent.method
statuses.verification
metric.threshold
methodDetails.analysisModel
operationalValidation.acceptanceRecommendation
factorRules
```

Arrays and structured objects are compared deterministically as stored controlled values. Revision number and update time are excluded from the substantive comparison.

## Restoring historical values

**Restore values** is not destructive rollback.

LOOM copies selected controlled values from an earlier snapshot into the current record and commits them as a new revision.

The operation preserves:

- stable identity
- creation time
- existing audit history
- every later snapshot
- current archive state
- related records

The recovery action therefore remains visible in the engineering record.

## Archive and restore

Archive state is separate from engineering lifecycle state.

A verification plan may be approved and archived. A readiness policy may be superseded and archived. A requirement may be baselined and later removed from active work. Restoring returns the same controlled record to active work; it does not create a clone.

Archive and restore both create revisions.

If a specialist editing path accidentally omits a controlled record from a proposed collection, reconciliation reinserts it as an archived revision rather than silently destroying it. Project-level permanent deletion remains a separate, recovery-protected operation.

## Undo and redo

Session undo and redo store project states in memory.

Undo does not replace the project with an unaudited old state. It applies earlier controlled values through the same reconciliation service, producing new traceable revisions for affected records. Redo uses the corresponding forward path.

Session history:

- retains up to 50 operations
- ignores no-op mutations
- may coalesce rapid compatible inline edits
- clears on project switch or replacement
- clears on import, Fresh Start, sample replacement, or recovery restoration
- clears on page reload
- is not exported

Use baselines for controlled configuration comparison and use recovery snapshots or external project exports for durable recovery.

## Typed traceability links

Relationships are first-class records containing:

```text
id
type
fromId
toId
rationale
createdAt
createdBy
```

A record cannot link to itself. An equivalent source, target, and relationship type is not duplicated.

For common record combinations, LOOM synchronizes compatible direct identifier arrays so high-frequency specialist views remain efficient. Removing a typed relationship also removes its compatible direct relationship where applicable.

## Change-impact integration

A material controlled-record edit may create an impact review after lifecycle reconciliation.

The impact engine receives the stable before-and-after records, source revisions, changed fields, and current relationships. It does not replace the revision service and does not modify historical snapshots.

The resulting impact review is itself a controlled record with revision history, dispositions, linked actions, and change requests.

## Snapshot size controls

### Evidence documents

The authoritative evidence record may contain an embedded file data reference. Revision snapshots omit repeated binary payloads so a metadata change does not duplicate the complete file in every snapshot.

The current evidence record retains its content, metadata, fingerprint, evidence revision, currency, and staleness trace.

### Baselines

A baseline record contains a project snapshot. The baseline record’s own revision snapshots store compact collection summaries instead of recursively embedding the complete project snapshot again.

### Verification records

Verification execution snapshots retain method details, exact revisions, parameters, configuration, review, exception references, and evidence identifiers. The referenced evidence file payload remains governed by the evidence record’s own size controls.

## Migration

LOOM v0.5.0 accepts project schemas v0.1.0 through v0.5.0.

Migration retains the prior controlled lifecycle and initializes missing Batch 4 structures, including:

- verification setups
- verification exceptions
- readiness policies
- readiness overrides
- method-specific execution details
- operational-validation context
- exact plan, case, and setup revisions
- reviewer and configuration dispositions
- retest and rerun state

Where a named baseline contains an earlier version of a controlled record, migration may seed an additional historical snapshot for that available revision. Migration does not invent intermediate field states that were never retained.

Unknown project-level extension fields are preserved. Unsupported future schemas are rejected.

## Validation rules

Project validation checks include:

- positive current revision
- non-empty audit history
- current revision represented in history
- no audit event newer than the record
- non-empty revision snapshot history
- unique snapshot revision numbers
- current revision snapshot exists
- snapshot identities and timestamps are valid
- changed fields are arrays
- snapshot stable identity matches the record
- visible identifier remains consistent
- archived metadata is present when expected
- all direct and typed relationships resolve
- verification plan, setup, case, execution, exception, policy, and override references resolve
- rerun source references resolve
- evidence and stale-source references resolve

Duplicate stable identities and dangling endpoints are rejected before import replacement.

## Operator guidance

### Before a significant edit

- create a named baseline when the change is configuration-significant
- create a manual recovery snapshot when the operation is risky
- add a meaningful revision note
- identify the exact configuration and verification records that may be affected

### After a change

- review the changed-field list
- compare prior and current revisions
- inspect generated impact paths
- review inherited obligations
- review verification result and evidence currency
- update or rerun verification when closure conditions are no longer satisfied

### Do not use archive as approval

Archive controls active visibility. It does not mean approved, retired, superseded, verified, accepted, or waived. Use the appropriate lifecycle and disposition fields.

### Do not use undo as configuration control

Undo is a current-session convenience. Baselines, revisions, change requests, impact reviews, recovery snapshots, and project exports are the durable engineering controls.

### Do not use an override to hide engineering facts

A readiness override may change the authorized disposition, but failed factors, open exceptions, stale evidence, and missing closure conditions remain visible and traceable.
