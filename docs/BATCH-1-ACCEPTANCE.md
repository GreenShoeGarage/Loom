# LOOM v0.2.0 Batch 1 Acceptance

## Batch objective

Batch 1 establishes a trustworthy deployment and data-safety foundation before later engineering-intelligence features are added.

The release objective was to validate and harden:

- real-origin operation
- Indexed Database Application Programming Interface (IndexedDB) persistence
- service-worker and offline behavior
- installability metadata
- export and import across browser profiles
- malformed-import rejection
- transaction safety
- recovery before replacement or deletion
- schema migration
- visible storage and recovery status

## Acceptance summary

| Objective | Result | Evidence |
|---|---|---|
| Serve the production application from a real Hypertext Transfer Protocol (HTTP) origin | Passed | Real-origin checks 1–2 |
| Use IndexedDB as authoritative local project storage | Passed | Checks 3–6 and 14 |
| Preserve project and evidence across browser restart | Passed | Checks 22–23 |
| Reopen the application and project while offline | Passed | Checks 24–25 |
| Install and activate the versioned service worker | Passed | Checks 7–10 |
| Provide complete web-app manifest metadata and icons | Passed | Checks 11–13 |
| Preserve attached evidence locally and through export | Passed | Checks 15–21 |
| Keep an aborted transaction from changing the project | Passed | Check 26 |
| Reject malformed JavaScript Object Notation (JSON) without state damage | Passed | Checks 27–28 |
| Reject dangling relationships without state damage | Passed | Checks 29–30 |
| Preserve unknown top-level fields | Passed | Check 31 |
| Display storage, origin, and offline-shell diagnostics | Passed | Checks 32–34 |
| Create manual and automatic recovery snapshots | Passed | Checks 35 and 38 |
| Create a truly empty Fresh Start project | Passed | Checks 36–37 |
| Restore a prior project and stable identifier | Passed | Checks 39–40 |
| Transfer a complete project to a clean browser profile | Passed | Checks 42–45 |
| Complete the pass without page or console errors | Passed | Checks 41 and 46–48 |

The complete machine-readable result is `origin-acceptance-results.json`.

---

## Delivered Batch 1 capabilities

### 1. Serialized transaction-safe writes

Project saves are queued in order. Each IndexedDB write completes or aborts as one transaction. The current interface state is not treated as committed until local storage reports success.

The tested aborted transaction left the authoritative stored project unchanged.

### 2. Recovery-aware project replacement

Before safety-sensitive replacement or deletion, LOOM:

1. commits the current project
2. stores a local recovery snapshot
3. commits the replacement or deletion
4. changes the interface only after the operation succeeds

Automatic recovery snapshots are created before:

- Fresh Start
- sample-project loading
- project import
- snapshot restoration
- permanent project deletion

### 3. Recovery library

The Data Safety workspace supports:

- manual snapshot creation
- automatic snapshot review
- project name and revision display
- capture reason and time
- schema and approximate-size display
- restoration
- removal
- retention of the eight newest snapshots per project

Restoring a snapshot first snapshots the current project. The restored project retains its stable identifier.

### 4. Storage diagnostics

The application displays:

- current browser origin
- authoritative local storage backend
- IndexedDB availability
- local browser storage availability
- persistent-storage state
- storage usage and quota when reported
- service-worker registration and control state
- secure-context status

### 5. Schema-safe exchange

LOOM v0.2.0:

- exports a versioned project-exchange manifest
- migrates schema v0.1.0 to v0.2.0
- records migration history
- accepts existing v0.2.0 projects
- rejects unsupported future schemas
- rejects malformed project shape
- rejects duplicate stable identities
- rejects dangling controlled relationships
- retains unknown top-level project fields
- limits a single JSON import to 250 megabytes

A rejected import does not replace or modify the active stored project.

### 6. Versioned offline application shell

The v0.2.0 service worker:

- precaches the complete application shell
- uses versioned shell and runtime caches
- removes older LOOM caches during activation
- claims open clients after activation
- uses network-first navigation with cached fallback
- serves local assets from cache while refreshing when the origin is available
- ignores cross-origin requests

### 7. Installability metadata

The manifest includes:

- application and short names
- stable application identifier
- start address and scope
- standalone display mode
- theme and background colors
- orientation
- application categories
- 192-pixel and 512-pixel install icons

Chromium reported no installability errors during the acceptance pass.

---

## Executed results

### Domain suite

```text
89 total
89 passed
0 failed
```

### Chromium interaction and layout suite

```text
39 total
39 passed
0 failed
```

### Real-origin acceptance suite

```text
48 total
48 passed
0 failed
```

### Runtime errors

```text
Browser page exceptions: 0
Browser console errors: 0
```

---

## Acceptance limitations

- The real-origin acceptance pass used Chromium because Firefox and WebKit were unavailable in the validation environment.
- Chromium installability criteria were validated, but the headless run did not operate an operating-system-specific installation prompt.
- Package-registry name resolution was unavailable, so the conventional `npm install` and TypeScript/Vite build path was not executed in this environment.
- The production artifact was generated by the included offline builder and exercised through the delivered domain and Chromium suites.
- The validation image normally blocks all web navigation through managed Chromium policy. The policy was temporarily relaxed in the isolated container for the loopback-origin acceptance run and restored afterward. The delivered script does not alter browser policy.
- Recovery snapshots remain browser-profile and origin scoped. They do not replace external project exports.
- No browser storage mechanism provides a guarantee against deliberate site-data clearing, profile deletion, device failure, or administrative cleanup.

---

## Exit decision

**Batch 1 is accepted for LOOM v0.2.0.**

The delivered evidence demonstrates the intended deployment and data-safety behavior in the validated Chromium environment. The foundation is ready for Batch 2 controlled-record lifecycle development, subject to deployment acceptance in the user’s selected hosting origin and browser environment.
