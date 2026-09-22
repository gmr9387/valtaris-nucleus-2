import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { q as ArrowLeft } from "./_libs/lucide-react.mjs";
import { t as ErrorState } from "./_ssr/ErrorState-C6IYvl2K.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as PageHeader, r as PageBody, s as StatusPill, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { t as LoadingState } from "./_ssr/LoadingState-CXQD3J30.mjs";
import { i as useWorkflowRuns, t as useWorkflow } from "./_ssr/queries-B99uDuNs.mjs";
import { t as Route } from "./_app.workflows._workflowId.runs-BxFYGxKc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.workflows._workflowId.runs-Cs5PJ6yc.js
var import_jsx_runtime = require_jsx_runtime();
function WorkflowRunsPage() {
	const { workflowId } = Route.useParams();
	const workflow = useWorkflow(workflowId);
	const runs = useWorkflowRuns(workflowId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "WORKFLOW RUNS",
		title: workflow.data?.name ?? "Runs",
		description: "Recent executions for this workflow.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/workflows/$workflowId",
			params: { workflowId },
			className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Workflow"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: runs.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {}) : runs.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: runs.error,
		onRetry: () => void runs.refetch()
	}) : (runs.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No runs yet",
		description: "Start a run from the workflow page."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_120px_180px_180px_120px] gap-3 border-b border-border px-5 py-2 text-mono-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "RUN ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "STATUS" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "STARTED" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "COMPLETED" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-right",
					children: "ACTION"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border",
			children: (runs.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_120px_180px_180px_120px] items-center gap-3 px-5 py-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-mono text-xs",
						children: r.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: r.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: r.started_at ? new Date(r.started_at).toLocaleString() : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: r.completed_at ? new Date(r.completed_at).toLocaleString() : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/workflows/runs/$runId",
							params: { runId: r.id },
							className: "inline-flex h-7 items-center rounded-md border border-border bg-surface-2 px-2 text-xs",
							children: "Open"
						})
					})
				]
			}, r.id))
		})]
	}) })] });
}
//#endregion
export { WorkflowRunsPage as component };
