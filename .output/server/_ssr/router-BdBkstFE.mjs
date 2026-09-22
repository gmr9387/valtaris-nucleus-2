import { t as supabase } from "./client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as AuthProvider } from "./auth-context-BNAOXFcn.mjs";
import { r as Route$16 } from "../_app.organizations-C167SJ8c.mjs";
import { a as stringType, n as enumType, r as objectType } from "../_libs/zod.mjs";
import { t as Route$17 } from "../_app.workflows._workflowId-CTOldeY8.mjs";
import { t as Route$18 } from "../_app.workflows._workflowId.runs-BxFYGxKc.mjs";
import { t as Route$19 } from "../_app.workflows.runs._runId-DVKYLZBJ.mjs";
import { t as Route$20 } from "./login-BWNME8Ko.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BdBkstFE.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Cf5EAn1u.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mono-xs text-muted-foreground",
					children: "404 — NOT_FOUND"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-semibold tracking-tight",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Return to console"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mono-xs text-destructive",
					children: "RUNTIME_ERROR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-xl font-semibold",
					children: "Something broke"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Try again"
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ValtariOS Core" },
			{
				name: "description",
				content: "ValtariOS Core — shared platform layer."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' rx='3' fill='%23437dff'/%3E%3C/svg%3E"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			theme: "dark",
			position: "bottom-right"
		})] })
	});
}
var $$splitComponentImporter$14 = () => import("./routes-DzLZpsZn.mjs");
var Route$14 = createFileRoute("/")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await supabase.auth.getSession();
		if (data.session) throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitNotFoundComponentImporter = () => import("../_app-Cfrhe5Ds.mjs");
var $$splitErrorComponentImporter = () => import("../_app-B1TmGgWs.mjs");
var $$splitComponentImporter$13 = () => import("../_app-BbAwUTR6.mjs");
var Route$13 = createFileRoute("/_app")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$12 = () => import("../_app.audit-C7sC3kaP.mjs");
var Route$12 = createFileRoute("/_app/audit")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("../_app.connectors-BK6vHHth.mjs");
var Route$11 = createFileRoute("/_app/connectors")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("../_app.core-zaX9y7y6.mjs");
var Route$10 = createFileRoute("/_app/core")({
	head: () => ({ meta: [{ title: "Core — ValtariOS" }, {
		name: "description",
		content: "ValtariOS Core — operations readiness and module registry for the shared platform substrate."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_app.dashboard-DqBsMtzV.mjs");
var Route$9 = createFileRoute("/_app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_app.decisions-DjzpOC5r.mjs");
var Route$8 = createFileRoute("/_app/decisions")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("../_app.environments-B_PGdchj.mjs");
var Route$7 = createFileRoute("/_app/environments")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
objectType({
	project_id: stringType().uuid(),
	name: stringType().trim().min(1).max(60),
	env_type: enumType([
		"development",
		"staging",
		"production"
	])
});
var $$splitComponentImporter$6 = () => import("../_app.evidence-jOeawDdd.mjs");
var Route$6 = createFileRoute("/_app/evidence")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("../_app.governance-BhhPy4br.mjs");
var Route$5 = createFileRoute("/_app/governance")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_app.projects-uWnHUpTu.mjs");
var Route$4 = createFileRoute("/_app/projects")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_app.secrets-QVEWar6b.mjs");
var Route$3 = createFileRoute("/_app/secrets")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_app.telemetry-B8_WosnA.mjs");
var Route$2 = createFileRoute("/_app/telemetry")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_app.users-BoT2vfWG.mjs");
var Route$1 = createFileRoute("/_app/users")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_app.workflows-C0mzzuhb.mjs");
var Route = createFileRoute("/_app/workflows")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AppRoute = Route$13.update({
	id: "/_app",
	getParentRoute: () => Route$15
});
var LoginRoute = Route$20.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$15
});
var AppAuditRoute = Route$12.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AppRoute
});
var AppConnectorsRoute = Route$11.update({
	id: "/connectors",
	path: "/connectors",
	getParentRoute: () => AppRoute
});
var AppCoreRoute = Route$10.update({
	id: "/core",
	path: "/core",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppDecisionsRoute = Route$8.update({
	id: "/decisions",
	path: "/decisions",
	getParentRoute: () => AppRoute
});
var AppEnvironmentsRoute = Route$7.update({
	id: "/environments",
	path: "/environments",
	getParentRoute: () => AppRoute
});
var AppEvidenceRoute = Route$6.update({
	id: "/evidence",
	path: "/evidence",
	getParentRoute: () => AppRoute
});
var AppGovernanceRoute = Route$5.update({
	id: "/governance",
	path: "/governance",
	getParentRoute: () => AppRoute
});
var AppOrganizationsRoute = Route$16.update({
	id: "/organizations",
	path: "/organizations",
	getParentRoute: () => AppRoute
});
var AppProjectsRoute = Route$4.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => AppRoute
});
var AppSecretsRoute = Route$3.update({
	id: "/secrets",
	path: "/secrets",
	getParentRoute: () => AppRoute
});
var AppTelemetryRoute = Route$2.update({
	id: "/telemetry",
	path: "/telemetry",
	getParentRoute: () => AppRoute
});
var AppUsersRoute = Route$1.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AppRoute
});
var AppWorkflowsRoute = Route.update({
	id: "/workflows",
	path: "/workflows",
	getParentRoute: () => AppRoute
});
var AppWorkflowsWorkflowIdRoute = Route$17.update({
	id: "/$workflowId",
	path: "/$workflowId",
	getParentRoute: () => AppWorkflowsRoute
});
var AppWorkflowsWorkflowIdRunsRoute = Route$18.update({
	id: "/runs",
	path: "/runs",
	getParentRoute: () => AppWorkflowsWorkflowIdRoute
});
var AppWorkflowsRunsRunIdRoute = Route$19.update({
	id: "/runs/$runId",
	path: "/runs/$runId",
	getParentRoute: () => AppWorkflowsRoute
});
var AppWorkflowsWorkflowIdRouteChildren = { AppWorkflowsWorkflowIdRunsRoute };
var AppWorkflowsRouteChildren = {
	AppWorkflowsWorkflowIdRoute: AppWorkflowsWorkflowIdRoute._addFileChildren(AppWorkflowsWorkflowIdRouteChildren),
	AppWorkflowsRunsRunIdRoute
};
var AppRouteChildren = {
	AppAuditRoute,
	AppConnectorsRoute,
	AppCoreRoute,
	AppDashboardRoute,
	AppDecisionsRoute,
	AppEnvironmentsRoute,
	AppEvidenceRoute,
	AppGovernanceRoute,
	AppOrganizationsRoute,
	AppProjectsRoute,
	AppSecretsRoute,
	AppTelemetryRoute,
	AppUsersRoute,
	AppWorkflowsRoute: AppWorkflowsRoute._addFileChildren(AppWorkflowsRouteChildren)
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
