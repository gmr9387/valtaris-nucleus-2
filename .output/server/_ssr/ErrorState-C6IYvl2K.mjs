import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as RefreshCcw, i as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ErrorState-C6IYvl2K.js
var import_jsx_runtime = require_jsx_runtime();
var AUTH_HINTS = [
	"jwt expired",
	"invalid jwt",
	"no authorization header",
	"invalid token",
	"unauthorized",
	"auth session missing"
];
function isAuthError(error) {
	if (!error) return false;
	const message = errorMessage(error).toLowerCase();
	return AUTH_HINTS.some((hint) => message.includes(hint)) || extractStatus(error) === 401;
}
function mapAuthError(error) {
	if (!error) return null;
	const status = extractStatus(error);
	const message = errorMessage(error);
	const lower = message.toLowerCase();
	if (lower.includes("jwt expired") || lower.includes("session missing")) return {
		code: "session_expired",
		message: "Your session has expired. Please sign in again.",
		raw: error
	};
	if (status === 401 || AUTH_HINTS.some((h) => lower.includes(h))) return {
		code: "unauthorized",
		message: "You are not authenticated. Please sign in.",
		raw: error
	};
	if (status === 403 || lower.includes("permission") || lower.includes("rls")) return {
		code: "forbidden",
		message: "You do not have permission to perform this action.",
		raw: error
	};
	if (status === 404) return {
		code: "not_found",
		message: "Resource not found.",
		raw: error
	};
	if (status === 409 || lower.includes("duplicate") || lower.includes("conflict")) return {
		code: "conflict",
		message: "This conflicts with existing data.",
		raw: error
	};
	if (status === 429) return {
		code: "rate_limited",
		message: "Too many requests. Try again shortly.",
		raw: error
	};
	if (lower.includes("failed to fetch") || lower.includes("network")) return {
		code: "network",
		message: "Network error. Check your connection.",
		raw: error
	};
	if (lower.includes("zod") || lower.includes("invalid input") || lower.includes("validation")) return {
		code: "validation",
		message: message || "Invalid input.",
		raw: error
	};
	return {
		code: "unknown",
		message: message || "Something went wrong.",
		raw: error
	};
}
function errorMessage(error) {
	if (!error) return "";
	if (typeof error === "string") return error;
	if (error instanceof Error) return error.message;
	if (typeof error === "object") {
		const anyErr = error;
		if (typeof anyErr.message === "string") return anyErr.message;
		if (typeof anyErr.error === "string") return anyErr.error;
	}
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
function extractStatus(error) {
	if (!error || typeof error !== "object") return void 0;
	const anyErr = error;
	if (typeof anyErr.status === "number") return anyErr.status;
	if (typeof anyErr.statusCode === "number") return anyErr.statusCode;
	if (typeof anyErr.code === "string") {
		const n = parseInt(anyErr.code, 10);
		if (!Number.isNaN(n)) return n;
	}
}
function ErrorState({ error, onRetry, title }) {
	const mapped = mapAuthError(error);
	const code = mapped?.code ?? "unknown";
	const message = mapped?.message ?? "Something went wrong.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 rounded-full border border-destructive/30 bg-destructive/10 p-3 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-mono-xs uppercase tracking-widest text-destructive",
				children: code.replace(/_/g, " ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium",
				children: title ?? "Request failed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-md text-sm text-muted-foreground",
				children: message
			}),
			onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onRetry,
				className: "mt-4 inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 text-xs hover:bg-surface-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "h-3 w-3" }), "Retry"]
			})
		]
	});
}
//#endregion
export { isAuthError as n, ErrorState as t };
