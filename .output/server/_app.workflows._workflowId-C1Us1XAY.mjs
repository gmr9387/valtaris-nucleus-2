import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { C as GitBranch, J as Archive, q as ArrowLeft, v as Play } from "./_libs/lucide-react.mjs";
import { t as ErrorState } from "./_ssr/ErrorState-C6IYvl2K.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient } from "./_libs/tanstack__react-query.mjs";
import { a as Panel, i as PageHeader, r as PageBody, s as StatusPill, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { t as LoadingState } from "./_ssr/LoadingState-CXQD3J30.mjs";
import { a as stringType, i as recordType, n as enumType, o as unknownType, r as objectType, t as arrayType } from "./_libs/zod.mjs";
import { o as useWorkflowVersions, t as useWorkflow } from "./_ssr/queries-B99uDuNs.mjs";
import { f as startWorkflow, n as archiveWorkflow, o as createDraftVersion, t as PermissionGate, u as publishVersion } from "./_ssr/runtime-C8NsL7P9.mjs";
import { t as Route } from "./_app.workflows._workflowId-CTOldeY8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.workflows._workflowId-C1Us1XAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var workflowStatusSchema = enumType([
	"draft",
	"active",
	"archived"
]);
enumType([
	"draft",
	"published",
	"archived"
]);
enumType([
	"pending",
	"running",
	"completed",
	"failed",
	"cancelled"
]);
enumType([
	"pending",
	"running",
	"completed",
	"failed",
	"skipped"
]);
objectType({
	organization_id: stringType().uuid(),
	name: stringType().min(1).max(120),
	description: stringType().max(1e3).optional().nullable()
});
objectType({
	id: stringType().uuid(),
	name: stringType().min(1).max(120).optional(),
	description: stringType().max(1e3).optional().nullable(),
	status: workflowStatusSchema.optional()
});
var workflowDefinitionSchema = objectType({ steps: arrayType(objectType({
	key: stringType().min(1).max(64).regex(/^[a-zA-Z0-9_.-]+$/),
	label: stringType().min(1).max(120),
	kind: stringType().min(1).max(64).default("task"),
	config: recordType(stringType(), unknownType()).optional()
})).min(1).max(200) });
objectType({
	workflow_id: stringType().uuid(),
	definition: workflowDefinitionSchema
});
objectType({
	workflow_id: stringType().uuid(),
	version_id: stringType().uuid(),
	input: unknownType().optional()
});
var SAMPLE_DEFINITION = JSON.stringify({ steps: [
	{
		key: "ingest",
		label: "Ingest input",
		kind: "task"
	},
	{
		key: "transform",
		label: "Transform payload",
		kind: "task"
	},
	{
		key: "emit",
		label: "Emit result",
		kind: "task"
	}
] }, null, 2);
function WorkflowDetailPage() {
	const { workflowId } = Route.useParams();
	const navigate = Route.useNavigate();
	const qc = useQueryClient();
	const workflow = useWorkflow(workflowId);
	const versions = useWorkflowVersions(workflowId);
	const [defText, setDefText] = (0, import_react.useState)(SAMPLE_DEFINITION);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const orgId = workflow.data?.organization_id ?? null;
	const latestPublished = versions.data?.find((v) => v.status === "published") ?? null;
	async function handleDraft() {
		if (!workflow.data) return;
		setBusy(true);
		setError(null);
		try {
			const parsed = workflowDefinitionSchema.parse(JSON.parse(defText));
			await createDraftVersion({
				workflow_id: workflow.data.id,
				organization_id: workflow.data.organization_id,
				definition: parsed
			});
			await qc.invalidateQueries({ queryKey: ["workflow-versions", workflowId] });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to draft version");
		} finally {
			setBusy(false);
		}
	}
	async function handlePublish(versionId) {
		if (!workflow.data) return;
		setBusy(true);
		setError(null);
		try {
			await publishVersion({
				version_id: versionId,
				workflow_id: workflow.data.id,
				organization_id: workflow.data.organization_id
			});
			await qc.invalidateQueries({ queryKey: ["workflow-versions", workflowId] });
			await qc.invalidateQueries({ queryKey: ["workflow", workflowId] });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to publish");
		} finally {
			setBusy(false);
		}
	}
	async function handleArchive() {
		if (!workflow.data) return;
		setBusy(true);
		try {
			await archiveWorkflow({
				workflow_id: workflow.data.id,
				organization_id: workflow.data.organization_id
			});
			await qc.invalidateQueries({ queryKey: ["workflow", workflowId] });
			await qc.invalidateQueries({ queryKey: ["workflows", orgId] });
		} finally {
			setBusy(false);
		}
	}
	async function handleStart() {
		if (!workflow.data || !latestPublished) return;
		setBusy(true);
		setError(null);
		try {
			const run = await startWorkflow({
				organization_id: workflow.data.organization_id,
				workflow_id: workflow.data.id,
				version_id: latestPublished.id
			});
			navigate({
				to: "/workflows/runs/$runId",
				params: { runId: run.id }
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to start run");
		} finally {
			setBusy(false);
		}
	}
	if (workflow.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {}) });
	if (workflow.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: workflow.error,
		onRetry: () => void workflow.refetch()
	}) });
	if (!workflow.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Workflow not found" }) });
	const wf = workflow.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "WORKFLOW",
		title: wf.name,
		description: wf.description ?? void 0,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/workflows",
					className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/workflows/$workflowId/runs",
					params: { workflowId: wf.id },
					className: "inline-flex h-8 items-center rounded-md border border-border bg-surface-2 px-3 text-xs",
					children: "Runs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
					permission: "workflows:run",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleStart,
						disabled: !latestPublished || busy || wf.status === "archived",
						className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }), "Start run"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
					permission: "workflows:admin",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleArchive,
						disabled: busy || wf.status === "archived",
						className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "h-3.5 w-3.5" }), "Archive"]
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: wf.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Created ", new Date(wf.created_at).toLocaleString()] })]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
				permission: "workflows:update",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Draft a new version",
					description: "Define ordered steps. Published versions are immutable.",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "h-4 w-4" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: defText,
							onChange: (e) => setDefText(e.target.value),
							rows: 10,
							spellCheck: false,
							className: "block w-full rounded-md border border-border bg-surface-2 px-3 py-2 font-mono text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleDraft,
							disabled: busy,
							className: "inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50",
							children: busy ? "Working…" : "Create draft version"
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Versions",
				description: "Drafts can be edited; published versions are frozen.",
				children: versions.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { rows: 2 }) : (versions.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No versions",
					description: "Draft the first version above."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: (versions.data ?? []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[80px_120px_1fr_160px] items-center gap-3 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs",
								children: ["v", v.version_number]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: v.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									"Created ",
									new Date(v.created_at).toLocaleString(),
									v.published_at && ` · Published ${new Date(v.published_at).toLocaleString()}`
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right",
								children: v.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
									permission: "workflows:publish",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handlePublish(v.id),
										disabled: busy,
										className: "inline-flex h-7 items-center rounded-md border border-border bg-surface-2 px-2 text-xs disabled:opacity-50",
										children: "Publish"
									})
								})
							})
						]
					}, v.id))
				})
			})
		]
	}) })] });
}
//#endregion
export { WorkflowDetailPage as component };
