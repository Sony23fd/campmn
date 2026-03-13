module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/PartnerCarousel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PartnerCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const partners = [
    {
        name: "ОУЗХ",
        type: "Олон Улсын Байгууллага",
        logo: "https://placehold.co/400x160/2563eb/ffffff?text=ОУЗХ&font=montserrat"
    },
    {
        name: "АНДОЗХ",
        type: "Бүс Нутгийн Холбоо",
        logo: "https://placehold.co/400x160/16a34a/ffffff?text=АНДОЗХ&font=montserrat"
    },
    {
        name: "АРТЕК",
        type: "ОУ-ын Хүүхдийн Төв",
        logo: "https://placehold.co/400x160/db2777/ffffff?text=АРТЕК&font=montserrat"
    },
    {
        name: "ОРЛЕНОК",
        type: "ОУ-ын Хүүхдийн Төв",
        logo: "https://placehold.co/400x160/06b6d4/ffffff?text=ОРЛЕНОК&font=montserrat"
    },
    {
        name: "ОКЕАН",
        type: "Бүх Оросын Хүүхдийн Төв",
        logo: "https://placehold.co/400x160/eab308/000000?text=ОКЕАН&font=montserrat"
    },
    {
        name: "СМЕНА",
        type: "Хүүхдийн Төв",
        logo: "https://placehold.co/400x160/f97316/ffffff?text=СМЕНА&font=montserrat"
    },
    {
        name: "БНХАУ",
        type: "Түншлэл",
        logo: "https://placehold.co/400x160/dc2626/ffffff?text=БНХАУ&font=montserrat"
    },
    {
        name: "НАЙРАМДАЛ",
        type: "ОУХНЦ",
        logo: "https://placehold.co/400x160/9333ea/ffffff?text=НАЙРАМДАЛ&font=montserrat"
    },
    {
        name: "БСШУЯ",
        type: "Төрийн Байгууллага",
        logo: "https://placehold.co/400x160/0d9488/ffffff?text=БСШУЯ&font=montserrat"
    }
];
function PartnerCarousel() {
    // Дубликат хийж scroll-г тасралтгүй харагдуулах
    const duplicatedPartners = [
        ...partners,
        ...partners,
        ...partners
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-12 md:py-20 bg-slate-50 overflow-hidden border-t",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container px-4 md:px-6 mx-auto mb-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900",
                        children: "Хамтран Ажиллагч Байгууллагууд"
                    }, void 0, false, {
                        fileName: "[project]/src/components/PartnerCarousel.tsx",
                        lineNumber: 24,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 mt-4 max-w-2xl mx-auto",
                        children: "Олон улсын болон үндэсний түвшний байгууллагуудтай нягт хамтран ажилладаг."
                    }, void 0, false, {
                        fileName: "[project]/src/components/PartnerCarousel.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PartnerCarousel.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full overflow-hidden flex whitespace-nowrap mask-image-gradient",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-max animate-marquee hover:pause-animation items-center gap-8 px-4",
                    children: duplicatedPartners.map((partner, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center w-[200px] sm:w-[240px] bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full aspect-[2.5/1] relative bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: partner.logo,
                                        alt: partner.name,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PartnerCarousel.tsx",
                                        lineNumber: 41,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PartnerCarousel.tsx",
                                    lineNumber: 40,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full py-3 px-4 bg-white border-t border-slate-50 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-xs font-semibold text-slate-500 uppercase tracking-wide truncate",
                                        children: partner.type
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PartnerCarousel.tsx",
                                        lineNumber: 48,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PartnerCarousel.tsx",
                                    lineNumber: 47,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/PartnerCarousel.tsx",
                            lineNumber: 36,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/PartnerCarousel.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PartnerCarousel.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PartnerCarousel.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__afaea142._.js.map