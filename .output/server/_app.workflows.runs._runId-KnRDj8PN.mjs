import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as CircleX, K as Ban, R as CircleCheck, q as ArrowLeft } from "./_libs/lucide-react.mjs";
import { t as ErrorState } from "./_ssr/ErrorState-C6IYvl2K.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient } from "./_libs/tanstack__react-query.mjs";
import { a as Panel, i as PageHeader, r as PageBody, s as StatusPill, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { t as LoadingState } from "./_ssr/LoadingState-CXQD3J30.mjs";
import { a as useWorkflowSteps, n as useWorkflowAuditEvents, r as useWorkflowRun } from "./_ssr/queries-B99uDuNs.mjs";
import { a as completeWorkflow, c as failStep, d as startStep, i as completeStep, l as failWorkflow, r as cancelWorkflow, t as PermissionGate } from "./_ssr/runtime-C8NsL7P9.mjs";
import { t as Route } from "./_app.workflows.runs._runId-DVKYLZBJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.workflows.runs._runId-KnRDj8PN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RunDetailPage() {
	const { runId } = Route.useParams();
	const qc = useQueryClient();
	const run = useWorkflowRun(runId);
	const steps = useWorkflowSteps(runId);
	const audit = useWorkflowAuditEvents({
		run_id: runId,
		limit: 200
	});
	const [stepKey, setStepKey] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const orgId = run.data?.organization_id ?? null;
	const isTerminal = run.data?.status === "completed" || run.data?.status === "failed" || run.data?.status === "cancelled";
	async function withBusy(fn) {
		setBusy(true);
		setError(null);
		try {
			await fn();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Action failed");
		} finally {
			setBusy(false);
		}
	}
	async function invalidate() {
		await Promise.all([
			qc.invalidateQueries({ queryKey: ["workflow-run", runId] }),
			qc.invalidateQueries({ queryKey: ["workflow-steps", runId] }),
			qc.invalidateQueries({ queryKey: [
				"workflow-audit",
				void 0,
				void 0,
				runId,
				200
			] })
		]);
	}
	if (run.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {}) });
	if (run.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: run.error,
		onRetry: () => void run.refetch()
	}) });
	if (!run.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Run not found" }) });
	const r = run.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "RUN",
		title: `Run ${r.id.slice(0, 8)}`,
		description: `Workflow ${r.workflow_id.slice(0, 8)} · version ${r.version_id.slice(0, 8)}`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/workflows/$workflowId/runs",
				params: { workflowId: r.workflow_id },
				className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Runs"]
			}), !isTerminal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PermissionGate, {
				permission: "workflows:run",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => withBusy(async () => {
						await completeWorkflow(orgId, r.id);
						await invalidate();
					}),
					disabled: busy,
					className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-status-paid/20 px-3 text-xs text-status-paid disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Complete"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => withBusy(async () => {
						await failWorkflow(orgId, r.id, { message: "Marked failed from console" });
						await invalidate();
					}),
					disabled: busy,
					className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-status-denied/20 px-3 text-xs text-status-denied disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), "Fail"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
				permission: "workflows:cancel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => withBusy(async () => {
						await cancelWorkflow(orgId, r.id, "Cancelled from console");
						await invalidate();
					}),
					disabled: busy,
					className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5" }), "Cancel"]
				})
			})] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: r.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Started ", r.started_at ? new Date(r.started_at).toLocaleString() : "—"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Completed ", r.completed_at ? new Date(r.completed_at).toLocaleString() : "—"] })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Steps",
				description: "Track individual step execution.",
				children: [!isTerminal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
					permission: "workflows:run",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: stepKey,
							onChange: (e) => setStepKey(e.target.value),
							placeholder: "step_key",
							className: "h-8 flex-1 rounded-md border border-border bg-surface-2 px-2 font-mono text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: busy || !stepKey.trim(),
							onClick: () => withBusy(async () => {
								await startStep({
									run_id: r.id,
									step_key: stepKey.trim()
								});
								setStepKey("");
								await invalidate();
							}),
							className: "inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50",
							children: "Start step"
						})]
					})
				}), steps.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { rows: 2 }) : (steps.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No steps yet" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: (steps.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_120px_160px_220px] items-center gap-3 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs",
								children: s.step_key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: s.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: s.started_at ? new Date(s.started_at).toLocaleString() : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end gap-2",
								children: s.status === "running" && !isTerminal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PermissionGate, {
									permission: "workflows:run",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										disabled: busy,
										onClick: () => withBusy(async () => {
											await completeStep({
												run_id: r.id,
												step_key: s.step_key
											});
											await invalidate();
										}),
										className: "inline-flex h-7 items-center rounded-md border border-border bg-surface-2 px-2 text-xs",
										children: "Complete"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										disabled: busy,
										onClick: () => withBusy(async () => {
											await failStep({
												run_id: r.id,
												step_key: s.step_key,
												error: { message: "Marked failed" }
											});
											await invalidate();
										}),
										className: "inline-flex h-7 items-center rounded-md border border-border bg-surface-2 px-2 text-xs",
										children: "Fail"
									})]
								})
							})
						]
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Audit trail",
				description: "Every runtime transition emits an event.",
				children: audit.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { rows: 2 }) : (audit.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No audit events yet" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: (audit.data ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[180px_1fr_180px] items-center gap-3 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-foreground",
								children: e.event_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-muted-foreground",
								children: e.payload ? JSON.stringify(e.payload) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right text-muted-foreground",
								children: new Date(e.occurred_at).toLocaleString()
							})
						]
					}, e.id))
				})
			})
		]
	}) })] });
}
//#endregion
export { RunDetailPage as component };
