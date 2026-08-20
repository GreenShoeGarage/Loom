# LOOM Controlled Record Lifecycle

**Applies to:** LOOM v0.3.0  
**Schema:** v0.3.0

## Purpose

LOOM treats engineering records as controlled evidence-bearing objects rather than disposable interface rows.

The lifecycle service ensures that record identity, revisions, audit history, archive state, and traceability behave consistently regardless of which application view initiated the change.

## Covered collections

The shared lifecycle applies to 17 collections:

- Requirements
- Functions
- Implementation objects
- Interfaces
- Verification plans
- Test cases
- Test executions
- Failure modes
- Work items
- Project budget lines
- Technical budgets
- Evidence documents
- Decisions
- Assumptions
- Issues and actions
- Baselines
- Change requests

## Record identity

Each controlled record has two identifiers:

- `id` — stable generated database identity
- `identifier` — visible engineering label such as `REQ-001`

The stable `id` does not change when a record is revised, archived, restored, renamed, or given a different visible identifier.

Visible names, array positions, and table row numbers are not database identity.

## Revision model

A controlled record stores:

```text
revision
history[]
revisionHistory[]
```

`history` is the concise audit trail. `revisionHistory` contains immutable controlled field snapshots.

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

Before committing a project mutation, LOOM compares the proposed controlled values with the prior record. Volatile fields such as current revision and update time are excluded from the comparison.

When substantive fields changed:

1. the record revision increases by one
2. the modified time changes
3. an audit entry is added
4. a snapshot is added
5. changed root fields are recorded

When substantive fields did not change, the existing revision, history, and timestamps are retained.

### New records

New records begin at revision 1 and receive creation history and an initial snapshot.

### Existing view edits

Record Studio is not a separate data store. Edits made in existing LOOM modules and edits made in Record Studio both pass through `reconcileProjectControlledRecords()`.

This prevents a requirement edited in the Requirements view from following different revision rules than the same requirement edited in Record Studio.

## Revision comparison

Record Studio can compare any two retained snapshots.

Nested values are presented as field paths. For example:

```text
verificationIntent.method
statuses.verification
metric.threshold
```

Arrays are compared as controlled values. Revision number and update timestamp are omitted from the substantive comparison.

## Restoring values

**Restore values** is not destructive rollback.

LOOM copies controlled field values from the selected historical snapshot into the current record and commits them as a new revision.

It preserves:

- stable identity
- creation time
- existing audit history
- every later snapshot
- current archive state

This makes the recovery action visible rather than rewriting history.

## Archive and restore

Archive state is separate from lifecycle state.

A requirement may be lifecycle state `approved` and also be archived from active work. Restoring it returns the same record to active work; it does not create a clone.

Archive and restore both create revisions.

If a controlled record disappears from a proposed collection, the reconciliation service reinserts it as archived. This protects traceability from accidental destructive deletion through a view that removes an array entry.

## Undo and redo

Session undo and redo store project snapshots in memory.

An undo operation does not replace the project with an old audit state. It applies the earlier controlled values through the same reconciliation service, which creates new `Undo:` revisions for affected records.

Redo works the same way.

Session history:

- stores up to 50 operations
- coalesces rapid compatible inline edits within a short interval
- clears on project switch or replacement
- clears on page reload
- is not exported

Use baselines for controlled configuration comparison and recovery snapshots or project export for durable recovery.

## Typed traceability links

Relationships are first-class records with:

```text
id
type
fromId
toId
rationale
createdAt
createdBy
```

A record cannot link to itself. An identical `fromId`, `toId`, and relationship type is not duplicated.

For common record combinations, LOOM also synchronizes direct identifier arrays so existing high-frequency views remain efficient and consistent.

Removing the typed link removes the corresponding compatible direct relationship.

## Snapshot size controls

### Evidence documents

The authoritative evidence record may contain an embedded file data URL. Revision snapshots omit that binary payload so an ordinary metadata change does not duplicate the complete file.

The evidence record still retains the current embedded content, metadata, fingerprint, and evidence revision behavior.

### Baselines

A baseline record contains a project snapshot. The baseline record’s own controlled revision snapshots use a compact summary of collection counts rather than recursively embedding the complete project snapshot again.

## Migration

The v0.3.0 migration initializes revision history for older projects.

Where a named baseline contains an earlier version of a controlled record, LOOM can seed an additional historical snapshot for that revision. Migration does not invent unavailable intermediate field states.

Unknown project-level extension fields are retained.

## Validation rules

Project validation checks:

- positive current record revision
- non-empty audit history
- current revision represented in audit history
- no audit entry newer than the record
- non-empty revision snapshot history
- unique snapshot revision numbers
- current revision snapshot exists
- snapshot identifiers and timestamps are valid
- changed fields are arrays
- snapshot stable identity matches the record
- visible identifier remains consistent
- archived metadata is present when expected

Relationship validation continues to reject dangling endpoints and duplicate stable identities.

## Operator guidance

### Before a significant edit

- create a named baseline when the change is configuration-significant
- create a manual recovery snapshot when the operation is risky
- add a meaningful revision note

### After a change

- review the changed-field list
- compare the prior and current revisions
- inspect affected relationships
- update evidence or verification records that may now be stale

### Do not use archive as approval

Archive only controls active visibility. It does not mean approved, retired, superseded, verified, or accepted. Use the appropriate lifecycle fields and change records for those meanings.

### Do not use undo as configuration control

Undo is a convenience for the current session. Baselines, revision history, change requests, and project export are the durable engineering controls.
