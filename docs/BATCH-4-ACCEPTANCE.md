# LOOM v0.5.0 Batch 4 Acceptance

**Batch:** Verification, Validation, and Readiness Closure  
**Acceptance date:** August 20, 2026  
**Application version:** v0.5.0  
**Project schema:** v0.5.0

## Objective

Batch 4 completes LOOM’s first coherent build-back-up workflow:

```text
VERIFICATION INTENT
→ CONTROLLED PLAN
→ REUSABLE SETUP
→ PARAMETERIZED CASE
→ EXACT AS-RUN ACTIVITY
→ RETAINED RESULT
→ EXCEPTION OR RERUN
→ EVIDENCE
→ CLOSURE
→ OPERATIONAL VALIDATION
→ READINESS
```

The release must treat verification as broader than testing, preserve exact execution context and historical failures, keep validation distinct from verification, explain every closure and readiness result, and allow controlled exceptions without erasing underlying facts.

## Source requirements addressed

The accepted implementation addresses the specification’s requirements to:

- support test, analysis, inspection, demonstration, similarity, certification, combination, and undetermined verification intent
- reference parent plans and reusable setup rather than blindly copying them
- capture unit, integration, subsystem, system, and operational activity
- retain exact as-run plan, case, setup, configuration, equipment, environment, result, reviewer, deviation, and evidence data
- retain a failed result after a later passing rerun
- require applicable closure conditions rather than allowing a manually changed status to close a requirement
- display explainable readiness at every integration level
- derive parent readiness from traceable lower-level facts
- permit waivers or overrides only through visible controlled records with rationale, owner, reviewer, date, approval, and affected records

## Accepted scope

Batch 4 is accepted for the following scope:

1. Eight-method verification intent and method-specific as-run records.
2. Reusable controlled verification setups.
3. Parameterized repeatable test cases.
4. Exact verification-plan, test-case, and setup revision capture.
5. As-run configuration, version, environment, equipment, calibration, data, observation, and evidence capture.
6. Separate result, reviewer disposition, configuration conformance, and currency states.
7. Controlled reruns that preserve failed history.
8. Structured deviations, anomalies, defects, and observations.
9. Retest obligations and corrective-rerun linkage.
10. Operational validation context and acceptance recommendation.
11. Fourteen-condition verification closure with explicit supporting detail.
12. Controlled readiness policies for unit, integration, subsystem, system, and operational levels.
13. Sixteen explainable readiness factors with weights and required-state control.
14. Controlled waivers, conditional approvals, and manual overrides.
15. Semantic verification, cross-reference, exception, readiness, and operational reports.
16. Schema migration from v0.1.0 through v0.4.0 to v0.5.0.
17. Specialist-view, Controlled Record Studio, Cockpit, Evidence, and impact-engine integration.
18. Automated domain and browser acceptance evidence.

## Verification-method acceptance

The implementation supports:

| Method | Accepted as-run support |
|---|---|
| Test | setup, case, parameters, data, result, reviewer, evidence, exceptions, rerun |
| Analysis | model, tool, assumptions, calculation summary |
| Inspection | inspected item, method, sample |
| Demonstration | scenario and participants |
| Similarity | reference, basis, and differences |
| Certification | authority, certificate, scope, and optional expiration |
| Combination | contributing methods and applicable method-specific detail |
| Not yet determined | controlled intent that remains visibly incomplete |

Method-specific completeness contributes to closure. An empty method-specific record does not silently count as complete.

## Reusable setup acceptance

A verification setup is a controlled record retaining:

- applicable methods
- exact configuration
- environment
- equipment
- instrumentation
- personnel
- safety considerations
- calibration requirements
- supporting documents
- owner, lifecycle, revision, and history

Plans and cases reference the setup. Every execution stores the exact setup revision used. Editing the setup later does not rewrite an earlier as-run execution.

## Parameterized case acceptance

A test case retains:

- linked verification plan
- optional reusable setup
- shared setup description
- repeatable instructions and expected results
- typed parameter definitions
- units and default values
- required parameters
- as-run parameter values
- expected evidence
- inherited acceptance-rule state
- controlled revision history

The browser suite created `TC-004`, retained a required numeric `Sample interval` parameter, and confirmed persistence into a second browser document.

## Exact as-run acceptance

Every execution can retain:

- verification plan and exact revision
- case and exact revision
- setup and exact revision
- method and level
- execution number and rerun sequence
- date, operator, reviewer, and reviewed date
- system configuration
- hardware, software, and firmware versions
- environment, equipment, and calibration reference
- parameter values
- input and output data
- observations and deviations
- method-specific details
- operational-validation context
- result
- acceptance-criteria state
- configuration conformance
- reviewer disposition and notes
- exception identifiers
- retest state and reason
- evidence identifiers
- currency state and stale-source identity

## Failure retention and rerun acceptance

The accepted behavior is:

- an earlier failed execution remains failed
- a rerun receives a new stable identity
- a rerun references the source execution
- the source result is never overwritten
- the source retest state may be updated
- the rerun records its own exact plan, case, and setup revisions
- the rerun records its own result, reviewer disposition, configuration conformance, criteria, evidence, and currency
- required exceptions may point to the corrective rerun
- a successful rerun can correct the retest obligation without deleting the original failure

The Batch 4 browser suite created `RUN-007` as a rerun of `RUN-004`, confirmed `RUN-004` remained failed, and confirmed the corrective exception linked to `RUN-007`.

## Impact-engine integration acceptance

Creating a verification execution necessarily adds bookkeeping references to requirements and typed traceability links. Those references do not represent a material engineering change to the requirement itself.

The accepted mutation therefore suppresses automatic impact-review generation during the single transaction that records the as-run result. This prevents the newly created result and its evidence from being marked potentially stale merely because they were just linked to the requirement they verify.

Material changes to requirements, verification plans, configurations, interfaces, objects, assumptions, or other controlled sources continue to use the Batch 3 impact engine and may mark earlier results or evidence as potentially stale.

## Exception acceptance

Verification exceptions support:

- deviation
- anomaly
- defect
- observation

Every exception retains execution, requirements, severity, description, status, disposition, owner, evidence, due date, retest state, and corrective execution when applicable.

The browser suite created `EXC-004` as an accepted observation, confirmed its disposition, confirmed that it did not force retest, and confirmed the originating operational execution referenced it.

## Operational-validation acceptance

Operational validation retains:

- stakeholder need
- operational scenario
- representative user
- mission or use objective
- suitability observations
- acceptance recommendation

The sample operational execution retains representative outdoor use, ten users, an accepted recommendation, evidence, and separate verification and validation states.

## Verification-closure acceptance

Closure evaluates fourteen explicit conditions:

1. approved verification plan
2. completed verification execution
3. acceptable result
4. current or reviewed-current result currency
5. complete method-specific record
6. defined acceptance criteria
7. explicit acceptance-criteria satisfaction
8. recorded as-run configuration
9. accepted configuration conformance
10. exact plan, case, and setup revisions
11. accepted reviewer disposition
12. resolved exceptions
13. completed or waived retest
14. attached current evidence

Operational-level executions add two applicable blocking checks: complete operational context and an accept or conditional operational recommendation. The interface can therefore display sixteen possible conditions while preserving the fourteen-condition base closure model.

The user interface displays every condition, whether it is met, and the supporting detail. The derived state cannot be closed merely by selecting a label.

## Readiness-policy acceptance

The sample project includes controlled policies for:

- unit
- integration
- subsystem
- system
- operational

Each policy retains minimum score, required-factor rule, enabled factors, required factors, weights, approval state, owner, revision, and history.

The readiness workbench evaluates sixteen potential factors:

- requirement allocation coverage
- inherited obligations resolved
- implementation complete
- lower-level verification complete
- required interfaces verified
- high-criticality failures addressed
- verification plan approved
- required configuration identified
- verification closure complete
- deviations and anomalies resolved
- evidence complete and current
- blocking work resolved
- schedule readiness
- budget availability
- change impacts dispositioned
- operational validation accepted

The workbench displays score, text state, evaluated policy, factor detail, record links, and next actions. Required-factor failure can block readiness even when the weighted score exceeds the minimum.

## Controlled-exception acceptance

Readiness exceptions support:

- waiver
- conditional approval
- manual override

The accepted record retains target, level, kind, rationale, requester, reviewer, approval state, effective date, optional expiration, affected records, affected factor keys, revision history, and audit history.

An approved exception remains visibly associated with the readiness result. Underlying factor evidence remains visible and is marked overridden rather than deleted or changed to passing.

The browser suite approved the existing `OVR-001`, created and approved `OVR-002`, and confirmed that `OVR-002` visibly overrode the selected factor while preserving every factor row.

## Reports accepted

The Evidence work area now exposes:

- Verification and Validation Status Report
- Verification Cross-Reference
- Verification Exception Register
- V-Model Readiness Report
- Operational Validation Summary

The browser suite downloaded the status report as Markdown and confirmed method, level, reviewer, validation, currency, and closure information.

## Schema and migration acceptance

LOOM v0.5.0 accepts project schemas:

- v0.1.0
- v0.2.0
- v0.3.0
- v0.4.0
- v0.5.0

Migration initializes missing Batch 4 collections and fields, including:

- verification setups
- verification exceptions
- readiness policies
- readiness overrides
- exact execution revisions
- parameter definitions and values
- method-specific records
- operational-validation context
- reviewer disposition
- configuration conformance
- retest state
- closure and readiness defaults

Migration preserves stable identities, prior revisions, relationships, history, evidence, baselines, impact reviews, and unknown top-level extension fields. Unsupported future schemas and dangling references remain rejected before replacement.

## Validation evidence

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

## External validation boundaries

### Real-origin acceptance

The production server and browser harness started at:

```text
http://127.0.0.1:4195
```

Managed Chromium blocked navigation with:

```text
ERR_BLOCKED_BY_ADMINISTRATOR
```

The origin suite recorded two setup checks as passing and the navigation gate as failed. No v0.5.0 application-origin acceptance is claimed from that run. Repeat `npm run test:origin` in an unrestricted browser environment or on the final hosting origin.

### Conventional TypeScript and Vite path

`npm run check` and `npm run build` were attempted. The environment lacked registry-installed React type declarations, Vite, and the Vite React plug-in. TypeScript consequently reported missing JavaScript Syntax Extension (JSX) intrinsic definitions and missing Vite modules.

The conventional path is not claimed as passing. The checked-in offline builder successfully transpiled the complete modular source, generated the production bundle, passed JavaScript syntax validation, and supplied the artifacts exercised by the accepted domain and browser suites.

## Deferred from Batch 4

Batch 4 does not claim completion of:

- arbitrary organization-authored readiness formula languages
- cryptographic approval signatures
- multi-user approval authority
- persistent cross-session approval workflow
- enterprise qualification or certification workflow
- complete traceability matrix editing
- compressed external evidence packages
- full spreadsheet exchange
- resource-loaded scheduling
- Monte Carlo forecasting
- cloud collaboration

## Acceptance decision

**Batch 4 is accepted for LOOM v0.5.0.**

The release provides method-specific verification, reusable setup, parameterized cases, exact as-run revision capture, retained failures, controlled reruns, structured exceptions, operational validation, explainable closure, controlled readiness policies, and visible readiness exceptions. All accepted executable suites pass with no browser page exceptions or console errors.

Deployment-origin acceptance and the conventional registry-dependent build remain explicit external gates and are not represented as completed.
