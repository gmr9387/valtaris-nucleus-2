import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/org-store-DHMPJw-C.js
var useOrgStore = create()(persist((set) => ({
	currentOrgId: null,
	setCurrentOrgId: (id) => set({ currentOrgId: id })
}), { name: "valtaris.current_org" }));
//#endregion
export { useOrgStore as t };
