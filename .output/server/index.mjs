globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-22T17:45:17.189Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-22T17:45:17.189Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/ErrorState-DOIOMd2F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b53-KKX23ohHPUCimugOrfGUfLPTP9U\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 2899,
		"path": "../public/assets/ErrorState-DOIOMd2F.js"
	},
	"/assets/LoadingState-BCpbRz9n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22a-6BX/kRiXaqCwdWwZM08tSe23h+I\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 554,
		"path": "../public/assets/LoadingState-BCpbRz9n.js"
	},
	"/assets/QueryErrorResetBoundary-CXvnqFzx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-UnEg3OJol73aOR80fi/OPVCTXN8\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 226,
		"path": "../public/assets/QueryErrorResetBoundary-CXvnqFzx.js"
	},
	"/assets/RouteErrorComponent-XTrQttvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5be-syKWr2DvAH7pPfpxnnXvqD5qNSQ\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 1470,
		"path": "../public/assets/RouteErrorComponent-XTrQttvi.js"
	},
	"/assets/_app-C1u1oKhn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18896-pSYr4NFwyITFd9bDoIX8VwXK2xM\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 100502,
		"path": "../public/assets/_app-C1u1oKhn.js"
	},
	"/assets/_app-CWZI5FIM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d-5EGUcsi7wDxyd28ft0I+ykHo3k0\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 93,
		"path": "../public/assets/_app-CWZI5FIM.js"
	},
	"/assets/_app-CxtmcP-O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a-sexqmJcGq2aQZ/qxZcm8dS/bzEk\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 90,
		"path": "../public/assets/_app-CxtmcP-O.js"
	},
	"/assets/_app.audit-DA1nICcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-xCbTm3R0BArr5JJkARa7z+YiPKM\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 5180,
		"path": "../public/assets/_app.audit-DA1nICcU.js"
	},
	"/assets/_app.connectors-BSjgNqY2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a3d-0+YNXKqKwvEXni55gkS10sz1Qz4\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 14909,
		"path": "../public/assets/_app.connectors-BSjgNqY2.js"
	},
	"/assets/_app.core-9glsktPf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b4f-RD5r+/U6Vym280KoFKGU4NjE1KY\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 11087,
		"path": "../public/assets/_app.core-9glsktPf.js"
	},
	"/assets/_app.dashboard-D3WMR3mG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15bc-Vp0FuOX/S3nTEq7csGdY+Lo/AsY\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 5564,
		"path": "../public/assets/_app.dashboard-D3WMR3mG.js"
	},
	"/assets/_app.decisions-6ArYoNja.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aea-YX/yk2cRTL0yFPXVzK1Cv0c946E\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 6890,
		"path": "../public/assets/_app.decisions-6ArYoNja.js"
	},
	"/assets/_app.evidence-xTZUwgkd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-Wahh2nPeT5F0Lje3ublACxyKFYs\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 6691,
		"path": "../public/assets/_app.evidence-xTZUwgkd.js"
	},
	"/assets/_app.governance-QVlhXeIF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"186f-b7/3PR482kSH9LN7WVDZ/ZUSwM0\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 6255,
		"path": "../public/assets/_app.governance-QVlhXeIF.js"
	},
	"/assets/_app.organizations-B7Ncbh0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ea-zivqOjtGGtAHok7iFepoPynn4vo\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 5098,
		"path": "../public/assets/_app.organizations-B7Ncbh0k.js"
	},
	"/assets/_app.projects-BEoz51w6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1114-92eqwj2JdG8l1HwtlgGj+qJk4LQ\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 4372,
		"path": "../public/assets/_app.projects-BEoz51w6.js"
	},
	"/assets/_app.secrets-DoOYcDjj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48cd-zwxkcg2+6caFQ7Hi6zXfNqOEytc\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 18637,
		"path": "../public/assets/_app.secrets-DoOYcDjj.js"
	},
	"/assets/_app.telemetry-DkvQkVkh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c4-ZXH39A0wl4WdzFNJ6pnhw4kT4KA\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 6340,
		"path": "../public/assets/_app.telemetry-DkvQkVkh.js"
	},
	"/assets/_app.users-BaVuXICJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bab-fijTBsPXFpBOutj53Yj2w8N6A2I\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 2987,
		"path": "../public/assets/_app.users-BaVuXICJ.js"
	},
	"/assets/_app.workflows-BnG39D9B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123f-/KQefE/iDT7j7cp5VK5xjZ1ceWc\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 4671,
		"path": "../public/assets/_app.workflows-BnG39D9B.js"
	},
	"/assets/_app.workflows._workflowId.runs-B4ajxAPt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"952-HAXnbMmqV9fYa8+gddTktwpeU3s\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 2386,
		"path": "../public/assets/_app.workflows._workflowId.runs-B4ajxAPt.js"
	},
	"/assets/_app.workflows._workflowId-XtOllHKJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1af0-yFaUcuPuoIlniEGb1fxUTzoFWDU\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 6896,
		"path": "../public/assets/_app.workflows._workflowId-XtOllHKJ.js"
	},
	"/assets/_app.environments-C79c8-xW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1415-z3RidxTqKdCEBt2z9dAx+Qjb6KI\"",
		"mtime": "2026-09-22T17:45:14.896Z",
		"size": 5141,
		"path": "../public/assets/_app.environments-C79c8-xW.js"
	},
	"/assets/_app.workflows.runs._runId-Y37n7-ir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18a0-4rNGRVgGCJB2u4chZyfNUBCrNKM\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 6304,
		"path": "../public/assets/_app.workflows.runs._runId-Y37n7-ir.js"
	},
	"/assets/activity-DjASkSWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea-KvgWQkIWoMnI1fUnFr1Y2dlnh28\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 234,
		"path": "../public/assets/activity-DjASkSWb.js"
	},
	"/assets/arrow-left-Bg--rWLm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-01DcNJd1XeTfQyDOi1/MP9gxUUI\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 165,
		"path": "../public/assets/arrow-left-Bg--rWLm.js"
	},
	"/assets/audit-BuSdmfCZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-RpJyePPjfG+Umksg0+Z16yEKnGA\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 500,
		"path": "../public/assets/audit-BuSdmfCZ.js"
	},
	"/assets/circle-check-Cio-Ez7v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-OL+8nS7cabZHdXpXeQ2Omc/fB/Q\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 178,
		"path": "../public/assets/circle-check-Cio-Ez7v.js"
	},
	"/assets/circle-x-DbYCIVO2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-6rn34KHfbz9UbjHuRSXKgC7eQxg\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 207,
		"path": "../public/assets/circle-x-DbYCIVO2.js"
	},
	"/assets/clock-3-BwFtnWtq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-p6b7U8TzOeNkavouubwLyyuxiIU\"",
		"mtime": "2026-09-22T17:45:14.897Z",
		"size": 169,
		"path": "../public/assets/clock-3-BwFtnWtq.js"
	},
	"/assets/cpu-FgpOd12c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-j/UQ1+872bc4X62x4I6DmAo+VxM\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 642,
		"path": "../public/assets/cpu-FgpOd12c.js"
	},
	"/assets/database-SGHK0alF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-Qv0qHkzpf8BSpPSOwmNwb6Ky9fk\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 243,
		"path": "../public/assets/database-SGHK0alF.js"
	},
	"/assets/createLucideIcon-C_LCJTxh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-O9+czQKFHMACYTYdFrR18PV0PjE\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-C_LCJTxh.js"
	},
	"/assets/file-text-BsrP2OTl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-2Jqpz5mE3PKDd94tjOJ7sGa135M\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 385,
		"path": "../public/assets/file-text-BsrP2OTl.js"
	},
	"/assets/git-branch-DaPzYMJj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5-3RBL5aYLIQ52kh0nT5XPfPbbZj0\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 229,
		"path": "../public/assets/git-branch-DaPzYMJj.js"
	},
	"/assets/jsx-runtime-Dk72oS4N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2246-jdmifwUklrWzVvkkm/k29uuTwFE\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 8774,
		"path": "../public/assets/jsx-runtime-Dk72oS4N.js"
	},
	"/assets/key-round-D_R5ZEqS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-xVv79rskI5WcsfXTWHoP2ikRr4A\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 355,
		"path": "../public/assets/key-round-D_R5ZEqS.js"
	},
	"/assets/link-DkktsNXx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b24-pCMMXAiuMZIJDWu+T7DiQMkEI9A\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 23332,
		"path": "../public/assets/link-DkktsNXx.js"
	},
	"/assets/lock-keyhole-C4HlfLMn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-nYtT2kXeQEqLlT9+JGz/qMAfvtk\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 255,
		"path": "../public/assets/lock-keyhole-C4HlfLMn.js"
	},
	"/assets/login-DhHD1mhL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ce-iPS+NtWKKe7BBtD8r8/d5g7hyeQ\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 4302,
		"path": "../public/assets/login-DhHD1mhL.js"
	},
	"/assets/org-store-CmwX6Y9V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5d-65UmvUKIB/HK06PFuRPeMiaEgAU\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 2653,
		"path": "../public/assets/org-store-CmwX6Y9V.js"
	},
	"/assets/platform-ui-DE6JgWhu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb1-PRxwzNYBcGSgmSKbzPkHzg0luM0\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 3761,
		"path": "../public/assets/platform-ui-DE6JgWhu.js"
	},
	"/assets/plug-zap-LpBBi4R7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-ZekI100fYESBp2FLIck+/iiZDsU\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 353,
		"path": "../public/assets/plug-zap-LpBBi4R7.js"
	},
	"/assets/plus-CHXFBTJV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-9PMiyrW6hvk+qCdlyo3QNd1ui0E\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 153,
		"path": "../public/assets/plus-CHXFBTJV.js"
	},
	"/assets/qss-Bqk2G4CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-2N+JPG3965eWSB0QcbrDwgkqrgU\"",
		"mtime": "2026-09-22T17:45:14.898Z",
		"size": 444,
		"path": "../public/assets/qss-Bqk2G4CH.js"
	},
	"/assets/queries-CrPt38D8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157b-BS742VpFHZBJdlr8mrbwXTHqRYc\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 5499,
		"path": "../public/assets/queries-CrPt38D8.js"
	},
	"/assets/index-29vwD-WV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a10c7-JOeIi5/tr1iArcMaSi7/C5EA3i8\"",
		"mtime": "2026-09-22T17:45:14.895Z",
		"size": 659655,
		"path": "../public/assets/index-29vwD-WV.js"
	},
	"/assets/queries-DXLdt-5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a7-IN4oDvumyDqCK1fLS/cZVGHYihA\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 1959,
		"path": "../public/assets/queries-DXLdt-5N.js"
	},
	"/assets/react-dom-CxAQt2Ay.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f17-pkyc8i9fR8ycdAMyclNWgBjMoyQ\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 3863,
		"path": "../public/assets/react-dom-CxAQt2Ay.js"
	},
	"/assets/refresh-ccw-DWPhVYFD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-0mMed7aIBrTjLhW+lfJFhwCbj6k\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 321,
		"path": "../public/assets/refresh-ccw-DWPhVYFD.js"
	},
	"/assets/routes-B9zv7kyj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2e-DRdAGJjjsuTA+4MxE15P6v1P1LY\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 2862,
		"path": "../public/assets/routes-B9zv7kyj.js"
	},
	"/assets/runtime-ByOmKQCg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131a-nr2oXGtVwaek7PKljtjNK0UMo2k\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 4890,
		"path": "../public/assets/runtime-ByOmKQCg.js"
	},
	"/assets/search-BfnvExII.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-J+m1+o1gTqjs1kxwUFOBRANg4Vs\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 174,
		"path": "../public/assets/search-BfnvExII.js"
	},
	"/assets/server-Bfq8YFwz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e2-ZpkJ4xWcwhGIqjlKoBKJBewxZps\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 1250,
		"path": "../public/assets/server-Bfq8YFwz.js"
	},
	"/assets/shield-check-CYIDD2sb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-/8RrycWmkeYHtAQ3kBFYkgeXzHg\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 320,
		"path": "../public/assets/shield-check-CYIDD2sb.js"
	},
	"/assets/styles-Cf5EAn1u.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"151f5-prh52Tnl046wpir3YR7vrb+kJYU\"",
		"mtime": "2026-09-22T17:45:14.900Z",
		"size": 86517,
		"path": "../public/assets/styles-Cf5EAn1u.css"
	},
	"/assets/triangle-alert-Bg3Nz-m7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-43AV5wX26/GkBDufTt5SbE9XqkQ\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-Bg3Nz-m7.js"
	},
	"/assets/useMutation-Djh6eQ_g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"927-UklDg9UOloUrD3LazlHMnuJxy54\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 2343,
		"path": "../public/assets/useMutation-Djh6eQ_g.js"
	},
	"/assets/useNavigate-CcfTtIfv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"508-kU9ddWOqfS7U6b39z+oj/DaK6SQ\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 1288,
		"path": "../public/assets/useNavigate-CcfTtIfv.js"
	},
	"/assets/useQuery-V6vZTMzl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec8-xVViAdc3Kb4t/JzTZk7yZF5wnTE\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 7880,
		"path": "../public/assets/useQuery-V6vZTMzl.js"
	},
	"/assets/useRouter-BWuYVZyj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-U1ZzK0eROVVNcRQXWMxE1xpT0F4\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 151,
		"path": "../public/assets/useRouter-BWuYVZyj.js"
	},
	"/assets/users-BwZkkB-R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-/qxTNuzoVz7CzX59XMdhKdTAMeE\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 306,
		"path": "../public/assets/users-BwZkkB-R.js"
	},
	"/assets/utils-ClgBrqTa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6be6-LTdvIzJ6TDb7ZBeeQLe82+YkY3g\"",
		"mtime": "2026-09-22T17:45:14.899Z",
		"size": 27622,
		"path": "../public/assets/utils-ClgBrqTa.js"
	},
	"/assets/workflow-DQ111dAU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-LsCw7/w6ccpGCkJPP4bIqy50ZSs\"",
		"mtime": "2026-09-22T17:45:14.900Z",
		"size": 265,
		"path": "../public/assets/workflow-DQ111dAU.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_JFuDjx = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_JFuDjx
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
