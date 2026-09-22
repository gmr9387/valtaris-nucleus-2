import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { C as GitBranch, P as ClipboardCheck, R as CircleCheck, b as LockKeyhole, c as ShieldCheck, i as TriangleAlert, m as Scale } from "./_libs/lucide-react.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { i as PageHeader, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.governance-BhhPy4br.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var POLICIES = [
	{
		name: "High-Risk Decision Approval",
		module: "Guardian",
		status: "planned",
		version: "v1",
		scope: "organization",
		trigger: "decision.risk_score >= threshold",
		control: "human approval required"
	},
	{
		name: "Production Workflow Gate",
		module: "Glue",
		status: "planned",
		version: "v1",
		scope: "environment",
		trigger: "workflow.deploy.production",
		control: "owner/admin approval"
	},
	{
		name: "Connector Rate Limit",
		module: "Weaver",
		status: "planned",
		version: "v1",
		scope: "connector",
		trigger: "api.calls > quota",
		control: "throttle or block"
	},
	{
		name: "Evidence Verification Required",
		module: "Claim Clarity",
		status: "planned",
		version: "v1",
		scope: "appeal_packet",
		trigger: "appeal.submit",
		control: "verified manifest required"
	},
	{
		name: "Secret Rotation Policy",
		module: "Core",
		status: "planned",
		version: "v1",
		scope: "credential",
		trigger: "secret.age > rotation_window",
		control: "rotation required"
	}
];
function GovernancePage() {
	const { currentOrgId } = useOrgStore();
	const stats = (0, import_react.useMemo)(() => {
		return {
			policies: POLICIES.length,
			modules: new Set(POLICIES.map((policy) => policy.module)).size,
			active: POLICIES.filter((policy) => policy.status === "active").length
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "GOVERN",
		title: "Governance",
		description: "Tenant-level policies, approval gates, execution controls, risk rules, and versioned platform restrictions."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Select an organization",
		description: "Governance policies are scoped to organizations and later applied to projects, environments, workflows, connectors, and decisions.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Policy Templates",
						value: String(stats.policies),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Covered Modules",
						value: String(stats.modules),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-4 w-4" }),
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Active Policies",
						value: String(stats.active),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "h-4 w-4" }),
						tone: "warn"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Governance Policy Registry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Shared controls for Guardian, Glue, Weaver, Claim Clarity, and Core."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-status-pending/30 bg-status-pending/10 px-2 py-1 text-mono-xs text-status-pending",
						children: "Phase 6"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: POLICIES.map((policy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[220px_120px_90px_140px_1fr_180px] gap-3 px-5 py-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground",
								children: policy.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Policy template"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-mono-xs text-primary",
								children: policy.module
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "h-3 w-3" }), policy.version]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: policy.scope
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: policy.trigger
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-3.5 w-3.5 text-status-pending" }), policy.control]
							})
						]
					}, policy.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
						title: "Policy before execution",
						description: "High-impact workflows, connector calls, and decisions should check policy before action."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "h-4 w-4" }),
						title: "Version every rule",
						description: "Policies must be versioned so execution and decisions can be replayed against the exact rule set used."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
						title: "Exceptions must be explicit",
						description: "Overrides should require reason, approver, timestamp, and audit trace. No silent bypasses."
					})
				]
			})
		]
	}) })] });
}
function Metric({ label, value, icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border p-4 ${tone === "good" ? "border-status-paid/20 bg-status-paid/5" : tone === "warn" ? "border-status-pending/20 bg-status-pending/5" : "border-primary/20 bg-primary/5"}`,
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
function PrincipleCard({ icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-1 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-primary",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: description
		})]
	});
}
//#endregion
export { GovernancePage as component };
