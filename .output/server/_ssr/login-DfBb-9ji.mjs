import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useAuth } from "./auth-context-BNAOXFcn.mjs";
import { n as logAudit } from "./audit-CST1_a7C.mjs";
import { a as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as Route } from "./login-BWNME8Ko.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DfBb-9ji.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var credentials = objectType({
	email: stringType().email().max(254),
	password: stringType().min(8).max(72),
	fullName: stringType().min(1).max(120).optional()
});
function LoginPage() {
	const { mode: initialMode } = Route.useSearch();
	const [mode, setMode] = (0, import_react.useState)(initialMode ?? "signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { session } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (session) navigate({
			to: "/dashboard",
			replace: true
		});
	}, [session, navigate]);
	async function submit(e) {
		e.preventDefault();
		const parsed = credentials.safeParse({
			email,
			password,
			fullName: mode === "signup" ? fullName : void 0
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
			return;
		}
		setBusy(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/login`,
						data: { full_name: fullName }
					}
				});
				if (error) throw error;
				toast.success("Account created. Check your inbox to verify.");
				await logAudit({
					module: "auth",
					entity_type: "user",
					action: "sign_up"
				});
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				await logAudit({
					module: "auth",
					entity_type: "user",
					action: "sign_in"
				});
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Authentication failed";
			toast.error(msg);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center bg-background px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-6 rounded-sm bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold tracking-tight",
						children: "ValtariOS Core"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface-1 p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-mono-xs text-muted-foreground",
							children: mode === "signup" ? "CREATE_ACCOUNT" : "SIGN_IN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight",
							children: mode === "signup" ? "Create your account" : "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: mode === "signup" ? "Spin up an organization in seconds." : "Continue to the platform console."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "mt-6 space-y-3",
							children: [
								mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "input",
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										required: true,
										maxLength: 120,
										autoComplete: "name"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "input",
										type: "email",
										autoComplete: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true,
										maxLength: 254
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "input",
										type: "password",
										autoComplete: mode === "signup" ? "new-password" : "current-password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true,
										minLength: 8,
										maxLength: 72
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: busy,
									className: "mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
									children: busy ? "..." : mode === "signup" ? "Create account" : "Sign in"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 text-center text-sm text-muted-foreground",
							children: [
								mode === "signup" ? "Already have an account?" : "Need an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-foreground underline-offset-4 hover:underline",
									onClick: () => setMode(mode === "signup" ? "signin" : "signup"),
									children: mode === "signup" ? "Sign in" : "Create one"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .input {
          width: 100%; height: 38px; padding: 0 12px;
          background: var(--color-surface-2); color: var(--color-foreground);
          border: 1px solid var(--color-border); border-radius: 6px;
          font-size: 14px; outline: none; transition: border-color .15s, box-shadow .15s;
        }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-ring); }
      ` })
		]
	});
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
//#endregion
export { LoginPage as component };
