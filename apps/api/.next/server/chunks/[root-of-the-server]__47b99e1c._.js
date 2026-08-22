module.exports = {

"[project]/apps/api/.next-internal/server/app/api/data/[collection]/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[project]/apps/api/lib/prisma.js [app-route] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/apps/api/lib/auth.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "COOKIE_NAME": ()=>COOKIE_NAME,
    "clearAuthCookie": ()=>clearAuthCookie,
    "createAuthToken": ()=>createAuthToken,
    "getCurrentUser": ()=>getCurrentUser,
    "publicUser": ()=>publicUser,
    "setAuthCookie": ()=>setAuthCookie
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/api/lib/prisma.js [app-route] (ecmascript)");
;
;
;
const COOKIE_NAME = "sme_auth";
const secret = ()=>new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me");
async function createAuthToken(userId) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({
        userId
    }).setProtectedHeader({
        alg: "HS256"
    }).setIssuedAt().setExpirationTime("7d").sign(secret());
}
async function setAuthCookie(userId) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    store.set(COOKIE_NAME, await createAuthToken(userId), {
        httpOnly: true,
        sameSite: "lax",
        secure: ("TURBOPACK compile-time value", "development") === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });
}
async function clearAuthCookie() {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    store.delete(COOKIE_NAME);
}
async function getCurrentUser() {
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(COOKIE_NAME)?.value;
    if (!token) return null;
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret());
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: String(payload.userId)
            }
        });
    } catch  {
        return null;
    }
}
function publicUser(user) {
    if (!user) return null;
    const { passwordHash, ...safe } = user;
    return {
        ...safe,
        created: safe.createdAt,
        updated: safe.updatedAt
    };
}
;
}),
"[project]/apps/api/app/api/data/[collection]/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GET": ()=>GET,
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/api/lib/prisma.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/api/lib/auth.js [app-route] (ecmascript)");
;
;
;
;
const delegates = {
    users: "user",
    companies: "company",
    products: "product",
    requirements: "requirement",
    inquiries: "inquiry",
    favorites: "favorite",
    membership_orders: "membershipOrder"
};
const fields = ()=>({
        created: "createdAt",
        updated: "updatedAt"
    });
function serialize(collection, value) {
    if (!value) return value;
    const out = {
        ...value,
        created: value.createdAt,
        updated: value.updatedAt
    };
    delete out.createdAt;
    delete out.updatedAt;
    delete out.passwordHash;
    if (out.user) out.expand = {
        ...out.expand || {},
        user: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicUser"])(out.user)
    };
    if (out.buyer) out.expand = {
        ...out.expand || {},
        buyer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicUser"])(out.buyer)
    };
    if (out.seller) out.expand = {
        ...out.expand || {},
        seller: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicUser"])(out.seller)
    };
    if (out.product) out.expand = {
        ...out.expand || {},
        product: serialize("products", out.product)
    };
    if (out.company) out.expand = {
        ...out.expand || {},
        company: serialize("companies", out.company)
    };
    return out;
}
async function parseBody(request, collection) {
    const contentType = request.headers.get("content-type") || "";
    const raw = contentType.includes("multipart/form-data") ? Object.fromEntries((await request.formData()).entries()) : await request.json();
    const map = fields(collection);
    const data = {};
    for (const [key, value] of Object.entries(raw || {})){
        if (key === "id" || [
            "passwordConfirm",
            "confirmPassword",
            "recaptchaToken"
        ].includes(key)) continue;
        const target = map[key] || key;
        if (value && typeof value === "object" && "name" in value) data[target] = value.name || null;
        else if ([
            "images",
            "chat"
        ].includes(target)) {
            try {
                data[target] = JSON.parse(value);
            } catch  {
                data[target] = value ? [
                    value
                ] : [];
            }
        } else data[target] = value === "true" ? true : value === "false" ? false : value;
    }
    if (collection === "users" && data.password) {
        data.passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(data.password, 12);
        delete data.password;
    }
    for (const key of [
        "user",
        "seller",
        "buyer",
        "product",
        "company",
        "requirement"
    ])if (data[key]) {
        data[`${key}Id`] = data[key];
        delete data[key];
    }
    return data;
}
function whereFromFilter(filter = "") {
    const where = {};
    for (const match of filter.matchAll(/([\w]+)\s*(=|!=|~)\s*"?([^"\s]+)"?/g)){
        const [, key, op, value] = match;
        const field = {
            user: "userId",
            seller: "sellerId",
            buyer: "buyerId",
            product: "productId",
            company: "companyId"
        }[key] || key;
        where[field] = op === "~" ? {
            contains: value,
            mode: "insensitive"
        } : op === "!=" ? {
            not: value
        } : value;
    }
    return where;
}
function includeFor(collection) {
    return ({
        users: {},
        companies: {
            user: true
        },
        products: {
            seller: true,
            company: true
        },
        requirements: {
            user: true
        },
        inquiries: {
            buyer: true,
            seller: true,
            product: true
        },
        favorites: {
            product: {
                include: {
                    seller: true,
                    company: true
                }
            }
        },
        membership_orders: {
            user: true
        }
    })[collection];
}
async function GET(request, { params }) {
    const { collection } = await params;
    const delegateName = delegates[collection];
    if (!delegateName) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unknown collection"
    }, {
        status: 404
    });
    const delegate = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"][delegateName];
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const perPage = Number(url.searchParams.get("perPage") || 50);
    const where = whereFromFilter(url.searchParams.get("filter") || "");
    const requestedSort = url.searchParams.get("sort") || "-created";
    const orderBy = {
        created: "createdAt",
        updated: "updatedAt"
    }[requestedSort.replace("-", "")] || requestedSort.replace("-", "");
    const items = await delegate.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
            [orderBy]: url.searchParams.get("sort")?.startsWith("-") ? "desc" : "asc"
        },
        include: includeFor(collection)
    });
    const totalItems = await delegate.count({
        where
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        items: items.map((item)=>serialize(collection, item))
    });
}
async function POST(request, { params }) {
    const { collection } = await params;
    const delegateName = delegates[collection];
    if (!delegateName) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unknown collection"
    }, {
        status: 404
    });
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    let data = await parseBody(request, collection);
    if (collection !== "users" && user) {
        if ([
            "products",
            "requirements",
            "favorites"
        ].includes(collection)) data.userId = data.userId || user.id;
        if (collection === "products") data.sellerId = user.id;
        if (collection === "requirements") data.userId = user.id;
        if (collection === "favorites") data.userId = user.id;
    }
    if (collection === "users") data.email = String(data.email || "").toLowerCase().trim();
    const item = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"][delegateName].create({
        data,
        include: includeFor(collection)
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(serialize(collection, item), {
        status: 201
    });
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__47b99e1c._.js.map