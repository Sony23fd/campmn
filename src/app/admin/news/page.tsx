// src/app/admin/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function AdminPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("NEWS");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        imageUrl: "",
        type: "NEWS",
        published: true,
        createdAt: new Date().toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:mm
    });

    // Dummy user ID since we don't have NextAuth connected yet in this iteration
    const MOCK_AUTHOR_ID = "00000000-0000-0000-0000-000000000000";

    async function fetchPosts() {
        setLoading(true);
        try {
            const response = await fetch(`/api/posts?admin=true&type=${activeTab}`);
            const data = await response.json();
            if (Array.isArray(data)) setPosts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [activeTab]);

    const generateSlug = (text: string) => {
        const slug = text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-\u0400-\u04FF]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        
        return slug || `post-${Date.now()}`;
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (!editingId) {
            setFormData({ ...formData, title, slug: generateSlug(title) });
        } else {
            setFormData({ ...formData, title });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
            const method = editingId ? "PUT" : "POST";
            
            const payload = {
                ...formData,
                authorId: MOCK_AUTHOR_ID // Only essentially strictly needed on POST, but harmless on PUT
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                handleCancel();
                fetchPosts();
            } else {
                const errData = await res.json();
                alert(errData.error || "Алдаа гарлаа.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (post: any) => {
        setEditingId(post.id);
        setFormData({
            title: post.title || "",
            slug: post.slug || "",
            content: post.content || "",
            excerpt: post.excerpt || "",
            imageUrl: post.imageUrl || "",
            type: post.type || "NEWS",
            published: post.published !== undefined ? post.published : true,
            createdAt: post.createdAt ? new Date(post.createdAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
        });
        setAdding(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Энэ нийтлэлийг устгах уу?")) return;
        try {
            const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (res.ok) fetchPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setAdding(false);
        setEditingId(null);
        setFormData({ 
            title: "", slug: "", content: "", excerpt: "", imageUrl: "", type: activeTab, published: true, 
            createdAt: new Date().toISOString().slice(0, 16)
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Мэдээлэл & Нийтлэлүүд</h1>
                    <p className="text-muted-foreground">Мэдээ, эрдэм шинжилгээ, зөвлөмжүүдийг удирдах.</p>
                </div>
                <button
                    onClick={adding ? handleCancel : () => { setFormData(prev => ({ ...prev, type: activeTab })); setAdding(true); }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm"
                >
                    {adding ? "Цуцлах" : "+ Шинээр нэмэх"}
                </button>
            </div>

            {/* Type Filter Tabs */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                {[
                    { key: "NEWS", label: "📰 Мэдээ" },
                    { key: "RESEARCH", label: "🔬 Эрдэм шинжилгээ" },
                    { key: "RECOMMENDATION", label: "📋 Зөвлөмж" },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => { setActiveTab(tab.key); handleCancel(); }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab.key ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {adding && (
                <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8">
                    <h3 className="font-semibold text-lg mb-4">{editingId ? "Нийтлэл засах" : "Шинэ нийтлэл үүсгэх"}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Гарчиг *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Нийтлэлийн гарчиг"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Слаг / холбоос *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm bg-slate-50"
                                    disabled={!!editingId}
                                />
                                <p className="text-xs text-muted-foreground">URL дээр харагдах нэр (Англи үсгээр). Жишээ нь: shine-jiliin-mend</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-500">Төрөл (Type)</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                >
                                    <option value="NEWS">Мэдээ мэдээлэл</option>
                                    <option value="RESEARCH">Эрдэм шинжилгээ</option>
                                    <option value="RECOMMENDATION">Зөвлөмж</option>
                                </select>
                            </div>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium">Зураг (URL/Upload)</label>
                                <ImageUpload
                                    value={formData.imageUrl}
                                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
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
                                <p className="text-xs text-muted-foreground mt-1">Хуучин мэдээ оруулах бол огноог нь буцааж тааруулна уу.</p>
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
                                <p className="text-xs text-muted-foreground mt-1">Дараагийн хөгжүүлэлтээр Rich Text Editor (Tiptap) нэмэгдэх болно.</p>
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
                            <button type="button" onClick={handleCancel} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300">
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
                            <th className="px-4 py-3">Төрөл</th>
                            <th className="px-4 py-3">Төлөв</th>
                            <th className="px-4 py-3">Үүсгэсэн</th>
                            <th className="px-4 py-3 text-right">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8">Ачаалж байна...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Системд бүртгэлтэй нийтлэл алга байна. Шинээр нэмнэ үү.</td></tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium">{post.title}</td>
                                    <td className="px-4 py-3 text-slate-500">{post.type}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800">
                                            {post.published ? 'Нийтлэгдсэн' : 'Ноорог'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Засах</button>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Устгах</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
