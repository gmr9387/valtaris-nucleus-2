import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { g as Plus } from "./_libs/lucide-react.mjs";
import { a as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/auth-context-BNAOXFcn.mjs";
import { p as useMyOrganizations } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { n as logAudit } from "./_ssr/audit-CST1_a7C.mjs";
import { i as PageHeader, o as StatusDot, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
import { a as stringType, r as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.organizations-yfL_kzbo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var newOrgSchema = objectType({
	name: stringType().min(2).max(80),
	slug: stringType().min(2).max(60).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes")
});
function OrgsPage() {
	const orgs = useMyOrganizations();
	const { user } = useAuth();
	const { setCurrentOrgId } = useOrgStore();
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const create = useMutation({
		mutationFn: async () => {
			const parsed = newOrgSchema.parse({
				name,
				slug
			});
			const { data, error } = await supabase.from("organizations").insert({
				name: parsed.name,
				slug: parsed.slug,
				created_by: user.id
			}).select().single();
			if (error) throw error;
			await logAudit({
				organization_id: data.id,
				module: "tenancy",
				entity_type: "organization",
				entity_id: data.id,
				action: "create",
				after: data
			});
			return data;
		},
		onSuccess: (data) => {
			toast.success("Organization created");
			setCurrentOrgId(data.id);
			setName("");
			setSlug("");
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["my-orgs"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "TENANCY",
		title: "Organizations",
		description: "Top-level tenants. Every project, user and audit event belongs to one.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New organization"]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "input",
						value: name,
						onChange: (e) => {
							setName(e.target.value);
							setSlug(slugify(e.target.value));
						},
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Slug",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "input font-mono",
						value: slug,
						onChange: (e) => setSlug(e.target.value),
						required: true
					})
				})]
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
		orgs.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					children: orgs.data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-surface-2/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: o.name
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: o.slug
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: o.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: o.status
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: new Date(o.created_at).toLocaleDateString()
							}) })
						]
					}, o.id))
				})]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No organizations yet",
			description: "Create your first organization to start using ValtariOS Core.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setOpen(true),
				className: "inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New organization"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldStyles, {})
	] })] });
}
function slugify(s) {
	return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium text-muted-foreground",
			children: label
		}), children]
	});
}
function Th({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-3 py-2.5 text-left font-medium tracking-widest",
		children
	});
}
function Td({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: "px-3 py-2.5",
		children
	});
}
function FieldStyles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
      .input {
        width: 100%; height: 36px; padding: 0 10px;
        background: var(--color-surface-2); color: var(--color-foreground);
        border: 1px solid var(--color-border); border-radius: 6px;
        font-size: 14px; outline: none;
      }
      .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-ring); }
      select.input { appearance: none; }
    ` });
}
//#endregion
export { Field, FieldStyles, Td, Th, OrgsPage as component };
