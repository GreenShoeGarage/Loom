# LOOM Impact and Inheritance Guide

**Feature introduced:** LOOM v0.4.0  
**Applies to:** LOOM v0.4.0 and later  
**Current application and schema:** v0.5.0

## Purpose

LOOM’s impact system answers a specific engineering question:

> A controlled record changed. Which other records may require review, why do they appear, and what disposition closes the review without silently changing approved work?

The engine identifies candidates for human review. It does not declare every reached record invalid, automatically rewrite downstream records, or approve the resulting change.

## 1. Impact-review lifecycle

A significant mutation enters the shared project update path:

```text
PROPOSE CHANGE
→ DETECT MATERIAL SOURCE FIELDS
→ BUILD RELATIONSHIP GRAPH
→ TRAVERSE DIRECTIONALLY
→ CREATE IMPACT REVIEW
→ MARK CURRENCY CANDIDATES
→ MARK INHERITED OBLIGATIONS
→ RECONCILE CONTROLLED REVISIONS
→ AUTOSAVE
```

The impact review is a controlled record. Its creation, editing, archive state, revision history, project exchange, and baseline membership use the same lifecycle rules as other authoritative records.

## 2. Source changes

Impact automation currently considers significant fields on:

- requirements
- functions
- implementation objects
- interfaces
- verification plans
- verification setups
- test cases
- failure modes
- work items
- financial project-budget lines
- technical budgets
- assumptions when invalidated

The significant-field policy is defined in `src/domain/impact.ts`.

Examples of significant requirement changes include:

- statement
- parent and child relationships
- applicable level, mode, or environment
- assumptions and constraints
- threshold, target, conditions, or other metric content
- verification intent
- function, object, interface, failure, verification, result, and evidence relationships

Ordinary administrative changes such as tags, notes, timestamps, and archive metadata do not create engineering impact noise.

## 3. Duplicate prevention

Every generated review has a generation key derived from:

- source record identity
- target source revision
- sorted materially changed fields

The same source revision and changed-field set cannot create duplicate impact reviews.

A later material source revision creates a new review rather than mutating the earlier review into a different event.

## 4. Relationship graph

The graph is assembled from authoritative project records each time impact automation runs.

### Direct references

The graph includes frequently traversed direct identifiers such as:

- requirement to function
- requirement to object
- requirement to interface
- requirement to verification plan
- requirement to test execution
- requirement to evidence
- function to object
- interface to endpoints and verification
- test execution to plan, case, setup, source rerun, requirements, exceptions, and evidence
- verification exception to source execution, required retest execution, requirements, and evidence
- readiness override to target requirement and affected records
- work item to requirements, functions, objects, tests, failures, evidence, and budgets
- project and technical budgets to allocated records

### Typed traceability links

First-class typed links are also included. Supported semantics include:

- derives from
- decomposes into
- refines
- constrains
- depends on
- conflicts with
- allocated to
- performed by
- realized by
- interfaces with
- verified by
- validated by
- supported by
- mitigated by
- scheduled by
- funded by
- changed by
- supersedes
- blocks
- impacts

### Additional relationship sources

The graph also includes:

- parent and child hierarchies
- inherited obligations
- failure-analysis origins
- evidence links and supersession
- schedule dependencies
- decisions, assumptions, issues, and actions
- baseline membership
- change-request affected records

## 5. Directional traversal policy

An undirected relationship graph can quickly identify nearly every project record as affected. LOOM avoids that behavior by applying engineering directionality.

### Engineering layers

Controlled collections are assigned conceptual layers:

1. requirements and assumptions
2. functions
3. implementation objects
4. interfaces and failure analysis
5. verification intent, work, actions, and budgets
6. results and evidence
7. baselines and change control

### Upstream context

A changed lower-layer record may identify one immediately connected upstream record as useful context. Traversal does not continue upward from that context into unrelated siblings.

For example, changing an implementation object may identify its allocated requirement, but the engine does not then traverse from that requirement to every other object allocated to it.

### Hierarchy behavior

Hierarchy propagation continues only within the changed source’s domain.

- A changed requirement may reach child requirements.
- A changed function may reach child functions.
- A changed implementation object may reach child implementation objects.

Reaching an allocated function from a requirement does not cause the engine to traverse the function’s complete hierarchy.

### Terminal records

Results, evidence, work, actions, financial budgets, technical budgets, baselines, and change requests are review endpoints. They are included as affected records but do not become new unbounded roots.

### Bounds

The current engine uses:

```text
Maximum path depth: 2 relationship steps
Maximum affected items per review: 160
```

Archived records are excluded. Each affected record appears once using the first accepted path.

## 6. Explainable paths

Every affected item retains an ordered path. Each step includes:

- source record identity
- target record identity
- relationship label
- human-readable path label
- relationship source, such as direct reference, typed link, hierarchy, inheritance, verification, evidence, schedule, budget, baseline, or assumption

Example:

```text
REQ-001
→ VER-001: verification plan
→ RUN-001: as-run verification plan
```

The interface displays this path under **Why this record appears**.

## 7. Impact categories and severity

Affected records are categorized as:

- requirement
- function
- implementation
- interface
- failure analysis
- verification plan
- test result
- evidence
- schedule
- project budget
- technical budget
- baseline
- change control
- inheritance
- other

The default severity is:

- **Critical** for inherited obligations requiring explicit review
- **Watch** for result/evidence currency candidates and affected requirements
- **Information** for other traceable review candidates

Severity supports prioritization; it is not an automatic risk or safety conclusion.

## 8. Inherited-obligation review

When a requirement changes, each object directly inheriting that requirement receives a pending review.

The obligation retains:

- prior disposition
- prior source revision
- target source revision
- review-required date
- review reason
- prior and current local parameters
- complete review history

### Dispositions

- **Accepted as written** — the new parent obligation applies without local changes.
- **Accepted with local parameters** — the obligation applies using recorded local thresholds, setup, environment, or other parameters.
- **Tailored** — local interpretation differs and requires rationale.
- **Decomposed** — the obligation is handled through derived lower-level requirements.
- **Satisfied at parent** — no separate lower-level implementation obligation is required.
- **Not applicable** — the obligation does not apply and requires rationale.
- **Superseded** — another controlled obligation replaces it and requires rationale.
- **Pending review** — no engineering disposition has been completed.

Resolving the obligation resolves the linked impact item. It does not rewrite the child object or any approved child requirement.

## 9. Result and evidence currency

A changed source can make previous test results or verification-relevant evidence questionable without proving them invalid.

LOOM therefore begins with **potentially stale**.

### Currency states

- **Current** — no identified unresolved applicability concern.
- **Potentially stale** — a source change may affect applicability.
- **Reviewed current** — an engineer confirmed continued applicability.
- **Stale** — the record no longer supports the current configuration or requirement revision.
- **Superseded** — a later controlled record replaces it.

### Disposition rules

Confirmed-current, stale, and superseded decisions require rationale. The original result, file, revision, fingerprint, and audit history remain retained.

A record may have more than one stale-source identity. Confirming it current for one source removes only that source. It remains potentially stale while another unresolved source remains.

## 10. Review dispositions

Each impact item supports:

- **Pending review**
- **Confirmed**
- **Dismissed** — rationale required
- **Deferred** — rationale required
- **Resolved** — rationale required
- **Action created**
- **Change request linked**

A review remains open while every item is pending. It becomes in review after any item receives a non-pending disposition. It becomes resolved only when every item is dismissed or resolved.

Linking items to a change request moves the remaining pending items under controlled change management but does not falsely mark the engineering work complete.

## 11. Actions

**Create action** produces a controlled action containing:

- a generated action identifier
- source impact-review identity
- source and affected records
- impact reason
- severity-derived priority
- owner
- due date where available
- blocking relationship for critical items

The impact item retains the action identity and changes to **Action created**.

## 12. Change requests

**Create or open change request** reuses an existing request already linked to the impact review or creates one containing:

- source review and change summary
- every affected record
- preliminary engineering impact
- schedule impact
- budget impact
- risk impact
- verification impact
- draft disposition and implementation state

The request is a starting point for controlled review, not an automatic approval.

## 13. Specialist-view integration

### Cockpit

Shows open impact reviews, pending items, potentially stale results, potentially stale evidence, and unresolved inherited obligations.

### Architecture

Shows parent-change warnings, old and target source revisions, previous obligation state, local parameters, rationale, and review history.

### Verification

Shows result currency and stale rationale in execution and results views.

### Evidence

Shows currency state, stale-source information, and manual currency controls. Replacing evidence creates a new revision and supersedes the earlier artifact.

### Baselines

Provides the primary impact-review queue and change-request register. Baseline snapshots include impact reviews.

### Requirements

Requirement Coupons and dossiers show impact and currency consequences through the same authoritative records.

## 14. Operator workflow

1. Make a material controlled change in a specialist view or Controlled Record Studio.
2. Save the change.
3. Open **Baselines → Impact review**.
4. Select the generated impact review.
5. Confirm the source revisions and changed values.
6. Inspect each affected record’s relationship path.
7. Disposition inherited obligations.
8. Review result and evidence currency.
9. Confirm, dismiss, defer, or resolve other items.
10. Create actions for work that must be performed.
11. Create or open a change request when formal change control is required.
12. Export a change-impact report when needed.
13. Reverify and update evidence through the appropriate specialist areas.
14. Resolve the review only when the engineering dispositions support closure.

## 15. Developer rules

- Invoke impact automation only through the central project mutation path.
- Use `generateImpact: false` for mutations that merely disposition an existing impact review; otherwise the review could generate impact about itself.
- Use `generateImpact: false` for creation of a new as-run verification execution because that transaction adds its own requirement, plan, case, setup, exception, and evidence links. Suppressing impact for that bookkeeping transaction prevents the new execution and its newly linked evidence from becoming stale because of their own creation. Later substantive edits must use normal impact generation.
- Add significant fields deliberately. Do not treat every stored field as an engineering trigger.
- Add new relationship sources to the graph with a clear direction and source classification.
- Keep terminal collections terminal unless there is a demonstrated engineering need to traverse through them.
- Preserve stable record identity and revision history.
- Never silently rewrite downstream controlled records.
- Preserve unknown imported project extensions.
- Add deterministic domain tests for every new propagation rule.
- Add browser acceptance for every new review interaction.

## 16. Current boundaries

LOOM v0.5.0 does not provide:

- organization-authored propagation languages
- arbitrary impact scripts
- probabilistic impact confidence
- unlimited recursion
- automatic downstream text propagation
- automatic approval
- automatic compliance or certification conclusions
- multi-user review authority
- cryptographic signatures

The current design deliberately favors a small, explainable engineering review engine.
