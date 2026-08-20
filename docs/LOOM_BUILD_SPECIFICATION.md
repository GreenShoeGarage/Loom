This should not be designed as a conventional project manager with requirements bolted onto it. The center of the application should be a **digital engineering thread** connecting each requirement to its rationale, verification method, failure analysis, functions, implementation objects, tests, evidence, schedule, and budget.

I recommend five deliberate refinements to the original concept:

1. Ask **“How will this requirement be verified?”** rather than only “How will it be tested?” Verification may use test, analysis, inspection, or demonstration.
2. Do not blindly copy parent requirements and test plans into every child. Treat them as **inherited obligations** that must be accepted, tailored, decomposed, superseded, or declared not applicable with rationale.
3. Do not force software into a hardware-only system → subsystem → assembly → subassembly → component hierarchy. Make decomposition levels configurable while providing those as the default physical hierarchy.
4. Make the “requirement coupon” a persistent view of the authoritative requirement record. Dragging the coupon must never create duplicate or disconnected requirement data.
5. Separate the financial project budget from technical engineering budgets such as mass, power, energy, bandwidth, memory, thermal dissipation, and latency.

The following prompt incorporates those corrections.

---

# FIELD INSTRUMENT BUILD PROMPT: LOOM

## LOOM — Systems Engineering Project Control

Build a complete browser-based Field Instrument called **LOOM**.

LOOM is a local-first systems-engineering project control environment that connects:

**REQUIREMENTS → VERIFICATION INTENT → FAILURE ANALYSIS → FUNCTIONS → ALLOCATION → DECOMPOSITION → IMPLEMENTATION → UNIT VERIFICATION → INTEGRATION → SYSTEM VERIFICATION → OPERATIONAL VALIDATION → EVIDENCE → ACCEPTANCE → BASELINE**

The guiding principle is:

> **Trace requirements down. Build evidence back up.**

LOOM is not merely a requirements database, test manager, Failure Modes, Effects, and Criticality Analysis (FMECA) spreadsheet, Gantt chart, Kanban board, budget worksheet, or document folder.

It combines these capabilities through one coherent, typed traceability model.

Every major project record must be connected to the engineering question it helps answer:

- What must the system do?
- How well must it do it?
- Why is the requirement necessary?
- How will compliance be verified?
- How could the requirement, function, or implementation fail?
- Which function satisfies the requirement?
- Which hardware, software, firmware, human, process, or external-system object performs the function?
- How has the system been decomposed?
- Which obligations flow to lower levels?
- What has been implemented?
- What has been tested at each level?
- What evidence supports the result?
- What remains incomplete, blocked, late, over budget, or at risk?
- What changed from the approved baseline?

LOOM should feel like a systems engineer’s project room, verification control center, architecture notebook, and evidence cabinet—not a generic corporate task tracker.

---

# 1. GREEN SHOE APPLICATION PRINCIPLES

Follow the Green Shoe Application Standard throughout the design and implementation.

## 1.1 Build the smallest coherent instrument

Do not create a disconnected collection of enterprise features.

Build the smallest coherent system that completely supports the intended workflow:

**DEFINE → TRACE DOWN → BUILD → VERIFY UP → ACCEPT → BASELINE**

Every feature must strengthen this workflow.

## 1.2 Local-first and private

LOOM must be local-first.

Required principles:

- Process project data locally.
- Store project data locally by default.
- Do not require an account.
- Do not require a server.
- Do not include telemetry, analytics, advertising, trackers, or silent data transmission.
- Do not send requirement, test, failure, budget, schedule, or document data anywhere without an explicit user action.
- Clearly show where data is stored and when it is exported.
- Operate offline after installation or first successful load.
- Bundle runtime dependencies rather than relying on external content delivery networks.
- Design the architecture so an optional collaboration service could be added later without making cloud storage mandatory.

## 1.3 Multi-file application

Single-file delivery is not required.

Build LOOM as a maintainable, modular, multi-file application. Separate the domain model, calculations, persistence, user interface components, reports, import/export adapters, and tests.

Prefer long-term maintainability and testability over artificial single-file compression.

## 1.4 Visible versioning

Display the current version prominently in the application header, About panel, exported project manifest, and generated reports.

Begin with:

**LOOM v0.1.0**

Increment the version for every delivered user-facing build.

## 1.5 Complete interaction loops

Every control must implement the complete loop:

**ENTRY → ACTION → STATE CHANGE → FEEDBACK → PERSISTENCE → RECOVERY**

No decorative buttons, dead controls, placeholder exports, or state changes that disappear after reload.

## 1.6 Terminology

Spell out every abbreviation or acronym in full the first time it appears, followed by the abbreviation in parentheses.

Apply this rule throughout:

- titles
- menus
- forms
- tables
- charts
- reports
- tooltips
- sample data
- help text
- exported documents

---

# 2. CORE DOMAIN MODEL

LOOM must use a normalized project model with stable identifiers and typed relationships.

Do not store separate copies of the same requirement in the requirements list, Kanban board, test center, hierarchy, and Gantt chart. Those views must project the same authoritative record.

Core entities should include:

- Project
- Project revision
- Baseline
- Change request
- Requirement
- Requirement revision
- Inherited obligation
- Technical Performance Measure
- Function
- Architecture object
- Interface
- Verification plan
- Test plan
- Test case
- Test execution
- Test result
- Analysis result
- Inspection result
- Demonstration result
- Operational validation result
- Failure mode
- Failure cause
- Failure effect
- Mitigation
- Risk or issue
- Work item
- Milestone
- Schedule dependency
- Project budget
- Technical budget
- Budget line
- Supporting document
- Evidence artifact
- Decision
- Assumption
- Action
- Review
- Approval
- Comment
- Typed traceability link

Every entity must retain:

- stable identifier
- title or name
- current revision
- owner
- lifecycle state
- created date
- last modified date
- history
- supporting notes
- related records
- archive state

Controlled engineering records must maintain revision history rather than being silently overwritten.

---

# 3. REQUIREMENT INTAKE

The primary entry point is a guided requirement-creation workflow.

The user should be able to begin with nothing more than a requirement statement and progressively add detail.

## 3.1 Requirement fields

Each requirement should support:

- Unique requirement identifier
- Short title
- Requirement statement
- Source
- Source document and location
- Stakeholder
- Rationale
- Requirement type
- Priority
- Owner
- Reviewer
- Parent requirement
- Child requirements
- Applicable system level
- Applicable operating mode
- Applicable environment
- Assumptions
- Constraints
- Dependencies
- Related decisions
- Tags
- Notes
- Revision
- Baseline membership
- Change history

Requirement types should include:

- stakeholder
- system
- subsystem
- functional
- performance
- interface
- physical
- environmental
- safety
- security
- reliability
- maintainability
- manufacturing
- regulatory
- operational
- support
- disposal
- user-defined

## 3.2 Threshold and target values

A requirement may include:

- metric or parameter
- unit
- threshold value
- target value
- tolerance
- lower bound
- upper bound
- nominal value
- operating condition
- measurement condition
- comparison direction
- current estimate
- measured value
- margin
- confidence or maturity
- evidence date

Define the terms clearly:

- **Threshold** is the minimum acceptable level required for acceptance.
- **Target** is the desired objective beyond the threshold.

Support the following comparison models:

- at least
- at most
- greater than
- less than
- exact value
- range
- enumeration
- Boolean
- date or deadline
- descriptive acceptance criteria

Targets must be optional.

Requirements that are not numeric must still support structured acceptance criteria.

## 3.3 Technical performance tracking

A measurable requirement may be promoted to a **Technical Performance Measure (TPM)**.

A TPM should display:

- threshold
- target
- current estimate
- measured result
- margin to threshold
- trend over time
- forecast
- confidence
- evidence source
- last updated date
- responsible owner

Show threshold, target, and current value together on a compact trend chart.

Do not use color as the only status indicator.

## 3.4 Requirement quality review

Provide a non-blocking requirement-quality assistant.

Flag possible issues such as:

- vague language
- multiple obligations in one statement
- missing actor or subject
- missing measurable condition
- missing unit
- missing threshold
- missing operating condition
- undefined terminology
- unverifiable wording
- subjective terms such as “fast,” “easy,” “robust,” or “sufficient”
- embedded design solution without rationale
- unresolved placeholders
- conflicting limits

The assistant may suggest improvements, but it must never silently rewrite or replace the user’s requirement.

---

# 4. GUIDED REQUIREMENT WORKFLOW

The requirement intake wizard should ask the following questions in order.

## Step 1 — What is required?

Capture:

- requirement statement
- source
- rationale
- stakeholder
- priority

## Step 2 — How well must it perform?

Capture, when applicable:

- metric
- unit
- threshold
- target
- tolerance
- conditions
- acceptance rule

## Step 3 — How will compliance be verified?

Ask for the verification method:

- test
- analysis
- inspection
- demonstration
- similarity
- certification
- combination
- not yet determined

Capture:

- verification level
- acceptance criteria
- responsible owner
- planned date
- required configuration
- required environment
- required equipment
- required evidence

When the method includes test, offer to create a linked test plan immediately.

## Step 4 — How could it fail?

Open a lightweight FMECA intake form.

Capture an initial failure hypothesis without requiring a complete analysis.

The user should be able to add:

- failure mode
- potential cause
- local effect
- next-higher-level effect
- end effect
- existing control
- detection method
- mitigation
- residual concern

## Step 5 — Which function or functions satisfy it?

Allow many-to-many allocation between requirements and functions.

A requirement may be satisfied by several functions.

A function may satisfy several requirements.

## Step 6 — Which objects perform those functions?

Allocate functions to one or more:

- hardware objects
- software objects
- firmware objects
- human roles
- procedures
- facilities
- external systems

## Step 7 — Where does it belong in the decomposition?

Assign the requirement to one or more hierarchy nodes.

## Step 8 — What supports it?

Attach or link:

- source documents
- drawings
- specifications
- calculations
- analyses
- test procedures
- standards
- photographs
- data
- logs
- meeting decisions
- external references

## Step 9 — Who owns the next action?

Capture:

- owner
- due date
- work item
- milestone
- budget impact
- next action
- blocking condition

Allow the requirement to be saved as a draft at any step.

Show a completeness summary without preventing partial work.

---

# 5. SYSTEM DECOMPOSITION

Provide separate but linked logical and physical decompositions.

## 5.1 Physical and implementation hierarchy

Provide these default levels:

**SYSTEM → SUBSYSTEM → ASSEMBLY → SUBASSEMBLY → COMPONENT**

Do not hard-code them as the only possible levels.

Allow user-defined levels and domain-specific object types.

Examples include:

### Hardware

- system
- subsystem
- assembly
- subassembly
- component
- part

### Software

- system
- service
- application
- package
- module
- component

### Firmware

- platform
- image
- service
- driver
- module
- routine

### Human and process

- organization
- role
- procedure
- activity
- task

All object types should participate in one coherent parent-child model without forcing software into hardware terminology.

## 5.2 Function hierarchy

Provide a separate function tree.

A function should include:

- identifier
- name
- description
- parent function
- child functions
- input
- output
- trigger
- performance expectation
- applicable mode
- owner
- allocated requirements
- performing objects
- interfaces
- verification methods
- failure modes

Functions and implementation objects must remain distinct.

Do not treat a hardware or software object name as a substitute for a function.

## 5.3 Allocation

Support many-to-many allocation:

- requirement to function
- function to implementation object
- requirement directly to implementation object when justified
- requirement to interface
- test to requirement
- test to object
- evidence to result
- mitigation to failure mode
- work item to any controlled record

Display partial and complete allocation coverage.

Identify:

- unallocated requirements
- functions without implementing objects
- objects without defined functions
- requirements allocated only indirectly
- duplicate or conflicting allocations

## 5.4 Interfaces

Interfaces must be lightweight but first-class records because integration testing depends on them.

An interface should support:

- endpoint A
- endpoint B
- direction
- interface type
- exchanged item
- mechanical characteristics
- electrical characteristics
- data characteristics
- timing characteristics
- protocol
- ownership
- interface requirements
- applicable tests
- supporting documents
- current status

Interface types should include:

- mechanical
- electrical
- data
- software
- thermal
- fluid
- optical
- radio frequency
- human
- organizational
- user-defined

Do not attempt to replace a complete Interface Control Document authoring system. Provide enough structure to support allocation, integration planning, testing, and evidence.

---

# 6. REQUIREMENT INHERITANCE

Inheritance must be explicit and traceable.

Do not blindly duplicate parent requirements or test plans into every descendant.

## 6.1 Inherited obligations

When a child object is created, show applicable parent requirements as **pending inherited obligations**.

For each inherited obligation, allow the user to select:

- accepted as written
- accepted with local parameters
- tailored
- decomposed into derived requirements
- satisfied at the parent level
- not applicable
- superseded
- pending review

Tailored, superseded, or not-applicable decisions require a rationale.

## 6.2 Parent changes

When a parent requirement changes:

- mark affected inherited obligations as needing review
- show the old and new requirement revisions
- identify affected child requirements
- identify affected functions
- identify affected objects
- identify affected test plans and results
- identify affected schedule items
- identify affected budget items
- identify potentially stale evidence
- create an impact-review queue

Do not silently propagate changed text into approved child records.

## 6.3 Test-plan inheritance

Parent test plans should be referenced, not copied by default.

Allow:

- shared test plan
- parameterized test case
- inherited environmental condition
- inherited setup
- inherited acceptance rule
- child-specific test procedure
- parent-level verification
- lower-level evidence contributing to parent closure

A lower-level result must not automatically close a parent requirement unless an explicit traceability rule permits it.

---

# 7. THE V-MODEL AND BUILD-BACK-UP WORKFLOW

Provide a dedicated V-model view.

The left side should show:

- requirement decomposition
- function decomposition
- architecture decomposition
- allocated implementation objects

The bottom should show:

- component or module implementation
- configuration
- readiness for unit-level verification

The right side should show:

- unit-level verification
- integration verification
- subsystem verification
- system verification
- operational test and validation
- acceptance evidence

Users should be able to select any node on either side and see its cross-links.

## 7.1 Verification levels

Support at least:

### Unit level

For individual components, modules, routines, devices, or narrowly scoped objects.

Capture:

- planned test
- configuration
- result
- data
- defects
- evidence
- review

### Integration level

For interfaces and interactions between two or more objects.

Capture:

- objects under integration
- interfaces exercised
- integration sequence
- test configuration
- observed incompatibilities
- defects
- deviations
- evidence

### System level

For end-to-end verification against system requirements.

Capture:

- system configuration
- operating mode
- environment
- requirements verified
- test sequence
- result
- unresolved exceptions
- evidence

### Operational level

Treat operational testing primarily as validation in the intended or representative use context.

Capture:

- stakeholder need
- operational scenario
- representative user
- mission or use objective
- environment
- usability or suitability observations
- result
- acceptance recommendation
- evidence

## 7.2 Readiness gates

At every integration level, calculate and display readiness based on:

- requirement allocation coverage
- inherited obligations resolved
- unit results complete
- required interfaces verified
- high-criticality failure modes addressed
- required documents available
- blocking defects resolved
- test plans approved
- required configuration identified
- schedule readiness
- budget availability
- evidence completeness

Readiness must be explainable.

Do not show an unexplained green indicator. The user must be able to open the indicator and see exactly why the level is or is not ready.

## 7.3 Roll-up

Build status back up from lower levels.

A parent object should show:

- child implementation status
- child verification status
- interface status
- unresolved failures
- open issues
- inherited requirement status
- evidence completeness
- schedule variance
- budget variance
- overall readiness

Parent closure must be derived from traceable facts rather than manually selected without explanation.

Allow authorized manual overrides only with:

- rationale
- owner
- date
- approval
- affected records
- visible override indicator

---

# 8. VERIFICATION AND TEST MANAGEMENT

Verification is broader than testing.

## 8.1 Verification plan

A verification plan should include:

- identifier
- title
- requirement or requirements covered
- verification method
- verification level
- objective
- acceptance criteria
- preconditions
- test or analysis configuration
- environment
- equipment
- instrumentation
- personnel
- safety considerations
- procedure
- data to collect
- sample size
- pass or fail logic
- owner
- reviewer
- planned date
- dependencies
- supporting documents
- revision
- approval state

## 8.2 Test cases

Test cases should be reusable and parameterized.

Support:

- shared setup
- test steps
- expected result
- measured result
- units
- tolerance
- automatic and manual observations
- attachments
- deviations
- anomalies
- rerun history

## 8.3 Test executions

A test execution must record the **as-run** condition:

- exact test plan revision
- exact test case revision
- date and time
- operator
- reviewer
- system configuration
- hardware revision
- software version
- firmware version
- environment
- equipment
- calibration reference
- input data
- output data
- observations
- deviations from plan
- result
- attachments
- evidence references

Result states should include:

- not run
- running
- passed
- failed
- blocked
- inconclusive
- conditionally accepted
- waived
- superseded

A failed result should remain in the history even after a later result passes.

## 8.4 Verification closure

A requirement should not be considered verified solely because a status was manually changed.

Closure should require the applicable combination of:

- approved verification plan
- completed execution
- pass result
- acceptance criteria satisfied
- evidence attached
- reviewer disposition
- deviations resolved or accepted
- correct configuration confirmed

Show exactly which closure conditions remain unmet.

---

# 9. FAILURE MODES, EFFECTS, AND CRITICALITY ANALYSIS

Provide an integrated FMECA workbench.

Failure analysis may begin from:

- requirement
- function
- object
- interface
- operating mode
- test failure
- field observation

Each failure-mode record should include:

- item or function
- operating mode
- failure mode
- failure cause
- local effect
- next-higher-level effect
- end effect
- detection method
- existing prevention control
- existing detection control
- severity
- occurrence or likelihood
- detectability
- criticality
- safety or hazard relationship
- affected requirements
- affected interfaces
- affected test plans
- recommended mitigation
- action owner
- due date
- mitigation status
- residual severity
- residual likelihood
- residual criticality
- supporting evidence
- review status

Provide configurable scoring models.

Do not imply that one numerical Risk Priority Number (RPN) is universally authoritative. Allow organizations to use:

- severity and likelihood matrix
- severity, occurrence, and detection
- criticality categories
- custom scoring
- qualitative assessment

High-criticality failure modes should be able to generate:

- derived requirements
- design actions
- additional verification
- monitoring requirements
- inspection requirements
- operational constraints
- schedule tasks
- budget requests

Show whether each mitigation has been implemented and verified.

---

# 10. REQUIREMENT COUPON

Every requirement must have a compact, persistent **Requirement Coupon**.

The Requirement Coupon is a view of the authoritative requirement record—not a separate copy.

The coupon should move with the requirement through the entire lifecycle.

## 10.1 Coupon contents

Display:

- requirement identifier
- short title
- concise requirement statement
- parent requirement
- system level
- threshold
- target
- current value
- function allocation
- object allocation
- verification method
- verification level
- owner
- due date
- current lifecycle summary
- allocation completeness
- implementation status
- verification status
- validation status
- failure-analysis status
- evidence completeness
- schedule status
- budget status
- blockers
- next action
- revision
- baseline state

## 10.2 Orthogonal status dimensions

Do not reduce the requirement to one overloaded status field.

Track separate dimensions such as:

### Definition

- draft
- under review
- approved
- baselined
- change pending
- retired

### Allocation

- unallocated
- partially allocated
- fully allocated
- allocation under review

### Implementation

- not started
- in progress
- implemented
- blocked
- rework required

### Verification

- unplanned
- planned
- ready
- running
- passed
- failed
- blocked
- waived

### Validation

- not applicable
- unplanned
- planned
- running
- accepted
- rejected
- conditional

### Evidence

- missing
- incomplete
- complete
- stale
- under review

The coupon may display a derived summary, but the separate status dimensions remain authoritative.

## 10.3 Coupon behavior

The same coupon should appear in:

- requirement intake
- requirement list
- hierarchy
- traceability graph
- V-model
- Kanban board
- Gantt schedule
- verification queue
- FMECA
- review queue
- evidence library
- baseline comparison

Dragging a coupon may update the selected workflow dimension, owner, lane, or sequence.

Dragging must not:

- create a duplicate requirement
- alter unrelated status dimensions
- remove traceability
- discard revision history
- silently close verification

Opening the coupon should reveal the full requirement dossier.

---

# 11. KANBAN EXECUTION BOARD

Provide a Kanban board connected to the same underlying project model.

Requirements and work items are related but not identical.

A requirement describes an obligation.

A work item describes work needed to define, implement, verify, correct, or close that obligation.

Do not treat every requirement as a task.

## 11.1 Board modes

Allow the board to be viewed by:

- requirement definition
- allocation
- implementation
- verification
- validation
- evidence completion
- change control
- work-item status

Provide saved board configurations.

## 11.2 Board capabilities

Support:

- drag and drop
- configurable lanes
- swimlanes
- filters
- grouping
- assignee
- due date
- milestone
- priority
- blocked state
- blocker reason
- Work In Progress (WIP) limits
- multi-select
- bulk assignment
- bulk status update
- linked requirements
- linked functions
- linked objects
- linked tests
- linked failure modes
- linked documents

A board change must update all other views immediately.

---

# 12. GANTT SCHEDULE

Provide a proper Gantt schedule, not a static timeline.

## 12.1 Work items

Each work item should support:

- identifier
- title
- description
- owner
- status
- planned start
- planned finish
- actual start
- actual finish
- forecast finish
- duration
- percent complete
- milestone
- parent work package
- predecessors
- successors
- dependencies
- constraint
- calendar
- baseline dates
- linked requirements
- linked functions
- linked objects
- linked tests
- linked failure modes
- linked documents
- budget lines
- blockers

## 12.2 Dependencies

Support:

- finish-to-start
- start-to-start
- finish-to-finish
- start-to-finish
- lead
- lag

Show:

- critical path
- schedule slack
- late work
- baseline variance
- forecast variance
- blocked milestones
- requirement impact
- verification impact

## 12.3 Synchronization

Kanban and Gantt must use the same work-item records.

A task moved on the Kanban board must update the Gantt view where applicable.

A changed schedule date must appear on the corresponding Requirement Coupon.

Do not create separate task databases for each view.

---

# 13. BUDGET WORKBENCH

Provide two connected budget systems.

## 13.1 Project delivery budget

Track financial and labor resources such as:

- labor hours
- labor cost
- material
- procurement
- fabrication
- software
- licensing
- test equipment
- outside services
- facilities
- travel
- contingency
- user-defined categories

For each budget line, support:

- planned
- approved
- committed
- actual
- forecast
- remaining
- variance
- owner
- vendor
- purchase reference
- due date
- work item
- requirement
- object
- test
- document

Roll up project costs by:

- system hierarchy
- work breakdown
- owner
- category
- milestone
- requirement
- date range

## 13.2 Technical engineering budgets

Track nonfinancial engineering resources such as:

- mass
- electrical power
- energy
- thermal dissipation
- bandwidth
- latency
- storage
- Random Access Memory (RAM)
- nonvolatile memory
- central processing unit (CPU) utilization
- data rate
- battery capacity
- current
- input and output channels
- reliability allocation
- user-defined resources

Each technical budget should support:

- unit
- aggregation rule
- total available
- allocation
- current estimate
- measured actual
- reserve
- margin
- threshold
- target
- uncertainty
- maturity or confidence
- owner
- applicable mode
- applicable scenario
- supporting evidence

Aggregation rules should include:

- sum
- maximum
- minimum
- weighted sum
- percentage
- custom formula

Do not combine currency and engineering quantities in one undifferentiated budget.

## 13.3 Budget relationships

Budget records should link to:

- requirements
- Technical Performance Measures
- functions
- implementation objects
- work items
- milestones
- test plans
- failure mitigations
- change requests

A change to a requirement should be able to identify likely schedule and budget impact.

A budget overrun should identify the affected objects, functions, requirements, and milestones.

---

# 14. SUPPORTING DOCUMENTS AND EVIDENCE

The user must always be able to answer:

> **Where are the supporting documents?**

## 14.1 Document library

Provide a local evidence and document library supporting:

- attached local files
- imported files
- local file references
- web links
- generated reports
- notes
- photographs
- drawings
- calculations
- specifications
- standards
- test procedures
- test reports
- data logs
- certificates
- meeting records
- approval records

Each document should include:

- identifier
- title
- document type
- revision
- author
- owner
- date
- source
- status
- description
- tags
- linked records
- file metadata
- integrity fingerprint
- superseded-by relationship
- approval state

## 14.2 Evidence links

Evidence should be attachable to:

- requirement
- function
- object
- interface
- failure mode
- mitigation
- test plan
- test execution
- test result
- operational validation
- budget line
- schedule item
- decision
- baseline
- change request

The Requirement Coupon must show:

- number of supporting artifacts
- missing required evidence
- stale evidence
- superseded evidence
- most recent evidence
- direct link to the evidence library

## 14.3 Evidence integrity

When a file is attached, record an integrity fingerprint and file metadata.

If the user replaces the file, create a new evidence revision rather than silently changing the prior record.

Do not claim that the fingerprint provides certification or legal authenticity. It is an integrity and change-detection aid.

---

# 15. TRACEABILITY

Traceability is the center of LOOM.

Support typed links such as:

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

## 15.1 Traceability views

Provide:

- requirement tree
- function tree
- product or implementation tree
- interface map
- V-model
- relationship graph
- requirements-to-functions matrix
- functions-to-objects matrix
- requirements-to-objects matrix
- requirements-to-verification matrix
- requirements-to-evidence matrix
- failure-modes-to-mitigations matrix
- objects-to-tests matrix
- baseline comparison matrix

Users must be able to move from any record to every directly connected record.

## 15.2 Coverage analysis

Identify:

- orphan requirements
- unallocated requirements
- unverified requirements
- requirements without evidence
- requirements without owners
- requirements without planned dates
- requirements with incomplete inheritance decisions
- functions without requirements
- functions without implementation
- objects without functions
- interfaces without verification
- test cases without requirements
- results without evidence
- evidence without a controlled relationship
- mitigations without verification
- late verification work
- stale results after a configuration change

## 15.3 Impact analysis

When any controlled item changes, display potentially affected:

- requirements
- children
- parents
- functions
- objects
- interfaces
- failure analyses
- verification plans
- results
- evidence
- schedule
- budget
- baselines
- reports

Impact results should be explainable and navigable.

---

# 16. BASELINES AND CHANGE CONTROL

Provide lightweight but real configuration control.

## 16.1 Baselines

A named baseline may include:

- requirements
- functions
- architecture
- interfaces
- verification plans
- FMECA records
- schedule
- project budget
- technical budgets
- documents
- approved results

The baseline must retain exact revisions and relationships.

## 16.2 Baseline comparison

Allow comparison of any two baselines.

Show:

- added records
- removed records
- changed records
- changed relationships
- changed threshold or target
- changed allocation
- changed verification method
- changed test acceptance criteria
- changed schedule
- changed budget
- changed evidence
- newly stale results
- changed failure criticality

## 16.3 Change requests

A change request should include:

- title
- reason
- originator
- proposed change
- affected records
- impact analysis
- schedule impact
- budget impact
- risk impact
- verification impact
- disposition
- reviewer
- approval
- implementation status
- resulting revisions

Do not require enterprise workflow complexity.

Provide enough control to understand what changed, why it changed, who accepted it, and what must be reverified.

---

# 17. DECISIONS, ASSUMPTIONS, ISSUES, AND ACTIONS

Provide lightweight registers for:

- decisions
- assumptions
- issues
- actions

These records must be linkable to requirements, functions, objects, tests, failure modes, schedule items, budgets, documents, and changes.

## 17.1 Decisions

Capture:

- decision
- context
- alternatives considered
- rationale
- owner
- date
- affected records
- supporting evidence

## 17.2 Assumptions

Capture:

- assumption
- basis
- owner
- review date
- validation method
- affected records
- current status

An invalidated assumption should trigger impact review.

## 17.3 Issues and actions

Capture:

- description
- severity or priority
- owner
- due date
- status
- blocking relationship
- resolution
- evidence
- affected records

---

# 18. PROJECT COCKPIT

The home screen should present a project cockpit focused on decisions and missing work.

Show:

- requirements by definition state
- allocation coverage
- verification-plan coverage
- requirements passed, failed, blocked, or unverified
- operational validation status
- unresolved inherited obligations
- high-criticality failure modes
- open mitigations
- late work
- blocked milestones
- project budget variance
- technical budget margins
- evidence completeness
- stale evidence
- stale test results
- readiness by integration level
- pending reviews
- pending change requests

Every chart, count, and status indicator must be clickable and open the underlying records.

Avoid vanity metrics.

Prioritize actionable exceptions.

---

# 19. NAVIGATION AND USER EXPERIENCE

Use a small, stable, task-oriented navigation structure.

Recommended primary sections:

1. **Cockpit**
2. **Requirements**
3. **Architecture**
4. **Verification**
5. **Failure Analysis**
6. **Execution**
7. **Evidence**
8. **Baselines**

Use tabs or secondary navigation within those sections.

For example:

### Requirements

- List
- Tree
- Coupons
- Performance
- Traceability

### Architecture

- Functions
- Objects
- Interfaces
- Allocations
- V-model

### Verification

- Plans
- Test Cases
- Executions
- Results
- Readiness

### Execution

- Kanban
- Gantt
- Project Budget
- Technical Budgets
- Actions

### Evidence

- Documents
- Evidence Gaps
- Generated Reports

## 19.1 Layout

Use:

- collapsible left navigation
- central working area
- optional right-side inspector
- resizable panels
- searchable tables
- sortable columns
- adjustable column widths
- saved filters
- multi-select
- bulk actions
- keyboard navigation
- clear selection state
- useful empty states
- visible save state
- undo and redo where safe

Avoid excessive nested modals.

Prefer contextual inspectors and direct editing.

## 19.2 Visual character

LOOM should feel:

- precise
- calm
- durable
- technical
- legible
- modern without looking fashionable
- information-dense without becoming cramped

Avoid a generic pastel corporate dashboard.

Use strong hierarchy, restrained ornament, clear grid structure, accessible contrast, and consistent status treatments.

Support dark and light modes.

Color must never be the only indicator of state.

## 19.3 Easy Mode and Advanced Mode

Provide true Easy and Advanced modes.

### Easy Mode

Easy Mode should guide the user through:

1. Create a requirement.
2. Define threshold and target.
3. Select a verification method.
4. Record how it could fail.
5. Assign functions.
6. Assign implementation objects.
7. Track the Requirement Coupon.
8. record results.
9. attach evidence.
10. review closure.

Easy Mode should emphasize:

- guided forms
- plain language
- current next action
- missing information
- requirement coupons
- verification queue
- project health
- evidence

### Advanced Mode

Advanced Mode should add:

- traceability matrices
- relationship graph
- configurable hierarchies
- full FMECA scoring
- technical budgets
- baseline comparison
- change impact
- parameterized tests
- configurable status models
- custom fields
- advanced filtering
- bulk editing

Easy Mode must not merely hide half of a complicated interface.

It should provide a coherent essential workflow of its own.

---

# 20. AUTOSAVE AND PROJECT STATE

Provide visible autosave states:

**Unsaved → Saving → Saved**

Also show:

- save error
- storage unavailable
- recovery available
- imported project
- read-only baseline view

All meaningful edits must persist locally.

Support:

- automatic recovery after reload
- project duplication
- project archive
- named local projects
- recent-project list
- manual snapshot
- export backup
- import recovery
- schema migration between versions

Provide:

- **Fresh Start**
- **Load Sample Project**
- **Clear Sample Data**

Fresh Start must create a truly empty project.

Never make users manually delete sample records from a new project.

---

# 21. IMPORT AND EXPORT

## 21.1 Full-fidelity project exchange

Use a versioned JavaScript Object Notation (JSON) project format for complete project import and export.

The full project package should preserve:

- all records
- relationships
- revisions
- histories
- settings
- saved views
- baselines
- attachment metadata
- evidence references

Provide a packaged export containing project data and local attachments.

## 21.2 Table exchange

Support Comma-Separated Values (CSV) and Microsoft Excel Workbook (XLSX) import and export for major tabular areas, including:

- requirements
- functions
- objects
- interfaces
- FMECA
- verification plans
- test cases
- test results
- schedule
- project budget
- technical budgets
- document index

Imports must provide:

- column mapping
- preview
- validation
- duplicate handling
- error report
- cancel
- rollback

Do not partially import corrupted data without warning.

## 21.3 Future interchange

Design the import/export architecture so Requirements Interchange Format (ReqIF) support can be added later.

Do not delay the initial coherent application merely to implement every external enterprise format.

---

# 22. REPORTS

Reports must be constructed as readable documents, not screenshots of the application.

Generate at least:

- project status report
- requirement dossier
- Requirements Traceability Matrix
- verification cross-reference report
- verification status report
- unit test summary
- integration test summary
- system test summary
- operational validation summary
- FMECA report
- open mitigation report
- V-model readiness report
- schedule report
- project budget report
- technical budget report
- evidence index
- missing evidence report
- baseline comparison report
- change-impact report

Support Portable Document Format (PDF), Markdown, and structured data export where appropriate.

Reports should include:

- project name
- project revision
- baseline
- generated date
- application version
- filters applied
- record identifiers
- revision identifiers
- approval state
- page numbers
- source references
- evidence references

A requirement dossier should tell the complete story of one requirement from source through acceptance.

---

# 23. SAMPLE PROJECT

Include a realistic sample project demonstrating the entire workflow.

Use a cross-domain product such as a portable environmental monitoring instrument containing:

- enclosure
- sensor assembly
- battery
- power electronics
- embedded controller
- firmware
- local display
- communications
- data-processing software
- user procedure

Include at least one requirement with:

- threshold value
- target value
- Technical Performance Measure
- parent requirement
- derived child requirements
- function allocation
- hardware allocation
- software allocation
- inherited obligation
- FMECA entry
- mitigation
- unit test
- integration test
- system test
- operational validation
- supporting document
- schedule task
- project cost
- technical budget allocation
- baseline revision
- change impact

The sample project must demonstrate how evidence builds back up from the component level to system acceptance.

---

# 24. TECHNICAL ARCHITECTURE

Build LOOM as a modular TypeScript web application.

A suitable architecture is:

- React for the component layer
- Vite for development and production bundling
- IndexedDB for durable local project storage
- service worker for offline operation
- modular domain services
- schema validation
- explicit data migrations
- worker threads for expensive graph or roll-up calculations when needed
- semantic report-generation layer
- automated tests

Do not hard-wire the domain model directly into visual components.

Separate:

- domain entities
- relationship engine
- lifecycle rules
- roll-up calculations
- persistence
- import/export
- reporting
- user interface
- sample data
- test fixtures

Use stable generated identifiers.

Do not use array positions, visible names, or table row numbers as record identity.

## 24.1 Calculation services

Create testable services for:

- requirement completeness
- allocation coverage
- inherited-obligation status
- verification closure
- readiness roll-up
- Technical Performance Measure margin
- FMECA scoring
- schedule dependency calculations
- critical-path calculations
- budget roll-up
- technical-budget margin
- evidence completeness
- baseline comparison
- impact analysis

All derived statuses must be reproducible from stored records.

## 24.2 Data safety

Implement:

- transaction-safe writes
- import rollback
- recovery snapshots
- versioned schema migrations
- archive instead of destructive deletion for controlled records
- confirmation for irreversible actions
- clear error messages
- export before destructive project reset
- validation of imported relationships
- detection of dangling references

Never silently discard unknown fields during import.

---

# 25. NON-GOALS

LOOM should not initially attempt to become:

- a cloud collaboration platform
- an enterprise Product Lifecycle Management replacement
- an enterprise Application Lifecycle Management replacement
- a computer-aided design system
- a source-code repository
- a simulation environment
- an automatic certification authority
- a substitute for engineering judgment
- a substitute for independent safety review
- a substitute for approved organizational processes

LOOM may organize evidence for compliance, but it must never claim that using the application automatically makes a project compliant, safe, verified, validated, or certified.

---

# 26. REQUIRED VALIDATION SCENARIOS

Before considering a build complete, verify all of the following.

## Project lifecycle

- Start from a cold load.
- Create an empty project.
- Load the sample project.
- Switch between projects.
- Duplicate a project.
- archive and restore a project.
- Reload the browser.
- Confirm all data persists.

## Requirement workflow

- Create a requirement.
- Add a threshold and target.
- Create a Technical Performance Measure.
- select a verification method.
- Create a test plan.
- Add a failure mode.
- assign the requirement to multiple functions.
- allocate the functions to hardware and software objects.
- place the requirement in the hierarchy.
- attach supporting evidence.
- confirm the Requirement Coupon updates everywhere.

## Decomposition and inheritance

- Create a system, subsystem, assembly, subassembly, and component.
- Create a software-specific decomposition.
- Inherit a parent obligation.
- tailor the obligation.
- derive a child requirement.
- mark one obligation not applicable with rationale.
- change the parent requirement.
- confirm affected children enter the impact-review queue.

## Build-back-up workflow

- Record a unit result.
- record an integration result.
- record a system result.
- record an operational validation result.
- confirm readiness rolls upward.
- introduce a failed child result.
- confirm the parent no longer appears ready.
- attach new evidence.
- confirm closure updates correctly.

## Execution

- Create a work item.
- link it to a requirement and test.
- place it on the Kanban board.
- drag it to another lane.
- confirm the Gantt view updates.
- create dependencies.
- change a schedule date.
- confirm the Requirement Coupon reflects the change.

## Budget

- Add project labor and procurement budget lines.
- record planned, committed, actual, and forecast values.
- create a mass budget.
- create a power budget.
- allocate budgets to child objects.
- confirm roll-up.
- exceed a threshold.
- confirm affected records are identified.

## Evidence

- attach a document.
- revise the document.
- confirm the earlier revision remains available.
- mark evidence stale.
- replace it with current evidence.
- export an evidence index.

## Baselines

- create a baseline.
- change a requirement.
- change an allocation.
- change a test plan.
- change schedule and budget values.
- create a second baseline.
- compare the two.
- confirm all differences are shown.

## Import and export

- export the full project.
- clear local data.
- import the project.
- confirm records, relationships, histories, baselines, saved views, and attachments are preserved.
- import malformed data.
- confirm the application reports the problem without damaging the current project.

## User interface and user experience

- test Easy Mode.
- test Advanced Mode.
- test dark mode.
- test light mode.
- test keyboard navigation.
- test narrow and wide windows.
- resize panels.
- sort and filter tables.
- use multi-select.
- confirm no buttons are dead.
- confirm no content overlaps.
- confirm status is not communicated by color alone.
- confirm the visible version changed for the delivered build.

---

# 27. FINAL PRODUCT STANDARD

LOOM is successful when a user can select any requirement and immediately answer:

- What does this requirement say?
- Where did it come from?
- What are its threshold and target?
- What function satisfies it?
- What hardware or software implements that function?
- What lower-level requirements were derived from it?
- Which obligations were inherited?
- How could it fail?
- How will it be verified?
- Which tests have been run?
- What were the unit, integration, system, and operational results?
- Which configuration was tested?
- Where is the evidence?
- What remains open?
- Who owns the next action?
- Is it late?
- Is it over budget?
- Has it changed since baseline?
- Can the parent system now be considered ready?

The application should make the complete engineering story visible without requiring the user to reconcile separate spreadsheets, task boards, test databases, and document folders.

> **A requirement becomes a thread. Implementation gives it form. Evidence closes the loop.**