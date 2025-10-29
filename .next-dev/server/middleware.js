const CHUNK_PUBLIC_PATH = "server/middleware.js";
const runtime = require("./chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_next_e0ddd811._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__9106cb04._.js");
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \"[project]/src/middleware.ts [middleware] (ecmascript)\" } [middleware] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \"[project]/src/middleware.ts [middleware] (ecmascript)\" } [middleware] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
