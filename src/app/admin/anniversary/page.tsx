"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAnniversaryPage() {
    // ---- SETTINGS STATE ----
    const [settings, setSettings] = useState({
        anniversary_video_url: "https://www.youtube.com/embed/A6XUVjK9W4o",
        anniversary_hero_badge: "1925 - 2025",
        anniversary_hero_title: "100 Жилийн Ой",
        anniversary_hero_text: "Монголын Үндэсний Зуслангуудын Холбооны түүхт 100 жилийн ойд зориулагдсан онцгой үйл ажиллагаа, хөтөлбөрүүдтэй танилцана уу.",
        anniversary_logo_url: "/100-logo.jpg",
        anniversary_intro_title: "Үйл ажиллагаа ба Хөтөлбөрүүд",
        anniversary_intro_text: "Ойн баярын хүрээнд зохион байгуулагдах албан ёсны хөтөлбөрүүд болон уулзалтууд.",
        anniversary_accordions: "[]",
    });
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [savingSettings, setSavingSettings] = useState(false);
    const [message, setMessage] = useState("");

    // ---- POSTS STATE ----
    const [posts, setPosts] = useState<any[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
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
    const router = useRouter();

    // ---- DATA FETCHING ----
    useEffect(() => {
        async function fetchAll() {
            setLoadingSettings(true);
            setLoadingPosts(true);
            try {
                // Fetch Settings
                const resSets = await fetch("/api/settings");
                if (resSets.ok) {
                    const data = await resSets.json();
                    if (Object.keys(data).length > 0) {
                        setSettings(prev => ({ ...prev, ...data }));
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
            } finally {
                setLoadingSettings(false);
                setLoadingPosts(false);
            }
        }
        fetchAll();
    }, []);

    const refetchPosts = async () => {
        const resPosts = await fetch("/api/posts?admin=true&type=ANNIVERSARY_100");
        if (resPosts.ok) {
            const data = await resPosts.json();
            if (Array.isArray(data)) setPosts(data);
        }
    }

    // ---- SETTINGS HANDLERS ----
    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleAccordionChange = (index: number, field: string, value: string) => {
        try {
            const accordions = JSON.parse(settings.anniversary_accordions || "[]");
            accordions[index][field] = value;
            setSettings(prev => ({ ...prev, anniversary_accordions: JSON.stringify(accordions) }));
        } catch(e) {}
    };

    const addAccordion = () => {
        try {
            const accordions = JSON.parse(settings.anniversary_accordions || "[]");
            accordions.push({ title: "Шинэ хөтөлбөр", content: "Хөтөлбөрийн дэлгэрэнгүйг энд бичнэ үү..." });
            setSettings(prev => ({ ...prev, anniversary_accordions: JSON.stringify(accordions) }));
        } catch(e) {}
    };

    const removeAccordion = (index: number) => {
        try {
            const accordions = JSON.parse(settings.anniversary_accordions || "[]");
            accordions.splice(index, 1);
            setSettings(prev => ({ ...prev, anniversary_accordions: JSON.stringify(accordions) }));
        } catch(e) {}
    };

    const handleSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSettings(true);
        setMessage("");

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage("Ойн хуудсын тохиргоо амжилттай хадгалагдлаа!");
            } else {
                setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
            }
        } catch (error) {
            setMessage("Серверт холбогдоход алдаа гарлаа.");
        } finally {
            setSavingSettings(false);
            setTimeout(() => setMessage(""), 4000);
        }
    };

    // ---- POSTS HANDLERS ----
    const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (!editingId) {
            setFormData({ ...formData, title, slug: generateSlug(title) });
        } else {
            setFormData({ ...formData, title });
        }
    };

    const handlePostSubmit = async (e: React.FormEvent) => {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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

    const handleEditPost = (post: any) => {
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
        document.getElementById('post-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm("Энэ нийтлэлийг устгах уу?")) return;
        try {
            const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (res.ok) refetchPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelPost = () => {
        setAdding(false);
        setEditingId(null);
        setFormData({ 
            title: "", slug: "", content: "", excerpt: "", imageUrl: "", type: "ANNIVERSARY_100", published: true, 
            createdAt: new Date().toISOString().slice(0, 16)
        });
    };


    if (loadingSettings) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    }

    return (
        <div className="space-y-12 pb-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">100 Жилийн Ой</h1>
                <p className="text-muted-foreground">Түүхт 100 жилийн ойн хуудасны мэдээлэл болон арга хэмжээнүүд.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-md text-sm font-medium ${message.includes("амжилттай") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    {message}
                </div>
            )}

            {/* PART 1: PAGE UI SETTINGS */}
            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-4xl border rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-slate-800">1. Хуудасны Үндсэн Тохиргоо</h2>
                </div>
                
                <div className="px-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Логоны Линк (Зурагны холбоос)</label>
                        <input
                            type="text"
                            name="anniversary_logo_url"
                            value={settings.anniversary_logo_url}
                            onChange={handleSettingsChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="/100-logo.jpg эсвэл https://..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Он, Жил (Badge)</label>
                            <input
                                type="text"
                                name="anniversary_hero_badge"
                                value={settings.anniversary_hero_badge}
                                onChange={handleSettingsChange}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Том Гарчиг</label>
                            <input
                                type="text"
                                name="anniversary_hero_title"
                                value={settings.anniversary_hero_title}
                                onChange={handleSettingsChange}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Дэд Тайлбар Текст</label>
                        <textarea
                            name="anniversary_hero_text"
                            value={settings.anniversary_hero_text}
                            onChange={handleSettingsChange}
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-100">
                        <label className="text-sm font-medium leading-none">Танилцуулга Видеоны Линк (YouTube Embed)</label>
                        <input
                            type="text"
                            name="anniversary_video_url"
                            value={settings.anniversary_video_url}
                            onChange={handleSettingsChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Хурал/Арга Хэмжээний Гарчиг</label>
                        <input
                            type="text"
                            name="anniversary_intro_title"
                            value={settings.anniversary_intro_title}
                            onChange={handleSettingsChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Хурал/Арга Хэмжээний Дэлгэрэнгүй Танилцуулга</label>
                        <textarea
                            name="anniversary_intro_text"
                            value={settings.anniversary_intro_text}
                            onChange={handleSettingsChange}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    
                    <div className="pt-4 border-t mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Хөтөлбөрүүдийн Жагсаалт (Аккордион)</h3>
                            <button
                                type="button"
                                onClick={addAccordion}
                                className="text-xs bg-slate-100 hover:bg-slate-200 border px-3 py-1.5 rounded-md font-medium transition-colors"
                            >
                                + Хөтөлбөр нэмэх
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {(() => {
                                let accordions = [];
                                try { accordions = JSON.parse(settings.anniversary_accordions || "[]"); } catch(e) {}
                                
                                return accordions.length === 0 ? (
                                    <p className="text-sm text-slate-500 italic">Одоогоор хөтөлбөр нэмэгдээгүй байна.</p>
                                ) : accordions.map((acc: any, index: number) => (
                                    <div key={index} className="p-4 bg-slate-50 border rounded-lg space-y-3 relative group">
                                        <button 
                                            type="button" 
                                            onClick={() => removeAccordion(index)}
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Устгах"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold">Хөтөлбөрийн гарчиг / Огноо</label>
                                            <input
                                                type="text"
                                                value={acc.title}
                                                onChange={(e) => handleAccordionChange(index, "title", e.target.value)}
                                                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold">Дэлгэрэнгүй Мэдээлэл</label>
                                            <textarea
                                                value={acc.content}
                                                onChange={(e) => handleAccordionChange(index, "content", e.target.value)}
                                                rows={3}
                                                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-2 text-right">
                    <button
                        type="submit"
                        disabled={savingSettings}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-6 py-2 disabled:opacity-50"
                    >
                        {savingSettings ? "Хадгалж байна..." : "Тохиргоог Хадгалах"}
                    </button>
                </div>
            </form>

            <hr className="my-8 border-slate-200" />

            {/* PART 2: DYNAMIC POSTS (ONLY ANNIVERSARY TYPE) */}
            <div id="post-form" className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">2. Ойн Онцгой Мэдээллүүд</h2>
                    <button
                        onClick={adding ? handleCancelPost : () => setAdding(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm"
                    >
                        {adding ? "Цуцлах" : "+ Шинэ мэдээлэл"}
                    </button>
                </div>

                {adding && (
                    <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8">
                        <h3 className="font-semibold text-lg mb-4">{editingId ? "Мэдээлэл засах" : "Шинэ мэдээлэл үүсгэх"}</h3>
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium">Гарчиг *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        placeholder="Мэдээний гарчиг"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-sm font-medium">Слаг / холбоос *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 text-sm bg-slate-50"
                                        disabled={!!editingId}
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-sm font-medium">Төрөл</label>
                                    <input
                                        type="text"
                                        value="100 жилийн ой"
                                        disabled
                                        className="w-full border rounded-md px-3 py-2 text-sm bg-slate-100 text-slate-500"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-sm font-medium">Зураг (URL)</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        placeholder="Зургийн линк оруулна уу"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-sm font-medium">Нийтлэх огноо</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.createdAt}
                                        onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 text-sm">
                                    <label className="font-medium">Товч утга (Excerpt)</label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 min-h-[60px]"
                                        placeholder="Жагсаалтанд харагдах богино текст..."
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 text-sm">
                                    <label className="font-medium">Үндсэн агуулга *</label>
                                    <textarea
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 min-h-[200px]"
                                        placeholder="Нийтлэлийн дэлгэрэнгүй агуулга..."
                                    />
                                </div>
                                <div className="col-span-2 flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="isPublished"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="isPublished" className="text-sm font-medium leading-none">
                                        Олон нийтэд нийтлэх (Одоо шууд харагдах эсэх)
                                    </label>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-2">
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                                    {editingId ? "Шинэчлэх" : "Нийтлэх"}
                                </button>
                                <button type="button" onClick={handleCancelPost} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300">
                                    Цуцлах
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="rounded-md border bg-white">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b text-slate-500 font-medium">
                            <tr>
                                <th className="px-4 py-3">Гарчиг</th>
                                <th className="px-4 py-3">Төлөв</th>
                                <th className="px-4 py-3">Үүсгэсэн</th>
                                <th className="px-4 py-3 text-right">Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingPosts ? (
                                <tr><td colSpan={4} className="text-center py-8">Ачаалж байна...</td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-8 text-slate-500">Системд бүртгэлтэй нийтлэл алга байна.</td></tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="border-b hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium">{post.title}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800">
                                                {post.published ? 'Нийтлэгдсэн' : 'Ноорог'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => handleEditPost(post)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Засах</button>
                                            <button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Устгах</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
