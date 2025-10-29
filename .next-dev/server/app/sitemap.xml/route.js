const CHUNK_PUBLIC_PATH = "server/app/sitemap.xml/route.js";
const runtime = require("../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/src_lib_prisma_ts_f3141a77._.js");
runtime.loadChunk("server/chunks/node_modules_next_dist_83206ac4._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__e2a08c8c._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/sitemap.xml/route/actions.js [app-rsc] (server actions loader, ecmascript)", CHUNK_PUBLIC_PATH);
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/src/app/sitemap.xml/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/src/app/sitemap.xml/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
