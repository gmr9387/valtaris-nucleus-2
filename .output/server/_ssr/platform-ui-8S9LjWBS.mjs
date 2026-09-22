import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/platform-ui-8S9LjWBS.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4 border-b border-border bg-surface-1/30 px-6 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mono-xs text-muted-foreground",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-semibold tracking-tight",
					children: title
				}),
				description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-3xl text-sm text-muted-foreground",
					children: description
				})
			]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: actions
		})]
	});
}
function PageBody({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6",
		children
	});
}
function EmptyState({ title, description, action, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-1/40 p-12 text-center",
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 rounded-full border border-border bg-surface-2 p-3 text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: action
			})
		]
	});
}
function StatusDot({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-1.5 w-1.5 rounded-full " + ({
		active: "bg-success",
		paused: "bg-warning",
		suspended: "bg-warning",
		archived: "bg-muted-foreground",
		development: "bg-chart-4",
		staging: "bg-warning",
		production: "bg-success",
		planned: "bg-muted-foreground",
		draft: "bg-muted-foreground",
		pending: "bg-warning",
		approved: "bg-success",
		rejected: "bg-destructive",
		failed: "bg-destructive",
		healthy: "bg-success"
	}[status] ?? "bg-muted-foreground") });
}
function StatusPill({ status, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-mono-xs ${status === "active" || status === "production" || status === "approved" || status === "healthy" ? "border-status-paid/30 bg-status-paid/10 text-status-paid" : status === "pending" || status === "staging" || status === "paused" || status === "planned" ? "border-status-pending/30 bg-status-pending/10 text-status-pending" : status === "failed" || status === "rejected" || status === "suspended" ? "border-status-denied/30 bg-status-denied/10 text-status-denied" : "border-border bg-surface-2 text-muted-foreground"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status }), children ?? status.toUpperCase()]
	});
}
function MetricCard({ label, value, icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border p-4 ${tone === "good" ? "border-status-paid/20 bg-status-paid/5" : tone === "warn" ? "border-status-pending/20 bg-status-pending/5" : tone === "danger" ? "border-status-denied/20 bg-status-denied/5" : tone === "neutral" ? "border-border bg-surface-1" : "border-primary/20 bg-primary/5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-wider text-muted-foreground",
				children: label
			}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-2xl font-semibold tracking-tight tabular-nums",
			children: value
		})]
	});
}
function Panel({ title, description, icon, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3 border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-muted-foreground",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: description
				})] })]
			}), action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: action
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children
		})]
	});
}
//#endregion
export { Panel as a, PageHeader as i, MetricCard as n, StatusDot as o, PageBody as r, StatusPill as s, EmptyState as t };
