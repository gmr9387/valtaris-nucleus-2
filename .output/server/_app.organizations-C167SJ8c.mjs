import { a as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.organizations-C167SJ8c.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_app.organizations-yfL_kzbo.mjs");
var Route = createFileRoute("/_app/organizations")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
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
export { Th as a, Td as i, FieldStyles as n, Route as r, Field as t };
