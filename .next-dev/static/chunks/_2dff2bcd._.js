(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/PerformanceOptimizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PerformanceOptimizer,
    "imageCache",
    ()=>imageCache,
    "memoryManager",
    ()=>memoryManager,
    "performanceMonitor",
    ()=>performanceMonitor,
    "preloadCriticalResources",
    ()=>preloadCriticalResources,
    "useVirtualization",
    ()=>useVirtualization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
// Image cache management
class ImageCache {
    async preloadImage(src) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }
        if (this.loadingSet.has(src)) {
            return new Promise((resolve)=>{
                const checkLoaded = ()=>{
                    if (this.cache.has(src)) {
                        resolve(this.cache.get(src));
                    } else {
                        setTimeout(checkLoaded, 50);
                    }
                };
                checkLoaded();
            });
        }
        this.loadingSet.add(src);
        return new Promise((resolve, reject)=>{
            const img = new Image();
            img.onload = ()=>{
                this.cache.set(src, img);
                this.loadingSet.delete(src);
                resolve(img);
            };
            img.onerror = ()=>{
                this.loadingSet.delete(src);
                reject(new Error("Failed to load image: ".concat(src)));
            };
            img.src = src;
        });
    }
    preloadImages(urls) {
        return Promise.all(urls.map((url)=>this.preloadImage(url)));
    }
    clearCache() {
        this.cache.clear();
        this.loadingSet.clear();
    }
    getCacheSize() {
        return this.cache.size;
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "cache", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "loadingSet", new Set());
    }
}
const imageCache = new ImageCache();
// Performance monitoring
class PerformanceMonitor {
    initializeMetrics() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        this.metrics.navigationStart = performance.timeOrigin;
        // Load complete
        window.addEventListener('load', ()=>{
            this.metrics.loadComplete = performance.now();
        });
    }
    getMetrics() {
        return {
            ...this.metrics
        };
    }
    logMetrics() {
        if ("TURBOPACK compile-time truthy", 1) {
            console.group('🚀 Performance Metrics');
            console.log('Load Complete:', this.metrics.loadComplete.toFixed(2), 'ms');
            console.log('Image Cache Size:', imageCache.getCacheSize());
            console.groupEnd();
        }
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "metrics", {
            navigationStart: 0,
            loadComplete: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0,
            firstInputDelay: 0
        });
        this.initializeMetrics();
    }
}
// Memory management
class MemoryManager {
    addCleanup(fn) {
        this.cleanup.push(fn);
    }
    performCleanup() {
        this.cleanup.forEach((fn)=>fn());
        this.cleanup = [];
    }
    monitorMemory() {
        if ("object" !== 'undefined' && 'memory' in performance) {
            const memory = performance.memory;
            const used = memory.usedJSHeapSize / 1048576; // MB
            const total = memory.totalJSHeapSize / 1048576; // MB
            const limit = memory.jsHeapSizeLimit / 1048576; // MB
            if ("TURBOPACK compile-time truthy", 1) {
                console.log("Memory: ".concat(used.toFixed(2), "MB / ").concat(total.toFixed(2), "MB (Limit: ").concat(limit.toFixed(2), "MB)"));
            }
            // Auto cleanup if memory usage is high
            if (used / limit > 0.8) {
                this.performCleanup();
                imageCache.clearCache();
            }
        }
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "cleanup", []);
    }
}
const performanceMonitor = new PerformanceMonitor();
const memoryManager = new MemoryManager();
const preloadCriticalResources = (resources)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    resources.forEach((resource)=>{
        const link = document.createElement('link');
        link.rel = 'preload';
        if (resource.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            link.as = 'image';
            imageCache.preloadImage(resource);
        } else if (resource.match(/\.(woff|woff2|ttf|otf)$/i)) {
            link.as = 'font';
            link.crossOrigin = 'anonymous';
        } else if (resource.match(/\.css$/i)) {
            link.as = 'style';
        } else if (resource.match(/\.js$/i)) {
            link.as = 'script';
        }
        link.href = resource;
        document.head.appendChild(link);
    });
};
const useVirtualization = (items, containerHeight, itemHeight)=>{
    _s();
    const [scrollTop, setScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [containerRef, setContainerRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
    const visibleItems = items.slice(startIndex, endIndex);
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;
    const handleScroll = (e)=>{
        setScrollTop(e.currentTarget.scrollTop);
    };
    return {
        visibleItems,
        totalHeight,
        offsetY,
        handleScroll,
        setContainerRef
    };
};
_s(useVirtualization, "19JZY/5RWsyc60vdyJtBhqes8Og=");
function PerformanceOptimizer(param) {
    let { children } = param;
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fcp: 0,
        lcp: 0,
        cls: 0,
        inp: 0,
        ttfb: 0,
        loadComplete: 0
    });
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadStartTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceOptimizer.useEffect": ()=>{
            setIsClient(true);
            loadStartTimeRef.current = performance.now();
        }
    }["PerformanceOptimizer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceOptimizer.useEffect": ()=>{
            if (!isClient) return;
            const handleLoad = {
                "PerformanceOptimizer.useEffect.handleLoad": ()=>{
                    const loadTime = performance.now() - loadStartTimeRef.current;
                    setMetrics({
                        "PerformanceOptimizer.useEffect.handleLoad": (prev)=>({
                                ...prev,
                                loadComplete: loadTime
                            })
                    }["PerformanceOptimizer.useEffect.handleLoad"]);
                }
            }["PerformanceOptimizer.useEffect.handleLoad"];
            if (document.readyState === 'complete') {
                handleLoad();
            } else {
                window.addEventListener('load', handleLoad);
            }
            return ({
                "PerformanceOptimizer.useEffect": ()=>{
                    window.removeEventListener('load', handleLoad);
                }
            })["PerformanceOptimizer.useEffect"];
        }
    }["PerformanceOptimizer.useEffect"], [
        isClient
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceOptimizer.useEffect": ()=>{
            if (!isClient) return;
            const logPerformance = {
                "PerformanceOptimizer.useEffect.logPerformance": ()=>{
                    console.group('🚀 Performance Metrics');
                    console.log('Load Complete:', metrics.loadComplete.toFixed(2), 'ms');
                    console.log('Image Cache Size:', imageCache.getCacheSize());
                    console.groupEnd();
                }
            }["PerformanceOptimizer.useEffect.logPerformance"];
            if (metrics.loadComplete > 0) {
                logPerformance();
            }
        }
    }["PerformanceOptimizer.useEffect"], [
        metrics,
        isClient
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceOptimizer.useEffect": ()=>{
            if (!isClient) return;
            // Monitor memory usage
            const monitorMemory = {
                "PerformanceOptimizer.useEffect.monitorMemory": ()=>{
                    if ('memory' in performance) {
                        const memory = performance.memory;
                        const used = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                        const total = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
                        const limit = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
                        if ("TURBOPACK compile-time truthy", 1) {
                            console.log("Memory: ".concat(used, "MB / ").concat(total, "MB (Limit: ").concat(limit, "MB)"));
                        }
                        // Auto cleanup if memory usage is high
                        if (parseFloat(used) / parseFloat(limit) > 0.8) {
                            memoryManager.performCleanup();
                            imageCache.clearCache();
                        }
                    }
                }
            }["PerformanceOptimizer.useEffect.monitorMemory"];
            const memoryInterval = setInterval(monitorMemory, 30000);
            return ({
                "PerformanceOptimizer.useEffect": ()=>clearInterval(memoryInterval)
            })["PerformanceOptimizer.useEffect"];
        }
    }["PerformanceOptimizer.useEffect"], [
        isClient
    ]);
    // Initialize performance monitoring on client-side
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceOptimizer.useEffect": ()=>{
            if (!isClient) return;
            // Preload critical resources
            const criticalImages = [
                '/favicon.svg',
                '/favicon-16x16.png'
            ];
            preloadCriticalResources(criticalImages);
            // Log performance metrics after page load
            const timeout = setTimeout({
                "PerformanceOptimizer.useEffect.timeout": ()=>{
                    performanceMonitor.logMetrics();
                }
            }["PerformanceOptimizer.useEffect.timeout"], 3000);
            const handleScroll = {
                "PerformanceOptimizer.useEffect.handleScroll": ()=>{
                    requestAnimationFrame({
                        "PerformanceOptimizer.useEffect.handleScroll": ()=>{
                        // Additional scroll logic if needed
                        }
                    }["PerformanceOptimizer.useEffect.handleScroll"]);
                }
            }["PerformanceOptimizer.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "PerformanceOptimizer.useEffect": ()=>{
                    clearTimeout(timeout);
                    window.removeEventListener('scroll', handleScroll);
                    // Cleanup on unmount
                    memoryManager.performCleanup();
                }
            })["PerformanceOptimizer.useEffect"];
        }
    }["PerformanceOptimizer.useEffect"], [
        isClient
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children || null
    }, void 0, false);
}
_s1(PerformanceOptimizer, "iaRQ+3LFE1ZSP2JlPHidK6bWVXg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PerformanceOptimizer;
var _c;
__turbopack_context__.k.register(_c, "PerformanceOptimizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PerformanceOptimizer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/PerformanceOptimizer.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
]);

//# sourceMappingURL=_2dff2bcd._.js.map