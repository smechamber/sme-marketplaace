(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/seller/lib/api-client.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getClientApi": ()=>getClientApi,
    "getClientPb": ()=>getClientPb
});
"use client";
const listeners = new Set();
let model = null;
const emit = ()=>listeners.forEach((fn)=>fn(null, model));
const request = async function(url) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const response = await fetch(url, {
        ...options,
        credentials: "include"
    });
    const body = await response.json().catch(()=>({}));
    if (!response.ok) {
        const error = new Error(body.error || "Request failed (".concat(response.status, ")"));
        error.data = body;
        error.status = response.status;
        throw error;
    }
    return body;
};
function makeCollection(name) {
    return {
        async getList () {
            let page = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, perPage = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            const params = new URLSearchParams({
                page,
                perPage
            });
            if (opts.filter) params.set("filter", opts.filter);
            if (opts.sort) params.set("sort", opts.sort);
            if (opts.expand) params.set("expand", opts.expand);
            return request("/api/data/".concat(name, "?").concat(params));
        },
        async getFullList () {
            let opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            return (await this.getList(1, 500, opts)).items;
        },
        async getOne (id) {
            let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return request("/api/data/".concat(name, "/").concat(id, "?expand=").concat(encodeURIComponent(opts.expand || "")));
        },
        async getFirstListItem (filter) {
            let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
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
            return request("/api/data/".concat(name), {
                method: "POST",
                body: data instanceof FormData ? data : JSON.stringify(data),
                headers: data instanceof FormData ? undefined : {
                    "content-type": "application/json"
                }
            });
        },
        async update (id, data) {
            return request("/api/data/".concat(name, "/").concat(id), {
                method: "PATCH",
                body: data instanceof FormData ? data : JSON.stringify(data),
                headers: data instanceof FormData ? undefined : {
                    "content-type": "application/json"
                }
            });
        },
        async delete (id) {
            return request("/api/data/".concat(name, "/").concat(id), {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/seller/lib/prisma.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "prisma": ()=>prisma
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$index$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/index-browser.js [app-client] (ecmascript)");
;
const globalForPrisma = globalThis;
var _globalForPrisma_prisma;
const prisma = (_globalForPrisma_prisma = globalForPrisma.prisma) !== null && _globalForPrisma_prisma !== void 0 ? _globalForPrisma_prisma : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$index$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/seller/lib/pocketbase.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Compatibility surface for old imports. The implementation is now Prisma/API.
__turbopack_context__.s({
    "getServerPb": ()=>getServerPb
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/prisma.js [app-client] (ecmascript)");
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
        next["".concat(key, "Id")] = next[key];
        delete next[key];
    }
    if (next.completedAt) next.completedAt = new Date(next.completedAt);
    if (next.membershipExpiry) next.membershipExpiry = new Date(next.membershipExpiry);
    return next;
};
const serverCollection = (name)=>({
        async create (data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prisma"][map[name]].create({
                data: normalize(name, data)
            });
        },
        async update (id, data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prisma"][map[name]].update({
                where: {
                    id
                },
                data: normalize(name, data)
            });
        },
        async getOne (id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prisma"][map[name]].findUnique({
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/seller/lib/pocketbase.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$prisma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/prisma.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/seller/lib/pocketbase.js [app-client] (ecmascript) <locals>");
}),
"[project]/apps/seller/lib/api-client.js [app-client] (ecmascript) <export getClientApi as getClientPb>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getClientPb": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientApi"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-client] (ecmascript)");
}),
"[project]/apps/seller/context/AuthContext.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider,
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/seller/lib/pocketbase.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getClientApi__as__getClientPb$3e$__ = __turbopack_context__.i("[project]/apps/seller/lib/api-client.js [app-client] (ecmascript) <export getClientApi as getClientPb>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider(param) {
    let { children, initialAuth } = param;
    _s();
    const pb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$seller$2f$lib$2f$api$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__getClientApi__as__getClientPb$3e$__["getClientPb"])();
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const refreshTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize auth store from server-provided data and immediately refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": async ()=>{
                    if (initialAuth === null || initialAuth === void 0 ? void 0 : initialAuth.model) {
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
                                requestKey: "auth-refresh-initial-".concat(timestamp)
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
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
        }
    }["AuthProvider.useEffect"], [
        initialAuth === null || initialAuth === void 0 ? void 0 : initialAuth.token,
        initialAuth === null || initialAuth === void 0 ? void 0 : initialAuth.model,
        pb.authStore,
        pb.collection
    ]);
    // Listen for auth store changes (client-side only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const unsubscribe = pb.authStore.onChange({
                "AuthProvider.useEffect.unsubscribe": (token, model)=>{
                    setCurrentUser(model);
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return ({
                "AuthProvider.useEffect": ()=>unsubscribe()
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        pb.authStore
    ]);
    // Clear any existing refresh timeout when component unmounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            return ({
                "AuthProvider.useEffect": ()=>{
                    if (refreshTimeoutRef.current) {
                        clearTimeout(refreshTimeoutRef.current);
                    }
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const refreshAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[refreshAuth]": async ()=>{
            if (isLoading) return;
            setIsLoading(true);
            try {
                if (pb.authStore.isValid) {
                    const timestamp = new Date().getTime();
                    await pb.collection("users").authRefresh({
                        requestKey: "auth-refresh-".concat(timestamp)
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
        }
    }["AuthProvider.useCallback[refreshAuth]"], [
        pb,
        isLoading
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
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
        }
    }["AuthProvider.useCallback[login]"], [
        pb
    ]);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[register]": async (userData)=>{
            setIsLoading(true);
            try {
                await pb.register(userData);
            } catch (error) {
                console.error("Registration failed:", error.data || error.message);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[register]"], [
        pb
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            setIsLoading(true);
            fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            }).catch({
                "AuthProvider.useCallback[logout]": ()=>{}
            }["AuthProvider.useCallback[logout]"]);
            pb.authStore.clear();
            setCurrentUser(null);
            setIsLoading(false);
        }
    }["AuthProvider.useCallback[logout]"], [
        pb
    ]);
    const requestOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[requestOTP]": async (email)=>{
            setIsLoading(true);
            try {
                const timestamp = new Date().getTime();
                const response = await pb.collection("users").requestOTP(email, {
                    requestKey: "request-otp-".concat(timestamp)
                });
                return response.otpId;
            } catch (error) {
                console.error("Request OTP failed:", error);
                // Re-throw the original error to preserve error details
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[requestOTP]"], [
        pb
    ]);
    const authWithOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[authWithOTP]": async (otpId, otp)=>{
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
        }
    }["AuthProvider.useCallback[authWithOTP]"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/seller/context/AuthContext.jsx",
        lineNumber: 176,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "5+349EcNYDVt0Ep42srUryQbjf8=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_seller_84151af9._.js.map