import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as Clock3, Y as Activity, f as Search, o as Shield, w as Funnel } from "./_libs/lucide-react.mjs";
import { i as useAuditEvents } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { a as Th, i as Td } from "./_app.organizations-C167SJ8c.mjs";
import { i as PageHeader, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.audit-C7sC3kaP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	const { currentOrgId } = useOrgStore();
	const audit = useAuditEvents(currentOrgId);
	const [query, setQuery] = (0, import_react.useState)("");
	const [moduleFilter, setModuleFilter] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		if (!audit.data) return [];
		return audit.data.filter((event) => {
			const matchesModule = moduleFilter === "all" || event.module === moduleFilter;
			const q = query.toLowerCase();
			const matchesQuery = q.length === 0 || event.module?.toLowerCase().includes(q) || event.action?.toLowerCase().includes(q) || event.entity_type?.toLowerCase().includes(q) || event.entity_id?.toLowerCase().includes(q);
			return matchesModule && matchesQuery;
		});
	}, [
		audit.data,
		query,
		moduleFilter
	]);
	const modules = (0, import_react.useMemo)(() => {
		if (!audit.data) return [];
		return [...new Set(audit.data.map((e) => e.module))];
	}, [audit.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "AUDIT",
		title: "Audit Log",
		description: "Immutable operational ledger of platform activity, access changes, and state mutations."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Select an organization",
		description: "Audit events are scoped per organization.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" })
	}) : audit.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid grid-cols-1 gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Total Events",
					value: String(audit.data.length),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Modules",
					value: String(modules.length),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "Latest Event",
					value: audit.data[0] ? new Date(audit.data[0].created_at).toLocaleDateString() : "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-3 md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "h-10 w-full rounded-md border border-border bg-surface-1 pl-9 pr-3 text-sm outline-none focus:border-primary",
					placeholder: "Search module, action, entity...",
					value: query,
					onChange: (e) => setQuery(e.target.value)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-10 rounded-md border border-border bg-surface-1 px-3 text-sm",
				value: moduleFilter,
				onChange: (e) => setModuleFilter(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "all",
					children: "All modules"
				}), modules.map((module) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: module,
					children: module
				}, module))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-1 text-mono-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Module" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Action" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Entity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Actor" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border bg-surface-1/40",
					children: filtered.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-surface-2/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: new Date(event.created_at).toLocaleString()
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-mono-xs text-primary",
								children: event.module.toUpperCase()
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBadge, { action: event.action }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs",
								children: [event.entity_type, event.entity_id ? ` · ${event.entity_id.slice(0, 8)}` : ""]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: event.user_id?.slice(0, 8) ?? "SYSTEM"
							}) })
						]
					}, event.id))
				})]
			})
		})
	] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No audit events yet",
		description: "Every create, update, delete, sign-in, and platform action will appear here.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" })
	}) })] });
}
function MetricCard({ label, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface-1 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-wider text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-2xl font-semibold tracking-tight",
			children: value
		})]
	});
}
function ActionBadge({ action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-md border px-2 py-0.5 text-mono-xs ${action === "create" ? "border-status-paid/30 bg-status-paid/10 text-status-paid" : action === "delete" ? "border-status-denied/30 bg-status-denied/10 text-status-denied" : action === "update" ? "border-status-pending/30 bg-status-pending/10 text-status-pending" : "border-border bg-surface-2 text-muted-foreground"}`,
		children: action
	});
}
//#endregion
export { AuditPage as component };
