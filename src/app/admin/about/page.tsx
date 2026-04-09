"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function AdminAboutPage() {
    // ---- SETTINGS STATE ----
    const [settings, setSettings] = useState({
        about_hero_image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop",
        about_hero_title: "БИДНИЙ ТУХАЙ",
        about_hero_subtitle: "Монголын Үндэсний Зуслангуудын Холбооны Танилцуулга",
        about_mission_text: "Монголын Үндэсний Зуслангуудын Холбоо (МҮЗХ) нь үүсгэн байгуулагч гишүүдийн санаачилгаар 2006 онд байгуулагдсан үндэсний хэмжээний гишүүддээ үйлчилдэг төрийн бус байгууллага юм. Тус холбоо нь Монгол Улсад үйл ажиллагаа явуулж буй хүүхдийн зуслангуудыг өмчийн хэлбэр үл харгалзан нэгтгэн зохион байгуулж, салбарын хөгжлийг бодлогын түвшинд дэмжих, мэргэжил арга зүйн зөвлөгөө өгөх, хүний нөөцийн чадавхыг бэхжүүлэх, гишүүн байгууллагуудын тогтвортой хөгжлийг хангах чиглэлээр ажиллаж байна.",
        about_timeline: '[{"year":"2006","title":"Үүсгэн байгуулагдсан","description":"Монгол улсад үйл ажиллагаа явуулж буй зуслангуудыг нэгтгэв."},{"year":"2012","title":"ОУЗХ-ны гишүүн","description":"Олон улсын зуслангийн холбоо (ICF)-ны жинхэнэ гишүүн байгууллага болсон."},{"year":"2025","title":"Ази, Номхон далай","description":"Ази, номхон далайн орнуудын зуслангийн холбоог үүсгэн байгууллаа."}]',
        about_intro_title: "МОНГОЛЫН ҮНДЭСНИЙ ЗУСЛАНГУУДЫН ХОЛБООНЫ ТАНИЛЦУУЛГА",
        about_intro_text: "",
        about_intro_image: "",
        about_vision_title: "Алсын хараа",
        about_vision_text: "",
        about_vision_image: "",
        about_structure_title: "Бүтэц засаглал",
        about_structure_text: "",
        about_structure_image: "",
    });
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [savingSettings, setSavingSettings] = useState(false);
    const [message, setMessage] = useState("");

    // ---- POSTS STATE (BOARD MEMBERS) ----
    const [posts, setPosts] = useState<any[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "Удирдах зөвлөлийн гишүүн", // Mock content since not really used on public card
        excerpt: "Удирдах зөвлөлийн гишүүн",
        imageUrl: "",
        type: "BOARD_MEMBER",
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
                
                // Fetch Board Members
                const resPosts = await fetch("/api/posts?admin=true&type=BOARD_MEMBER");
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
        const resPosts = await fetch("/api/posts?admin=true&type=BOARD_MEMBER");
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

    const handleTimelineChange = (index: number, field: string, value: string) => {
        try {
            const timeline = JSON.parse(settings.about_timeline || "[]");
            timeline[index][field] = value;
            setSettings(prev => ({ ...prev, about_timeline: JSON.stringify(timeline) }));
        } catch(e) {}
    };

    const addTimelineEvent = () => {
        try {
            const timeline = JSON.parse(settings.about_timeline || "[]");
            timeline.push({ year: "2024", title: "Шинэ үйл явдал", description: "Тайлбар оруулах" });
            setSettings(prev => ({ ...prev, about_timeline: JSON.stringify(timeline) }));
        } catch(e) {}
    };

    const removeTimelineEvent = (index: number) => {
        try {
            const timeline = JSON.parse(settings.about_timeline || "[]");
            timeline.splice(index, 1);
            setSettings(prev => ({ ...prev, about_timeline: JSON.stringify(timeline) }));
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
                setMessage("Тохиргоо амжилттай хадгалагдлаа!");
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

    // ---- POSTS HANDLERS (BOARD MEMBERS) ----
    const generateSlug = (text: string) => {
        const slug = text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            // Allow cyrillic characters: \u0400-\u04FF
            .replace(/[^\w\-\u0400-\u04FF]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        
        // If slug is empty (e.g. only special characters), use a timestamp
        return slug || `member-${Date.now()}`;
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
            content: post.content || "Удирдах зөвлөлийн гишүүн",
            excerpt: post.excerpt || "",
            imageUrl: post.imageUrl || "",
            type: "BOARD_MEMBER",
            published: post.published !== undefined ? post.published : true,
            createdAt: post.createdAt ? new Date(post.createdAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
        });
        setAdding(true);
        document.getElementById('post-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm("Устгах уу?")) return;
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
            title: "", slug: "", content: "Удирдах зөвлөлийн гишүүн", excerpt: "Удирдах зөвлөлийн гишүүн", imageUrl: "", type: "BOARD_MEMBER", published: true, 
            createdAt: new Date().toISOString().slice(0, 16)
        });
    };

    if (loadingSettings) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    }

    return (
        <div className="space-y-12 pb-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Бидний Тухай</h1>
                <p className="text-muted-foreground">Байгууллагын танилцуулга хуудас болон Удирдах зөвлөлийн гишүүд.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-md text-sm font-medium ${message.includes("амжилттай") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    {message}
                </div>
            )}

            {/* PART 1: PAGE UI SETTINGS */}
            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-4xl border rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-slate-800">1. Хуудасны Үндсэн Текст & Түүхэн Замнал</h2>
                </div>
                
                <div className="px-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Толгой Зураг (Hero Image/Upload)</label>
                        <ImageUpload
                            value={settings.about_hero_image || ""}
                            onChange={(url) => setSettings({ ...settings, about_hero_image: url })}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm font-medium leading-none">Гарчиг</label>
                            <input
                                type="text"
                                name="about_hero_title"
                                value={settings.about_hero_title}
                                onChange={handleSettingsChange}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm font-medium leading-none">Дэд Тайлбар</label>
                            <input
                                type="text"
                                name="about_hero_subtitle"
                                value={settings.about_hero_subtitle}
                                onChange={handleSettingsChange}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Бидний эрхэм зорилго (Mission Text)</label>
                        <textarea
                            name="about_mission_text"
                            value={settings.about_mission_text}
                            onChange={handleSettingsChange}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="pt-4 border-t mt-6 space-y-6">
                        <h3 className="text-lg font-medium text-slate-800">2. Танилцуулга Хэсэг (Introduction)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Танилцуулгын Гарчиг</label>
                                <input
                                    type="text"
                                    name="about_intro_title"
                                    value={settings.about_intro_title}
                                    onChange={handleSettingsChange}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="МОНГОЛЫН ҮНДЭСНИЙ ЗУСЛАНГУУДЫН ХОЛБООНЫ ТАНИЛЦУУЛГА"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Танилцуулгын Текст</label>
                                <textarea
                                    name="about_intro_text"
                                    value={settings.about_intro_text}
                                    onChange={handleSettingsChange}
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Танилцуулгын Зураг</label>
                                <ImageUpload
                                    value={settings.about_intro_image || ""}
                                    onChange={(url) => setSettings({ ...settings, about_intro_image: url })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-6 space-y-6">
                        <h3 className="text-lg font-medium text-slate-800">3. Алсын Хараа Хэсэг (Vision)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Алсын Хараа Гарчиг</label>
                                <input
                                    type="text"
                                    name="about_vision_title"
                                    value={settings.about_vision_title}
                                    onChange={handleSettingsChange}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Алсын Хараа Текст</label>
                                <textarea
                                    name="about_vision_text"
                                    value={settings.about_vision_text}
                                    onChange={handleSettingsChange}
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Алсын Хараа Зураг/Икон</label>
                                <ImageUpload
                                    value={settings.about_vision_image || ""}
                                    onChange={(url) => setSettings({ ...settings, about_vision_image: url })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-6 space-y-6">
                        <h3 className="text-lg font-medium text-slate-800">4. Бүтэц Засаглал Хэсэг (Structure)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Бүтэц Засаглал Гарчиг</label>
                                <input
                                    type="text"
                                    name="about_structure_title"
                                    value={settings.about_structure_title}
                                    onChange={handleSettingsChange}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Бүтэц Засаглал Текст</label>
                                <textarea
                                    name="about_structure_text"
                                    value={settings.about_structure_text}
                                    onChange={handleSettingsChange}
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium leading-none">Бүтэц Засаглал Зураг (Бүдүүвч г.м)</label>
                                <ImageUpload
                                    value={settings.about_structure_image || ""}
                                    onChange={(url) => setSettings({ ...settings, about_structure_image: url })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">5. Түүхэн замнал (Timeline)</h3>
                            <button
                                type="button"
                                onClick={addTimelineEvent}
                                className="text-xs bg-slate-100 hover:bg-slate-200 border px-3 py-1.5 rounded-md font-medium transition-colors"
                            >
                                + Он цаг нэмэх
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {(() => {
                                let timeline = [];
                                try { timeline = JSON.parse(settings.about_timeline || "[]"); } catch(e) {}
                                
                                return timeline.length === 0 ? (
                                    <p className="text-sm text-slate-500 italic">Одоогоор түүхэн замнал нэмэгдээгүй байна.</p>
                                ) : timeline.map((event: any, index: number) => (
                                    <div key={index} className="p-4 bg-slate-50 border rounded-lg grid grid-cols-12 gap-3 relative group">
                                        <button 
                                            type="button" 
                                            onClick={() => removeTimelineEvent(index)}
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            title="Устгах"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <div className="col-span-12 md:col-span-3 space-y-1">
                                            <label className="text-xs font-semibold">Он / Жил</label>
                                            <input
                                                type="text"
                                                value={event.year}
                                                onChange={(e) => handleTimelineChange(index, "year", e.target.value)}
                                                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-4 space-y-1">
                                            <label className="text-xs font-semibold">Үйл явдлын нэр</label>
                                            <input
                                                type="text"
                                                value={event.title}
                                                onChange={(e) => handleTimelineChange(index, "title", e.target.value)}
                                                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-5 space-y-1">
                                            <label className="text-xs font-semibold">Тайлбар</label>
                                            <textarea
                                                value={event.description}
                                                onChange={(e) => handleTimelineChange(index, "description", e.target.value)}
                                                rows={2}
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

            {/* PART 2: DYNAMIC POSTS (BOARD MEMBERS) */}
            <div id="post-form" className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">2. Удирдах Зөвлөлийн Гишүүд</h2>
                    <button
                        onClick={adding ? handleCancelPost : () => setAdding(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm"
                    >
                        {adding ? "Цуцлах" : "+ Гишүүн нэмэх"}
                    </button>
                </div>

                {adding && (
                    <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8">
                        <h3 className="font-semibold text-lg mb-4">{editingId ? "Гишүүн засах" : "Шинэ гишүүн нэмэх"}</h3>
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium">Овог, Нэр *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1 hidden">
                                    <label className="text-sm font-medium">Слаг / холбоос *</label>
                                    <input
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
                                        value="Удирдах зөвлөл"
                                        disabled
                                        className="w-full border rounded-md px-3 py-2 text-sm bg-slate-100 text-slate-500"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-sm font-medium">Цээж Зураг (URL/Upload)</label>
                                    <ImageUpload
                                        value={formData.imageUrl}
                                        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="font-medium text-sm">Албан тушаал / Цол (Excerpt хэсэгт)</label>
                                    <input
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        placeholder="Жишээ нь: Удирдах зөвлөлийн дарга"
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
                                        Вэбсайтад ил харуулах
                                    </label>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-2">
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                                    {editingId ? "Шинэчлэх" : "Нэмэх"}
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
                                <th className="px-4 py-3">Нэр</th>
                                <th className="px-4 py-3">Цол / Албан тушаал</th>
                                <th className="px-4 py-3">Төлөв</th>
                                <th className="px-4 py-3 text-right">Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingPosts ? (
                                <tr><td colSpan={4} className="text-center py-8">Ачаалж байна...</td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-8 text-slate-500">Системд бүртгэлтэй гишүүн алга байна.</td></tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="border-b hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium flex items-center gap-3">
                                            {post.imageUrl ? (
                                                <img src={post.imageUrl} alt={post.title} className="w-8 h-8 rounded-full object-cover border" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">{post.title.charAt(0)}</div>
                                            )}
                                            {post.title}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">{post.excerpt}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800">
                                                {post.published ? 'Идэвхтэй' : 'Ил харагдахгүй'}
                                            </span>
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
