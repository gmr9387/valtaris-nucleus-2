//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-EW5XaRGG.js
var manifest = {
	"1022704e651a69d54a85648947d572a6efce2f5846fae603654d2c11cf1b645e": {
		functionName: "rotateSecret_createServerFn_handler",
		importer: () => import("./_ssr/secrets.functions-DvomVMnG.mjs")
	},
	"7213c7e3392ff6eb7fda357d82919dccec11e5a436b70ea22a6014ebba333ed5": {
		functionName: "createSecret_createServerFn_handler",
		importer: () => import("./_ssr/secrets.functions-DvomVMnG.mjs")
	},
	"ac90ef031dadd001c5d05ad9692755046694eecd5f906c06ca35a780f511c8ac": {
		functionName: "deactivateSecret_createServerFn_handler",
		importer: () => import("./_ssr/secrets.functions-DvomVMnG.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
