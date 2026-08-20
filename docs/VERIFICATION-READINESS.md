# LOOM Verification, Validation, and Readiness Guide

**Applies to:** LOOM v0.5.0 and later  
**Current schema:** v0.5.0

## Purpose

This guide explains how LOOM turns verification intent into controlled evidence and explainable readiness without erasing failed history or replacing engineering judgment.

The working chain is:

```text
REQUIREMENT
→ VERIFICATION INTENT
→ PLAN
→ SETUP
→ CASE
→ AS-RUN EXECUTION
→ RESULT
→ EXCEPTION OR RERUN
→ EVIDENCE
→ CLOSURE
→ VALIDATION
→ READINESS
```

## 1. Verification and validation are different

### Verification

Verification asks:

> Did the implementation satisfy the stated requirement?

LOOM supports:

- test
- analysis
- inspection
- demonstration
- similarity
- certification
- combination
- not yet determined

### Validation

Validation asks:

> Does the implemented system satisfy the stakeholder need in the intended or representative use context?

Operational-level work is treated primarily as validation. Verification and validation have separate states. Passing one does not silently set the other.

## 2. Requirement verification intent

A requirement’s verification intent identifies:

- method
- level
- acceptance criteria
- owner
- planned date
- required configuration
- environment
- equipment
- evidence expectation

Intent is not evidence. It explains how compliance is expected to be established.

## 3. Verification plans

A controlled verification plan records:

- covered requirements
- method and level
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
- documents
- approval state
- optional reusable setup
- child test cases
- inherited environment and acceptance-rule decisions
- required reviewer disposition
- whether conditional acceptance is permitted

A plan must be approved before it can contribute to closure.

## 4. Reusable verification setups

A setup is a reusable controlled definition of the common as-run context. It includes:

- applicable methods
- configuration
- environment
- equipment
- instrumentation
- personnel
- safety considerations
- calibration requirements
- supporting documents

Referencing a setup avoids copying the same setup into every case or execution. Each execution still stores the exact setup revision used.

### Setup revision rule

Editing `SETUP-001` from revision 1 to revision 2 does not change the fact that an earlier execution used revision 1. The execution keeps `setupId` and `setupRevision` as its historical as-run reference.

## 5. Parameterized test cases

A test case turns a plan into a reusable sequence.

It supports:

- shared setup description
- repeatable steps
- expected result for each step
- text, number, and Boolean parameters
- units
- default values
- required parameters
- expected evidence
- inherited acceptance rule

### Parameter behavior

Creating an execution from a case copies the current parameter defaults into the draft as-run record. The operator records the actual value used. Later case edits do not rewrite completed execution parameters.

## 6. Verification methods and method-specific records

### Test

Use the common as-run configuration, case, parameters, input/output data, evidence, result, reviewer disposition, and exceptions.

### Analysis

Record:

- analysis model
- analysis tool
- assumptions
- calculation summary

### Inspection

Record:

- inspected item
- inspection method
- sample inspected

### Demonstration

Record:

- demonstration scenario
- participants

### Similarity

Record:

- similarity reference
- basis of similarity
- differences between reference and subject

### Certification

Record:

- certification authority
- certificate reference
- certification scope
- expiration, when applicable

### Combination

Identify the contributing methods and complete the applicable method-specific fields. A combination label without the contributing methods is incomplete.

### Not yet determined

This is a valid planning state, not a closure method. The requirement remains visibly incomplete until a method is selected and executed.

## 7. As-run executions

An execution records what actually occurred, not what was intended to occur.

### Identity and revision

Each execution retains:

- stable identifier
- visible identifier such as `RUN-007`
- controlled record revision
- exact plan revision
- exact case revision
- exact setup revision
- execution number
- rerun sequence
- source execution when cloned as a rerun

### Configuration

Record:

- system configuration
- hardware revision
- software version
- firmware version
- environment
- equipment
- calibration reference
- configuration-conformance state

Configuration-conformance states are:

- not assessed
- conforming
- deviation approved
- nonconforming

### Personnel and review

Record:

- operator
- reviewer
- reviewer disposition
- review date
- disposition notes

Reviewer dispositions are:

- pending review
- accepted
- rejected
- conditionally accepted
- waived

### Data and observations

Record:

- input data
- output data
- observations
- deviations from plan
- parameter values
- evidence artifacts

### Result

Result states are:

- not run
- running
- passed
- failed
- blocked
- inconclusive
- conditionally accepted
- waived
- superseded

Result and reviewer disposition are independent. A result can be technically passed while still awaiting review.

## 8. Result currency

A result has both a historical outcome and a current-applicability state.

Currency states are:

- current
- potentially stale
- reviewed current
- stale
- superseded

A passing historical result can become potentially stale after a material requirement, plan, interface, configuration, object, or assumption change. That does not delete or rewrite the pass. It requires an applicability review.

Potentially stale results do not satisfy closure as if they were unquestionably current.

## 9. Exceptions

Verification exceptions are controlled records for:

- deviations
- anomalies
- defects
- observations

Each retains:

- originating execution
- affected requirements
- kind
- severity
- description
- owner
- status
- disposition
- evidence
- due date
- whether retest is required
- corrective rerun, when applicable

### Exception status

Current statuses include:

- open
- accepted
- corrected
- closed
- rejected
- deferred

A disposition is required before moving an exception out of Open. An observation may be accepted without retest. A defect or deviation may require corrective action and a controlled rerun.

## 10. Retest and rerun control

Retest states are:

- not required
- required
- scheduled
- completed
- waived

### Clone as rerun

Cloning creates a new execution. It does not revise the failed result into a pass.

The draft rerun inherits appropriate starting values:

- plan
- case
- setup
- parameters
- operator
- configuration
- versions
- environment
- equipment
- calibration
- retest reason

The operator then records the actual rerun. The source execution remains historical evidence.

### Corrective-exception linkage

When a required rerun passes, applicable source exceptions can be updated to:

- reference the rerun
- record corrected status
- retain the original exception description and history

## 11. Operational validation

Operational validation records:

- stakeholder need
- operational scenario
- representative user
- mission or use objective
- suitability observations
- acceptance recommendation

Acceptance recommendations are:

- not assessed
- accept
- conditional
- reject
- additional evaluation

An operational execution still uses the common as-run fields and closure rules. Operational context adds validation evidence; it does not replace configuration, review, exception, or evidence requirements.

## 12. Verification closure

Closure is derived from stored facts.

The current fourteen base conditions are:

| Condition | Purpose |
|---|---|
| Approved verification plan | Establishes approved intent |
| Completed verification execution | Confirms an as-run activity exists |
| Acceptable result | Requires a qualifying technical outcome |
| Result remains current | Rejects potentially stale, stale, or superseded evidence |
| Method-specific record complete | Requires the fields appropriate to the selected method |
| Acceptance criteria defined | Prevents undefined compliance claims |
| Acceptance criteria satisfied | Requires explicit as-run confirmation |
| As-run configuration recorded | Identifies the evaluated configuration |
| Configuration conformity accepted | Ensures the configuration was conforming or deliberately approved |
| Exact plan, case, and setup revisions recorded | Preserves the executed basis |
| Reviewer disposition accepted | Requires reviewer decision |
| Deviations, anomalies, and defects resolved | Prevents unresolved exceptions from disappearing |
| Required retest complete or waived | Enforces corrective verification |
| Evidence attached and current | Requires current supporting evidence |

For an operational-level execution, two additional conditions become blocking:

- operational context complete
- operational acceptance recommendation is accept or conditional

The interface therefore displays sixteen possible conditions and marks the applicable blocking set for the selected execution.

### Closure selection rule

Where multiple executions exist, LOOM evaluates the applicable current execution history rather than erasing earlier runs. Failed and stale runs remain visible. The latest passing run does not erase an earlier failure, and a historical pass does not close a changed requirement when its currency is unresolved.

## 13. Readiness policies

Readiness is broader than requirement verification. A policy evaluates whether work is ready to proceed or a level is ready for integration, acceptance, or operation.

Policies exist for:

- unit
- integration
- subsystem
- system
- operational

Each policy retains:

- verification level
- minimum weighted score
- whether all required factors must pass
- factor enablement
- required state
- factor weight
- approval state
- controlled revision history

## 14. Readiness factors

The current factors are:

| Factor | Engineering question |
|---|---|
| Requirement allocation coverage | Are functions and objects assigned? |
| Inherited obligations resolved | Have parent obligations been dispositioned? |
| Implementation complete | Are implementing objects complete? |
| Lower-level verification complete | Are prerequisite lower levels complete? |
| Required interfaces verified | Have applicable interfaces been verified? |
| High-criticality failures addressed | Are high and critical mitigations closed or controlled? |
| Verification plan approved | Is the verification intent approved? |
| Required configuration identified | Is the applicable configuration known and conforming? |
| Verification closure complete | Do the fourteen closure conditions pass? |
| Deviations and anomalies resolved | Are exceptions and retest obligations controlled? |
| Evidence complete and current | Is supporting evidence present and applicable? |
| Blocking work resolved | Are linked blockers cleared? |
| Schedule readiness | Is required work on time? |
| Budget availability | Is financial and technical margin available? |
| Change impacts dispositioned | Are applicable impact-review items closed? |
| Operational validation accepted | Has representative-use validation been accepted? |

## 15. Readiness calculation

For enabled factors:

```text
score = sum(weight for met factors) / sum(weight for enabled factors) × 100
```

A policy can require all factors marked **required** to pass in addition to meeting the numerical threshold.

The output includes:

- score
- textual state
- policy identifier and revision
- factor-by-factor result
- supporting record identifiers
- required-state marker
- overridden-state marker
- next actions

### Readiness states

Current states include:

- not ready
- conditionally ready
- ready
- overridden

Color is not the only state signal.

## 16. Lower-level roll-up

Higher-level readiness must consider applicable lower-level evidence. A failed child result, unresolved inherited obligation, unverified interface, unresolved high-criticality failure, stale evidence, or blocked work can prevent parent readiness.

The roll-up is explainable. Opening the gate displays which records contributed to each result.

## 17. Controlled readiness exceptions

LOOM supports:

- waiver
- conditional approval
- manual override

Every exception retains:

- target requirement or record
- level
- kind
- factor keys
- affected records
- rationale
- requester
- reviewer
- approval state
- effective date
- optional expiration
- revision and audit history

### Approval behavior

An approved exception changes the readiness disposition but does not change the underlying factor facts to passing. The factor remains visible and is marked overridden.

### Expiration

Where an expiration is recorded, the approval is not intended to remain effective after that date. Expiration handling should be reviewed before relying on an old exception.

## 18. Change impact integration

Material changes may create impact reviews and currency candidates. The impact engine can identify affected:

- plans
- executions
- exceptions
- evidence
- readiness conclusions

Recording a new execution adds required traceability references. That bookkeeping transaction suppresses impact generation so the new result does not mark itself stale. This suppression does not apply to substantive source changes.

## 19. Operator workflows

### Plan and run a verification activity

1. Open **Verification → Plans**.
2. Confirm the covered requirement, method, level, acceptance criteria, and approval.
3. Create or select a reusable setup.
4. Create a parameterized case when repeatable steps are needed.
5. Select **Record execution** or **Use case**.
6. Record the exact as-run configuration and versions.
7. Record parameters, data, observations, deviations, result, evidence, and reviewer disposition.
8. Open **Results** and inspect every closure condition.
9. Resolve missing evidence, review, exceptions, or retest.

### Handle a failed result

1. Leave the failed result intact.
2. Create structured deviations, anomalies, defects, or observations.
3. Record disposition and corrective action.
4. Mark retest required where appropriate.
5. Use **Clone as rerun**.
6. Record the corrected as-run activity.
7. Confirm the source failure remains visible.
8. Confirm the exception references the corrective rerun.
9. Recheck closure and readiness.

### Conduct operational validation

1. Use an operational-level plan.
2. Record the stakeholder need and representative scenario.
3. Record the representative user and mission objective.
4. Record suitability observations.
5. Select an acceptance recommendation.
6. Attach evidence.
7. Complete reviewer disposition.
8. Review both verification and validation state.

### Review readiness

1. Open **Verification → Readiness**.
2. Select a requirement and level.
3. Read the policy, score, and text state.
4. Inspect each required and weighted factor.
5. Follow the displayed next actions.
6. Open the supporting controlled records where needed.
7. Request a controlled exception only when justified.
8. Record rationale, affected factors, reviewer, and scope.
9. Confirm an approval remains visible and does not hide failed facts.

## 20. Developer rules

- Do not store a separate result copy in each view.
- Do not overwrite failed executions after a pass.
- Do not infer exact plan, case, or setup revisions from current records after the fact.
- Do not close a requirement from a manually selected status alone.
- Do not treat operational validation as synonymous with laboratory verification.
- Do not mark new evidence stale merely because traceability links were added during its creation.
- Do not hide overridden readiness factors.
- Do not treat a fingerprint, waiver, or tool-generated report as automatic certification.
- Keep closure and readiness calculations reproducible from stored records.
- Preserve unknown imported fields and stable identities during migration.

## 21. Current boundaries

The v0.5.0 implementation does not provide:

- arbitrary organization-authored formula languages
- cryptographic signatures
- multi-user approval authority
- enterprise qualification workflow
- automated certification
- resource-loaded schedule readiness
- Monte Carlo readiness forecasting
- cloud synchronization

LOOM provides controlled evidence and explainable calculations. The responsible engineering organization retains authority for acceptance, safety, compliance, and certification decisions.
