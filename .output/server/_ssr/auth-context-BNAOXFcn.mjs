import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CEGIMAqI.mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-BNAOXFcn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)({
	session: null,
	user: null,
	loading: true,
	signOut: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const router = useRouter();
	const qc = useQueryClient();
	const intentionalSignOutRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
			setSession(nextSession);
			if (event === "SIGNED_OUT") {
				qc.clear();
				if (!intentionalSignOutRef.current) toast.error("Session expired", { description: "Please sign in again to continue." });
				intentionalSignOutRef.current = false;
			} else if (event === "TOKEN_REFRESHED") qc.invalidateQueries();
			else if (event === "SIGNED_IN") qc.invalidateQueries();
			queueMicrotask(() => router.invalidate());
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
		}).catch((error) => {}).finally(() => setLoading(false));
		return () => subscription.unsubscribe();
	}, [router, qc]);
	const signOut = async () => {
		intentionalSignOutRef.current = true;
		try {
			await supabase.auth.signOut();
		} catch (error) {
			intentionalSignOutRef.current = false;
			throw error;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			session,
			user: session?.user ?? null,
			loading,
			signOut
		},
		children
	});
}
var useAuth = () => (0, import_react.useContext)(Ctx);
//#endregion
export { useAuth as n, AuthProvider as t };
