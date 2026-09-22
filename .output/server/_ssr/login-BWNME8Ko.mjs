import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as enumType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BWNME8Ko.js
var $$splitComponentImporter = () => import("./login-DfBb-9ji.mjs");
var searchSchema = objectType({ mode: enumType(["signin", "signup"]).optional() });
var Route = createFileRoute("/login")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
