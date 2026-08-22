module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/apps/seller/lib/api-client.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getClientApi": ()=>getClientApi,
    "getClientPb": ()=>getClientPb
});
"use client";
const listeners = new Set();
let model = null;
const emit = ()=>listeners.forEach((fn)=>fn(null, model));
const request = async (url, options = {})=>{
    const response = await fetch(url, {
        ...options,
        credentials: "include"
    });
    const body = await response.json().catch(()=>({}));
    if (!response.ok) {
        const error = new Error(body.error || `Request failed (${response.status})`);
        error.data = body;
        error.status = response.status;
        throw error;
    }
    return body;
};
function makeCollection(name) {
    return {
        async getList (page = 1, perPage = 50, opts = {}) {
            const params = new URLSearchParams({
                page,
                perPage
            });
            if (opts.filter) params.set("filter", opts.filter);
            if (opts.sort) params.set("sort", opts.sort);
            if (opts.expand) params.set("expand", opts.expand);
            return request(`/api/data/${name}?${params}`);
        },
        async getFullList (opts = {}) {
            return (await this.getList(1, 500, opts)).items;
        },
        async getOne (id, opts = {}) {
            return request(`/api/data/${name}/${id}?expand=${encodeURIComponent(opts.expand || "")}`);
        },
        async getFirstListItem (filter, opts = {}) {
            const data = await this.getList(1, 1, {
                ...opts,
                filter
            });
            if (!data.items.length) {
                const error = new Error("Record not found");
                error.status = 404;
                throw error;
            }
            return data.items[0];
        },
        async create (data) {
            return request(`/api/data/${name}`, {
                method: "POST",
                body: data instanceof FormData ? data : JSON.stringify(data),
                headers: data instanceof FormData ? undefined : {
                    "content-type": "application/json"
                }
            });
        },
        async update (id, data) {
            return request(`/api/data/${name}/${id}`, {
                method: "PATCH",
                body: data instanceof FormData ? data : JSON.stringify(data),
                headers: data instanceof FormData ? undefined : {
                    "content-type": "application/json"
                }
            });
        },
        async delete (id) {
            return request(`/api/data/${name}/${id}`, {
                method: "DELETE"
            });
        },
        async authWithPassword (email, password) {
            const result = await request("/api/auth/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            model = result.user;
            emit();
            return result;
        },
        async authRefresh () {
            const result = await request("/api/auth/me");
            model = result.user;
            emit();
            return result;
        },
        async requestOTP (email) {
            return request("/api/auth/request-otp", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });
        },
        async authWithOTP (otpId, otp) {
            const result = await request("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    otpId,
                    otp
                })
            });
            model = result.user;
            emit();
            return {
                record: result.user
            };
        }
    };
}
let api;
function getClientApi() {
    if (api) return api;
    api = {
        register: (data)=>request("/api/auth/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }),
        collection: makeCollection,
        files: {
            getUrl: (_record, filename)=>filename || "/placeholder.svg"
        },
        cancelAllRequests () {},
        authStore: {
            get token () {
                return model ? "session" : null;
            },
            get model () {
                return model;
            },
            get isValid () {
                return Boolean(model);
            },
            save (_token, nextModel) {
                model = nextModel;
                emit();
            },
            clear () {
                model = null;
                emit();
            },
            onChange (fn) {
                listeners.add(fn);
                return ()=>listeners.delete(fn);
            }
        }
    };
    return api;
}
const getClientPb = getClientApi;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[project]/apps/seller/lib/prisma.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "prisma": ()=>prisma
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/apps/seller/lib/pocketbase.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// Compatibility surface for old imports. The implementation is now Prisma/API.
__turbopack_context__.s({
    "getServerPb": ()=>getServerPb
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/prisma.js [app-ssr] (ecmascript)");
;
;
const map = {
    users: "user",
    companies: "company",
    products: "product",
    requirements: "requirement",
    inquiries: "inquiry",
    favorites: "favorite",
    membership_orders: "membershipOrder"
};
const normalize = (name, data)=>{
    const next = {
        ...data
    };
    for (const key of [
        "user",
        "seller",
        "buyer",
        "product",
        "company",
        "requirement"
    ])if (next[key]) {
        next[`${key}Id`] = next[key];
        delete next[key];
    }
    if (next.completedAt) next.completedAt = new Date(next.completedAt);
    if (next.membershipExpiry) next.membershipExpiry = new Date(next.membershipExpiry);
    return next;
};
const serverCollection = (name)=>({
        async create (data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prisma"][map[name]].create({
                data: normalize(name, data)
            });
        },
        async update (id, data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prisma"][map[name]].update({
                where: {
                    id
                },
                data: normalize(name, data)
            });
        },
        async getOne (id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prisma"][map[name]].findUnique({
                where: {
                    id
                }
            });
        }
    });
function getServerPb() {
    return {
        authStore: {
            isValid: false,
            token: null,
            model: null
        },
        collection: serverCollection,
        files: {
            getUrl: (_record, file)=>file
        }
    };
}
}),
"[project]/apps/seller/lib/pocketbase.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/prisma.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/seller/lib/pocketbase.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/apps/seller/lib/api-client.js [app-ssr] (ecmascript) <export getClientApi as getClientPb>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getClientPb": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientApi"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-ssr] (ecmascript)");
}),
"[project]/apps/seller/context/AuthContext.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider,
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/seller/lib/pocketbase.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getClientApi__as__getClientPb$3e$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-ssr] (ecmascript) <export getClientApi as getClientPb>");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children, initialAuth }) {
    const pb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getClientApi__as__getClientPb$3e$__["getClientPb"])();
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const refreshTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize auth store from server-provided data and immediately refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeAuth = async ()=>{
            if (initialAuth?.model) {
                pb.authStore.save(initialAuth.token || "session", initialAuth.model);
            } else {
                pb.authStore.clear();
            }
            // Attempt to refresh auth immediately to get the latest user data from DB
            // This is crucial for reflecting admin-side changes like profileStatus
            if (pb.authStore.isValid) {
                try {
                    const timestamp = new Date().getTime();
                    await pb.collection("users").authRefresh({
                        requestKey: `auth-refresh-initial-${timestamp}`
                    });
                    setCurrentUser(pb.authStore.model);
                } catch (error) {
                    console.error("Initial auth refresh failed:", error);
                    pb.authStore.clear();
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, [
        initialAuth?.token,
        initialAuth?.model,
        pb.authStore,
        pb.collection
    ]);
    // Listen for auth store changes (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const unsubscribe = pb.authStore.onChange((token, model)=>{
            setCurrentUser(model);
        });
        return ()=>unsubscribe();
    }, [
        pb.authStore
    ]);
    // Clear any existing refresh timeout when component unmounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, []);
    const refreshAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isLoading) return;
        setIsLoading(true);
        try {
            if (pb.authStore.isValid) {
                const timestamp = new Date().getTime();
                await pb.collection("users").authRefresh({
                    requestKey: `auth-refresh-${timestamp}`
                });
                setCurrentUser(pb.authStore.model);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Failed to refresh auth token:", error);
            pb.authStore.clear();
            setCurrentUser(null);
        } finally{
            setIsLoading(false);
        }
    }, [
        pb,
        isLoading
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password)=>{
        setIsLoading(true);
        try {
            await pb.collection("users").authWithPassword(email, password);
            setCurrentUser(pb.authStore.model);
            return pb.authStore.model;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        pb
    ]);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (userData)=>{
        setIsLoading(true);
        try {
            await pb.register(userData);
        } catch (error) {
            console.error("Registration failed:", error.data || error.message);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        pb
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsLoading(true);
        fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        }).catch(()=>{});
        pb.authStore.clear();
        setCurrentUser(null);
        setIsLoading(false);
    }, [
        pb
    ]);
    const requestOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email)=>{
        setIsLoading(true);
        try {
            const timestamp = new Date().getTime();
            const response = await pb.collection("users").requestOTP(email, {
                requestKey: `request-otp-${timestamp}`
            });
            return response.otpId;
        } catch (error) {
            console.error("Request OTP failed:", error);
            // Re-throw the original error to preserve error details
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        pb
    ]);
    const authWithOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (otpId, otp)=>{
        setIsLoading(true);
        try {
            const authData = await pb.collection("users").authWithOTP(otpId, otp);
            setCurrentUser(authData.record);
            await pb.collection("users").update(authData.record.id, {
                verified: true
            });
            setCurrentUser({
                ...authData.record,
                verified: true
            });
        } catch (error) {
            console.error("OTP verification failed:", error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        pb
    ]);
    const value = {
        pb,
        currentUser,
        isLoading,
        login,
        register,
        logout,
        requestOTP,
        authWithOTP,
        refreshAuth
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/seller/context/AuthContext.jsx",
        lineNumber: 176,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__cae247d6._.js.map