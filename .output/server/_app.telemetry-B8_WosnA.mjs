import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { A as Database, H as ChartColumn, N as Clock3, Y as Activity, j as Cpu, l as ShieldAlert, t as Workflow } from "./_libs/lucide-react.mjs";
import { i as useAuditEvents } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { i as PageHeader, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.telemetry-B8_WosnA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TelemetryPage() {
	const { currentOrgId } = useOrgStore();
	const audit = useAuditEvents(currentOrgId);
	const metrics = (0, import_react.useMemo)(() => {
		const events = audit.data ?? [];
		const workflowEvents = events.filter((e) => e.module === "workflow" || e.module === "engine" || e.module === "connector");
		const securityEvents = events.filter((e) => e.action === "delete" || e.action === "sign_in" || e.action === "remove");
		const mutations = events.filter((e) => e.action === "create" || e.action === "update" || e.action === "delete");
		return {
			total: events.length,
			workflow: workflowEvents.length,
			security: securityEvents.length,
			mutations: mutations.length
		};
	}, [audit.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "OBSERVABILITY",
		title: "Telemetry",
		description: "Platform-wide operational intelligence for workflows, connectors, audit activity, latency, and system health."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No organization selected",
		description: "Telemetry is isolated per tenant organization."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Total Events",
						value: String(metrics.total),
						tone: "primary",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Workflow Events",
						value: String(metrics.workflow),
						tone: "success",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "State Mutations",
						value: String(metrics.mutations),
						tone: "warning",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Security Signals",
						value: String(metrics.security),
						tone: "danger",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Workflow Runtime",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-4 w-4" }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Queue Depth",
								value: "12"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Active Executions",
								value: "4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Retries",
								value: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Dead Letters",
								value: "0",
								tone: "text-status-paid"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Latency",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4" }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "API P95",
								value: "184ms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Workflow Avg",
								value: "1.8s"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Connector Avg",
								value: "420ms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Slow Requests",
								value: "2",
								tone: "text-status-pending"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Infrastructure",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-4 w-4" }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "DB Health",
								value: "Healthy",
								tone: "text-status-paid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Realtime",
								value: "Connected",
								tone: "text-status-paid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Edge Functions",
								value: "Operational"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatRow, {
								label: "Cache Hit Rate",
								value: "92%"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: "Recent Platform Activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Latest operational events across modules"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4 text-muted-foreground" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [(audit.data ?? []).slice(0, 12).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary",
									children: event.module
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: event.action
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [event.entity_type, event.entity_id ? ` · ${event.entity_id.slice(0, 8)}` : ""]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: new Date(event.created_at).toLocaleTimeString()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "observed"
							})]
						})]
					}, event.id)), audit.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-10 text-center text-sm text-muted-foreground",
						children: "No telemetry events captured yet."
					})]
				})]
			})
		]
	}) })] });
}
function MetricCard({ label, value, icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border p-4 ${tone === "success" ? "border-status-paid/20 bg-status-paid/5" : tone === "warning" ? "border-status-pending/20 bg-status-pending/5" : tone === "danger" ? "border-status-denied/20 bg-status-denied/5" : "border-primary/20 bg-primary/5"}`,
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
			className: "mt-3 text-3xl font-semibold tracking-tight",
			children: value
		})]
	});
}
function Panel({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3 p-4",
			children
		})]
	});
}
function StatRow({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `font-mono ${tone ?? "text-foreground"}`,
			children: value
		})]
	});
}
//#endregion
export { TelemetryPage as component };
