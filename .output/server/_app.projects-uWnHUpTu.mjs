import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { g as Plus } from "./_libs/lucide-react.mjs";
import { a as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/auth-context-BNAOXFcn.mjs";
import { h as useProjects } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { n as logAudit } from "./_ssr/audit-CST1_a7C.mjs";
import { a as Th, i as Td, n as FieldStyles, t as Field } from "./_app.organizations-C167SJ8c.mjs";
import { i as PageHeader, o as StatusDot, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { a as stringType, r as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.projects-uWnHUpTu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().min(2).max(80),
	slug: stringType().min(2).max(60).regex(/^[a-z0-9-]+$/),
	description: stringType().max(500).optional()
});
function ProjectsPage() {
	const { currentOrgId } = useOrgStore();
	const { user } = useAuth();
	const list = useProjects(currentOrgId);
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [desc, setDesc] = (0, import_react.useState)("");
	const create = useMutation({
		mutationFn: async () => {
			const parsed = schema.parse({
				name,
				slug,
				description: desc || void 0
			});
			const { data, error } = await supabase.from("projects").insert({
				organization_id: currentOrgId,
				name: parsed.name,
				slug: parsed.slug,
				description: parsed.description ?? null,
				created_by: user.id
			}).select().single();
			if (error) throw error;
			await logAudit({
				organization_id: currentOrgId,
				module: "tenancy",
				entity_type: "project",
				entity_id: data.id,
				action: "create",
				after: data
			});
			return data;
		},
		onSuccess: () => {
			toast.success("Project created");
			setName("");
			setSlug("");
			setDesc("");
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "TENANCY",
		title: "Projects",
		description: "Logical workspaces inside an organization. Each project owns environments and resources.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			disabled: !currentOrgId,
			className: "inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New project"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				create.mutate();
			},
			className: "mb-6 rounded-lg border border-border bg-surface-1 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input",
							value: name,
							onChange: (e) => {
								setName(e.target.value);
								setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60));
							},
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Slug",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input font-mono",
							value: slug,
							onChange: (e) => setSlug(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "input",
								style: {
									height: 72,
									paddingTop: 8
								},
								value: desc,
								onChange: (e) => setDesc(e.target.value),
								maxLength: 500
							})
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
					disabled: create.isPending,
					className: "h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
					children: create.isPending ? "Creating…" : "Create"
				})]
			})]
		}),
		list.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-1 text-mono-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Slug" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Created" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border bg-surface-1/40",
					children: list.data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-surface-2/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: p.name
							}), p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: p.description
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: p.slug
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: p.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: p.status
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: new Date(p.created_at).toLocaleDateString()
							}) })
						]
					}, p.id))
				})]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No projects yet",
			description: "Create a project to organize environments and resources."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldStyles, {})
	] })] });
}
//#endregion
export { ProjectsPage as component };
