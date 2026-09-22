import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { g as Plus } from "./_libs/lucide-react.mjs";
import { a as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/auth-context-BNAOXFcn.mjs";
import { d as useEnvironments, f as useMyOrgMembership, h as useProjects, n as canManageProjects } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { n as logAudit, t as createCorrelationId } from "./_ssr/audit-CST1_a7C.mjs";
import { a as Th, i as Td, n as FieldStyles, t as Field } from "./_app.organizations-C167SJ8c.mjs";
import { i as PageHeader, o as StatusDot, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { a as stringType, n as enumType, r as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.environments-B_PGdchj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	project_id: stringType().uuid(),
	name: stringType().trim().min(1).max(60),
	env_type: enumType([
		"development",
		"staging",
		"production"
	])
});
function EnvsPage() {
	const { currentOrgId } = useOrgStore();
	const { user } = useAuth();
	const envs = useEnvironments(currentOrgId);
	const projects = useProjects(currentOrgId);
	const membership = useMyOrgMembership(currentOrgId);
	const canCreate = canManageProjects(membership.data?.role);
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [projectId, setProjectId] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [envType, setEnvType] = (0, import_react.useState)("development");
	(0, import_react.useEffect)(() => {
		if (!projectId && projects.data?.[0]?.id) setProjectId(projects.data[0].id);
	}, [projectId, projects.data]);
	const create = useMutation({
		mutationFn: async () => {
			if (!currentOrgId) throw new Error("Select an organization first.");
			if (!user) throw new Error("You must be signed in.");
			if (!canCreate) throw new Error("You do not have permission to create environments.");
			const parsed = schema.parse({
				project_id: projectId,
				name,
				env_type: envType
			});
			const correlationId = createCorrelationId();
			const { data, error } = await supabase.from("environments").insert({
				project_id: parsed.project_id,
				name: parsed.name,
				env_type: parsed.env_type,
				created_by: user.id
			}).select().single();
			if (error) throw error;
			await logAudit({
				organization_id: currentOrgId,
				module: "tenancy",
				entity_type: "environment",
				entity_id: data.id,
				action: "create",
				after: data,
				correlation_id: correlationId
			});
			return data;
		},
		onSuccess: () => {
			toast.success("Environment created");
			setName("");
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["envs", currentOrgId] });
			qc.invalidateQueries({ queryKey: ["project-envs", projectId] });
			qc.invalidateQueries({ queryKey: ["audit", currentOrgId] });
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "TENANCY",
		title: "Environments",
		description: "Isolated runtime targets per project: development, staging, and production.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			disabled: !currentOrgId || !projects.data?.length || !canCreate,
			className: "inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
			title: !canCreate ? "Owner, admin, or manager role required" : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "New environment"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [
		!currentOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Select an organization",
			description: "Choose or create an organization before creating environments."
		}),
		currentOrgId && open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => {
				event.preventDefault();
				create.mutate();
			},
			className: "mb-6 rounded-lg border border-border bg-surface-1 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Project",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "input",
							value: projectId,
							onChange: (event) => setProjectId(event.target.value),
							required: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select project…"
							}), projects.data?.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: project.id,
								children: project.name
							}, project.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input",
							value: name,
							onChange: (event) => setName(event.target.value),
							required: true,
							maxLength: 60,
							placeholder: "Production"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "input",
							value: envType,
							onChange: (event) => setEnvType(event.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "development",
									children: "development"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "staging",
									children: "staging"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "production",
									children: "production"
								})
							]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					className: "h-9 rounded-md border border-border bg-surface-2 px-3 text-sm hover:bg-surface-3",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: create.isPending || !canCreate,
					className: "h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
					children: create.isPending ? "Creating…" : "Create"
				})]
			})]
		}),
		currentOrgId && envs.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-1 text-mono-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Project" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Type" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Created" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border bg-surface-1/40",
					children: envs.data.map((env) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-surface-2/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: env.project_name ?? "Unknown project"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs",
								children: env.name
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: env.env_type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: env.env_type
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: new Date(env.created_at).toLocaleDateString()
							}) })
						]
					}, env.id))
				})]
			})
		}) : currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No environments yet",
			description: projects.data?.length ? canCreate ? "Create one for an existing project." : "No environments are available yet." : "Create a project first."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldStyles, {})
	] })] });
}
//#endregion
export { EnvsPage as component };
