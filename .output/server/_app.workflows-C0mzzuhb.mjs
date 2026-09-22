import { n as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { g as Plus, t as Workflow } from "./_libs/lucide-react.mjs";
import { t as ErrorState } from "./_ssr/ErrorState-C6IYvl2K.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient } from "./_libs/tanstack__react-query.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { a as Panel, i as PageHeader, r as PageBody, s as StatusPill, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { t as LoadingState } from "./_ssr/LoadingState-CXQD3J30.mjs";
import { s as useWorkflows } from "./_ssr/queries-B99uDuNs.mjs";
import { s as createWorkflow, t as PermissionGate } from "./_ssr/runtime-C8NsL7P9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.workflows-C0mzzuhb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkflowsPage() {
	const { currentOrgId } = useOrgStore();
	const workflows = useWorkflows(currentOrgId);
	const qc = useQueryClient();
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function handleCreate(e) {
		e.preventDefault();
		if (!currentOrgId || !name.trim()) return;
		setSubmitting(true);
		setError(null);
		try {
			await createWorkflow({
				organization_id: currentOrgId,
				name: name.trim(),
				description: description.trim() || null
			});
			setName("");
			setDescription("");
			setCreating(false);
			await qc.invalidateQueries({ queryKey: ["workflows", currentOrgId] });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create workflow");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "INFRASTRUCTURE",
		title: "Workflows",
		description: "Definitions, versions, and runs. Shared runtime substrate for ValtariOS products.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionGate, {
			permission: "workflows:create",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setCreating((v) => !v),
				className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "New workflow"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Select an organization",
		description: "Workflows are tenant-scoped.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-5 w-5" })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "New workflow",
			description: "Creates a draft workflow. Add a version next.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreate,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-mono-xs text-muted-foreground",
						children: "NAME"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 120,
						required: true,
						className: "mt-1 block w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm",
						placeholder: "Claim Appeal Packet"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-mono-xs text-muted-foreground",
						children: "DESCRIPTION"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						maxLength: 1e3,
						rows: 2,
						className: "mt-1 block w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm"
					})] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50",
							children: submitting ? "Creating…" : "Create"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCreating(false),
							className: "inline-flex h-8 items-center rounded-md border border-border bg-surface-2 px-3 text-xs",
							children: "Cancel"
						})]
					})
				]
			})
		}), workflows.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading workflows…" }) : workflows.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			title: "Failed to load workflows",
			error: workflows.error,
			onRetry: () => void workflows.refetch()
		}) : (workflows.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No workflows yet",
			description: "Create the first workflow to anchor a versioned definition and runs.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-5 w-5" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-surface-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_120px_140px_160px] gap-3 border-b border-border px-5 py-2 text-mono-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "NAME" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "STATUS" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "UPDATED" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-right",
						children: "ACTION"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border",
				children: (workflows.data ?? []).map((wf) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_120px_140px_160px] items-center gap-3 px-5 py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: wf.name
							}), wf.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: wf.description
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: wf.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: new Date(wf.updated_at).toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/workflows/$workflowId",
								params: { workflowId: wf.id },
								className: "inline-flex h-7 items-center rounded-md border border-border bg-surface-2 px-2 text-xs hover:text-foreground",
								children: "Open"
							})
						})
					]
				}, wf.id))
			})]
		})]
	}) })] });
}
//#endregion
export { WorkflowsPage as component };
