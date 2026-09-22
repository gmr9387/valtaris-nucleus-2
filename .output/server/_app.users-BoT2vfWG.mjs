import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { c as ShieldCheck, r as Users } from "./_libs/lucide-react.mjs";
import { m as useOrgMembers, p as useMyOrganizations } from "./_ssr/queries-CytnrJBF.mjs";
import { t as useOrgStore } from "./_ssr/org-store-DHMPJw-C.mjs";
import { a as Th, i as Td } from "./_app.organizations-C167SJ8c.mjs";
import { i as PageHeader, r as PageBody, t as EmptyState } from "./_ssr/platform-ui-8S9LjWBS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.users-BoT2vfWG.js
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const { currentOrgId } = useOrgStore();
	const orgs = useMyOrganizations();
	const members = useOrgMembers(currentOrgId);
	const current = orgs.data?.find((org) => org.id === currentOrgId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "IDENTITY",
		title: "Users & Roles",
		description: current ? `Members, roles, and access boundaries for ${current.name}.` : "Select an organization to view members and roles."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !currentOrgId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Select an organization",
		description: "Choose or create an organization before managing users.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
	}) : members.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-lg border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-surface-1 text-mono-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "User" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Role" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Access Level" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Joined" })
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-border bg-surface-1/40",
				children: members.data.map((member) => {
					const profile = Array.isArray(member.profiles) ? member.profiles[0] : member.profiles;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-surface-2/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: profile?.full_name || profile?.email || "Unknown user"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: profile?.email || member.user_id
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: member.role }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), roleDescription(member.role)]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: new Date(member.created_at).toLocaleDateString()
							}) })
						]
					}, member.id);
				})
			})]
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No members visible",
		description: "Member invitations, role changes, and access reviews land in Core Phase 2.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
	}) })] });
}
function RoleBadge({ role }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-md border px-2 py-0.5 text-mono-xs ${role === "owner" ? "border-primary/30 bg-primary/10 text-primary" : role === "admin" ? "border-status-cob/30 bg-status-cob/10 text-status-cob" : role === "manager" ? "border-status-pending/30 bg-status-pending/10 text-status-pending" : role === "operator" ? "border-status-paid/30 bg-status-paid/10 text-status-paid" : "border-border bg-surface-2 text-muted-foreground"}`,
		children: role.toUpperCase()
	});
}
function roleDescription(role) {
	switch (role) {
		case "owner": return "Full platform ownership";
		case "admin": return "Administration + configuration";
		case "manager": return "Project and environment management";
		case "operator": return "Operational execution";
		default: return "Read-only access";
	}
}
//#endregion
export { UsersPage as component };
