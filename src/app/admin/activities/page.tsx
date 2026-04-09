"use client";

import { useState, useEffect } from "react";

interface ActivityItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl: string | null;
    order: number;
}

interface ActivityCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    items: ActivityItem[];
}

export default function ActivitiesAdminPage() {
    const [categories, setCategories] = useState<ActivityCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Category form
    const [catName, setCatName] = useState("");
    const [catDesc, setCatDesc] = useState("");
    const [catOrder, setCatOrder] = useState(0);
    const [editingCatId, setEditingCatId] = useState<string | null>(null);

    // Item form
    const [showItemForm, setShowItemForm] = useState<string | null>(null);
    const [itemTitle, setItemTitle] = useState("");
    const [itemContent, setItemContent] = useState("");
    const [itemOrder, setItemOrder] = useState(0);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/activities");
            if (res.ok) setCategories(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const showMsg = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    // ====== CATEGORY CRUD ======
    const resetCatForm = () => {
        setEditingCatId(null);
        setCatName("");
        setCatDesc("");
        setCatOrder(0);
    };

    const handleCatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const payload = { name: catName, description: catDesc, order: catOrder };
        const url = editingCatId ? `/api/activities/${editingCatId}` : "/api/activities";
        const method = editingCatId ? "PUT" : "POST";

        try {
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (res.ok) {
                showMsg(editingCatId ? "Чиглэл засагдлаа!" : "Шинэ чиглэл нэмэгдлээ!");
                resetCatForm();
                fetchData();
            }
        } catch (e) { showMsg("Алдаа гарлаа"); }
        finally { setSaving(false); }
    };

    const handleDeleteCat = async (id: string) => {
        if (!confirm("Энэ чиглэл болон доторх бүх нийтлэлүүд устах болно. Устгах уу?")) return;
        await fetch(`/api/activities/${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleEditCat = (cat: ActivityCategory) => {
        setEditingCatId(cat.id);
        setCatName(cat.name);
        setCatDesc(cat.description || "");
        setCatOrder(cat.order);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ====== ITEM CRUD ======
    const resetItemForm = () => {
        setEditingItemId(null);
        setItemTitle("");
        setItemContent("");
        setItemOrder(0);
    };

    const handleItemSubmit = async (e: React.FormEvent, categoryId: string) => {
        e.preventDefault();
        setSaving(true);
        const payload = { categoryId, title: itemTitle, content: itemContent, order: itemOrder };
        const url = editingItemId ? `/api/activity-items/${editingItemId}` : "/api/activity-items";
        const method = editingItemId ? "PUT" : "POST";

        try {
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (res.ok) {
                showMsg(editingItemId ? "Нийтлэл засагдлаа!" : "Шинэ нийтлэл нэмэгдлээ!");
                resetItemForm();
                setShowItemForm(null);
                fetchData();
            }
        } catch (e) { showMsg("Алдаа гарлаа"); }
        finally { setSaving(false); }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Нийтлэлийг устгах уу?")) return;
        await fetch(`/api/activity-items/${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleEditItem = (item: ActivityItem, catId: string) => {
        setEditingItemId(item.id);
        setItemTitle(item.title);
        setItemContent(item.content);
        setItemOrder(item.order);
        setShowItemForm(catId);
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Уншиж байна...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Үйл ажиллагаа</h1>
                <p className="text-muted-foreground">Динамик чиглэлүүд болон дэд нийтлэлүүдийг удирдах. Вэбсайтын цэс автоматаар шинэчлэгдэнэ.</p>
            </div>

            {message && <div className="p-3 text-sm rounded bg-green-50 text-green-700 border border-green-200">{message}</div>}

            {/* Category Form */}
            <form onSubmit={handleCatSubmit} className="p-6 border rounded-xl bg-card space-y-4 max-w-xl">
                <h2 className="text-lg font-semibold">{editingCatId ? "Чиглэл засварлах" : "Шинэ чиглэл нэмэх"}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                        <label className="text-sm font-medium">Чиглэлийн нэр *</label>
                        <input required value={catName} onChange={(e) => setCatName(e.target.value)} className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" placeholder="Жишээ: Дотоод үйл ажиллагаа" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Тайлбар</label>
                        <input value={catDesc} onChange={(e) => setCatDesc(e.target.value)} className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Эрэмбэ</label>
                        <input type="number" value={catOrder} onChange={(e) => setCatOrder(Number(e.target.value))} className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button type="submit" disabled={saving} className="rounded-md bg-blue-600 text-white hover:bg-blue-700 h-10 px-6 text-sm font-medium">
                        {saving ? "..." : editingCatId ? "Шинэчлэх" : "Нэмэх"}
                    </button>
                    {editingCatId && <button type="button" onClick={resetCatForm} className="rounded-md bg-slate-200 text-slate-800 h-10 px-4 text-sm">Цуцлах</button>}
                </div>
            </form>

            {/* Categories List */}
            <div className="space-y-6">
                {categories.length === 0 ? (
                    <div className="p-10 text-center text-slate-500 border rounded-xl">Одоогоор чиглэл нэмэгдээгүй байна.</div>
                ) : categories.map(cat => (
                    <div key={cat.id} className="border rounded-xl bg-white overflow-hidden">
                        {/* Category Header */}
                        <div className="bg-slate-50 px-6 py-4 border-b flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                                {cat.description && <p className="text-sm text-slate-500">{cat.description}</p>}
                                <p className="text-xs text-slate-400 mt-1">Slug: /{cat.slug} · Дэд нийтлэл: {cat.items.length}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => {
                                    if (showItemForm === cat.id) {
                                        setShowItemForm(null);
                                        resetItemForm();
                                    } else {
                                        setShowItemForm(cat.id);
                                        resetItemForm();
                                    }
                                }} className="rounded-md bg-indigo-600 text-white hover:bg-indigo-700 h-9 px-4 text-sm font-medium">
                                    + Нийтлэл нэмэх
                                </button>
                                <button onClick={() => handleEditCat(cat)} className="text-blue-600 hover:text-blue-800 font-medium text-sm px-2">Засах</button>
                                <button onClick={() => handleDeleteCat(cat.id)} className="text-red-500 hover:text-red-700 font-medium text-sm px-2">Устгах</button>
                            </div>
                        </div>

                        {/* Add/Edit Item Form */}
                        {showItemForm === cat.id && (
                            <form onSubmit={(e) => handleItemSubmit(e, cat.id)} className="p-5 bg-blue-50/50 border-b space-y-3">
                                <h4 className="font-semibold text-sm">{editingItemId ? "Нийтлэл засварлах" : "Шинэ нийтлэл нэмэх"}</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Гарчиг *</label>
                                        <input required value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} className="h-9 w-full rounded-md border px-3 text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Эрэмбэ</label>
                                        <input type="number" value={itemOrder} onChange={(e) => setItemOrder(Number(e.target.value))} className="h-9 w-full rounded-md border px-3 text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Контент *</label>
                                    <textarea required value={itemContent} onChange={(e) => setItemContent(e.target.value)} rows={4} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="HTML эсвэл энгийн текст..." />
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={saving} className="rounded-md bg-indigo-600 text-white hover:bg-indigo-700 h-9 px-5 text-sm font-medium">
                                        {saving ? "..." : editingItemId ? "Шинэчлэх" : "Нэмэх"}
                                    </button>
                                    <button type="button" onClick={() => { setShowItemForm(null); resetItemForm(); }} className="rounded-md bg-slate-200 text-slate-700 h-9 px-4 text-sm">Болих</button>
                                </div>
                            </form>
                        )}

                        {/* Items Table */}
                        {cat.items.length > 0 && (
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50/60">
                                    <tr>
                                        <th className="px-6 py-2 text-xs font-semibold text-slate-500">#</th>
                                        <th className="px-6 py-2 text-xs font-semibold text-slate-500">Гарчиг</th>
                                        <th className="px-6 py-2 text-xs font-semibold text-slate-500">Slug</th>
                                        <th className="px-6 py-2 text-xs font-semibold text-slate-500">Үйлдэл</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {cat.items.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-3 text-slate-400">{item.order}</td>
                                            <td className="px-6 py-3 font-medium text-slate-900">{item.title}</td>
                                            <td className="px-6 py-3 text-slate-500 text-xs font-mono">/{cat.slug}/{item.slug}</td>
                                            <td className="px-6 py-3 space-x-3">
                                                <button onClick={() => handleEditItem(item, cat.id)} className="text-blue-600 hover:text-blue-800 font-medium">Засах</button>
                                                <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-700 font-medium">Устгах</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {cat.items.length === 0 && !showItemForm && (
                            <div className="px-6 py-6 text-center text-sm text-slate-400">Энэ чиглэлд одоогоор нийтлэл нэмэгдээгүй.</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
