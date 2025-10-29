module.exports = {

"[project]/.next-internal/server/app/api/auth/logout/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[project]/src/lib/security.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiRateLimit": (()=>apiRateLimit),
    "auditLogger": (()=>auditLogger),
    "authenticateAdmin": (()=>authenticateAdmin),
    "comparePassword": (()=>comparePassword),
    "default": (()=>__TURBOPACK__default__export__),
    "escapeHtml": (()=>escapeHtml),
    "escapeSQL": (()=>escapeSQL),
    "generateCSRFToken": (()=>generateCSRFToken),
    "generateSecureId": (()=>generateSecureId),
    "generateToken": (()=>generateToken),
    "getClientIP": (()=>getClientIP),
    "hashPassword": (()=>hashPassword),
    "loginRateLimit": (()=>loginRateLimit),
    "sanitizeInput": (()=>sanitizeInput),
    "securityHeaders": (()=>securityHeaders),
    "sessionManager": (()=>sessionManager),
    "validateCSRFToken": (()=>validateCSRFToken),
    "validatePassword": (()=>validatePassword),
    "validateRequest": (()=>validateRequest),
    "verifyToken": (()=>verifyToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
// نظام Rate Limiting مخصص للـ Edge Runtime
class EdgeRateLimit {
    attempts = new Map();
    windowMs;
    maxAttempts;
    constructor(windowMs, maxAttempts){
        this.windowMs = windowMs;
        this.maxAttempts = maxAttempts;
    }
    check(identifier) {
        const now = Date.now();
        const record = this.attempts.get(identifier);
        if (!record || now > record.resetTime) {
            // إنشاء سجل جديد أو إعادة تعيين
            this.attempts.set(identifier, {
                count: 1,
                resetTime: now + this.windowMs
            });
            return {
                allowed: true,
                remaining: this.maxAttempts - 1,
                resetTime: now + this.windowMs
            };
        }
        if (record.count >= this.maxAttempts) {
            return {
                allowed: false,
                remaining: 0,
                resetTime: record.resetTime
            };
        }
        record.count++;
        return {
            allowed: true,
            remaining: this.maxAttempts - record.count,
            resetTime: record.resetTime
        };
    }
    cleanup() {
        const now = Date.now();
        for (const [key, record] of this.attempts.entries()){
            if (now > record.resetTime) {
                this.attempts.delete(key);
            }
        }
    }
}
const loginRateLimit = new EdgeRateLimit(15 * 60 * 1000, 5);
const apiRateLimit = new EdgeRateLimit(15 * 60 * 1000, 100);
// تنظيف دوري كل 30 دقيقة
setInterval(()=>{
    loginRateLimit.cleanup();
    apiRateLimit.cleanup();
}, 30 * 60 * 1000);
const validatePassword = (password)=>{
    const errors = [];
    if (password.length < 8) {
        errors.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل');
    }
    if (!/\d/.test(password)) {
        errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل');
    }
    return {
        valid: errors.length === 0,
        errors
    };
};
const hashPassword = async (password)=>{
    const saltRounds = 14; // مستوى تشفير عالي للأمان
    return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, saltRounds);
};
const comparePassword = async (password, hash)=>{
    return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hash);
};
const generateToken = (payload, expiresIn = '24h')=>{
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        ...payload,
        iat: Math.floor(Date.now() / 1000),
        jti: generateSecureId()
    }, secret, {
        expiresIn,
        algorithm: 'HS256',
        issuer: 'aldeyar-jeddah',
        audience: 'aldeyar-admin'
    });
};
const verifyToken = (token)=>{
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, secret, {
            issuer: 'aldeyar-jeddah',
            audience: 'aldeyar-admin'
        });
    } catch (error) {
        throw new Error('Invalid token');
    }
};
const generateSecureId = ()=>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i = 0; i < 32; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
const sanitizeInput = (input)=>{
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>\"']/g, '') // إزالة الأحرف الخطيرة
    .replace(/\s+/g, ' ') // تطبيع المسافات
    .slice(0, 1000); // حد الطول
};
const escapeSQL = (input)=>{
    if (typeof input !== 'string') return '';
    return input.replace(/'/g, "''");
};
const escapeHtml = (unsafe)=>{
    if (typeof unsafe !== 'string') return '';
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};
const generateCSRFToken = ()=>{
    return generateSecureId();
};
const validateCSRFToken = (token, storedToken)=>{
    return token === storedToken;
};
class SessionManager {
    sessions = new Map();
    maxSessions = 5;
    sessionTimeout = 24 * 60 * 60 * 1000;
    createSession(adminId, ipAddress, userAgent) {
        const sessionId = generateSecureId();
        const now = new Date();
        // إزالة الجلسات القديمة لهذا المدير
        this.cleanupAdminSessions(adminId);
        const session = {
            id: sessionId,
            adminId,
            createdAt: now,
            lastActivity: now,
            ipAddress,
            userAgent
        };
        this.sessions.set(sessionId, session);
        return sessionId;
    }
    validateSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return null;
        // فحص انتهاء صلاحية الجلسة
        if (Date.now() - session.lastActivity.getTime() > this.sessionTimeout) {
            this.sessions.delete(sessionId);
            return null;
        }
        // تحديث آخر نشاط
        session.lastActivity = new Date();
        return session;
    }
    destroySession(sessionId) {
        this.sessions.delete(sessionId);
    }
    destroyAdminSessions(adminId) {
        for (const [sessionId, session] of this.sessions.entries()){
            if (session.adminId === adminId) {
                this.sessions.delete(sessionId);
            }
        }
    }
    cleanupAdminSessions(adminId) {
        const adminSessions = Array.from(this.sessions.entries()).filter(([_, session])=>session.adminId === adminId).sort(([_, a], [__, b])=>b.lastActivity.getTime() - a.lastActivity.getTime());
        // الاحتفاظ بالجلسات الأحدث فقط
        if (adminSessions.length >= this.maxSessions) {
            const sessionsToRemove = adminSessions.slice(this.maxSessions - 1);
            for (const [sessionId] of sessionsToRemove){
                this.sessions.delete(sessionId);
            }
        }
    }
    cleanupExpiredSessions() {
        const now = Date.now();
        for (const [sessionId, session] of this.sessions.entries()){
            if (now - session.lastActivity.getTime() > this.sessionTimeout) {
                this.sessions.delete(sessionId);
            }
        }
    }
}
const sessionManager = new SessionManager();
const validateRequest = (request)=>{
    const contentType = request.headers.get('content-type');
    const userAgent = request.headers.get('user-agent');
    // التحقق من نوع المحتوى للطلبات POST/PUT
    if ([
        'POST',
        'PUT',
        'PATCH'
    ].includes(request.method)) {
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid content type');
        }
    }
    // التحقق من user agent
    if (!userAgent || userAgent.length < 10) {
        throw new Error('Invalid user agent');
    }
};
const getClientIP = (request)=>{
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const connIP = request.headers.get('x-connecting-ip');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    if (realIP) {
        return realIP;
    }
    if (connIP) {
        return connIP;
    }
    return 'unknown';
};
class AuditLogger {
    logs = [];
    maxLogs = 10000;
    log(entry) {
        const auditEntry = {
            ...entry,
            timestamp: new Date()
        };
        this.logs.push(auditEntry);
        // الاحتفاظ بالسجلات الحديثة فقط
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        // في الإنتاج، يجب حفظ هذا في قاعدة البيانات
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Audit Log:', auditEntry);
        }
    }
    getLogs(adminId, limit = 100) {
        let filteredLogs = this.logs;
        if (adminId) {
            filteredLogs = this.logs.filter((log)=>log.adminId === adminId);
        }
        return filteredLogs.sort((a, b)=>b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
    }
}
const auditLogger = new AuditLogger();
const authenticateAdmin = async (request)=>{
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
        throw new Error('No authentication token provided');
    }
    try {
        const decoded = verifyToken(token);
        // التحقق من الجلسة
        const sessionId = request.cookies.get('session-id')?.value;
        if (sessionId) {
            const session = sessionManager.validateSession(sessionId);
            if (!session || session.adminId !== decoded.adminId) {
                throw new Error('Invalid session');
            }
        }
        return decoded;
    } catch (error) {
        throw new Error('Invalid authentication token');
    }
};
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:;"
};
const __TURBOPACK__default__export__ = {
    validatePassword,
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    sanitizeInput,
    escapeHtml,
    sessionManager,
    auditLogger,
    authenticateAdmin,
    securityHeaders,
    getClientIP,
    validateRequest,
    loginRateLimit,
    apiRateLimit
};
}}),
"[project]/src/app/api/auth/logout/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/security.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const sessionId = request.cookies.get('session-id')?.value;
        if (sessionId) {
            // تدمير الجلسة
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionManager"].destroySession(sessionId);
        }
        // تسجيل الخروج في السجل
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auditLogger"].log({
            adminId: 'unknown',
            action: 'LOGOUT',
            resource: 'auth',
            ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIP"])(request),
            userAgent: request.headers.get('user-agent') || 'unknown',
            success: true
        });
        // إنشاء الاستجابة وإزالة الكوكيز
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'تم تسجيل الخروج بنجاح'
        });
        // إزالة الكوكيز
        response.cookies.delete('admin-token');
        response.cookies.delete('session-id');
        return response;
    } catch (error) {
        console.error('خطأ في تسجيل الخروج:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في تسجيل الخروج'
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
    // حذف الكوكيز
    response.cookies.delete('admin-token');
    response.cookies.delete('session-id');
    return response;
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__de6ac740._.js.map