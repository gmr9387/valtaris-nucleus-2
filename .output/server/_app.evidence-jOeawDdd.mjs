import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as Database, D as FingerprintPattern, E as FolderArchive, M as CloudUpload, O as FileText, c as ShieldCheck, i as TriangleAlert } from "./_libs/lucide-react.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { i as PageHeader, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.evidence-jOeawDdd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EVIDENCE_TYPES = [
	{
		name: "Claim Appeal Packet",
		module: "Claim Clarity",
		status: "planned",
		documentTypes: [
			"EOB",
			"medical records",
			"authorization",
			"appeal letter"
		],
		verification: "hash + manifest"
	},
	{
		name: "Decision Trace Evidence",
		module: "Guardian",
		status: "planned",
		documentTypes: [
			"inputs",
			"signals",
			"policy trace",
			"outcome"
		],
		verification: "decision hash"
	},
	{
		name: "Workflow Execution Evidence",
		module: "Glue",
		status: "planned",
		documentTypes: [
			"checkpoint",
			"approval",
			"retry log",
			"dead letter"
		],
		verification: "execution manifest"
	},
	{
		name: "Connector Payload Evidence",
		module: "Weaver",
		status: "planned",
		documentTypes: [
			"request",
			"response",
			"webhook",
			"normalized payload"
		],
		verification: "payload hash"
	}
];
function EvidencePage() {
	const { currentOrgId } = useOrgStore();
	const stats = (0, import_react.useMemo)(() => {
		return {
			registries: EVIDENCE_TYPES.length,
			modules: new Set(EVIDENCE_TYPES.map((item) => item.module)).size,
			verified: 0
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "KNOWLEDGE",
		title: "Evidence",
		description: "Shared evidence registry for documents, manifests, hashes, provenance, verification, and future AI extraction."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Select an organization",
		description: "Evidence is isolated per organization and later attached to projects, workflows, decisions, and claims.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderArchive, { className: "h-5 w-5" })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Evidence Registries",
						value: String(stats.registries),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderArchive, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Product Modules",
						value: String(stats.modules),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-4 w-4" }),
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Verified Sets",
						value: String(stats.verified),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
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
						children: "Evidence Registry Blueprint"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Shared evidence patterns across Claim Clarity, Guardian, Glue, and Weaver."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-status-pending/30 bg-status-pending/10 px-2 py-1 text-mono-xs text-status-pending",
						children: "Phase 4"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: EVIDENCE_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[220px_130px_1fr_170px] gap-3 px-5 py-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Evidence set template"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-mono-xs text-primary",
								children: item.module
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: item.documentTypes.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1 inline h-2.5 w-2.5" }), doc]
								}, doc))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "h-3.5 w-3.5 text-status-paid" }), item.verification]
							})
						]
					}, item.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border bg-surface-1 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mt-0.5 h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Future Upload Flow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Uploads should write to Supabase Storage, create document rows, calculate SHA-style hashes, and attach each file to an evidence manifest. Browser components should never become the system of record by themselves."
						})] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-status-pending/30 bg-status-pending/5 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 text-status-pending" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Principal constraint"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Evidence must be provenance-first. Every future document should know where it came from, what entity it supports, whether it is verified, and which decision or workflow used it."
						})] })]
					})
				})]
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
//#endregion
export { EvidencePage as component };
