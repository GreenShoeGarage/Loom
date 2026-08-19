/* LOOM v0.1.0 production application bundle. */
(function (global) {
  'use strict';
  var vendor = global.__LOOM_VENDOR__;
  if (!vendor) throw new Error('LOOM vendor runtime did not load.');
  var modules = {
"src/App.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = require("react");
const factory_1 = require("./domain/factory");
const ProjectContext_1 = require("./hooks/ProjectContext");
const files_1 = require("./services/files");
const dates_1 = require("./utils/dates");
const text_1 = require("./utils/text");
const ArchitectureView_1 = require("./views/ArchitectureView");
const BaselinesView_1 = require("./views/BaselinesView");
const CockpitView_1 = require("./views/CockpitView");
const EvidenceView_1 = require("./views/EvidenceView");
const ExecutionView_1 = require("./views/ExecutionView");
const FailureAnalysisView_1 = require("./views/FailureAnalysisView");
const RequirementsView_1 = require("./views/RequirementsView");
const VerificationView_1 = require("./views/VerificationView");
const Icon_1 = require("./components/Icon");
const Modal_1 = require("./components/Modal");
const Toast_1 = require("./components/Toast");
const ui_1 = require("./components/ui");
const navItems = [
    { id: 'cockpit', label: 'Cockpit', icon: 'cockpit', description: 'Decisions and missing work' },
    { id: 'requirements', label: 'Requirements', icon: 'requirements', description: 'Definition and traceability' },
    { id: 'architecture', label: 'Architecture', icon: 'architecture', description: 'Functions, objects, interfaces' },
    { id: 'verification', label: 'Verification', icon: 'verification', description: 'Plans, results, readiness' },
    { id: 'failure', label: 'Failure Analysis', icon: 'failure', description: 'Failure modes and mitigation' },
    { id: 'execution', label: 'Execution', icon: 'execution', description: 'Kanban, Gantt, budgets' },
    { id: 'evidence', label: 'Evidence', icon: 'evidence', description: 'Documents, gaps, reports' },
    { id: 'baselines', label: 'Baselines', icon: 'baseline', description: 'Configuration and change' }
];
const views = {
    cockpit: CockpitView_1.CockpitView,
    requirements: RequirementsView_1.RequirementsView,
    architecture: ArchitectureView_1.ArchitectureView,
    verification: VerificationView_1.VerificationView,
    failure: FailureAnalysisView_1.FailureAnalysisView,
    execution: ExecutionView_1.ExecutionView,
    evidence: EvidenceView_1.EvidenceView,
    baselines: BaselinesView_1.BaselinesView
};
function App() {
    const { project, projects, loading, saveState, updateProject, updateSettings, replaceProject, createFreshProject, loadSampleProject, duplicateCurrentProject, archiveCurrentProject, restoreCurrentProject, permanentlyDeleteCurrentProject, switchProject, notify } = (0, ProjectContext_1.useProject)();
    const [projectMenuOpen, setProjectMenuOpen] = (0, react_1.useState)(false);
    const [aboutOpen, setAboutOpen] = (0, react_1.useState)(false);
    const [projectDetailsOpen, setProjectDetailsOpen] = (0, react_1.useState)(false);
    const [searchOpen, setSearchOpen] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [projectDetails, setProjectDetails] = (0, react_1.useState)({ name: project.name, description: project.description });
    const importInputRef = (0, react_1.useRef)(null);
    const activeSection = views[project.settings.activeSection] ? project.settings.activeSection : 'cockpit';
    const ActiveView = views[activeSection] ?? CockpitView_1.CockpitView;
    const collapsed = project.settings.navigationCollapsed;
    (0, react_1.useEffect)(() => {
        setProjectDetails({ name: project.name, description: project.description });
    }, [project.id, project.name, project.description]);
    (0, react_1.useEffect)(() => {
        const handleKey = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setSearchOpen(true);
            }
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
                event.preventDefault();
                notify(saveState === 'saved' ? 'All changes are already saved locally.' : 'LOOM will save this change automatically.', 'info');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [notify, saveState]);
    const searchRecords = (0, react_1.useMemo)(() => [
        ...project.requirements.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Requirement', section: 'requirements', context: record.statement })),
        ...project.functions.map((record) => ({ id: record.id, identifier: record.identifier, title: record.name, kind: 'Function', section: 'architecture', context: record.description })),
        ...project.objects.map((record) => ({ id: record.id, identifier: record.identifier, title: record.name, kind: (0, text_1.humanize)(record.domain), section: 'architecture', context: record.description })),
        ...project.interfaces.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Interface', section: 'architecture', context: `${record.interfaceType} ${record.protocol}` })),
        ...project.verificationPlans.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Verification plan', section: 'verification', context: record.objective })),
        ...project.testExecutions.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Test execution', section: 'verification', context: `${record.result} ${record.systemConfiguration}` })),
        ...project.failureModes.map((record) => ({ id: record.id, identifier: record.identifier, title: record.failureMode, kind: 'Failure mode', section: 'failure', context: `${record.cause} ${record.endEffect}` })),
        ...project.workItems.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Work item', section: 'execution', context: record.description })),
        ...project.documents.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Evidence', section: 'evidence', context: record.description })),
        ...project.baselines.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Baseline', section: 'baselines', context: record.description })),
        ...project.changeRequests.map((record) => ({ id: record.id, identifier: record.identifier, title: record.title, kind: 'Change request', section: 'baselines', context: `${record.reason} ${record.proposedChange}` }))
    ], [project]);
    const filteredSearch = (0, react_1.useMemo)(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query)
            return searchRecords.slice(0, 24);
        return searchRecords.filter((record) => `${record.identifier} ${record.title} ${record.kind} ${record.context}`.toLowerCase().includes(query)).slice(0, 50);
    }, [searchQuery, searchRecords]);
    const selectSection = (id) => {
        updateSettings((settings) => { settings.activeSection = id; });
        if (window.innerWidth < 860)
            updateSettings((settings) => { settings.navigationCollapsed = true; });
    };
    const setMode = (mode) => updateSettings((settings) => { settings.mode = mode; });
    const setTheme = (theme) => updateSettings((settings) => { settings.theme = theme; });
    const handleImport = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file)
            return;
        try {
            const imported = await (0, files_1.importProject)(file);
            await replaceProject(imported, `${imported.name} imported successfully.`);
            setProjectMenuOpen(false);
        }
        catch (error) {
            notify(error instanceof Error ? `Import failed: ${error.message}` : 'Import failed. The current project was not changed.', 'danger');
        }
    };
    const saveProjectDetails = () => {
        if (!projectDetails.name.trim())
            return notify('Project name cannot be empty.', 'warning');
        updateProject((draft) => {
            draft.name = projectDetails.name.trim();
            draft.description = projectDetails.description.trim();
            draft.isSample = false;
        }, 'Project details updated');
        setProjectDetailsOpen(false);
        notify('Project details updated.', 'success');
    };
    if (loading) {
        return React.createElement("div", { className: "loading-screen" },
            React.createElement("div", { className: "loom-mark loom-mark--large", "aria-hidden": "true" },
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null)),
            React.createElement("h1", null, "LOOM"),
            React.createElement("p", null, "Opening local project\u2026"));
    }
    const saveLabel = {
        unsaved: 'Unsaved', saving: 'Saving', saved: 'Saved', error: 'Save error', unavailable: 'Storage unavailable', recovery: 'Recovery available'
    };
    return (React.createElement("div", { className: `app-shell ${collapsed ? 'app-shell--collapsed' : ''}` },
        React.createElement("header", { className: "topbar" },
            React.createElement("div", { className: "topbar__brand" },
                React.createElement(ui_1.IconButton, { label: collapsed ? 'Open navigation' : 'Collapse navigation', icon: "menu", onClick: () => updateSettings((settings) => { settings.navigationCollapsed = !settings.navigationCollapsed; }) }),
                React.createElement("button", { className: "brand-lockup", onClick: () => selectSection('cockpit'), "aria-label": "Open project cockpit" },
                    React.createElement("div", { className: "loom-mark", "aria-hidden": "true" },
                        React.createElement("span", null),
                        React.createElement("span", null),
                        React.createElement("span", null),
                        React.createElement("span", null)),
                    React.createElement("div", null,
                        React.createElement("strong", null, "LOOM"),
                        React.createElement("small", null,
                            "v",
                            factory_1.APP_VERSION)))),
            React.createElement("div", { className: "topbar__project" },
                React.createElement(ui_1.Select, { "aria-label": "Current local project", value: project.id, onChange: (event) => switchProject(event.target.value) },
                    projects.map((summary) => React.createElement("option", { value: summary.id, key: summary.id },
                        summary.name,
                        summary.archived ? ' — Archived' : '')),
                    !projects.some((summary) => summary.id === project.id) ? React.createElement("option", { value: project.id }, project.name) : null),
                React.createElement("div", { className: "project-revision", title: `Project revision ${project.revision}; last updated ${(0, dates_1.formatDateTime)(project.updatedAt)}` },
                    "r",
                    project.revision),
                React.createElement(ui_1.IconButton, { label: "Project actions", icon: "more", onClick: () => setProjectMenuOpen((open) => !open) }),
                projectMenuOpen ? React.createElement(React.Fragment, null,
                    React.createElement("button", { className: "popover-scrim", "aria-label": "Close project actions", onClick: () => setProjectMenuOpen(false) }),
                    React.createElement("div", { className: "project-menu", role: "menu" },
                        React.createElement("div", { className: "project-menu__title" },
                            React.createElement("strong", null, project.name),
                            React.createElement("small", null,
                                "Stored locally \u00B7 ",
                                project.archived ? 'Archived' : 'Active')),
                        React.createElement("button", { role: "menuitem", onClick: () => { setProjectDetailsOpen(true); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: "edit" }),
                            "Edit project details"),
                        React.createElement("button", { role: "menuitem", onClick: () => { void duplicateCurrentProject(); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: "copy" }),
                            "Duplicate project"),
                        React.createElement("button", { role: "menuitem", onClick: () => { (0, files_1.exportProject)(project); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: "download" }),
                            "Export full project"),
                        React.createElement("button", { role: "menuitem", onClick: () => { importInputRef.current?.click(); } },
                            React.createElement(Icon_1.Icon, { name: "upload" }),
                            "Import project"),
                        React.createElement("div", { className: "project-menu__divider" }),
                        React.createElement("button", { role: "menuitem", onClick: () => { void createFreshProject(); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: "plus" }),
                            "Fresh Start"),
                        React.createElement("button", { role: "menuitem", onClick: () => { void loadSampleProject(); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: "refresh" }),
                            "Load sample project"),
                        React.createElement("button", { role: "menuitem", onClick: () => { if (project.archived)
                                void restoreCurrentProject();
                            else
                                void archiveCurrentProject(); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: project.archived ? 'unlock' : 'archive' }),
                            project.archived ? 'Restore project' : 'Archive project'),
                        React.createElement("div", { className: "project-menu__divider" }),
                        React.createElement("button", { className: "project-menu__danger", role: "menuitem", onClick: () => { if (window.confirm(`Permanently delete “${project.name}” from local storage? Export it first if it must be retained.`))
                                void permanentlyDeleteCurrentProject(); setProjectMenuOpen(false); } },
                            React.createElement(Icon_1.Icon, { name: "trash" }),
                            "Permanently delete"))) : null,
                React.createElement("input", { ref: importInputRef, className: "visually-hidden", type: "file", accept: ".json,application/json", onChange: handleImport })),
            React.createElement("div", { className: "topbar__tools" },
                React.createElement("div", { className: `save-indicator save-indicator--${saveState}`, title: "Local autosave state", role: "status", "aria-live": "polite" },
                    React.createElement("span", null),
                    React.createElement(Icon_1.Icon, { name: "save", size: 15 }),
                    React.createElement("strong", null, saveLabel[saveState])),
                React.createElement("button", { className: "global-search-button", onClick: () => setSearchOpen(true) },
                    React.createElement(Icon_1.Icon, { name: "search", size: 16 }),
                    React.createElement("span", null, "Search"),
                    React.createElement(ui_1.Kbd, null, "\u2318 K")),
                React.createElement("div", { className: "mode-switch", "aria-label": "Application mode" },
                    React.createElement("button", { className: project.settings.mode === 'easy' ? 'is-active' : '', "aria-pressed": project.settings.mode === 'easy', title: "Easy Mode", onClick: () => setMode('easy') },
                        React.createElement(Icon_1.Icon, { name: "easy", size: 15 }),
                        React.createElement("span", null, "Easy")),
                    React.createElement("button", { className: project.settings.mode === 'advanced' ? 'is-active' : '', "aria-pressed": project.settings.mode === 'advanced', title: "Advanced Mode", onClick: () => setMode('advanced') },
                        React.createElement(Icon_1.Icon, { name: "advanced", size: 15 }),
                        React.createElement("span", null, "Advanced"))),
                React.createElement("div", { className: "theme-switch", "aria-label": "Theme" }, ['light', 'dark', 'system'].map((theme) => React.createElement("button", { key: theme, className: project.settings.theme === theme ? 'is-active' : '', "aria-pressed": project.settings.theme === theme, "aria-label": `${(0, text_1.humanize)(theme)} theme`, title: `${(0, text_1.humanize)(theme)} theme`, onClick: () => setTheme(theme) },
                    React.createElement(Icon_1.Icon, { name: theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'monitor', size: 16 })))),
                React.createElement(ui_1.IconButton, { label: "About LOOM", icon: "help", onClick: () => setAboutOpen(true) }))),
        React.createElement("aside", { className: "sidebar", "aria-label": "Primary navigation" },
            React.createElement("div", { className: "sidebar__workflow" },
                React.createElement("span", null, "TRACE DOWN"),
                React.createElement("div", null,
                    React.createElement("i", null),
                    React.createElement("i", null),
                    React.createElement("i", null),
                    React.createElement("i", null),
                    React.createElement("i", null)),
                React.createElement("span", null, "VERIFY UP")),
            React.createElement("nav", null, navItems.map((item, index) => (React.createElement("button", { key: item.id, className: `nav-item ${activeSection === item.id ? 'is-active' : ''}`, onClick: () => selectSection(item.id), title: collapsed ? `${item.label} — ${item.description}` : undefined },
                React.createElement("span", { className: "nav-item__step" }, String(index + 1).padStart(2, '0')),
                React.createElement(Icon_1.Icon, { name: item.icon }),
                React.createElement("span", { className: "nav-item__copy" },
                    React.createElement("strong", null, item.label),
                    React.createElement("small", null, item.description)),
                activeSection === item.id ? React.createElement("span", { className: "nav-item__active" }) : null)))),
            React.createElement("div", { className: "sidebar__footer" },
                React.createElement("div", { className: "privacy-mark" },
                    React.createElement(Icon_1.Icon, { name: "lock", size: 15 }),
                    React.createElement("span", null,
                        React.createElement("strong", null, "Local-first"),
                        React.createElement("small", null, "No account \u00B7 No telemetry"))),
                React.createElement("p", null,
                    "Trace requirements down.",
                    React.createElement("br", null),
                    "Build evidence back up."))),
        React.createElement("main", { className: "main-workspace", id: "main-content" },
            project.archived ? React.createElement("div", { className: "archive-banner" },
                React.createElement(Icon_1.Icon, { name: "archive" }),
                React.createElement("strong", null, "This project is archived."),
                React.createElement("span", null, "It remains readable and can be restored from Project Actions.")) : null,
            React.createElement(ActiveView, { navigate: selectSection })),
        React.createElement(Toast_1.Toast, null),
        React.createElement(Modal_1.Modal, { open: projectDetailsOpen, onClose: () => setProjectDetailsOpen(false), title: "Project details", description: "Name and describe the current local engineering project.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setProjectDetailsOpen(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: saveProjectDetails }, "Save details")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Project name", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: projectDetails.name, onChange: (event) => setProjectDetails({ ...projectDetails, name: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Description", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 5, value: projectDetails.description, onChange: (event) => setProjectDetails({ ...projectDetails, description: event.target.value }) })))),
        React.createElement(Modal_1.Modal, { open: searchOpen, onClose: () => { setSearchOpen(false); setSearchQuery(''); }, title: "Search the engineering thread", description: "Find requirements, functions, objects, tests, failures, work, evidence, baselines, and changes.", width: "large" },
            React.createElement("div", { className: "command-search" },
                React.createElement(Icon_1.Icon, { name: "search" }),
                React.createElement(ui_1.Input, { autoFocus: true, value: searchQuery, onChange: (event) => setSearchQuery(event.target.value), placeholder: "Search identifier, title, owner, status, or text\u2026" })),
            React.createElement("div", { className: "search-results" },
                filteredSearch.map((record) => React.createElement("button", { key: `${record.kind}-${record.id}`, onClick: () => { selectSection(record.section); setSearchOpen(false); setSearchQuery(''); } },
                    React.createElement("span", { className: "search-result__icon" },
                        React.createElement(Icon_1.Icon, { name: navItems.find((item) => item.id === record.section)?.icon ?? 'document' })),
                    React.createElement("span", null,
                        React.createElement("span", null,
                            React.createElement("strong", null, record.identifier),
                            React.createElement("em", null, record.kind)),
                        React.createElement("b", null, record.title),
                        React.createElement("small", null, record.context || `Open ${(0, text_1.humanize)(record.section)}`)),
                    React.createElement(Icon_1.Icon, { name: "arrow-right" }))),
                !filteredSearch.length ? React.createElement("div", { className: "search-empty" },
                    React.createElement(Icon_1.Icon, { name: "search" }),
                    React.createElement("strong", null, "No matching controlled records"),
                    React.createElement("span", null, "Try a requirement identifier, title, owner, or status.")) : null)),
        React.createElement(Modal_1.Modal, { open: aboutOpen, onClose: () => setAboutOpen(false), title: `LOOM v${factory_1.APP_VERSION}`, description: "Systems Engineering Project Control", width: "large", footer: React.createElement(ui_1.Button, { variant: "primary", onClick: () => setAboutOpen(false) }, "Close") },
            React.createElement("div", { className: "about-grid" },
                React.createElement("div", { className: "about-hero" },
                    React.createElement("div", { className: "loom-mark loom-mark--large", "aria-hidden": "true" },
                        React.createElement("span", null),
                        React.createElement("span", null),
                        React.createElement("span", null),
                        React.createElement("span", null)),
                    React.createElement("div", null,
                        React.createElement("h3", null,
                            "Trace requirements down.",
                            React.createElement("br", null),
                            "Build evidence back up."),
                        React.createElement("p", null, "LOOM connects requirements to rationale, verification intent, failure analysis, functions, implementation objects, tests, evidence, schedule, budgets, acceptance, and baselines through one typed project model."))),
                React.createElement("div", { className: "about-card" },
                    React.createElement(Icon_1.Icon, { name: "lock" }),
                    React.createElement("div", null,
                        React.createElement("h4", null, "Private by default"),
                        React.createElement("p", null, "Project content is stored locally in Indexed Database (IndexedDB), with local browser storage used only as a recovery fallback and for the last-opened project identifier. LOOM uses no account, analytics, advertising, telemetry, or non-essential cookies."))),
                React.createElement("div", { className: "about-card" },
                    React.createElement(Icon_1.Icon, { name: "refresh" }),
                    React.createElement("div", null,
                        React.createElement("h4", null, "Complete recovery loop"),
                        React.createElement("p", null, "Autosave, reload recovery, named projects, duplication, archive and restore, full JavaScript Object Notation (JSON) exchange, sample data, and schema migration are built in."))),
                React.createElement("div", { className: "about-card" },
                    React.createElement(Icon_1.Icon, { name: "warning" }),
                    React.createElement("div", null,
                        React.createElement("h4", null, "Engineering judgment remains authoritative"),
                        React.createElement("p", null, "LOOM organizes evidence. It does not automatically make a project compliant, safe, verified, validated, accepted, or certified, and it does not replace independent review or approved organizational processes."))),
                React.createElement("dl", { className: "about-manifest" },
                    React.createElement("div", null,
                        React.createElement("dt", null, "Application"),
                        React.createElement("dd", null, "LOOM \u2014 Systems Engineering Project Control")),
                    React.createElement("div", null,
                        React.createElement("dt", null, "Version"),
                        React.createElement("dd", null, factory_1.APP_VERSION)),
                    React.createElement("div", null,
                        React.createElement("dt", null, "Schema"),
                        React.createElement("dd", null, project.schemaVersion)),
                    React.createElement("div", null,
                        React.createElement("dt", null, "Current project revision"),
                        React.createElement("dd", null, project.revision)),
                    React.createElement("div", null,
                        React.createElement("dt", null, "Storage"),
                        React.createElement("dd", null, "Local browser database")),
                    React.createElement("div", null,
                        React.createElement("dt", null, "Network transmission"),
                        React.createElement("dd", null, "None without explicit user action")))))));
}

},
"src/components/Icon.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = Icon;
const paths = {
    cockpit: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M4 13a8 8 0 1 1 16 0" }),
        React.createElement("path", { d: "M12 13l4-4" }),
        React.createElement("path", { d: "M4 13h2m12 0h2M12 5v2" }),
        React.createElement("path", { d: "M5 18h14" })),
    requirements: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M7 3h10a2 2 0 0 1 2 2v16l-7-3-7 3V5a2 2 0 0 1 2-2Z" }),
        React.createElement("path", { d: "M9 8h6M9 12h6" })),
    architecture: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "9", y: "3", width: "6", height: "5", rx: "1" }),
        React.createElement("rect", { x: "3", y: "16", width: "6", height: "5", rx: "1" }),
        React.createElement("rect", { x: "15", y: "16", width: "6", height: "5", rx: "1" }),
        React.createElement("path", { d: "M12 8v4M6 16v-4h12v4" })),
    verification: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m4 12 5 5L20 6" }),
        React.createElement("path", { d: "M20 12a8 8 0 1 1-4-6.93" })),
    failure: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 3 2.8 19a2 2 0 0 0 1.73 3h14.94a2 2 0 0 0 1.73-3Z" }),
        React.createElement("path", { d: "M12 9v5M12 18h.01" })),
    execution: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M4 5h16M4 12h16M4 19h16" }),
        React.createElement("circle", { cx: "8", cy: "5", r: "2" }),
        React.createElement("circle", { cx: "16", cy: "12", r: "2" }),
        React.createElement("circle", { cx: "10", cy: "19", r: "2" })),
    evidence: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M6 3h9l4 4v14H6Z" }),
        React.createElement("path", { d: "M14 3v5h5M9 13h6M9 17h6" }),
        React.createElement("path", { d: "m8 9 1 1 2-2" })),
    baseline: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 4v16M19 4v16M5 8h14M5 16h14" }),
        React.createElement("path", { d: "m9 12 2 2 4-4" })),
    plus: React.createElement("path", { d: "M12 5v14M5 12h14" }),
    search: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "11", cy: "11", r: "7" }),
        React.createElement("path", { d: "m20 20-4-4" })),
    'chevron-left': React.createElement("path", { d: "m15 18-6-6 6-6" }),
    'chevron-right': React.createElement("path", { d: "m9 18 6-6-6-6" }),
    'chevron-down': React.createElement("path", { d: "m6 9 6 6 6-6" }),
    close: React.createElement("path", { d: "M6 6l12 12M18 6 6 18" }),
    sun: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "4" }),
        React.createElement("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" })),
    moon: React.createElement("path", { d: "M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" }),
    monitor: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "13", rx: "2" }),
        React.createElement("path", { d: "M8 21h8M12 17v4" })),
    easy: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 12h14M12 5v14" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "9" })),
    advanced: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
        React.createElement("path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.1.4.3.7.6 1 .3.3.7.4 1.1.4h.1v4h-.1c-.4 0-.8.1-1.1.4-.3.2-.5.6-.6 1Z" })),
    save: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 3h12l2 2v16H5Z" }),
        React.createElement("path", { d: "M8 3v6h8V3M8 21v-7h8v7" })),
    warning: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 3 2.8 19a2 2 0 0 0 1.73 3h14.94a2 2 0 0 0 1.73-3Z" }),
        React.createElement("path", { d: "M12 9v5M12 18h.01" })),
    check: React.createElement("path", { d: "m4 12 5 5L20 6" }),
    info: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("path", { d: "M12 11v6M12 7h.01" })),
    download: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 3v12M7 10l5 5 5-5" }),
        React.createElement("path", { d: "M4 21h16" })),
    upload: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 21V9M7 14l5-5 5 5" }),
        React.createElement("path", { d: "M4 3h16" })),
    copy: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "8", y: "8", width: "12", height: "12", rx: "2" }),
        React.createElement("path", { d: "M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" })),
    archive: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M4 7h16v14H4Z" }),
        React.createElement("path", { d: "M3 3h18v4H3M9 11h6" })),
    trash: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" })),
    more: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "5", cy: "12", r: "1" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "1" }),
        React.createElement("circle", { cx: "19", cy: "12", r: "1" })),
    edit: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m4 20 4.5-1L19 8.5 15.5 5 5 15.5Z" }),
        React.createElement("path", { d: "m13.5 7 3.5 3.5" })),
    filter: React.createElement("path", { d: "M3 5h18l-7 8v6l-4 2v-8Z" }),
    table: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "1" }),
        React.createElement("path", { d: "M3 10h18M9 4v16M15 4v16" })),
    cards: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "8", height: "7", rx: "1" }),
        React.createElement("rect", { x: "13", y: "4", width: "8", height: "7", rx: "1" }),
        React.createElement("rect", { x: "3", y: "13", width: "8", height: "7", rx: "1" }),
        React.createElement("rect", { x: "13", y: "13", width: "8", height: "7", rx: "1" })),
    tree: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 4v16M5 8h6M5 16h6" }),
        React.createElement("rect", { x: "11", y: "5", width: "8", height: "6", rx: "1" }),
        React.createElement("rect", { x: "11", y: "13", width: "8", height: "6", rx: "1" })),
    chart: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" })),
    graph: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "5", cy: "12", r: "2" }),
        React.createElement("circle", { cx: "12", cy: "5", r: "2" }),
        React.createElement("circle", { cx: "19", cy: "12", r: "2" }),
        React.createElement("circle", { cx: "12", cy: "19", r: "2" }),
        React.createElement("path", { d: "m7 10 3-3M14 7l3 3M17 14l-3 3M10 17l-3-3" })),
    document: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M6 3h9l4 4v14H6Z" }),
        React.createElement("path", { d: "M14 3v5h5M9 13h6M9 17h6" })),
    link: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" }),
        React.createElement("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.15-1.15" })),
    calendar: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
        React.createElement("path", { d: "M16 3v4M8 3v4M3 10h18" })),
    kanban: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
        React.createElement("rect", { x: "10", y: "4", width: "5", height: "10", rx: "1" }),
        React.createElement("rect", { x: "17", y: "4", width: "4", height: "13", rx: "1" })),
    budget: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("path", { d: "M16 8.5c-.7-1-2-1.5-3.5-1.5-2 0-3.5 1-3.5 2.5S10.5 12 12.5 12s3.5 1 3.5 2.5S14.5 17 12.5 17c-1.7 0-3-.6-3.7-1.7M12 5v14" })),
    settings: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
        React.createElement("path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.1.4.3.7.6 1 .3.3.7.4 1.1.4h.1v4h-.1c-.4 0-.8.1-1.1.4-.3.2-.5.6-.6 1Z" })),
    menu: React.createElement("path", { d: "M4 6h16M4 12h16M4 18h16" }),
    refresh: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M20 7v5h-5" }),
        React.createElement("path", { d: "M4 17v-5h5" }),
        React.createElement("path", { d: "M18.5 9A7 7 0 0 0 6 6.5L4 9M5.5 15A7 7 0 0 0 18 17.5l2-2.5" })),
    print: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }),
        React.createElement("rect", { x: "6", y: "14", width: "12", height: "7" })),
    'arrow-right': React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 12h14M14 7l5 5-5 5" })),
    'arrow-up': React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 19V5M7 10l5-5 5 5" })),
    'arrow-down': React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 5v14M7 14l5 5 5-5" })),
    eye: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "2.5" })),
    play: React.createElement("path", { d: "m8 5 11 7-11 7Z" }),
    stop: React.createElement("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1" }),
    lock: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "5", y: "10", width: "14", height: "11", rx: "2" }),
        React.createElement("path", { d: "M8 10V7a4 4 0 0 1 8 0v3" })),
    unlock: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "5", y: "10", width: "14", height: "11", rx: "2" }),
        React.createElement("path", { d: "M8 10V7a4 4 0 0 1 7-2.6" })),
    help: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("path", { d: "M9.5 9a2.7 2.7 0 1 1 4.6 2c-1.1 1-2.1 1.3-2.1 3M12 18h.01" }))
};
function Icon({ name, size = 18, ...props }) {
    return (React.createElement("svg", { viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...props }, paths[name]));
}

},
"src/components/Modal.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = Modal;
const react_1 = require("react");
const ui_1 = require("./ui");
function Modal({ open, onClose, title, description, children, footer, width = 'medium' }) {
    (0, react_1.useEffect)(() => {
        if (!open)
            return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (event) => {
            if (event.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);
    if (!open)
        return null;
    return (React.createElement("div", { className: "modal-backdrop", role: "presentation", onMouseDown: (event) => { if (event.target === event.currentTarget)
            onClose(); } },
        React.createElement("section", { className: `modal modal--${width}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title" },
            React.createElement("header", { className: "modal__header" },
                React.createElement("div", null,
                    React.createElement("h2", { id: "modal-title" }, title),
                    description ? React.createElement("p", null, description) : null),
                React.createElement(ui_1.IconButton, { label: "Close", icon: "close", onClick: onClose })),
            React.createElement("div", { className: "modal__body" }, children),
            footer ? React.createElement("footer", { className: "modal__footer" }, footer) : null)));
}

},
"src/components/Progress.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = ProgressBar;
exports.ThresholdBar = ThresholdBar;
function ProgressBar({ value, label, showValue = true, size = 'medium', tone = 'default' }) {
    const clamped = Math.max(0, Math.min(100, value));
    return (React.createElement("div", { className: `progress-block progress-block--${size} progress-block--${tone}` },
        label || showValue ? React.createElement("div", { className: "progress-block__label" },
            label ? React.createElement("span", null, label) : React.createElement("span", null),
            showValue ? React.createElement("strong", null,
                Math.round(value),
                "%") : null) : null,
        React.createElement("div", { className: "progress", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(clamped) },
            React.createElement("span", { style: { width: `${clamped}%` } }))));
}
function ThresholdBar({ minimum = 0, maximum, threshold, target, current, unit }) {
    const position = (value) => value === undefined || maximum === minimum ? undefined : Math.max(0, Math.min(100, ((value - minimum) / (maximum - minimum)) * 100));
    return (React.createElement("div", { className: "threshold-bar", "aria-label": `Current ${current ?? 'not recorded'} ${unit ?? ''}; threshold ${threshold ?? 'not recorded'}; target ${target ?? 'not recorded'}` },
        React.createElement("div", { className: "threshold-bar__track" }),
        threshold !== undefined ? React.createElement("span", { className: "threshold-bar__marker threshold-bar__marker--threshold", style: { left: `${position(threshold)}%` }, title: `Threshold ${threshold} ${unit ?? ''}` }) : null,
        target !== undefined ? React.createElement("span", { className: "threshold-bar__marker threshold-bar__marker--target", style: { left: `${position(target)}%` }, title: `Target ${target} ${unit ?? ''}` }) : null,
        current !== undefined ? React.createElement("span", { className: "threshold-bar__current", style: { left: `${position(current)}%` }, title: `Current ${current} ${unit ?? ''}` }) : null));
}

},
"src/components/RequirementCoupon.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementCoupon = RequirementCoupon;
const calculations_1 = require("../domain/calculations");
const dates_1 = require("../utils/dates");
const text_1 = require("../utils/text");
const Icon_1 = require("./Icon");
const StatusBadge_1 = require("./StatusBadge");
const Progress_1 = require("./Progress");
function RequirementCoupon({ project, requirement, onOpen, compact = false, draggable = false, onDragStart, className = '' }) {
    const readiness = (0, calculations_1.requirementReadiness)(project, requirement);
    const verification = (0, calculations_1.deriveVerificationState)(project, requirement);
    const evidence = (0, calculations_1.deriveEvidenceState)(project, requirement);
    const allocation = (0, calculations_1.deriveAllocationState)(requirement);
    const metric = requirement.metric;
    const current = metric?.measuredValue ?? metric?.currentEstimate;
    const linkedBudget = project.projectBudgetLines.filter((line) => line.requirementIds.includes(requirement.id));
    const budget = (0, calculations_1.projectBudgetSummary)(linkedBudget);
    const budgetStatus = linkedBudget.length === 0 ? 'not-linked' : budget.forecast > budget.approved ? 'over-budget' : 'within-budget';
    const linkedWork = project.workItems.filter((item) => requirement.workItemIds.includes(item.id));
    const late = linkedWork.some((item) => item.status !== 'done' && item.plannedFinish && item.plannedFinish < new Date().toISOString().slice(0, 10));
    const blocked = requirement.blockers.length > 0 || linkedWork.some((item) => item.status === 'blocked');
    const stopPropagation = (event) => event.stopPropagation();
    void stopPropagation;
    return (React.createElement("button", { type: "button", className: `requirement-coupon ${compact ? 'requirement-coupon--compact' : ''} ${className}`.trim(), onClick: () => onOpen?.(requirement), draggable: draggable, onDragStart: onDragStart },
        React.createElement("div", { className: "requirement-coupon__rail", "aria-hidden": "true" }),
        React.createElement("div", { className: "requirement-coupon__header" },
            React.createElement("div", null,
                React.createElement("span", { className: "requirement-coupon__id" }, requirement.identifier),
                React.createElement("h3", null, requirement.title)),
            React.createElement("span", { className: "requirement-coupon__revision" },
                "R",
                requirement.revision)),
        React.createElement("p", { className: "requirement-coupon__statement" }, (0, text_1.truncate)(requirement.statement || 'Requirement statement not yet entered.', compact ? 90 : 150)),
        metric ? (React.createElement("div", { className: "coupon-metric" },
            React.createElement("div", null,
                React.createElement("span", null, "Threshold"),
                React.createElement("strong", null,
                    metric.threshold ?? '—',
                    " ",
                    metric.unit)),
            React.createElement("div", null,
                React.createElement("span", null, "Target"),
                React.createElement("strong", null,
                    metric.target ?? '—',
                    " ",
                    metric.unit)),
            React.createElement("div", null,
                React.createElement("span", null, "Current"),
                React.createElement("strong", null,
                    current ?? '—',
                    " ",
                    metric.unit)),
            React.createElement("div", null,
                React.createElement("span", null, "Margin"),
                React.createElement("strong", null,
                    (0, calculations_1.calculateMetricMargin)(metric)?.toFixed(2) ?? '—',
                    " ",
                    metric.unit)))) : null,
        React.createElement("div", { className: "coupon-status-grid" },
            React.createElement("div", null,
                React.createElement("span", null, "Definition"),
                React.createElement(StatusBadge_1.StatusBadge, { value: requirement.statuses.definition, compact: true })),
            React.createElement("div", null,
                React.createElement("span", null, "Allocation"),
                React.createElement(StatusBadge_1.StatusBadge, { value: allocation, compact: true })),
            React.createElement("div", null,
                React.createElement("span", null, "Implementation"),
                React.createElement(StatusBadge_1.StatusBadge, { value: requirement.statuses.implementation, compact: true })),
            React.createElement("div", null,
                React.createElement("span", null, "Verification"),
                React.createElement(StatusBadge_1.StatusBadge, { value: verification, compact: true })),
            !compact ? React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    React.createElement("span", null, "Validation"),
                    React.createElement(StatusBadge_1.StatusBadge, { value: requirement.statuses.validation, compact: true })),
                React.createElement("div", null,
                    React.createElement("span", null, "Evidence"),
                    React.createElement(StatusBadge_1.StatusBadge, { value: evidence, compact: true }))) : null),
        !compact ? React.createElement(Progress_1.ProgressBar, { value: readiness.score, label: "Explainable readiness", size: "small" }) : null,
        React.createElement("div", { className: "requirement-coupon__footer" },
            React.createElement("span", { title: "Owner" },
                React.createElement(Icon_1.Icon, { name: "requirements", size: 14 }),
                " ",
                requirement.owner),
            React.createElement("span", { title: "Due date" },
                React.createElement(Icon_1.Icon, { name: "calendar", size: 14 }),
                " ",
                (0, dates_1.formatDate)(requirement.dueDate)),
            React.createElement("span", { title: "Supporting artifacts" },
                React.createElement(Icon_1.Icon, { name: "document", size: 14 }),
                " ",
                requirement.evidenceIds.length),
            late ? React.createElement("span", { className: "coupon-flag coupon-flag--danger" },
                React.createElement(Icon_1.Icon, { name: "warning", size: 13 }),
                " Late") : null,
            blocked ? React.createElement("span", { className: "coupon-flag coupon-flag--danger" },
                React.createElement(Icon_1.Icon, { name: "lock", size: 13 }),
                " Blocked") : null,
            budgetStatus === 'over-budget' ? React.createElement("span", { className: "coupon-flag coupon-flag--warning" },
                React.createElement(Icon_1.Icon, { name: "budget", size: 13 }),
                " Over budget") : null),
        !compact && requirement.nextAction ? React.createElement("div", { className: "requirement-coupon__next" },
            React.createElement("span", null, "Next"),
            requirement.nextAction) : null));
}

},
"src/components/RequirementInspector.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementInspector = RequirementInspector;
const react_1 = require("react");
const calculations_1 = require("../domain/calculations");
const factory_1 = require("../domain/factory");
const ProjectContext_1 = require("../hooks/ProjectContext");
const reports_1 = require("../services/reports");
const dates_1 = require("../utils/dates");
const text_1 = require("../utils/text");
const ui_1 = require("./ui");
const Progress_1 = require("./Progress");
const StatusBadge_1 = require("./StatusBadge");
const Tabs_1 = require("./Tabs");
const Icon_1 = require("./Icon");
function requirementQuality(requirement) {
    const issues = [];
    const statement = requirement.statement.toLowerCase();
    const vague = ['fast', 'easy', 'robust', 'sufficient', 'user-friendly', 'appropriate', 'adequate'];
    vague.forEach((word) => { if (new RegExp(`\\b${word}\\b`).test(statement))
        issues.push(`Possible subjective term: “${word}”`); });
    if (!/\bshall\b|\bmust\b|\bwill\b/.test(statement))
        issues.push('The obligation may not use an explicit normative verb.');
    if ((statement.match(/\bshall\b/g) ?? []).length > 1)
        issues.push('The statement may contain multiple obligations.');
    if (!requirement.source.trim())
        issues.push('Source is not recorded.');
    if (!requirement.rationale.trim())
        issues.push('Rationale is not recorded.');
    if (requirement.metric && !requirement.metric.unit.trim())
        issues.push('The structured metric has no unit.');
    if (requirement.metric && requirement.metric.threshold === undefined && requirement.metric.comparisonDirection !== 'descriptive')
        issues.push('The structured metric has no threshold.');
    if (requirement.verificationIntent.method === 'not-yet-determined')
        issues.push('Verification method is not yet determined.');
    if (!requirement.verificationIntent.acceptanceCriteria.trim())
        issues.push('Acceptance criteria are missing.');
    return issues;
}
function RequirementInspector({ requirementId, onClose }) {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const requirement = project.requirements.find((record) => record.id === requirementId);
    const [tab, setTab] = (0, react_1.useState)('dossier');
    const [draft, setDraft] = (0, react_1.useState)(requirement ? structuredClone(requirement) : undefined);
    (0, react_1.useEffect)(() => {
        setDraft(requirement ? structuredClone(requirement) : undefined);
        setTab('dossier');
    }, [requirementId, requirement?.revision]);
    const completeness = (0, react_1.useMemo)(() => requirement ? (0, calculations_1.calculateRequirementCompleteness)(requirement) : undefined, [requirement]);
    const readiness = (0, react_1.useMemo)(() => requirement ? (0, calculations_1.requirementReadiness)(project, requirement) : undefined, [project, requirement]);
    const closure = (0, react_1.useMemo)(() => requirement ? (0, calculations_1.verificationClosure)(project, requirement) : undefined, [project, requirement]);
    const quality = (0, react_1.useMemo)(() => requirement ? requirementQuality(requirement) : [], [requirement]);
    if (!requirement || !draft) {
        return (React.createElement("aside", { className: "inspector inspector--empty" },
            React.createElement("div", { className: "inspector__placeholder" },
                React.createElement(Icon_1.Icon, { name: "requirements", size: 28 }),
                React.createElement("h3", null, "No requirement selected"),
                React.createElement("p", null, "Select a requirement to open its authoritative dossier."))));
    }
    const save = () => {
        const changed = JSON.stringify({ title: requirement.title, statement: requirement.statement, owner: requirement.owner, reviewer: requirement.reviewer, dueDate: requirement.dueDate, nextAction: requirement.nextAction, blockers: requirement.blockers, statuses: requirement.statuses, notes: requirement.notes })
            !== JSON.stringify({ title: draft.title, statement: draft.statement, owner: draft.owner, reviewer: draft.reviewer, dueDate: draft.dueDate, nextAction: draft.nextAction, blockers: draft.blockers, statuses: draft.statuses, notes: draft.notes });
        if (!changed) {
            notify('No requirement changes to save.', 'info');
            return;
        }
        updateProject((projectDraft) => {
            const index = projectDraft.requirements.findIndex((record) => record.id === requirement.id);
            if (index < 0)
                return;
            const next = structuredClone(draft);
            next.revision = requirement.revision + 1;
            next.updatedAt = new Date().toISOString();
            next.history = [...requirement.history, (0, factory_1.historyEntry)('Requirement revised', next.revision, 'Edited in the requirement dossier.')];
            projectDraft.requirements[index] = next;
        }, `Revised ${requirement.identifier}`);
        notify(`${requirement.identifier} revised.`, 'success');
    };
    const archive = () => {
        updateProject((projectDraft) => {
            const record = projectDraft.requirements.find((candidate) => candidate.id === requirement.id);
            if (!record)
                return;
            record.archived = !record.archived;
            record.lifecycleState = record.archived ? 'retired' : 'draft';
            record.revision += 1;
            record.updatedAt = new Date().toISOString();
            record.history.push((0, factory_1.historyEntry)(record.archived ? 'Requirement archived' : 'Requirement restored', record.revision));
        });
        notify(requirement.archived ? 'Requirement restored.' : 'Requirement archived.', 'success');
    };
    const functions = project.functions.filter((record) => requirement.functionIds.includes(record.id));
    const objects = project.objects.filter((record) => requirement.objectIds.includes(record.id));
    const plans = project.verificationPlans.filter((record) => requirement.verificationPlanIds.includes(record.id));
    const executions = project.testExecutions.filter((record) => requirement.testExecutionIds.includes(record.id));
    const failures = project.failureModes.filter((record) => requirement.failureModeIds.includes(record.id));
    const evidence = (0, calculations_1.evidenceForRequirement)(project, requirement);
    const work = project.workItems.filter((record) => requirement.workItemIds.includes(record.id));
    const parent = project.requirements.find((record) => record.id === requirement.parentId);
    const children = project.requirements.filter((record) => requirement.childIds.includes(record.id));
    const metric = requirement.metric;
    const rangeMax = metric ? Math.max(metric.threshold ?? 0, metric.target ?? 0, metric.currentEstimate ?? 0, metric.measuredValue ?? 0, 1) * 1.2 : 1;
    return (React.createElement("aside", { className: "inspector" },
        React.createElement("header", { className: "inspector__header" },
            React.createElement("div", null,
                React.createElement("span", null,
                    requirement.identifier,
                    " \u00B7 Revision ",
                    requirement.revision),
                React.createElement("h2", null, requirement.title)),
            React.createElement(ui_1.IconButton, { label: "Close inspector", icon: "close", onClick: onClose })),
        React.createElement("div", { className: "inspector__summary-strip" },
            React.createElement(StatusBadge_1.StatusBadge, { value: requirement.statuses.definition, compact: true }),
            React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveVerificationState)(project, requirement), compact: true }),
            React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveEvidenceState)(project, requirement), compact: true })),
        React.createElement(Tabs_1.Tabs, { active: tab, onChange: setTab, options: [
                { id: 'dossier', label: 'Dossier' },
                { id: 'status', label: 'Status' },
                { id: 'links', label: 'Thread' },
                { id: 'history', label: 'History' }
            ] }),
        React.createElement("div", { className: "inspector__body" },
            tab === 'dossier' ? React.createElement("div", { className: "inspector-stack" },
                React.createElement("div", { className: "inspector-actions" },
                    React.createElement(ui_1.Button, { icon: "download", size: "small", onClick: () => (0, reports_1.downloadRequirementDossier)(project, requirement) }, "Dossier"),
                    React.createElement(ui_1.Button, { icon: requirement.archived ? 'refresh' : 'archive', size: "small", variant: "ghost", onClick: archive }, requirement.archived ? 'Restore' : 'Archive')),
                React.createElement(ui_1.Field, { label: "Short title" },
                    React.createElement(ui_1.Input, { value: draft.title, onChange: (event) => setDraft({ ...draft, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Requirement statement" },
                    React.createElement(ui_1.Textarea, { rows: 5, value: draft.statement, onChange: (event) => setDraft({ ...draft, statement: event.target.value }) })),
                React.createElement("div", { className: "form-grid form-grid--compact" },
                    React.createElement(ui_1.Field, { label: "Owner" },
                        React.createElement(ui_1.Input, { value: draft.owner, onChange: (event) => setDraft({ ...draft, owner: event.target.value }) })),
                    React.createElement(ui_1.Field, { label: "Reviewer" },
                        React.createElement(ui_1.Input, { value: draft.reviewer, onChange: (event) => setDraft({ ...draft, reviewer: event.target.value }) })),
                    React.createElement(ui_1.Field, { label: "Due date" },
                        React.createElement(ui_1.Input, { type: "date", value: draft.dueDate ?? '', onChange: (event) => setDraft({ ...draft, dueDate: event.target.value || undefined }) })),
                    React.createElement(ui_1.Field, { label: "System level" },
                        React.createElement(ui_1.Input, { value: draft.applicableSystemLevel, readOnly: true }))),
                React.createElement(ui_1.Field, { label: "Next action" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: draft.nextAction, onChange: (event) => setDraft({ ...draft, nextAction: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Blockers", hint: "Separate blockers with new lines." },
                    React.createElement(ui_1.Textarea, { rows: 2, value: draft.blockers.join('\n'), onChange: (event) => setDraft({ ...draft, blockers: event.target.value.split('\n').map((value) => value.trim()).filter(Boolean) }) })),
                React.createElement(ui_1.Field, { label: "Notes" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: draft.notes, onChange: (event) => setDraft({ ...draft, notes: event.target.value }) })),
                React.createElement(ui_1.Button, { variant: "primary", icon: "save", onClick: save }, "Save revision"),
                React.createElement("div", { className: "inspector-divider" }),
                React.createElement("h3", null, "Source and rationale"),
                React.createElement("dl", { className: "definition-list" },
                    React.createElement("dt", null, "Source"),
                    React.createElement("dd", null,
                        requirement.source || 'Not recorded',
                        requirement.sourceLocation ? ` · ${requirement.sourceLocation}` : ''),
                    React.createElement("dt", null, "Stakeholder"),
                    React.createElement("dd", null, requirement.stakeholder || 'Not recorded'),
                    React.createElement("dt", null, "Rationale"),
                    React.createElement("dd", null, requirement.rationale || 'Not recorded'),
                    React.createElement("dt", null, "Parent"),
                    React.createElement("dd", null, parent ? `${parent.identifier} · ${parent.title}` : 'Top-level requirement'),
                    React.createElement("dt", null, "Children"),
                    React.createElement("dd", null, children.length ? children.map((record) => record.identifier).join(', ') : 'None')),
                metric ? React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "inspector-divider" }),
                    React.createElement("h3", null, "Technical Performance Measure"),
                    React.createElement("div", { className: "metric-summary-grid" },
                        React.createElement("div", null,
                            React.createElement("span", null, "Threshold"),
                            React.createElement("strong", null,
                                metric.threshold ?? '—',
                                " ",
                                metric.unit)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Target"),
                            React.createElement("strong", null,
                                metric.target ?? '—',
                                " ",
                                metric.unit)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Current"),
                            React.createElement("strong", null,
                                metric.measuredValue ?? metric.currentEstimate ?? '—',
                                " ",
                                metric.unit)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Margin"),
                            React.createElement("strong", null,
                                (0, calculations_1.calculateMetricMargin)(metric)?.toFixed(2) ?? '—',
                                " ",
                                metric.unit))),
                    React.createElement(Progress_1.ThresholdBar, { maximum: rangeMax, threshold: metric.threshold, target: metric.target, current: metric.measuredValue ?? metric.currentEstimate, unit: metric.unit }),
                    React.createElement("small", { className: "muted-text" }, metric.operatingCondition || 'Operating condition not recorded.')) : null,
                React.createElement("div", { className: "inspector-divider" }),
                React.createElement("h3", null, "Requirement quality review"),
                quality.length ? React.createElement("div", { className: "finding-list finding-list--warning" }, quality.map((issue) => React.createElement("div", { key: issue },
                    React.createElement(Icon_1.Icon, { name: "warning", size: 15 }),
                    React.createElement("span", null, issue)))) : React.createElement("div", { className: "finding-list finding-list--success" },
                    React.createElement("div", null,
                        React.createElement(Icon_1.Icon, { name: "check", size: 15 }),
                        React.createElement("span", null, "No current quality heuristics are flagged. Engineering review is still required.")))) : null,
            tab === 'status' ? React.createElement("div", { className: "inspector-stack" },
                React.createElement(Progress_1.ProgressBar, { value: completeness?.percent ?? 0, label: "Definition completeness" }),
                React.createElement(Progress_1.ProgressBar, { value: readiness?.score ?? 0, label: "Explainable readiness" }),
                React.createElement("div", { className: "status-form-grid" },
                    React.createElement(ui_1.Field, { label: "Definition" },
                        React.createElement(ui_1.Select, { value: draft.statuses.definition, onChange: (event) => setDraft({ ...draft, statuses: { ...draft.statuses, definition: event.target.value } }) }, ['draft', 'under-review', 'approved', 'baselined', 'change-pending', 'retired'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                    React.createElement(ui_1.Field, { label: "Implementation" },
                        React.createElement(ui_1.Select, { value: draft.statuses.implementation, onChange: (event) => setDraft({ ...draft, statuses: { ...draft.statuses, implementation: event.target.value } }) }, ['not-started', 'in-progress', 'implemented', 'blocked', 'rework-required'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                    React.createElement(ui_1.Field, { label: "Validation" },
                        React.createElement(ui_1.Select, { value: draft.statuses.validation, onChange: (event) => setDraft({ ...draft, statuses: { ...draft.statuses, validation: event.target.value } }) }, ['not-applicable', 'unplanned', 'planned', 'running', 'accepted', 'rejected', 'conditional'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value)))))),
                React.createElement("div", { className: "derived-status-list" },
                    React.createElement("div", null,
                        React.createElement("span", null, "Allocation"),
                        React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveAllocationState)(requirement) })),
                    React.createElement("div", null,
                        React.createElement("span", null, "Verification"),
                        React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveVerificationState)(project, requirement) })),
                    React.createElement("div", null,
                        React.createElement("span", null, "Evidence"),
                        React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveEvidenceState)(project, requirement) }))),
                React.createElement(ui_1.Button, { variant: "primary", icon: "save", onClick: save }, "Save status revision"),
                React.createElement("div", { className: "inspector-divider" }),
                React.createElement("h3", null, "Verification closure"),
                React.createElement("div", { className: "closure-list" }, closure?.conditions.map((condition) => React.createElement("div", { key: condition.label, className: condition.met ? 'is-met' : 'is-open' },
                    React.createElement(Icon_1.Icon, { name: condition.met ? 'check' : 'close', size: 15 }),
                    React.createElement("span", null, condition.label)))),
                React.createElement("div", { className: "inspector-divider" }),
                React.createElement("h3", null, "Readiness factors"),
                React.createElement("div", { className: "readiness-factor-list" }, readiness?.factors.map((factor) => React.createElement("div", { key: factor.label },
                    React.createElement("span", { className: factor.met ? 'is-met' : 'is-open' }, factor.met ? '✓' : '!'),
                    React.createElement("div", null,
                        React.createElement("strong", null, factor.label),
                        React.createElement("small", null, factor.detail))))),
                completeness?.missing.length ? React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "inspector-divider" }),
                    React.createElement("h3", null, "Missing definition elements"),
                    React.createElement("div", { className: "tag-list" }, completeness.missing.map((value) => React.createElement("span", { key: value }, value)))) : null) : null,
            tab === 'links' ? React.createElement("div", { className: "inspector-stack" },
                React.createElement("div", { className: "thread-section" },
                    React.createElement("h3", null, "Functions"),
                    functions.length ? functions.map((record) => React.createElement("div", { className: "linked-record", key: record.id },
                        React.createElement("span", null, record.identifier),
                        React.createElement("strong", null, record.name))) : React.createElement("p", { className: "muted-text" }, "No function allocation.")),
                React.createElement("div", { className: "thread-arrow" },
                    React.createElement(Icon_1.Icon, { name: "arrow-down" })),
                React.createElement("div", { className: "thread-section" },
                    React.createElement("h3", null, "Implementation objects"),
                    objects.length ? objects.map((record) => React.createElement("div", { className: "linked-record", key: record.id },
                        React.createElement("span", null,
                            record.identifier,
                            " \u00B7 ",
                            record.domain),
                        React.createElement("strong", null, record.name))) : React.createElement("p", { className: "muted-text" }, "No object allocation.")),
                React.createElement("div", { className: "thread-arrow" },
                    React.createElement(Icon_1.Icon, { name: "arrow-down" })),
                React.createElement("div", { className: "thread-section" },
                    React.createElement("h3", null, "Verification plans and results"),
                    plans.length ? plans.map((record) => React.createElement("div", { className: "linked-record", key: record.id },
                        React.createElement("span", null,
                            record.identifier,
                            " \u00B7 ",
                            (0, text_1.humanize)(record.approvalState)),
                        React.createElement("strong", null, record.title))) : React.createElement("p", { className: "muted-text" }, "No verification plan."),
                    executions.map((record) => React.createElement("div", { className: "linked-record linked-record--result", key: record.id },
                        React.createElement(StatusBadge_1.StatusBadge, { value: record.result, compact: true }),
                        React.createElement("strong", null,
                            record.identifier,
                            " \u00B7 ",
                            (0, dates_1.formatDate)(record.executedAt)),
                        React.createElement("small", null, record.systemConfiguration)))),
                React.createElement("div", { className: "thread-arrow" },
                    React.createElement(Icon_1.Icon, { name: "arrow-down" })),
                React.createElement("div", { className: "thread-section" },
                    React.createElement("h3", null, "Evidence"),
                    evidence.length ? evidence.map((record) => React.createElement("div", { className: "linked-record", key: record.id },
                        React.createElement("span", null,
                            record.identifier,
                            " \u00B7 R",
                            record.revision),
                        React.createElement("strong", null, record.title),
                        React.createElement(StatusBadge_1.StatusBadge, { value: record.status, compact: true }))) : React.createElement("p", { className: "muted-text" }, "No evidence.")),
                React.createElement("div", { className: "inspector-divider" }),
                React.createElement("h3", null, "Failure analysis"),
                failures.length ? failures.map((record) => React.createElement("div", { className: "linked-record linked-record--finding", key: record.id },
                    React.createElement(StatusBadge_1.StatusBadge, { value: record.criticalityCategory, compact: true }),
                    React.createElement("strong", null,
                        record.identifier,
                        " \u00B7 ",
                        record.failureMode),
                    React.createElement("small", null, record.recommendedMitigation || 'Mitigation not yet defined.'))) : React.createElement("p", { className: "muted-text" }, "No failure hypothesis."),
                React.createElement("div", { className: "inspector-divider" }),
                React.createElement("h3", null, "Connected work"),
                work.length ? work.map((record) => React.createElement("div", { className: "linked-record", key: record.id },
                    React.createElement(StatusBadge_1.StatusBadge, { value: record.status, compact: true }),
                    React.createElement("strong", null,
                        record.identifier,
                        " \u00B7 ",
                        record.title),
                    React.createElement("small", null,
                        record.owner,
                        " \u00B7 ",
                        (0, dates_1.formatDate)(record.dueDate)))) : React.createElement("p", { className: "muted-text" }, "No work item connected.")) : null,
            tab === 'history' ? React.createElement("div", { className: "inspector-stack" },
                React.createElement("div", { className: "record-meta" },
                    React.createElement("div", null,
                        React.createElement("span", null, "Created"),
                        React.createElement("strong", null, (0, dates_1.formatDateTime)(requirement.createdAt))),
                    React.createElement("div", null,
                        React.createElement("span", null, "Last modified"),
                        React.createElement("strong", null, (0, dates_1.formatDateTime)(requirement.updatedAt))),
                    React.createElement("div", null,
                        React.createElement("span", null, "Baseline membership"),
                        React.createElement("strong", null, requirement.baselineIds.length ? requirement.baselineIds.map((id) => project.baselines.find((record) => record.id === id)?.identifier ?? id).join(', ') : 'Not baselined'))),
                React.createElement("div", { className: "history-list" }, [...requirement.history].reverse().map((entry) => React.createElement("div", { key: entry.id },
                    React.createElement("span", null,
                        "R",
                        entry.revision),
                    React.createElement("div", null,
                        React.createElement("strong", null, entry.action),
                        React.createElement("small", null,
                            (0, dates_1.formatDateTime)(entry.at),
                            " \u00B7 ",
                            entry.by),
                        entry.summary ? React.createElement("p", null, entry.summary) : null))))) : null)));
}

},
"src/components/RequirementWizard.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementWizard = RequirementWizard;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const ProjectContext_1 = require("../hooks/ProjectContext");
const id_1 = require("../utils/id");
const text_1 = require("../utils/text");
const Modal_1 = require("./Modal");
const ui_1 = require("./ui");
const Progress_1 = require("./Progress");
const steps = [
    ['What is required?', 'Capture the obligation, source, rationale, stakeholder, and priority.'],
    ['How well must it perform?', 'Add a threshold, optional target, conditions, and acceptance rule when applicable.'],
    ['How will compliance be verified?', 'Verification may use test, analysis, inspection, demonstration, similarity, certification, or a combination.'],
    ['How could it fail?', 'Capture an initial failure hypothesis without forcing a complete analysis.'],
    ['Which functions satisfy it?', 'Allocate the requirement to one or more distinct functions.'],
    ['Which objects perform those functions?', 'Allocate hardware, software, firmware, human, facility, or external-system objects.'],
    ['Where does it belong?', 'Place the requirement in the decomposition and identify its parent.'],
    ['What supports it?', 'Record the source document or first evidence artifact.'],
    ['Who owns the next action?', 'Create the connected work needed to advance this requirement.']
];
const initialState = {
    title: '',
    statement: '',
    source: '',
    sourceLocation: '',
    stakeholder: '',
    rationale: '',
    requirementType: 'system',
    priority: 'normal',
    owner: 'Unassigned',
    reviewer: '',
    metricEnabled: true,
    metric: '',
    unit: '',
    threshold: '',
    target: '',
    tolerance: '',
    comparisonDirection: 'at-least',
    operatingCondition: '',
    measurementCondition: '',
    acceptanceCriteria: '',
    verificationMethod: 'test',
    verificationLevel: 'system',
    verificationOwner: 'Verification Lead',
    plannedDate: '',
    requiredConfiguration: '',
    requiredEnvironment: '',
    requiredEquipment: '',
    requiredEvidence: 'Approved result with supporting data',
    createVerificationPlan: true,
    failureMode: '',
    failureCause: '',
    localEffect: '',
    nextHigherEffect: '',
    endEffect: '',
    detectionMethod: '',
    mitigation: '',
    severity: '5',
    likelihood: '3',
    detectability: '3',
    functionIds: [],
    objectIds: [],
    parentId: '',
    systemLevel: 'System',
    operatingMode: 'All modes',
    environment: '',
    assumptions: '',
    constraints: '',
    documentTitle: '',
    documentType: 'Source document',
    documentSource: '',
    nextAction: '',
    dueDate: '',
    workTitle: '',
    workPriority: 'normal',
    milestone: false,
    blocker: ''
};
const numberOrUndefined = (value) => value.trim() === '' ? undefined : Number(value);
function RequirementWizard({ open, onClose, onCreated }) {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [step, setStep] = (0, react_1.useState)(0);
    const [state, setState] = (0, react_1.useState)(initialState);
    const current = steps[step];
    const progress = ((step + 1) / steps.length) * 100;
    const canContinue = step !== 0 || Boolean(state.statement.trim());
    const requirementIdentifier = (0, react_1.useMemo)(() => (0, id_1.nextIdentifier)('REQ', project.requirements.map((record) => record.identifier)), [project.requirements]);
    const set = (key, value) => setState((previous) => ({ ...previous, [key]: value }));
    const toggleArray = (key, id) => {
        setState((previous) => ({
            ...previous,
            [key]: previous[key].includes(id) ? previous[key].filter((value) => value !== id) : [...previous[key], id]
        }));
    };
    const reset = () => {
        setStep(0);
        setState(initialState);
    };
    const close = () => {
        reset();
        onClose();
    };
    const save = (asDraft) => {
        if (!state.statement.trim()) {
            notify('Enter a requirement statement before saving.', 'warning');
            setStep(0);
            return;
        }
        const requirement = (0, factory_1.emptyRequirement)(requirementIdentifier);
        requirement.title = state.title.trim() || state.statement.trim().slice(0, 72);
        requirement.statement = state.statement.trim();
        requirement.source = state.source.trim();
        requirement.sourceLocation = state.sourceLocation.trim();
        requirement.stakeholder = state.stakeholder.trim();
        requirement.rationale = state.rationale.trim();
        requirement.requirementType = state.requirementType;
        requirement.priority = state.priority;
        requirement.owner = state.owner.trim() || 'Unassigned';
        requirement.reviewer = state.reviewer.trim();
        requirement.parentId = state.parentId || undefined;
        requirement.applicableSystemLevel = state.systemLevel.trim() || 'System';
        requirement.applicableOperatingMode = state.operatingMode.trim() || 'All modes';
        requirement.applicableEnvironment = state.environment.trim();
        requirement.assumptions = (0, text_1.parseList)(state.assumptions);
        requirement.constraints = (0, text_1.parseList)(state.constraints);
        requirement.verificationIntent = {
            method: state.verificationMethod,
            level: state.verificationLevel,
            acceptanceCriteria: state.acceptanceCriteria.trim(),
            owner: state.verificationOwner.trim() || requirement.owner,
            plannedDate: state.plannedDate || undefined,
            requiredConfiguration: state.requiredConfiguration.trim(),
            requiredEnvironment: state.requiredEnvironment.trim(),
            requiredEquipment: state.requiredEquipment.trim(),
            requiredEvidence: state.requiredEvidence.trim()
        };
        requirement.functionIds = [...state.functionIds];
        requirement.objectIds = [...state.objectIds];
        requirement.dueDate = state.dueDate || undefined;
        requirement.blockers = state.blocker.trim() ? [state.blocker.trim()] : [];
        requirement.nextAction = state.nextAction.trim() || (asDraft ? 'Complete requirement definition.' : 'Review and approve the requirement.');
        requirement.statuses.definition = asDraft ? 'draft' : 'under-review';
        requirement.statuses.allocation = state.functionIds.length && state.objectIds.length ? 'fully-allocated' : state.functionIds.length || state.objectIds.length ? 'partially-allocated' : 'unallocated';
        requirement.statuses.verification = state.verificationMethod === 'not-yet-determined' ? 'unplanned' : 'planned';
        requirement.statuses.evidence = state.documentTitle.trim() ? 'incomplete' : 'missing';
        if (state.metricEnabled && (state.metric.trim() || state.threshold.trim() || state.target.trim())) {
            const metric = {
                metric: state.metric.trim(),
                unit: state.unit.trim(),
                threshold: numberOrUndefined(state.threshold),
                target: numberOrUndefined(state.target),
                tolerance: numberOrUndefined(state.tolerance),
                operatingCondition: state.operatingCondition.trim(),
                measurementCondition: state.measurementCondition.trim(),
                comparisonDirection: state.comparisonDirection,
                confidence: 25,
                trend: []
            };
            requirement.metric = metric;
        }
        let verificationPlan;
        if (state.createVerificationPlan && state.verificationMethod !== 'not-yet-determined') {
            verificationPlan = {
                ...(0, factory_1.controlledRecord)('ver', (0, id_1.nextIdentifier)('VER', project.verificationPlans.map((record) => record.identifier)), `${requirement.title} verification`, state.verificationOwner || requirement.owner, 'draft'),
                requirementIds: [requirement.id],
                verificationMethod: state.verificationMethod,
                verificationLevel: state.verificationLevel,
                objective: `Verify ${requirement.identifier}: ${requirement.title}`,
                acceptanceCriteria: state.acceptanceCriteria.trim(),
                preconditions: '',
                configuration: state.requiredConfiguration.trim(),
                environment: state.requiredEnvironment.trim(),
                equipment: state.requiredEquipment.trim(),
                instrumentation: '',
                personnel: state.verificationOwner.trim(),
                safetyConsiderations: '',
                procedure: '',
                dataToCollect: state.requiredEvidence.trim(),
                sampleSize: '',
                passFailLogic: state.acceptanceCriteria.trim(),
                reviewer: state.reviewer.trim(),
                plannedDate: state.plannedDate || undefined,
                dependencyIds: [],
                documentIds: [],
                approvalState: 'draft',
                testCaseIds: []
            };
            requirement.verificationPlanIds.push(verificationPlan.id);
        }
        let failureMode;
        if (state.failureMode.trim()) {
            const severity = Number(state.severity) || 1;
            const likelihood = Number(state.likelihood) || 1;
            const detectability = Number(state.detectability) || 1;
            failureMode = {
                ...(0, factory_1.controlledRecord)('fm', (0, id_1.nextIdentifier)('FMECA', project.failureModes.map((record) => record.identifier)), state.failureMode.trim(), state.owner || 'Unassigned', 'draft'),
                sourceType: 'requirement',
                sourceId: requirement.id,
                operatingMode: state.operatingMode.trim(),
                failureMode: state.failureMode.trim(),
                cause: state.failureCause.trim(),
                localEffect: state.localEffect.trim(),
                nextHigherEffect: state.nextHigherEffect.trim(),
                endEffect: state.endEffect.trim(),
                detectionMethod: state.detectionMethod.trim(),
                preventionControl: '',
                detectionControl: '',
                severity,
                likelihood,
                detectability,
                criticalityCategory: (0, calculations_1.criticalityCategory)(severity * likelihood * detectability),
                hazardRelationship: '',
                requirementIds: [requirement.id],
                interfaceIds: [],
                verificationPlanIds: verificationPlan ? [verificationPlan.id] : [],
                recommendedMitigation: state.mitigation.trim(),
                actionOwner: state.owner || 'Unassigned',
                dueDate: state.dueDate || undefined,
                mitigationStatus: state.mitigation.trim() ? 'planned' : 'open',
                residualSeverity: severity,
                residualLikelihood: likelihood,
                residualCriticalityCategory: (0, calculations_1.criticalityCategory)(severity * likelihood),
                evidenceIds: [],
                reviewStatus: 'draft'
            };
            requirement.failureModeIds.push(failureMode.id);
        }
        let workItem;
        if (state.workTitle.trim() || state.nextAction.trim()) {
            const title = state.workTitle.trim() || state.nextAction.trim();
            workItem = {
                ...(0, factory_1.controlledRecord)('work', (0, id_1.nextIdentifier)('WORK', project.workItems.map((record) => record.identifier)), title, state.owner || 'Unassigned', 'planned'),
                description: state.nextAction.trim(),
                status: state.blocker.trim() ? 'blocked' : 'backlog',
                priority: state.workPriority,
                plannedStart: undefined,
                plannedFinish: state.dueDate || undefined,
                forecastFinish: state.dueDate || undefined,
                durationDays: 1,
                percentComplete: 0,
                milestone: state.milestone,
                predecessorIds: [],
                successorIds: [],
                baselineStart: undefined,
                baselineFinish: undefined,
                requirementIds: [requirement.id],
                functionIds: [...state.functionIds],
                objectIds: [...state.objectIds],
                verificationPlanIds: verificationPlan ? [verificationPlan.id] : [],
                failureModeIds: failureMode ? [failureMode.id] : [],
                documentIds: [],
                budgetLineIds: [],
                blockedReason: state.blocker.trim(),
                dueDate: state.dueDate || undefined
            };
            requirement.workItemIds.push(workItem.id);
        }
        const documentId = state.documentTitle.trim() ? (0, id_1.createId)('doc') : undefined;
        if (documentId)
            requirement.evidenceIds.push(documentId);
        updateProject((draft) => {
            draft.requirements.push(requirement);
            if (requirement.parentId) {
                const parent = draft.requirements.find((record) => record.id === requirement.parentId);
                if (parent && !parent.childIds.includes(requirement.id))
                    parent.childIds.push(requirement.id);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'decomposes-into', fromId: requirement.parentId, toId: requirement.id, rationale: 'Created as a child requirement.', createdAt: new Date().toISOString(), createdBy: requirement.owner });
            }
            requirement.functionIds.forEach((functionId) => {
                const record = draft.functions.find((candidate) => candidate.id === functionId);
                if (record && !record.requirementIds.includes(requirement.id))
                    record.requirementIds.push(requirement.id);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'allocated-to', fromId: requirement.id, toId: functionId, rationale: '', createdAt: new Date().toISOString(), createdBy: requirement.owner });
            });
            requirement.objectIds.forEach((objectId) => {
                const record = draft.objects.find((candidate) => candidate.id === objectId);
                if (record && !record.requirementIds.includes(requirement.id))
                    record.requirementIds.push(requirement.id);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'realized-by', fromId: requirement.id, toId: objectId, rationale: '', createdAt: new Date().toISOString(), createdBy: requirement.owner });
            });
            if (verificationPlan) {
                draft.verificationPlans.push(verificationPlan);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'verified-by', fromId: requirement.id, toId: verificationPlan.id, rationale: '', createdAt: new Date().toISOString(), createdBy: requirement.owner });
            }
            if (failureMode)
                draft.failureModes.push(failureMode);
            if (workItem) {
                draft.workItems.push(workItem);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'scheduled-by', fromId: requirement.id, toId: workItem.id, rationale: '', createdAt: new Date().toISOString(), createdBy: requirement.owner });
            }
            if (documentId) {
                draft.documents.push({
                    ...(0, factory_1.controlledRecord)('doc', (0, id_1.nextIdentifier)('DOC', project.documents.map((record) => record.identifier)), state.documentTitle.trim(), requirement.owner, 'draft'),
                    id: documentId,
                    documentType: state.documentType,
                    author: '',
                    date: new Date().toISOString().slice(0, 10),
                    source: state.documentSource.trim(),
                    status: 'draft',
                    description: 'Document reference captured during requirement intake. Attach or link the actual artifact in the Evidence library.',
                    webLink: state.documentSource.startsWith('http') ? state.documentSource : undefined,
                    approvalState: 'draft',
                    linkedRecordIds: [requirement.id]
                });
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'supported-by', fromId: requirement.id, toId: documentId, rationale: '', createdAt: new Date().toISOString(), createdBy: requirement.owner });
            }
        }, `Created ${requirement.identifier}`);
        onCreated(requirement.id);
        notify(`${requirement.identifier} saved ${asDraft ? 'as a draft' : 'for review'}.`, 'success');
        close();
    };
    return (React.createElement(Modal_1.Modal, { open: open, onClose: close, title: `New Requirement · ${requirementIdentifier}`, description: "The record may be saved as a draft at any step. Missing information remains visible rather than being guessed.", width: "wide", footer: React.createElement(React.Fragment, null,
            React.createElement(ui_1.Button, { variant: "ghost", onClick: close }, "Cancel"),
            React.createElement(ui_1.Button, { variant: "secondary", onClick: () => save(true) }, "Save draft"),
            React.createElement("div", { className: "modal__footer-spacer" }),
            React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setStep((value) => Math.max(0, value - 1)), disabled: step === 0 }, "Back"),
            step < steps.length - 1 ? React.createElement(ui_1.Button, { variant: "primary", onClick: () => setStep((value) => Math.min(steps.length - 1, value + 1)), disabled: !canContinue }, "Continue") : React.createElement(ui_1.Button, { variant: "primary", icon: "check", onClick: () => save(false) }, "Save for review")) },
        React.createElement("div", { className: "wizard-layout" },
            React.createElement("aside", { className: "wizard-steps" }, steps.map(([title], index) => (React.createElement("button", { key: title, className: index === step ? 'is-active' : index < step ? 'is-complete' : '', onClick: () => { if (index === 0 || state.statement.trim())
                    setStep(index); } },
                React.createElement("span", null, index < step ? '✓' : index + 1),
                React.createElement("strong", null, title))))),
            React.createElement("div", { className: "wizard-content" },
                React.createElement(Progress_1.ProgressBar, { value: progress, label: `Step ${step + 1} of ${steps.length}`, size: "small" }),
                React.createElement("div", { className: "wizard-content__heading" },
                    React.createElement("span", null,
                        "Step ",
                        step + 1),
                    React.createElement("h3", null, current[0]),
                    React.createElement("p", null, current[1])),
                step === 0 ? React.createElement("div", { className: "form-grid" },
                    React.createElement(ui_1.Field, { label: "Requirement statement", required: true, className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 5, value: state.statement, onChange: (event) => set('statement', event.target.value), placeholder: "The system shall\u2026", autoFocus: true })),
                    React.createElement(ui_1.Field, { label: "Short title", className: "field--wide" },
                        React.createElement(ui_1.Input, { value: state.title, onChange: (event) => set('title', event.target.value), placeholder: "Concise name for the requirement" })),
                    React.createElement(ui_1.Field, { label: "Source" },
                        React.createElement(ui_1.Input, { value: state.source, onChange: (event) => set('source', event.target.value), placeholder: "Stakeholder, contract, standard, decision\u2026" })),
                    React.createElement(ui_1.Field, { label: "Source location" },
                        React.createElement(ui_1.Input, { value: state.sourceLocation, onChange: (event) => set('sourceLocation', event.target.value), placeholder: "Section, paragraph, page, URL\u2026" })),
                    React.createElement(ui_1.Field, { label: "Stakeholder" },
                        React.createElement(ui_1.Input, { value: state.stakeholder, onChange: (event) => set('stakeholder', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Requirement type" },
                        React.createElement(ui_1.Select, { value: state.requirementType, onChange: (event) => set('requirementType', event.target.value) }, ['stakeholder', 'system', 'subsystem', 'functional', 'performance', 'interface', 'physical', 'environmental', 'safety', 'security', 'reliability', 'maintainability', 'manufacturing', 'regulatory', 'operational', 'support', 'disposal', 'user-defined'].map((value) => React.createElement("option", { key: value, value: value }, value.replace(/-/g, ' '))))),
                    React.createElement(ui_1.Field, { label: "Priority" },
                        React.createElement(ui_1.Select, { value: state.priority, onChange: (event) => set('priority', event.target.value) }, ['low', 'normal', 'high', 'critical'].map((value) => React.createElement("option", { key: value }, value)))),
                    React.createElement(ui_1.Field, { label: "Owner" },
                        React.createElement(ui_1.Input, { value: state.owner, onChange: (event) => set('owner', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Reviewer" },
                        React.createElement(ui_1.Input, { value: state.reviewer, onChange: (event) => set('reviewer', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Rationale", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 3, value: state.rationale, onChange: (event) => set('rationale', event.target.value), placeholder: "Why is this requirement necessary?" }))) : null,
                step === 1 ? React.createElement("div", { className: "form-grid" },
                    React.createElement("div", { className: "field--wide" },
                        React.createElement(ui_1.Checkbox, { label: "Use structured threshold and target values", checked: state.metricEnabled, onChange: (event) => set('metricEnabled', event.target.checked), description: "Non-numeric requirements may instead use descriptive acceptance criteria." })),
                    state.metricEnabled ? React.createElement(React.Fragment, null,
                        React.createElement(ui_1.Field, { label: "Metric or parameter" },
                            React.createElement(ui_1.Input, { value: state.metric, onChange: (event) => set('metric', event.target.value), placeholder: "Operating time, mass, latency\u2026" })),
                        React.createElement(ui_1.Field, { label: "Unit" },
                            React.createElement(ui_1.Input, { value: state.unit, onChange: (event) => set('unit', event.target.value), placeholder: "hours, kg, ms\u2026" })),
                        React.createElement(ui_1.Field, { label: "Comparison rule" },
                            React.createElement(ui_1.Select, { value: state.comparisonDirection, onChange: (event) => set('comparisonDirection', event.target.value) }, ['at-least', 'at-most', 'greater-than', 'less-than', 'exact', 'range', 'enumeration', 'boolean', 'date', 'descriptive'].map((value) => React.createElement("option", { key: value, value: value }, value.replace(/-/g, ' '))))),
                        React.createElement(ui_1.Field, { label: "Threshold", hint: "Minimum acceptable level required for acceptance." },
                            React.createElement(ui_1.Input, { type: "number", step: "any", value: state.threshold, onChange: (event) => set('threshold', event.target.value) })),
                        React.createElement(ui_1.Field, { label: "Target", hint: "Desired objective beyond the threshold; optional." },
                            React.createElement(ui_1.Input, { type: "number", step: "any", value: state.target, onChange: (event) => set('target', event.target.value) })),
                        React.createElement(ui_1.Field, { label: "Tolerance" },
                            React.createElement(ui_1.Input, { type: "number", step: "any", value: state.tolerance, onChange: (event) => set('tolerance', event.target.value) })),
                        React.createElement(ui_1.Field, { label: "Operating condition", className: "field--wide" },
                            React.createElement(ui_1.Textarea, { rows: 2, value: state.operatingCondition, onChange: (event) => set('operatingCondition', event.target.value) })),
                        React.createElement(ui_1.Field, { label: "Measurement condition", className: "field--wide" },
                            React.createElement(ui_1.Textarea, { rows: 2, value: state.measurementCondition, onChange: (event) => set('measurementCondition', event.target.value) }))) : null,
                    React.createElement(ui_1.Field, { label: "Acceptance rule", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 3, value: state.acceptanceCriteria, onChange: (event) => set('acceptanceCriteria', event.target.value), placeholder: "State exactly what must be observed or calculated for compliance." }))) : null,
                step === 2 ? React.createElement("div", { className: "form-grid" },
                    React.createElement(ui_1.Field, { label: "Verification method" },
                        React.createElement(ui_1.Select, { value: state.verificationMethod, onChange: (event) => set('verificationMethod', event.target.value) }, ['test', 'analysis', 'inspection', 'demonstration', 'similarity', 'certification', 'combination', 'not-yet-determined'].map((value) => React.createElement("option", { key: value, value: value }, value.replace(/-/g, ' '))))),
                    React.createElement(ui_1.Field, { label: "Verification level" },
                        React.createElement(ui_1.Select, { value: state.verificationLevel, onChange: (event) => set('verificationLevel', event.target.value) }, ['unit', 'integration', 'subsystem', 'system', 'operational'].map((value) => React.createElement("option", { key: value }, value)))),
                    React.createElement(ui_1.Field, { label: "Responsible owner" },
                        React.createElement(ui_1.Input, { value: state.verificationOwner, onChange: (event) => set('verificationOwner', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Planned date" },
                        React.createElement(ui_1.Input, { type: "date", value: state.plannedDate, onChange: (event) => set('plannedDate', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Required configuration", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 2, value: state.requiredConfiguration, onChange: (event) => set('requiredConfiguration', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Required environment" },
                        React.createElement(ui_1.Input, { value: state.requiredEnvironment, onChange: (event) => set('requiredEnvironment', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Required equipment" },
                        React.createElement(ui_1.Input, { value: state.requiredEquipment, onChange: (event) => set('requiredEquipment', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Required evidence", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 2, value: state.requiredEvidence, onChange: (event) => set('requiredEvidence', event.target.value) })),
                    React.createElement("div", { className: "field--wide" },
                        React.createElement(ui_1.Checkbox, { label: "Create a linked verification plan now", checked: state.createVerificationPlan, onChange: (event) => set('createVerificationPlan', event.target.checked), description: "The plan remains a draft until its procedure, configuration, and review are complete." }))) : null,
                step === 3 ? React.createElement("div", { className: "form-grid" },
                    React.createElement(ui_1.Field, { label: "Failure mode", className: "field--wide" },
                        React.createElement(ui_1.Input, { value: state.failureMode, onChange: (event) => set('failureMode', event.target.value), placeholder: "What could fail to occur, occur incorrectly, or occur at the wrong time?" })),
                    React.createElement(ui_1.Field, { label: "Potential cause", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 2, value: state.failureCause, onChange: (event) => set('failureCause', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Local effect" },
                        React.createElement(ui_1.Textarea, { rows: 2, value: state.localEffect, onChange: (event) => set('localEffect', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Next-higher-level effect" },
                        React.createElement(ui_1.Textarea, { rows: 2, value: state.nextHigherEffect, onChange: (event) => set('nextHigherEffect', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "End effect", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 2, value: state.endEffect, onChange: (event) => set('endEffect', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Detection method" },
                        React.createElement(ui_1.Input, { value: state.detectionMethod, onChange: (event) => set('detectionMethod', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Initial mitigation" },
                        React.createElement(ui_1.Input, { value: state.mitigation, onChange: (event) => set('mitigation', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Severity (1\u201310)" },
                        React.createElement(ui_1.Input, { type: "number", min: "1", max: "10", value: state.severity, onChange: (event) => set('severity', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Likelihood (1\u201310)" },
                        React.createElement(ui_1.Input, { type: "number", min: "1", max: "10", value: state.likelihood, onChange: (event) => set('likelihood', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Detectability (1\u201310)" },
                        React.createElement(ui_1.Input, { type: "number", min: "1", max: "10", value: state.detectability, onChange: (event) => set('detectability', event.target.value) }))) : null,
                step === 4 ? React.createElement("div", { className: "selection-list" }, project.functions.length ? project.functions.filter((record) => !record.archived).map((record) => React.createElement("label", { key: record.id, className: state.functionIds.includes(record.id) ? 'is-selected' : '' },
                    React.createElement("input", { type: "checkbox", checked: state.functionIds.includes(record.id), onChange: () => toggleArray('functionIds', record.id) }),
                    React.createElement("span", null,
                        React.createElement("strong", null,
                            record.identifier,
                            " \u00B7 ",
                            record.name),
                        React.createElement("small", null, record.description || 'No description recorded.')))) : React.createElement("div", { className: "wizard-empty" }, "No functions exist yet. Save the requirement and create functions in Architecture.")) : null,
                step === 5 ? React.createElement("div", { className: "selection-list selection-list--objects" }, project.objects.length ? project.objects.filter((record) => !record.archived).map((record) => React.createElement("label", { key: record.id, className: state.objectIds.includes(record.id) ? 'is-selected' : '' },
                    React.createElement("input", { type: "checkbox", checked: state.objectIds.includes(record.id), onChange: () => toggleArray('objectIds', record.id) }),
                    React.createElement("span", null,
                        React.createElement("strong", null,
                            record.identifier,
                            " \u00B7 ",
                            record.name),
                        React.createElement("small", null,
                            record.domain,
                            " \u00B7 ",
                            record.objectType)))) : React.createElement("div", { className: "wizard-empty" }, "No implementation objects exist yet. Save the requirement and create them in Architecture.")) : null,
                step === 6 ? React.createElement("div", { className: "form-grid" },
                    React.createElement(ui_1.Field, { label: "Parent requirement" },
                        React.createElement(ui_1.Select, { value: state.parentId, onChange: (event) => set('parentId', event.target.value) },
                            React.createElement("option", { value: "" }, "No parent \u2014 top-level requirement"),
                            project.requirements.filter((record) => !record.archived).map((record) => React.createElement("option", { key: record.id, value: record.id },
                                record.identifier,
                                " \u00B7 ",
                                record.title)))),
                    React.createElement(ui_1.Field, { label: "Applicable system level" },
                        React.createElement(ui_1.Input, { value: state.systemLevel, onChange: (event) => set('systemLevel', event.target.value), list: "system-levels" }),
                        React.createElement("datalist", { id: "system-levels" },
                            React.createElement("option", { value: "System" }),
                            React.createElement("option", { value: "Subsystem" }),
                            React.createElement("option", { value: "Assembly" }),
                            React.createElement("option", { value: "Subassembly" }),
                            React.createElement("option", { value: "Component" }),
                            React.createElement("option", { value: "Software service" }),
                            React.createElement("option", { value: "Software module" }))),
                    React.createElement(ui_1.Field, { label: "Operating mode" },
                        React.createElement(ui_1.Input, { value: state.operatingMode, onChange: (event) => set('operatingMode', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Environment" },
                        React.createElement(ui_1.Input, { value: state.environment, onChange: (event) => set('environment', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Assumptions", hint: "Separate items with commas or new lines.", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 3, value: state.assumptions, onChange: (event) => set('assumptions', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Constraints", hint: "Separate items with commas or new lines.", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 3, value: state.constraints, onChange: (event) => set('constraints', event.target.value) }))) : null,
                step === 7 ? React.createElement("div", { className: "form-grid" },
                    React.createElement("div", { className: "callout field--wide" },
                        React.createElement("strong", null, "Document references are not evidence by themselves."),
                        React.createElement("span", null, "This step creates a controlled placeholder in the Evidence library. Attach the actual file or web link there.")),
                    React.createElement(ui_1.Field, { label: "Document or artifact title", className: "field--wide" },
                        React.createElement(ui_1.Input, { value: state.documentTitle, onChange: (event) => set('documentTitle', event.target.value), placeholder: "Source specification, calculation, drawing, procedure\u2026" })),
                    React.createElement(ui_1.Field, { label: "Document type" },
                        React.createElement(ui_1.Input, { value: state.documentType, onChange: (event) => set('documentType', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Source or web link" },
                        React.createElement(ui_1.Input, { value: state.documentSource, onChange: (event) => set('documentSource', event.target.value), placeholder: "Local source description or https://\u2026" }))) : null,
                step === 8 ? React.createElement("div", { className: "form-grid" },
                    React.createElement(ui_1.Field, { label: "Requirement owner" },
                        React.createElement(ui_1.Input, { value: state.owner, onChange: (event) => set('owner', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Due date" },
                        React.createElement(ui_1.Input, { type: "date", value: state.dueDate, onChange: (event) => set('dueDate', event.target.value) })),
                    React.createElement(ui_1.Field, { label: "Next action", className: "field--wide" },
                        React.createElement(ui_1.Textarea, { rows: 3, value: state.nextAction, onChange: (event) => set('nextAction', event.target.value), placeholder: "What specifically must happen next?" })),
                    React.createElement(ui_1.Field, { label: "Connected work-item title", className: "field--wide" },
                        React.createElement(ui_1.Input, { value: state.workTitle, onChange: (event) => set('workTitle', event.target.value), placeholder: "Leave blank to use the next action as the work title." })),
                    React.createElement(ui_1.Field, { label: "Work priority" },
                        React.createElement(ui_1.Select, { value: state.workPriority, onChange: (event) => set('workPriority', event.target.value) }, ['low', 'normal', 'high', 'critical'].map((value) => React.createElement("option", { key: value }, value)))),
                    React.createElement("div", null,
                        React.createElement(ui_1.Checkbox, { label: "This work item is a milestone", checked: state.milestone, onChange: (event) => set('milestone', event.target.checked) })),
                    React.createElement(ui_1.Field, { label: "Blocking condition", className: "field--wide" },
                        React.createElement(ui_1.Input, { value: state.blocker, onChange: (event) => set('blocker', event.target.value), placeholder: "Leave blank when not blocked." }))) : null))));
}

},
"src/components/StatusBadge.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusTone = statusTone;
exports.StatusBadge = StatusBadge;
const text_1 = require("../utils/text");
const success = new Set(['approved', 'baselined', 'fully-allocated', 'implemented', 'passed', 'accepted', 'complete', 'current', 'verified', 'done', 'resolved', 'closed']);
const danger = new Set(['failed', 'rejected', 'critical', 'error', 'rework-required', 'stale']);
const warning = new Set(['blocked', 'high', 'incomplete', 'under-review', 'change-pending', 'conditionally-accepted', 'conditional', 'partially-allocated', 'superseded']);
const muted = new Set(['draft', 'unplanned', 'not-started', 'not-run', 'not-applicable', 'retired', 'backlog']);
function statusTone(value) {
    const normalized = value.toLowerCase();
    if (success.has(normalized))
        return 'success';
    if (danger.has(normalized))
        return 'danger';
    if (warning.has(normalized))
        return 'warning';
    if (muted.has(normalized))
        return 'muted';
    return 'info';
}
function StatusBadge({ value, label, compact = false }) {
    return React.createElement("span", { className: `status-badge status-badge--${statusTone(value)} ${compact ? 'status-badge--compact' : ''}` }, label ?? (0, text_1.humanize)(value));
}

},
"src/components/Tabs.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = Tabs;
const Icon_1 = require("./Icon");
function Tabs({ options, active, onChange, trailing }) {
    return (React.createElement("div", { className: "tabs-row" },
        React.createElement("div", { className: "tabs", role: "tablist" }, options.map((option) => (React.createElement("button", { key: option.id, className: `tab ${active === option.id ? 'is-active' : ''}`, role: "tab", "aria-selected": active === option.id, onClick: () => onChange(option.id) },
            option.icon ? React.createElement(Icon_1.Icon, { name: option.icon, size: 16 }) : null,
            React.createElement("span", null, option.label),
            option.count !== undefined ? React.createElement("span", { className: "tab__count" }, option.count) : null)))),
        trailing ? React.createElement("div", { className: "tabs-row__trailing" }, trailing) : null));
}

},
"src/components/Toast.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = Toast;
const react_1 = require("react");
const ProjectContext_1 = require("../hooks/ProjectContext");
const Icon_1 = require("./Icon");
const ui_1 = require("./ui");
function Toast() {
    const { toast, dismissToast } = (0, ProjectContext_1.useProject)();
    (0, react_1.useEffect)(() => {
        if (!toast)
            return;
        const timer = window.setTimeout(dismissToast, 4200);
        return () => window.clearTimeout(timer);
    }, [toast, dismissToast]);
    if (!toast)
        return null;
    const icon = toast.tone === 'success' ? 'check' : toast.tone === 'danger' || toast.tone === 'warning' ? 'warning' : 'info';
    return (React.createElement("div", { className: `toast toast--${toast.tone}`, role: "status" },
        React.createElement(Icon_1.Icon, { name: icon }),
        React.createElement("span", null, toast.message),
        React.createElement(ui_1.IconButton, { label: "Dismiss notification", icon: "close", onClick: dismissToast })));
}

},
"src/components/ui.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
exports.IconButton = IconButton;
exports.Field = Field;
exports.Input = Input;
exports.Select = Select;
exports.Textarea = Textarea;
exports.Checkbox = Checkbox;
exports.SectionHeader = SectionHeader;
exports.Panel = Panel;
exports.PanelHeader = PanelHeader;
exports.EmptyState = EmptyState;
exports.Kbd = Kbd;
const Icon_1 = require("./Icon");
function Button({ children, icon, variant = 'secondary', size = 'medium', className = '', ...props }) {
    return (React.createElement("button", { className: `button button--${variant} button--${size} ${className}`.trim(), ...props },
        icon ? React.createElement(Icon_1.Icon, { name: icon, size: size === 'small' ? 15 : 18 }) : null,
        React.createElement("span", null, children)));
}
function IconButton({ label, icon, variant = 'ghost', className = '', ...props }) {
    return (React.createElement("button", { className: `icon-button icon-button--${variant} ${className}`.trim(), "aria-label": label, title: label, ...props },
        React.createElement(Icon_1.Icon, { name: icon })));
}
function Field({ label, hint, required, error, children, className = '' }) {
    return (React.createElement("label", { className: `field ${className}`.trim() },
        React.createElement("span", { className: "field__label" },
            label,
            required ? React.createElement("span", { className: "field__required", "aria-label": "required" }, " *") : null),
        children,
        error ? React.createElement("span", { className: "field__error" }, error) : hint ? React.createElement("span", { className: "field__hint" }, hint) : null));
}
function Input(props) {
    return React.createElement("input", { className: `input ${props.className ?? ''}`.trim(), ...props });
}
function Select(props) {
    return React.createElement("select", { className: `select ${props.className ?? ''}`.trim(), ...props });
}
function Textarea(props) {
    return React.createElement("textarea", { className: `textarea ${props.className ?? ''}`.trim(), ...props });
}
function Checkbox({ label, description, ...props }) {
    return (React.createElement("label", { className: "checkbox" },
        React.createElement("input", { type: "checkbox", ...props }),
        React.createElement("span", { className: "checkbox__control", "aria-hidden": "true" },
            React.createElement(Icon_1.Icon, { name: "check", size: 13 })),
        React.createElement("span", null,
            React.createElement("strong", null, label),
            description ? React.createElement("small", null, description) : null)));
}
function SectionHeader({ eyebrow, title, description, actions }) {
    return (React.createElement("header", { className: "section-header" },
        React.createElement("div", { className: "section-header__copy" },
            eyebrow ? React.createElement("div", { className: "eyebrow" }, eyebrow) : null,
            React.createElement("h1", null, title),
            description ? React.createElement("p", null, description) : null),
        actions ? React.createElement("div", { className: "section-header__actions" }, actions) : null));
}
function Panel({ children, className = '', ...props }) {
    return React.createElement("section", { className: `panel ${className}`.trim(), ...props }, children);
}
function PanelHeader({ title, description, actions }) {
    return (React.createElement("div", { className: "panel__header" },
        React.createElement("div", null,
            React.createElement("h2", null, title),
            description ? React.createElement("p", null, description) : null),
        actions ? React.createElement("div", { className: "panel__actions" }, actions) : null));
}
function EmptyState({ icon = 'info', title, description, action }) {
    return (React.createElement("div", { className: "empty-state" },
        React.createElement("div", { className: "empty-state__icon" },
            React.createElement(Icon_1.Icon, { name: icon, size: 24 })),
        React.createElement("h3", null, title),
        React.createElement("p", null, description),
        action ? React.createElement("div", { className: "empty-state__action" }, action) : null));
}
function Kbd({ children }) {
    return React.createElement("kbd", { className: "kbd" }, children);
}

},
"src/data/sampleProject.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSampleProject = createSampleProject;
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const id_1 = require("../utils/id");
const dates_1 = require("../utils/dates");
const at = (date) => `${date}T14:00:00.000Z`;
function link(type, fromId, toId, rationale = '') {
    return { id: (0, id_1.createId)('link'), type, fromId, toId, rationale, createdAt: (0, dates_1.nowIso)(), createdBy: 'Sample project' };
}
function snapshot(project) {
    return structuredClone({
        projectRevision: project.revision,
        requirements: project.requirements,
        functions: project.functions,
        objects: project.objects,
        interfaces: project.interfaces,
        verificationPlans: project.verificationPlans,
        testCases: project.testCases,
        testExecutions: project.testExecutions,
        failureModes: project.failureModes,
        workItems: project.workItems,
        workDependencies: project.workDependencies,
        projectBudgetLines: project.projectBudgetLines,
        technicalBudgets: project.technicalBudgets,
        documents: project.documents,
        links: project.links
    });
}
function requirement(identifier, title, statement, type, owner, systemLevel) {
    return {
        ...(0, factory_1.controlledRecord)('req', identifier, title, owner, 'approved'),
        statement,
        source: 'Product concept brief',
        sourceLocation: 'Section 3',
        stakeholder: 'Field science team',
        rationale: 'Supports reliable environmental observations away from fixed infrastructure.',
        requirementType: type,
        priority: 'high',
        reviewer: 'Systems Engineering Lead',
        childIds: [],
        applicableSystemLevel: systemLevel,
        applicableOperatingMode: 'Monitoring',
        applicableEnvironment: 'Outdoor field operation, 0 °C to 45 °C',
        assumptions: [],
        constraints: [],
        dependencyIds: [],
        decisionIds: [],
        baselineIds: [],
        verificationIntent: {
            method: 'test',
            level: 'system',
            acceptanceCriteria: '',
            owner: 'Verification Lead',
            plannedDate: '2026-09-04',
            requiredConfiguration: 'Production-representative configuration',
            requiredEnvironment: 'Controlled laboratory unless otherwise stated',
            requiredEquipment: 'Calibrated instrumentation',
            requiredEvidence: 'Approved test report and raw data'
        },
        functionIds: [],
        objectIds: [],
        interfaceIds: [],
        failureModeIds: [],
        verificationPlanIds: [],
        testExecutionIds: [],
        evidenceIds: [],
        workItemIds: [],
        statuses: {
            definition: 'approved',
            allocation: 'unallocated',
            implementation: 'in-progress',
            verification: 'planned',
            validation: 'planned',
            evidence: 'incomplete'
        },
        dueDate: '2026-09-15',
        blockers: [],
        nextAction: 'Complete planned verification.'
    };
}
function architectureObject(identifier, name, domain, objectType, owner, parentId) {
    return {
        ...(0, factory_1.controlledRecord)('obj', identifier, name, owner, 'defined'),
        name,
        domain,
        objectType,
        parentId,
        childIds: [],
        description: '',
        functionIds: [],
        requirementIds: [],
        interfaceIds: [],
        inheritedObligations: [],
        implementationStatus: 'in-progress'
    };
}
function functionRecord(identifier, name, description, owner, parentId) {
    return {
        ...(0, factory_1.controlledRecord)('fn', identifier, name, owner, 'approved'),
        name,
        description,
        parentId,
        childIds: [],
        input: '',
        output: '',
        trigger: '',
        performanceExpectation: '',
        applicableMode: 'Monitoring',
        requirementIds: [],
        objectIds: [],
        interfaceIds: [],
        verificationMethods: ['test'],
        failureModeIds: []
    };
}
function createSampleProject() {
    const project = (0, factory_1.createEmptyProject)('Portable Environmental Monitor');
    project.description = 'A cross-domain sample demonstrating traceability from stakeholder need through implementation, verification, evidence, schedule, budget, and baseline.';
    project.isSample = true;
    project.settings.mode = 'easy';
    project.createdAt = at('2026-07-01');
    project.updatedAt = (0, dates_1.nowIso)();
    const reqEndurance = requirement('REQ-001', 'Continuous field endurance', 'The monitor shall operate continuously for at least 24 hours without external power under the defined monitoring profile.', 'performance', 'Power Lead', 'System');
    reqEndurance.metric = {
        metric: 'Continuous operating time',
        unit: 'hours',
        threshold: 24,
        target: 36,
        operatingCondition: '10-second sampling, display at 50 percent brightness, radio sync every 5 minutes',
        measurementCondition: 'Battery at 100 percent state of charge; 23 °C ambient',
        comparisonDirection: 'at-least',
        currentEstimate: 27.5,
        measuredValue: 22.8,
        confidence: 80,
        evidenceDate: '2026-08-14',
        trend: [
            { at: at('2026-07-10'), value: 18.2, kind: 'estimate' },
            { at: at('2026-07-25'), value: 24.6, kind: 'estimate' },
            { at: at('2026-08-05'), value: 27.5, kind: 'estimate' },
            { at: at('2026-08-14'), value: 22.8, kind: 'measured' }
        ]
    };
    reqEndurance.verificationIntent.acceptanceCriteria = 'The unit remains functional for 24 hours or longer and retains all scheduled records.';
    reqEndurance.statuses.verification = 'failed';
    reqEndurance.statuses.evidence = 'complete';
    reqEndurance.blockers = ['Measured endurance is 1.2 hours below threshold.'];
    reqEndurance.nextAction = 'Reduce display and radio power before rerunning the system endurance test.';
    const reqAccuracy = requirement('REQ-002', 'Temperature accuracy', 'The monitor shall report ambient temperature with absolute error no greater than 0.5 degrees Celsius over 0 degrees Celsius to 45 degrees Celsius.', 'performance', 'Sensor Lead', 'System');
    reqAccuracy.metric = {
        metric: 'Maximum absolute temperature error',
        unit: '°C',
        threshold: 0.5,
        target: 0.2,
        operatingCondition: '0 °C to 45 °C stabilized ambient',
        measurementCondition: 'Compared with calibrated reference probe',
        comparisonDirection: 'at-most',
        currentEstimate: 0.35,
        measuredValue: 0.28,
        confidence: 92,
        evidenceDate: '2026-08-08',
        trend: [
            { at: at('2026-07-12'), value: 0.48, kind: 'estimate' },
            { at: at('2026-07-29'), value: 0.35, kind: 'estimate' },
            { at: at('2026-08-08'), value: 0.28, kind: 'measured' }
        ]
    };
    reqAccuracy.verificationIntent.level = 'system';
    reqAccuracy.verificationIntent.acceptanceCriteria = 'Maximum absolute error is 0.5 °C or less at every calibration point.';
    reqAccuracy.statuses.verification = 'passed';
    reqAccuracy.statuses.evidence = 'complete';
    reqAccuracy.statuses.implementation = 'implemented';
    reqAccuracy.nextAction = 'Maintain calibration evidence with the release baseline.';
    const reqUpdate = requirement('REQ-003', 'Display update interval', 'The monitor shall update the local display with current sensor values at intervals no greater than 10 seconds.', 'performance', 'Firmware Lead', 'Subsystem');
    reqUpdate.metric = {
        metric: 'Display update interval',
        unit: 'seconds',
        threshold: 10,
        target: 2,
        operatingCondition: 'Normal monitoring operation',
        measurementCondition: 'Measured from sensor sample completion to display refresh',
        comparisonDirection: 'at-most',
        currentEstimate: 2.4,
        measuredValue: 2.6,
        confidence: 95,
        evidenceDate: '2026-08-11',
        trend: [{ at: at('2026-08-11'), value: 2.6, kind: 'measured' }]
    };
    reqUpdate.verificationIntent.level = 'integration';
    reqUpdate.verificationIntent.acceptanceCriteria = 'Every observed update interval is 10 seconds or less.';
    reqUpdate.statuses.verification = 'passed';
    reqUpdate.statuses.evidence = 'complete';
    reqUpdate.statuses.implementation = 'implemented';
    const reqIngress = requirement('REQ-004', 'Environmental enclosure protection', 'The enclosure shall prevent harmful ingress during representative outdoor handling and light rain exposure.', 'environmental', 'Mechanical Lead', 'System');
    reqIngress.metric = {
        metric: 'Ingress protection objective',
        unit: 'classification',
        operatingCondition: 'Light rain and dusty handling',
        measurementCondition: 'Inspection after demonstration',
        comparisonDirection: 'descriptive',
        confidence: 65,
        trend: []
    };
    reqIngress.verificationIntent.method = 'combination';
    reqIngress.verificationIntent.acceptanceCriteria = 'No water reaches electronics and no dust causes degraded operation after the demonstration.';
    reqIngress.statuses.verification = 'blocked';
    reqIngress.statuses.evidence = 'incomplete';
    reqIngress.blockers = ['Cable-gland redesign is not installed.'];
    reqIngress.nextAction = 'Install revised cable gland and repeat the enclosure demonstration.';
    const reqDisplay = requirement('REQ-005', 'Readable local status', 'A representative user shall be able to read operating state, temperature, humidity, and battery status from one meter in daylight.', 'operational', 'Human Factors Lead', 'System');
    reqDisplay.verificationIntent.method = 'demonstration';
    reqDisplay.verificationIntent.level = 'operational';
    reqDisplay.verificationIntent.acceptanceCriteria = 'At least 8 of 10 representative users correctly identify all four displayed values within 15 seconds.';
    reqDisplay.statuses.verification = 'passed';
    reqDisplay.statuses.validation = 'accepted';
    reqDisplay.statuses.evidence = 'complete';
    reqDisplay.statuses.implementation = 'implemented';
    const reqBattery = requirement('REQ-101', 'Battery usable energy', 'The battery assembly shall provide at least 60 watt-hours of usable energy at the system cutoff voltage.', 'performance', 'Power Lead', 'Assembly');
    reqBattery.parentId = reqEndurance.id;
    reqBattery.metric = {
        metric: 'Usable battery energy',
        unit: 'Wh',
        threshold: 60,
        target: 80,
        operatingCondition: '0.2 C discharge at 23 °C',
        measurementCondition: 'From full charge to system cutoff voltage',
        comparisonDirection: 'at-least',
        currentEstimate: 72,
        measuredValue: 69.4,
        confidence: 90,
        evidenceDate: '2026-08-04',
        trend: [{ at: at('2026-08-04'), value: 69.4, kind: 'measured' }]
    };
    reqBattery.verificationIntent.level = 'unit';
    reqBattery.verificationIntent.acceptanceCriteria = 'Measured usable energy is at least 60 Wh.';
    reqBattery.statuses.verification = 'passed';
    reqBattery.statuses.evidence = 'complete';
    reqBattery.statuses.implementation = 'implemented';
    reqBattery.nextAction = 'Preserve the battery characterization report.';
    const reqPower = requirement('REQ-102', 'Average system power', 'The monitor shall consume no more than 2.5 watts average power during the defined monitoring profile.', 'performance', 'Power Lead', 'System');
    reqPower.parentId = reqEndurance.id;
    reqPower.metric = {
        metric: 'Average system power',
        unit: 'W',
        threshold: 2.5,
        target: 1.8,
        operatingCondition: 'Defined monitoring profile',
        measurementCondition: 'One-hour average after warm-up',
        comparisonDirection: 'at-most',
        currentEstimate: 2.25,
        measuredValue: 3.04,
        confidence: 88,
        evidenceDate: '2026-08-14',
        trend: [
            { at: at('2026-07-20'), value: 3.5, kind: 'estimate' },
            { at: at('2026-08-01'), value: 2.25, kind: 'estimate' },
            { at: at('2026-08-14'), value: 3.04, kind: 'measured' }
        ]
    };
    reqPower.verificationIntent.level = 'integration';
    reqPower.verificationIntent.acceptanceCriteria = 'One-hour average input power is 2.5 W or less.';
    reqPower.statuses.verification = 'failed';
    reqPower.statuses.evidence = 'complete';
    reqPower.blockers = ['Display backlight and radio duty cycle exceed allocation.'];
    reqPower.nextAction = 'Implement adaptive brightness and delayed radio synchronization.';
    const reqSensorUnit = requirement('REQ-201', 'Sensor intrinsic error', 'The temperature sensor assembly shall exhibit absolute error no greater than 0.4 degrees Celsius before software compensation.', 'performance', 'Sensor Lead', 'Assembly');
    reqSensorUnit.parentId = reqAccuracy.id;
    reqSensorUnit.metric = {
        metric: 'Sensor assembly error',
        unit: '°C',
        threshold: 0.4,
        target: 0.25,
        operatingCondition: '0 °C to 45 °C',
        measurementCondition: 'Calibrated chamber',
        comparisonDirection: 'at-most',
        measuredValue: 0.34,
        confidence: 95,
        evidenceDate: '2026-08-07',
        trend: [{ at: at('2026-08-07'), value: 0.34, kind: 'measured' }]
    };
    reqSensorUnit.verificationIntent.level = 'unit';
    reqSensorUnit.verificationIntent.acceptanceCriteria = 'Error remains at or below 0.4 °C at all points.';
    reqSensorUnit.statuses.verification = 'passed';
    reqSensorUnit.statuses.evidence = 'complete';
    reqSensorUnit.statuses.implementation = 'implemented';
    const reqCompensation = requirement('REQ-202', 'Compensation residual error', 'The data-processing software shall reduce calibrated temperature residual error to no more than 0.2 degrees Celsius root-mean-square.', 'performance', 'Software Lead', 'Software module');
    reqCompensation.requirementType = 'performance';
    reqCompensation.parentId = reqAccuracy.id;
    reqCompensation.metric = {
        metric: 'Residual root-mean-square error',
        unit: '°C',
        threshold: 0.2,
        target: 0.1,
        operatingCondition: 'Calibration dataset',
        measurementCondition: 'Cross-validation dataset',
        comparisonDirection: 'at-most',
        measuredValue: 0.12,
        confidence: 91,
        evidenceDate: '2026-08-08',
        trend: [{ at: at('2026-08-08'), value: 0.12, kind: 'measured' }]
    };
    reqCompensation.verificationIntent.method = 'analysis';
    reqCompensation.verificationIntent.level = 'unit';
    reqCompensation.verificationIntent.acceptanceCriteria = 'Cross-validation root-mean-square error is 0.2 °C or less.';
    reqCompensation.statuses.verification = 'passed';
    reqCompensation.statuses.evidence = 'complete';
    reqCompensation.statuses.implementation = 'implemented';
    reqEndurance.childIds = [reqBattery.id, reqPower.id];
    reqAccuracy.childIds = [reqSensorUnit.id, reqCompensation.id];
    project.requirements = [reqEndurance, reqAccuracy, reqUpdate, reqIngress, reqDisplay, reqBattery, reqPower, reqSensorUnit, reqCompensation];
    const fnMonitor = functionRecord('FUN-001', 'Monitor environment', 'Coordinate sensing, processing, presentation, storage, and communications.', 'Systems Engineering Lead');
    const fnAcquire = functionRecord('FUN-010', 'Acquire environmental measurements', 'Sample temperature and humidity sensors.', 'Sensor Lead', fnMonitor.id);
    const fnManagePower = functionRecord('FUN-020', 'Manage energy', 'Provide regulated power and minimize energy use across operating modes.', 'Power Lead', fnMonitor.id);
    const fnPresent = functionRecord('FUN-030', 'Present local status', 'Render current observations and system state.', 'Firmware Lead', fnMonitor.id);
    const fnProcess = functionRecord('FUN-040', 'Process observations', 'Apply calibration, timestamping, and quality checks.', 'Software Lead', fnMonitor.id);
    const fnProtect = functionRecord('FUN-050', 'Protect internal equipment', 'Exclude harmful environmental ingress.', 'Mechanical Lead', fnMonitor.id);
    fnMonitor.childIds = [fnAcquire.id, fnManagePower.id, fnPresent.id, fnProcess.id, fnProtect.id];
    project.functions = [fnMonitor, fnAcquire, fnManagePower, fnPresent, fnProcess, fnProtect];
    const objSystem = architectureObject('OBJ-001', 'Portable Environmental Monitor', 'hardware', 'system', 'Systems Engineering Lead');
    const objSensorSubsystem = architectureObject('OBJ-100', 'Sensor Subsystem', 'hardware', 'subsystem', 'Sensor Lead', objSystem.id);
    const objSensorAssembly = architectureObject('OBJ-110', 'Environmental Sensor Assembly', 'hardware', 'assembly', 'Sensor Lead', objSensorSubsystem.id);
    const objTempSensor = architectureObject('OBJ-111', 'Temperature Sensor', 'hardware', 'component', 'Sensor Lead', objSensorAssembly.id);
    const objPowerSubsystem = architectureObject('OBJ-200', 'Power Subsystem', 'hardware', 'subsystem', 'Power Lead', objSystem.id);
    const objBattery = architectureObject('OBJ-210', 'Battery Assembly', 'hardware', 'assembly', 'Power Lead', objPowerSubsystem.id);
    const objPowerBoard = architectureObject('OBJ-220', 'Power Electronics Assembly', 'hardware', 'assembly', 'Power Lead', objPowerSubsystem.id);
    const objController = architectureObject('OBJ-300', 'Embedded Controller', 'hardware', 'assembly', 'Firmware Lead', objSystem.id);
    const objFirmware = architectureObject('OBJ-310', 'Monitor Firmware Image', 'firmware', 'image', 'Firmware Lead', objSystem.id);
    const objDisplayModule = architectureObject('OBJ-311', 'Display Service', 'firmware', 'service', 'Firmware Lead', objFirmware.id);
    const objPowerService = architectureObject('OBJ-312', 'Power Management Service', 'firmware', 'service', 'Firmware Lead', objFirmware.id);
    const objSoftware = architectureObject('OBJ-400', 'Observation Processing Application', 'software', 'application', 'Software Lead', objSystem.id);
    const objCompensation = architectureObject('OBJ-410', 'Temperature Compensation Module', 'software', 'module', 'Software Lead', objSoftware.id);
    const objEnclosure = architectureObject('OBJ-500', 'Outdoor Enclosure', 'hardware', 'assembly', 'Mechanical Lead', objSystem.id);
    const objProcedure = architectureObject('OBJ-600', 'Field Setup Procedure', 'human-process', 'procedure', 'Operations Lead', objSystem.id);
    objSystem.childIds = [objSensorSubsystem.id, objPowerSubsystem.id, objController.id, objFirmware.id, objSoftware.id, objEnclosure.id, objProcedure.id];
    objSensorSubsystem.childIds = [objSensorAssembly.id];
    objSensorAssembly.childIds = [objTempSensor.id];
    objPowerSubsystem.childIds = [objBattery.id, objPowerBoard.id];
    objFirmware.childIds = [objDisplayModule.id, objPowerService.id];
    objSoftware.childIds = [objCompensation.id];
    [objBattery, objTempSensor, objController, objDisplayModule, objCompensation].forEach((object) => (object.implementationStatus = 'implemented'));
    objEnclosure.implementationStatus = 'rework-required';
    objBattery.inheritedObligations.push({
        id: (0, id_1.createId)('obl'),
        requirementId: reqEndurance.id,
        sourceRequirementRevision: reqEndurance.revision,
        state: 'decomposed',
        localParameters: '60 Wh usable energy minimum',
        rationale: 'Endurance decomposed into energy capacity and average-power obligations.',
        reviewedAt: at('2026-07-18'),
        affectedByParentChange: false
    });
    objDisplayModule.inheritedObligations.push({
        id: (0, id_1.createId)('obl'),
        requirementId: reqUpdate.id,
        sourceRequirementRevision: reqUpdate.revision,
        state: 'accepted-with-local-parameters',
        localParameters: '2.0 second service refresh budget',
        rationale: 'Leaves 8 seconds of margin for acquisition and rendering.',
        reviewedAt: at('2026-07-21'),
        affectedByParentChange: false
    });
    objEnclosure.inheritedObligations.push({
        id: (0, id_1.createId)('obl'),
        requirementId: reqIngress.id,
        sourceRequirementRevision: reqIngress.revision,
        state: 'pending-review',
        localParameters: '',
        rationale: '',
        affectedByParentChange: false
    });
    project.objects = [
        objSystem,
        objSensorSubsystem,
        objSensorAssembly,
        objTempSensor,
        objPowerSubsystem,
        objBattery,
        objPowerBoard,
        objController,
        objFirmware,
        objDisplayModule,
        objPowerService,
        objSoftware,
        objCompensation,
        objEnclosure,
        objProcedure
    ];
    const intSensor = {
        ...(0, factory_1.controlledRecord)('int', 'INT-001', 'Sensor data bus', 'Firmware Lead', 'defined'),
        endpointAId: objSensorAssembly.id,
        endpointBId: objController.id,
        direction: 'A-to-B',
        interfaceType: 'data',
        exchangedItem: 'Temperature and humidity samples',
        mechanicalCharacteristics: 'Four-conductor keyed cable',
        electricalCharacteristics: '3.3 V logic, open-drain clock and data',
        dataCharacteristics: 'Addressed digital samples',
        timingCharacteristics: '400 kilohertz bus, sample every 2 seconds',
        protocol: 'Inter-Integrated Circuit (I²C)',
        requirementIds: [reqAccuracy.id, reqUpdate.id],
        verificationPlanIds: [],
        documentIds: [],
        status: 'verified'
    };
    const intPower = {
        ...(0, factory_1.controlledRecord)('int', 'INT-002', 'Battery power interface', 'Power Lead', 'defined'),
        endpointAId: objBattery.id,
        endpointBId: objPowerBoard.id,
        direction: 'A-to-B',
        interfaceType: 'electrical',
        exchangedItem: 'Direct-current power',
        mechanicalCharacteristics: 'Locking two-position connector',
        electricalCharacteristics: '9 V to 12.6 V, 4 A peak',
        dataCharacteristics: 'Not applicable',
        timingCharacteristics: 'Continuous',
        protocol: 'Discrete power',
        requirementIds: [reqEndurance.id, reqBattery.id, reqPower.id],
        verificationPlanIds: [],
        documentIds: [],
        status: 'verified'
    };
    const intDisplay = {
        ...(0, factory_1.controlledRecord)('int', 'INT-003', 'Display control interface', 'Firmware Lead', 'defined'),
        endpointAId: objController.id,
        endpointBId: objDisplayModule.id,
        direction: 'bidirectional',
        interfaceType: 'software',
        exchangedItem: 'Rendered display model and user input events',
        mechanicalCharacteristics: 'Not applicable',
        electricalCharacteristics: 'Internal processor interface',
        dataCharacteristics: 'Structured display state',
        timingCharacteristics: 'Refresh request every 2 seconds',
        protocol: 'Internal application programming interface (API)',
        requirementIds: [reqUpdate.id, reqDisplay.id],
        verificationPlanIds: [],
        documentIds: [],
        status: 'verified'
    };
    const intEnclosure = {
        ...(0, factory_1.controlledRecord)('int', 'INT-004', 'Enclosure cable entry', 'Mechanical Lead', 'draft'),
        endpointAId: objEnclosure.id,
        endpointBId: objSensorSubsystem.id,
        direction: 'bidirectional',
        interfaceType: 'mechanical',
        exchangedItem: 'Sensor harness',
        mechanicalCharacteristics: 'Sealed cable gland',
        electricalCharacteristics: 'Pass-through only',
        dataCharacteristics: 'Not applicable',
        timingCharacteristics: 'Not applicable',
        protocol: 'Not applicable',
        requirementIds: [reqIngress.id],
        verificationPlanIds: [],
        documentIds: [],
        status: 'issue'
    };
    project.interfaces = [intSensor, intPower, intDisplay, intEnclosure];
    reqEndurance.functionIds = [fnManagePower.id];
    reqEndurance.objectIds = [objBattery.id, objPowerBoard.id, objPowerService.id, objDisplayModule.id];
    reqEndurance.interfaceIds = [intPower.id];
    reqAccuracy.functionIds = [fnAcquire.id, fnProcess.id];
    reqAccuracy.objectIds = [objSensorAssembly.id, objTempSensor.id, objCompensation.id];
    reqAccuracy.interfaceIds = [intSensor.id];
    reqUpdate.functionIds = [fnAcquire.id, fnPresent.id];
    reqUpdate.objectIds = [objController.id, objDisplayModule.id];
    reqUpdate.interfaceIds = [intSensor.id, intDisplay.id];
    reqIngress.functionIds = [fnProtect.id];
    reqIngress.objectIds = [objEnclosure.id];
    reqIngress.interfaceIds = [intEnclosure.id];
    reqDisplay.functionIds = [fnPresent.id];
    reqDisplay.objectIds = [objDisplayModule.id, objProcedure.id];
    reqDisplay.interfaceIds = [intDisplay.id];
    reqBattery.functionIds = [fnManagePower.id];
    reqBattery.objectIds = [objBattery.id];
    reqBattery.interfaceIds = [intPower.id];
    reqPower.functionIds = [fnManagePower.id];
    reqPower.objectIds = [objPowerBoard.id, objPowerService.id, objDisplayModule.id];
    reqPower.interfaceIds = [intPower.id];
    reqSensorUnit.functionIds = [fnAcquire.id];
    reqSensorUnit.objectIds = [objSensorAssembly.id, objTempSensor.id];
    reqCompensation.functionIds = [fnProcess.id];
    reqCompensation.objectIds = [objCompensation.id];
    project.requirements.forEach((record) => {
        record.statuses.allocation = record.functionIds.length && record.objectIds.length ? 'fully-allocated' : 'partially-allocated';
    });
    fnManagePower.requirementIds = [reqEndurance.id, reqBattery.id, reqPower.id];
    fnManagePower.objectIds = [objBattery.id, objPowerBoard.id, objPowerService.id];
    fnAcquire.requirementIds = [reqAccuracy.id, reqUpdate.id, reqSensorUnit.id];
    fnAcquire.objectIds = [objSensorAssembly.id, objTempSensor.id, objController.id];
    fnPresent.requirementIds = [reqUpdate.id, reqDisplay.id];
    fnPresent.objectIds = [objDisplayModule.id, objController.id];
    fnProcess.requirementIds = [reqAccuracy.id, reqCompensation.id];
    fnProcess.objectIds = [objCompensation.id, objSoftware.id];
    fnProtect.requirementIds = [reqIngress.id];
    fnProtect.objectIds = [objEnclosure.id];
    fnMonitor.requirementIds = [reqEndurance.id, reqAccuracy.id, reqUpdate.id, reqIngress.id, reqDisplay.id];
    fnMonitor.objectIds = [objSystem.id];
    project.objects.forEach((object) => {
        object.requirementIds = project.requirements.filter((record) => record.objectIds.includes(object.id)).map((record) => record.id);
        object.functionIds = project.functions.filter((record) => record.objectIds.includes(object.id)).map((record) => record.id);
        object.interfaceIds = project.interfaces
            .filter((record) => record.endpointAId === object.id || record.endpointBId === object.id)
            .map((record) => record.id);
    });
    const plans = [
        {
            ...(0, factory_1.controlledRecord)('ver', 'VER-001', 'System endurance test', 'Verification Lead', 'approved'),
            requirementIds: [reqEndurance.id, reqPower.id],
            verificationMethod: 'test',
            verificationLevel: 'system',
            objective: 'Demonstrate endurance and average power under the reference monitoring profile.',
            acceptanceCriteria: 'Operating time is at least 24 hours and average input power is no greater than 2.5 W.',
            preconditions: 'Battery charged; unit configured to release-candidate software.',
            configuration: 'Prototype P3, firmware 0.8.2, display 50 percent, radio sync every 5 minutes',
            environment: '23 °C laboratory',
            equipment: 'Power analyzer and environmental logger',
            instrumentation: 'Calibrated direct-current power analyzer',
            personnel: 'One operator and one reviewer',
            safetyConsiderations: 'Lithium battery handling procedure applies.',
            procedure: 'Charge, configure, start logging, operate until automatic shutdown, preserve raw data.',
            dataToCollect: 'Voltage, current, power, state, sample count, shutdown time',
            sampleSize: 'One full-duration run followed by a confirmation run after corrective action',
            passFailLogic: 'Both acceptance criteria must pass.',
            reviewer: 'Systems Engineering Lead',
            plannedDate: '2026-08-14',
            dependencyIds: [],
            documentIds: [],
            approvalState: 'approved',
            testCaseIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('ver', 'VER-002', 'Temperature accuracy verification', 'Sensor Lead', 'approved'),
            requirementIds: [reqAccuracy.id, reqSensorUnit.id, reqCompensation.id],
            verificationMethod: 'combination',
            verificationLevel: 'system',
            objective: 'Verify sensor and compensated system accuracy.',
            acceptanceCriteria: 'All requirement-specific error limits are satisfied.',
            preconditions: 'Calibration chamber stabilized at each set point.',
            configuration: 'Prototype P3 with calibrated sensor assembly',
            environment: '0 °C, 10 °C, 23 °C, 35 °C, and 45 °C',
            equipment: 'Calibration chamber and reference probe',
            instrumentation: 'Traceable reference temperature probe',
            personnel: 'Sensor engineer and independent reviewer',
            safetyConsiderations: 'Observe chamber procedures.',
            procedure: 'Stabilize, record 30 samples, compute absolute and root-mean-square errors.',
            dataToCollect: 'Reference temperature, raw sensor value, compensated value',
            sampleSize: '30 samples at five temperature points',
            passFailLogic: 'Maximum absolute and residual root-mean-square errors satisfy limits.',
            reviewer: 'Verification Lead',
            plannedDate: '2026-08-08',
            dependencyIds: [],
            documentIds: [],
            approvalState: 'approved',
            testCaseIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('ver', 'VER-003', 'Sensor-to-display integration timing', 'Firmware Lead', 'approved'),
            requirementIds: [reqUpdate.id],
            verificationMethod: 'test',
            verificationLevel: 'integration',
            objective: 'Verify end-to-end update timing across sensor, controller, and display service.',
            acceptanceCriteria: 'Every measured update interval is 10 seconds or less.',
            preconditions: 'Sensor and display interfaces operational.',
            configuration: 'Prototype P3, firmware 0.8.2',
            environment: 'Laboratory',
            equipment: 'Logic analyzer and screen capture',
            instrumentation: 'Digital logic analyzer',
            personnel: 'Firmware engineer',
            safetyConsiderations: 'None beyond standard bench controls.',
            procedure: 'Stimulate sensor changes and record sample-to-display latency.',
            dataToCollect: 'Bus timestamps and rendered update timestamps',
            sampleSize: '100 updates',
            passFailLogic: 'Maximum interval at or below limit.',
            reviewer: 'Verification Lead',
            plannedDate: '2026-08-11',
            dependencyIds: [],
            documentIds: [],
            approvalState: 'approved',
            testCaseIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('ver', 'VER-004', 'Enclosure rain demonstration', 'Mechanical Lead', 'under-review'),
            requirementIds: [reqIngress.id],
            verificationMethod: 'demonstration',
            verificationLevel: 'system',
            objective: 'Demonstrate protection during representative light rain exposure.',
            acceptanceCriteria: 'No water reaches electronics and operation remains normal.',
            preconditions: 'Revised cable gland installed.',
            configuration: 'Prototype P3 with enclosure revision C',
            environment: 'Controlled spray fixture',
            equipment: 'Spray fixture, absorbent witness media, insulation tester',
            instrumentation: 'Flow meter and timer',
            personnel: 'Mechanical engineer and observer',
            safetyConsiderations: 'De-energize before opening enclosure.',
            procedure: 'Expose, inspect witness media, perform functional check.',
            dataToCollect: 'Exposure duration, flow, photographs, inspection observations',
            sampleSize: 'One demonstration followed by confirmation after any finding',
            passFailLogic: 'No harmful ingress or functional degradation.',
            reviewer: 'Systems Engineering Lead',
            plannedDate: '2026-09-03',
            dependencyIds: [],
            documentIds: [],
            approvalState: 'under-review',
            testCaseIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('ver', 'VER-005', 'Operational readability trial', 'Human Factors Lead', 'approved'),
            requirementIds: [reqDisplay.id],
            verificationMethod: 'demonstration',
            verificationLevel: 'operational',
            objective: 'Validate rapid interpretation by representative users.',
            acceptanceCriteria: 'At least 8 of 10 users correctly identify all values within 15 seconds.',
            preconditions: 'Display configured for field mode.',
            configuration: 'Prototype P3, display service 0.8.2',
            environment: 'Outdoor daylight',
            equipment: 'Timing sheet and observation form',
            instrumentation: 'Stopwatch',
            personnel: 'Ten representative users and one facilitator',
            safetyConsiderations: 'None.',
            procedure: 'Present device from one meter and ask users to report four values.',
            dataToCollect: 'Accuracy, time, qualitative comments',
            sampleSize: '10 users',
            passFailLogic: 'Eight or more complete successful observations.',
            reviewer: 'Operations Lead',
            plannedDate: '2026-08-12',
            dependencyIds: [],
            documentIds: [],
            approvalState: 'approved',
            testCaseIds: []
        }
    ];
    project.verificationPlans = plans;
    const [planEndurance, planAccuracy, planUpdate, planIngress, planDisplay] = plans;
    reqEndurance.verificationPlanIds = [planEndurance.id];
    reqPower.verificationPlanIds = [planEndurance.id];
    reqAccuracy.verificationPlanIds = [planAccuracy.id];
    reqSensorUnit.verificationPlanIds = [planAccuracy.id];
    reqCompensation.verificationPlanIds = [planAccuracy.id];
    reqUpdate.verificationPlanIds = [planUpdate.id];
    reqIngress.verificationPlanIds = [planIngress.id];
    reqDisplay.verificationPlanIds = [planDisplay.id];
    intSensor.verificationPlanIds = [planUpdate.id, planAccuracy.id];
    intPower.verificationPlanIds = [planEndurance.id];
    intDisplay.verificationPlanIds = [planUpdate.id, planDisplay.id];
    intEnclosure.verificationPlanIds = [planIngress.id];
    const executions = [
        {
            ...(0, factory_1.controlledRecord)('run', 'RUN-001', 'Battery energy characterization — Run 1', 'Power Lead', 'complete'),
            verificationPlanId: planEndurance.id,
            requirementIds: [reqBattery.id],
            executionNumber: 1,
            executedAt: at('2026-08-04'),
            operator: 'Power Engineer',
            reviewer: 'Verification Lead',
            systemConfiguration: 'Battery assembly BA-03, revision B',
            hardwareRevision: 'B',
            softwareVersion: 'Not applicable',
            firmwareVersion: 'Not applicable',
            environment: '23 °C laboratory',
            equipment: 'Electronic load EL-04',
            calibrationReference: 'CAL-EL04-2026-02',
            inputData: '12.6 V initial voltage, 0.2 C discharge',
            outputData: '69.4 Wh usable energy',
            observations: 'Normal discharge curve.',
            deviations: 'None.',
            result: 'passed',
            evidenceIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('run', 'RUN-002', 'Temperature accuracy verification — Run 1', 'Sensor Lead', 'complete'),
            verificationPlanId: planAccuracy.id,
            requirementIds: [reqAccuracy.id, reqSensorUnit.id, reqCompensation.id],
            executionNumber: 1,
            executedAt: at('2026-08-08'),
            operator: 'Sensor Engineer',
            reviewer: 'Verification Lead',
            systemConfiguration: 'Prototype P3, sensor assembly SA-07',
            hardwareRevision: 'P3',
            softwareVersion: '1.2.0',
            firmwareVersion: '0.8.2',
            environment: 'Calibrated chamber, five set points',
            equipment: 'Chamber CH-2 and reference probe RP-11',
            calibrationReference: 'CAL-RP11-2026-05',
            inputData: 'Five set points and 150 total samples',
            outputData: '0.28 °C max absolute system error; 0.12 °C residual root-mean-square error',
            observations: 'All limits satisfied.',
            deviations: 'None.',
            result: 'passed',
            evidenceIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('run', 'RUN-003', 'Sensor-to-display timing — Run 1', 'Firmware Lead', 'complete'),
            verificationPlanId: planUpdate.id,
            requirementIds: [reqUpdate.id],
            executionNumber: 1,
            executedAt: at('2026-08-11'),
            operator: 'Firmware Engineer',
            reviewer: 'Verification Lead',
            systemConfiguration: 'Prototype P3',
            hardwareRevision: 'P3',
            softwareVersion: '1.2.0',
            firmwareVersion: '0.8.2',
            environment: 'Laboratory',
            equipment: 'Logic analyzer LA-03',
            calibrationReference: 'CAL-LA03-2026-01',
            inputData: '100 controlled sensor transitions',
            outputData: '2.6-second maximum update interval',
            observations: 'Stable timing.',
            deviations: 'None.',
            result: 'passed',
            evidenceIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('run', 'RUN-004', 'System endurance test — Run 1', 'Verification Lead', 'complete'),
            verificationPlanId: planEndurance.id,
            requirementIds: [reqEndurance.id, reqPower.id],
            executionNumber: 1,
            executedAt: at('2026-08-14'),
            operator: 'Test Engineer',
            reviewer: 'Systems Engineering Lead',
            systemConfiguration: 'Prototype P3, firmware 0.8.2, software 1.2.0',
            hardwareRevision: 'P3',
            softwareVersion: '1.2.0',
            firmwareVersion: '0.8.2',
            environment: '23 °C laboratory',
            equipment: 'Power analyzer PA-05',
            calibrationReference: 'CAL-PA05-2026-06',
            inputData: 'Defined monitoring profile',
            outputData: '22.8 hours operating time; 3.04 W average input power',
            observations: 'Display backlight remained near maximum during much of the run.',
            deviations: 'None from approved plan.',
            result: 'failed',
            evidenceIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('run', 'RUN-005', 'Operational readability trial — Run 1', 'Human Factors Lead', 'complete'),
            verificationPlanId: planDisplay.id,
            requirementIds: [reqDisplay.id],
            executionNumber: 1,
            executedAt: at('2026-08-12'),
            operator: 'Human Factors Engineer',
            reviewer: 'Operations Lead',
            systemConfiguration: 'Prototype P3 in field mode',
            hardwareRevision: 'P3',
            softwareVersion: '1.2.0',
            firmwareVersion: '0.8.2',
            environment: 'Outdoor daylight',
            equipment: 'Observation forms',
            calibrationReference: 'Not applicable',
            inputData: '10 representative users',
            outputData: '9 of 10 users successful; median 8.4 seconds',
            observations: 'One user confused battery icon with radio strength.',
            deviations: 'None.',
            result: 'passed',
            evidenceIds: []
        }
    ];
    project.testExecutions = executions;
    const [runBattery, runAccuracy, runUpdate, runEndurance, runDisplay] = executions;
    reqBattery.testExecutionIds = [runBattery.id];
    reqAccuracy.testExecutionIds = [runAccuracy.id];
    reqSensorUnit.testExecutionIds = [runAccuracy.id];
    reqCompensation.testExecutionIds = [runAccuracy.id];
    reqUpdate.testExecutionIds = [runUpdate.id];
    reqEndurance.testExecutionIds = [runEndurance.id];
    reqPower.testExecutionIds = [runEndurance.id];
    reqDisplay.testExecutionIds = [runDisplay.id];
    function failure(identifier, title, sourceType, sourceId, mode, cause, endEffect, severity, likelihood, detectability, mitigation, owner) {
        const score = severity * likelihood * detectability;
        return {
            ...(0, factory_1.controlledRecord)('fm', identifier, title, owner, 'reviewed'),
            sourceType,
            sourceId,
            operatingMode: 'Monitoring',
            failureMode: mode,
            cause,
            localEffect: endEffect,
            nextHigherEffect: endEffect,
            endEffect,
            detectionMethod: 'Verification test and operational monitoring',
            preventionControl: 'Design review and component derating',
            detectionControl: 'Built-in status and verification plan',
            severity,
            likelihood,
            detectability,
            criticalityCategory: (0, calculations_1.criticalityCategory)(score),
            hazardRelationship: '',
            requirementIds: [],
            interfaceIds: [],
            verificationPlanIds: [],
            recommendedMitigation: mitigation,
            actionOwner: owner,
            dueDate: '2026-08-31',
            mitigationStatus: 'planned',
            residualSeverity: Math.max(1, severity - 1),
            residualLikelihood: Math.max(1, likelihood - 2),
            residualCriticalityCategory: 'moderate',
            evidenceIds: [],
            reviewStatus: 'reviewed'
        };
    }
    const fmBattery = failure('FMECA-001', 'Premature battery depletion', 'requirement', reqEndurance.id, 'Energy depleted before mission end', 'Higher-than-expected display or radio duty cycle', 'Monitoring stops and data collection is incomplete.', 8, 6, 5, 'Implement adaptive display brightness, lower radio duty cycle, and low-energy warning.', 'Power Lead');
    fmBattery.requirementIds = [reqEndurance.id, reqPower.id];
    fmBattery.verificationPlanIds = [planEndurance.id];
    const fmSensor = failure('FMECA-002', 'Temperature sensor drift', 'function', fnAcquire.id, 'Reported temperature drifts outside acceptance band', 'Sensor aging or contamination', 'Environmental conclusions may be incorrect.', 7, 3, 4, 'Apply calibration check interval and residual drift monitoring.', 'Sensor Lead');
    fmSensor.requirementIds = [reqAccuracy.id, reqSensorUnit.id, reqCompensation.id];
    fmSensor.mitigationStatus = 'implemented';
    fmSensor.residualCriticalityCategory = 'low';
    const fmIngress = failure('FMECA-003', 'Water reaches electronics', 'interface', intEnclosure.id, 'Cable entry leaks during rain exposure', 'Incorrect gland compression or seal geometry', 'Electronics may fail and create loss of monitoring capability.', 9, 5, 6, 'Install revised cable gland, add assembly inspection, and repeat rain demonstration.', 'Mechanical Lead');
    fmIngress.requirementIds = [reqIngress.id];
    fmIngress.interfaceIds = [intEnclosure.id];
    fmIngress.verificationPlanIds = [planIngress.id];
    project.failureModes = [fmBattery, fmSensor, fmIngress];
    reqEndurance.failureModeIds = [fmBattery.id];
    reqPower.failureModeIds = [fmBattery.id];
    reqAccuracy.failureModeIds = [fmSensor.id];
    reqSensorUnit.failureModeIds = [fmSensor.id];
    reqCompensation.failureModeIds = [fmSensor.id];
    reqIngress.failureModeIds = [fmIngress.id];
    fnManagePower.failureModeIds = [fmBattery.id];
    fnAcquire.failureModeIds = [fmSensor.id];
    fnProtect.failureModeIds = [fmIngress.id];
    const work = [
        {
            ...(0, factory_1.controlledRecord)('work', 'WORK-001', 'Implement adaptive display brightness', 'Firmware Lead', 'active'),
            description: 'Reduce backlight power while preserving operational readability.',
            status: 'in-progress',
            priority: 'critical',
            plannedStart: '2026-08-15',
            plannedFinish: '2026-08-22',
            forecastFinish: '2026-08-23',
            durationDays: 6,
            percentComplete: 60,
            milestone: false,
            predecessorIds: [],
            successorIds: [],
            baselineStart: '2026-08-15',
            baselineFinish: '2026-08-20',
            requirementIds: [reqEndurance.id, reqPower.id],
            functionIds: [fnManagePower.id, fnPresent.id],
            objectIds: [objDisplayModule.id, objPowerService.id],
            verificationPlanIds: [planEndurance.id],
            failureModeIds: [fmBattery.id],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: '',
            dueDate: '2026-08-22'
        },
        {
            ...(0, factory_1.controlledRecord)('work', 'WORK-002', 'Install revised cable gland', 'Mechanical Lead', 'active'),
            description: 'Install enclosure revision C cable-entry hardware and inspect compression.',
            status: 'blocked',
            priority: 'critical',
            plannedStart: '2026-08-10',
            plannedFinish: '2026-08-17',
            forecastFinish: '2026-08-28',
            durationDays: 5,
            percentComplete: 30,
            milestone: false,
            predecessorIds: [],
            successorIds: [],
            baselineStart: '2026-08-10',
            baselineFinish: '2026-08-17',
            requirementIds: [reqIngress.id],
            functionIds: [fnProtect.id],
            objectIds: [objEnclosure.id],
            verificationPlanIds: [planIngress.id],
            failureModeIds: [fmIngress.id],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: 'Supplier shipment is delayed.',
            dueDate: '2026-08-17'
        },
        {
            ...(0, factory_1.controlledRecord)('work', 'WORK-003', 'Rerun system endurance test', 'Verification Lead', 'planned'),
            description: 'Run the approved endurance procedure after corrective changes are integrated.',
            status: 'ready',
            priority: 'high',
            plannedStart: '2026-08-25',
            plannedFinish: '2026-08-27',
            forecastFinish: '2026-08-28',
            durationDays: 2,
            percentComplete: 0,
            milestone: false,
            predecessorIds: [],
            successorIds: [],
            baselineStart: '2026-08-22',
            baselineFinish: '2026-08-24',
            requirementIds: [reqEndurance.id, reqPower.id],
            functionIds: [fnManagePower.id],
            objectIds: [objSystem.id],
            verificationPlanIds: [planEndurance.id],
            failureModeIds: [fmBattery.id],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: '',
            dueDate: '2026-08-27'
        },
        {
            ...(0, factory_1.controlledRecord)('work', 'WORK-004', 'Complete enclosure rain demonstration', 'Mechanical Lead', 'planned'),
            description: 'Execute the approved demonstration and preserve photographs and inspection records.',
            status: 'backlog',
            priority: 'high',
            plannedStart: '2026-09-03',
            plannedFinish: '2026-09-04',
            forecastFinish: '2026-09-04',
            durationDays: 2,
            percentComplete: 0,
            milestone: false,
            predecessorIds: [],
            successorIds: [],
            baselineStart: '2026-08-28',
            baselineFinish: '2026-08-29',
            requirementIds: [reqIngress.id],
            functionIds: [fnProtect.id],
            objectIds: [objEnclosure.id],
            verificationPlanIds: [planIngress.id],
            failureModeIds: [fmIngress.id],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: '',
            dueDate: '2026-09-04'
        },
        {
            ...(0, factory_1.controlledRecord)('work', 'WORK-005', 'Release readiness review', 'Systems Engineering Lead', 'planned'),
            description: 'Review all requirement closures, deviations, evidence, schedule, and budgets.',
            status: 'backlog',
            priority: 'high',
            plannedStart: '2026-09-10',
            plannedFinish: '2026-09-11',
            forecastFinish: '2026-09-12',
            durationDays: 2,
            percentComplete: 0,
            milestone: true,
            predecessorIds: [],
            successorIds: [],
            baselineStart: '2026-09-08',
            baselineFinish: '2026-09-09',
            requirementIds: project.requirements.map((record) => record.id),
            functionIds: [],
            objectIds: [objSystem.id],
            verificationPlanIds: plans.map((plan) => plan.id),
            failureModeIds: [fmBattery.id, fmIngress.id],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: '',
            dueDate: '2026-09-11'
        }
    ];
    project.workItems = work;
    const [workBrightness, workGland, workEndurance, workRain, workRelease] = work;
    const dependencies = [
        { id: (0, id_1.createId)('dep'), predecessorId: workBrightness.id, successorId: workEndurance.id, type: 'finish-to-start', lagDays: 1 },
        { id: (0, id_1.createId)('dep'), predecessorId: workGland.id, successorId: workRain.id, type: 'finish-to-start', lagDays: 1 },
        { id: (0, id_1.createId)('dep'), predecessorId: workEndurance.id, successorId: workRelease.id, type: 'finish-to-start', lagDays: 1 },
        { id: (0, id_1.createId)('dep'), predecessorId: workRain.id, successorId: workRelease.id, type: 'finish-to-start', lagDays: 1 }
    ];
    project.workDependencies = dependencies;
    dependencies.forEach((dependency) => {
        project.workItems.find((item) => item.id === dependency.predecessorId)?.successorIds.push(dependency.successorId);
        project.workItems.find((item) => item.id === dependency.successorId)?.predecessorIds.push(dependency.predecessorId);
    });
    reqEndurance.workItemIds = [workBrightness.id, workEndurance.id, workRelease.id];
    reqPower.workItemIds = [workBrightness.id, workEndurance.id, workRelease.id];
    reqIngress.workItemIds = [workGland.id, workRain.id, workRelease.id];
    reqAccuracy.workItemIds = [workRelease.id];
    reqUpdate.workItemIds = [workRelease.id];
    reqDisplay.workItemIds = [workRelease.id];
    const projectBudget = [
        {
            ...(0, factory_1.controlledRecord)('budget', 'COST-001', 'Engineering labor', 'Project Manager', 'approved'),
            category: 'Labor',
            planned: 48000,
            approved: 50000,
            committed: 43800,
            actual: 39750,
            forecast: 52600,
            currency: 'USD',
            vendor: 'Internal',
            purchaseReference: '',
            dueDate: '2026-09-15',
            workItemIds: work.map((item) => item.id),
            requirementIds: project.requirements.map((record) => record.id),
            objectIds: [objSystem.id],
            verificationPlanIds: plans.map((plan) => plan.id),
            documentIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('budget', 'COST-002', 'Prototype materials', 'Mechanical Lead', 'approved'),
            category: 'Material',
            planned: 8200,
            approved: 9000,
            committed: 8650,
            actual: 7830,
            forecast: 9400,
            currency: 'USD',
            vendor: 'Multiple suppliers',
            purchaseReference: 'PO-2026-117',
            dueDate: '2026-08-31',
            workItemIds: [workGland.id],
            requirementIds: [reqIngress.id],
            objectIds: [objEnclosure.id, objSensorAssembly.id, objBattery.id],
            verificationPlanIds: [planIngress.id],
            documentIds: []
        },
        {
            ...(0, factory_1.controlledRecord)('budget', 'COST-003', 'Verification equipment and chamber time', 'Verification Lead', 'approved'),
            category: 'Test equipment',
            planned: 12500,
            approved: 13000,
            committed: 11200,
            actual: 9400,
            forecast: 12800,
            currency: 'USD',
            vendor: 'Regional Test Laboratory',
            purchaseReference: 'PO-2026-102',
            dueDate: '2026-09-05',
            workItemIds: [workEndurance.id, workRain.id],
            requirementIds: [reqEndurance.id, reqAccuracy.id, reqIngress.id],
            objectIds: [objSystem.id],
            verificationPlanIds: plans.map((plan) => plan.id),
            documentIds: []
        }
    ];
    project.projectBudgetLines = projectBudget;
    projectBudget.forEach((line) => line.workItemIds.forEach((workId) => project.workItems.find((item) => item.id === workId)?.budgetLineIds.push(line.id)));
    const massBudget = {
        ...(0, factory_1.controlledRecord)('techbudget', 'TB-MASS-001', 'System mass budget', 'Mechanical Lead', 'active'),
        resourceType: 'Mass',
        unit: 'kg',
        aggregationRule: 'sum',
        totalAvailable: 3.5,
        reserve: 0.25,
        threshold: 3.5,
        target: 3.0,
        applicableMode: 'All modes',
        applicableScenario: 'Field-carry configuration',
        customFormula: '',
        allocations: [
            { id: (0, id_1.createId)('alloc'), objectId: objSensorSubsystem.id, label: 'Sensor subsystem', allocation: 0.45, estimate: 0.41, measuredActual: 0.42, uncertainty: 0.02, confidence: 90, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objPowerSubsystem.id, label: 'Power subsystem', allocation: 1.45, estimate: 1.39, measuredActual: 1.43, uncertainty: 0.04, confidence: 88, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objController.id, label: 'Controller and display', allocation: 0.55, estimate: 0.51, measuredActual: 0.52, uncertainty: 0.02, confidence: 92, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objEnclosure.id, label: 'Enclosure', allocation: 0.8, estimate: 0.76, measuredActual: 0.79, uncertainty: 0.03, confidence: 85, evidenceIds: [] }
        ]
    };
    const powerBudget = {
        ...(0, factory_1.controlledRecord)('techbudget', 'TB-POWER-001', 'Monitoring power budget', 'Power Lead', 'active'),
        resourceType: 'Electrical power',
        unit: 'W',
        aggregationRule: 'sum',
        totalAvailable: 2.5,
        reserve: 0.2,
        threshold: 2.5,
        target: 1.8,
        applicableMode: 'Monitoring',
        applicableScenario: '10-second sampling and 5-minute synchronization',
        customFormula: '',
        allocations: [
            { id: (0, id_1.createId)('alloc'), objectId: objSensorSubsystem.id, label: 'Sensors', allocation: 0.25, estimate: 0.2, measuredActual: 0.22, uncertainty: 0.03, confidence: 90, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objController.id, label: 'Controller', allocation: 0.55, estimate: 0.5, measuredActual: 0.54, uncertainty: 0.05, confidence: 90, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objDisplayModule.id, label: 'Display', allocation: 0.75, estimate: 0.65, measuredActual: 1.31, uncertainty: 0.1, confidence: 95, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objPowerService.id, label: 'Radio and power services', allocation: 0.55, estimate: 0.48, measuredActual: 0.72, uncertainty: 0.08, confidence: 88, evidenceIds: [] },
            { id: (0, id_1.createId)('alloc'), objectId: objPowerBoard.id, label: 'Conversion losses', allocation: 0.2, estimate: 0.18, measuredActual: 0.25, uncertainty: 0.04, confidence: 80, evidenceIds: [] }
        ]
    };
    project.technicalBudgets = [massBudget, powerBudget];
    const documents = [
        {
            ...(0, factory_1.controlledRecord)('doc', 'DOC-001', 'Product Concept Brief', 'Systems Engineering Lead', 'current'),
            documentType: 'Specification',
            author: 'Product Team',
            date: '2026-07-01',
            source: 'Local project library',
            status: 'current',
            description: 'Stakeholder needs and initial system requirements.',
            fileName: 'product-concept-brief-rev-a.pdf',
            mimeType: 'application/pdf',
            fileSize: 286000,
            integrityFingerprint: 'SHA-256 sample: 4f13…c91a',
            approvalState: 'approved',
            linkedRecordIds: [reqEndurance.id, reqAccuracy.id, reqUpdate.id, reqIngress.id, reqDisplay.id]
        },
        {
            ...(0, factory_1.controlledRecord)('doc', 'DOC-002', 'Temperature Calibration Report', 'Sensor Lead', 'current'),
            documentType: 'Test report',
            author: 'Sensor Engineering',
            date: '2026-08-08',
            source: 'Local project library',
            status: 'current',
            description: 'Raw and processed calibration results.',
            fileName: 'temperature-calibration-report-rev-b.pdf',
            mimeType: 'application/pdf',
            fileSize: 841000,
            integrityFingerprint: 'SHA-256 sample: 81a2…e101',
            approvalState: 'approved',
            linkedRecordIds: [reqAccuracy.id, reqSensorUnit.id, reqCompensation.id, planAccuracy.id, runAccuracy.id]
        },
        {
            ...(0, factory_1.controlledRecord)('doc', 'DOC-003', 'Endurance Test Data Package — Run 1', 'Verification Lead', 'current'),
            documentType: 'Test data',
            author: 'Verification Team',
            date: '2026-08-14',
            source: 'Local project library',
            status: 'current',
            description: 'Power log, observations, configuration record, and signed disposition for the failed run.',
            fileName: 'endurance-run-1-data.zip',
            mimeType: 'application/zip',
            fileSize: 2483000,
            integrityFingerprint: 'SHA-256 sample: 3b3f…5d7e',
            approvalState: 'approved',
            linkedRecordIds: [reqEndurance.id, reqPower.id, planEndurance.id, runEndurance.id, fmBattery.id]
        },
        {
            ...(0, factory_1.controlledRecord)('doc', 'DOC-004', 'Display Readability Trial Report', 'Human Factors Lead', 'current'),
            documentType: 'Operational validation report',
            author: 'Human Factors Team',
            date: '2026-08-12',
            source: 'Local project library',
            status: 'current',
            description: 'Participant results, observations, and acceptance recommendation.',
            fileName: 'display-readability-trial-rev-a.pdf',
            mimeType: 'application/pdf',
            fileSize: 412000,
            integrityFingerprint: 'SHA-256 sample: b18e…3204',
            approvalState: 'approved',
            linkedRecordIds: [reqDisplay.id, planDisplay.id, runDisplay.id]
        },
        {
            ...(0, factory_1.controlledRecord)('doc', 'DOC-005', 'Enclosure Drawing Revision B', 'Mechanical Lead', 'superseded'),
            documentType: 'Drawing',
            author: 'Mechanical Engineering',
            date: '2026-07-20',
            source: 'Local project library',
            status: 'superseded',
            description: 'Prior cable-gland design. Retained for history.',
            fileName: 'enclosure-rev-b.pdf',
            mimeType: 'application/pdf',
            fileSize: 535000,
            integrityFingerprint: 'SHA-256 sample: a971…fa00',
            approvalState: 'approved',
            linkedRecordIds: [reqIngress.id, objEnclosure.id, intEnclosure.id]
        },
        {
            ...(0, factory_1.controlledRecord)('doc', 'DOC-006', 'Enclosure Drawing Revision C', 'Mechanical Lead', 'under-review'),
            documentType: 'Drawing',
            author: 'Mechanical Engineering',
            date: '2026-08-15',
            source: 'Local project library',
            status: 'under-review',
            description: 'Revised cable-gland design awaiting installation and verification.',
            fileName: 'enclosure-rev-c.pdf',
            mimeType: 'application/pdf',
            fileSize: 548000,
            integrityFingerprint: 'SHA-256 sample: d11a…cb22',
            approvalState: 'under-review',
            linkedRecordIds: [reqIngress.id, objEnclosure.id, intEnclosure.id, workGland.id]
        }
    ];
    documents[4].supersededById = documents[5].id;
    project.documents = documents;
    const [docConcept, docCalibration, docEndurance, docReadability, docEnclosureB, docEnclosureC] = documents;
    reqEndurance.evidenceIds = [docConcept.id, docEndurance.id];
    reqPower.evidenceIds = [docEndurance.id];
    reqAccuracy.evidenceIds = [docConcept.id, docCalibration.id];
    reqSensorUnit.evidenceIds = [docCalibration.id];
    reqCompensation.evidenceIds = [docCalibration.id];
    reqUpdate.evidenceIds = [docConcept.id];
    reqDisplay.evidenceIds = [docConcept.id, docReadability.id];
    reqIngress.evidenceIds = [docConcept.id, docEnclosureB.id, docEnclosureC.id];
    runAccuracy.evidenceIds = [docCalibration.id];
    runEndurance.evidenceIds = [docEndurance.id];
    runDisplay.evidenceIds = [docReadability.id];
    planAccuracy.documentIds = [docCalibration.id];
    planEndurance.documentIds = [docEndurance.id];
    planDisplay.documentIds = [docReadability.id];
    planIngress.documentIds = [docEnclosureC.id];
    intEnclosure.documentIds = [docEnclosureB.id, docEnclosureC.id];
    fmBattery.evidenceIds = [docEndurance.id];
    fmIngress.evidenceIds = [docEnclosureB.id, docEnclosureC.id];
    project.links = [
        link('decomposes-into', reqEndurance.id, reqBattery.id, 'Endurance depends on usable energy.'),
        link('decomposes-into', reqEndurance.id, reqPower.id, 'Endurance depends on average system power.'),
        link('decomposes-into', reqAccuracy.id, reqSensorUnit.id, 'System accuracy includes sensor intrinsic error.'),
        link('decomposes-into', reqAccuracy.id, reqCompensation.id, 'Software compensation contributes to system accuracy.'),
        ...project.requirements.flatMap((record) => [
            ...record.functionIds.map((functionId) => link('allocated-to', record.id, functionId)),
            ...record.objectIds.map((objectId) => link('realized-by', record.id, objectId)),
            ...record.verificationPlanIds.map((planId) => link('verified-by', record.id, planId)),
            ...record.evidenceIds.map((documentId) => link('supported-by', record.id, documentId)),
            ...record.workItemIds.map((workId) => link('scheduled-by', record.id, workId))
        ]),
        ...project.functions.flatMap((record) => record.objectIds.map((objectId) => link('performed-by', record.id, objectId))),
        link('mitigated-by', fmBattery.id, workBrightness.id),
        link('mitigated-by', fmIngress.id, workGland.id),
        ...projectBudget.flatMap((line) => line.requirementIds.map((requirementId) => link('funded-by', requirementId, line.id)))
    ];
    const actionPower = {
        ...(0, factory_1.controlledRecord)('action', 'ACT-001', 'Close endurance shortfall', 'Power Lead', 'open'),
        kind: 'action',
        description: 'Coordinate firmware power reduction, update the power budget, and rerun endurance verification.',
        priority: 'critical',
        dueDate: '2026-08-28',
        status: 'in-progress',
        blockingRecordIds: [reqEndurance.id, reqPower.id, workRelease.id],
        resolution: '',
        evidenceIds: [docEndurance.id],
        affectedRecordIds: [reqEndurance.id, reqPower.id, fmBattery.id, workBrightness.id, workEndurance.id]
    };
    const issueSupplier = {
        ...(0, factory_1.controlledRecord)('issue', 'ISS-001', 'Cable-gland shipment delay', 'Mechanical Lead', 'open'),
        kind: 'issue',
        description: 'The revised cable gland will arrive after its planned installation date.',
        priority: 'high',
        dueDate: '2026-08-25',
        status: 'blocked',
        blockingRecordIds: [workGland.id, workRain.id, reqIngress.id],
        resolution: '',
        evidenceIds: [],
        affectedRecordIds: [reqIngress.id, fmIngress.id, workGland.id, workRain.id]
    };
    project.issuesActions = [actionPower, issueSupplier];
    project.revision = 1;
    const baselineOneSnapshot = snapshot(project);
    const baselineOne = {
        ...(0, factory_1.controlledRecord)('baseline', 'BL-001', 'Preliminary Design Baseline', 'Systems Engineering Lead', 'approved'),
        description: 'Approved preliminary design configuration before the endurance target was increased and enclosure corrective work was replanned.',
        approvedBy: 'Project Review Board',
        approvedAt: at('2026-08-01'),
        snapshot: baselineOneSnapshot
    };
    reqEndurance.revision = 2;
    reqEndurance.updatedAt = at('2026-08-10');
    reqEndurance.history.push((0, factory_1.historyEntry)('Requirement revised', 2, 'Target increased from 30 hours to 36 hours after stakeholder review.', 'Systems Engineering Lead'));
    reqEndurance.baselineIds = [baselineOne.id];
    reqIngress.revision = 2;
    reqIngress.updatedAt = at('2026-08-15');
    reqIngress.history.push((0, factory_1.historyEntry)('Requirement impact reviewed', 2, 'Cable-entry evidence declared stale pending revision C demonstration.', 'Mechanical Lead'));
    project.revision = 2;
    const changeRequest = {
        ...(0, factory_1.controlledRecord)('change', 'CR-001', 'Increase endurance objective and recover enclosure verification', 'Systems Engineering Lead', 'approved'),
        reason: 'Stakeholders requested longer field deployment and the initial enclosure demonstration identified a cable-entry weakness.',
        originator: 'Field Science Team',
        proposedChange: 'Raise the endurance target to 36 hours, implement power reduction, and replace the cable gland before release.',
        affectedRecordIds: [reqEndurance.id, reqPower.id, reqIngress.id, fmBattery.id, fmIngress.id, workBrightness.id, workGland.id],
        impactAnalysis: 'Firmware, enclosure, test sequence, evidence, schedule, and forecast cost are affected.',
        scheduleImpact: 'Release readiness review forecast slips three days.',
        budgetImpact: 'Forecast increases by 2,800 United States dollars.',
        riskImpact: 'Reduces field mission interruption and ingress risk after closure.',
        verificationImpact: 'Endurance and enclosure demonstrations must be rerun.',
        disposition: 'approved',
        reviewer: 'Project Review Board',
        approval: 'Approved 2026-08-10',
        implementationStatus: 'in-progress',
        resultingRevisionIds: [reqEndurance.id, reqIngress.id]
    };
    project.changeRequests = [changeRequest];
    project.links.push(link('changed-by', reqEndurance.id, changeRequest.id), link('changed-by', reqIngress.id, changeRequest.id));
    const baselineTwoSnapshot = snapshot(project);
    const baselineTwo = {
        ...(0, factory_1.controlledRecord)('baseline', 'BL-002', 'Verification Readiness Baseline', 'Systems Engineering Lead', 'approved'),
        description: 'Current configuration after approved change request and first full verification cycle.',
        approvedBy: 'Project Review Board',
        approvedAt: at('2026-08-16'),
        snapshot: baselineTwoSnapshot
    };
    project.baselines = [baselineOne, baselineTwo];
    project.requirements.forEach((record) => {
        record.baselineIds = [baselineTwo.id, ...(record.baselineIds ?? [])];
    });
    project.updatedAt = (0, dates_1.nowIso)();
    return project;
}

},
"src/domain/calculations.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMetricMargin = calculateMetricMargin;
exports.calculateRequirementCompleteness = calculateRequirementCompleteness;
exports.deriveAllocationState = deriveAllocationState;
exports.latestExecutionForRequirement = latestExecutionForRequirement;
exports.deriveVerificationState = deriveVerificationState;
exports.deriveEvidenceState = deriveEvidenceState;
exports.verificationClosure = verificationClosure;
exports.criticalityScore = criticalityScore;
exports.criticalityCategory = criticalityCategory;
exports.projectBudgetSummary = projectBudgetSummary;
exports.technicalBudgetSummary = technicalBudgetSummary;
exports.requirementReadiness = requirementReadiness;
exports.objectReadiness = objectReadiness;
exports.compareEntityRecords = compareEntityRecords;
exports.compareBaselines = compareBaselines;
exports.projectCockpit = projectCockpit;
exports.recordsNeedingAttention = recordsNeedingAttention;
exports.evidenceForRequirement = evidenceForRequirement;
exports.plansForRequirement = plansForRequirement;
const text_1 = require("../utils/text");
function calculateMetricMargin(metric) {
    if (!metric)
        return undefined;
    const value = metric.measuredValue ?? metric.currentEstimate;
    if (value === undefined)
        return undefined;
    const threshold = metric.threshold;
    if (threshold === undefined)
        return undefined;
    switch (metric.comparisonDirection) {
        case 'at-least':
        case 'greater-than':
            return value - threshold;
        case 'at-most':
        case 'less-than':
            return threshold - value;
        case 'exact':
            return -Math.abs(value - threshold);
        case 'range': {
            if (metric.lowerBound === undefined || metric.upperBound === undefined)
                return undefined;
            if (value < metric.lowerBound)
                return value - metric.lowerBound;
            if (value > metric.upperBound)
                return metric.upperBound - value;
            return Math.min(value - metric.lowerBound, metric.upperBound - value);
        }
        default:
            return undefined;
    }
}
function calculateRequirementCompleteness(requirement) {
    const checks = [
        ['Requirement statement', Boolean(requirement.statement.trim())],
        ['Source', Boolean(requirement.source.trim())],
        ['Rationale', Boolean(requirement.rationale.trim())],
        ['Owner', Boolean(requirement.owner.trim()) && requirement.owner !== 'Unassigned'],
        ['System level', Boolean(requirement.applicableSystemLevel.trim())],
        ['Verification method', requirement.verificationIntent.method !== 'not-yet-determined'],
        ['Acceptance criteria', Boolean(requirement.verificationIntent.acceptanceCriteria.trim())],
        ['Function allocation', requirement.functionIds.length > 0],
        ['Implementation allocation', requirement.objectIds.length > 0],
        ['Failure hypothesis', requirement.failureModeIds.length > 0],
        ['Supporting evidence', requirement.evidenceIds.length > 0],
        ['Next action', Boolean(requirement.nextAction.trim())]
    ];
    if (requirement.metric) {
        checks.push(['Metric', Boolean(requirement.metric.metric.trim())]);
        checks.push(['Unit', Boolean(requirement.metric.unit.trim())]);
        checks.push(['Threshold', requirement.metric.threshold !== undefined || requirement.metric.comparisonDirection === 'descriptive']);
    }
    const missing = checks.filter(([, complete]) => !complete).map(([label]) => label);
    const completed = checks.length - missing.length;
    return {
        completed,
        total: checks.length,
        missing,
        percent: Math.round((completed / checks.length) * 100)
    };
}
function deriveAllocationState(requirement) {
    const hasFunction = requirement.functionIds.length > 0;
    const hasObject = requirement.objectIds.length > 0;
    if (hasFunction && hasObject)
        return 'fully-allocated';
    if (hasFunction || hasObject)
        return 'partially-allocated';
    return 'unallocated';
}
function latestExecutionForRequirement(project, requirementId) {
    return project.testExecutions
        .filter((execution) => execution.requirementIds.includes(requirementId) && execution.result !== 'superseded')
        .sort((a, b) => b.executedAt.localeCompare(a.executedAt))[0];
}
function deriveVerificationState(project, requirement) {
    const latest = latestExecutionForRequirement(project, requirement.id);
    if (latest) {
        if (latest.result === 'passed')
            return 'passed';
        if (latest.result === 'failed' || latest.result === 'inconclusive')
            return 'failed';
        if (latest.result === 'blocked')
            return 'blocked';
        if (latest.result === 'running')
            return 'running';
        if (latest.result === 'waived' || latest.result === 'conditionally-accepted')
            return 'waived';
    }
    const plans = project.verificationPlans.filter((plan) => plan.requirementIds.includes(requirement.id));
    if (!plans.length)
        return 'unplanned';
    if (plans.some((plan) => plan.approvalState === 'approved'))
        return 'ready';
    return 'planned';
}
function deriveEvidenceState(project, requirement) {
    if (!requirement.evidenceIds.length)
        return 'missing';
    const evidence = project.documents.filter((document) => requirement.evidenceIds.includes(document.id));
    if (!evidence.length)
        return 'missing';
    if (evidence.some((document) => document.status === 'stale' || document.status === 'superseded'))
        return 'stale';
    if (evidence.every((document) => document.status === 'current' && document.approvalState !== 'draft'))
        return 'complete';
    return 'incomplete';
}
function verificationClosure(project, requirement) {
    const plans = project.verificationPlans.filter((plan) => plan.requirementIds.includes(requirement.id));
    const approvedPlan = plans.some((plan) => plan.approvalState === 'approved');
    const latest = latestExecutionForRequirement(project, requirement.id);
    const evidence = project.documents.filter((document) => requirement.evidenceIds.includes(document.id));
    const conditions = [
        { label: 'Approved verification plan', met: approvedPlan },
        { label: 'Completed execution', met: Boolean(latest && latest.result !== 'not-run' && latest.result !== 'running') },
        { label: 'Passing result', met: latest?.result === 'passed' },
        { label: 'Acceptance criteria defined', met: Boolean(requirement.verificationIntent.acceptanceCriteria.trim()) },
        { label: 'Evidence attached', met: evidence.length > 0 },
        { label: 'Reviewer disposition', met: Boolean(latest?.reviewer.trim()) },
        { label: 'Correct configuration recorded', met: Boolean(latest?.systemConfiguration.trim()) }
    ];
    return { closed: conditions.every((condition) => condition.met), conditions };
}
function criticalityScore(failure) {
    return failure.severity * failure.likelihood * failure.detectability;
}
function criticalityCategory(score) {
    if (score >= 240)
        return 'critical';
    if (score >= 120)
        return 'high';
    if (score >= 50)
        return 'moderate';
    return 'low';
}
function projectBudgetSummary(lines) {
    const total = (key) => lines.reduce((sum, line) => sum + line[key], 0);
    const planned = total('planned');
    const approved = total('approved');
    const committed = total('committed');
    const actual = total('actual');
    const forecast = total('forecast');
    return {
        planned,
        approved,
        committed,
        actual,
        forecast,
        remaining: approved - actual,
        variance: approved - forecast
    };
}
function technicalBudgetSummary(budget) {
    const values = budget.allocations.map((allocation) => allocation.estimate);
    let estimated = 0;
    switch (budget.aggregationRule) {
        case 'maximum':
            estimated = values.length ? Math.max(...values) : 0;
            break;
        case 'minimum':
            estimated = values.length ? Math.min(...values) : 0;
            break;
        case 'percentage':
            estimated = values.reduce((sum, value) => sum + value, 0) / 100;
            break;
        default:
            estimated = values.reduce((sum, value) => sum + value, 0);
    }
    const allocated = budget.allocations.reduce((sum, allocation) => sum + allocation.allocation, 0);
    const measuredValues = budget.allocations.map((allocation) => allocation.measuredActual).filter((value) => value !== undefined);
    const measured = measuredValues.length ? measuredValues.reduce((sum, value) => sum + value, 0) : estimated;
    const capacity = budget.threshold ?? budget.totalAvailable;
    const margin = capacity - measured - budget.reserve;
    return {
        allocated,
        estimated,
        measured,
        margin,
        utilizationPercent: capacity ? (0, text_1.clamp)(Math.round((measured / capacity) * 100), 0, 999) : 0
    };
}
function requirementReadiness(project, requirement) {
    const objects = project.objects.filter((object) => requirement.objectIds.includes(object.id));
    const plans = project.verificationPlans.filter((plan) => requirement.verificationPlanIds.includes(plan.id));
    const failures = project.failureModes.filter((failure) => requirement.failureModeIds.includes(failure.id));
    const work = project.workItems.filter((item) => requirement.workItemIds.includes(item.id));
    const evidence = project.documents.filter((document) => requirement.evidenceIds.includes(document.id));
    const factors = [
        {
            label: 'Requirement allocation coverage',
            met: requirement.functionIds.length > 0 && requirement.objectIds.length > 0,
            detail: `${requirement.functionIds.length} function allocation(s), ${requirement.objectIds.length} object allocation(s)`
        },
        {
            label: 'Inherited obligations resolved',
            met: objects.every((object) => object.inheritedObligations.every((obligation) => obligation.state !== 'pending-review')),
            detail: `${objects.flatMap((object) => object.inheritedObligations).filter((obligation) => obligation.state === 'pending-review').length} pending`
        },
        {
            label: 'Implementation complete',
            met: objects.length > 0 && objects.every((object) => object.implementationStatus === 'implemented'),
            detail: `${objects.filter((object) => object.implementationStatus === 'implemented').length}/${objects.length || 0} implementing objects complete`
        },
        {
            label: 'High-criticality failures addressed',
            met: failures.every((failure) => !['high', 'critical'].includes(failure.criticalityCategory) || ['verified', 'accepted'].includes(failure.mitigationStatus)),
            detail: `${failures.filter((failure) => ['high', 'critical'].includes(failure.criticalityCategory) && !['verified', 'accepted'].includes(failure.mitigationStatus)).length} open high-criticality concern(s)`
        },
        {
            label: 'Verification plan approved',
            met: plans.length > 0 && plans.every((plan) => plan.approvalState === 'approved'),
            detail: `${plans.filter((plan) => plan.approvalState === 'approved').length}/${plans.length || 0} approved`
        },
        {
            label: 'Blocking work resolved',
            met: work.every((item) => item.status !== 'blocked'),
            detail: `${work.filter((item) => item.status === 'blocked').length} blocked item(s)`
        },
        {
            label: 'Evidence complete',
            met: evidence.length > 0 && evidence.every((document) => document.status === 'current'),
            detail: `${evidence.filter((document) => document.status === 'current').length}/${evidence.length || 0} current artifact(s)`
        }
    ];
    const score = Math.round((factors.filter((factor) => factor.met).length / factors.length) * 100);
    return { score, factors };
}
function objectReadiness(project, object) {
    const obligationsResolved = object.inheritedObligations.every((obligation) => obligation.state !== 'pending-review');
    const requirements = project.requirements.filter((requirement) => object.requirementIds.includes(requirement.id));
    const readyRequirements = requirements.filter((requirement) => requirementReadiness(project, requirement).score >= 80);
    const interfaceRecords = project.interfaces.filter((record) => object.interfaceIds.includes(record.id));
    const verifiedInterfaces = interfaceRecords.filter((record) => record.status === 'verified');
    const factors = [
        object.implementationStatus === 'implemented',
        obligationsResolved,
        requirements.length > 0 && readyRequirements.length === requirements.length,
        interfaceRecords.length === 0 || verifiedInterfaces.length === interfaceRecords.length
    ];
    return Math.round((factors.filter(Boolean).length / factors.length) * 100);
}
function comparableRecord(record) {
    const clone = structuredClone(record);
    delete clone.updatedAt;
    delete clone.history;
    return clone;
}
function changedFields(before, after) {
    const left = comparableRecord(before);
    const right = comparableRecord(after);
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    return [...keys].filter((key) => JSON.stringify(left[key]) !== JSON.stringify(right[key]));
}
function compareEntityRecords(entity, before, after) {
    const beforeMap = new Map(before.map((record) => [record.id, record]));
    const afterMap = new Map(after.map((record) => [record.id, record]));
    const added = after.filter((record) => !beforeMap.has(record.id));
    const removed = before.filter((record) => !afterMap.has(record.id));
    const changed = after
        .filter((record) => beforeMap.has(record.id))
        .map((record) => {
        const original = beforeMap.get(record.id);
        return { before: original, after: record, changedFields: changedFields(original, record) };
    })
        .filter((entry) => entry.changedFields.length > 0);
    return { entity, added, removed, changed };
}
function compareBaselines(a, b) {
    return [
        compareEntityRecords('Requirements', a.snapshot.requirements, b.snapshot.requirements),
        compareEntityRecords('Functions', a.snapshot.functions, b.snapshot.functions),
        compareEntityRecords('Architecture objects', a.snapshot.objects, b.snapshot.objects),
        compareEntityRecords('Interfaces', a.snapshot.interfaces, b.snapshot.interfaces),
        compareEntityRecords('Verification plans', a.snapshot.verificationPlans, b.snapshot.verificationPlans),
        compareEntityRecords('Test executions', a.snapshot.testExecutions, b.snapshot.testExecutions),
        compareEntityRecords('Failure modes', a.snapshot.failureModes, b.snapshot.failureModes),
        compareEntityRecords('Work items', a.snapshot.workItems, b.snapshot.workItems),
        compareEntityRecords('Project budget lines', a.snapshot.projectBudgetLines, b.snapshot.projectBudgetLines),
        compareEntityRecords('Technical budgets', a.snapshot.technicalBudgets, b.snapshot.technicalBudgets),
        compareEntityRecords('Documents', a.snapshot.documents, b.snapshot.documents)
    ];
}
function projectCockpit(project) {
    const activeRequirements = project.requirements.filter((requirement) => !requirement.archived);
    const allocationsComplete = activeRequirements.filter((requirement) => deriveAllocationState(requirement) === 'fully-allocated').length;
    const unverified = activeRequirements.filter((requirement) => deriveVerificationState(project, requirement) !== 'passed').length;
    const evidenceGaps = activeRequirements.filter((requirement) => deriveEvidenceState(project, requirement) !== 'complete').length;
    const highFailures = project.failureModes.filter((failure) => ['high', 'critical'].includes(failure.criticalityCategory) && !['verified', 'accepted'].includes(failure.mitigationStatus)).length;
    const today = new Date().toISOString().slice(0, 10);
    const lateWork = project.workItems.filter((item) => item.status !== 'done' && Boolean(item.plannedFinish) && item.plannedFinish < today).length;
    const budget = projectBudgetSummary(project.projectBudgetLines);
    const staleEvidence = project.documents.filter((document) => ['stale', 'superseded'].includes(document.status)).length;
    const pendingReviews = activeRequirements.filter((requirement) => requirement.statuses.definition === 'under-review').length
        + project.verificationPlans.filter((plan) => plan.approvalState === 'under-review').length;
    return {
        totalRequirements: activeRequirements.length,
        allocationPercent: activeRequirements.length ? Math.round((allocationsComplete / activeRequirements.length) * 100) : 0,
        unverified,
        evidenceGaps,
        highFailures,
        lateWork,
        budget,
        staleEvidence,
        pendingReviews,
        changeRequests: project.changeRequests.filter((request) => !['rejected'].includes(request.disposition) && request.implementationStatus !== 'closed').length
    };
}
function recordsNeedingAttention(project) {
    const rows = [];
    project.requirements.forEach((requirement) => {
        const completeness = calculateRequirementCompleteness(requirement);
        if (completeness.percent < 65) {
            rows.push({ kind: 'Requirement', id: requirement.id, title: requirement.identifier, reason: `${completeness.missing.slice(0, 2).join(' and ')} missing`, severity: 'watch' });
        }
        if (deriveVerificationState(project, requirement) === 'failed') {
            rows.push({ kind: 'Verification', id: requirement.id, title: requirement.identifier, reason: 'Latest verification result failed', severity: 'danger' });
        }
        if (deriveEvidenceState(project, requirement) === 'stale') {
            rows.push({ kind: 'Evidence', id: requirement.id, title: requirement.identifier, reason: 'Supporting evidence is stale', severity: 'watch' });
        }
    });
    project.failureModes
        .filter((failure) => ['high', 'critical'].includes(failure.criticalityCategory) && !['verified', 'accepted'].includes(failure.mitigationStatus))
        .forEach((failure) => rows.push({ kind: 'Failure mode', id: failure.id, title: failure.identifier, reason: `${failure.criticalityCategory} criticality mitigation remains ${failure.mitigationStatus}`, severity: 'danger' }));
    project.workItems
        .filter((item) => item.status === 'blocked')
        .forEach((item) => rows.push({ kind: 'Work item', id: item.id, title: item.identifier, reason: item.blockedReason || 'Work is blocked', severity: 'danger' }));
    return rows.slice(0, 30);
}
function evidenceForRequirement(project, requirement) {
    return project.documents.filter((document) => requirement.evidenceIds.includes(document.id));
}
function plansForRequirement(project, requirement) {
    return project.verificationPlans.filter((plan) => plan.requirementIds.includes(requirement.id));
}

},
"src/domain/factory.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA_VERSION = exports.APP_VERSION = void 0;
exports.historyEntry = historyEntry;
exports.controlledRecord = controlledRecord;
exports.defaultRequirementStatuses = defaultRequirementStatuses;
exports.defaultVerificationIntent = defaultVerificationIntent;
exports.emptyRequirement = emptyRequirement;
exports.defaultSettings = defaultSettings;
exports.createEmptyProject = createEmptyProject;
exports.touchProject = touchProject;
exports.reviseRecord = reviseRecord;
const id_1 = require("../utils/id");
const dates_1 = require("../utils/dates");
exports.APP_VERSION = '0.1.0';
exports.SCHEMA_VERSION = '0.1.0';
function historyEntry(action, revision = 1, summary = '', by = 'Local user') {
    return {
        id: (0, id_1.createId)('hist'),
        at: (0, dates_1.nowIso)(),
        by,
        action,
        revision,
        summary
    };
}
function controlledRecord(prefix, identifier, title, owner = 'Unassigned', lifecycleState = 'draft') {
    const now = (0, dates_1.nowIso)();
    return {
        id: (0, id_1.createId)(prefix),
        identifier,
        title,
        revision: 1,
        owner,
        lifecycleState,
        createdAt: now,
        updatedAt: now,
        history: [historyEntry('Created', 1)],
        notes: '',
        tags: [],
        archived: false
    };
}
function defaultRequirementStatuses() {
    return {
        definition: 'draft',
        allocation: 'unallocated',
        implementation: 'not-started',
        verification: 'unplanned',
        validation: 'unplanned',
        evidence: 'missing'
    };
}
function defaultVerificationIntent(owner = 'Unassigned') {
    return {
        method: 'not-yet-determined',
        level: 'system',
        acceptanceCriteria: '',
        owner,
        requiredConfiguration: '',
        requiredEnvironment: '',
        requiredEquipment: '',
        requiredEvidence: ''
    };
}
function emptyRequirement(identifier) {
    return {
        ...controlledRecord('req', identifier, 'Untitled requirement'),
        statement: '',
        source: '',
        sourceLocation: '',
        stakeholder: '',
        rationale: '',
        requirementType: 'system',
        priority: 'normal',
        reviewer: '',
        childIds: [],
        applicableSystemLevel: 'System',
        applicableOperatingMode: 'All modes',
        applicableEnvironment: '',
        assumptions: [],
        constraints: [],
        dependencyIds: [],
        decisionIds: [],
        baselineIds: [],
        verificationIntent: defaultVerificationIntent(),
        functionIds: [],
        objectIds: [],
        interfaceIds: [],
        failureModeIds: [],
        verificationPlanIds: [],
        testExecutionIds: [],
        evidenceIds: [],
        workItemIds: [],
        statuses: defaultRequirementStatuses(),
        blockers: [],
        nextAction: 'Complete requirement definition.'
    };
}
function defaultSettings() {
    return {
        mode: 'easy',
        theme: 'system',
        navigationCollapsed: false,
        inspectorOpen: true,
        activeSection: 'cockpit',
        activeTabs: {},
        savedFilters: {}
    };
}
function createEmptyProject(name = 'Untitled LOOM Project') {
    const now = (0, dates_1.nowIso)();
    return {
        schemaVersion: exports.SCHEMA_VERSION,
        applicationVersion: exports.APP_VERSION,
        id: (0, id_1.createId)('project'),
        name,
        description: 'A local systems-engineering project.',
        revision: 1,
        createdAt: now,
        updatedAt: now,
        archived: false,
        isSample: false,
        settings: defaultSettings(),
        requirements: [],
        functions: [],
        objects: [],
        interfaces: [],
        verificationPlans: [],
        testCases: [],
        testExecutions: [],
        failureModes: [],
        workItems: [],
        workDependencies: [],
        projectBudgetLines: [],
        technicalBudgets: [],
        documents: [],
        links: [],
        decisions: [],
        assumptions: [],
        issuesActions: [],
        baselines: [],
        changeRequests: []
    };
}
function touchProject(project) {
    return {
        ...project,
        revision: project.revision + 1,
        updatedAt: (0, dates_1.nowIso)(),
        applicationVersion: exports.APP_VERSION,
        schemaVersion: exports.SCHEMA_VERSION
    };
}
function reviseRecord(record, action, summary = '') {
    const revision = record.revision + 1;
    return {
        ...record,
        revision,
        updatedAt: (0, dates_1.nowIso)(),
        history: [...record.history, historyEntry(action, revision, summary)]
    };
}

},
"src/domain/migrations.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjectCandidate = validateProjectCandidate;
exports.migrateProject = migrateProject;
const factory_1 = require("./factory");
function validateProjectCandidate(candidate) {
    const errors = [];
    if (!candidate || typeof candidate !== 'object')
        return { valid: false, errors: ['The imported file is not an object.'] };
    const project = candidate;
    if (!project.id || typeof project.id !== 'string')
        errors.push('Project identifier is missing.');
    if (!project.name || typeof project.name !== 'string')
        errors.push('Project name is missing.');
    const arrayFields = [
        'requirements',
        'functions',
        'objects',
        'interfaces',
        'verificationPlans',
        'testCases',
        'testExecutions',
        'failureModes',
        'workItems',
        'workDependencies',
        'projectBudgetLines',
        'technicalBudgets',
        'documents',
        'links',
        'decisions',
        'assumptions',
        'issuesActions',
        'baselines',
        'changeRequests'
    ];
    arrayFields.forEach((field) => {
        if (project[field] !== undefined && !Array.isArray(project[field]))
            errors.push(`${String(field)} must be an array.`);
    });
    return { valid: errors.length === 0, errors };
}
function migrateProject(candidate) {
    const validation = validateProjectCandidate(candidate);
    if (!validation.valid)
        throw new Error(validation.errors.join('\n'));
    const project = candidate;
    const settings = { ...(0, factory_1.defaultSettings)(), ...(project.settings ?? {}) };
    return {
        ...project,
        schemaVersion: factory_1.SCHEMA_VERSION,
        applicationVersion: factory_1.APP_VERSION,
        revision: project.revision ?? 1,
        description: project.description ?? '',
        archived: project.archived ?? false,
        isSample: project.isSample ?? false,
        settings,
        requirements: project.requirements ?? [],
        functions: project.functions ?? [],
        objects: project.objects ?? [],
        interfaces: project.interfaces ?? [],
        verificationPlans: project.verificationPlans ?? [],
        testCases: project.testCases ?? [],
        testExecutions: project.testExecutions ?? [],
        failureModes: project.failureModes ?? [],
        workItems: project.workItems ?? [],
        workDependencies: project.workDependencies ?? [],
        projectBudgetLines: project.projectBudgetLines ?? [],
        technicalBudgets: project.technicalBudgets ?? [],
        documents: project.documents ?? [],
        links: project.links ?? [],
        decisions: project.decisions ?? [],
        assumptions: project.assumptions ?? [],
        issuesActions: project.issuesActions ?? [],
        baselines: project.baselines ?? [],
        changeRequests: project.changeRequests ?? []
    };
}

},
"src/domain/schedule.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSchedule = calculateSchedule;
function calculateSchedule(items, dependencies) {
    const active = items.filter((item) => !item.archived);
    const ids = new Set(active.map((item) => item.id));
    const relevant = dependencies.filter((dependency) => ids.has(dependency.predecessorId) && ids.has(dependency.successorId));
    const incoming = new Map();
    const outgoing = new Map();
    active.forEach((item) => {
        incoming.set(item.id, []);
        outgoing.set(item.id, []);
    });
    relevant.forEach((dependency) => {
        incoming.get(dependency.successorId)?.push(dependency);
        outgoing.get(dependency.predecessorId)?.push(dependency);
    });
    const indegree = new Map(active.map((item) => [item.id, incoming.get(item.id)?.length ?? 0]));
    const queue = active.filter((item) => (indegree.get(item.id) ?? 0) === 0).map((item) => item.id);
    const order = [];
    while (queue.length) {
        const id = queue.shift();
        order.push(id);
        outgoing.get(id)?.forEach((dependency) => {
            const next = (indegree.get(dependency.successorId) ?? 1) - 1;
            indegree.set(dependency.successorId, next);
            if (next === 0)
                queue.push(dependency.successorId);
        });
    }
    if (order.length !== active.length) {
        return {
            criticalPathIds: [],
            earliestStart: {},
            earliestFinish: {},
            latestStart: {},
            latestFinish: {},
            slack: {},
            hasCycle: true
        };
    }
    const itemMap = new Map(active.map((item) => [item.id, item]));
    const earliestStart = {};
    const earliestFinish = {};
    order.forEach((id) => {
        const predecessors = incoming.get(id) ?? [];
        earliestStart[id] = predecessors.length
            ? Math.max(...predecessors.map((dependency) => (earliestFinish[dependency.predecessorId] ?? 0) + dependency.lagDays))
            : 0;
        earliestFinish[id] = earliestStart[id] + Math.max(0, itemMap.get(id)?.durationDays ?? 0);
    });
    const projectFinish = Math.max(0, ...Object.values(earliestFinish));
    const latestFinish = {};
    const latestStart = {};
    [...order].reverse().forEach((id) => {
        const successors = outgoing.get(id) ?? [];
        latestFinish[id] = successors.length
            ? Math.min(...successors.map((dependency) => (latestStart[dependency.successorId] ?? projectFinish) - dependency.lagDays))
            : projectFinish;
        latestStart[id] = latestFinish[id] - Math.max(0, itemMap.get(id)?.durationDays ?? 0);
    });
    const slack = {};
    order.forEach((id) => {
        slack[id] = latestStart[id] - earliestStart[id];
    });
    return {
        criticalPathIds: order.filter((id) => Math.abs(slack[id]) < 0.0001),
        earliestStart,
        earliestFinish,
        latestStart,
        latestFinish,
        slack,
        hasCycle: false
    };
}

},
"src/domain/types.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},
"src/hooks/ProjectContext.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectProvider = ProjectProvider;
exports.useProject = useProject;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const sampleProject_1 = require("../data/sampleProject");
const db_1 = require("../services/db");
const id_1 = require("../utils/id");
const ProjectContext = (0, react_1.createContext)(undefined);
function ProjectProvider({ children }) {
    const [project, setProject] = (0, react_1.useState)(() => (0, sampleProject_1.createSampleProject)());
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [saveState, setSaveState] = (0, react_1.useState)('saved');
    const [toast, setToast] = (0, react_1.useState)(null);
    const initialized = (0, react_1.useRef)(false);
    const skipNextAutosave = (0, react_1.useRef)(false);
    const saveTimer = (0, react_1.useRef)(undefined);
    const notify = (0, react_1.useCallback)((message, tone = 'info') => {
        setToast({ id: (0, id_1.createId)('toast'), message, tone });
    }, []);
    const dismissToast = (0, react_1.useCallback)(() => setToast(null), []);
    const refreshProjects = (0, react_1.useCallback)(async () => {
        setProjects(await (0, db_1.listProjects)());
    }, []);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        (async () => {
            try {
                const lastId = (0, db_1.lastProjectId)();
                const stored = lastId ? await (0, db_1.loadProject)(lastId) : undefined;
                const initial = stored ?? (0, sampleProject_1.createSampleProject)();
                if (cancelled)
                    return;
                skipNextAutosave.current = true;
                setProject(initial);
                if (!stored)
                    await (0, db_1.saveProject)(initial);
                await refreshProjects();
                setSaveState('saved');
            }
            catch (error) {
                if (!cancelled) {
                    setProject((0, sampleProject_1.createSampleProject)());
                    setSaveState('recovery');
                    notify(error instanceof Error ? error.message : 'LOOM opened with a recovery project.', 'warning');
                }
            }
            finally {
                if (!cancelled) {
                    initialized.current = true;
                    setLoading(false);
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [notify, refreshProjects]);
    (0, react_1.useEffect)(() => {
        if (!initialized.current || loading)
            return;
        if (skipNextAutosave.current) {
            skipNextAutosave.current = false;
            return;
        }
        setSaveState('unsaved');
        if (saveTimer.current)
            window.clearTimeout(saveTimer.current);
        saveTimer.current = window.setTimeout(async () => {
            setSaveState('saving');
            try {
                await (0, db_1.saveProject)(project);
                setSaveState('saved');
                await refreshProjects();
            }
            catch (error) {
                setSaveState('error');
                notify(error instanceof Error ? error.message : 'Unable to save the project locally.', 'danger');
            }
        }, 650);
        return () => {
            if (saveTimer.current)
                window.clearTimeout(saveTimer.current);
        };
    }, [project, loading, notify, refreshProjects]);
    (0, react_1.useEffect)(() => {
        const root = document.documentElement;
        const theme = project.settings.theme;
        const resolved = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
        root.dataset.theme = resolved;
        root.style.colorScheme = resolved;
    }, [project.settings.theme]);
    const updateProject = (0, react_1.useCallback)((mutator, summary = 'Project updated') => {
        setProject((current) => {
            const draft = structuredClone(current);
            mutator(draft);
            const touched = (0, factory_1.touchProject)(draft);
            touched.description = touched.description;
            void summary;
            return touched;
        });
    }, []);
    const updateSettings = (0, react_1.useCallback)((mutator) => {
        setProject((current) => {
            const next = structuredClone(current);
            mutator(next.settings);
            next.updatedAt = new Date().toISOString();
            return next;
        });
    }, []);
    const replaceProject = (0, react_1.useCallback)(async (nextProject, notice) => {
        skipNextAutosave.current = true;
        setProject(nextProject);
        setSaveState('saving');
        await (0, db_1.saveProject)(nextProject);
        setSaveState('saved');
        await refreshProjects();
        if (notice)
            notify(notice, 'success');
    }, [notify, refreshProjects]);
    const createFreshProject = (0, react_1.useCallback)(async () => {
        const fresh = (0, factory_1.createEmptyProject)('Untitled LOOM Project');
        await replaceProject(fresh, 'Fresh empty project created.');
    }, [replaceProject]);
    const loadSampleProject = (0, react_1.useCallback)(async () => {
        const sample = (0, sampleProject_1.createSampleProject)();
        await replaceProject(sample, 'Sample project loaded.');
    }, [replaceProject]);
    const duplicateCurrentProject = (0, react_1.useCallback)(async () => {
        const duplicate = structuredClone(project);
        duplicate.id = (0, id_1.createId)('project');
        duplicate.name = `${project.name} — Copy`;
        duplicate.archived = false;
        duplicate.isSample = false;
        duplicate.createdAt = new Date().toISOString();
        duplicate.updatedAt = duplicate.createdAt;
        duplicate.revision = 1;
        await replaceProject(duplicate, 'Project duplicated.');
    }, [project, replaceProject]);
    const archiveCurrentProject = (0, react_1.useCallback)(async () => {
        const archived = { ...project, archived: true, updatedAt: new Date().toISOString() };
        await replaceProject(archived, 'Project archived.');
    }, [project, replaceProject]);
    const restoreCurrentProject = (0, react_1.useCallback)(async () => {
        const restored = { ...project, archived: false, updatedAt: new Date().toISOString() };
        await replaceProject(restored, 'Project restored.');
    }, [project, replaceProject]);
    const permanentlyDeleteCurrentProject = (0, react_1.useCallback)(async () => {
        const id = project.id;
        await (0, db_1.deleteProject)(id);
        const remaining = (await (0, db_1.listProjects)()).filter((summary) => summary.id !== id);
        const next = remaining[0] ? await (0, db_1.loadProject)(remaining[0].id) : undefined;
        await replaceProject(next ?? (0, factory_1.createEmptyProject)(), 'Project permanently deleted.');
    }, [project.id, replaceProject]);
    const switchProject = (0, react_1.useCallback)(async (id) => {
        if (id === project.id)
            return;
        const loaded = await (0, db_1.loadProject)(id);
        if (!loaded) {
            notify('The selected local project could not be opened.', 'danger');
            return;
        }
        skipNextAutosave.current = true;
        setProject(loaded);
        setSaveState('saved');
        localStorage.setItem('loom-last-project-id', id);
    }, [notify, project.id]);
    const value = (0, react_1.useMemo)(() => ({
        project,
        projects,
        loading,
        saveState,
        toast,
        updateProject,
        updateSettings,
        replaceProject,
        createFreshProject,
        loadSampleProject,
        duplicateCurrentProject,
        archiveCurrentProject,
        restoreCurrentProject,
        permanentlyDeleteCurrentProject,
        switchProject,
        notify,
        dismissToast
    }), [
        project,
        projects,
        loading,
        saveState,
        toast,
        updateProject,
        updateSettings,
        replaceProject,
        createFreshProject,
        loadSampleProject,
        duplicateCurrentProject,
        archiveCurrentProject,
        restoreCurrentProject,
        permanentlyDeleteCurrentProject,
        switchProject,
        notify,
        dismissToast
    ]);
    return React.createElement(ProjectContext.Provider, { value: value }, children);
}
function useProject() {
    const value = (0, react_1.useContext)(ProjectContext);
    if (!value)
        throw new Error('useProject must be used inside ProjectProvider.');
    return value;
}

},
"src/main.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
const ProjectContext_1 = require("./hooks/ProjectContext");
require("./styles.css");
(0, client_1.createRoot)(document.getElementById('root')).render(React.createElement(react_1.StrictMode, null,
    React.createElement(ProjectContext_1.ProjectProvider, null,
        React.createElement(App_1.default, null))));
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {
            // The application remains functional without service-worker registration.
        });
    });
}

},
"src/services/db.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProject = saveProject;
exports.loadProject = loadProject;
exports.listProjects = listProjects;
exports.deleteProject = deleteProject;
exports.lastProjectId = lastProjectId;
const migrations_1 = require("../domain/migrations");
const DATABASE_NAME = 'loom-local-projects';
const DATABASE_VERSION = 1;
const PROJECT_STORE = 'projects';
const FALLBACK_PREFIX = 'loom-project:';
function openDatabase() {
    return new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) {
            reject(new Error('IndexedDB is unavailable.'));
            return;
        }
        const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
        request.onupgradeneeded = () => {
            const database = request.result;
            if (!database.objectStoreNames.contains(PROJECT_STORE)) {
                const store = database.createObjectStore(PROJECT_STORE, { keyPath: 'id' });
                store.createIndex('updatedAt', 'updatedAt');
                store.createIndex('archived', 'archived');
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error('Unable to open local project database.'));
    });
}
function requestResult(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error('Local database request failed.'));
    });
}
function transactionDone(transaction) {
    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error ?? new Error('Local database transaction failed.'));
        transaction.onabort = () => reject(transaction.error ?? new Error('Local database transaction was aborted.'));
    });
}
function saveFallback(project) {
    localStorage.setItem(`${FALLBACK_PREFIX}${project.id}`, JSON.stringify(project));
    localStorage.setItem('loom-last-project-id', project.id);
}
function loadFallback(id) {
    const raw = localStorage.getItem(`${FALLBACK_PREFIX}${id}`);
    if (!raw)
        return undefined;
    return (0, migrations_1.migrateProject)(JSON.parse(raw));
}
async function saveProject(project) {
    const updated = { ...project, updatedAt: new Date().toISOString() };
    try {
        const database = await openDatabase();
        const transaction = database.transaction(PROJECT_STORE, 'readwrite');
        transaction.objectStore(PROJECT_STORE).put(updated);
        await transactionDone(transaction);
        database.close();
        localStorage.setItem('loom-last-project-id', project.id);
    }
    catch (error) {
        try {
            saveFallback(updated);
        }
        catch {
            throw error;
        }
    }
}
async function loadProject(id) {
    try {
        const database = await openDatabase();
        const transaction = database.transaction(PROJECT_STORE, 'readonly');
        const result = await requestResult(transaction.objectStore(PROJECT_STORE).get(id));
        await transactionDone(transaction);
        database.close();
        return result ? (0, migrations_1.migrateProject)(result) : loadFallback(id);
    }
    catch {
        return loadFallback(id);
    }
}
async function listProjects() {
    const summaries = new Map();
    try {
        const database = await openDatabase();
        const transaction = database.transaction(PROJECT_STORE, 'readonly');
        const records = (await requestResult(transaction.objectStore(PROJECT_STORE).getAll()));
        await transactionDone(transaction);
        database.close();
        records.forEach((project) => {
            summaries.set(project.id, {
                id: project.id,
                name: project.name,
                description: project.description,
                updatedAt: project.updatedAt,
                archived: project.archived,
                isSample: project.isSample,
                revision: project.revision
            });
        });
    }
    catch {
        // The localStorage fallback is scanned below.
    }
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith(FALLBACK_PREFIX))
            continue;
        try {
            const raw = localStorage.getItem(key);
            if (!raw)
                continue;
            const project = (0, migrations_1.migrateProject)(JSON.parse(raw));
            summaries.set(project.id, {
                id: project.id,
                name: project.name,
                description: project.description,
                updatedAt: project.updatedAt,
                archived: project.archived,
                isSample: project.isSample,
                revision: project.revision
            });
        }
        catch {
            // Ignore a single damaged fallback entry while retaining other projects.
        }
    }
    return [...summaries.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
async function deleteProject(id) {
    try {
        const database = await openDatabase();
        const transaction = database.transaction(PROJECT_STORE, 'readwrite');
        transaction.objectStore(PROJECT_STORE).delete(id);
        await transactionDone(transaction);
        database.close();
    }
    catch {
        // Continue and clear any fallback record.
    }
    localStorage.removeItem(`${FALLBACK_PREFIX}${id}`);
    if (localStorage.getItem('loom-last-project-id') === id)
        localStorage.removeItem('loom-last-project-id');
}
function lastProjectId() {
    return localStorage.getItem('loom-last-project-id');
}

},
"src/services/files.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBlob = downloadBlob;
exports.exportProject = exportProject;
exports.importProject = importProject;
exports.exportCsv = exportCsv;
exports.fileToDataUrl = fileToDataUrl;
exports.sha256 = sha256;
exports.downloadEvidence = downloadEvidence;
exports.slug = slug;
const migrations_1 = require("../domain/migrations");
function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function exportProject(project) {
    const manifest = {
        exportedAt: new Date().toISOString(),
        application: 'LOOM — Systems Engineering Project Control',
        applicationVersion: project.applicationVersion,
        schemaVersion: project.schemaVersion,
        project
    };
    downloadBlob(new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' }), `${slug(project.name)}-loom-${project.applicationVersion}.json`);
}
async function importProject(file) {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const candidate = typeof parsed === 'object' && parsed && 'project' in parsed ? parsed.project : parsed;
    return (0, migrations_1.migrateProject)(candidate);
}
function exportCsv(fileName, rows) {
    if (!rows.length) {
        downloadBlob(new Blob([''], { type: 'text/csv;charset=utf-8' }), fileName);
        return;
    }
    const columns = [...rows.reduce((keys, row) => {
            Object.keys(row).forEach((key) => keys.add(key));
            return keys;
        }, new Set())];
    const escape = (value) => {
        const normalized = value === undefined || value === null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
        return /[",\n\r]/.test(normalized) ? `"${normalized.replace(/"/g, '""')}"` : normalized;
    };
    const csv = [columns.map(escape).join(','), ...rows.map((row) => columns.map((column) => escape(row[column])).join(','))].join('\r\n');
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), fileName);
}
async function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error ?? new Error('Unable to read the selected file.'));
        reader.readAsDataURL(file);
    });
}
async function sha256(file) {
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
function downloadEvidence(document) {
    if (document.contentDataUrl && document.fileName) {
        const anchor = window.document.createElement('a');
        anchor.href = document.contentDataUrl;
        anchor.download = document.fileName;
        window.document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    }
    else if (document.webLink) {
        window.open(document.webLink, '_blank', 'noopener,noreferrer');
    }
}
function slug(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'loom-project';
}

},
"src/services/reports.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirementDossierMarkdown = requirementDossierMarkdown;
exports.downloadRequirementDossier = downloadRequirementDossier;
exports.projectStatusMarkdown = projectStatusMarkdown;
exports.downloadProjectStatus = downloadProjectStatus;
exports.printProjectStatus = printProjectStatus;
exports.exportRequirementsTraceabilityMatrix = exportRequirementsTraceabilityMatrix;
exports.exportFailureAnalysis = exportFailureAnalysis;
exports.exportEvidenceIndex = exportEvidenceIndex;
const calculations_1 = require("../domain/calculations");
const files_1 = require("./files");
const dates_1 = require("../utils/dates");
const text_1 = require("../utils/text");
function mdEscape(value) {
    return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}
function requirementDossierMarkdown(project, requirement) {
    const functions = project.functions.filter((record) => requirement.functionIds.includes(record.id));
    const objects = project.objects.filter((record) => requirement.objectIds.includes(record.id));
    const failures = project.failureModes.filter((record) => requirement.failureModeIds.includes(record.id));
    const plans = project.verificationPlans.filter((record) => requirement.verificationPlanIds.includes(record.id));
    const runs = project.testExecutions.filter((record) => requirement.testExecutionIds.includes(record.id));
    const evidence = (0, calculations_1.evidenceForRequirement)(project, requirement);
    const closure = (0, calculations_1.verificationClosure)(project, requirement);
    const readiness = (0, calculations_1.requirementReadiness)(project, requirement);
    const metric = requirement.metric;
    return `# ${requirement.identifier} — ${requirement.title}

**Project:** ${project.name}  
**Project revision:** ${project.revision}  
**LOOM version:** ${project.applicationVersion}  
**Requirement revision:** ${requirement.revision}  
**Generated:** ${(0, dates_1.formatDateTime)(new Date().toISOString())}

## Requirement

${requirement.statement}

- **Source:** ${requirement.source || 'Not recorded'}${requirement.sourceLocation ? `, ${requirement.sourceLocation}` : ''}
- **Stakeholder:** ${requirement.stakeholder || 'Not recorded'}
- **Rationale:** ${requirement.rationale || 'Not recorded'}
- **Owner:** ${requirement.owner}
- **Reviewer:** ${requirement.reviewer || 'Not assigned'}
- **System level:** ${requirement.applicableSystemLevel}
- **Due date:** ${(0, dates_1.formatDate)(requirement.dueDate)}
- **Next action:** ${requirement.nextAction || 'Not recorded'}

## Threshold, target, and performance

${metric ? `| Parameter | Value |
|---|---|
| Metric | ${mdEscape(metric.metric)} |
| Unit | ${mdEscape(metric.unit)} |
| Threshold | ${metric.threshold ?? 'Not applicable'} |
| Target | ${metric.target ?? 'Not set'} |
| Current estimate | ${metric.currentEstimate ?? 'Not recorded'} |
| Measured value | ${metric.measuredValue ?? 'Not recorded'} |
| Margin to threshold | ${(0, calculations_1.calculateMetricMargin)(metric) ?? 'Not available'} |
| Confidence | ${metric.confidence}% |
| Conditions | ${mdEscape(metric.operatingCondition)} |` : 'No structured performance measure is attached.'}

## Allocation

**Functions:** ${functions.length ? functions.map((record) => `${record.identifier} ${record.name}`).join('; ') : 'None'}  
**Implementation objects:** ${objects.length ? objects.map((record) => `${record.identifier} ${record.name}`).join('; ') : 'None'}  
**Allocation status:** ${(0, text_1.humanize)((0, calculations_1.deriveAllocationState)(requirement))}

## Verification intent

- **Method:** ${(0, text_1.humanize)(requirement.verificationIntent.method)}
- **Level:** ${(0, text_1.humanize)(requirement.verificationIntent.level)}
- **Acceptance criteria:** ${requirement.verificationIntent.acceptanceCriteria || 'Not defined'}
- **Required configuration:** ${requirement.verificationIntent.requiredConfiguration || 'Not defined'}
- **Required environment:** ${requirement.verificationIntent.requiredEnvironment || 'Not defined'}

### Verification plans

${plans.length ? plans.map((plan) => `- ${plan.identifier} — ${plan.title} (${(0, text_1.humanize)(plan.approvalState)})`).join('\n') : '- None'}

### As-run results

${runs.length ? runs.map((run) => `- ${run.identifier} — ${(0, dates_1.formatDate)(run.executedAt)} — **${(0, text_1.humanize)(run.result)}** — configuration: ${run.systemConfiguration}`).join('\n') : '- No executions recorded'}

### Closure conditions

${closure.conditions.map((condition) => `- ${condition.met ? '[x]' : '[ ]'} ${condition.label}`).join('\n')}

## Failure analysis

${failures.length ? failures.map((failure) => `- **${failure.identifier}: ${failure.failureMode}** — ${failure.endEffect}. Criticality: ${(0, text_1.humanize)(failure.criticalityCategory)}. Mitigation: ${failure.recommendedMitigation} (${(0, text_1.humanize)(failure.mitigationStatus)}).`).join('\n') : '- No failure hypothesis is linked.'}

## Evidence

${evidence.length ? evidence.map((document) => `- ${document.identifier} — ${document.title}, revision ${document.revision}, ${(0, text_1.humanize)(document.status)}${document.integrityFingerprint ? `, fingerprint ${document.integrityFingerprint}` : ''}`).join('\n') : '- No evidence attached.'}

## Current status

- **Definition:** ${(0, text_1.humanize)(requirement.statuses.definition)}
- **Allocation:** ${(0, text_1.humanize)((0, calculations_1.deriveAllocationState)(requirement))}
- **Implementation:** ${(0, text_1.humanize)(requirement.statuses.implementation)}
- **Verification:** ${(0, text_1.humanize)((0, calculations_1.deriveVerificationState)(project, requirement))}
- **Validation:** ${(0, text_1.humanize)(requirement.statuses.validation)}
- **Evidence:** ${(0, text_1.humanize)((0, calculations_1.deriveEvidenceState)(project, requirement))}
- **Readiness:** ${readiness.score}%
- **Blockers:** ${requirement.blockers.length ? requirement.blockers.join('; ') : 'None recorded'}

## Revision history

${requirement.history.map((entry) => `- Revision ${entry.revision}, ${(0, dates_1.formatDateTime)(entry.at)} — ${entry.action}${entry.summary ? `: ${entry.summary}` : ''}`).join('\n')}
`;
}
function downloadRequirementDossier(project, requirement) {
    (0, files_1.downloadBlob)(new Blob([requirementDossierMarkdown(project, requirement)], { type: 'text/markdown;charset=utf-8' }), `${requirement.identifier.toLowerCase()}-${(0, files_1.slug)(requirement.title)}-dossier.md`);
}
function projectStatusMarkdown(project) {
    const cockpit = (0, calculations_1.projectCockpit)(project);
    const budget = (0, calculations_1.projectBudgetSummary)(project.projectBudgetLines);
    return `# ${project.name} — Project Status Report

**Project revision:** ${project.revision}  
**Application:** LOOM v${project.applicationVersion}  
**Generated:** ${(0, dates_1.formatDateTime)(new Date().toISOString())}

## Executive status

| Measure | Value |
|---|---:|
| Requirements | ${cockpit.totalRequirements} |
| Fully allocated | ${cockpit.allocationPercent}% |
| Not yet verified | ${cockpit.unverified} |
| Evidence gaps | ${cockpit.evidenceGaps} |
| Open high-criticality failure modes | ${cockpit.highFailures} |
| Late work items | ${cockpit.lateWork} |
| Pending reviews | ${cockpit.pendingReviews} |
| Open change requests | ${cockpit.changeRequests} |

## Requirement status

| Identifier | Requirement | Definition | Allocation | Implementation | Verification | Evidence | Owner | Due |
|---|---|---|---|---|---|---|---|---|
${project.requirements.map((requirement) => `| ${requirement.identifier} | ${mdEscape(requirement.title)} | ${(0, text_1.humanize)(requirement.statuses.definition)} | ${(0, text_1.humanize)((0, calculations_1.deriveAllocationState)(requirement))} | ${(0, text_1.humanize)(requirement.statuses.implementation)} | ${(0, text_1.humanize)((0, calculations_1.deriveVerificationState)(project, requirement))} | ${(0, text_1.humanize)((0, calculations_1.deriveEvidenceState)(project, requirement))} | ${mdEscape(requirement.owner)} | ${(0, dates_1.formatDate)(requirement.dueDate)} |`).join('\n')}

## Project delivery budget

| Planned | Approved | Committed | Actual | Forecast | Remaining | Variance |
|---:|---:|---:|---:|---:|---:|---:|
| ${budget.planned.toFixed(2)} | ${budget.approved.toFixed(2)} | ${budget.committed.toFixed(2)} | ${budget.actual.toFixed(2)} | ${budget.forecast.toFixed(2)} | ${budget.remaining.toFixed(2)} | ${budget.variance.toFixed(2)} |

## Technical budgets

| Budget | Resource | Measured or estimated | Threshold | Margin | Utilization |
|---|---|---:|---:|---:|---:|
${project.technicalBudgets.map((technicalBudget) => {
        const summary = (0, calculations_1.technicalBudgetSummary)(technicalBudget);
        return `| ${mdEscape(technicalBudget.title)} | ${mdEscape(technicalBudget.resourceType)} | ${summary.measured.toFixed(2)} ${technicalBudget.unit} | ${(technicalBudget.threshold ?? technicalBudget.totalAvailable).toFixed(2)} ${technicalBudget.unit} | ${summary.margin.toFixed(2)} ${technicalBudget.unit} | ${summary.utilizationPercent}% |`;
    }).join('\n')}

## Open failure mitigations

${project.failureModes.filter((failure) => !['verified', 'accepted'].includes(failure.mitigationStatus)).map((failure) => `- ${failure.identifier} — ${failure.failureMode}; ${(0, text_1.humanize)(failure.criticalityCategory)} criticality; ${(0, text_1.humanize)(failure.mitigationStatus)}; owner ${failure.actionOwner}.`).join('\n') || '- None'}

## Evidence index

${project.documents.map((document) => `- ${document.identifier} — ${document.title}, revision ${document.revision}, ${(0, text_1.humanize)(document.status)}, owner ${document.owner}`).join('\n') || '- No documents'}
`;
}
function downloadProjectStatus(project) {
    (0, files_1.downloadBlob)(new Blob([projectStatusMarkdown(project)], { type: 'text/markdown;charset=utf-8' }), `${(0, files_1.slug)(project.name)}-status-report.md`);
}
function printProjectStatus(project) {
    const cockpit = (0, calculations_1.projectCockpit)(project);
    const budget = (0, calculations_1.projectBudgetSummary)(project.projectBudgetLines);
    const escaped = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
    const report = `<!doctype html><html><head><meta charset="utf-8"><title>${escaped(project.name)} — Project Status Report</title><style>
  @page { margin: 18mm; } body { font: 11pt/1.45 system-ui, sans-serif; color: #171a1f; } h1 { font-size: 22pt; margin: 0 0 4px; } h2 { margin-top: 24px; border-bottom: 1px solid #aaa; padding-bottom: 5px; } .meta { color: #555; margin-bottom: 20px; } table { border-collapse: collapse; width: 100%; margin: 8px 0 18px; } th, td { border: 1px solid #bbb; padding: 6px 8px; text-align: left; vertical-align: top; } th { background: #eee; } .status { font-weight: 700; } footer { margin-top: 24px; font-size: 9pt; color: #666; } @media print { button { display:none; } }
  </style></head><body><button onclick="window.print()">Print or save as Portable Document Format (PDF)</button>
  <h1>${escaped(project.name)}</h1><div class="meta">Project Status Report · Revision ${project.revision} · LOOM v${project.applicationVersion} · ${escaped((0, dates_1.formatDateTime)(new Date().toISOString()))}</div>
  <h2>Project cockpit</h2><table><tbody>
  <tr><th>Requirements</th><td>${cockpit.totalRequirements}</td><th>Allocation coverage</th><td>${cockpit.allocationPercent}%</td></tr>
  <tr><th>Not yet verified</th><td>${cockpit.unverified}</td><th>Evidence gaps</th><td>${cockpit.evidenceGaps}</td></tr>
  <tr><th>Open high-criticality failures</th><td>${cockpit.highFailures}</td><th>Late work</th><td>${cockpit.lateWork}</td></tr>
  </tbody></table>
  <h2>Requirements</h2><table><thead><tr><th>Identifier</th><th>Requirement</th><th>Owner</th><th>Verification</th><th>Evidence</th><th>Next action</th></tr></thead><tbody>
  ${project.requirements.map((requirement) => `<tr><td>${escaped(requirement.identifier)}</td><td><strong>${escaped(requirement.title)}</strong><br>${escaped(requirement.statement)}</td><td>${escaped(requirement.owner)}</td><td class="status">${escaped((0, text_1.humanize)((0, calculations_1.deriveVerificationState)(project, requirement)))}</td><td>${escaped((0, text_1.humanize)((0, calculations_1.deriveEvidenceState)(project, requirement)))}</td><td>${escaped(requirement.nextAction)}</td></tr>`).join('')}
  </tbody></table>
  <h2>Project delivery budget</h2><table><tbody><tr><th>Approved</th><td>${budget.approved.toLocaleString()} ${escaped(project.projectBudgetLines[0]?.currency ?? '')}</td><th>Actual</th><td>${budget.actual.toLocaleString()}</td><th>Forecast</th><td>${budget.forecast.toLocaleString()}</td><th>Variance</th><td>${budget.variance.toLocaleString()}</td></tr></tbody></table>
  <h2>Evidence index</h2><table><thead><tr><th>Identifier</th><th>Title</th><th>Revision</th><th>Status</th><th>Fingerprint</th></tr></thead><tbody>${project.documents.map((document) => `<tr><td>${escaped(document.identifier)}</td><td>${escaped(document.title)}</td><td>${document.revision}</td><td>${escaped((0, text_1.humanize)(document.status))}</td><td>${escaped(document.integrityFingerprint ?? 'Not recorded')}</td></tr>`).join('')}</tbody></table>
  <footer>Generated locally by LOOM. This report organizes project evidence; it does not certify compliance, safety, verification, validation, or acceptance.</footer>
  </body></html>`;
    const reportWindow = window.open('', '_blank');
    if (reportWindow)
        reportWindow.opener = null;
    if (!reportWindow)
        throw new Error('The browser blocked the report window.');
    reportWindow.document.open();
    reportWindow.document.write(report);
    reportWindow.document.close();
}
function exportRequirementsTraceabilityMatrix(project) {
    (0, files_1.exportCsv)(`${(0, files_1.slug)(project.name)}-requirements-traceability-matrix.csv`, project.requirements.map((requirement) => ({
        identifier: requirement.identifier,
        title: requirement.title,
        statement: requirement.statement,
        parent: project.requirements.find((candidate) => candidate.id === requirement.parentId)?.identifier ?? '',
        functions: project.functions.filter((record) => requirement.functionIds.includes(record.id)).map((record) => record.identifier).join('; '),
        objects: project.objects.filter((record) => requirement.objectIds.includes(record.id)).map((record) => record.identifier).join('; '),
        interfaces: project.interfaces.filter((record) => requirement.interfaceIds.includes(record.id)).map((record) => record.identifier).join('; '),
        verification_method: requirement.verificationIntent.method,
        verification_plans: project.verificationPlans.filter((record) => requirement.verificationPlanIds.includes(record.id)).map((record) => record.identifier).join('; '),
        verification_status: (0, calculations_1.deriveVerificationState)(project, requirement),
        evidence: project.documents.filter((record) => requirement.evidenceIds.includes(record.id)).map((record) => record.identifier).join('; '),
        evidence_status: (0, calculations_1.deriveEvidenceState)(project, requirement),
        owner: requirement.owner,
        next_action: requirement.nextAction
    })));
}
function exportFailureAnalysis(project) {
    (0, files_1.exportCsv)(`${(0, files_1.slug)(project.name)}-failure-analysis.csv`, project.failureModes.map((failure) => ({
        identifier: failure.identifier,
        item: failure.sourceId ? project.requirements.find((record) => record.id === failure.sourceId)?.identifier ?? project.functions.find((record) => record.id === failure.sourceId)?.identifier ?? project.objects.find((record) => record.id === failure.sourceId)?.identifier ?? failure.sourceId : '',
        failure_mode: failure.failureMode,
        cause: failure.cause,
        local_effect: failure.localEffect,
        end_effect: failure.endEffect,
        severity: failure.severity,
        likelihood: failure.likelihood,
        detectability: failure.detectability,
        criticality: failure.criticalityCategory,
        mitigation: failure.recommendedMitigation,
        mitigation_status: failure.mitigationStatus,
        owner: failure.actionOwner,
        due_date: failure.dueDate ?? ''
    })));
}
function exportEvidenceIndex(project) {
    (0, files_1.exportCsv)(`${(0, files_1.slug)(project.name)}-evidence-index.csv`, project.documents.map((document) => ({
        identifier: document.identifier,
        title: document.title,
        document_type: document.documentType,
        revision: document.revision,
        author: document.author,
        owner: document.owner,
        date: document.date,
        status: document.status,
        approval_state: document.approvalState,
        file_name: document.fileName ?? '',
        file_size: document.fileSize ?? '',
        integrity_fingerprint: document.integrityFingerprint ?? '',
        linked_records: document.linkedRecordIds.join('; ')
    })));
}

},
"src/utils/dates.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todayIso = exports.nowIso = void 0;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.daysBetween = daysBetween;
exports.addDays = addDays;
const nowIso = () => new Date().toISOString();
exports.nowIso = nowIso;
const todayIso = () => new Date().toISOString().slice(0, 10);
exports.todayIso = todayIso;
function formatDate(value) {
    if (!value)
        return '—';
    const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
    if (Number.isNaN(date.getTime()))
        return value;
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}
function formatDateTime(value) {
    if (!value)
        return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return value;
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }).format(date);
}
function daysBetween(a, b) {
    const start = new Date(`${a.slice(0, 10)}T12:00:00`).getTime();
    const end = new Date(`${b.slice(0, 10)}T12:00:00`).getTime();
    return Math.max(0, Math.round((end - start) / 86400000));
}
function addDays(value, days) {
    const date = new Date(`${value.slice(0, 10)}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
}

},
"src/utils/id.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = createId;
exports.nextIdentifier = nextIdentifier;
function createId(prefix = 'rec') {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return `${prefix}_${crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
function nextIdentifier(prefix, existing) {
    const max = existing.reduce((current, value) => {
        const match = value.match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
        return match ? Math.max(current, Number(match[1])) : current;
    }, 0);
    return `${prefix}-${String(max + 1).padStart(3, '0')}`;
}

},
"src/utils/text.ts": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = exports.humanize = void 0;
exports.truncate = truncate;
exports.parseList = parseList;
const humanize = (value) => value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
exports.humanize = humanize;
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
exports.clamp = clamp;
function truncate(value, length = 110) {
    return value.length <= length ? value : `${value.slice(0, length - 1).trimEnd()}…`;
}
function parseList(value) {
    return value
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

},
"src/views/ArchitectureView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchitectureView = ArchitectureView;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const ProjectContext_1 = require("../hooks/ProjectContext");
const id_1 = require("../utils/id");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Modal_1 = require("../components/Modal");
const Progress_1 = require("../components/Progress");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
const objectTypeOptions = {
    hardware: ['system', 'subsystem', 'assembly', 'subassembly', 'component', 'part'],
    software: ['system', 'service', 'application', 'package', 'module', 'component'],
    firmware: ['platform', 'image', 'service', 'driver', 'module', 'routine'],
    'human-process': ['organization', 'role', 'procedure', 'activity', 'task'],
    facility: ['site', 'building', 'room', 'station', 'resource'],
    'external-system': ['system', 'service', 'supplier', 'operator', 'environment']
};
function TreeRow({ depth, identifier, title, subtitle, status, selected, onClick }) {
    return React.createElement("button", { className: `architecture-tree__row ${selected ? 'is-selected' : ''}`, style: { '--tree-depth': depth }, onClick: onClick },
        React.createElement("span", { className: "architecture-tree__line" }),
        React.createElement("span", { className: "architecture-tree__identifier" }, identifier),
        React.createElement("span", null,
            React.createElement("strong", null, title),
            React.createElement("small", null, subtitle)),
        status ? React.createElement(StatusBadge_1.StatusBadge, { value: status, compact: true }) : null);
}
function ArchitectureView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('objects');
    const [functionModal, setFunctionModal] = (0, react_1.useState)(false);
    const [objectModal, setObjectModal] = (0, react_1.useState)(false);
    const [interfaceModal, setInterfaceModal] = (0, react_1.useState)(false);
    const [selectedObjectId, setSelectedObjectId] = (0, react_1.useState)(project.objects[0]?.id ?? '');
    const [selectedFunctionId, setSelectedFunctionId] = (0, react_1.useState)(project.functions[0]?.id ?? '');
    const [vRequirementId, setVRequirementId] = (0, react_1.useState)(project.requirements[0]?.id ?? '');
    const [newFunction, setNewFunction] = (0, react_1.useState)({ name: '', description: '', owner: 'Unassigned', parentId: '' });
    const [newObject, setNewObject] = (0, react_1.useState)({ name: '', description: '', owner: 'Unassigned', parentId: '', domain: 'hardware', objectType: 'component' });
    const [newInterface, setNewInterface] = (0, react_1.useState)({ title: '', owner: 'Unassigned', endpointAId: '', endpointBId: '', interfaceType: 'data', direction: 'bidirectional', exchangedItem: '', protocol: '', characteristics: '' });
    const tabs = [
        { id: 'objects', label: 'Objects', icon: 'architecture', count: project.objects.length },
        { id: 'functions', label: 'Functions', icon: 'tree', count: project.functions.length },
        { id: 'vmodel', label: 'V-model', icon: 'verification' },
        ...(project.settings.mode === 'advanced' ? [
            { id: 'interfaces', label: 'Interfaces', icon: 'link', count: project.interfaces.length },
            { id: 'allocations', label: 'Allocations', icon: 'table' }
        ] : [])
    ];
    (0, react_1.useEffect)(() => {
        if (!tabs.some((tab) => tab.id === activeTab))
            setActiveTab(tabs[0].id);
    }, [activeTab, tabs]);
    const selectedObject = project.objects.find((record) => record.id === selectedObjectId);
    const selectedFunction = project.functions.find((record) => record.id === selectedFunctionId);
    const vRequirement = project.requirements.find((record) => record.id === vRequirementId) ?? project.requirements[0];
    const rootObjects = (0, react_1.useMemo)(() => project.objects.filter((record) => !record.parentId || !project.objects.some((candidate) => candidate.id === record.parentId)), [project.objects]);
    const rootFunctions = (0, react_1.useMemo)(() => project.functions.filter((record) => !record.parentId || !project.functions.some((candidate) => candidate.id === record.parentId)), [project.functions]);
    const addFunction = () => {
        if (!newFunction.name.trim())
            return notify('Enter a function name.', 'warning');
        const identifier = (0, id_1.nextIdentifier)('FUN', project.functions.map((record) => record.identifier));
        const record = {
            ...(0, factory_1.controlledRecord)('fn', identifier, newFunction.name.trim(), newFunction.owner || 'Unassigned', 'draft'),
            name: newFunction.name.trim(),
            description: newFunction.description.trim(),
            parentId: newFunction.parentId || undefined,
            childIds: [],
            input: '',
            output: '',
            trigger: '',
            performanceExpectation: '',
            applicableMode: 'All modes',
            requirementIds: [],
            objectIds: [],
            interfaceIds: [],
            verificationMethods: [],
            failureModeIds: []
        };
        updateProject((draft) => {
            draft.functions.push(record);
            if (record.parentId)
                draft.functions.find((candidate) => candidate.id === record.parentId)?.childIds.push(record.id);
        });
        setSelectedFunctionId(record.id);
        setNewFunction({ name: '', description: '', owner: 'Unassigned', parentId: '' });
        setFunctionModal(false);
        notify(`${identifier} created.`, 'success');
    };
    const addObject = () => {
        if (!newObject.name.trim())
            return notify('Enter an object name.', 'warning');
        const identifier = (0, id_1.nextIdentifier)('OBJ', project.objects.map((record) => record.identifier));
        const parent = project.objects.find((record) => record.id === newObject.parentId);
        const parentRequirementIds = parent?.requirementIds ?? [];
        const record = {
            ...(0, factory_1.controlledRecord)('obj', identifier, newObject.name.trim(), newObject.owner || 'Unassigned', 'draft'),
            name: newObject.name.trim(),
            domain: newObject.domain,
            objectType: newObject.objectType,
            parentId: newObject.parentId || undefined,
            childIds: [],
            description: newObject.description.trim(),
            functionIds: [],
            requirementIds: [],
            interfaceIds: [],
            inheritedObligations: parentRequirementIds.map((requirementId) => ({
                id: (0, id_1.createId)('obl'),
                requirementId,
                sourceRequirementRevision: project.requirements.find((requirement) => requirement.id === requirementId)?.revision ?? 1,
                state: 'pending-review',
                localParameters: '',
                rationale: '',
                affectedByParentChange: false
            })),
            implementationStatus: 'not-started'
        };
        updateProject((draft) => {
            draft.objects.push(record);
            if (record.parentId)
                draft.objects.find((candidate) => candidate.id === record.parentId)?.childIds.push(record.id);
        });
        setSelectedObjectId(record.id);
        setNewObject({ name: '', description: '', owner: 'Unassigned', parentId: '', domain: 'hardware', objectType: 'component' });
        setObjectModal(false);
        notify(`${identifier} created with ${record.inheritedObligations.length} pending inherited obligation(s).`, 'success');
    };
    const addInterface = () => {
        if (!newInterface.title.trim() || !newInterface.endpointAId || !newInterface.endpointBId)
            return notify('Enter a title and select both interface endpoints.', 'warning');
        if (newInterface.endpointAId === newInterface.endpointBId)
            return notify('Interface endpoints must be different objects.', 'warning');
        const identifier = (0, id_1.nextIdentifier)('INT', project.interfaces.map((record) => record.identifier));
        const record = {
            ...(0, factory_1.controlledRecord)('int', identifier, newInterface.title.trim(), newInterface.owner || 'Unassigned', 'draft'),
            endpointAId: newInterface.endpointAId,
            endpointBId: newInterface.endpointBId,
            direction: newInterface.direction,
            interfaceType: newInterface.interfaceType,
            exchangedItem: newInterface.exchangedItem.trim(),
            mechanicalCharacteristics: newInterface.interfaceType === 'mechanical' ? newInterface.characteristics.trim() : '',
            electricalCharacteristics: newInterface.interfaceType === 'electrical' ? newInterface.characteristics.trim() : '',
            dataCharacteristics: ['data', 'software'].includes(newInterface.interfaceType) ? newInterface.characteristics.trim() : '',
            timingCharacteristics: '',
            protocol: newInterface.protocol.trim(),
            requirementIds: [],
            verificationPlanIds: [],
            documentIds: [],
            status: 'draft'
        };
        updateProject((draft) => {
            draft.interfaces.push(record);
            [record.endpointAId, record.endpointBId].forEach((id) => {
                const object = draft.objects.find((candidate) => candidate.id === id);
                if (object && !object.interfaceIds.includes(record.id))
                    object.interfaceIds.push(record.id);
            });
            draft.links.push({ id: (0, id_1.createId)('link'), type: 'interfaces-with', fromId: record.endpointAId, toId: record.endpointBId, rationale: record.title, createdAt: new Date().toISOString(), createdBy: record.owner });
        });
        setNewInterface({ title: '', owner: 'Unassigned', endpointAId: '', endpointBId: '', interfaceType: 'data', direction: 'bidirectional', exchangedItem: '', protocol: '', characteristics: '' });
        setInterfaceModal(false);
        notify(`${identifier} created.`, 'success');
    };
    const updateObligation = (objectId, obligationId, field, value) => {
        updateProject((draft) => {
            const object = draft.objects.find((record) => record.id === objectId);
            const obligation = object?.inheritedObligations.find((record) => record.id === obligationId);
            if (!object || !obligation)
                return;
            if (field === 'state')
                obligation.state = value;
            else
                obligation[field] = value;
            obligation.reviewedAt = new Date().toISOString();
            object.revision += 1;
            object.updatedAt = new Date().toISOString();
            object.history.push((0, factory_1.historyEntry)('Inherited obligation reviewed', object.revision, `${field} updated.`));
        });
    };
    const toggleRequirementFunction = (requirementId, functionId) => {
        updateProject((draft) => {
            const requirement = draft.requirements.find((record) => record.id === requirementId);
            const functionRecord = draft.functions.find((record) => record.id === functionId);
            if (!requirement || !functionRecord)
                return;
            const connected = requirement.functionIds.includes(functionId);
            if (connected) {
                requirement.functionIds = requirement.functionIds.filter((id) => id !== functionId);
                functionRecord.requirementIds = functionRecord.requirementIds.filter((id) => id !== requirementId);
                draft.links = draft.links.filter((record) => !(record.fromId === requirementId && record.toId === functionId && record.type === 'allocated-to'));
            }
            else {
                requirement.functionIds.push(functionId);
                functionRecord.requirementIds.push(requirementId);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'allocated-to', fromId: requirementId, toId: functionId, rationale: '', createdAt: new Date().toISOString(), createdBy: 'Local user' });
            }
            requirement.statuses.allocation = requirement.functionIds.length && requirement.objectIds.length ? 'fully-allocated' : requirement.functionIds.length || requirement.objectIds.length ? 'partially-allocated' : 'unallocated';
        });
    };
    const toggleFunctionObject = (functionId, objectId) => {
        updateProject((draft) => {
            const functionRecord = draft.functions.find((record) => record.id === functionId);
            const object = draft.objects.find((record) => record.id === objectId);
            if (!functionRecord || !object)
                return;
            const connected = functionRecord.objectIds.includes(objectId);
            if (connected) {
                functionRecord.objectIds = functionRecord.objectIds.filter((id) => id !== objectId);
                object.functionIds = object.functionIds.filter((id) => id !== functionId);
                draft.links = draft.links.filter((record) => !(record.fromId === functionId && record.toId === objectId && record.type === 'performed-by'));
            }
            else {
                functionRecord.objectIds.push(objectId);
                object.functionIds.push(functionId);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'performed-by', fromId: functionId, toId: objectId, rationale: '', createdAt: new Date().toISOString(), createdBy: 'Local user' });
            }
            functionRecord.requirementIds.forEach((requirementId) => {
                const requirement = draft.requirements.find((record) => record.id === requirementId);
                if (!requirement)
                    return;
                if (!connected && !requirement.objectIds.includes(objectId))
                    requirement.objectIds.push(objectId);
                requirement.statuses.allocation = requirement.functionIds.length && requirement.objectIds.length ? 'fully-allocated' : 'partially-allocated';
            });
        });
    };
    const renderObjectTree = (record, depth = 0) => React.createElement("div", { key: record.id },
        React.createElement(TreeRow, { depth: depth, identifier: record.identifier, title: record.name, subtitle: `${(0, text_1.humanize)(record.domain)} · ${(0, text_1.humanize)(record.objectType)}`, status: record.implementationStatus, selected: selectedObjectId === record.id, onClick: () => setSelectedObjectId(record.id) }),
        project.objects.filter((candidate) => candidate.parentId === record.id).map((child) => renderObjectTree(child, depth + 1)));
    const renderFunctionTree = (record, depth = 0) => React.createElement("div", { key: record.id },
        React.createElement(TreeRow, { depth: depth, identifier: record.identifier, title: record.name, subtitle: record.description || 'No description recorded.', selected: selectedFunctionId === record.id, onClick: () => setSelectedFunctionId(record.id) }),
        project.functions.filter((candidate) => candidate.parentId === record.id).map((child) => renderFunctionTree(child, depth + 1)));
    return (React.createElement("div", { className: "view-stack architecture-view" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Architecture", title: "Functions, implementation objects, and interfaces", description: "Logical functions remain distinct from the hardware, software, firmware, people, procedures, facilities, and external systems that perform them.", actions: React.createElement(React.Fragment, null, activeTab === 'functions' ? React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setFunctionModal(true) }, "New function") : activeTab === 'interfaces' ? React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setInterfaceModal(true) }, "New interface") : React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setObjectModal(true) }, "New object")) }),
        React.createElement(Tabs_1.Tabs, { options: tabs, active: activeTab, onChange: setActiveTab }),
        activeTab === 'objects' ? React.createElement("div", { className: "split-workspace" },
            React.createElement(ui_1.Panel, { className: "panel--flush split-workspace__list" },
                React.createElement("div", { className: "architecture-tree" }, rootObjects.length ? rootObjects.map((record) => renderObjectTree(record)) : React.createElement(ui_1.EmptyState, { icon: "architecture", title: "No implementation objects", description: "Create the system, subsystem, software service, procedure, or other object that performs a function.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setObjectModal(true) }, "New object") }))),
            React.createElement(ui_1.Panel, { className: "split-workspace__detail" }, selectedObject ? React.createElement(React.Fragment, null,
                React.createElement(ui_1.PanelHeader, { title: `${selectedObject.identifier} · ${selectedObject.name}`, description: `${(0, text_1.humanize)(selectedObject.domain)} · ${(0, text_1.humanize)(selectedObject.objectType)}`, actions: React.createElement(StatusBadge_1.StatusBadge, { value: selectedObject.implementationStatus }) }),
                React.createElement(Progress_1.ProgressBar, { value: (0, calculations_1.objectReadiness)(project, selectedObject), label: "Object readiness" }),
                React.createElement("div", { className: "record-facts" },
                    React.createElement("div", null,
                        React.createElement("span", null, "Owner"),
                        React.createElement("strong", null, selectedObject.owner)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Revision"),
                        React.createElement("strong", null, selectedObject.revision)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Functions"),
                        React.createElement("strong", null, selectedObject.functionIds.length)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Requirements"),
                        React.createElement("strong", null, selectedObject.requirementIds.length)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Interfaces"),
                        React.createElement("strong", null, selectedObject.interfaceIds.length)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Children"),
                        React.createElement("strong", null, selectedObject.childIds.length))),
                React.createElement(ui_1.Field, { label: "Implementation state" },
                    React.createElement(ui_1.Select, { value: selectedObject.implementationStatus, onChange: (event) => updateProject((draft) => { const object = draft.objects.find((record) => record.id === selectedObject.id); if (object)
                            object.implementationStatus = event.target.value; }) }, ['not-started', 'in-progress', 'implemented', 'blocked', 'rework-required'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement("div", { className: "detail-section" },
                    React.createElement("h3", null, "Allocated functions"),
                    selectedObject.functionIds.length ? React.createElement("div", { className: "linked-chip-list" }, selectedObject.functionIds.map((id) => { const record = project.functions.find((candidate) => candidate.id === id); return record ? React.createElement("span", { key: id },
                        record.identifier,
                        " \u00B7 ",
                        record.name) : null; })) : React.createElement("p", { className: "muted-text" }, "No functions are allocated to this object.")),
                React.createElement("div", { className: "detail-section" },
                    React.createElement("h3", null, "Applicable requirements"),
                    selectedObject.requirementIds.length ? React.createElement("div", { className: "linked-chip-list" }, selectedObject.requirementIds.map((id) => { const record = project.requirements.find((candidate) => candidate.id === id); return record ? React.createElement("span", { key: id },
                        record.identifier,
                        " \u00B7 ",
                        record.title) : null; })) : React.createElement("p", { className: "muted-text" }, "No direct requirement allocation.")),
                React.createElement("div", { className: "detail-section" },
                    React.createElement("h3", null, "Inherited obligations"),
                    React.createElement("p", { className: "muted-text" }, "Parent requirements are reviewed as obligations. They are never silently copied into the child."),
                    selectedObject.inheritedObligations.length ? React.createElement("div", { className: "obligation-list" }, selectedObject.inheritedObligations.map((obligation) => {
                        const requirement = project.requirements.find((record) => record.id === obligation.requirementId);
                        const rationaleRequired = ['tailored', 'not-applicable', 'superseded'].includes(obligation.state);
                        return React.createElement("div", { className: "obligation-card", key: obligation.id },
                            React.createElement("div", { className: "obligation-card__header" },
                                React.createElement("div", null,
                                    React.createElement("span", null,
                                        requirement?.identifier ?? 'Unknown requirement',
                                        " \u00B7 Source revision ",
                                        obligation.sourceRequirementRevision),
                                    React.createElement("strong", null, requirement?.title ?? 'Dangling reference')),
                                React.createElement(StatusBadge_1.StatusBadge, { value: obligation.state, compact: true })),
                            React.createElement(ui_1.Field, { label: "Disposition" },
                                React.createElement(ui_1.Select, { value: obligation.state, onChange: (event) => updateObligation(selectedObject.id, obligation.id, 'state', event.target.value) }, ['accepted-as-written', 'accepted-with-local-parameters', 'tailored', 'decomposed', 'satisfied-at-parent', 'not-applicable', 'superseded', 'pending-review'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                            React.createElement(ui_1.Field, { label: "Local parameters" },
                                React.createElement(ui_1.Input, { value: obligation.localParameters, onChange: (event) => updateObligation(selectedObject.id, obligation.id, 'localParameters', event.target.value) })),
                            React.createElement(ui_1.Field, { label: `Rationale${rationaleRequired ? ' — required' : ''}`, error: rationaleRequired && !obligation.rationale.trim() ? 'Record a rationale for this disposition.' : undefined },
                                React.createElement(ui_1.Textarea, { rows: 2, value: obligation.rationale, onChange: (event) => updateObligation(selectedObject.id, obligation.id, 'rationale', event.target.value) })));
                    })) : React.createElement("div", { className: "positive-empty" },
                        React.createElement(Icon_1.Icon, { name: "check" }),
                        "No parent obligations are pending on this object."))) : React.createElement(ui_1.EmptyState, { icon: "architecture", title: "Select an implementation object", description: "Open an object to inspect its functions, requirements, interfaces, implementation state, and inherited obligations." }))) : null,
        activeTab === 'functions' ? React.createElement("div", { className: "split-workspace" },
            React.createElement(ui_1.Panel, { className: "panel--flush split-workspace__list" },
                React.createElement("div", { className: "architecture-tree" }, rootFunctions.length ? rootFunctions.map((record) => renderFunctionTree(record)) : React.createElement(ui_1.EmptyState, { icon: "tree", title: "No functions", description: "Create a logical function before assigning implementation objects.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setFunctionModal(true) }, "New function") }))),
            React.createElement(ui_1.Panel, { className: "split-workspace__detail" }, selectedFunction ? React.createElement(React.Fragment, null,
                React.createElement(ui_1.PanelHeader, { title: `${selectedFunction.identifier} · ${selectedFunction.name}`, description: selectedFunction.description || 'No description recorded.' }),
                React.createElement("div", { className: "record-facts" },
                    React.createElement("div", null,
                        React.createElement("span", null, "Owner"),
                        React.createElement("strong", null, selectedFunction.owner)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Requirements"),
                        React.createElement("strong", null, selectedFunction.requirementIds.length)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Performing objects"),
                        React.createElement("strong", null, selectedFunction.objectIds.length)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Interfaces"),
                        React.createElement("strong", null, selectedFunction.interfaceIds.length))),
                React.createElement("div", { className: "detail-section" },
                    React.createElement("h3", null, "Requirements satisfied"),
                    selectedFunction.requirementIds.length ? React.createElement("div", { className: "linked-record-list" }, selectedFunction.requirementIds.map((id) => { const record = project.requirements.find((candidate) => candidate.id === id); return record ? React.createElement("div", { key: id },
                        React.createElement("span", null, record.identifier),
                        React.createElement("strong", null, record.title),
                        React.createElement(Progress_1.ProgressBar, { value: (0, calculations_1.requirementReadiness)(project, record).score, size: "small" })) : null; })) : React.createElement("p", { className: "muted-text" }, "No requirements are allocated to this function.")),
                React.createElement("div", { className: "detail-section" },
                    React.createElement("h3", null, "Performing objects"),
                    selectedFunction.objectIds.length ? React.createElement("div", { className: "linked-chip-list" }, selectedFunction.objectIds.map((id) => { const record = project.objects.find((candidate) => candidate.id === id); return record ? React.createElement("span", { key: id },
                        record.identifier,
                        " \u00B7 ",
                        record.name) : null; })) : React.createElement("p", { className: "muted-text" }, "No implementation object performs this function."))) : React.createElement(ui_1.EmptyState, { icon: "tree", title: "Select a function", description: "Open a function to inspect its allocated requirements and performing objects." }))) : null,
        activeTab === 'interfaces' ? React.createElement(ui_1.Panel, { className: "panel--flush" }, project.interfaces.length ? React.createElement("div", { className: "data-table-wrap" },
            React.createElement("table", { className: "data-table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Identifier"),
                        React.createElement("th", null, "Interface"),
                        React.createElement("th", null, "Endpoint A"),
                        React.createElement("th", null, "Endpoint B"),
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Exchanged item"),
                        React.createElement("th", null, "Protocol"),
                        React.createElement("th", null, "Requirements"),
                        React.createElement("th", null, "Status"))),
                React.createElement("tbody", null, project.interfaces.map((record) => React.createElement("tr", { key: record.id },
                    React.createElement("td", null,
                        React.createElement("strong", null, record.identifier),
                        React.createElement("small", null,
                            "R",
                            record.revision)),
                    React.createElement("td", null,
                        React.createElement("strong", null, record.title),
                        React.createElement("small", null, record.direction)),
                    React.createElement("td", null, project.objects.find((object) => object.id === record.endpointAId)?.name ?? 'Missing endpoint'),
                    React.createElement("td", null, project.objects.find((object) => object.id === record.endpointBId)?.name ?? 'Missing endpoint'),
                    React.createElement("td", null, (0, text_1.humanize)(record.interfaceType)),
                    React.createElement("td", null, record.exchangedItem || 'Not defined'),
                    React.createElement("td", null, record.protocol || 'Not defined'),
                    React.createElement("td", null, record.requirementIds.length),
                    React.createElement("td", null,
                        React.createElement(ui_1.Select, { value: record.status, onChange: (event) => updateProject((draft) => { const value = draft.interfaces.find((candidate) => candidate.id === record.id); if (value)
                                value.status = event.target.value; }) }, ['draft', 'defined', 'ready', 'verified', 'issue'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value)))))))))) : React.createElement(ui_1.EmptyState, { icon: "link", title: "No interfaces", description: "Create a lightweight first-class interface record so integration planning and evidence have an anchor.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setInterfaceModal(true) }, "New interface") })) : null,
        activeTab === 'allocations' ? React.createElement("div", { className: "view-stack" },
            React.createElement(ui_1.Panel, { className: "panel--flush" },
                React.createElement(ui_1.PanelHeader, { title: "Requirements to functions", description: "Click a matrix cell to add or remove a typed allocation relationship." }),
                React.createElement("div", { className: "matrix-scroll" },
                    React.createElement("table", { className: "traceability-matrix allocation-matrix" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Requirement"),
                                project.functions.map((record) => React.createElement("th", { key: record.id, title: record.name }, record.identifier)))),
                        React.createElement("tbody", null, project.requirements.map((requirement) => React.createElement("tr", { key: requirement.id },
                            React.createElement("th", null,
                                React.createElement("strong", null, requirement.identifier),
                                React.createElement("span", null, requirement.title)),
                            project.functions.map((record) => React.createElement("td", { key: record.id },
                                React.createElement("button", { className: requirement.functionIds.includes(record.id) ? 'matrix-toggle is-linked' : 'matrix-toggle', onClick: () => toggleRequirementFunction(requirement.id, record.id), "aria-label": `${requirement.functionIds.includes(record.id) ? 'Remove' : 'Add'} allocation between ${requirement.identifier} and ${record.identifier}` }, requirement.functionIds.includes(record.id) ? '●' : '+'))))))))),
            React.createElement(ui_1.Panel, { className: "panel--flush" },
                React.createElement(ui_1.PanelHeader, { title: "Functions to implementation objects", description: "Click a matrix cell to assign which object performs each function." }),
                React.createElement("div", { className: "matrix-scroll" },
                    React.createElement("table", { className: "traceability-matrix allocation-matrix" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Function"),
                                project.objects.map((record) => React.createElement("th", { key: record.id, title: record.name }, record.identifier)))),
                        React.createElement("tbody", null, project.functions.map((functionRecord) => React.createElement("tr", { key: functionRecord.id },
                            React.createElement("th", null,
                                React.createElement("strong", null, functionRecord.identifier),
                                React.createElement("span", null, functionRecord.name)),
                            project.objects.map((object) => React.createElement("td", { key: object.id },
                                React.createElement("button", { className: functionRecord.objectIds.includes(object.id) ? 'matrix-toggle is-linked' : 'matrix-toggle', onClick: () => toggleFunctionObject(functionRecord.id, object.id), "aria-label": `${functionRecord.objectIds.includes(object.id) ? 'Remove' : 'Add'} allocation between ${functionRecord.identifier} and ${object.identifier}` }, functionRecord.objectIds.includes(object.id) ? '●' : '+')))))))))) : null,
        activeTab === 'vmodel' ? React.createElement(ui_1.Panel, { className: "vmodel-panel" },
            React.createElement("div", { className: "vmodel-controls" },
                React.createElement(ui_1.Field, { label: "Trace one requirement through the V-model" },
                    React.createElement(ui_1.Select, { value: vRequirement?.id ?? '', onChange: (event) => setVRequirementId(event.target.value) }, project.requirements.map((record) => React.createElement("option", { key: record.id, value: record.id },
                        record.identifier,
                        " \u00B7 ",
                        record.title))))),
            vRequirement ? React.createElement("div", { className: "vmodel" },
                React.createElement("div", { className: "vmodel__left" },
                    React.createElement("div", { className: "vmodel-node vmodel-node--level-1" },
                        React.createElement("span", null, "Requirement"),
                        React.createElement("strong", null, vRequirement.identifier),
                        React.createElement("p", null, (0, text_1.truncate)(vRequirement.statement, 120))),
                    React.createElement("div", { className: "vmodel-node vmodel-node--level-2" },
                        React.createElement("span", null, "Functions"),
                        React.createElement("strong", null, vRequirement.functionIds.length || 'None'),
                        React.createElement("p", null, project.functions.filter((record) => vRequirement.functionIds.includes(record.id)).map((record) => record.name).join(', ') || 'Allocation required')),
                    React.createElement("div", { className: "vmodel-node vmodel-node--level-3" },
                        React.createElement("span", null, "Architecture"),
                        React.createElement("strong", null, vRequirement.objectIds.length || 'None'),
                        React.createElement("p", null, project.objects.filter((record) => vRequirement.objectIds.includes(record.id)).map((record) => record.name).join(', ') || 'Implementation required'))),
                React.createElement("div", { className: "vmodel__bottom" },
                    React.createElement(Icon_1.Icon, { name: "architecture", size: 22 }),
                    React.createElement("strong", null, "Implement and configure"),
                    React.createElement("span", null,
                        project.objects.filter((record) => vRequirement.objectIds.includes(record.id) && record.implementationStatus === 'implemented').length,
                        "/",
                        vRequirement.objectIds.length,
                        " allocated objects implemented")),
                React.createElement("div", { className: "vmodel__right" }, ['unit', 'integration', 'subsystem', 'system', 'operational'].map((level, index) => { const plans = project.verificationPlans.filter((plan) => plan.requirementIds.includes(vRequirement.id) && plan.verificationLevel === level); const results = project.testExecutions.filter((run) => run.requirementIds.includes(vRequirement.id) && plans.some((plan) => plan.id === run.verificationPlanId)); return React.createElement("div", { className: `vmodel-node vmodel-node--level-${5 - index}`, key: level },
                    React.createElement("span", null,
                        (0, text_1.humanize)(level),
                        " verification"),
                    React.createElement("strong", null, results.some((run) => run.result === 'passed') ? 'Passed' : plans.length ? 'Planned' : 'Open'),
                    React.createElement("p", null,
                        plans.map((plan) => plan.identifier).join(', ') || 'No plan',
                        results.length ? ` · ${results.length} result(s)` : '')); }))) : React.createElement(ui_1.EmptyState, { icon: "verification", title: "No requirement selected", description: "Create a requirement before tracing the V-model." })) : null,
        React.createElement(Modal_1.Modal, { open: functionModal, onClose: () => setFunctionModal(false), title: "Create function", description: "Describe what the system must do before assigning what performs it.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setFunctionModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addFunction }, "Create function")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Function name", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: newFunction.name, onChange: (event) => setNewFunction({ ...newFunction, name: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: newFunction.owner, onChange: (event) => setNewFunction({ ...newFunction, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Parent function" },
                    React.createElement(ui_1.Select, { value: newFunction.parentId, onChange: (event) => setNewFunction({ ...newFunction, parentId: event.target.value }) },
                        React.createElement("option", { value: "" }, "No parent"),
                        project.functions.map((record) => React.createElement("option", { key: record.id, value: record.id },
                            record.identifier,
                            " \u00B7 ",
                            record.name)))),
                React.createElement(ui_1.Field, { label: "Description", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: newFunction.description, onChange: (event) => setNewFunction({ ...newFunction, description: event.target.value }) })))),
        React.createElement(Modal_1.Modal, { open: objectModal, onClose: () => setObjectModal(false), title: "Create implementation object", description: "Physical and logical decomposition levels are configurable by domain.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setObjectModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addObject }, "Create object")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Object name", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: newObject.name, onChange: (event) => setNewObject({ ...newObject, name: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Domain" },
                    React.createElement(ui_1.Select, { value: newObject.domain, onChange: (event) => { const domain = event.target.value; setNewObject({ ...newObject, domain, objectType: objectTypeOptions[domain][0] }); } }, Object.keys(objectTypeOptions).map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Object type" },
                    React.createElement(ui_1.Select, { value: newObject.objectType, onChange: (event) => setNewObject({ ...newObject, objectType: event.target.value }) }, objectTypeOptions[newObject.domain].map((value) => React.createElement("option", { key: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: newObject.owner, onChange: (event) => setNewObject({ ...newObject, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Parent object" },
                    React.createElement(ui_1.Select, { value: newObject.parentId, onChange: (event) => setNewObject({ ...newObject, parentId: event.target.value }) },
                        React.createElement("option", { value: "" }, "No parent"),
                        project.objects.map((record) => React.createElement("option", { key: record.id, value: record.id },
                            record.identifier,
                            " \u00B7 ",
                            record.name)))),
                React.createElement(ui_1.Field, { label: "Description", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: newObject.description, onChange: (event) => setNewObject({ ...newObject, description: event.target.value }) })))),
        React.createElement(Modal_1.Modal, { open: interfaceModal, onClose: () => setInterfaceModal(false), title: "Create interface", description: "Provide enough structure for integration planning, testing, and evidence without replacing a complete Interface Control Document.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setInterfaceModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addInterface }, "Create interface")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Interface title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: newInterface.title, onChange: (event) => setNewInterface({ ...newInterface, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Endpoint A" },
                    React.createElement(ui_1.Select, { value: newInterface.endpointAId, onChange: (event) => setNewInterface({ ...newInterface, endpointAId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select object"),
                        project.objects.map((record) => React.createElement("option", { key: record.id, value: record.id },
                            record.identifier,
                            " \u00B7 ",
                            record.name)))),
                React.createElement(ui_1.Field, { label: "Endpoint B" },
                    React.createElement(ui_1.Select, { value: newInterface.endpointBId, onChange: (event) => setNewInterface({ ...newInterface, endpointBId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select object"),
                        project.objects.map((record) => React.createElement("option", { key: record.id, value: record.id },
                            record.identifier,
                            " \u00B7 ",
                            record.name)))),
                React.createElement(ui_1.Field, { label: "Interface type" },
                    React.createElement(ui_1.Select, { value: newInterface.interfaceType, onChange: (event) => setNewInterface({ ...newInterface, interfaceType: event.target.value }) }, ['mechanical', 'electrical', 'data', 'software', 'thermal', 'fluid', 'optical', 'radio-frequency', 'human', 'organizational', 'user-defined'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Direction" },
                    React.createElement(ui_1.Select, { value: newInterface.direction, onChange: (event) => setNewInterface({ ...newInterface, direction: event.target.value }) }, ['A-to-B', 'B-to-A', 'bidirectional'].map((value) => React.createElement("option", { key: value }, value)))),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: newInterface.owner, onChange: (event) => setNewInterface({ ...newInterface, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Exchanged item", className: "field--wide" },
                    React.createElement(ui_1.Input, { value: newInterface.exchangedItem, onChange: (event) => setNewInterface({ ...newInterface, exchangedItem: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Protocol" },
                    React.createElement(ui_1.Input, { value: newInterface.protocol, onChange: (event) => setNewInterface({ ...newInterface, protocol: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Key characteristics" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: newInterface.characteristics, onChange: (event) => setNewInterface({ ...newInterface, characteristics: event.target.value }) }))))));
}

},
"src/views/BaselinesView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaselinesView = BaselinesView;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const ProjectContext_1 = require("../hooks/ProjectContext");
const files_1 = require("../services/files");
const dates_1 = require("../utils/dates");
const id_1 = require("../utils/id");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Modal_1 = require("../components/Modal");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
const blankBaseline = { title: '', description: '', approvedBy: '', owner: 'Systems Engineering Lead' };
const blankChange = {
    title: '', reason: '', originator: '', proposedChange: '', owner: 'Systems Engineering Lead', affectedRecordIds: [],
    impactAnalysis: '', scheduleImpact: '', budgetImpact: '', riskImpact: '', verificationImpact: '', reviewer: ''
};
function snapshot(project) {
    return structuredClone({
        projectRevision: project.revision,
        requirements: project.requirements,
        functions: project.functions,
        objects: project.objects,
        interfaces: project.interfaces,
        verificationPlans: project.verificationPlans,
        testCases: project.testCases,
        testExecutions: project.testExecutions,
        failureModes: project.failureModes,
        workItems: project.workItems,
        workDependencies: project.workDependencies,
        projectBudgetLines: project.projectBudgetLines,
        technicalBudgets: project.technicalBudgets,
        documents: project.documents,
        links: project.links
    });
}
function recordName(record) {
    const candidate = record;
    return candidate.title ?? candidate.name ?? candidate.failureMode ?? candidate.resourceType ?? candidate.statement ?? candidate.id ?? 'Record';
}
function recordIdentifier(project, id) {
    const arrays = [
        project.requirements,
        project.functions,
        project.objects,
        project.interfaces,
        project.verificationPlans,
        project.testCases,
        project.testExecutions,
        project.failureModes,
        project.workItems,
        project.projectBudgetLines,
        project.technicalBudgets,
        project.documents,
        project.decisions,
        project.assumptions,
        project.issuesActions,
        project.changeRequests
    ];
    return arrays.flat().find((record) => record.id === id)?.identifier ?? id;
}
function BaselinesView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('baselines');
    const [baselineModal, setBaselineModal] = (0, react_1.useState)(false);
    const [changeModal, setChangeModal] = (0, react_1.useState)(false);
    const [baselineForm, setBaselineForm] = (0, react_1.useState)(blankBaseline);
    const [changeForm, setChangeForm] = (0, react_1.useState)(blankChange);
    const [selectedBaselineId, setSelectedBaselineId] = (0, react_1.useState)(project.baselines.at(-1)?.id ?? '');
    const [leftBaselineId, setLeftBaselineId] = (0, react_1.useState)(project.baselines[0]?.id ?? '');
    const [rightBaselineId, setRightBaselineId] = (0, react_1.useState)(project.baselines.at(-1)?.id ?? '');
    const [expandedDifference, setExpandedDifference] = (0, react_1.useState)();
    const selectedBaseline = project.baselines.find((baseline) => baseline.id === selectedBaselineId);
    const leftBaseline = project.baselines.find((baseline) => baseline.id === leftBaselineId);
    const rightBaseline = project.baselines.find((baseline) => baseline.id === rightBaselineId);
    const differences = (0, react_1.useMemo)(() => leftBaseline && rightBaseline && leftBaseline.id !== rightBaseline.id ? (0, calculations_1.compareBaselines)(leftBaseline, rightBaseline) : [], [leftBaseline, rightBaseline]);
    const differenceTotals = (0, react_1.useMemo)(() => differences.reduce((totals, difference) => ({
        added: totals.added + difference.added.length,
        removed: totals.removed + difference.removed.length,
        changed: totals.changed + difference.changed.length
    }), { added: 0, removed: 0, changed: 0 }), [differences]);
    const tabs = [
        { id: 'baselines', label: 'Baselines', icon: 'baseline', count: project.baselines.length },
        { id: 'compare', label: 'Compare', icon: 'refresh', count: differences.length ? differenceTotals.added + differenceTotals.removed + differenceTotals.changed : undefined },
        { id: 'changes', label: 'Change requests', icon: 'edit', count: project.changeRequests.filter((request) => request.implementationStatus !== 'closed').length }
    ];
    const affectedChoices = (0, react_1.useMemo)(() => [
        ...project.requirements.map((record) => ({ id: record.id, group: 'Requirements', label: `${record.identifier} · ${record.title}` })),
        ...project.functions.map((record) => ({ id: record.id, group: 'Functions', label: `${record.identifier} · ${record.name}` })),
        ...project.objects.map((record) => ({ id: record.id, group: 'Architecture objects', label: `${record.identifier} · ${record.name}` })),
        ...project.interfaces.map((record) => ({ id: record.id, group: 'Interfaces', label: `${record.identifier} · ${record.title}` })),
        ...project.verificationPlans.map((record) => ({ id: record.id, group: 'Verification', label: `${record.identifier} · ${record.title}` })),
        ...project.failureModes.map((record) => ({ id: record.id, group: 'Failure analysis', label: `${record.identifier} · ${record.failureMode}` })),
        ...project.workItems.map((record) => ({ id: record.id, group: 'Schedule', label: `${record.identifier} · ${record.title}` })),
        ...project.projectBudgetLines.map((record) => ({ id: record.id, group: 'Project budget', label: `${record.identifier} · ${record.title}` })),
        ...project.technicalBudgets.map((record) => ({ id: record.id, group: 'Technical budgets', label: `${record.identifier} · ${record.title}` })),
        ...project.documents.map((record) => ({ id: record.id, group: 'Evidence', label: `${record.identifier} · ${record.title}` }))
    ], [project]);
    const createBaseline = () => {
        if (!baselineForm.title.trim() || !baselineForm.approvedBy.trim())
            return notify('Enter a baseline title and approving authority.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('baseline', (0, id_1.nextIdentifier)('BL', project.baselines.map((baseline) => baseline.identifier)), baselineForm.title.trim(), baselineForm.owner.trim() || 'Systems Engineering Lead', 'approved'),
            description: baselineForm.description.trim(),
            approvedBy: baselineForm.approvedBy.trim(),
            approvedAt: new Date().toISOString(),
            snapshot: snapshot(project)
        };
        updateProject((draft) => {
            draft.baselines.push(record);
            draft.requirements.forEach((requirement) => {
                if (!requirement.baselineIds.includes(record.id))
                    requirement.baselineIds.push(record.id);
                if (requirement.statuses.definition === 'approved')
                    requirement.statuses.definition = 'baselined';
            });
        });
        setBaselineForm(blankBaseline);
        setBaselineModal(false);
        setSelectedBaselineId(record.id);
        setRightBaselineId(record.id);
        notify(`${record.identifier} created with exact record revisions and relationships.`, 'success');
    };
    const toggleAffected = (id) => setChangeForm((current) => ({ ...current, affectedRecordIds: current.affectedRecordIds.includes(id) ? current.affectedRecordIds.filter((value) => value !== id) : [...current.affectedRecordIds, id] }));
    const createChange = () => {
        if (!changeForm.title.trim() || !changeForm.reason.trim() || !changeForm.proposedChange.trim())
            return notify('Enter the change title, reason, and proposed change.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('change', (0, id_1.nextIdentifier)('CR', project.changeRequests.map((request) => request.identifier)), changeForm.title.trim(), changeForm.owner.trim() || 'Systems Engineering Lead', 'draft'),
            reason: changeForm.reason.trim(),
            originator: changeForm.originator.trim(),
            proposedChange: changeForm.proposedChange.trim(),
            affectedRecordIds: [...changeForm.affectedRecordIds],
            impactAnalysis: changeForm.impactAnalysis.trim(),
            scheduleImpact: changeForm.scheduleImpact.trim(),
            budgetImpact: changeForm.budgetImpact.trim(),
            riskImpact: changeForm.riskImpact.trim(),
            verificationImpact: changeForm.verificationImpact.trim(),
            disposition: 'draft',
            reviewer: changeForm.reviewer.trim(),
            approval: '',
            implementationStatus: 'not-started',
            resultingRevisionIds: []
        };
        updateProject((draft) => {
            draft.changeRequests.push(record);
            record.affectedRecordIds.forEach((id) => {
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'changed-by', fromId: id, toId: record.id, rationale: record.reason, createdAt: new Date().toISOString(), createdBy: record.originator || record.owner });
                const requirement = draft.requirements.find((candidate) => candidate.id === id);
                if (requirement)
                    requirement.statuses.definition = 'change-pending';
            });
        });
        setChangeForm(blankChange);
        setChangeModal(false);
        notify(`${record.identifier} opened for impact review.`, 'success');
    };
    const exportComparison = () => {
        if (!leftBaseline || !rightBaseline)
            return;
        (0, files_1.exportCsv)(`${leftBaseline.identifier.toLowerCase()}-to-${rightBaseline.identifier.toLowerCase()}-baseline-comparison.csv`, differences.flatMap((difference) => [
            ...difference.added.map((record) => ({ entity: difference.entity, change: 'added', identifier: record.identifier, title: recordName(record), fields: '' })),
            ...difference.removed.map((record) => ({ entity: difference.entity, change: 'removed', identifier: record.identifier, title: recordName(record), fields: '' })),
            ...difference.changed.map((entry) => ({ entity: difference.entity, change: 'changed', identifier: entry.after.identifier, title: recordName(entry.after), fields: entry.changedFields.join('; ') }))
        ]));
    };
    const baselineCount = (baseline) => ({
        requirements: baseline.snapshot.requirements.length,
        architecture: baseline.snapshot.functions.length + baseline.snapshot.objects.length + baseline.snapshot.interfaces.length,
        verification: baseline.snapshot.verificationPlans.length + baseline.snapshot.testExecutions.length,
        failures: baseline.snapshot.failureModes.length,
        work: baseline.snapshot.workItems.length,
        evidence: baseline.snapshot.documents.length
    });
    return (React.createElement("div", { className: "view-stack" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Configuration control", title: "Baselines", description: "Understand what changed, why it changed, who accepted it, and which requirements, tests, evidence, schedule, or budgets must be reviewed again.", actions: React.createElement(ui_1.Button, { variant: "primary", icon: "lock", onClick: () => setBaselineModal(true) }, "Create baseline") }),
        React.createElement(Tabs_1.Tabs, { options: tabs, active: activeTab, onChange: setActiveTab }),
        activeTab === 'baselines' ? (React.createElement("div", { className: "baseline-layout" },
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Named baselines", description: "Each baseline retains exact revisions and typed relationships without freezing the live project." }),
                project.baselines.length ? React.createElement("div", { className: "baseline-list" }, project.baselines.map((baseline) => { const counts = baselineCount(baseline); return React.createElement("button", { key: baseline.id, className: `baseline-card ${selectedBaselineId === baseline.id ? 'is-selected' : ''}`, onClick: () => setSelectedBaselineId(baseline.id) },
                    React.createElement("div", { className: "baseline-card__rail" },
                        React.createElement(Icon_1.Icon, { name: "lock", size: 18 })),
                    React.createElement("div", { className: "baseline-card__body" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "record-id" }, baseline.identifier),
                            React.createElement(StatusBadge_1.StatusBadge, { value: baseline.lifecycleState })),
                        React.createElement("h3", null, baseline.title),
                        React.createElement("p", null, (0, text_1.truncate)(baseline.description, 150)),
                        React.createElement("div", { className: "baseline-card__meta" },
                            React.createElement("span", null,
                                "Project revision ",
                                baseline.snapshot.projectRevision),
                            React.createElement("span", null, (0, dates_1.formatDate)(baseline.approvedAt)),
                            React.createElement("span", null, baseline.approvedBy)),
                        React.createElement("div", { className: "baseline-card__counts" },
                            React.createElement("span", null,
                                React.createElement("strong", null, counts.requirements),
                                " requirements"),
                            React.createElement("span", null,
                                React.createElement("strong", null, counts.architecture),
                                " architecture"),
                            React.createElement("span", null,
                                React.createElement("strong", null, counts.verification),
                                " verification"),
                            React.createElement("span", null,
                                React.createElement("strong", null, counts.evidence),
                                " evidence"))),
                    React.createElement(Icon_1.Icon, { name: "chevron-right" })); })) : React.createElement(ui_1.EmptyState, { icon: "baseline", title: "No controlled baseline", description: "Create a named snapshot before approving changes or comparing revisions.", action: React.createElement(ui_1.Button, { variant: "primary", icon: "lock", onClick: () => setBaselineModal(true) }, "Create baseline") })),
            selectedBaseline ? React.createElement("aside", { className: "record-inspector baseline-inspector" },
                React.createElement("div", { className: "record-inspector__header" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "record-id" }, selectedBaseline.identifier),
                        React.createElement("h2", null, selectedBaseline.title),
                        React.createElement("p", null,
                            "Project revision ",
                            selectedBaseline.snapshot.projectRevision))),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("p", null, selectedBaseline.description || 'No description recorded.'),
                    React.createElement("dl", { className: "definition-list definition-list--cards" },
                        React.createElement("div", null,
                            React.createElement("dt", null, "Approved by"),
                            React.createElement("dd", null, selectedBaseline.approvedBy)),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Approved"),
                            React.createElement("dd", null, (0, dates_1.formatDateTime)(selectedBaseline.approvedAt))),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Owner"),
                            React.createElement("dd", null, selectedBaseline.owner)),
                        React.createElement("div", null,
                            React.createElement("dt", null, "LOOM revision"),
                            React.createElement("dd", null,
                                "v",
                                project.applicationVersion)))),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("h3", null, "Included configuration"),
                    Object.entries(baselineCount(selectedBaseline)).map(([name, count]) => React.createElement("div", { className: "summary-row", key: name },
                        React.createElement("span", null, (0, text_1.humanize)(name)),
                        React.createElement("strong", null, count)))),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("h3", null, "Snapshot manifest"),
                    React.createElement("div", { className: "manifest-list" },
                        React.createElement("span", null,
                            selectedBaseline.snapshot.links.length,
                            " typed links"),
                        React.createElement("span", null,
                            selectedBaseline.snapshot.projectBudgetLines.length,
                            " financial budget lines"),
                        React.createElement("span", null,
                            selectedBaseline.snapshot.technicalBudgets.length,
                            " technical budgets"),
                        React.createElement("span", null,
                            selectedBaseline.snapshot.workDependencies.length,
                            " schedule dependencies"))),
                React.createElement("div", { className: "inspector-actions" },
                    React.createElement(ui_1.Button, { icon: "refresh", onClick: () => { setLeftBaselineId(project.baselines[0]?.id ?? selectedBaseline.id); setRightBaselineId(selectedBaseline.id); setActiveTab('compare'); } }, "Compare baseline"))) : null)) : null,
        activeTab === 'compare' ? (React.createElement("div", { className: "view-stack" },
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Baseline comparison", description: "Compare controlled record contents, thresholds, allocations, test criteria, schedule, budgets, evidence, and other stored fields.", actions: React.createElement(ui_1.Button, { icon: "download", onClick: exportComparison, disabled: !differences.length }, "Export comparison") }),
                project.baselines.length >= 2 ? React.createElement("div", { className: "compare-picker" },
                    React.createElement(ui_1.Field, { label: "Earlier baseline" },
                        React.createElement(ui_1.Select, { value: leftBaselineId, onChange: (event) => setLeftBaselineId(event.target.value) }, project.baselines.map((baseline) => React.createElement("option", { key: baseline.id, value: baseline.id },
                            baseline.identifier,
                            " \u00B7 ",
                            baseline.title)))),
                    React.createElement("div", { className: "compare-arrow" },
                        React.createElement(Icon_1.Icon, { name: "arrow-right", size: 22 })),
                    React.createElement(ui_1.Field, { label: "Later baseline" },
                        React.createElement(ui_1.Select, { value: rightBaselineId, onChange: (event) => setRightBaselineId(event.target.value) }, project.baselines.map((baseline) => React.createElement("option", { key: baseline.id, value: baseline.id },
                            baseline.identifier,
                            " \u00B7 ",
                            baseline.title))))) : React.createElement(ui_1.EmptyState, { icon: "refresh", title: "Two baselines are required", description: "Create another baseline after controlled changes to enable comparison." })),
            leftBaseline && rightBaseline && leftBaseline.id === rightBaseline.id ? React.createElement("div", { className: "inline-alert inline-alert--warning" },
                React.createElement(Icon_1.Icon, { name: "info" }),
                "Select two different baselines to calculate differences.") : null,
            differences.length ? React.createElement(React.Fragment, null,
                React.createElement("div", { className: "metric-strip metric-strip--compact" },
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Added"),
                        React.createElement("strong", null, differenceTotals.added),
                        React.createElement("small", null, "new controlled records")),
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Removed"),
                        React.createElement("strong", null, differenceTotals.removed),
                        React.createElement("small", null, "no longer in baseline")),
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Changed"),
                        React.createElement("strong", null, differenceTotals.changed),
                        React.createElement("small", null, "field-level differences")),
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Entity groups"),
                        React.createElement("strong", null, differences.filter((difference) => difference.added.length || difference.removed.length || difference.changed.length).length),
                        React.createElement("small", null, "with changes"))),
                React.createElement("div", { className: "difference-list" }, differences.map((difference) => {
                    const total = difference.added.length + difference.removed.length + difference.changed.length;
                    return React.createElement(ui_1.Panel, { key: difference.entity, className: total ? 'difference-panel has-changes' : 'difference-panel' },
                        React.createElement("button", { className: "difference-panel__header", onClick: () => setExpandedDifference(expandedDifference === difference.entity ? undefined : difference.entity) },
                            React.createElement("div", null,
                                React.createElement(Icon_1.Icon, { name: total ? 'warning' : 'check' }),
                                React.createElement("div", null,
                                    React.createElement("h2", null, difference.entity),
                                    React.createElement("p", null,
                                        difference.added.length,
                                        " added \u00B7 ",
                                        difference.removed.length,
                                        " removed \u00B7 ",
                                        difference.changed.length,
                                        " changed"))),
                            React.createElement(Icon_1.Icon, { name: expandedDifference === difference.entity ? 'chevron-down' : 'chevron-right' })),
                        expandedDifference === difference.entity ? React.createElement(DifferenceTable, { difference: difference }) : null);
                }))) : null)) : null,
        activeTab === 'changes' ? (React.createElement("div", { className: "view-stack" },
            React.createElement("div", { className: "section-toolbar" },
                React.createElement("div", null,
                    React.createElement("strong", null, "Change control"),
                    React.createElement("span", null, "Lightweight workflow with explicit impact and reverification needs.")),
                React.createElement(ui_1.Button, { variant: "primary", icon: "plus", onClick: () => setChangeModal(true) }, "New change request")),
            project.changeRequests.length ? React.createElement("div", { className: "change-grid" }, project.changeRequests.map((request) => React.createElement(ui_1.Panel, { key: request.id, className: "change-card" },
                React.createElement("div", { className: "change-card__header" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "record-id" }, request.identifier),
                        React.createElement("h2", null, request.title)),
                    React.createElement("div", null,
                        React.createElement(StatusBadge_1.StatusBadge, { value: request.disposition }),
                        React.createElement(StatusBadge_1.StatusBadge, { value: request.implementationStatus }))),
                React.createElement("p", null, request.reason),
                React.createElement("div", { className: "change-card__proposed" },
                    React.createElement("span", null, "Proposed change"),
                    React.createElement("strong", null, request.proposedChange)),
                React.createElement("div", { className: "impact-grid" },
                    React.createElement("div", null,
                        React.createElement(Icon_1.Icon, { name: "graph" }),
                        React.createElement("span", null, "Engineering"),
                        React.createElement("p", null, request.impactAnalysis || 'Not assessed')),
                    React.createElement("div", null,
                        React.createElement(Icon_1.Icon, { name: "calendar" }),
                        React.createElement("span", null, "Schedule"),
                        React.createElement("p", null, request.scheduleImpact || 'Not assessed')),
                    React.createElement("div", null,
                        React.createElement(Icon_1.Icon, { name: "budget" }),
                        React.createElement("span", null, "Budget"),
                        React.createElement("p", null, request.budgetImpact || 'Not assessed')),
                    React.createElement("div", null,
                        React.createElement(Icon_1.Icon, { name: "failure" }),
                        React.createElement("span", null, "Risk"),
                        React.createElement("p", null, request.riskImpact || 'Not assessed')),
                    React.createElement("div", null,
                        React.createElement(Icon_1.Icon, { name: "verification" }),
                        React.createElement("span", null, "Verification"),
                        React.createElement("p", null, request.verificationImpact || 'Not assessed'))),
                React.createElement("div", { className: "chip-row" }, request.affectedRecordIds.map((id) => React.createElement("span", { className: "chip", key: id }, recordIdentifier(project, id)))),
                React.createElement("div", { className: "change-card__controls" },
                    React.createElement(ui_1.Field, { label: "Disposition" },
                        React.createElement(ui_1.Select, { value: request.disposition, onChange: (event) => updateProject((draft) => { const record = draft.changeRequests.find((candidate) => candidate.id === request.id); if (record) {
                                record.disposition = event.target.value;
                                record.lifecycleState = record.disposition;
                            } }) }, ['draft', 'under-review', 'approved', 'rejected', 'deferred'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                    React.createElement(ui_1.Field, { label: "Implementation" },
                        React.createElement(ui_1.Select, { value: request.implementationStatus, onChange: (event) => updateProject((draft) => { const record = draft.changeRequests.find((candidate) => candidate.id === request.id); if (record)
                                record.implementationStatus = event.target.value; }) }, ['not-started', 'in-progress', 'implemented', 'verified', 'closed'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                    React.createElement(ui_1.Field, { label: "Approval record" },
                        React.createElement(ui_1.Input, { value: request.approval, placeholder: "Authority and date", onChange: (event) => updateProject((draft) => { const record = draft.changeRequests.find((candidate) => candidate.id === request.id); if (record)
                                record.approval = event.target.value; }) }))),
                React.createElement("div", { className: "change-card__footer" },
                    React.createElement("span", null,
                        "Originator: ",
                        request.originator || 'Not recorded'),
                    React.createElement("span", null,
                        "Reviewer: ",
                        request.reviewer || 'Not assigned'),
                    React.createElement("span", null,
                        request.affectedRecordIds.length,
                        " affected record(s)"))))) : React.createElement(ui_1.EmptyState, { icon: "edit", title: "No change requests", description: "Open a request when a controlled item changes and trace the effects into schedule, budget, risk, verification, evidence, and baseline status.", action: React.createElement(ui_1.Button, { variant: "primary", onClick: () => setChangeModal(true) }, "Create change request") }))) : null,
        React.createElement(Modal_1.Modal, { open: baselineModal, onClose: () => setBaselineModal(false), title: "Create named baseline", description: "This records exact revisions and relationships from the current live project. Later edits will not alter the snapshot.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setBaselineModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", icon: "lock", onClick: createBaseline }, "Create baseline")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Baseline title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: baselineForm.title, onChange: (event) => setBaselineForm({ ...baselineForm, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: baselineForm.owner, onChange: (event) => setBaselineForm({ ...baselineForm, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Approved by", required: true },
                    React.createElement(ui_1.Input, { value: baselineForm.approvedBy, onChange: (event) => setBaselineForm({ ...baselineForm, approvedBy: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Description", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: baselineForm.description, onChange: (event) => setBaselineForm({ ...baselineForm, description: event.target.value }) })),
                React.createElement("div", { className: "field--wide baseline-preview" },
                    React.createElement(Icon_1.Icon, { name: "lock" }),
                    React.createElement("div", null,
                        React.createElement("strong", null,
                            "Project revision ",
                            project.revision),
                        React.createElement("p", null,
                            project.requirements.length,
                            " requirements \u00B7 ",
                            project.objects.length,
                            " objects \u00B7 ",
                            project.verificationPlans.length,
                            " plans \u00B7 ",
                            project.documents.length,
                            " evidence artifacts \u00B7 ",
                            project.workItems.length,
                            " work items"))))),
        React.createElement(Modal_1.Modal, { open: changeModal, onClose: () => setChangeModal(false), title: "Create change request", description: "Capture the reason, proposed change, affected records, and impacts before the project configuration is changed.", width: "large", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setChangeModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createChange }, "Open change request")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: changeForm.title, onChange: (event) => setChangeForm({ ...changeForm, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Originator" },
                    React.createElement(ui_1.Input, { value: changeForm.originator, onChange: (event) => setChangeForm({ ...changeForm, originator: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: changeForm.owner, onChange: (event) => setChangeForm({ ...changeForm, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Reviewer" },
                    React.createElement(ui_1.Input, { value: changeForm.reviewer, onChange: (event) => setChangeForm({ ...changeForm, reviewer: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Reason", required: true, className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.reason, onChange: (event) => setChangeForm({ ...changeForm, reason: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Proposed change", required: true, className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.proposedChange, onChange: (event) => setChangeForm({ ...changeForm, proposedChange: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Engineering impact", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.impactAnalysis, onChange: (event) => setChangeForm({ ...changeForm, impactAnalysis: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Schedule impact" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.scheduleImpact, onChange: (event) => setChangeForm({ ...changeForm, scheduleImpact: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Budget impact" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.budgetImpact, onChange: (event) => setChangeForm({ ...changeForm, budgetImpact: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Risk impact" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.riskImpact, onChange: (event) => setChangeForm({ ...changeForm, riskImpact: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Verification impact" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: changeForm.verificationImpact, onChange: (event) => setChangeForm({ ...changeForm, verificationImpact: event.target.value }) })),
                React.createElement("div", { className: "field--wide selection-box selection-box--scroll" },
                    React.createElement("strong", null, "Affected controlled records"),
                    Object.entries(affectedChoices.reduce((groups, choice) => { var _a; (groups[_a = choice.group] ?? (groups[_a] = [])).push(choice); return groups; }, {})).map(([group, choices]) => React.createElement("div", { className: "selection-group", key: group },
                        React.createElement("h4", null, group),
                        choices.map((choice) => React.createElement(ui_1.Checkbox, { key: choice.id, label: choice.label, checked: changeForm.affectedRecordIds.includes(choice.id), onChange: () => toggleAffected(choice.id) })))))))));
}
function DifferenceTable({ difference }) {
    const rows = [
        ...difference.added.map((record) => ({ id: record.id, identifier: record.identifier, title: recordName(record), change: 'added', fields: [] })),
        ...difference.removed.map((record) => ({ id: record.id, identifier: record.identifier, title: recordName(record), change: 'removed', fields: [] })),
        ...difference.changed.map((entry) => ({ id: entry.after.id, identifier: entry.after.identifier, title: recordName(entry.after), change: 'changed', fields: entry.changedFields }))
    ];
    if (!rows.length)
        return React.createElement("div", { className: "difference-empty" },
            React.createElement(Icon_1.Icon, { name: "check" }),
            "No differences in this entity group.");
    return React.createElement("div", { className: "table-scroll" },
        React.createElement("table", { className: "data-table data-table--compact" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Change"),
                    React.createElement("th", null, "Record"),
                    React.createElement("th", null, "Changed fields"))),
            React.createElement("tbody", null, rows.map((row) => React.createElement("tr", { key: `${row.change}-${row.id}` },
                React.createElement("td", null,
                    React.createElement(StatusBadge_1.StatusBadge, { value: row.change })),
                React.createElement("td", null,
                    React.createElement("span", { className: "record-id" }, row.identifier),
                    React.createElement("strong", null, row.title)),
                React.createElement("td", null, row.fields.length ? React.createElement("div", { className: "chip-row" }, row.fields.map((field) => React.createElement("span", { className: "chip", key: field }, (0, text_1.humanize)(field)))) : '—'))))));
}

},
"src/views/CockpitView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CockpitView = CockpitView;
const react_1 = require("react");
const ProjectContext_1 = require("../hooks/ProjectContext");
const calculations_1 = require("../domain/calculations");
const ui_1 = require("../components/ui");
const Icon_1 = require("../components/Icon");
const Progress_1 = require("../components/Progress");
const StatusBadge_1 = require("../components/StatusBadge");
const text_1 = require("../utils/text");
const dates_1 = require("../utils/dates");
function MetricCard({ icon, label, value, note, tone = 'neutral', onClick }) {
    return (React.createElement("button", { className: `metric-card metric-card--${tone}`, onClick: onClick },
        React.createElement("span", { className: "metric-card__icon" },
            React.createElement(Icon_1.Icon, { name: icon, size: 20 })),
        React.createElement("span", { className: "metric-card__label" }, label),
        React.createElement("strong", null, value),
        React.createElement("small", null, note),
        React.createElement(Icon_1.Icon, { name: "arrow-right", size: 16, className: "metric-card__arrow" })));
}
function CockpitView({ navigate = () => undefined }) {
    const { project } = (0, ProjectContext_1.useProject)();
    const cockpit = (0, react_1.useMemo)(() => (0, calculations_1.projectCockpit)(project), [project]);
    const attention = (0, react_1.useMemo)(() => (0, calculations_1.recordsNeedingAttention)(project), [project]);
    const topObjects = (0, react_1.useMemo)(() => project.objects.filter((object) => !object.parentId && !object.archived).map((object) => ({ object, readiness: (0, calculations_1.objectReadiness)(project, object) })), [project]);
    const verificationCounts = (0, react_1.useMemo)(() => {
        const values = project.requirements.map((requirement) => (0, calculations_1.deriveVerificationState)(project, requirement));
        return ['passed', 'failed', 'blocked', 'ready', 'planned', 'unplanned'].map((status) => ({ status, count: values.filter((value) => value === status).length }));
    }, [project]);
    const evidenceCounts = (0, react_1.useMemo)(() => {
        const values = project.requirements.map((requirement) => (0, calculations_1.deriveEvidenceState)(project, requirement));
        return ['complete', 'incomplete', 'missing', 'stale', 'under-review'].map((status) => ({ status, count: values.filter((value) => value === status).length }));
    }, [project]);
    return (React.createElement("div", { className: "view-stack cockpit-view" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Project cockpit", title: project.name, description: "Trace requirements down. Build evidence back up. Exceptions are shown before vanity metrics.", actions: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => navigate('requirements') }, "Create requirement") }),
        project.archived ? React.createElement("div", { className: "banner banner--warning" },
            React.createElement(Icon_1.Icon, { name: "archive" }),
            "This project is archived. Restore it from the project menu before making controlled changes.") : null,
        React.createElement("div", { className: "thread-ribbon", "aria-label": "Digital engineering thread" }, ['Requirement', 'Verification intent', 'Failure analysis', 'Function', 'Implementation', 'Test result', 'Evidence', 'Acceptance'].map((label, index, array) => (React.createElement("div", { className: "thread-ribbon__step", key: label },
            React.createElement("span", null, String(index + 1).padStart(2, '0')),
            React.createElement("strong", null, label),
            index < array.length - 1 ? React.createElement(Icon_1.Icon, { name: "arrow-right", size: 16 }) : null)))),
        React.createElement("div", { className: "metric-grid" },
            React.createElement(MetricCard, { icon: "requirements", label: "Requirements", value: cockpit.totalRequirements, note: "Authoritative records", onClick: () => navigate('requirements') }),
            React.createElement(MetricCard, { icon: "architecture", label: "Allocation coverage", value: `${cockpit.allocationPercent}%`, note: "Function and object allocation", tone: cockpit.allocationPercent >= 85 ? 'good' : 'watch', onClick: () => navigate('architecture') }),
            React.createElement(MetricCard, { icon: "verification", label: "Not yet verified", value: cockpit.unverified, note: "Planned, blocked, failed, or open", tone: cockpit.unverified ? 'watch' : 'good', onClick: () => navigate('verification') }),
            React.createElement(MetricCard, { icon: "failure", label: "High-criticality concerns", value: cockpit.highFailures, note: "Mitigation not yet verified", tone: cockpit.highFailures ? 'danger' : 'good', onClick: () => navigate('failure') }),
            React.createElement(MetricCard, { icon: "evidence", label: "Evidence gaps", value: cockpit.evidenceGaps, note: `${cockpit.staleEvidence} stale or superseded artifact(s)`, tone: cockpit.evidenceGaps ? 'watch' : 'good', onClick: () => navigate('evidence') }),
            React.createElement(MetricCard, { icon: "calendar", label: "Late work", value: cockpit.lateWork, note: "Open items past planned finish", tone: cockpit.lateWork ? 'danger' : 'good', onClick: () => navigate('execution') }),
            React.createElement(MetricCard, { icon: "budget", label: "Forecast variance", value: new Intl.NumberFormat(undefined, { style: 'currency', currency: project.projectBudgetLines[0]?.currency || 'USD', maximumFractionDigits: 0 }).format(cockpit.budget.variance), note: "Approved minus forecast", tone: cockpit.budget.variance < 0 ? 'danger' : 'good', onClick: () => navigate('execution') }),
            React.createElement(MetricCard, { icon: "baseline", label: "Change control", value: cockpit.changeRequests, note: `${cockpit.pendingReviews} pending review(s)`, tone: cockpit.changeRequests ? 'watch' : 'neutral', onClick: () => navigate('baselines') })),
        React.createElement("div", { className: "cockpit-grid cockpit-grid--main" },
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Actionable exceptions", description: "Every row opens the area where the underlying record can be resolved." }),
                attention.length ? (React.createElement("div", { className: "exception-list" }, attention.slice(0, 10).map((row) => (React.createElement("button", { key: `${row.kind}-${row.id}`, onClick: () => navigate(row.kind === 'Failure mode' ? 'failure' : row.kind === 'Work item' ? 'execution' : row.kind === 'Evidence' ? 'evidence' : row.kind === 'Verification' ? 'verification' : 'requirements') },
                    React.createElement("span", { className: `exception-list__marker exception-list__marker--${row.severity}`, "aria-hidden": "true" }),
                    React.createElement("span", null,
                        React.createElement("strong", null, row.title),
                        React.createElement("small", null, row.kind)),
                    React.createElement("span", null, row.reason),
                    React.createElement(Icon_1.Icon, { name: "arrow-right", size: 16 })))))) : React.createElement("div", { className: "positive-empty" },
                    React.createElement(Icon_1.Icon, { name: "check" }),
                    "No current exceptions meet the attention threshold.")),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Verification posture", description: "Requirement-level status from actual plans and as-run results." }),
                React.createElement("div", { className: "distribution-list" }, verificationCounts.map(({ status, count }) => {
                    const percent = project.requirements.length ? Math.round((count / project.requirements.length) * 100) : 0;
                    return React.createElement("div", { key: status },
                        React.createElement("div", null,
                            React.createElement(StatusBadge_1.StatusBadge, { value: status, compact: true }),
                            React.createElement("strong", null, count)),
                        React.createElement(Progress_1.ProgressBar, { value: percent, showValue: false, size: "small" }));
                })),
                React.createElement("button", { className: "panel-link", onClick: () => navigate('verification') },
                    "Open verification control center ",
                    React.createElement(Icon_1.Icon, { name: "arrow-right", size: 15 })))),
        React.createElement("div", { className: "cockpit-grid cockpit-grid--three" },
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Readiness by top-level object", description: "Derived from implementation, inherited obligations, requirements, and interfaces." }),
                React.createElement("div", { className: "readiness-list" }, topObjects.map(({ object, readiness }) => (React.createElement("button", { key: object.id, onClick: () => navigate('architecture') },
                    React.createElement("div", null,
                        React.createElement("span", null, object.identifier),
                        React.createElement("strong", null, object.name)),
                    React.createElement(Progress_1.ProgressBar, { value: readiness, size: "small" })))))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Evidence posture", description: "Evidence state is separate from verification state." }),
                React.createElement("div", { className: "status-tile-grid" }, evidenceCounts.map(({ status, count }) => React.createElement("button", { key: status, onClick: () => navigate('evidence') },
                    React.createElement(StatusBadge_1.StatusBadge, { value: status, compact: true }),
                    React.createElement("strong", null, count)))),
                React.createElement("button", { className: "panel-link", onClick: () => navigate('evidence') },
                    "Answer \u201CWhere are the supporting documents?\u201D ",
                    React.createElement(Icon_1.Icon, { name: "arrow-right", size: 15 }))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Technical budget margins", description: "Financial delivery budgets remain separate from engineering resources." }),
                React.createElement("div", { className: "technical-budget-list" }, project.technicalBudgets.map((budget) => {
                    const summary = (0, calculations_1.technicalBudgetSummary)(budget);
                    return (React.createElement("button", { key: budget.id, onClick: () => navigate('execution') },
                        React.createElement("div", null,
                            React.createElement("span", null, budget.resourceType),
                            React.createElement("strong", null,
                                summary.margin.toFixed(2),
                                " ",
                                budget.unit,
                                " margin")),
                        React.createElement(Progress_1.ProgressBar, { value: Math.min(100, summary.utilizationPercent), label: `${summary.utilizationPercent}% used`, size: "small" })));
                })))),
        React.createElement(ui_1.Panel, null,
            React.createElement(ui_1.PanelHeader, { title: "Upcoming decisions and reviews", description: "The schedule, baseline, and review records that will change what the team can claim." }),
            React.createElement("div", { className: "compact-table-wrap" },
                React.createElement("table", { className: "data-table data-table--compact" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Record"),
                            React.createElement("th", null, "Owner"),
                            React.createElement("th", null, "Date"),
                            React.createElement("th", null, "State"),
                            React.createElement("th", null, "Why it matters"))),
                    React.createElement("tbody", null,
                        project.workItems.filter((item) => item.milestone || item.priority === 'critical').slice(0, 5).map((item) => (React.createElement("tr", { key: item.id, onClick: () => navigate('execution'), tabIndex: 0 },
                            React.createElement("td", null,
                                React.createElement("strong", null, item.identifier),
                                React.createElement("br", null),
                                React.createElement("span", null, item.title)),
                            React.createElement("td", null, item.owner),
                            React.createElement("td", null, (0, dates_1.formatDate)(item.plannedFinish)),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: item.status, compact: true })),
                            React.createElement("td", null, item.blockedReason || item.description)))),
                        project.changeRequests.slice(0, 3).map((request) => (React.createElement("tr", { key: request.id, onClick: () => navigate('baselines'), tabIndex: 0 },
                            React.createElement("td", null,
                                React.createElement("strong", null, request.identifier),
                                React.createElement("br", null),
                                React.createElement("span", null, request.title)),
                            React.createElement("td", null, request.owner),
                            React.createElement("td", null, (0, dates_1.formatDate)(request.updatedAt)),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: request.disposition, compact: true })),
                            React.createElement("td", null,
                                (0, text_1.humanize)(request.implementationStatus),
                                " \u2014 ",
                                request.verificationImpact))))))))));
}

},
"src/views/EvidenceView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceView = EvidenceView;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const ProjectContext_1 = require("../hooks/ProjectContext");
const files_1 = require("../services/files");
const reports_1 = require("../services/reports");
const dates_1 = require("../utils/dates");
const id_1 = require("../utils/id");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Modal_1 = require("../components/Modal");
const Progress_1 = require("../components/Progress");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
const blankDocument = {
    title: '', documentType: 'Supporting document', author: '', owner: 'Unassigned', date: (0, dates_1.todayIso)(), source: 'Local attachment',
    status: 'current', description: '', webLink: '', approvalState: 'not-required',
    linkedRecordIds: [], file: undefined
};
function formatBytes(value) {
    if (value === undefined)
        return '—';
    if (value < 1024)
        return `${value} B`;
    if (value < 1048576)
        return `${(value / 1024).toFixed(1)} KB`;
    return `${(value / 1048576).toFixed(1)} MB`;
}
function recordLabel(project, id) {
    return project.requirements.find((record) => record.id === id)?.identifier
        ?? project.functions.find((record) => record.id === id)?.identifier
        ?? project.objects.find((record) => record.id === id)?.identifier
        ?? project.interfaces.find((record) => record.id === id)?.identifier
        ?? project.verificationPlans.find((record) => record.id === id)?.identifier
        ?? project.testExecutions.find((record) => record.id === id)?.identifier
        ?? project.failureModes.find((record) => record.id === id)?.identifier
        ?? project.workItems.find((record) => record.id === id)?.identifier
        ?? project.changeRequests.find((record) => record.id === id)?.identifier
        ?? id;
}
function EvidenceView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('documents');
    const [documentModal, setDocumentModal] = (0, react_1.useState)(false);
    const [documentForm, setDocumentForm] = (0, react_1.useState)(blankDocument);
    const [selectedDocumentId, setSelectedDocumentId] = (0, react_1.useState)();
    const [dossierRequirementId, setDossierRequirementId] = (0, react_1.useState)(project.requirements[0]?.id ?? '');
    const [search, setSearch] = (0, react_1.useState)('');
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const replacementInputRef = (0, react_1.useRef)(null);
    const replacementDocumentId = (0, react_1.useRef)(undefined);
    const selectedDocument = project.documents.find((document) => document.id === selectedDocumentId);
    const tabs = [
        { id: 'documents', label: 'Documents', icon: 'document', count: project.documents.length },
        { id: 'gaps', label: 'Evidence gaps', icon: 'warning', count: project.requirements.filter((requirement) => (0, calculations_1.deriveEvidenceState)(project, requirement) !== 'complete').length },
        { id: 'reports', label: 'Generated reports', icon: 'print' }
    ];
    const filteredDocuments = (0, react_1.useMemo)(() => {
        const query = search.trim().toLowerCase();
        return project.documents.filter((document) => !query || [document.identifier, document.title, document.documentType, document.owner, document.author, document.description, document.status, ...document.tags].join(' ').toLowerCase().includes(query));
    }, [project.documents, search]);
    const evidenceCoverage = (0, react_1.useMemo)(() => {
        const complete = project.requirements.filter((requirement) => (0, calculations_1.deriveEvidenceState)(project, requirement) === 'complete').length;
        const stale = project.requirements.filter((requirement) => (0, calculations_1.deriveEvidenceState)(project, requirement) === 'stale').length;
        const total = project.requirements.length;
        return { complete, stale, total, percent: total ? Math.round((complete / total) * 100) : 0 };
    }, [project]);
    const linkChoices = (0, react_1.useMemo)(() => [
        ...project.requirements.map((record) => ({ id: record.id, group: 'Requirements', label: `${record.identifier} · ${record.title}` })),
        ...project.functions.map((record) => ({ id: record.id, group: 'Functions', label: `${record.identifier} · ${record.name}` })),
        ...project.objects.map((record) => ({ id: record.id, group: 'Architecture objects', label: `${record.identifier} · ${record.name}` })),
        ...project.interfaces.map((record) => ({ id: record.id, group: 'Interfaces', label: `${record.identifier} · ${record.title}` })),
        ...project.verificationPlans.map((record) => ({ id: record.id, group: 'Verification plans', label: `${record.identifier} · ${record.title}` })),
        ...project.testExecutions.map((record) => ({ id: record.id, group: 'Test executions', label: `${record.identifier} · ${record.title}` })),
        ...project.failureModes.map((record) => ({ id: record.id, group: 'Failure modes', label: `${record.identifier} · ${record.failureMode}` })),
        ...project.workItems.map((record) => ({ id: record.id, group: 'Work items', label: `${record.identifier} · ${record.title}` }))
    ], [project]);
    const toggleLink = (id) => setDocumentForm((current) => ({ ...current, linkedRecordIds: current.linkedRecordIds.includes(id) ? current.linkedRecordIds.filter((value) => value !== id) : [...current.linkedRecordIds, id] }));
    const addDocument = async () => {
        if (!documentForm.title.trim())
            return notify('Enter a document title.', 'warning');
        if (!documentForm.file && !documentForm.webLink.trim() && !documentForm.description.trim())
            return notify('Attach a file, enter a web link, or record a note.', 'warning');
        setUploading(true);
        try {
            const file = documentForm.file;
            const contentDataUrl = file ? await (0, files_1.fileToDataUrl)(file) : undefined;
            const fingerprint = file ? await (0, files_1.sha256)(file) : undefined;
            const record = {
                ...(0, factory_1.controlledRecord)('doc', (0, id_1.nextIdentifier)('DOC', project.documents.map((document) => document.identifier)), documentForm.title.trim(), documentForm.owner.trim() || 'Unassigned', documentForm.status),
                documentType: documentForm.documentType.trim() || 'Supporting document',
                author: documentForm.author.trim(),
                date: documentForm.date || (0, dates_1.todayIso)(),
                source: documentForm.source.trim(),
                status: documentForm.status,
                description: documentForm.description.trim(),
                fileName: file?.name,
                mimeType: file?.type,
                fileSize: file?.size,
                contentDataUrl,
                integrityFingerprint: fingerprint,
                webLink: documentForm.webLink.trim() || undefined,
                approvalState: documentForm.approvalState,
                linkedRecordIds: [...documentForm.linkedRecordIds]
            };
            updateProject((draft) => {
                draft.documents.push(record);
                record.linkedRecordIds.forEach((recordId) => {
                    const requirement = draft.requirements.find((candidate) => candidate.id === recordId);
                    if (requirement && !requirement.evidenceIds.includes(record.id)) {
                        requirement.evidenceIds.push(record.id);
                        requirement.statuses.evidence = 'complete';
                    }
                    const run = draft.testExecutions.find((candidate) => candidate.id === recordId);
                    if (run && !run.evidenceIds.includes(record.id))
                        run.evidenceIds.push(record.id);
                    const failure = draft.failureModes.find((candidate) => candidate.id === recordId);
                    if (failure && !failure.evidenceIds.includes(record.id))
                        failure.evidenceIds.push(record.id);
                    const plan = draft.verificationPlans.find((candidate) => candidate.id === recordId);
                    if (plan && !plan.documentIds.includes(record.id))
                        plan.documentIds.push(record.id);
                    const work = draft.workItems.find((candidate) => candidate.id === recordId);
                    if (work && !work.documentIds.includes(record.id))
                        work.documentIds.push(record.id);
                    draft.links.push({ id: (0, id_1.createId)('link'), type: 'supported-by', fromId: recordId, toId: record.id, rationale: record.documentType, createdAt: new Date().toISOString(), createdBy: record.owner });
                });
            });
            setDocumentForm(blankDocument);
            setDocumentModal(false);
            setSelectedDocumentId(record.id);
            notify(`${record.identifier} stored locally${fingerprint ? ' with a Secure Hash Algorithm 256-bit (SHA-256) integrity fingerprint' : ''}.`, 'success');
        }
        catch (error) {
            notify(error instanceof Error ? error.message : 'The evidence could not be attached.', 'danger');
        }
        finally {
            setUploading(false);
        }
    };
    const requestReplacement = (documentId) => {
        replacementDocumentId.current = documentId;
        replacementInputRef.current?.click();
    };
    const replaceDocumentFile = async (event) => {
        const file = event.target.files?.[0];
        const oldDocument = project.documents.find((document) => document.id === replacementDocumentId.current);
        event.target.value = '';
        if (!file || !oldDocument)
            return;
        setUploading(true);
        try {
            const contentDataUrl = await (0, files_1.fileToDataUrl)(file);
            const fingerprint = await (0, files_1.sha256)(file);
            const replacement = {
                ...structuredClone(oldDocument),
                id: (0, id_1.createId)('doc'),
                identifier: (0, id_1.nextIdentifier)('DOC', project.documents.map((document) => document.identifier)),
                title: oldDocument.title,
                revision: oldDocument.revision + 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                history: [...oldDocument.history, { id: (0, id_1.createId)('hist'), at: new Date().toISOString(), by: oldDocument.owner, action: 'File revised', revision: oldDocument.revision + 1, summary: `Replaced ${oldDocument.fileName ?? 'prior artifact'} with ${file.name}` }],
                status: 'current',
                fileName: file.name,
                mimeType: file.type,
                fileSize: file.size,
                contentDataUrl,
                integrityFingerprint: fingerprint,
                supersededById: undefined
            };
            updateProject((draft) => {
                const prior = draft.documents.find((document) => document.id === oldDocument.id);
                if (prior) {
                    prior.status = 'superseded';
                    prior.supersededById = replacement.id;
                    prior.updatedAt = new Date().toISOString();
                }
                draft.documents.push(replacement);
                draft.requirements.forEach((requirement) => {
                    if (requirement.evidenceIds.includes(oldDocument.id) && !requirement.evidenceIds.includes(replacement.id))
                        requirement.evidenceIds.push(replacement.id);
                });
                draft.testExecutions.forEach((run) => {
                    if (run.evidenceIds.includes(oldDocument.id) && !run.evidenceIds.includes(replacement.id))
                        run.evidenceIds.push(replacement.id);
                });
                replacement.linkedRecordIds.forEach((recordId) => draft.links.push({ id: (0, id_1.createId)('link'), type: 'supersedes', fromId: replacement.id, toId: oldDocument.id, rationale: 'Evidence revision', createdAt: new Date().toISOString(), createdBy: replacement.owner }));
            });
            setSelectedDocumentId(replacement.id);
            notify(`New evidence revision recorded; ${oldDocument.identifier} remains available.`, 'success');
        }
        catch (error) {
            notify(error instanceof Error ? error.message : 'The evidence revision could not be stored.', 'danger');
        }
        finally {
            setUploading(false);
            replacementDocumentId.current = undefined;
        }
    };
    const exportVerificationLevel = (level) => {
        const plans = project.verificationPlans.filter((plan) => plan.verificationLevel === level);
        const planIds = new Set(plans.map((plan) => plan.id));
        (0, files_1.exportCsv)(`${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${level}-verification-summary.csv`, project.testExecutions.filter((run) => planIds.has(run.verificationPlanId)).map((run) => ({
            execution: run.identifier,
            title: run.title,
            level,
            plan: project.verificationPlans.find((plan) => plan.id === run.verificationPlanId)?.identifier ?? '',
            requirements: run.requirementIds.map((id) => project.requirements.find((requirement) => requirement.id === id)?.identifier ?? id).join('; '),
            executed_at: run.executedAt,
            operator: run.operator,
            configuration: run.systemConfiguration,
            hardware_revision: run.hardwareRevision,
            software_version: run.softwareVersion,
            firmware_version: run.firmwareVersion,
            result: run.result,
            evidence: run.evidenceIds.map((id) => project.documents.find((document) => document.id === id)?.identifier ?? id).join('; '),
            deviations: run.deviations
        })));
    };
    const reportCards = [
        { title: 'Project status report', description: 'Actionable cockpit status, requirement state, budgets, failures, and evidence.', icon: 'cockpit', actions: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { size: "small", icon: "download", onClick: () => (0, reports_1.downloadProjectStatus)(project) }, "Markdown"),
                React.createElement(ui_1.Button, { size: "small", icon: "print", onClick: () => (0, reports_1.printProjectStatus)(project) }, "Print or PDF")) },
        { title: 'Requirements Traceability Matrix', description: 'Requirement-to-parent, function, object, interface, verification, and evidence cross-reference.', icon: 'table', actions: React.createElement(ui_1.Button, { size: "small", icon: "download", onClick: () => (0, reports_1.exportRequirementsTraceabilityMatrix)(project) }, "Comma-Separated Values (CSV)") },
        { title: 'Failure Modes, Effects, and Criticality Analysis report', description: 'Failure modes, effects, scores, mitigations, owners, and due dates.', icon: 'failure', actions: React.createElement(ui_1.Button, { size: "small", icon: "download", onClick: () => (0, reports_1.exportFailureAnalysis)(project) }, "CSV") },
        { title: 'Evidence index', description: 'Controlled document metadata, revisions, fingerprints, status, approval, and linked records.', icon: 'evidence', actions: React.createElement(ui_1.Button, { size: "small", icon: "download", onClick: () => (0, reports_1.exportEvidenceIndex)(project) }, "CSV") }
    ];
    return (React.createElement("div", { className: "view-stack" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Supporting documents and evidence", title: "Evidence", description: "Every artifact remains connected to the controlled record it supports, with revision history and integrity metadata for change detection.", actions: React.createElement(ui_1.Button, { variant: "primary", icon: "upload", onClick: () => setDocumentModal(true) }, "Attach evidence") }),
        React.createElement(Tabs_1.Tabs, { options: tabs, active: activeTab, onChange: setActiveTab }),
        React.createElement("input", { ref: replacementInputRef, className: "visually-hidden", type: "file", onChange: replaceDocumentFile }),
        activeTab === 'documents' ? (React.createElement("div", { className: `evidence-layout ${selectedDocument ? 'has-inspector' : ''}` },
            React.createElement("div", { className: "view-stack" },
                React.createElement("div", { className: "metric-strip metric-strip--compact" },
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Artifacts"),
                        React.createElement("strong", null, project.documents.length),
                        React.createElement("small", null,
                            project.documents.filter((document) => Boolean(document.contentDataUrl)).length,
                            " stored locally")),
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Requirement coverage"),
                        React.createElement("strong", null,
                            evidenceCoverage.percent,
                            "%"),
                        React.createElement("small", null,
                            evidenceCoverage.complete,
                            "/",
                            evidenceCoverage.total,
                            " complete")),
                    React.createElement("div", { className: `metric-card ${project.documents.some((document) => document.status === 'stale') ? 'metric-card--warning' : ''}` },
                        React.createElement("span", null, "Stale"),
                        React.createElement("strong", null, project.documents.filter((document) => document.status === 'stale').length),
                        React.createElement("small", null,
                            evidenceCoverage.stale,
                            " requirement(s) affected")),
                    React.createElement("div", { className: "metric-card" },
                        React.createElement("span", null, "Approved"),
                        React.createElement("strong", null, project.documents.filter((document) => document.approvalState === 'approved').length),
                        React.createElement("small", null, "controlled approvals"))),
                React.createElement(ui_1.Panel, null,
                    React.createElement(ui_1.PanelHeader, { title: "Document and evidence library", description: "Local files, references, web links, notes, data, photographs, drawings, calculations, procedures, and reports.", actions: React.createElement("div", { className: "search-box" },
                            React.createElement(Icon_1.Icon, { name: "search", size: 16 }),
                            React.createElement(ui_1.Input, { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search evidence" })) }),
                    filteredDocuments.length ? React.createElement("div", { className: "table-scroll" },
                        React.createElement("table", { className: "data-table" },
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Artifact"),
                                    React.createElement("th", null, "Type"),
                                    React.createElement("th", null, "Revision"),
                                    React.createElement("th", null, "Status"),
                                    React.createElement("th", null, "Owner"),
                                    React.createElement("th", null, "Date"),
                                    React.createElement("th", null, "File"),
                                    React.createElement("th", null, "Linked"),
                                    React.createElement("th", null))),
                            React.createElement("tbody", null, filteredDocuments.map((document) => React.createElement("tr", { key: document.id, className: selectedDocumentId === document.id ? 'is-selected' : '', onClick: () => setSelectedDocumentId(document.id) },
                                React.createElement("td", null,
                                    React.createElement("span", { className: "record-id" }, document.identifier),
                                    React.createElement("strong", null, document.title),
                                    React.createElement("small", null, (0, text_1.truncate)(document.description, 90))),
                                React.createElement("td", null, document.documentType),
                                React.createElement("td", null,
                                    "r",
                                    document.revision),
                                React.createElement("td", null,
                                    React.createElement(StatusBadge_1.StatusBadge, { value: document.status }),
                                    React.createElement("small", null, (0, text_1.humanize)(document.approvalState))),
                                React.createElement("td", null, document.owner),
                                React.createElement("td", null, (0, dates_1.formatDate)(document.date)),
                                React.createElement("td", null, document.fileName ? React.createElement(React.Fragment, null,
                                    React.createElement("span", null, document.fileName),
                                    React.createElement("small", null, formatBytes(document.fileSize))) : document.webLink ? 'Web link' : 'Record note'),
                                React.createElement("td", null, document.linkedRecordIds.length),
                                React.createElement("td", null,
                                    React.createElement(ui_1.Button, { size: "small", variant: "quiet", icon: "eye", onClick: (event) => { event.stopPropagation(); (0, files_1.downloadEvidence)(document); }, disabled: !document.contentDataUrl && !document.webLink }, "Open"))))))) : React.createElement(ui_1.EmptyState, { icon: "evidence", title: "No evidence matches", description: project.documents.length ? 'Adjust the search or attach another artifact.' : 'Attach the first local file, link, or evidence note.', action: React.createElement(ui_1.Button, { variant: "primary", icon: "upload", onClick: () => setDocumentModal(true) }, "Attach evidence") }))),
            selectedDocument ? React.createElement("aside", { className: "record-inspector evidence-inspector" },
                React.createElement("div", { className: "record-inspector__header" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "record-id" }, selectedDocument.identifier),
                        React.createElement("h2", null, selectedDocument.title),
                        React.createElement("p", null,
                            "Revision ",
                            selectedDocument.revision)),
                    React.createElement(ui_1.Button, { variant: "ghost", size: "small", icon: "close", onClick: () => setSelectedDocumentId(undefined) }, "Close")),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("div", { className: "inspector-status-row" },
                        React.createElement(StatusBadge_1.StatusBadge, { value: selectedDocument.status }),
                        React.createElement(StatusBadge_1.StatusBadge, { value: selectedDocument.approvalState })),
                    React.createElement("p", null, selectedDocument.description || 'No description recorded.')),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("h3", null, "Artifact"),
                    React.createElement("dl", { className: "definition-list definition-list--cards" },
                        React.createElement("div", null,
                            React.createElement("dt", null, "Type"),
                            React.createElement("dd", null, selectedDocument.documentType)),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Author"),
                            React.createElement("dd", null, selectedDocument.author || 'Not recorded')),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Owner"),
                            React.createElement("dd", null, selectedDocument.owner)),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Date"),
                            React.createElement("dd", null, (0, dates_1.formatDate)(selectedDocument.date))),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Source"),
                            React.createElement("dd", null, selectedDocument.source || 'Not recorded')),
                        React.createElement("div", null,
                            React.createElement("dt", null, "File"),
                            React.createElement("dd", null, selectedDocument.fileName ?? selectedDocument.webLink ?? 'Evidence note')),
                        React.createElement("div", null,
                            React.createElement("dt", null, "Size"),
                            React.createElement("dd", null, formatBytes(selectedDocument.fileSize))))),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("h3", null, "Integrity and revision"),
                    selectedDocument.integrityFingerprint ? React.createElement("code", { className: "fingerprint" },
                        "SHA-256 ",
                        selectedDocument.integrityFingerprint) : React.createElement("p", null, "No file fingerprint is required for a reference-only record."),
                    React.createElement("p", { className: "muted" }, "The fingerprint assists with integrity and change detection. It does not certify authenticity or legal validity."),
                    selectedDocument.supersededById ? React.createElement("div", { className: "inline-alert" },
                        React.createElement(Icon_1.Icon, { name: "refresh", size: 15 }),
                        "Superseded by ",
                        project.documents.find((document) => document.id === selectedDocument.supersededById)?.identifier ?? 'a later revision',
                        ".") : null),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("h3", null, "Linked records"),
                    React.createElement("div", { className: "chip-row" },
                        selectedDocument.linkedRecordIds.map((id) => React.createElement("span", { className: "chip", key: id }, recordLabel(project, id))),
                        !selectedDocument.linkedRecordIds.length ? React.createElement("span", { className: "muted" }, "No controlled links.") : null)),
                React.createElement("div", { className: "inspector-section" },
                    React.createElement("h3", null, "History"),
                    React.createElement("div", { className: "history-list" }, selectedDocument.history.map((entry) => React.createElement("div", { key: entry.id },
                        React.createElement("span", null,
                            "r",
                            entry.revision),
                        React.createElement("div", null,
                            React.createElement("strong", null, entry.action),
                            React.createElement("small", null,
                                (0, dates_1.formatDateTime)(entry.at),
                                " \u00B7 ",
                                entry.by),
                            entry.summary ? React.createElement("p", null, entry.summary) : null))))),
                React.createElement("div", { className: "inspector-actions" },
                    React.createElement(ui_1.Button, { icon: "eye", onClick: () => (0, files_1.downloadEvidence)(selectedDocument), disabled: !selectedDocument.contentDataUrl && !selectedDocument.webLink }, "Open artifact"),
                    React.createElement(ui_1.Button, { icon: "refresh", onClick: () => requestReplacement(selectedDocument.id), disabled: uploading }, "Revise file"),
                    React.createElement(ui_1.Button, { variant: "ghost", icon: "warning", onClick: () => updateProject((draft) => { const document = draft.documents.find((record) => record.id === selectedDocument.id); if (document)
                            document.status = document.status === 'stale' ? 'current' : 'stale'; draft.requirements.forEach((requirement) => { if (requirement.evidenceIds.includes(selectedDocument.id))
                            requirement.statuses.evidence = document?.status === 'stale' ? 'stale' : 'complete'; }); }) }, selectedDocument.status === 'stale' ? 'Mark current' : 'Mark stale'))) : null)) : null,
        activeTab === 'gaps' ? (React.createElement("div", { className: "view-stack" },
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Evidence coverage", description: "Requirement closure requires current, linked evidence rather than a manually selected status." }),
                React.createElement("div", { className: "coverage-hero" },
                    React.createElement(Progress_1.ProgressBar, { value: evidenceCoverage.percent, label: `${evidenceCoverage.percent}% of requirements have current evidence`, tone: evidenceCoverage.percent === 100 ? 'success' : 'warning' }),
                    React.createElement("div", null,
                        React.createElement("strong", null, evidenceCoverage.complete),
                        React.createElement("span", null, "complete"),
                        React.createElement("strong", null, evidenceCoverage.total - evidenceCoverage.complete),
                        React.createElement("span", null, "open"),
                        React.createElement("strong", null, evidenceCoverage.stale),
                        React.createElement("span", null, "stale")))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Requirements needing evidence work", description: "Open a requirement in the Requirements section to see its complete dossier and closure conditions." }),
                project.requirements.filter((requirement) => (0, calculations_1.deriveEvidenceState)(project, requirement) !== 'complete').length ? React.createElement("div", { className: "table-scroll" },
                    React.createElement("table", { className: "data-table" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Requirement"),
                                React.createElement("th", null, "Evidence state"),
                                React.createElement("th", null, "Current artifacts"),
                                React.createElement("th", null, "Required evidence"),
                                React.createElement("th", null, "Owner"),
                                React.createElement("th", null, "Due"),
                                React.createElement("th", null, "Next action"))),
                        React.createElement("tbody", null, project.requirements.filter((requirement) => (0, calculations_1.deriveEvidenceState)(project, requirement) !== 'complete').map((requirement) => { const evidence = (0, calculations_1.evidenceForRequirement)(project, requirement); return React.createElement("tr", { key: requirement.id },
                            React.createElement("td", null,
                                React.createElement("span", { className: "record-id" }, requirement.identifier),
                                React.createElement("strong", null, requirement.title)),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveEvidenceState)(project, requirement) })),
                            React.createElement("td", null, evidence.length ? evidence.map((document) => React.createElement("span", { className: "chip", key: document.id },
                                document.identifier,
                                " \u00B7 ",
                                (0, text_1.humanize)(document.status))) : 'None'),
                            React.createElement("td", null, requirement.verificationIntent.requiredEvidence || 'Not defined'),
                            React.createElement("td", null, requirement.owner),
                            React.createElement("td", null, (0, dates_1.formatDate)(requirement.dueDate)),
                            React.createElement("td", null, requirement.nextAction || 'Attach and review evidence.')); })))) : React.createElement(ui_1.EmptyState, { icon: "check", title: "Evidence is complete", description: "Every active requirement has at least one current supporting artifact." })),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Uncontrolled and stale artifacts", description: "Evidence without a controlled relationship and superseded or stale records are visible rather than silently discarded." }),
                React.createElement("div", { className: "exception-grid" },
                    React.createElement("div", null,
                        React.createElement("h3", null, "Unlinked"),
                        project.documents.filter((document) => !document.linkedRecordIds.length).map((document) => React.createElement("button", { className: "exception-row", key: document.id, onClick: () => { setSelectedDocumentId(document.id); setActiveTab('documents'); } },
                            React.createElement(Icon_1.Icon, { name: "link" }),
                            React.createElement("span", null,
                                React.createElement("strong", null,
                                    document.identifier,
                                    " \u00B7 ",
                                    document.title),
                                React.createElement("small", null, "Link this artifact to a controlled record.")),
                            React.createElement(Icon_1.Icon, { name: "chevron-right" }))),
                        !project.documents.some((document) => !document.linkedRecordIds.length) ? React.createElement("p", { className: "muted" }, "No unlinked artifacts.") : null),
                    React.createElement("div", null,
                        React.createElement("h3", null, "Stale or superseded"),
                        project.documents.filter((document) => ['stale', 'superseded'].includes(document.status)).map((document) => React.createElement("button", { className: "exception-row", key: document.id, onClick: () => { setSelectedDocumentId(document.id); setActiveTab('documents'); } },
                            React.createElement(Icon_1.Icon, { name: "warning" }),
                            React.createElement("span", null,
                                React.createElement("strong", null,
                                    document.identifier,
                                    " \u00B7 ",
                                    document.title),
                                React.createElement("small", null,
                                    (0, text_1.humanize)(document.status),
                                    " \u00B7 revision ",
                                    document.revision)),
                            React.createElement(Icon_1.Icon, { name: "chevron-right" }))),
                        !project.documents.some((document) => ['stale', 'superseded'].includes(document.status)) ? React.createElement("p", { className: "muted" }, "No stale artifacts.") : null))))) : null,
        activeTab === 'reports' ? (React.createElement("div", { className: "view-stack" },
            React.createElement("div", { className: "report-grid" }, reportCards.map((report) => React.createElement(ui_1.Panel, { key: report.title, className: "report-card" },
                React.createElement("div", { className: "report-card__icon" },
                    React.createElement(Icon_1.Icon, { name: report.icon, size: 24 })),
                React.createElement("div", null,
                    React.createElement("h2", null, report.title),
                    React.createElement("p", null, report.description)),
                React.createElement("div", { className: "report-card__actions" }, report.actions)))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Requirement dossier", description: "The complete story of one requirement from source through allocation, verification, failure analysis, evidence, readiness, and revision history." }),
                React.createElement("div", { className: "report-builder" },
                    React.createElement(ui_1.Field, { label: "Requirement" },
                        React.createElement(ui_1.Select, { value: dossierRequirementId, onChange: (event) => setDossierRequirementId(event.target.value) }, project.requirements.map((requirement) => React.createElement("option", { key: requirement.id, value: requirement.id },
                            requirement.identifier,
                            " \u00B7 ",
                            requirement.title)))),
                    React.createElement(ui_1.Button, { variant: "primary", icon: "download", disabled: !dossierRequirementId, onClick: () => { const requirement = project.requirements.find((record) => record.id === dossierRequirementId); if (requirement)
                            (0, reports_1.downloadRequirementDossier)(project, requirement); } }, "Generate dossier"))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Verification-level summaries", description: "Export as-run configuration, results, evidence, and deviations at each level of the build-back-up workflow." }),
                React.createElement("div", { className: "report-button-grid" }, ['unit', 'integration', 'subsystem', 'system', 'operational'].map((level) => React.createElement(ui_1.Button, { key: level, icon: "download", onClick: () => exportVerificationLevel(level) },
                    (0, text_1.humanize)(level),
                    " summary")))),
            React.createElement("div", { className: "disclaimer-panel" },
                React.createElement(Icon_1.Icon, { name: "info" }),
                React.createElement("p", null, "Reports are constructed locally from controlled records. They organize evidence but do not automatically certify compliance, safety, verification, validation, or acceptance.")))) : null,
        React.createElement(Modal_1.Modal, { open: documentModal, onClose: () => setDocumentModal(false), title: "Attach supporting evidence", description: "Files remain local by default. Replacing a file later creates another evidence revision instead of overwriting this record.", width: "large", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setDocumentModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", icon: "upload", disabled: uploading, onClick: addDocument }, uploading ? 'Recording…' : 'Record evidence')) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: documentForm.title, onChange: (event) => setDocumentForm({ ...documentForm, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Document type" },
                    React.createElement(ui_1.Input, { value: documentForm.documentType, onChange: (event) => setDocumentForm({ ...documentForm, documentType: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Date" },
                    React.createElement(ui_1.Input, { type: "date", value: documentForm.date, onChange: (event) => setDocumentForm({ ...documentForm, date: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Author" },
                    React.createElement(ui_1.Input, { value: documentForm.author, onChange: (event) => setDocumentForm({ ...documentForm, author: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: documentForm.owner, onChange: (event) => setDocumentForm({ ...documentForm, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Status" },
                    React.createElement(ui_1.Select, { value: documentForm.status, onChange: (event) => setDocumentForm({ ...documentForm, status: event.target.value }) }, ['draft', 'current', 'superseded', 'stale', 'under-review'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Approval" },
                    React.createElement(ui_1.Select, { value: documentForm.approvalState, onChange: (event) => setDocumentForm({ ...documentForm, approvalState: event.target.value }) }, ['not-required', 'draft', 'under-review', 'approved'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Source" },
                    React.createElement(ui_1.Input, { value: documentForm.source, onChange: (event) => setDocumentForm({ ...documentForm, source: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Local file", hint: "Stored in the local project database; a SHA-256 fingerprint is calculated." },
                    React.createElement(ui_1.Input, { type: "file", onChange: (event) => setDocumentForm({ ...documentForm, file: event.target.files?.[0], title: documentForm.title || event.target.files?.[0]?.name || '' }) })),
                React.createElement(ui_1.Field, { label: "Web link" },
                    React.createElement(ui_1.Input, { type: "url", value: documentForm.webLink, placeholder: "https://\u2026", onChange: (event) => setDocumentForm({ ...documentForm, webLink: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Description or evidence note", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: documentForm.description, onChange: (event) => setDocumentForm({ ...documentForm, description: event.target.value }) })),
                React.createElement("div", { className: "field--wide selection-box selection-box--scroll" },
                    React.createElement("strong", null, "Link to controlled records"),
                    Object.entries(linkChoices.reduce((groups, choice) => { var _a; (groups[_a = choice.group] ?? (groups[_a] = [])).push(choice); return groups; }, {})).map(([group, choices]) => React.createElement("div", { className: "selection-group", key: group },
                        React.createElement("h4", null, group),
                        choices.map((choice) => React.createElement(ui_1.Checkbox, { key: choice.id, label: choice.label, checked: documentForm.linkedRecordIds.includes(choice.id), onChange: () => toggleLink(choice.id) })))))))));
}

},
"src/views/ExecutionView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionView = ExecutionView;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const schedule_1 = require("../domain/schedule");
const ProjectContext_1 = require("../hooks/ProjectContext");
const dates_1 = require("../utils/dates");
const id_1 = require("../utils/id");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Modal_1 = require("../components/Modal");
const Progress_1 = require("../components/Progress");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
const workLanes = [
    { id: 'backlog', label: 'Backlog' },
    { id: 'ready', label: 'Ready' },
    { id: 'in-progress', label: 'In progress' },
    { id: 'review', label: 'Review' },
    { id: 'blocked', label: 'Blocked' },
    { id: 'done', label: 'Done' }
];
const blankWork = {
    title: '', description: '', owner: 'Unassigned', status: 'backlog', priority: 'normal',
    plannedStart: (0, dates_1.todayIso)(), plannedFinish: (0, dates_1.addDays)((0, dates_1.todayIso)(), 5), forecastFinish: '', percentComplete: 0,
    milestone: false, blockedReason: '', requirementIds: [], verificationPlanIds: []
};
const blankDependency = { predecessorId: '', successorId: '', type: 'finish-to-start', lagDays: 0 };
const blankProjectBudget = { title: '', category: 'Labor', owner: 'Project Manager', planned: 0, approved: 0, committed: 0, actual: 0, forecast: 0, currency: 'USD', vendor: '', purchaseReference: '', dueDate: '', requirementId: '', workItemId: '' };
const blankTechnicalBudget = { title: '', resourceType: 'Mass', unit: 'kg', aggregationRule: 'sum', totalAvailable: 0, reserve: 0, threshold: 0, target: 0, applicableMode: 'All modes', applicableScenario: 'Nominal' };
const blankAllocation = { budgetId: '', objectId: '', requirementId: '', label: '', allocation: 0, estimate: 0, measuredActual: '', uncertainty: 0, confidence: 50 };
const blankAction = { kind: 'action', title: '', description: '', owner: 'Unassigned', priority: 'normal', dueDate: '', status: 'open', affectedRecordId: '' };
function currency(value, code = 'USD') {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: code, maximumFractionDigits: 0 }).format(value || 0);
}
function timelineBounds(items) {
    const dated = items.flatMap((item) => [item.plannedStart, item.plannedFinish, item.forecastFinish, item.actualStart, item.actualFinish]).filter(Boolean);
    if (!dated.length)
        return { start: (0, dates_1.addDays)((0, dates_1.todayIso)(), -2), finish: (0, dates_1.addDays)((0, dates_1.todayIso)(), 28), totalDays: 30 };
    const times = dated.map((value) => new Date(`${value.slice(0, 10)}T12:00:00`).getTime());
    const start = (0, dates_1.addDays)(new Date(Math.min(...times)).toISOString().slice(0, 10), -2);
    const finish = (0, dates_1.addDays)(new Date(Math.max(...times)).toISOString().slice(0, 10), 4);
    return { start, finish, totalDays: Math.max(1, (0, dates_1.daysBetween)(start, finish) + 1) };
}
function ExecutionView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('kanban');
    const [workModal, setWorkModal] = (0, react_1.useState)(false);
    const [dependencyModal, setDependencyModal] = (0, react_1.useState)(false);
    const [budgetModal, setBudgetModal] = (0, react_1.useState)(false);
    const [technicalModal, setTechnicalModal] = (0, react_1.useState)(false);
    const [allocationModal, setAllocationModal] = (0, react_1.useState)(false);
    const [actionModal, setActionModal] = (0, react_1.useState)(false);
    const [work, setWork] = (0, react_1.useState)(blankWork);
    const [dependency, setDependency] = (0, react_1.useState)(blankDependency);
    const [projectBudget, setProjectBudget] = (0, react_1.useState)(blankProjectBudget);
    const [technicalBudget, setTechnicalBudget] = (0, react_1.useState)(blankTechnicalBudget);
    const [allocation, setAllocation] = (0, react_1.useState)(blankAllocation);
    const [action, setAction] = (0, react_1.useState)(blankAction);
    const [draggedWorkId, setDraggedWorkId] = (0, react_1.useState)();
    const [showCompleted, setShowCompleted] = (0, react_1.useState)(true);
    const tabs = [
        { id: 'kanban', label: 'Kanban', icon: 'kanban', count: project.workItems.filter((item) => !item.archived).length },
        { id: 'gantt', label: 'Gantt', icon: 'calendar' },
        ...(project.settings.mode === 'advanced' ? [
            { id: 'project-budget', label: 'Project budget', icon: 'budget', count: project.projectBudgetLines.length },
            { id: 'technical-budgets', label: 'Technical budgets', icon: 'chart', count: project.technicalBudgets.length }
        ] : []),
        { id: 'actions', label: 'Actions', icon: 'execution', count: project.issuesActions.filter((item) => !['closed', 'resolved'].includes(item.status)).length }
    ];
    (0, react_1.useEffect)(() => {
        if (!tabs.some((tab) => tab.id === activeTab))
            setActiveTab('kanban');
    }, [activeTab, tabs]);
    const activeWork = (0, react_1.useMemo)(() => project.workItems.filter((item) => !item.archived && (showCompleted || item.status !== 'done')), [project.workItems, showCompleted]);
    const schedule = (0, react_1.useMemo)(() => (0, schedule_1.calculateSchedule)(project.workItems, project.workDependencies), [project.workItems, project.workDependencies]);
    const bounds = (0, react_1.useMemo)(() => timelineBounds(activeWork), [activeWork]);
    const budgetSummary = (0, react_1.useMemo)(() => (0, calculations_1.projectBudgetSummary)(project.projectBudgetLines), [project.projectBudgetLines]);
    const toggleWorkRequirement = (id) => setWork((current) => ({ ...current, requirementIds: current.requirementIds.includes(id) ? current.requirementIds.filter((value) => value !== id) : [...current.requirementIds, id] }));
    const toggleWorkPlan = (id) => setWork((current) => ({ ...current, verificationPlanIds: current.verificationPlanIds.includes(id) ? current.verificationPlanIds.filter((value) => value !== id) : [...current.verificationPlanIds, id] }));
    const createWork = () => {
        if (!work.title.trim())
            return notify('Enter a work-item title.', 'warning');
        const start = work.plannedStart || undefined;
        const finish = work.plannedFinish || undefined;
        const record = {
            ...(0, factory_1.controlledRecord)('work', (0, id_1.nextIdentifier)('WORK', project.workItems.map((item) => item.identifier)), work.title.trim(), work.owner.trim() || 'Unassigned', work.status),
            description: work.description.trim(),
            status: work.status,
            priority: work.priority,
            plannedStart: start,
            plannedFinish: finish,
            forecastFinish: work.forecastFinish || finish,
            durationDays: start && finish ? Math.max(1, (0, dates_1.daysBetween)(start, finish) + 1) : 1,
            percentComplete: Math.max(0, Math.min(100, Number(work.percentComplete) || 0)),
            milestone: work.milestone,
            predecessorIds: [],
            successorIds: [],
            baselineStart: start,
            baselineFinish: finish,
            requirementIds: [...work.requirementIds],
            functionIds: [],
            objectIds: [],
            verificationPlanIds: [...work.verificationPlanIds],
            failureModeIds: [],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: work.status === 'blocked' ? work.blockedReason.trim() : '',
            dueDate: finish
        };
        updateProject((draft) => {
            draft.workItems.push(record);
            record.requirementIds.forEach((requirementId) => {
                const requirement = draft.requirements.find((candidate) => candidate.id === requirementId);
                if (requirement && !requirement.workItemIds.includes(record.id))
                    requirement.workItemIds.push(record.id);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'scheduled-by', fromId: requirementId, toId: record.id, rationale: 'Execution work', createdAt: new Date().toISOString(), createdBy: record.owner });
            });
        });
        setWork(blankWork);
        setWorkModal(false);
        notify(`${record.identifier} created.`, 'success');
    };
    const moveWork = (workId, status) => {
        updateProject((draft) => {
            const item = draft.workItems.find((candidate) => candidate.id === workId);
            if (!item)
                return;
            item.status = status;
            item.lifecycleState = status;
            item.updatedAt = new Date().toISOString();
            if (status === 'in-progress' && !item.actualStart)
                item.actualStart = (0, dates_1.todayIso)();
            if (status === 'done') {
                item.percentComplete = 100;
                item.actualFinish = item.actualFinish ?? (0, dates_1.todayIso)();
            }
            else if (item.percentComplete === 100) {
                item.percentComplete = 90;
                item.actualFinish = undefined;
            }
            if (status !== 'blocked')
                item.blockedReason = '';
        });
    };
    const onDropLane = (event, status) => {
        event.preventDefault();
        const id = draggedWorkId || event.dataTransfer.getData('text/plain');
        if (id)
            moveWork(id, status);
        setDraggedWorkId(undefined);
    };
    const createDependency = () => {
        if (!dependency.predecessorId || !dependency.successorId || dependency.predecessorId === dependency.successorId)
            return notify('Select two different work items.', 'warning');
        if (project.workDependencies.some((value) => value.predecessorId === dependency.predecessorId && value.successorId === dependency.successorId))
            return notify('That dependency already exists.', 'warning');
        const record = { id: (0, id_1.createId)('dep'), ...dependency, lagDays: Number(dependency.lagDays) || 0 };
        updateProject((draft) => {
            draft.workDependencies.push(record);
            const predecessor = draft.workItems.find((item) => item.id === record.predecessorId);
            const successor = draft.workItems.find((item) => item.id === record.successorId);
            if (predecessor && !predecessor.successorIds.includes(record.successorId))
                predecessor.successorIds.push(record.successorId);
            if (successor && !successor.predecessorIds.includes(record.predecessorId))
                successor.predecessorIds.push(record.predecessorId);
        });
        setDependency(blankDependency);
        setDependencyModal(false);
        notify('Schedule dependency added.', 'success');
    };
    const createProjectBudgetLine = () => {
        if (!projectBudget.title.trim())
            return notify('Enter a budget-line title.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('cost', (0, id_1.nextIdentifier)('COST', project.projectBudgetLines.map((line) => line.identifier)), projectBudget.title.trim(), projectBudget.owner.trim() || 'Unassigned', 'active'),
            category: projectBudget.category.trim() || 'Other',
            planned: Number(projectBudget.planned) || 0,
            approved: Number(projectBudget.approved) || 0,
            committed: Number(projectBudget.committed) || 0,
            actual: Number(projectBudget.actual) || 0,
            forecast: Number(projectBudget.forecast) || 0,
            currency: projectBudget.currency.trim().toUpperCase() || 'USD',
            vendor: projectBudget.vendor.trim(),
            purchaseReference: projectBudget.purchaseReference.trim(),
            dueDate: projectBudget.dueDate || undefined,
            workItemIds: projectBudget.workItemId ? [projectBudget.workItemId] : [],
            requirementIds: projectBudget.requirementId ? [projectBudget.requirementId] : [],
            objectIds: [],
            verificationPlanIds: [],
            documentIds: []
        };
        updateProject((draft) => {
            draft.projectBudgetLines.push(record);
            record.workItemIds.forEach((id) => {
                const item = draft.workItems.find((candidate) => candidate.id === id);
                if (item && !item.budgetLineIds.includes(record.id))
                    item.budgetLineIds.push(record.id);
            });
            record.requirementIds.forEach((id) => draft.links.push({ id: (0, id_1.createId)('link'), type: 'funded-by', fromId: id, toId: record.id, rationale: record.category, createdAt: new Date().toISOString(), createdBy: record.owner }));
        });
        setProjectBudget(blankProjectBudget);
        setBudgetModal(false);
        notify(`${record.identifier} added to the project delivery budget.`, 'success');
    };
    const createTechnicalBudget = () => {
        if (!technicalBudget.title.trim() || !technicalBudget.unit.trim())
            return notify('Enter a technical budget title and unit.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('tb', (0, id_1.nextIdentifier)('TB', project.technicalBudgets.map((budget) => budget.identifier)), technicalBudget.title.trim(), 'Systems Engineering', 'active'),
            resourceType: technicalBudget.resourceType.trim() || technicalBudget.title.trim(),
            unit: technicalBudget.unit.trim(),
            aggregationRule: technicalBudget.aggregationRule,
            totalAvailable: Number(technicalBudget.totalAvailable) || 0,
            reserve: Number(technicalBudget.reserve) || 0,
            threshold: Number.isFinite(Number(technicalBudget.threshold)) ? Number(technicalBudget.threshold) : undefined,
            target: Number.isFinite(Number(technicalBudget.target)) ? Number(technicalBudget.target) : undefined,
            applicableMode: technicalBudget.applicableMode.trim(),
            applicableScenario: technicalBudget.applicableScenario.trim(),
            customFormula: '',
            allocations: []
        };
        updateProject((draft) => { draft.technicalBudgets.push(record); });
        setTechnicalBudget(blankTechnicalBudget);
        setTechnicalModal(false);
        notify(`${record.identifier} technical budget created.`, 'success');
    };
    const createAllocation = () => {
        const selectedBudget = project.technicalBudgets.find((budget) => budget.id === allocation.budgetId);
        if (!selectedBudget)
            return notify('Select a technical budget.', 'warning');
        if (!allocation.label.trim())
            return notify('Enter an allocation label.', 'warning');
        const record = {
            id: (0, id_1.createId)('alloc'),
            objectId: allocation.objectId || undefined,
            requirementId: allocation.requirementId || undefined,
            label: allocation.label.trim(),
            allocation: Number(allocation.allocation) || 0,
            estimate: Number(allocation.estimate) || 0,
            measuredActual: allocation.measuredActual === '' ? undefined : Number(allocation.measuredActual),
            uncertainty: Number(allocation.uncertainty) || 0,
            confidence: Math.max(0, Math.min(100, Number(allocation.confidence) || 0)),
            evidenceIds: []
        };
        updateProject((draft) => {
            draft.technicalBudgets.find((budget) => budget.id === selectedBudget.id)?.allocations.push(record);
            if (record.requirementId)
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'funded-by', fromId: record.requirementId, toId: selectedBudget.id, rationale: `${record.label} technical allocation`, createdAt: new Date().toISOString(), createdBy: selectedBudget.owner });
        });
        setAllocation(blankAllocation);
        setAllocationModal(false);
        notify('Technical budget allocation added.', 'success');
    };
    const createAction = () => {
        if (!action.title.trim() || !action.description.trim())
            return notify('Enter an action title and description.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('act', (0, id_1.nextIdentifier)(action.kind === 'issue' ? 'ISSUE' : 'ACTION', project.issuesActions.map((item) => item.identifier)), action.title.trim(), action.owner.trim() || 'Unassigned', action.status),
            kind: action.kind,
            description: action.description.trim(),
            priority: action.priority,
            dueDate: action.dueDate || undefined,
            status: action.status,
            blockingRecordIds: [],
            resolution: '',
            evidenceIds: [],
            affectedRecordIds: action.affectedRecordId ? [action.affectedRecordId] : []
        };
        updateProject((draft) => { draft.issuesActions.push(record); });
        setAction(blankAction);
        setActionModal(false);
        notify(`${record.identifier} created.`, 'success');
    };
    return (React.createElement("div", { className: "view-stack" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Build, schedule, and fund", title: "Execution", description: "Kanban and Gantt project the same work records. Financial delivery budgets remain distinct from technical engineering budgets.", actions: React.createElement(ui_1.Button, { variant: "primary", icon: "plus", onClick: () => setWorkModal(true) }, "Add work item") }),
        React.createElement(Tabs_1.Tabs, { options: tabs, active: activeTab, onChange: setActiveTab, trailing: React.createElement(ui_1.Checkbox, { label: "Show completed", checked: showCompleted, onChange: (event) => setShowCompleted(event.target.checked) }) }),
        activeTab === 'kanban' ? (React.createElement("div", { className: "kanban-board", "aria-label": "Execution Kanban board" }, workLanes.map((lane) => {
            const cards = activeWork.filter((item) => item.status === lane.id);
            return (React.createElement("div", { key: lane.id, className: `kanban-lane kanban-lane--${lane.id}`, onDragOver: (event) => event.preventDefault(), onDrop: (event) => onDropLane(event, lane.id) },
                React.createElement("div", { className: "kanban-lane__header" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "status-dot", "data-tone": lane.id }),
                        React.createElement("strong", null, lane.label)),
                    React.createElement("span", null, cards.length)),
                React.createElement("div", { className: "kanban-lane__body" },
                    cards.map((item) => {
                        const linkedRequirements = project.requirements.filter((requirement) => item.requirementIds.includes(requirement.id));
                        return (React.createElement("article", { key: item.id, className: `work-card ${item.priority === 'critical' ? 'work-card--critical' : ''}`, draggable: true, onDragStart: (event) => { setDraggedWorkId(item.id); event.dataTransfer.setData('text/plain', item.id); event.dataTransfer.effectAllowed = 'move'; }, onDragEnd: () => setDraggedWorkId(undefined) },
                            React.createElement("div", { className: "work-card__top" },
                                React.createElement("span", { className: "record-id" }, item.identifier),
                                React.createElement(StatusBadge_1.StatusBadge, { value: item.priority })),
                            React.createElement("h3", null, item.title),
                            item.description ? React.createElement("p", null, (0, text_1.truncate)(item.description, 110)) : null,
                            linkedRequirements.length ? React.createElement("div", { className: "chip-row" }, linkedRequirements.slice(0, 3).map((requirement) => React.createElement("span", { className: "chip", key: requirement.id }, requirement.identifier))) : null,
                            React.createElement(Progress_1.ProgressBar, { value: item.percentComplete, label: `${item.percentComplete}% complete` }),
                            React.createElement("div", { className: "work-card__meta" },
                                React.createElement("span", null, item.owner || 'Unassigned'),
                                React.createElement("span", null, (0, dates_1.formatDate)(item.plannedFinish))),
                            item.blockedReason ? React.createElement("div", { className: "inline-alert inline-alert--danger" },
                                React.createElement(Icon_1.Icon, { name: "warning", size: 15 }),
                                item.blockedReason) : null,
                            React.createElement("div", { className: "work-card__actions" },
                                React.createElement(ui_1.Select, { "aria-label": `Status for ${item.identifier}`, value: item.status, onChange: (event) => moveWork(item.id, event.target.value) }, workLanes.map((option) => React.createElement("option", { key: option.id, value: option.id }, option.label))))));
                    }),
                    !cards.length ? React.createElement("div", { className: "kanban-lane__empty" }, "Drop work here") : null)));
        }))) : null,
        activeTab === 'gantt' ? (React.createElement("div", { className: "view-stack" },
            React.createElement("div", { className: "metric-strip metric-strip--compact" },
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Work items"),
                    React.createElement("strong", null, activeWork.length),
                    React.createElement("small", null,
                        project.workDependencies.length,
                        " dependencies")),
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Critical path"),
                    React.createElement("strong", null, schedule.hasCycle ? 'Cycle' : schedule.criticalPathIds.length),
                    React.createElement("small", null, schedule.hasCycle ? 'Resolve dependency loop' : 'work item(s)')),
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Late"),
                    React.createElement("strong", null, activeWork.filter((item) => item.plannedFinish && item.status !== 'done' && item.plannedFinish < (0, dates_1.todayIso)()).length),
                    React.createElement("small", null, "past planned finish")),
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Complete"),
                    React.createElement("strong", null,
                        activeWork.length ? Math.round(activeWork.reduce((sum, item) => sum + item.percentComplete, 0) / activeWork.length) : 0,
                        "%"),
                    React.createElement("small", null, "mean progress"))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Schedule network", description: "Finish-to-start, start-to-start, finish-to-finish, start-to-finish, lead, and lag are stored as real dependencies.", actions: React.createElement(ui_1.Button, { icon: "link", onClick: () => setDependencyModal(true) }, "Add dependency") }),
                schedule.hasCycle ? React.createElement("div", { className: "inline-alert inline-alert--danger" },
                    React.createElement(Icon_1.Icon, { name: "warning" }),
                    "The schedule contains a dependency cycle. Critical-path calculations are suspended until the loop is removed.") : null,
                activeWork.length ? (React.createElement("div", { className: "gantt-scroll" },
                    React.createElement("div", { className: "gantt", style: { '--gantt-days': bounds.totalDays } },
                        React.createElement("div", { className: "gantt__corner" },
                            React.createElement("strong", null, "Work item"),
                            React.createElement("span", null,
                                (0, dates_1.formatDate)(bounds.start),
                                " \u2013 ",
                                (0, dates_1.formatDate)(bounds.finish))),
                        React.createElement("div", { className: "gantt__calendar" }, Array.from({ length: bounds.totalDays }, (_, index) => {
                            const date = (0, dates_1.addDays)(bounds.start, index);
                            const day = new Date(`${date}T12:00:00`).getDate();
                            const weekday = new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'narrow' });
                            return React.createElement("div", { key: date, className: `gantt__day ${date === (0, dates_1.todayIso)() ? 'is-today' : ''}`, title: (0, dates_1.formatDate)(date) },
                                React.createElement("span", null, weekday),
                                React.createElement("strong", null, day));
                        })),
                        activeWork.map((item) => {
                            const start = item.plannedStart ?? bounds.start;
                            const finish = item.plannedFinish ?? start;
                            const left = (0, dates_1.daysBetween)(bounds.start, start);
                            const width = Math.max(1, (0, dates_1.daysBetween)(start, finish) + 1);
                            const isCritical = schedule.criticalPathIds.includes(item.id);
                            const baselineLeft = item.baselineStart ? (0, dates_1.daysBetween)(bounds.start, item.baselineStart) : left;
                            const baselineWidth = item.baselineStart && item.baselineFinish ? Math.max(1, (0, dates_1.daysBetween)(item.baselineStart, item.baselineFinish) + 1) : width;
                            return (React.createElement("div", { className: "gantt__row", key: item.id },
                                React.createElement("div", { className: "gantt__label" },
                                    React.createElement("div", null,
                                        React.createElement("span", { className: "record-id" }, item.identifier),
                                        isCritical ? React.createElement("span", { className: "critical-mark" }, "Critical") : null),
                                    React.createElement("strong", null, item.title),
                                    React.createElement("div", { className: "gantt__inline-edit" },
                                        React.createElement(ui_1.Input, { type: "date", value: item.plannedStart ?? '', onChange: (event) => updateProject((draft) => { const record = draft.workItems.find((candidate) => candidate.id === item.id); if (record) {
                                                record.plannedStart = event.target.value || undefined;
                                                record.durationDays = record.plannedStart && record.plannedFinish ? Math.max(1, (0, dates_1.daysBetween)(record.plannedStart, record.plannedFinish) + 1) : 1;
                                            } }) }),
                                        React.createElement("span", null, "\u2192"),
                                        React.createElement(ui_1.Input, { type: "date", value: item.plannedFinish ?? '', onChange: (event) => updateProject((draft) => { const record = draft.workItems.find((candidate) => candidate.id === item.id); if (record) {
                                                record.plannedFinish = event.target.value || undefined;
                                                record.dueDate = record.plannedFinish;
                                                record.durationDays = record.plannedStart && record.plannedFinish ? Math.max(1, (0, dates_1.daysBetween)(record.plannedStart, record.plannedFinish) + 1) : 1;
                                            } }) }))),
                                React.createElement("div", { className: "gantt__track" },
                                    React.createElement("div", { className: "gantt__baseline", style: { gridColumn: `${baselineLeft + 1} / span ${baselineWidth}` } }),
                                    React.createElement("div", { className: `gantt__bar ${isCritical ? 'is-critical' : ''} ${item.milestone ? 'is-milestone' : ''}`, style: { gridColumn: `${left + 1} / span ${width}` }, title: `${item.title}: ${(0, dates_1.formatDate)(start)} – ${(0, dates_1.formatDate)(finish)}` }, !item.milestone ? React.createElement(React.Fragment, null,
                                        React.createElement("span", { className: "gantt__bar-progress", style: { width: `${item.percentComplete}%` } }),
                                        React.createElement("span", null,
                                            item.percentComplete,
                                            "%")) : React.createElement(Icon_1.Icon, { name: "baseline", size: 14 })),
                                    schedule.slack[item.id] !== undefined ? React.createElement("span", { className: "gantt__slack", style: { gridColumn: `${Math.min(bounds.totalDays, left + width + 1)} / span 1` }, title: `${schedule.slack[item.id]} day(s) slack` }, schedule.slack[item.id]) : null)));
                        })))) : React.createElement(ui_1.EmptyState, { icon: "calendar", title: "No work is scheduled", description: "Create a work item to begin the execution plan.", action: React.createElement(ui_1.Button, { variant: "primary", icon: "plus", onClick: () => setWorkModal(true) }, "Add work item") })),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Dependencies", description: "The critical path and slack are recalculated from the stored work network." }),
                project.workDependencies.length ? React.createElement("div", { className: "table-scroll" },
                    React.createElement("table", { className: "data-table" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Predecessor"),
                                React.createElement("th", null, "Relationship"),
                                React.createElement("th", null, "Successor"),
                                React.createElement("th", null, "Lag"),
                                React.createElement("th", null))),
                        React.createElement("tbody", null, project.workDependencies.map((record) => {
                            const predecessor = project.workItems.find((item) => item.id === record.predecessorId);
                            const successor = project.workItems.find((item) => item.id === record.successorId);
                            return React.createElement("tr", { key: record.id },
                                React.createElement("td", null,
                                    predecessor?.identifier,
                                    " \u00B7 ",
                                    predecessor?.title),
                                React.createElement("td", null,
                                    React.createElement(StatusBadge_1.StatusBadge, { value: record.type })),
                                React.createElement("td", null,
                                    successor?.identifier,
                                    " \u00B7 ",
                                    successor?.title),
                                React.createElement("td", null,
                                    record.lagDays,
                                    " day(s)"),
                                React.createElement("td", null,
                                    React.createElement(ui_1.Button, { size: "small", variant: "quiet", icon: "trash", onClick: () => updateProject((draft) => { draft.workDependencies = draft.workDependencies.filter((candidate) => candidate.id !== record.id); const pred = draft.workItems.find((item) => item.id === record.predecessorId); const succ = draft.workItems.find((item) => item.id === record.successorId); if (pred)
                                            pred.successorIds = pred.successorIds.filter((id) => id !== record.successorId); if (succ)
                                            succ.predecessorIds = succ.predecessorIds.filter((id) => id !== record.predecessorId); }) }, "Remove")));
                        })))) : React.createElement(ui_1.EmptyState, { icon: "link", title: "No schedule dependencies", description: "Add a dependency to calculate the network and critical path." })))) : null,
        activeTab === 'project-budget' ? (React.createElement("div", { className: "view-stack" },
            React.createElement("div", { className: "metric-strip" },
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Approved"),
                    React.createElement("strong", null, currency(budgetSummary.approved, project.projectBudgetLines[0]?.currency)),
                    React.createElement("small", null, "delivery authority")),
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Committed"),
                    React.createElement("strong", null, currency(budgetSummary.committed, project.projectBudgetLines[0]?.currency)),
                    React.createElement("small", null,
                        budgetSummary.approved ? Math.round((budgetSummary.committed / budgetSummary.approved) * 100) : 0,
                        "% of approved")),
                React.createElement("div", { className: "metric-card" },
                    React.createElement("span", null, "Actual"),
                    React.createElement("strong", null, currency(budgetSummary.actual, project.projectBudgetLines[0]?.currency)),
                    React.createElement("small", null, "recorded spend")),
                React.createElement("div", { className: `metric-card ${budgetSummary.variance < 0 ? 'metric-card--danger' : ''}` },
                    React.createElement("span", null, "Forecast variance"),
                    React.createElement("strong", null, currency(budgetSummary.variance, project.projectBudgetLines[0]?.currency)),
                    React.createElement("small", null, budgetSummary.variance < 0 ? 'forecast over approved' : 'remaining to approved'))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Project delivery budget", description: "Labor, procurement, fabrication, software, equipment, facilities, travel, and other financial resources.", actions: React.createElement(ui_1.Button, { icon: "plus", onClick: () => setBudgetModal(true) }, "Add line") }),
                project.projectBudgetLines.length ? React.createElement("div", { className: "table-scroll" },
                    React.createElement("table", { className: "data-table data-table--numbers" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Line"),
                                React.createElement("th", null, "Category"),
                                React.createElement("th", null, "Owner"),
                                React.createElement("th", null, "Planned"),
                                React.createElement("th", null, "Approved"),
                                React.createElement("th", null, "Committed"),
                                React.createElement("th", null, "Actual"),
                                React.createElement("th", null, "Forecast"),
                                React.createElement("th", null, "Variance"),
                                React.createElement("th", null, "Links"))),
                        React.createElement("tbody", null, project.projectBudgetLines.map((line) => React.createElement("tr", { key: line.id },
                            React.createElement("td", null,
                                React.createElement("span", { className: "record-id" }, line.identifier),
                                React.createElement("strong", null, line.title),
                                line.vendor ? React.createElement("small", null, line.vendor) : null),
                            React.createElement("td", null, line.category),
                            React.createElement("td", null, line.owner),
                            React.createElement("td", null, currency(line.planned, line.currency)),
                            React.createElement("td", null, currency(line.approved, line.currency)),
                            React.createElement("td", null,
                                React.createElement(ui_1.Input, { type: "number", value: line.committed, onChange: (event) => updateProject((draft) => { const record = draft.projectBudgetLines.find((candidate) => candidate.id === line.id); if (record)
                                        record.committed = Number(event.target.value) || 0; }) })),
                            React.createElement("td", null,
                                React.createElement(ui_1.Input, { type: "number", value: line.actual, onChange: (event) => updateProject((draft) => { const record = draft.projectBudgetLines.find((candidate) => candidate.id === line.id); if (record)
                                        record.actual = Number(event.target.value) || 0; }) })),
                            React.createElement("td", null,
                                React.createElement(ui_1.Input, { type: "number", value: line.forecast, onChange: (event) => updateProject((draft) => { const record = draft.projectBudgetLines.find((candidate) => candidate.id === line.id); if (record)
                                        record.forecast = Number(event.target.value) || 0; }) })),
                            React.createElement("td", { className: line.approved - line.forecast < 0 ? 'number-danger' : '' }, currency(line.approved - line.forecast, line.currency)),
                            React.createElement("td", null,
                                React.createElement("span", null,
                                    line.requirementIds.length,
                                    " req"),
                                React.createElement("span", null,
                                    line.workItemIds.length,
                                    " work"))))))) : React.createElement(ui_1.EmptyState, { icon: "budget", title: "No project budget lines", description: "Financial delivery resources are tracked separately from mass, power, latency, and other technical quantities.", action: React.createElement(ui_1.Button, { variant: "primary", onClick: () => setBudgetModal(true) }, "Add budget line") })))) : null,
        activeTab === 'technical-budgets' ? (React.createElement("div", { className: "view-stack" },
            React.createElement("div", { className: "section-toolbar" },
                React.createElement("div", null,
                    React.createElement("strong", null, "Engineering resource budgets"),
                    React.createElement("span", null, "Currency never shares an undifferentiated total with engineering quantities.")),
                React.createElement("div", null,
                    React.createElement(ui_1.Button, { icon: "plus", onClick: () => setTechnicalModal(true) }, "New budget"),
                    React.createElement(ui_1.Button, { variant: "primary", icon: "plus", onClick: () => setAllocationModal(true), disabled: !project.technicalBudgets.length }, "Add allocation"))),
            project.technicalBudgets.length ? React.createElement("div", { className: "budget-grid" }, project.technicalBudgets.map((budget) => {
                const summary = (0, calculations_1.technicalBudgetSummary)(budget);
                const limit = budget.threshold ?? budget.totalAvailable;
                return React.createElement(ui_1.Panel, { key: budget.id, className: summary.margin < 0 ? 'budget-panel budget-panel--over' : 'budget-panel' },
                    React.createElement(ui_1.PanelHeader, { title: budget.title, description: `${budget.resourceType} · ${(0, text_1.humanize)(budget.aggregationRule)} · ${budget.applicableMode}`, actions: React.createElement(StatusBadge_1.StatusBadge, { value: summary.margin < 0 ? 'over-threshold' : summary.utilizationPercent > 85 ? 'watch' : 'within-budget' }) }),
                    React.createElement("div", { className: "budget-gauge" },
                        React.createElement("div", null,
                            React.createElement("strong", null, summary.measured.toFixed(2)),
                            React.createElement("span", null,
                                budget.unit,
                                " used or estimated")),
                        React.createElement("div", null,
                            React.createElement("strong", null, limit.toFixed(2)),
                            React.createElement("span", null,
                                budget.unit,
                                " threshold")),
                        React.createElement("div", null,
                            React.createElement("strong", null, summary.margin.toFixed(2)),
                            React.createElement("span", null,
                                budget.unit,
                                " margin"))),
                    React.createElement(Progress_1.ProgressBar, { value: Math.max(0, Math.min(100, summary.utilizationPercent)), label: `${summary.utilizationPercent}% utilized`, tone: summary.margin < 0 ? 'danger' : summary.utilizationPercent > 85 ? 'warning' : 'success' }),
                    React.createElement("div", { className: "table-scroll" },
                        React.createElement("table", { className: "data-table data-table--compact" },
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Allocation"),
                                    React.createElement("th", null, "Object or requirement"),
                                    React.createElement("th", null, "Allocated"),
                                    React.createElement("th", null, "Estimate"),
                                    React.createElement("th", null, "Measured"),
                                    React.createElement("th", null, "Confidence"))),
                            React.createElement("tbody", null, budget.allocations.map((entry) => React.createElement("tr", { key: entry.id },
                                React.createElement("td", null, entry.label),
                                React.createElement("td", null, project.objects.find((record) => record.id === entry.objectId)?.identifier ?? project.requirements.find((record) => record.id === entry.requirementId)?.identifier ?? 'Unlinked'),
                                React.createElement("td", null,
                                    entry.allocation,
                                    " ",
                                    budget.unit),
                                React.createElement("td", null,
                                    React.createElement(ui_1.Input, { type: "number", value: entry.estimate, onChange: (event) => updateProject((draft) => { const item = draft.technicalBudgets.find((candidate) => candidate.id === budget.id)?.allocations.find((candidate) => candidate.id === entry.id); if (item)
                                            item.estimate = Number(event.target.value) || 0; }) })),
                                React.createElement("td", null,
                                    React.createElement(ui_1.Input, { type: "number", value: entry.measuredActual ?? '', placeholder: "\u2014", onChange: (event) => updateProject((draft) => { const item = draft.technicalBudgets.find((candidate) => candidate.id === budget.id)?.allocations.find((candidate) => candidate.id === entry.id); if (item)
                                            item.measuredActual = event.target.value === '' ? undefined : Number(event.target.value); }) })),
                                React.createElement("td", null,
                                    entry.confidence,
                                    "%")))))),
                    !budget.allocations.length ? React.createElement(ui_1.EmptyState, { icon: "chart", title: "No allocations", description: "Allocate this resource to architecture objects or requirements." }) : null);
            })) : React.createElement(ui_1.EmptyState, { icon: "chart", title: "No technical budgets", description: "Create mass, electrical power, energy, thermal, bandwidth, latency, memory, reliability, or another engineering resource budget.", action: React.createElement(ui_1.Button, { variant: "primary", onClick: () => setTechnicalModal(true) }, "Create technical budget") }))) : null,
        activeTab === 'actions' ? (React.createElement(ui_1.Panel, null,
            React.createElement(ui_1.PanelHeader, { title: "Issues and actions", description: "Small, linkable records for the work that blocks, corrects, or closes the engineering thread.", actions: React.createElement(ui_1.Button, { icon: "plus", onClick: () => setActionModal(true) }, "Add issue or action") }),
            project.issuesActions.length ? React.createElement("div", { className: "table-scroll" },
                React.createElement("table", { className: "data-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Record"),
                            React.createElement("th", null, "Kind"),
                            React.createElement("th", null, "Priority"),
                            React.createElement("th", null, "Owner"),
                            React.createElement("th", null, "Due"),
                            React.createElement("th", null, "Status"),
                            React.createElement("th", null, "Affected record"),
                            React.createElement("th", null, "Resolution"))),
                    React.createElement("tbody", null, project.issuesActions.map((item) => React.createElement("tr", { key: item.id },
                        React.createElement("td", null,
                            React.createElement("span", { className: "record-id" }, item.identifier),
                            React.createElement("strong", null, item.title),
                            React.createElement("small", null, (0, text_1.truncate)(item.description, 100))),
                        React.createElement("td", null,
                            React.createElement(StatusBadge_1.StatusBadge, { value: item.kind })),
                        React.createElement("td", null,
                            React.createElement(StatusBadge_1.StatusBadge, { value: item.priority })),
                        React.createElement("td", null, item.owner),
                        React.createElement("td", null, (0, dates_1.formatDate)(item.dueDate)),
                        React.createElement("td", null,
                            React.createElement(ui_1.Select, { value: item.status, onChange: (event) => updateProject((draft) => { const record = draft.issuesActions.find((candidate) => candidate.id === item.id); if (record) {
                                    record.status = event.target.value;
                                    record.lifecycleState = record.status;
                                } }) }, ['open', 'in-progress', 'blocked', 'resolved', 'closed'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                        React.createElement("td", null, item.affectedRecordIds.map((id) => project.requirements.find((record) => record.id === id)?.identifier ?? project.workItems.find((record) => record.id === id)?.identifier ?? project.failureModes.find((record) => record.id === id)?.identifier ?? id).join(', ') || '—'),
                        React.createElement("td", null,
                            React.createElement(ui_1.Input, { value: item.resolution, placeholder: "Record disposition", onChange: (event) => updateProject((draft) => { const record = draft.issuesActions.find((candidate) => candidate.id === item.id); if (record)
                                    record.resolution = event.target.value; }) }))))))) : React.createElement(ui_1.EmptyState, { icon: "execution", title: "No issues or actions", description: "Use this register for tracked decisions and follow-up without turning requirements into tasks.", action: React.createElement(ui_1.Button, { variant: "primary", onClick: () => setActionModal(true) }, "Add record") }))) : null,
        React.createElement(Modal_1.Modal, { open: workModal, onClose: () => setWorkModal(false), title: "Create work item", description: "A work item describes work needed to define, implement, verify, correct, or close an obligation. It is not a duplicate requirement.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setWorkModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createWork }, "Create work item")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: work.title, onChange: (event) => setWork({ ...work, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: work.owner, onChange: (event) => setWork({ ...work, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Priority" },
                    React.createElement(ui_1.Select, { value: work.priority, onChange: (event) => setWork({ ...work, priority: event.target.value }) }, ['low', 'normal', 'high', 'critical'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Status" },
                    React.createElement(ui_1.Select, { value: work.status, onChange: (event) => setWork({ ...work, status: event.target.value }) }, workLanes.map((lane) => React.createElement("option", { key: lane.id, value: lane.id }, lane.label)))),
                React.createElement(ui_1.Field, { label: "Percent complete" },
                    React.createElement(ui_1.Input, { type: "number", min: "0", max: "100", value: work.percentComplete, onChange: (event) => setWork({ ...work, percentComplete: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Planned start" },
                    React.createElement(ui_1.Input, { type: "date", value: work.plannedStart, onChange: (event) => setWork({ ...work, plannedStart: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Planned finish" },
                    React.createElement(ui_1.Input, { type: "date", value: work.plannedFinish, onChange: (event) => setWork({ ...work, plannedFinish: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Forecast finish" },
                    React.createElement(ui_1.Input, { type: "date", value: work.forecastFinish, onChange: (event) => setWork({ ...work, forecastFinish: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Description", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: work.description, onChange: (event) => setWork({ ...work, description: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Blocked reason", className: "field--wide" },
                    React.createElement(ui_1.Input, { value: work.blockedReason, onChange: (event) => setWork({ ...work, blockedReason: event.target.value }) })),
                React.createElement("div", { className: "field--wide" },
                    React.createElement(ui_1.Checkbox, { label: "Milestone", description: "Display this item as a zero-duration schedule event.", checked: work.milestone, onChange: (event) => setWork({ ...work, milestone: event.target.checked }) })),
                React.createElement("div", { className: "field--wide selection-box" },
                    React.createElement("strong", null, "Linked requirements"),
                    project.requirements.map((requirement) => React.createElement(ui_1.Checkbox, { key: requirement.id, label: `${requirement.identifier} · ${requirement.title}`, checked: work.requirementIds.includes(requirement.id), onChange: () => toggleWorkRequirement(requirement.id) }))),
                React.createElement("div", { className: "field--wide selection-box" },
                    React.createElement("strong", null, "Linked verification plans"),
                    project.verificationPlans.map((plan) => React.createElement(ui_1.Checkbox, { key: plan.id, label: `${plan.identifier} · ${plan.title}`, checked: work.verificationPlanIds.includes(plan.id), onChange: () => toggleWorkPlan(plan.id) }))))),
        React.createElement(Modal_1.Modal, { open: dependencyModal, onClose: () => setDependencyModal(false), title: "Create schedule dependency", description: "The relationship is stored once and used by the Gantt network and critical-path calculation.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setDependencyModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createDependency }, "Add dependency")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Predecessor", required: true },
                    React.createElement(ui_1.Select, { value: dependency.predecessorId, onChange: (event) => setDependency({ ...dependency, predecessorId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select work item"),
                        project.workItems.map((item) => React.createElement("option", { key: item.id, value: item.id },
                            item.identifier,
                            " \u00B7 ",
                            item.title)))),
                React.createElement(ui_1.Field, { label: "Successor", required: true },
                    React.createElement(ui_1.Select, { value: dependency.successorId, onChange: (event) => setDependency({ ...dependency, successorId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select work item"),
                        project.workItems.map((item) => React.createElement("option", { key: item.id, value: item.id },
                            item.identifier,
                            " \u00B7 ",
                            item.title)))),
                React.createElement(ui_1.Field, { label: "Relationship" },
                    React.createElement(ui_1.Select, { value: dependency.type, onChange: (event) => setDependency({ ...dependency, type: event.target.value }) }, ['finish-to-start', 'start-to-start', 'finish-to-finish', 'start-to-finish'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Lag days", hint: "Use a negative value for lead." },
                    React.createElement(ui_1.Input, { type: "number", value: dependency.lagDays, onChange: (event) => setDependency({ ...dependency, lagDays: Number(event.target.value) }) })))),
        React.createElement(Modal_1.Modal, { open: budgetModal, onClose: () => setBudgetModal(false), title: "Add project delivery budget line", description: "Track money and labor here. Engineering quantities belong in Technical Budgets.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setBudgetModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createProjectBudgetLine }, "Add budget line")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: projectBudget.title, onChange: (event) => setProjectBudget({ ...projectBudget, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Category" },
                    React.createElement(ui_1.Input, { value: projectBudget.category, onChange: (event) => setProjectBudget({ ...projectBudget, category: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: projectBudget.owner, onChange: (event) => setProjectBudget({ ...projectBudget, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Currency" },
                    React.createElement(ui_1.Input, { value: projectBudget.currency, maxLength: 3, onChange: (event) => setProjectBudget({ ...projectBudget, currency: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Planned" },
                    React.createElement(ui_1.Input, { type: "number", value: projectBudget.planned, onChange: (event) => setProjectBudget({ ...projectBudget, planned: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Approved" },
                    React.createElement(ui_1.Input, { type: "number", value: projectBudget.approved, onChange: (event) => setProjectBudget({ ...projectBudget, approved: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Committed" },
                    React.createElement(ui_1.Input, { type: "number", value: projectBudget.committed, onChange: (event) => setProjectBudget({ ...projectBudget, committed: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Actual" },
                    React.createElement(ui_1.Input, { type: "number", value: projectBudget.actual, onChange: (event) => setProjectBudget({ ...projectBudget, actual: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Forecast" },
                    React.createElement(ui_1.Input, { type: "number", value: projectBudget.forecast, onChange: (event) => setProjectBudget({ ...projectBudget, forecast: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Due date" },
                    React.createElement(ui_1.Input, { type: "date", value: projectBudget.dueDate, onChange: (event) => setProjectBudget({ ...projectBudget, dueDate: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Vendor" },
                    React.createElement(ui_1.Input, { value: projectBudget.vendor, onChange: (event) => setProjectBudget({ ...projectBudget, vendor: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Purchase reference" },
                    React.createElement(ui_1.Input, { value: projectBudget.purchaseReference, onChange: (event) => setProjectBudget({ ...projectBudget, purchaseReference: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Linked requirement" },
                    React.createElement(ui_1.Select, { value: projectBudget.requirementId, onChange: (event) => setProjectBudget({ ...projectBudget, requirementId: event.target.value }) },
                        React.createElement("option", { value: "" }, "No requirement"),
                        project.requirements.map((requirement) => React.createElement("option", { key: requirement.id, value: requirement.id },
                            requirement.identifier,
                            " \u00B7 ",
                            requirement.title)))),
                React.createElement(ui_1.Field, { label: "Linked work item" },
                    React.createElement(ui_1.Select, { value: projectBudget.workItemId, onChange: (event) => setProjectBudget({ ...projectBudget, workItemId: event.target.value }) },
                        React.createElement("option", { value: "" }, "No work item"),
                        project.workItems.map((item) => React.createElement("option", { key: item.id, value: item.id },
                            item.identifier,
                            " \u00B7 ",
                            item.title)))))),
        React.createElement(Modal_1.Modal, { open: technicalModal, onClose: () => setTechnicalModal(false), title: "Create technical engineering budget", description: "Mass, power, energy, thermal, bandwidth, latency, memory, reliability, and other nonfinancial resources.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setTechnicalModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createTechnicalBudget }, "Create budget")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: technicalBudget.title, onChange: (event) => setTechnicalBudget({ ...technicalBudget, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Resource type" },
                    React.createElement(ui_1.Input, { value: technicalBudget.resourceType, onChange: (event) => setTechnicalBudget({ ...technicalBudget, resourceType: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Unit", required: true },
                    React.createElement(ui_1.Input, { value: technicalBudget.unit, onChange: (event) => setTechnicalBudget({ ...technicalBudget, unit: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Aggregation rule" },
                    React.createElement(ui_1.Select, { value: technicalBudget.aggregationRule, onChange: (event) => setTechnicalBudget({ ...technicalBudget, aggregationRule: event.target.value }) }, ['sum', 'maximum', 'minimum', 'weighted-sum', 'percentage', 'custom-formula'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Total available" },
                    React.createElement(ui_1.Input, { type: "number", value: technicalBudget.totalAvailable, onChange: (event) => setTechnicalBudget({ ...technicalBudget, totalAvailable: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Reserve" },
                    React.createElement(ui_1.Input, { type: "number", value: technicalBudget.reserve, onChange: (event) => setTechnicalBudget({ ...technicalBudget, reserve: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Threshold" },
                    React.createElement(ui_1.Input, { type: "number", value: technicalBudget.threshold, onChange: (event) => setTechnicalBudget({ ...technicalBudget, threshold: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Target" },
                    React.createElement(ui_1.Input, { type: "number", value: technicalBudget.target, onChange: (event) => setTechnicalBudget({ ...technicalBudget, target: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Applicable mode" },
                    React.createElement(ui_1.Input, { value: technicalBudget.applicableMode, onChange: (event) => setTechnicalBudget({ ...technicalBudget, applicableMode: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Scenario" },
                    React.createElement(ui_1.Input, { value: technicalBudget.applicableScenario, onChange: (event) => setTechnicalBudget({ ...technicalBudget, applicableScenario: event.target.value }) })))),
        React.createElement(Modal_1.Modal, { open: allocationModal, onClose: () => setAllocationModal(false), title: "Add technical budget allocation", description: "Allocate the resource to an architecture object or requirement, then record estimate, measured actual, uncertainty, and confidence.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setAllocationModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createAllocation }, "Add allocation")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Technical budget", required: true, className: "field--wide" },
                    React.createElement(ui_1.Select, { value: allocation.budgetId, onChange: (event) => setAllocation({ ...allocation, budgetId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select budget"),
                        project.technicalBudgets.map((budget) => React.createElement("option", { key: budget.id, value: budget.id },
                            budget.identifier,
                            " \u00B7 ",
                            budget.title)))),
                React.createElement(ui_1.Field, { label: "Allocation label", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { value: allocation.label, onChange: (event) => setAllocation({ ...allocation, label: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Architecture object" },
                    React.createElement(ui_1.Select, { value: allocation.objectId, onChange: (event) => setAllocation({ ...allocation, objectId: event.target.value, requirementId: '' }) },
                        React.createElement("option", { value: "" }, "No object"),
                        project.objects.map((object) => React.createElement("option", { key: object.id, value: object.id },
                            object.identifier,
                            " \u00B7 ",
                            object.name)))),
                React.createElement(ui_1.Field, { label: "Requirement" },
                    React.createElement(ui_1.Select, { value: allocation.requirementId, onChange: (event) => setAllocation({ ...allocation, requirementId: event.target.value, objectId: '' }) },
                        React.createElement("option", { value: "" }, "No requirement"),
                        project.requirements.map((requirement) => React.createElement("option", { key: requirement.id, value: requirement.id },
                            requirement.identifier,
                            " \u00B7 ",
                            requirement.title)))),
                React.createElement(ui_1.Field, { label: "Allocated" },
                    React.createElement(ui_1.Input, { type: "number", value: allocation.allocation, onChange: (event) => setAllocation({ ...allocation, allocation: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Current estimate" },
                    React.createElement(ui_1.Input, { type: "number", value: allocation.estimate, onChange: (event) => setAllocation({ ...allocation, estimate: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Measured actual" },
                    React.createElement(ui_1.Input, { type: "number", value: allocation.measuredActual, onChange: (event) => setAllocation({ ...allocation, measuredActual: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Uncertainty" },
                    React.createElement(ui_1.Input, { type: "number", value: allocation.uncertainty, onChange: (event) => setAllocation({ ...allocation, uncertainty: Number(event.target.value) }) })),
                React.createElement(ui_1.Field, { label: "Confidence (0\u2013100)" },
                    React.createElement(ui_1.Input, { type: "number", min: "0", max: "100", value: allocation.confidence, onChange: (event) => setAllocation({ ...allocation, confidence: Number(event.target.value) }) })))),
        React.createElement(Modal_1.Modal, { open: actionModal, onClose: () => setActionModal(false), title: "Add issue or action", description: "Link the record to the controlled item it affects.", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setActionModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: createAction }, "Create record")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Kind" },
                    React.createElement(ui_1.Select, { value: action.kind, onChange: (event) => setAction({ ...action, kind: event.target.value }) },
                        React.createElement("option", { value: "issue" }, "Issue"),
                        React.createElement("option", { value: "action" }, "Action"))),
                React.createElement(ui_1.Field, { label: "Priority" },
                    React.createElement(ui_1.Select, { value: action.priority, onChange: (event) => setAction({ ...action, priority: event.target.value }) }, ['low', 'normal', 'high', 'critical'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: action.title, onChange: (event) => setAction({ ...action, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Description", required: true, className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 4, value: action.description, onChange: (event) => setAction({ ...action, description: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: action.owner, onChange: (event) => setAction({ ...action, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Due date" },
                    React.createElement(ui_1.Input, { type: "date", value: action.dueDate, onChange: (event) => setAction({ ...action, dueDate: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Affected requirement" },
                    React.createElement(ui_1.Select, { value: action.affectedRecordId, onChange: (event) => setAction({ ...action, affectedRecordId: event.target.value }) },
                        React.createElement("option", { value: "" }, "No linked requirement"),
                        project.requirements.map((requirement) => React.createElement("option", { key: requirement.id, value: requirement.id },
                            requirement.identifier,
                            " \u00B7 ",
                            requirement.title))))))));
}

},
"src/views/FailureAnalysisView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureAnalysisView = FailureAnalysisView;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const ProjectContext_1 = require("../hooks/ProjectContext");
const id_1 = require("../utils/id");
const dates_1 = require("../utils/dates");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Modal_1 = require("../components/Modal");
const Progress_1 = require("../components/Progress");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
const blankFailure = {
    title: '', sourceType: 'requirement', sourceId: '', operatingMode: 'All modes', failureMode: '', cause: '', localEffect: '', nextHigherEffect: '', endEffect: '', detectionMethod: '', preventionControl: '', detectionControl: '', severity: '5', likelihood: '3', detectability: '3', hazard: '', mitigation: '', owner: 'Unassigned', dueDate: '', createWork: true
};
function FailureAnalysisView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('register');
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const [failure, setFailure] = (0, react_1.useState)(blankFailure);
    const [search, setSearch] = (0, react_1.useState)('');
    const [criticalityFilter, setCriticalityFilter] = (0, react_1.useState)('all');
    const [mitigationFilter, setMitigationFilter] = (0, react_1.useState)('all');
    const filtered = (0, react_1.useMemo)(() => {
        const query = search.trim().toLowerCase();
        return project.failureModes.filter((record) => {
            if (criticalityFilter !== 'all' && record.criticalityCategory !== criticalityFilter)
                return false;
            if (mitigationFilter !== 'all' && record.mitigationStatus !== mitigationFilter)
                return false;
            if (!query)
                return true;
            return [record.identifier, record.title, record.failureMode, record.cause, record.endEffect, record.recommendedMitigation, record.actionOwner].some((value) => value.toLowerCase().includes(query));
        });
    }, [project.failureModes, search, criticalityFilter, mitigationFilter]);
    const metrics = (0, react_1.useMemo)(() => ({
        total: project.failureModes.length,
        high: project.failureModes.filter((record) => ['high', 'critical'].includes(record.criticalityCategory)).length,
        open: project.failureModes.filter((record) => !['verified', 'accepted'].includes(record.mitigationStatus)).length,
        overdue: project.failureModes.filter((record) => record.dueDate && record.dueDate < new Date().toISOString().slice(0, 10) && !['verified', 'accepted'].includes(record.mitigationStatus)).length
    }), [project.failureModes]);
    const sourceOptions = (0, react_1.useMemo)(() => {
        switch (failure.sourceType) {
            case 'requirement': return project.requirements.map((record) => ({ id: record.id, label: `${record.identifier} · ${record.title}` }));
            case 'function': return project.functions.map((record) => ({ id: record.id, label: `${record.identifier} · ${record.name}` }));
            case 'object': return project.objects.map((record) => ({ id: record.id, label: `${record.identifier} · ${record.name}` }));
            case 'interface': return project.interfaces.map((record) => ({ id: record.id, label: `${record.identifier} · ${record.title}` }));
            case 'test-failure': return project.testExecutions.filter((record) => record.result === 'failed').map((record) => ({ id: record.id, label: `${record.identifier} · ${record.title}` }));
            default: return [];
        }
    }, [failure.sourceType, project]);
    const addFailure = () => {
        if (!failure.failureMode.trim())
            return notify('Describe the failure mode.', 'warning');
        const severity = Math.max(1, Math.min(10, Number(failure.severity) || 1));
        const likelihood = Math.max(1, Math.min(10, Number(failure.likelihood) || 1));
        const detectability = Math.max(1, Math.min(10, Number(failure.detectability) || 1));
        const record = {
            ...(0, factory_1.controlledRecord)('fm', (0, id_1.nextIdentifier)('FMECA', project.failureModes.map((value) => value.identifier)), failure.title.trim() || failure.failureMode.trim(), failure.owner || 'Unassigned', 'draft'),
            sourceType: failure.sourceType,
            sourceId: failure.sourceId || undefined,
            operatingMode: failure.operatingMode.trim(),
            failureMode: failure.failureMode.trim(),
            cause: failure.cause.trim(),
            localEffect: failure.localEffect.trim(),
            nextHigherEffect: failure.nextHigherEffect.trim(),
            endEffect: failure.endEffect.trim(),
            detectionMethod: failure.detectionMethod.trim(),
            preventionControl: failure.preventionControl.trim(),
            detectionControl: failure.detectionControl.trim(),
            severity,
            likelihood,
            detectability,
            criticalityCategory: (0, calculations_1.criticalityCategory)(severity * likelihood * detectability),
            hazardRelationship: failure.hazard.trim(),
            requirementIds: failure.sourceType === 'requirement' && failure.sourceId ? [failure.sourceId] : [],
            interfaceIds: failure.sourceType === 'interface' && failure.sourceId ? [failure.sourceId] : [],
            verificationPlanIds: [],
            recommendedMitigation: failure.mitigation.trim(),
            actionOwner: failure.owner || 'Unassigned',
            dueDate: failure.dueDate || undefined,
            mitigationStatus: failure.mitigation.trim() ? 'planned' : 'open',
            residualSeverity: severity,
            residualLikelihood: likelihood,
            residualCriticalityCategory: (0, calculations_1.criticalityCategory)(severity * likelihood),
            evidenceIds: [],
            reviewStatus: 'draft'
        };
        let workItem;
        if (failure.createWork && failure.mitigation.trim()) {
            workItem = {
                ...(0, factory_1.controlledRecord)('work', (0, id_1.nextIdentifier)('WORK', project.workItems.map((value) => value.identifier)), `Mitigate ${record.identifier}: ${record.failureMode}`, record.actionOwner, 'planned'),
                description: record.recommendedMitigation,
                status: 'backlog',
                priority: ['critical', 'high'].includes(record.criticalityCategory) ? 'critical' : 'high',
                plannedStart: undefined,
                plannedFinish: failure.dueDate || undefined,
                forecastFinish: failure.dueDate || undefined,
                durationDays: 1,
                percentComplete: 0,
                milestone: false,
                predecessorIds: [],
                successorIds: [],
                baselineStart: undefined,
                baselineFinish: undefined,
                requirementIds: [...record.requirementIds],
                functionIds: failure.sourceType === 'function' && failure.sourceId ? [failure.sourceId] : [],
                objectIds: failure.sourceType === 'object' && failure.sourceId ? [failure.sourceId] : [],
                verificationPlanIds: [],
                failureModeIds: [record.id],
                documentIds: [],
                budgetLineIds: [],
                blockedReason: '',
                dueDate: failure.dueDate || undefined
            };
        }
        updateProject((draft) => {
            draft.failureModes.push(record);
            if (record.sourceType === 'requirement' && record.sourceId) {
                const requirement = draft.requirements.find((value) => value.id === record.sourceId);
                if (requirement && !requirement.failureModeIds.includes(record.id))
                    requirement.failureModeIds.push(record.id);
            }
            else if (record.sourceType === 'function' && record.sourceId) {
                const functionRecord = draft.functions.find((value) => value.id === record.sourceId);
                if (functionRecord && !functionRecord.failureModeIds.includes(record.id))
                    functionRecord.failureModeIds.push(record.id);
            }
            if (workItem) {
                draft.workItems.push(workItem);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'mitigated-by', fromId: record.id, toId: workItem.id, rationale: record.recommendedMitigation, createdAt: new Date().toISOString(), createdBy: record.actionOwner });
            }
        });
        setFailure(blankFailure);
        setModalOpen(false);
        notify(`${record.identifier} created${workItem ? ' with a mitigation work item' : ''}.`, 'success');
    };
    const createMitigationWork = (record) => {
        if (project.workItems.some((item) => item.failureModeIds.includes(record.id)))
            return notify('A connected mitigation work item already exists.', 'info');
        const workItem = {
            ...(0, factory_1.controlledRecord)('work', (0, id_1.nextIdentifier)('WORK', project.workItems.map((value) => value.identifier)), `Mitigate ${record.identifier}: ${record.failureMode}`, record.actionOwner, 'planned'),
            description: record.recommendedMitigation || 'Define and implement mitigation.',
            status: 'backlog',
            priority: ['critical', 'high'].includes(record.criticalityCategory) ? 'critical' : 'high',
            plannedStart: undefined,
            plannedFinish: record.dueDate,
            forecastFinish: record.dueDate,
            durationDays: 1,
            percentComplete: 0,
            milestone: false,
            predecessorIds: [],
            successorIds: [],
            baselineStart: undefined,
            baselineFinish: undefined,
            requirementIds: [...record.requirementIds],
            functionIds: record.sourceType === 'function' && record.sourceId ? [record.sourceId] : [],
            objectIds: record.sourceType === 'object' && record.sourceId ? [record.sourceId] : [],
            verificationPlanIds: [...record.verificationPlanIds],
            failureModeIds: [record.id],
            documentIds: [],
            budgetLineIds: [],
            blockedReason: '',
            dueDate: record.dueDate
        };
        updateProject((draft) => {
            draft.workItems.push(workItem);
            draft.links.push({ id: (0, id_1.createId)('link'), type: 'mitigated-by', fromId: record.id, toId: workItem.id, rationale: record.recommendedMitigation, createdAt: new Date().toISOString(), createdBy: record.actionOwner });
        });
        notify(`${workItem.identifier} created.`, 'success');
    };
    const matrix = Array.from({ length: 5 }, (_, severityBand) => Array.from({ length: 5 }, (_, likelihoodBand) => {
        const minSeverity = severityBand * 2 + 1;
        const minLikelihood = likelihoodBand * 2 + 1;
        return project.failureModes.filter((record) => record.severity >= minSeverity && record.severity <= minSeverity + 1 && record.likelihood >= minLikelihood && record.likelihood <= minLikelihood + 1);
    }));
    return (React.createElement("div", { className: "view-stack failure-view" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Failure analysis", title: "Failure Modes, Effects, and Criticality Analysis (FMECA)", description: "Begin with a lightweight failure hypothesis, then trace effects, controls, mitigations, verification, schedule, budget, and residual concern.", actions: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setModalOpen(true) }, "New failure mode") }),
        React.createElement("div", { className: "metric-grid metric-grid--compact" },
            React.createElement("div", { className: "summary-metric" },
                React.createElement("span", null, "Total failure modes"),
                React.createElement("strong", null, metrics.total)),
            React.createElement("div", { className: "summary-metric summary-metric--danger" },
                React.createElement("span", null, "High or critical"),
                React.createElement("strong", null, metrics.high)),
            React.createElement("div", { className: "summary-metric summary-metric--watch" },
                React.createElement("span", null, "Mitigations open"),
                React.createElement("strong", null, metrics.open)),
            React.createElement("div", { className: "summary-metric summary-metric--danger" },
                React.createElement("span", null, "Overdue actions"),
                React.createElement("strong", null, metrics.overdue))),
        React.createElement(Tabs_1.Tabs, { options: [{ id: 'register', label: 'Register', icon: 'table', count: filtered.length }, { id: 'matrix', label: 'Criticality matrix', icon: 'chart' }, { id: 'mitigations', label: 'Mitigations', icon: 'verification' }], active: activeTab, onChange: setActiveTab }),
        activeTab === 'register' ? React.createElement(React.Fragment, null,
            React.createElement("div", { className: "toolbar" },
                React.createElement("div", { className: "search-field" },
                    React.createElement(Icon_1.Icon, { name: "search", size: 17 }),
                    React.createElement(ui_1.Input, { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search failure mode, cause, effect, mitigation, or owner\u2026" })),
                React.createElement(ui_1.Select, { value: criticalityFilter, onChange: (event) => setCriticalityFilter(event.target.value) },
                    React.createElement("option", { value: "all" }, "All criticality"),
                    ['low', 'moderate', 'high', 'critical'].map((value) => React.createElement("option", { key: value }, (0, text_1.humanize)(value)))),
                React.createElement(ui_1.Select, { value: mitigationFilter, onChange: (event) => setMitigationFilter(event.target.value) },
                    React.createElement("option", { value: "all" }, "All mitigation states"),
                    ['open', 'planned', 'implemented', 'verified', 'accepted'].map((value) => React.createElement("option", { key: value }, (0, text_1.humanize)(value))))),
            React.createElement(ui_1.Panel, { className: "panel--flush" }, filtered.length ? React.createElement("div", { className: "data-table-wrap" },
                React.createElement("table", { className: "data-table fmeca-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Failure mode"),
                            React.createElement("th", null, "Source"),
                            React.createElement("th", null, "Cause and effects"),
                            React.createElement("th", null, "Severity"),
                            React.createElement("th", null, "Likelihood"),
                            React.createElement("th", null, "Detectability"),
                            React.createElement("th", null, "Risk Priority Number (RPN)"),
                            React.createElement("th", null, "Criticality"),
                            React.createElement("th", null, "Mitigation"),
                            React.createElement("th", null, "Owner / due"),
                            React.createElement("th", null, "Status"),
                            React.createElement("th", null))),
                    React.createElement("tbody", null, filtered.map((record) => {
                        const source = project.requirements.find((value) => value.id === record.sourceId) ?? project.functions.find((value) => value.id === record.sourceId) ?? project.objects.find((value) => value.id === record.sourceId) ?? project.interfaces.find((value) => value.id === record.sourceId) ?? project.testExecutions.find((value) => value.id === record.sourceId);
                        return React.createElement("tr", { key: record.id },
                            React.createElement("td", null,
                                React.createElement("strong", null,
                                    record.identifier,
                                    " \u00B7 ",
                                    record.failureMode),
                                React.createElement("small", null, record.operatingMode)),
                            React.createElement("td", null,
                                React.createElement("span", { className: "plain-tag" }, (0, text_1.humanize)(record.sourceType)),
                                React.createElement("small", null, source?.identifier ?? 'Unlinked')),
                            React.createElement("td", null,
                                React.createElement("strong", null, record.cause || 'Cause not recorded'),
                                React.createElement("small", null, (0, text_1.truncate)(record.endEffect || record.localEffect || 'Effect not recorded', 110))),
                            React.createElement("td", null, record.severity),
                            React.createElement("td", null, record.likelihood),
                            React.createElement("td", null, record.detectability),
                            React.createElement("td", null,
                                React.createElement("strong", null, (0, calculations_1.criticalityScore)(record))),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: record.criticalityCategory })),
                            React.createElement("td", null, (0, text_1.truncate)(record.recommendedMitigation || 'Not defined', 120)),
                            React.createElement("td", null,
                                record.actionOwner,
                                React.createElement("small", null, (0, dates_1.formatDate)(record.dueDate))),
                            React.createElement("td", null,
                                React.createElement(ui_1.Select, { value: record.mitigationStatus, onChange: (event) => updateProject((draft) => { const failureRecord = draft.failureModes.find((value) => value.id === record.id); if (failureRecord)
                                        failureRecord.mitigationStatus = event.target.value; }) }, ['open', 'planned', 'implemented', 'verified', 'accepted'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                            React.createElement("td", null,
                                React.createElement(ui_1.Button, { size: "small", onClick: () => createMitigationWork(record) }, "Create action")));
                    })))) : React.createElement(ui_1.EmptyState, { icon: "failure", title: "No failure modes match this view", description: "Create a failure hypothesis from a requirement, function, object, interface, test failure, or field observation.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setModalOpen(true) }, "New failure mode") }))) : null,
        activeTab === 'matrix' ? React.createElement("div", { className: "criticality-workspace" },
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Severity and likelihood matrix", description: "Counts are grouped into two-point bands. Open a cell to filter the register conceptually; numerical RPN is shown only as one supporting score." }),
                React.createElement("div", { className: "criticality-matrix" },
                    React.createElement("div", { className: "criticality-matrix__corner" },
                        "Severity \u2191",
                        React.createElement("br", null),
                        "Likelihood \u2192"),
                    [1, 3, 5, 7, 9].map((value) => React.createElement("div", { key: `x-${value}`, className: "criticality-matrix__axis" },
                        value,
                        "\u2013",
                        value + 1)),
                    [9, 7, 5, 3, 1].map((severityStart) => React.createElement("div", { className: "criticality-matrix__row", key: severityStart },
                        React.createElement("div", { className: "criticality-matrix__axis" },
                            severityStart,
                            "\u2013",
                            severityStart + 1),
                        [1, 3, 5, 7, 9].map((likelihoodStart) => { const cell = matrix[(severityStart - 1) / 2][(likelihoodStart - 1) / 2]; const score = (severityStart + 1) * (likelihoodStart + 1) * 5; const category = (0, calculations_1.criticalityCategory)(score); return React.createElement("div", { className: `criticality-cell criticality-cell--${category}`, key: likelihoodStart },
                            React.createElement("strong", null, cell.length),
                            React.createElement("span", null, (0, text_1.humanize)(category)),
                            cell.slice(0, 2).map((record) => React.createElement("small", { key: record.id }, record.identifier))); }))))),
            React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.PanelHeader, { title: "Scoring interpretation", description: "No single score is universally authoritative." }),
                React.createElement("div", { className: "scoring-notes" },
                    React.createElement("div", null,
                        React.createElement("strong", null, "Severity and likelihood"),
                        React.createElement("p", null, "Use the matrix for consequence and probability discussions.")),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Severity, occurrence, and detection"),
                        React.createElement("p", null, "LOOM calculates an RPN for comparison, not as automatic approval authority.")),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Criticality category"),
                        React.createElement("p", null, "Configurable organizational categories should govern escalation.")),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Residual concern"),
                        React.createElement("p", null, "Mitigation is not complete until implementation and verification are visible."))))) : null,
        activeTab === 'mitigations' ? React.createElement("div", { className: "mitigation-grid" }, project.failureModes.map((record) => {
            const linkedWork = project.workItems.filter((item) => item.failureModeIds.includes(record.id));
            const linkedEvidence = project.documents.filter((document) => record.evidenceIds.includes(document.id));
            const percent = record.mitigationStatus === 'verified' || record.mitigationStatus === 'accepted' ? 100 : record.mitigationStatus === 'implemented' ? 75 : record.mitigationStatus === 'planned' ? 35 : 10;
            return React.createElement(ui_1.Panel, { key: record.id },
                React.createElement("div", { className: "mitigation-card__header" },
                    React.createElement("div", null,
                        React.createElement("span", null, record.identifier),
                        React.createElement("h3", null, record.failureMode)),
                    React.createElement(StatusBadge_1.StatusBadge, { value: record.criticalityCategory })),
                React.createElement("p", null, record.recommendedMitigation || 'Mitigation not yet defined.'),
                React.createElement(Progress_1.ProgressBar, { value: percent, label: (0, text_1.humanize)(record.mitigationStatus) }),
                React.createElement("div", { className: "record-facts" },
                    React.createElement("div", null,
                        React.createElement("span", null, "Owner"),
                        React.createElement("strong", null, record.actionOwner)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Due"),
                        React.createElement("strong", null, (0, dates_1.formatDate)(record.dueDate))),
                    React.createElement("div", null,
                        React.createElement("span", null, "Work items"),
                        React.createElement("strong", null, linkedWork.length)),
                    React.createElement("div", null,
                        React.createElement("span", null, "Evidence"),
                        React.createElement("strong", null, linkedEvidence.length))),
                React.createElement("div", { className: "mitigation-card__footer" },
                    React.createElement("span", null,
                        "Residual: ",
                        React.createElement(StatusBadge_1.StatusBadge, { value: record.residualCriticalityCategory, compact: true })),
                    linkedWork.length ? React.createElement("span", null, linkedWork.map((item) => `${item.identifier} ${(0, text_1.humanize)(item.status)}`).join(', ')) : React.createElement(ui_1.Button, { size: "small", onClick: () => createMitigationWork(record) }, "Create action")));
        })) : null,
        React.createElement(Modal_1.Modal, { open: modalOpen, onClose: () => setModalOpen(false), title: "Create failure-mode record", description: "Capture a useful first hypothesis now; refine scoring, effects, and controls during review.", width: "wide", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setModalOpen(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addFailure }, "Create failure mode")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Short title", className: "field--wide" },
                    React.createElement(ui_1.Input, { value: failure.title, onChange: (event) => setFailure({ ...failure, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Analysis source" },
                    React.createElement(ui_1.Select, { value: failure.sourceType, onChange: (event) => setFailure({ ...failure, sourceType: event.target.value, sourceId: '' }) }, ['requirement', 'function', 'object', 'interface', 'operating-mode', 'test-failure', 'field-observation'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                sourceOptions.length ? React.createElement(ui_1.Field, { label: "Source record" },
                    React.createElement(ui_1.Select, { value: failure.sourceId, onChange: (event) => setFailure({ ...failure, sourceId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select record"),
                        sourceOptions.map((value) => React.createElement("option", { key: value.id, value: value.id }, value.label)))) : null,
                React.createElement(ui_1.Field, { label: "Operating mode" },
                    React.createElement(ui_1.Input, { value: failure.operatingMode, onChange: (event) => setFailure({ ...failure, operatingMode: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Failure mode", required: true, className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: failure.failureMode, onChange: (event) => setFailure({ ...failure, failureMode: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Potential cause", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: failure.cause, onChange: (event) => setFailure({ ...failure, cause: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Local effect" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: failure.localEffect, onChange: (event) => setFailure({ ...failure, localEffect: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Next-higher-level effect" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: failure.nextHigherEffect, onChange: (event) => setFailure({ ...failure, nextHigherEffect: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "End effect", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: failure.endEffect, onChange: (event) => setFailure({ ...failure, endEffect: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Detection method" },
                    React.createElement(ui_1.Input, { value: failure.detectionMethod, onChange: (event) => setFailure({ ...failure, detectionMethod: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Prevention control" },
                    React.createElement(ui_1.Input, { value: failure.preventionControl, onChange: (event) => setFailure({ ...failure, preventionControl: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Detection control" },
                    React.createElement(ui_1.Input, { value: failure.detectionControl, onChange: (event) => setFailure({ ...failure, detectionControl: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Hazard relationship" },
                    React.createElement(ui_1.Input, { value: failure.hazard, onChange: (event) => setFailure({ ...failure, hazard: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Severity (1\u201310)" },
                    React.createElement(ui_1.Input, { type: "number", min: "1", max: "10", value: failure.severity, onChange: (event) => setFailure({ ...failure, severity: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Likelihood (1\u201310)" },
                    React.createElement(ui_1.Input, { type: "number", min: "1", max: "10", value: failure.likelihood, onChange: (event) => setFailure({ ...failure, likelihood: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Detectability (1\u201310)" },
                    React.createElement(ui_1.Input, { type: "number", min: "1", max: "10", value: failure.detectability, onChange: (event) => setFailure({ ...failure, detectability: event.target.value }) })),
                React.createElement("div", { className: "score-preview" },
                    React.createElement("span", null, "RPN"),
                    React.createElement("strong", null, (Number(failure.severity) || 1) * (Number(failure.likelihood) || 1) * (Number(failure.detectability) || 1)),
                    React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.criticalityCategory)((Number(failure.severity) || 1) * (Number(failure.likelihood) || 1) * (Number(failure.detectability) || 1)) })),
                React.createElement(ui_1.Field, { label: "Recommended mitigation", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: failure.mitigation, onChange: (event) => setFailure({ ...failure, mitigation: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Action owner" },
                    React.createElement(ui_1.Input, { value: failure.owner, onChange: (event) => setFailure({ ...failure, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Due date" },
                    React.createElement(ui_1.Input, { type: "date", value: failure.dueDate, onChange: (event) => setFailure({ ...failure, dueDate: event.target.value }) })),
                React.createElement("div", { className: "field--wide" },
                    React.createElement(ui_1.Checkbox, { label: "Create a connected mitigation work item", checked: failure.createWork, onChange: (event) => setFailure({ ...failure, createWork: event.target.checked }), description: "The work item uses the same schedule records shown in Kanban and Gantt." }))))));
}

},
"src/views/RequirementsView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementsView = RequirementsView;
const react_1 = require("react");
const calculations_1 = require("../domain/calculations");
const factory_1 = require("../domain/factory");
const ProjectContext_1 = require("../hooks/ProjectContext");
const files_1 = require("../services/files");
const dates_1 = require("../utils/dates");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Progress_1 = require("../components/Progress");
const RequirementCoupon_1 = require("../components/RequirementCoupon");
const RequirementInspector_1 = require("../components/RequirementInspector");
const RequirementWizard_1 = require("../components/RequirementWizard");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
function MiniTrend({ values }) {
    if (!values.length)
        return React.createElement("span", { className: "mini-trend mini-trend--empty" }, "No trend");
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const range = maximum - minimum || 1;
    const points = values.map((value, index) => `${(index / Math.max(1, values.length - 1)) * 100},${30 - ((value - minimum) / range) * 24}`).join(' ');
    return React.createElement("svg", { className: "mini-trend", viewBox: "0 0 100 32", preserveAspectRatio: "none", "aria-label": `Trend values: ${values.join(', ')}` },
        React.createElement("polyline", { points: points }));
}
function SortHeader({ label, field, sortKey, sortDirection, onSort }) {
    return React.createElement("button", { className: "sort-header", onClick: () => onSort(field) },
        label,
        sortKey === field ? React.createElement(Icon_1.Icon, { name: sortDirection === 'asc' ? 'arrow-up' : 'arrow-down', size: 13 }) : null);
}
function RequirementsView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)(project.settings.mode === 'easy' ? 'coupons' : 'list');
    const [wizardOpen, setWizardOpen] = (0, react_1.useState)(false);
    const [selectedId, setSelectedId] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)('');
    const [typeFilter, setTypeFilter] = (0, react_1.useState)('all');
    const [verificationFilter, setVerificationFilter] = (0, react_1.useState)('all');
    const [showArchived, setShowArchived] = (0, react_1.useState)(false);
    const [selectedRows, setSelectedRows] = (0, react_1.useState)(new Set());
    const [sortKey, setSortKey] = (0, react_1.useState)('identifier');
    const [sortDirection, setSortDirection] = (0, react_1.useState)('asc');
    const filtered = (0, react_1.useMemo)(() => {
        const query = search.trim().toLowerCase();
        const rows = project.requirements.filter((requirement) => {
            if (!showArchived && requirement.archived)
                return false;
            if (typeFilter !== 'all' && requirement.requirementType !== typeFilter)
                return false;
            if (verificationFilter !== 'all' && (0, calculations_1.deriveVerificationState)(project, requirement) !== verificationFilter)
                return false;
            if (!query)
                return true;
            return [requirement.identifier, requirement.title, requirement.statement, requirement.owner, requirement.source, requirement.tags.join(' ')].some((value) => value.toLowerCase().includes(query));
        });
        return rows.sort((a, b) => {
            const left = sortKey === 'verification' ? (0, calculations_1.deriveVerificationState)(project, a) : sortKey === 'evidence' ? (0, calculations_1.deriveEvidenceState)(project, a) : sortKey === 'allocation' ? (0, calculations_1.deriveAllocationState)(a) : String(a[sortKey] ?? '');
            const right = sortKey === 'verification' ? (0, calculations_1.deriveVerificationState)(project, b) : sortKey === 'evidence' ? (0, calculations_1.deriveEvidenceState)(project, b) : sortKey === 'allocation' ? (0, calculations_1.deriveAllocationState)(b) : String(b[sortKey] ?? '');
            return left.localeCompare(right, undefined, { numeric: true }) * (sortDirection === 'asc' ? 1 : -1);
        });
    }, [project, search, typeFilter, verificationFilter, showArchived, sortKey, sortDirection]);
    const parentRows = (0, react_1.useMemo)(() => filtered.filter((record) => !record.parentId || !project.requirements.some((candidate) => candidate.id === record.parentId)), [filtered, project.requirements]);
    const measurable = (0, react_1.useMemo)(() => filtered.filter((record) => record.metric), [filtered]);
    const tabs = [
        { id: 'list', label: 'List', icon: 'table', count: filtered.length },
        { id: 'tree', label: 'Tree', icon: 'tree' },
        { id: 'coupons', label: 'Coupons', icon: 'cards' },
        { id: 'performance', label: 'Performance', icon: 'chart', count: measurable.length },
        ...(project.settings.mode === 'advanced' ? [{ id: 'traceability', label: 'Traceability', icon: 'graph' }] : [])
    ];
    (0, react_1.useEffect)(() => {
        if (!tabs.some((tab) => tab.id === activeTab))
            setActiveTab(tabs[0].id);
    }, [activeTab, tabs]);
    const sort = (field) => {
        if (sortKey === field)
            setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
        else {
            setSortKey(field);
            setSortDirection('asc');
        }
    };
    const toggleRow = (id) => setSelectedRows((current) => {
        const next = new Set(current);
        if (next.has(id))
            next.delete(id);
        else
            next.add(id);
        return next;
    });
    const bulkSetReview = () => {
        updateProject((draft) => {
            draft.requirements.forEach((requirement) => {
                if (!selectedRows.has(requirement.id))
                    return;
                requirement.statuses.definition = 'under-review';
                requirement.revision += 1;
                requirement.updatedAt = new Date().toISOString();
                requirement.history.push((0, factory_1.historyEntry)('Bulk status update', requirement.revision, 'Definition state changed to under review.'));
            });
        });
        notify(`${selectedRows.size} requirement(s) moved to under review.`, 'success');
        setSelectedRows(new Set());
    };
    const bulkArchive = () => {
        updateProject((draft) => {
            draft.requirements.forEach((requirement) => {
                if (!selectedRows.has(requirement.id))
                    return;
                requirement.archived = true;
                requirement.statuses.definition = 'retired';
                requirement.revision += 1;
                requirement.updatedAt = new Date().toISOString();
                requirement.history.push((0, factory_1.historyEntry)('Requirement archived', requirement.revision, 'Archived by bulk action.'));
            });
        });
        notify(`${selectedRows.size} requirement(s) archived.`, 'success');
        setSelectedRows(new Set());
    };
    const exportRequirements = () => (0, files_1.exportCsv)(`${(0, files_1.slug)(project.name)}-requirements.csv`, project.requirements.map((requirement) => ({
        identifier: requirement.identifier,
        title: requirement.title,
        statement: requirement.statement,
        source: requirement.source,
        source_location: requirement.sourceLocation,
        stakeholder: requirement.stakeholder,
        rationale: requirement.rationale,
        type: requirement.requirementType,
        priority: requirement.priority,
        owner: requirement.owner,
        reviewer: requirement.reviewer,
        parent_identifier: project.requirements.find((record) => record.id === requirement.parentId)?.identifier ?? '',
        system_level: requirement.applicableSystemLevel,
        metric: requirement.metric?.metric ?? '',
        unit: requirement.metric?.unit ?? '',
        threshold: requirement.metric?.threshold ?? '',
        target: requirement.metric?.target ?? '',
        current: requirement.metric?.measuredValue ?? requirement.metric?.currentEstimate ?? '',
        verification_method: requirement.verificationIntent.method,
        verification_status: (0, calculations_1.deriveVerificationState)(project, requirement),
        evidence_status: (0, calculations_1.deriveEvidenceState)(project, requirement),
        next_action: requirement.nextAction,
        due_date: requirement.dueDate ?? '',
        revision: requirement.revision
    })));
    const renderTree = (record, depth = 0) => {
        const children = filtered.filter((candidate) => candidate.parentId === record.id);
        return React.createElement("div", { key: record.id, className: "requirement-tree__branch" },
            React.createElement("button", { className: "requirement-tree__row", style: { '--tree-depth': depth }, onClick: () => setSelectedId(record.id) },
                React.createElement("span", { className: "requirement-tree__connector", "aria-hidden": "true" }),
                React.createElement("span", { className: "requirement-tree__id" }, record.identifier),
                React.createElement("span", { className: "requirement-tree__title" },
                    React.createElement("strong", null, record.title),
                    React.createElement("small", null, (0, text_1.truncate)(record.statement, 115))),
                React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveAllocationState)(record), compact: true }),
                React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveVerificationState)(project, record), compact: true })),
            children.map((child) => renderTree(child, depth + 1)));
    };
    return (React.createElement("div", { className: `requirements-layout ${selectedId ? 'has-inspector' : ''}` },
        React.createElement("div", { className: "view-stack requirements-view" },
            React.createElement(ui_1.SectionHeader, { eyebrow: "Requirements", title: "Authoritative requirements and coupons", description: "A requirement remains one controlled record across the hierarchy, Kanban board, schedule, verification queue, evidence library, and baselines.", actions: React.createElement(React.Fragment, null,
                    React.createElement(ui_1.Button, { icon: "download", onClick: exportRequirements }, "Comma-Separated Values (CSV)"),
                    React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setWizardOpen(true) }, "New requirement")) }),
            project.settings.mode === 'easy' ? React.createElement("div", { className: "guidance-strip" },
                React.createElement(Icon_1.Icon, { name: "easy" }),
                React.createElement("div", null,
                    React.createElement("strong", null, "Easy Mode follows one requirement at a time."),
                    React.createElement("span", null, "Open a coupon to see its next action, missing information, verification closure, and evidence."))) : null,
            React.createElement("div", { className: "toolbar" },
                React.createElement("div", { className: "search-field" },
                    React.createElement(Icon_1.Icon, { name: "search", size: 17 }),
                    React.createElement(ui_1.Input, { "aria-label": "Search requirements", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search identifier, text, owner, source, or tag\u2026" })),
                React.createElement(ui_1.Select, { "aria-label": "Filter by requirement type", value: typeFilter, onChange: (event) => setTypeFilter(event.target.value) },
                    React.createElement("option", { value: "all" }, "All types"),
                    [...new Set(project.requirements.map((record) => record.requirementType))].sort().map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value)))),
                React.createElement(ui_1.Select, { "aria-label": "Filter by verification state", value: verificationFilter, onChange: (event) => setVerificationFilter(event.target.value) },
                    React.createElement("option", { value: "all" }, "All verification states"),
                    ['unplanned', 'planned', 'ready', 'running', 'passed', 'failed', 'blocked', 'waived'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value)))),
                React.createElement(ui_1.Checkbox, { label: "Show archived", checked: showArchived, onChange: (event) => setShowArchived(event.target.checked) })),
            selectedRows.size ? React.createElement("div", { className: "bulk-toolbar" },
                React.createElement("strong", null,
                    selectedRows.size,
                    " selected"),
                React.createElement(ui_1.Button, { size: "small", onClick: bulkSetReview }, "Set under review"),
                React.createElement(ui_1.Button, { size: "small", variant: "danger", onClick: bulkArchive }, "Archive"),
                React.createElement(ui_1.Button, { size: "small", variant: "ghost", onClick: () => setSelectedRows(new Set()) }, "Clear selection")) : null,
            React.createElement(Tabs_1.Tabs, { options: tabs, active: activeTab, onChange: setActiveTab, trailing: React.createElement("span", { className: "results-count" },
                    filtered.length,
                    " of ",
                    project.requirements.length) }),
            activeTab === 'list' ? React.createElement(ui_1.Panel, { className: "panel--flush" }, filtered.length ? React.createElement("div", { className: "data-table-wrap" },
                React.createElement("table", { className: "data-table requirements-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "checkbox-cell" },
                                React.createElement("input", { type: "checkbox", "aria-label": "Select all visible requirements", checked: filtered.length > 0 && filtered.every((record) => selectedRows.has(record.id)), onChange: (event) => setSelectedRows(event.target.checked ? new Set(filtered.map((record) => record.id)) : new Set()) })),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Identifier", field: "identifier", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Requirement", field: "title", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })),
                            React.createElement("th", null, "Type"),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Owner", field: "owner", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Allocation", field: "allocation", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Verification", field: "verification", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Evidence", field: "evidence", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })),
                            React.createElement("th", null, "Completeness"),
                            React.createElement("th", null,
                                React.createElement(SortHeader, { label: "Due", field: "dueDate", sortKey: sortKey, sortDirection: sortDirection, onSort: sort })))),
                    React.createElement("tbody", null, filtered.map((requirement) => {
                        const completeness = (0, calculations_1.calculateRequirementCompleteness)(requirement);
                        return React.createElement("tr", { key: requirement.id, className: selectedId === requirement.id ? 'is-selected' : '', onClick: () => setSelectedId(requirement.id) },
                            React.createElement("td", { className: "checkbox-cell", onClick: (event) => event.stopPropagation() },
                                React.createElement("input", { type: "checkbox", "aria-label": `Select ${requirement.identifier}`, checked: selectedRows.has(requirement.id), onChange: () => toggleRow(requirement.id) })),
                            React.createElement("td", null,
                                React.createElement("strong", null, requirement.identifier),
                                React.createElement("small", null,
                                    "R",
                                    requirement.revision)),
                            React.createElement("td", null,
                                React.createElement("strong", null, requirement.title),
                                React.createElement("small", null, (0, text_1.truncate)(requirement.statement, 100))),
                            React.createElement("td", null,
                                React.createElement("span", { className: "plain-tag" }, (0, text_1.humanize)(requirement.requirementType))),
                            React.createElement("td", null, requirement.owner),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveAllocationState)(requirement), compact: true })),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveVerificationState)(project, requirement), compact: true })),
                            React.createElement("td", null,
                                React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveEvidenceState)(project, requirement), compact: true })),
                            React.createElement("td", null,
                                React.createElement(Progress_1.ProgressBar, { value: completeness.percent, showValue: true, size: "small" })),
                            React.createElement("td", null, (0, dates_1.formatDate)(requirement.dueDate)));
                    })))) : React.createElement(ui_1.EmptyState, { icon: "requirements", title: "No requirements match this view", description: "Clear the filters or create a new authoritative requirement record.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setWizardOpen(true) }, "New requirement") })) : null,
            activeTab === 'tree' ? React.createElement(ui_1.Panel, { className: "panel--flush" },
                React.createElement("div", { className: "requirement-tree" }, parentRows.length ? parentRows.map((record) => renderTree(record)) : React.createElement(ui_1.EmptyState, { icon: "tree", title: "No requirement hierarchy", description: "Create a requirement or clear the current filters." }))) : null,
            activeTab === 'coupons' ? React.createElement("div", { className: "coupon-grid" }, filtered.length ? filtered.map((requirement) => React.createElement(RequirementCoupon_1.RequirementCoupon, { key: requirement.id, project: project, requirement: requirement, onOpen: (record) => setSelectedId(record.id) })) : React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.EmptyState, { icon: "cards", title: "No requirement coupons", description: "Create a requirement or clear the current filters.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setWizardOpen(true) }, "New requirement") }))) : null,
            activeTab === 'performance' ? React.createElement("div", { className: "performance-grid" }, measurable.length ? measurable.map((requirement) => {
                const metric = requirement.metric;
                const current = metric.measuredValue ?? metric.currentEstimate;
                const max = Math.max(metric.threshold ?? 0, metric.target ?? 0, current ?? 0, 1) * 1.2;
                const margin = (0, calculations_1.calculateMetricMargin)(metric);
                return React.createElement("button", { className: "performance-card", key: requirement.id, onClick: () => setSelectedId(requirement.id) },
                    React.createElement("div", { className: "performance-card__header" },
                        React.createElement("span", null, requirement.identifier),
                        React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveVerificationState)(project, requirement), compact: true })),
                    React.createElement("h3", null, requirement.title),
                    React.createElement("p", null, metric.metric),
                    React.createElement("div", { className: "performance-card__values" },
                        React.createElement("div", null,
                            React.createElement("span", null, "Threshold"),
                            React.createElement("strong", null,
                                metric.threshold ?? '—',
                                " ",
                                metric.unit)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Target"),
                            React.createElement("strong", null,
                                metric.target ?? '—',
                                " ",
                                metric.unit)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Current"),
                            React.createElement("strong", null,
                                current ?? '—',
                                " ",
                                metric.unit)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Margin"),
                            React.createElement("strong", null,
                                margin?.toFixed(2) ?? '—',
                                " ",
                                metric.unit))),
                    React.createElement(Progress_1.ThresholdBar, { maximum: max, threshold: metric.threshold, target: metric.target, current: current, unit: metric.unit }),
                    React.createElement(MiniTrend, { values: metric.trend.map((point) => point.value) }),
                    React.createElement("div", { className: "performance-card__footer" },
                        React.createElement("span", null,
                            metric.confidence,
                            "% confidence"),
                        React.createElement("span", null, metric.evidenceDate ? `Evidence ${(0, dates_1.formatDate)(metric.evidenceDate)}` : 'Evidence date missing')));
            }) : React.createElement(ui_1.Panel, null,
                React.createElement(ui_1.EmptyState, { icon: "chart", title: "No Technical Performance Measures", description: "Add a structured metric, threshold, or target to a requirement." }))) : null,
            activeTab === 'traceability' ? React.createElement(ui_1.Panel, { className: "panel--flush" },
                React.createElement("div", { className: "matrix-scroll" },
                    React.createElement("table", { className: "traceability-matrix" },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Requirement"),
                                project.functions.map((record) => React.createElement("th", { key: record.id, title: record.name }, record.identifier)),
                                React.createElement("th", null, "Objects"),
                                React.createElement("th", null, "Verification"),
                                React.createElement("th", null, "Evidence"))),
                        React.createElement("tbody", null, filtered.map((requirement) => React.createElement("tr", { key: requirement.id, onClick: () => setSelectedId(requirement.id) },
                            React.createElement("th", null,
                                React.createElement("strong", null, requirement.identifier),
                                React.createElement("span", null, requirement.title)),
                            project.functions.map((record) => React.createElement("td", { key: record.id, className: requirement.functionIds.includes(record.id) ? 'has-link' : '' }, requirement.functionIds.includes(record.id) ? '●' : '·')),
                            React.createElement("td", null, requirement.objectIds.length),
                            React.createElement("td", null, requirement.verificationPlanIds.length),
                            React.createElement("td", null, requirement.evidenceIds.length))))))) : null),
        selectedId ? React.createElement(RequirementInspector_1.RequirementInspector, { requirementId: selectedId, onClose: () => setSelectedId(undefined) }) : null,
        React.createElement(RequirementWizard_1.RequirementWizard, { open: wizardOpen, onClose: () => setWizardOpen(false), onCreated: setSelectedId })));
}

},
"src/views/VerificationView.tsx": function (module, exports, require) {
'use strict';
const React = require('react');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationView = VerificationView;
const react_1 = require("react");
const factory_1 = require("../domain/factory");
const calculations_1 = require("../domain/calculations");
const ProjectContext_1 = require("../hooks/ProjectContext");
const id_1 = require("../utils/id");
const dates_1 = require("../utils/dates");
const text_1 = require("../utils/text");
const Icon_1 = require("../components/Icon");
const Modal_1 = require("../components/Modal");
const Progress_1 = require("../components/Progress");
const StatusBadge_1 = require("../components/StatusBadge");
const Tabs_1 = require("../components/Tabs");
const ui_1 = require("../components/ui");
const blankPlan = {
    title: '', requirementIds: [], method: 'test', level: 'system', objective: '', criteria: '', preconditions: '', configuration: '', environment: '', equipment: '', instrumentation: '', personnel: '', safety: '', procedure: '', data: '', sampleSize: '', passFail: '', owner: 'Verification Lead', reviewer: '', plannedDate: '', approval: 'draft'
};
const blankExecution = {
    planId: '', testCaseId: '', result: 'not-run', executedAt: new Date().toISOString().slice(0, 16), operator: '', reviewer: '', systemConfiguration: '', hardwareRevision: '', softwareVersion: '', firmwareVersion: '', environment: '', equipment: '', calibrationReference: '', inputData: '', outputData: '', observations: '', deviations: '', evidenceIds: []
};
function VerificationView() {
    const { project, updateProject, notify } = (0, ProjectContext_1.useProject)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('plans');
    const [planModal, setPlanModal] = (0, react_1.useState)(false);
    const [executionModal, setExecutionModal] = (0, react_1.useState)(false);
    const [testCaseModal, setTestCaseModal] = (0, react_1.useState)(false);
    const [plan, setPlan] = (0, react_1.useState)(blankPlan);
    const [execution, setExecution] = (0, react_1.useState)(blankExecution);
    const [testCase, setTestCase] = (0, react_1.useState)({ title: '', planId: '', setup: '', steps: [{ id: (0, id_1.createId)('step'), instruction: '', expectedResult: '' }] });
    const [expandedReadiness, setExpandedReadiness] = (0, react_1.useState)();
    const tabs = [
        { id: 'plans', label: 'Plans', icon: 'document', count: project.verificationPlans.length },
        ...(project.settings.mode === 'advanced' ? [{ id: 'cases', label: 'Test cases', icon: 'table', count: project.testCases.length }] : []),
        { id: 'executions', label: 'Executions', icon: 'play', count: project.testExecutions.length },
        { id: 'results', label: 'Results', icon: 'verification' },
        { id: 'readiness', label: 'Readiness', icon: 'cockpit' }
    ];
    (0, react_1.useEffect)(() => {
        if (!tabs.some((tab) => tab.id === activeTab))
            setActiveTab('plans');
    }, [activeTab, tabs]);
    const coverage = (0, react_1.useMemo)(() => {
        const total = project.requirements.length;
        const planned = project.requirements.filter((requirement) => project.verificationPlans.some((plan) => plan.requirementIds.includes(requirement.id))).length;
        const passed = project.requirements.filter((requirement) => (0, calculations_1.deriveVerificationState)(project, requirement) === 'passed').length;
        return { total, planned, passed, plannedPercent: total ? Math.round((planned / total) * 100) : 0, passedPercent: total ? Math.round((passed / total) * 100) : 0 };
    }, [project]);
    const togglePlanRequirement = (id) => setPlan((current) => ({ ...current, requirementIds: current.requirementIds.includes(id) ? current.requirementIds.filter((value) => value !== id) : [...current.requirementIds, id] }));
    const toggleExecutionEvidence = (id) => setExecution((current) => ({ ...current, evidenceIds: current.evidenceIds.includes(id) ? current.evidenceIds.filter((value) => value !== id) : [...current.evidenceIds, id] }));
    const openExecution = (planId) => {
        setExecution({ ...blankExecution, planId: planId ?? '' });
        setExecutionModal(true);
    };
    const addPlan = () => {
        if (!plan.title.trim() || !plan.requirementIds.length)
            return notify('Enter a plan title and select at least one requirement.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('ver', (0, id_1.nextIdentifier)('VER', project.verificationPlans.map((value) => value.identifier)), plan.title.trim(), plan.owner || 'Unassigned', plan.approval),
            requirementIds: [...plan.requirementIds],
            verificationMethod: plan.method,
            verificationLevel: plan.level,
            objective: plan.objective.trim(),
            acceptanceCriteria: plan.criteria.trim(),
            preconditions: plan.preconditions.trim(),
            configuration: plan.configuration.trim(),
            environment: plan.environment.trim(),
            equipment: plan.equipment.trim(),
            instrumentation: plan.instrumentation.trim(),
            personnel: plan.personnel.trim(),
            safetyConsiderations: plan.safety.trim(),
            procedure: plan.procedure.trim(),
            dataToCollect: plan.data.trim(),
            sampleSize: plan.sampleSize.trim(),
            passFailLogic: plan.passFail.trim() || plan.criteria.trim(),
            reviewer: plan.reviewer.trim(),
            plannedDate: plan.plannedDate || undefined,
            dependencyIds: [],
            documentIds: [],
            approvalState: plan.approval,
            testCaseIds: []
        };
        updateProject((draft) => {
            draft.verificationPlans.push(record);
            record.requirementIds.forEach((requirementId) => {
                const requirement = draft.requirements.find((value) => value.id === requirementId);
                if (!requirement)
                    return;
                if (!requirement.verificationPlanIds.includes(record.id))
                    requirement.verificationPlanIds.push(record.id);
                requirement.verificationIntent.method = record.verificationMethod;
                requirement.verificationIntent.level = record.verificationLevel;
                requirement.verificationIntent.acceptanceCriteria = record.acceptanceCriteria;
                requirement.statuses.verification = record.approvalState === 'approved' ? 'ready' : 'planned';
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'verified-by', fromId: requirementId, toId: record.id, rationale: '', createdAt: new Date().toISOString(), createdBy: record.owner });
            });
        });
        setPlan(blankPlan);
        setPlanModal(false);
        notify(`${record.identifier} created.`, 'success');
    };
    const addExecution = () => {
        const selectedPlan = project.verificationPlans.find((value) => value.id === execution.planId);
        if (!selectedPlan)
            return notify('Select a verification plan.', 'warning');
        if (!execution.operator.trim())
            return notify('Record the operator for the as-run condition.', 'warning');
        const runCount = project.testExecutions.filter((value) => value.verificationPlanId === selectedPlan.id).length;
        const record = {
            ...(0, factory_1.controlledRecord)('run', (0, id_1.nextIdentifier)('RUN', project.testExecutions.map((value) => value.identifier)), `${selectedPlan.title} — Run ${runCount + 1}`, execution.operator, 'complete'),
            verificationPlanId: selectedPlan.id,
            testCaseId: execution.testCaseId || undefined,
            requirementIds: [...selectedPlan.requirementIds],
            executionNumber: runCount + 1,
            executedAt: new Date(execution.executedAt || new Date().toISOString()).toISOString(),
            operator: execution.operator.trim(),
            reviewer: execution.reviewer.trim(),
            systemConfiguration: execution.systemConfiguration.trim(),
            hardwareRevision: execution.hardwareRevision.trim(),
            softwareVersion: execution.softwareVersion.trim(),
            firmwareVersion: execution.firmwareVersion.trim(),
            environment: execution.environment.trim(),
            equipment: execution.equipment.trim(),
            calibrationReference: execution.calibrationReference.trim(),
            inputData: execution.inputData.trim(),
            outputData: execution.outputData.trim(),
            observations: execution.observations.trim(),
            deviations: execution.deviations.trim(),
            result: execution.result,
            evidenceIds: [...execution.evidenceIds]
        };
        updateProject((draft) => {
            draft.testExecutions.push(record);
            record.requirementIds.forEach((requirementId) => {
                const requirement = draft.requirements.find((value) => value.id === requirementId);
                if (!requirement)
                    return;
                requirement.testExecutionIds.push(record.id);
                record.evidenceIds.forEach((evidenceId) => { if (!requirement.evidenceIds.includes(evidenceId))
                    requirement.evidenceIds.push(evidenceId); });
                requirement.statuses.verification = record.result === 'passed' ? 'passed' : record.result === 'failed' || record.result === 'inconclusive' ? 'failed' : record.result === 'blocked' ? 'blocked' : record.result === 'running' ? 'running' : record.result === 'waived' || record.result === 'conditionally-accepted' ? 'waived' : 'planned';
            });
            record.evidenceIds.forEach((evidenceId) => {
                const document = draft.documents.find((value) => value.id === evidenceId);
                if (document && !document.linkedRecordIds.includes(record.id))
                    document.linkedRecordIds.push(record.id);
                draft.links.push({ id: (0, id_1.createId)('link'), type: 'supported-by', fromId: record.id, toId: evidenceId, rationale: 'As-run evidence', createdAt: new Date().toISOString(), createdBy: record.operator });
            });
        });
        setExecution(blankExecution);
        setExecutionModal(false);
        notify(`${record.identifier} recorded as ${(0, text_1.humanize)(record.result)}. Prior results remain in history.`, record.result === 'passed' ? 'success' : record.result === 'failed' ? 'danger' : 'warning');
    };
    const addTestCase = () => {
        const selectedPlan = project.verificationPlans.find((value) => value.id === testCase.planId);
        if (!selectedPlan || !testCase.title.trim())
            return notify('Enter a test-case title and select a verification plan.', 'warning');
        const record = {
            ...(0, factory_1.controlledRecord)('case', (0, id_1.nextIdentifier)('CASE', project.testCases.map((value) => value.identifier)), testCase.title.trim(), selectedPlan.owner, 'draft'),
            verificationPlanId: selectedPlan.id,
            sharedSetup: testCase.setup.trim(),
            steps: testCase.steps.filter((step) => step.instruction.trim()).map((step) => ({ ...step, instruction: step.instruction.trim(), expectedResult: step.expectedResult.trim() })),
            parameterValues: {}
        };
        updateProject((draft) => {
            draft.testCases.push(record);
            const planRecord = draft.verificationPlans.find((value) => value.id === selectedPlan.id);
            if (planRecord)
                planRecord.testCaseIds.push(record.id);
        });
        setTestCase({ title: '', planId: '', setup: '', steps: [{ id: (0, id_1.createId)('step'), instruction: '', expectedResult: '' }] });
        setTestCaseModal(false);
        notify(`${record.identifier} created.`, 'success');
    };
    const resultGroups = ['unit', 'integration', 'subsystem', 'system', 'operational'].map((level) => ({
        level,
        executions: project.testExecutions.filter((run) => project.verificationPlans.find((plan) => plan.id === run.verificationPlanId)?.verificationLevel === level)
    }));
    return (React.createElement("div", { className: "view-stack verification-view" },
        React.createElement(ui_1.SectionHeader, { eyebrow: "Verification", title: "Plan intent, record as-run conditions, and close with evidence", description: "Verification is broader than testing. A requirement closes only when the applicable plan, result, criteria, evidence, review, and configuration conditions are satisfied.", actions: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { icon: "play", onClick: () => openExecution() }, "Record execution"),
                React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setPlanModal(true) }, "New plan")) }),
        React.createElement("div", { className: "verification-coverage" },
            React.createElement("div", null,
                React.createElement("span", null, "Plan coverage"),
                React.createElement("strong", null,
                    coverage.planned,
                    "/",
                    coverage.total),
                React.createElement(Progress_1.ProgressBar, { value: coverage.plannedPercent, showValue: false })),
            React.createElement("div", null,
                React.createElement("span", null, "Passing closure"),
                React.createElement("strong", null,
                    coverage.passed,
                    "/",
                    coverage.total),
                React.createElement(Progress_1.ProgressBar, { value: coverage.passedPercent, showValue: false })),
            React.createElement("div", { className: "verification-coverage__note" },
                React.createElement(Icon_1.Icon, { name: "info" }),
                React.createElement("span", null, "A passed execution does not erase earlier failed results and does not by itself prove closure."))),
        React.createElement(Tabs_1.Tabs, { options: tabs, active: activeTab, onChange: setActiveTab }),
        activeTab === 'plans' ? React.createElement(ui_1.Panel, { className: "panel--flush" }, project.verificationPlans.length ? React.createElement("div", { className: "data-table-wrap" },
            React.createElement("table", { className: "data-table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Plan"),
                        React.createElement("th", null, "Method"),
                        React.createElement("th", null, "Level"),
                        React.createElement("th", null, "Requirements"),
                        React.createElement("th", null, "Acceptance criteria"),
                        React.createElement("th", null, "Owner"),
                        React.createElement("th", null, "Planned"),
                        React.createElement("th", null, "Approval"),
                        React.createElement("th", null))),
                React.createElement("tbody", null, project.verificationPlans.map((record) => React.createElement("tr", { key: record.id },
                    React.createElement("td", null,
                        React.createElement("strong", null,
                            record.identifier,
                            " \u00B7 ",
                            record.title),
                        React.createElement("small", null,
                            "Revision ",
                            record.revision)),
                    React.createElement("td", null, (0, text_1.humanize)(record.verificationMethod)),
                    React.createElement("td", null, (0, text_1.humanize)(record.verificationLevel)),
                    React.createElement("td", null,
                        React.createElement("div", { className: "tag-list tag-list--inline" }, record.requirementIds.map((id) => React.createElement("span", { key: id }, project.requirements.find((value) => value.id === id)?.identifier ?? 'Missing')))),
                    React.createElement("td", null, (0, text_1.truncate)(record.acceptanceCriteria || 'Not defined', 100)),
                    React.createElement("td", null, record.owner),
                    React.createElement("td", null, (0, dates_1.formatDate)(record.plannedDate)),
                    React.createElement("td", null,
                        React.createElement(ui_1.Select, { value: record.approvalState, onChange: (event) => updateProject((draft) => { const planRecord = draft.verificationPlans.find((value) => value.id === record.id); if (planRecord)
                                planRecord.approvalState = event.target.value; }) }, ['draft', 'under-review', 'approved', 'superseded'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                    React.createElement("td", null,
                        React.createElement(ui_1.Button, { size: "small", icon: "play", onClick: () => openExecution(record.id) }, "Run"))))))) : React.createElement(ui_1.EmptyState, { icon: "verification", title: "No verification plans", description: "Create a plan that states method, level, acceptance criteria, configuration, environment, and required evidence.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setPlanModal(true) }, "New plan") })) : null,
        activeTab === 'cases' ? React.createElement(ui_1.Panel, { className: "panel--flush" },
            project.testCases.length ? React.createElement("div", { className: "data-table-wrap" },
                React.createElement("table", { className: "data-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Test case"),
                            React.createElement("th", null, "Verification plan"),
                            React.createElement("th", null, "Shared setup"),
                            React.createElement("th", null, "Steps"),
                            React.createElement("th", null, "Revision"))),
                    React.createElement("tbody", null, project.testCases.map((record) => React.createElement("tr", { key: record.id },
                        React.createElement("td", null,
                            React.createElement("strong", null,
                                record.identifier,
                                " \u00B7 ",
                                record.title)),
                        React.createElement("td", null, project.verificationPlans.find((value) => value.id === record.verificationPlanId)?.identifier ?? 'Missing plan'),
                        React.createElement("td", null, (0, text_1.truncate)(record.sharedSetup, 100)),
                        React.createElement("td", null, record.steps.length),
                        React.createElement("td", null, record.revision)))))) : React.createElement(ui_1.EmptyState, { icon: "table", title: "No reusable test cases", description: "Create a parameterized case with shared setup, steps, and expected results.", action: React.createElement(ui_1.Button, { icon: "plus", variant: "primary", onClick: () => setTestCaseModal(true) }, "New test case") }),
            React.createElement("div", { className: "panel-footer-actions" },
                React.createElement(ui_1.Button, { icon: "plus", onClick: () => setTestCaseModal(true) }, "New test case"))) : null,
        activeTab === 'executions' ? React.createElement(ui_1.Panel, { className: "panel--flush" }, project.testExecutions.length ? React.createElement("div", { className: "data-table-wrap" },
            React.createElement("table", { className: "data-table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Execution"),
                        React.createElement("th", null, "Plan"),
                        React.createElement("th", null, "Level"),
                        React.createElement("th", null, "As-run date"),
                        React.createElement("th", null, "Configuration"),
                        React.createElement("th", null, "Operator"),
                        React.createElement("th", null, "Evidence"),
                        React.createElement("th", null, "Result"))),
                React.createElement("tbody", null, [...project.testExecutions].sort((a, b) => b.executedAt.localeCompare(a.executedAt)).map((record) => { const planRecord = project.verificationPlans.find((value) => value.id === record.verificationPlanId); return React.createElement("tr", { key: record.id },
                    React.createElement("td", null,
                        React.createElement("strong", null, record.identifier),
                        React.createElement("small", null,
                            "Run ",
                            record.executionNumber,
                            " \u00B7 Revision ",
                            record.revision)),
                    React.createElement("td", null,
                        planRecord?.identifier ?? 'Missing plan',
                        " \u00B7 ",
                        planRecord?.title),
                    React.createElement("td", null, (0, text_1.humanize)(planRecord?.verificationLevel ?? 'unknown')),
                    React.createElement("td", null, (0, dates_1.formatDateTime)(record.executedAt)),
                    React.createElement("td", null,
                        React.createElement("strong", null, record.systemConfiguration || 'Not recorded'),
                        React.createElement("small", null,
                            "Hardware ",
                            record.hardwareRevision || '—',
                            " \u00B7 Software ",
                            record.softwareVersion || '—',
                            " \u00B7 Firmware ",
                            record.firmwareVersion || '—')),
                    React.createElement("td", null,
                        record.operator,
                        React.createElement("small", null, record.reviewer ? `Reviewed by ${record.reviewer}` : 'Reviewer not recorded')),
                    React.createElement("td", null, record.evidenceIds.length),
                    React.createElement("td", null,
                        React.createElement(StatusBadge_1.StatusBadge, { value: record.result }))); })))) : React.createElement(ui_1.EmptyState, { icon: "play", title: "No as-run executions", description: "Record the exact plan revision, operator, system configuration, environment, equipment, deviations, result, and evidence.", action: React.createElement(ui_1.Button, { icon: "play", variant: "primary", onClick: () => openExecution() }, "Record execution") })) : null,
        activeTab === 'results' ? React.createElement("div", { className: "verification-level-grid" }, resultGroups.map(({ level, executions }) => React.createElement(ui_1.Panel, { key: level },
            React.createElement(ui_1.PanelHeader, { title: `${(0, text_1.humanize)(level)} level`, description: `${executions.length} execution record(s)` }),
            executions.length ? React.createElement("div", { className: "result-card-list" }, executions.map((record) => React.createElement("div", { className: "result-card", key: record.id },
                React.createElement("div", null,
                    React.createElement(StatusBadge_1.StatusBadge, { value: record.result }),
                    React.createElement("span", null,
                        record.identifier,
                        " \u00B7 ",
                        (0, dates_1.formatDate)(record.executedAt))),
                React.createElement("strong", null, project.verificationPlans.find((value) => value.id === record.verificationPlanId)?.title ?? 'Missing verification plan'),
                React.createElement("p", null, record.outputData || record.observations || 'No result summary recorded.'),
                React.createElement("small", null,
                    record.systemConfiguration || 'Configuration not recorded',
                    " \u00B7 ",
                    record.evidenceIds.length,
                    " evidence artifact(s)")))) : React.createElement("div", { className: "result-level-empty" },
                "No ",
                level,
                "-level result has been recorded.")))) : null,
        activeTab === 'readiness' ? React.createElement(ui_1.Panel, { className: "panel--flush" },
            React.createElement("div", { className: "readiness-table" },
                React.createElement("div", { className: "readiness-table__header" },
                    React.createElement("span", null, "Requirement"),
                    React.createElement("span", null, "Plan"),
                    React.createElement("span", null, "Latest state"),
                    React.createElement("span", null, "Closure"),
                    React.createElement("span", null, "Readiness"),
                    React.createElement("span", null)),
                project.requirements.map((requirement) => { const plans = project.verificationPlans.filter((plan) => plan.requirementIds.includes(requirement.id)); const closure = (0, calculations_1.verificationClosure)(project, requirement); const readiness = (0, calculations_1.requirementReadiness)(project, requirement); const expanded = expandedReadiness === requirement.id; return React.createElement("div", { className: "readiness-table__group", key: requirement.id },
                    React.createElement("button", { className: "readiness-table__row", onClick: () => setExpandedReadiness(expanded ? undefined : requirement.id) },
                        React.createElement("span", null,
                            React.createElement("strong", null, requirement.identifier),
                            React.createElement("small", null, requirement.title)),
                        React.createElement("span", null, plans.length ? plans.map((plan) => plan.identifier).join(', ') : 'None'),
                        React.createElement("span", null,
                            React.createElement(StatusBadge_1.StatusBadge, { value: (0, calculations_1.deriveVerificationState)(project, requirement), compact: true })),
                        React.createElement("span", null,
                            closure.conditions.filter((condition) => condition.met).length,
                            "/",
                            closure.conditions.length),
                        React.createElement("span", null,
                            React.createElement(Progress_1.ProgressBar, { value: readiness.score, size: "small" })),
                        React.createElement(Icon_1.Icon, { name: "chevron-down", className: expanded ? 'is-rotated' : '' })),
                    expanded ? React.createElement("div", { className: "readiness-table__detail" },
                        React.createElement("div", null,
                            React.createElement("h3", null, "Closure conditions"),
                            closure.conditions.map((condition) => React.createElement("span", { key: condition.label, className: condition.met ? 'is-met' : 'is-open' },
                                React.createElement(Icon_1.Icon, { name: condition.met ? 'check' : 'close', size: 14 }),
                                condition.label))),
                        React.createElement("div", null,
                            React.createElement("h3", null, "Readiness factors"),
                            readiness.factors.map((factor) => React.createElement("span", { key: factor.label, className: factor.met ? 'is-met' : 'is-open' },
                                React.createElement(Icon_1.Icon, { name: factor.met ? 'check' : 'warning', size: 14 }),
                                React.createElement("span", null,
                                    React.createElement("strong", null, factor.label),
                                    React.createElement("small", null, factor.detail)))))) : null); }))) : null,
        React.createElement(Modal_1.Modal, { open: planModal, onClose: () => setPlanModal(false), title: "Create verification plan", description: "Describe how compliance will be established before recording a result.", width: "wide", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setPlanModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addPlan }, "Create plan")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Plan title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: plan.title, onChange: (event) => setPlan({ ...plan, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Method" },
                    React.createElement(ui_1.Select, { value: plan.method, onChange: (event) => setPlan({ ...plan, method: event.target.value }) }, ['test', 'analysis', 'inspection', 'demonstration', 'similarity', 'certification', 'combination', 'not-yet-determined'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Level" },
                    React.createElement(ui_1.Select, { value: plan.level, onChange: (event) => setPlan({ ...plan, level: event.target.value }) }, ['unit', 'integration', 'subsystem', 'system', 'operational'].map((value) => React.createElement("option", { key: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Owner" },
                    React.createElement(ui_1.Input, { value: plan.owner, onChange: (event) => setPlan({ ...plan, owner: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Reviewer" },
                    React.createElement(ui_1.Input, { value: plan.reviewer, onChange: (event) => setPlan({ ...plan, reviewer: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Planned date" },
                    React.createElement(ui_1.Input, { type: "date", value: plan.plannedDate, onChange: (event) => setPlan({ ...plan, plannedDate: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Approval state" },
                    React.createElement(ui_1.Select, { value: plan.approval, onChange: (event) => setPlan({ ...plan, approval: event.target.value }) }, ['draft', 'under-review', 'approved'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement("div", { className: "field--wide" },
                    React.createElement("span", { className: "field__label" }, "Requirements covered *"),
                    React.createElement("div", { className: "selection-list selection-list--compact" }, project.requirements.map((requirement) => React.createElement("label", { key: requirement.id, className: plan.requirementIds.includes(requirement.id) ? 'is-selected' : '' },
                        React.createElement("input", { type: "checkbox", checked: plan.requirementIds.includes(requirement.id), onChange: () => togglePlanRequirement(requirement.id) }),
                        React.createElement("span", null,
                            React.createElement("strong", null,
                                requirement.identifier,
                                " \u00B7 ",
                                requirement.title),
                            React.createElement("small", null, (0, text_1.truncate)(requirement.statement, 100))))))),
                React.createElement(ui_1.Field, { label: "Objective", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: plan.objective, onChange: (event) => setPlan({ ...plan, objective: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Acceptance criteria", required: true, className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: plan.criteria, onChange: (event) => setPlan({ ...plan, criteria: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Preconditions" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: plan.preconditions, onChange: (event) => setPlan({ ...plan, preconditions: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Required configuration" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: plan.configuration, onChange: (event) => setPlan({ ...plan, configuration: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Environment" },
                    React.createElement(ui_1.Input, { value: plan.environment, onChange: (event) => setPlan({ ...plan, environment: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Equipment" },
                    React.createElement(ui_1.Input, { value: plan.equipment, onChange: (event) => setPlan({ ...plan, equipment: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Instrumentation" },
                    React.createElement(ui_1.Input, { value: plan.instrumentation, onChange: (event) => setPlan({ ...plan, instrumentation: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Personnel" },
                    React.createElement(ui_1.Input, { value: plan.personnel, onChange: (event) => setPlan({ ...plan, personnel: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Safety considerations", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: plan.safety, onChange: (event) => setPlan({ ...plan, safety: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Procedure", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 5, value: plan.procedure, onChange: (event) => setPlan({ ...plan, procedure: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Data to collect" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: plan.data, onChange: (event) => setPlan({ ...plan, data: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Sample size" },
                    React.createElement(ui_1.Input, { value: plan.sampleSize, onChange: (event) => setPlan({ ...plan, sampleSize: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Pass or fail logic", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: plan.passFail, onChange: (event) => setPlan({ ...plan, passFail: event.target.value }) })))),
        React.createElement(Modal_1.Modal, { open: executionModal, onClose: () => setExecutionModal(false), title: "Record as-run execution", description: "Record what actually ran. Never overwrite an earlier failure when a later run passes.", width: "wide", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setExecutionModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addExecution }, "Record execution")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Verification plan", required: true, className: "field--wide" },
                    React.createElement(ui_1.Select, { value: execution.planId, onChange: (event) => setExecution({ ...execution, planId: event.target.value, testCaseId: '' }) },
                        React.createElement("option", { value: "" }, "Select plan"),
                        project.verificationPlans.map((value) => React.createElement("option", { key: value.id, value: value.id },
                            value.identifier,
                            " \u00B7 ",
                            value.title)))),
                project.testCases.some((value) => value.verificationPlanId === execution.planId) ? React.createElement(ui_1.Field, { label: "Test case" },
                    React.createElement(ui_1.Select, { value: execution.testCaseId, onChange: (event) => setExecution({ ...execution, testCaseId: event.target.value }) },
                        React.createElement("option", { value: "" }, "No specific case"),
                        project.testCases.filter((value) => value.verificationPlanId === execution.planId).map((value) => React.createElement("option", { key: value.id, value: value.id },
                            value.identifier,
                            " \u00B7 ",
                            value.title)))) : null,
                React.createElement(ui_1.Field, { label: "Result" },
                    React.createElement(ui_1.Select, { value: execution.result, onChange: (event) => setExecution({ ...execution, result: event.target.value }) }, ['not-run', 'running', 'passed', 'failed', 'blocked', 'inconclusive', 'conditionally-accepted', 'waived', 'superseded'].map((value) => React.createElement("option", { key: value, value: value }, (0, text_1.humanize)(value))))),
                React.createElement(ui_1.Field, { label: "Date and time" },
                    React.createElement(ui_1.Input, { type: "datetime-local", value: execution.executedAt, onChange: (event) => setExecution({ ...execution, executedAt: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Operator", required: true },
                    React.createElement(ui_1.Input, { value: execution.operator, onChange: (event) => setExecution({ ...execution, operator: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Reviewer" },
                    React.createElement(ui_1.Input, { value: execution.reviewer, onChange: (event) => setExecution({ ...execution, reviewer: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "System configuration", required: true, className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: execution.systemConfiguration, onChange: (event) => setExecution({ ...execution, systemConfiguration: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Hardware revision" },
                    React.createElement(ui_1.Input, { value: execution.hardwareRevision, onChange: (event) => setExecution({ ...execution, hardwareRevision: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Software version" },
                    React.createElement(ui_1.Input, { value: execution.softwareVersion, onChange: (event) => setExecution({ ...execution, softwareVersion: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Firmware version" },
                    React.createElement(ui_1.Input, { value: execution.firmwareVersion, onChange: (event) => setExecution({ ...execution, firmwareVersion: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Environment" },
                    React.createElement(ui_1.Input, { value: execution.environment, onChange: (event) => setExecution({ ...execution, environment: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Equipment" },
                    React.createElement(ui_1.Input, { value: execution.equipment, onChange: (event) => setExecution({ ...execution, equipment: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Calibration reference" },
                    React.createElement(ui_1.Input, { value: execution.calibrationReference, onChange: (event) => setExecution({ ...execution, calibrationReference: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Input data", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: execution.inputData, onChange: (event) => setExecution({ ...execution, inputData: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Output data", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 2, value: execution.outputData, onChange: (event) => setExecution({ ...execution, outputData: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Observations", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: execution.observations, onChange: (event) => setExecution({ ...execution, observations: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Deviations from plan", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: execution.deviations, onChange: (event) => setExecution({ ...execution, deviations: event.target.value }) })),
                React.createElement("div", { className: "field--wide" },
                    React.createElement("span", { className: "field__label" }, "Existing evidence artifacts"),
                    React.createElement("div", { className: "selection-list selection-list--compact" }, project.documents.length ? project.documents.map((document) => React.createElement("label", { key: document.id, className: execution.evidenceIds.includes(document.id) ? 'is-selected' : '' },
                        React.createElement("input", { type: "checkbox", checked: execution.evidenceIds.includes(document.id), onChange: () => toggleExecutionEvidence(document.id) }),
                        React.createElement("span", null,
                            React.createElement("strong", null,
                                document.identifier,
                                " \u00B7 ",
                                document.title),
                            React.createElement("small", null,
                                (0, text_1.humanize)(document.status),
                                " \u00B7 revision ",
                                document.revision)))) : React.createElement("p", { className: "muted-text" }, "No evidence artifacts exist yet. Add them in the Evidence library."))))),
        React.createElement(Modal_1.Modal, { open: testCaseModal, onClose: () => setTestCaseModal(false), title: "Create reusable test case", description: "Record shared setup, repeatable steps, and expected results.", width: "large", footer: React.createElement(React.Fragment, null,
                React.createElement(ui_1.Button, { variant: "ghost", onClick: () => setTestCaseModal(false) }, "Cancel"),
                React.createElement(ui_1.Button, { variant: "primary", onClick: addTestCase }, "Create test case")) },
            React.createElement("div", { className: "form-grid" },
                React.createElement(ui_1.Field, { label: "Title", required: true, className: "field--wide" },
                    React.createElement(ui_1.Input, { autoFocus: true, value: testCase.title, onChange: (event) => setTestCase({ ...testCase, title: event.target.value }) })),
                React.createElement(ui_1.Field, { label: "Verification plan", required: true, className: "field--wide" },
                    React.createElement(ui_1.Select, { value: testCase.planId, onChange: (event) => setTestCase({ ...testCase, planId: event.target.value }) },
                        React.createElement("option", { value: "" }, "Select plan"),
                        project.verificationPlans.map((value) => React.createElement("option", { key: value.id, value: value.id },
                            value.identifier,
                            " \u00B7 ",
                            value.title)))),
                React.createElement(ui_1.Field, { label: "Shared setup", className: "field--wide" },
                    React.createElement(ui_1.Textarea, { rows: 3, value: testCase.setup, onChange: (event) => setTestCase({ ...testCase, setup: event.target.value }) })),
                React.createElement("div", { className: "field--wide test-step-editor" },
                    React.createElement("div", { className: "test-step-editor__header" },
                        React.createElement("span", { className: "field__label" }, "Steps"),
                        React.createElement(ui_1.Button, { size: "small", icon: "plus", onClick: () => setTestCase({ ...testCase, steps: [...testCase.steps, { id: (0, id_1.createId)('step'), instruction: '', expectedResult: '' }] }) }, "Add step")),
                    testCase.steps.map((step, index) => React.createElement("div", { key: step.id, className: "test-step-row" },
                        React.createElement("span", null, index + 1),
                        React.createElement(ui_1.Input, { placeholder: "Instruction", value: step.instruction, onChange: (event) => setTestCase({ ...testCase, steps: testCase.steps.map((value) => value.id === step.id ? { ...value, instruction: event.target.value } : value) }) }),
                        React.createElement(ui_1.Input, { placeholder: "Expected result", value: step.expectedResult, onChange: (event) => setTestCase({ ...testCase, steps: testCase.steps.map((value) => value.id === step.id ? { ...value, expectedResult: event.target.value } : value) }) }),
                        React.createElement(ui_1.Button, { size: "small", variant: "ghost", onClick: () => setTestCase({ ...testCase, steps: testCase.steps.filter((value) => value.id !== step.id) }) }, "Remove"))))))));
}

}
  };
  var cache = Object.create(null);
  function normalize(value) {
    var parts = [];
    value.replace(/\\/g, '/').split('/').forEach(function (part) {
      if (!part || part === '.') return;
      if (part === '..') parts.pop(); else parts.push(part);
    });
    return parts.join('/');
  }
  function dirname(value) { var index = value.lastIndexOf('/'); return index < 0 ? '' : value.slice(0, index); }
  function resolve(specifier, from) {
    if (specifier === 'react' || specifier === 'react-dom/client') return specifier;
    if (!specifier.startsWith('.')) return specifier;
    var base = normalize(dirname(from) + '/' + specifier);
    var candidates = [base, base + '.ts', base + '.tsx', base + '.js', base + '/index.ts', base + '/index.tsx', base + '/index.js'];
    for (var i = 0; i < candidates.length; i += 1) if (modules[candidates[i]]) return candidates[i];
    if (/\.css$/i.test(base)) return '__css__';
    throw new Error('Cannot resolve "' + specifier + '" from "' + from + '".');
  }
  function load(id, from) {
    if (id === 'react') return vendor.react;
    if (id === 'react-dom/client') return vendor.reactDomClient;
    if (id === '__css__') return {};
    var resolved = from ? resolve(id, from) : id;
    if (resolved === 'react') return vendor.react;
    if (resolved === 'react-dom/client') return vendor.reactDomClient;
    if (resolved === '__css__') return {};
    if (cache[resolved]) return cache[resolved].exports;
    var factory = modules[resolved];
    if (!factory) throw new Error('Missing LOOM module "' + resolved + '".');
    var module = cache[resolved] = { exports: {} };
    factory(module, module.exports, function (specifier) { return load(specifier, resolved); });
    return module.exports;
  }
  try { load('src/main.tsx'); } catch (error) {
    console.error(error);
    var root = document.getElementById('root');
    if (root) root.innerHTML = '<main style="font:16px/1.5 system-ui;padding:32px;max-width:900px;margin:auto"><h1>LOOM could not start</h1><p>The application encountered a local startup error.</p><pre style="white-space:pre-wrap;background:#111;color:#fff;padding:16px;border-radius:8px"></pre></main>';
    var pre = root && root.querySelector('pre'); if (pre) pre.textContent = error && error.stack ? error.stack : String(error);
  }
})(window);
