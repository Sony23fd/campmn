(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/anniversary/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAnniversaryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AdminAnniversaryPage() {
    _s();
    // ---- SETTINGS STATE ----
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        anniversary_video_url: "https://www.youtube.com/embed/A6XUVjK9W4o",
        anniversary_hero_badge: "1925 - 2025",
        anniversary_hero_title: "100 Жилийн Ой",
        anniversary_hero_text: "Монголын Үндэсний Зуслангуудын Холбооны түүхт 100 жилийн ойд зориулагдсан онцгой үйл ажиллагаа, хөтөлбөрүүдтэй танилцана уу.",
        anniversary_logo_url: "/100-logo.jpg",
        anniversary_intro_title: "Үйл ажиллагаа ба Хөтөлбөрүүд",
        anniversary_intro_text: "Ойн баярын хүрээнд зохион байгуулагдах албан ёсны хөтөлбөрүүд болон уулзалтууд.",
        anniversary_accordions: "[]"
    });
    const [loadingSettings, setLoadingSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [savingSettings, setSavingSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // ---- POSTS STATE ----
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingPosts, setLoadingPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        imageUrl: "",
        type: "ANNIVERSARY_100",
        published: true,
        createdAt: new Date().toISOString().slice(0, 16)
    });
    const MOCK_AUTHOR_ID = "00000000-0000-0000-0000-000000000000";
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // ---- DATA FETCHING ----
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAnniversaryPage.useEffect": ()=>{
            async function fetchAll() {
                setLoadingSettings(true);
                setLoadingPosts(true);
                try {
                    // Fetch Settings
                    const resSets = await fetch("/api/settings");
                    if (resSets.ok) {
                        const data = await resSets.json();
                        if (Object.keys(data).length > 0) {
                            setSettings({
                                "AdminAnniversaryPage.useEffect.fetchAll": (prev)=>({
                                        ...prev,
                                        ...data
                                    })
                            }["AdminAnniversaryPage.useEffect.fetchAll"]);
                        }
                    }
                    // Fetch Posts (Only ANNIVERSARY_100)
                    const resPosts = await fetch("/api/posts?admin=true&type=ANNIVERSARY_100");
                    if (resPosts.ok) {
                        const data = await resPosts.json();
                        if (Array.isArray(data)) setPosts(data);
                    }
                } catch (error) {
                    console.error(error);
                } finally{
                    setLoadingSettings(false);
                    setLoadingPosts(false);
                }
            }
            fetchAll();
        }
    }["AdminAnniversaryPage.useEffect"], []);
    const refetchPosts = async ()=>{
        const resPosts = await fetch("/api/posts?admin=true&type=ANNIVERSARY_100");
        if (resPosts.ok) {
            const data = await resPosts.json();
            if (Array.isArray(data)) setPosts(data);
        }
    };
    // ---- SETTINGS HANDLERS ----
    const handleSettingsChange = (e)=>{
        const { name, value } = e.target;
        setSettings((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleAccordionChange = (index, field, value)=>{
        try {
            const accordions = JSON.parse(settings.anniversary_accordions || "[]");
            accordions[index][field] = value;
            setSettings((prev)=>({
                    ...prev,
                    anniversary_accordions: JSON.stringify(accordions)
                }));
        } catch (e) {}
    };
    const addAccordion = ()=>{
        try {
            const accordions = JSON.parse(settings.anniversary_accordions || "[]");
            accordions.push({
                title: "Шинэ хөтөлбөр",
                content: "Хөтөлбөрийн дэлгэрэнгүйг энд бичнэ үү..."
            });
            setSettings((prev)=>({
                    ...prev,
                    anniversary_accordions: JSON.stringify(accordions)
                }));
        } catch (e) {}
    };
    const removeAccordion = (index)=>{
        try {
            const accordions = JSON.parse(settings.anniversary_accordions || "[]");
            accordions.splice(index, 1);
            setSettings((prev)=>({
                    ...prev,
                    anniversary_accordions: JSON.stringify(accordions)
                }));
        } catch (e) {}
    };
    const handleSettingsSubmit = async (e)=>{
        e.preventDefault();
        setSavingSettings(true);
        setMessage("");
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                setMessage("Ойн хуудсын тохиргоо амжилттай хадгалагдлаа!");
            } else {
                setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
            }
        } catch (error) {
            setMessage("Серверт холбогдоход алдаа гарлаа.");
        } finally{
            setSavingSettings(false);
            setTimeout(()=>setMessage(""), 4000);
        }
    };
    // ---- POSTS HANDLERS ----
    const generateSlug = (text)=>{
        return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    };
    const handleTitleChange = (e)=>{
        const title = e.target.value;
        if (!editingId) {
            setFormData({
                ...formData,
                title,
                slug: generateSlug(title)
            });
        } else {
            setFormData({
                ...formData,
                title
            });
        }
    };
    const handlePostSubmit = async (e)=>{
        e.preventDefault();
        try {
            const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
            const method = editingId ? "PUT" : "POST";
            const payload = {
                ...formData,
                authorId: MOCK_AUTHOR_ID
            };
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                handleCancelPost();
                refetchPosts();
            } else {
                const errData = await res.json();
                alert(errData.error || "Алдаа гарлаа.");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditPost = (post)=>{
        setEditingId(post.id);
        setFormData({
            title: post.title || "",
            slug: post.slug || "",
            content: post.content || "",
            excerpt: post.excerpt || "",
            imageUrl: post.imageUrl || "",
            type: "ANNIVERSARY_100",
            published: post.published !== undefined ? post.published : true,
            createdAt: post.createdAt ? new Date(post.createdAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
        });
        setAdding(true);
        // Scroll to the form
        document.getElementById('post-form')?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    const handleDeletePost = async (id)=>{
        if (!confirm("Энэ нийтлэлийг устгах уу?")) return;
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE"
            });
            if (res.ok) refetchPosts();
        } catch (error) {
            console.error(error);
        }
    };
    const handleCancelPost = ()=>{
        setAdding(false);
        setEditingId(null);
        setFormData({
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            imageUrl: "",
            type: "ANNIVERSARY_100",
            published: true,
            createdAt: new Date().toISOString().slice(0, 16)
        });
    };
    if (loadingSettings) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                lineNumber: 221,
                columnNumber: 71
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/anniversary/page.tsx",
            lineNumber: 221,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-12 pb-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold tracking-tight mb-2",
                        children: "100 Жилийн Ой"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 227,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Түүхт 100 жилийн ойн хуудасны мэдээлэл болон арга хэмжээнүүд."
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 228,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                lineNumber: 226,
                columnNumber: 13
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 rounded-md text-sm font-medium ${message.includes("амжилттай") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`,
                children: message
            }, void 0, false, {
                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                lineNumber: 232,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSettingsSubmit,
                className: "space-y-6 max-w-4xl border rounded-xl overflow-hidden bg-white shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-50 px-6 py-4 border-b",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-slate-800",
                            children: "1. Хуудасны Үндсэн Тохиргоо"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                            lineNumber: 240,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium leading-none",
                                        children: "Логоны Линк (Зурагны холбоос)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "anniversary_logo_url",
                                        value: settings.anniversary_logo_url,
                                        onChange: handleSettingsChange,
                                        className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                                        placeholder: "/100-logo.jpg эсвэл https://..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 244,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium leading-none",
                                                children: "Он, Жил (Badge)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                name: "anniversary_hero_badge",
                                                value: settings.anniversary_hero_badge,
                                                onChange: handleSettingsChange,
                                                className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 258,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium leading-none",
                                                children: "Том Гарчиг"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                name: "anniversary_hero_title",
                                                value: settings.anniversary_hero_title,
                                                onChange: handleSettingsChange,
                                                className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 255,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium leading-none",
                                        children: "Дэд Тайлбар Текст"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "anniversary_hero_text",
                                        value: settings.anniversary_hero_text,
                                        onChange: handleSettingsChange,
                                        rows: 3,
                                        className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 279,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 277,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 pt-4 border-t border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium leading-none",
                                        children: "Танилцуулга Видеоны Линк (YouTube Embed)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "anniversary_video_url",
                                        value: settings.anniversary_video_url,
                                        onChange: handleSettingsChange,
                                        className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 290,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 288,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium leading-none",
                                        children: "Хурал/Арга Хэмжээний Гарчиг"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "anniversary_intro_title",
                                        value: settings.anniversary_intro_title,
                                        onChange: handleSettingsChange,
                                        className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 298,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium leading-none",
                                        children: "Хурал/Арга Хэмжээний Дэлгэрэнгүй Танилцуулга"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "anniversary_intro_text",
                                        value: settings.anniversary_intro_text,
                                        onChange: handleSettingsChange,
                                        rows: 4,
                                        className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 308,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 border-t mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-medium",
                                                children: "Хөтөлбөрүүдийн Жагсаалт (Аккордион)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: addAccordion,
                                                className: "text-xs bg-slate-100 hover:bg-slate-200 border px-3 py-1.5 rounded-md font-medium transition-colors",
                                                children: "+ Хөтөлбөр нэмэх"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 320,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: (()=>{
                                            let accordions = [];
                                            try {
                                                accordions = JSON.parse(settings.anniversary_accordions || "[]");
                                            } catch (e) {}
                                            return accordions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500 italic",
                                                children: "Одоогоор хөтөлбөр нэмэгдээгүй байна."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 337,
                                                columnNumber: 37
                                            }, this) : accordions.map((acc, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-slate-50 border rounded-lg space-y-3 relative group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeAccordion(index),
                                                            className: "absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                                                            title: "Устгах",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: "2",
                                                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 124
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-xs font-semibold",
                                                                    children: "Хөтөлбөрийн гарчиг / Огноо"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: acc.title,
                                                                    onChange: (e)=>handleAccordionChange(index, "title", e.target.value),
                                                                    className: "flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                                    lineNumber: 350,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-xs font-semibold",
                                                                    children: "Дэлгэрэнгүй Мэдээлэл"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                                    lineNumber: 358,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                    value: acc.content,
                                                                    onChange: (e)=>handleAccordionChange(index, "content", e.target.value),
                                                                    rows: 3,
                                                                    className: "flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 37
                                                }, this));
                                        })()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 319,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 243,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 pb-6 pt-2 text-right",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: savingSettings,
                            className: "inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-6 py-2 disabled:opacity-50",
                            children: savingSettings ? "Хадгалж байна..." : "Тохиргоог Хадгалах"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                            lineNumber: 374,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 373,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                lineNumber: 238,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "my-8 border-slate-200"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                lineNumber: 384,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "post-form",
                className: "space-y-6 max-w-4xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-slate-800",
                                children: "2. Ойн Онцгой Мэдээллүүд"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 389,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: adding ? handleCancelPost : ()=>setAdding(true),
                                className: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm",
                                children: adding ? "Цуцлах" : "+ Шинэ мэдээлэл"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 390,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 388,
                        columnNumber: 17
                    }, this),
                    adding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-lg mb-4",
                                children: editingId ? "Мэдээлэл засах" : "Шинэ мэдээлэл үүсгэх"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 400,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handlePostSubmit,
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium",
                                                        children: "Гарчиг *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        required: true,
                                                        type: "text",
                                                        value: formData.title,
                                                        onChange: handleTitleChange,
                                                        className: "w-full border rounded-md px-3 py-2 text-sm",
                                                        placeholder: "Мэдээний гарчиг"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 403,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2 md:col-span-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium",
                                                        children: "Слаг / холбоос *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        required: true,
                                                        type: "text",
                                                        value: formData.slug,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                slug: e.target.value
                                                            }),
                                                        className: "w-full border rounded-md px-3 py-2 text-sm bg-slate-50",
                                                        disabled: !!editingId
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 414,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2 md:col-span-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium",
                                                        children: "Төрөл"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 426,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: "100 жилийн ой",
                                                        disabled: true,
                                                        className: "w-full border rounded-md px-3 py-2 text-sm bg-slate-100 text-slate-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2 md:col-span-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium",
                                                        children: "Зураг (URL)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.imageUrl,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                imageUrl: e.target.value
                                                            }),
                                                        className: "w-full border rounded-md px-3 py-2 text-sm",
                                                        placeholder: "Зургийн линк оруулна уу"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 434,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2 md:col-span-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium",
                                                        children: "Нийтлэх огноо"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "datetime-local",
                                                        value: formData.createdAt,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                createdAt: e.target.value
                                                            }),
                                                        className: "w-full border rounded-md px-3 py-2 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 444,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-medium",
                                                        children: "Товч утга (Excerpt)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: formData.excerpt,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                excerpt: e.target.value
                                                            }),
                                                        className: "w-full border rounded-md px-3 py-2 min-h-[60px]",
                                                        placeholder: "Жагсаалтанд харагдах богино текст..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 col-span-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-medium",
                                                        children: "Үндсэн агуулга *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 463,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        required: true,
                                                        value: formData.content,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                content: e.target.value
                                                            }),
                                                        className: "w-full border rounded-md px-3 py-2 min-h-[200px]",
                                                        placeholder: "Нийтлэлийн дэлгэрэнгүй агуулга..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "col-span-2 flex items-center gap-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        id: "isPublished",
                                                        checked: formData.published,
                                                        onChange: (e)=>setFormData({
                                                                ...formData,
                                                                published: e.target.checked
                                                            }),
                                                        className: "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "isPublished",
                                                        className: "text-sm font-medium leading-none",
                                                        children: "Олон нийтэд нийтлэх (Одоо шууд харагдах эсэх)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-4 flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600",
                                                children: editingId ? "Шинэчлэх" : "Нийтлэх"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 486,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleCancelPost,
                                                className: "bg-slate-200 text-slate-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300",
                                                children: "Цуцлах"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 489,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 485,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                lineNumber: 401,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 399,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-slate-50 border-b text-slate-500 font-medium",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: "Гарчиг"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 501,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: "Төлөв"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 502,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: "Үүсгэсэн"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-right",
                                                children: "Үйлдэл"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                    lineNumber: 499,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: loadingPosts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 4,
                                            className: "text-center py-8",
                                            children: "Ачаалж байна..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                            lineNumber: 509,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 509,
                                        columnNumber: 33
                                    }, this) : posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 4,
                                            className: "text-center py-8 text-slate-500",
                                            children: "Системд бүртгэлтэй нийтлэл алга байна."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                            lineNumber: 511,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                        lineNumber: 511,
                                        columnNumber: 33
                                    }, this) : posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b hover:bg-slate-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 font-medium",
                                                    children: post.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800",
                                                        children: post.published ? 'Нийтлэгдсэн' : 'Ноорог'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-slate-500",
                                                    children: new Date(post.createdAt).toLocaleDateString()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleEditPost(post),
                                                            className: "text-blue-600 hover:text-blue-800 text-sm font-medium mr-3",
                                                            children: "Засах"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeletePost(post.id),
                                                            className: "text-red-600 hover:text-red-800 text-sm font-medium",
                                                            children: "Устгах"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                            lineNumber: 526,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, post.id, true, {
                                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/anniversary/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/anniversary/page.tsx",
                            lineNumber: 498,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/anniversary/page.tsx",
                        lineNumber: 497,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/anniversary/page.tsx",
                lineNumber: 387,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/anniversary/page.tsx",
        lineNumber: 225,
        columnNumber: 9
    }, this);
}
_s(AdminAnniversaryPage, "qPejcPXimmtfI5mmKknxBK/oBnw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminAnniversaryPage;
var _c;
__turbopack_context__.k.register(_c, "AdminAnniversaryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_ee2a8526._.js.map