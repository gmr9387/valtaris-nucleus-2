import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { C as GitBranch, O as FileText, W as BrainCircuit, Y as Activity, a as Target, c as ShieldCheck, i as TriangleAlert } from "./_libs/lucide-react.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { i as PageHeader, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.decisions-DjzpOC5r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DECISION_TYPES = [
	{
		name: "Claim Recoverability",
		module: "Claim Clarity",
		status: "planned",
		inputs: [
			"denial category",
			"aging",
			"payer",
			"evidence",
			"claim value"
		],
		outputs: [
			"score",
			"tier",
			"recommended path",
			"barriers"
		],
		confidence: "explainable"
	},
	{
		name: "Next Best Action",
		module: "Claim Clarity",
		status: "planned",
		inputs: [
			"denial event",
			"playbook",
			"SLA",
			"payer profile"
		],
		outputs: [
			"action",
			"owner",
			"expected value",
			"blockers"
		],
		confidence: "rule-weighted"
	},
	{
		name: "Risk Gate",
		module: "Guardian",
		status: "planned",
		inputs: [
			"signal",
			"exposure",
			"policy",
			"history",
			"threshold"
		],
		outputs: [
			"approve",
			"deny",
			"review",
			"escalate"
		],
		confidence: "policy-traced"
	},
	{
		name: "Workflow Routing",
		module: "Glue",
		status: "planned",
		inputs: [
			"event",
			"tenant policy",
			"workflow version",
			"state"
		],
		outputs: [
			"route",
			"queue",
			"approval requirement"
		],
		confidence: "deterministic"
	},
	{
		name: "Connector Policy Decision",
		module: "Weaver",
		status: "planned",
		inputs: [
			"connector",
			"rate limit",
			"credential status",
			"payload"
		],
		outputs: [
			"allow",
			"block",
			"retry",
			"dead-letter"
		],
		confidence: "policy-based"
	}
];
function DecisionsPage() {
	const { currentOrgId } = useOrgStore();
	const stats = (0, import_react.useMemo)(() => {
		return {
			types: DECISION_TYPES.length,
			modules: new Set(DECISION_TYPES.map((item) => item.module)).size,
			active: DECISION_TYPES.filter((item) => item.status === "active").length
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "KNOWLEDGE",
		title: "Decisions",
		description: "Explainable decision registry for recommendations, risk gates, policy checks, confidence scores, and decision traces."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Select an organization",
		description: "Decision runs are tenant-scoped and later tied to products, workflows, evidence, and outcomes.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "h-5 w-5" })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Decision Types",
						value: String(stats.types),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Product Modules",
						value: String(stats.modules),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "h-4 w-4" }),
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Active Runs",
						value: String(stats.active),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }),
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
						children: "Decision Registry Blueprint"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Shared explainability layer for Claim Clarity, Guardian, Glue, and Weaver."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-status-pending/30 bg-status-pending/10 px-2 py-1 text-mono-xs text-status-pending",
						children: "Phase 5"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: DECISION_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[200px_130px_1fr_1fr_140px] gap-3 px-5 py-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Decision profile"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-mono-xs text-primary",
								children: item.module
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: item.inputs.map((input) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground",
									children: input
								}, input))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: item.outputs.map((output) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border border-status-paid/20 bg-status-paid/5 px-1.5 py-0.5 text-[10px] text-status-paid",
									children: output
								}, output))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-status-paid" }), item.confidence]
							})
						]
					}, item.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }),
						title: "No black-box recommendations",
						description: "Every decision should store its inputs, fired rules, confidence math, explanation, and outcome."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
						title: "Trace before action",
						description: "High-impact actions should produce a decision trace before workflow execution or human approval."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
						title: "Policy governs risk",
						description: "Guardian should consume this layer as decision governance, not as a separate mystery brain."
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
export { DecisionsPage as component };
