import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as isAuthError, t as ErrorState } from "./ErrorState-C6IYvl2K.mjs";
import { v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryErrorResetBoundary } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RouteErrorComponent-CEfLtt2V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function currentUserId() {
	try {
		const { data } = await supabase.auth.getUser();
		return data.user?.id ?? null;
	} catch {
		return null;
	}
}
/**
* Append-only telemetry event. Best-effort — never throws into caller.
*/
async function logTelemetryEvent(payload) {
	try {
		const userId = await currentUserId();
		if (!userId) return;
		const { error } = await supabase.from("telemetry_events").insert({
			organization_id: payload.organization_id ?? null,
			user_id: userId,
			module: payload.module,
			event_type: payload.event_type,
			severity: payload.severity ?? "info",
			trace_id: payload.trace_id ?? null,
			span_id: payload.span_id ?? null,
			correlation_id: payload.correlation_id ?? null,
			message: payload.message ?? null,
			attributes_json: payload.attributes ?? null
		});
	} catch (error) {}
}
/**
* Standardized route-level error component.
* Resets the query error boundary, logs telemetry, lets the user retry.
*/
function RouteErrorComponent({ error, reset }) {
	const router = useRouter();
	const qErr = useQueryErrorResetBoundary();
	(0, import_react.useEffect)(() => {
		qErr.reset();
		logTelemetryEvent({
			module: "router",
			event_type: "route.error",
			severity: isAuthError(error) ? "warn" : "error",
			message: error?.message ?? String(error)
		});
	}, [qErr, error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			error,
			onRetry: () => {
				router.invalidate();
				reset();
			}
		})
	});
}
function RouteNotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-mono-xs text-muted-foreground",
				children: "404 · NOT_FOUND"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-lg font-semibold",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "The page you're looking for doesn't exist in this workspace."
			})
		]
	});
}
//#endregion
export { RouteNotFoundComponent as n, RouteErrorComponent as t };
