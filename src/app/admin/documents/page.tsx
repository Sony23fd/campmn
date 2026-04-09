"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Document {
    id: string;
    title: string;
    fileUrl: string;
    documentType: string;
    order: number;
    createdAt: string;
}

export default function DocumentsAdminPage() {
    const [docs, setDocs] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState("Хууль");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const categories = ["Хууль", "Журам", "Стандарт", "Бусад"];

    const fetchDocs = async () => {
        try {
            const res = await fetch("/api/documents");
            if (res.ok) {
                setDocs(await res.json());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDocs(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId && !file && !title) return;
        setSaving(true);
        setMessage("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("documentType", documentType);
        if (file) formData.append("file", file);

        try {
            const url = editingId ? `/api/documents/${editingId}` : "/api/documents";
            const method = editingId ? "PATCH" : "POST";
            
            const res = await fetch(url, {
                method: method,
                body: formData,
            });

            if (res.ok) {
                setMessage(editingId ? "Амжилттай шинэчлэгдлээ!" : "Амжилттай хуулагдлаа!");
                resetForm();
                fetchDocs();
            } else {
                setMessage("Алдаа гарлаа.");
            }
        } catch (error) {
            setMessage("Алдаа гарлаа.");
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const resetForm = () => {
        setTitle("");
        setFile(null);
        setEditingId(null);
        setDocumentType("Хууль");
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleEdit = (doc: Document) => {
        setEditingId(doc.id);
        setTitle(doc.title);
        setDocumentType(doc.documentType);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Устгах уу?")) return;
        await fetch(`/api/documents/${id}`, { method: "DELETE" });
        fetchDocs();
    };

    const handleUpdateOrder = async (id: string, newOrder: number) => {
        setDocs(docs.map(d => d.id === id ? { ...d, order: newOrder } : d));
        try {
            await fetch(`/api/documents/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: newOrder })
            });
        } catch (error) {
            console.error(error);
        }
    };

    const reSortDocs = () => {
        setDocs([...docs].sort((a, b) => (a.order || 0) - (b.order || 0)));
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Уншиж байна...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Хууль тогтоомж / Файл</h1>
                <p className="text-muted-foreground">PDF файлуудыг системд хуулж нийтлэх.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-xl bg-card transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">{editingId ? "Засах" : "Шинээр нэмэх"}</h2>
                            {editingId && (
                                <button type="button" onClick={resetForm} className="text-xs text-slate-500 hover:text-red-500 font-bold uppercase tracking-wider">
                                    Болих
                                </button>
                            )}
                        </div>
                        {message && <div className={`p-3 text-sm rounded ${message.includes('Амжилттай') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message}</div>}
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Гарчиг *</label>
                            <input required value={title} onChange={(e) => setTitle(e.target.value)} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ангилал *</label>
                            <select 
                                value={documentType} 
                                onChange={(e) => setDocumentType(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-white"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Файл {editingId ? "(Солих бол сонгоно уу)" : "хуулах (PDF) *"}</label>
                            <input required={!editingId} id="file-upload" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="flex w-full rounded-md border border-slate-200 px-3 py-2 text-sm file:mr-4 file:bg-slate-100" />
                        </div>
                        <button type="submit" disabled={saving} className={`w-full flex justify-center rounded-md ${editingId ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'} text-white h-10 px-4 py-2 mt-4 transition-colors`}>
                            {saving ? "Хадгалж байна..." : editingId ? "Өөрчлөлтийг хадгалах" : "Файл оруулах"}
                        </button>
                    </form>
                </div>

                <div className="md:col-span-2">
                    <div className="border rounded-xl bg-white">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 w-20">Эрэмбэ</th>
                                    <th className="px-6 py-3">Гарчиг</th>
                                    <th className="px-6 py-3">Ангилал</th>
                                    <th className="px-6 py-3">Огноо</th>
                                    <th className="px-6 py-3">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {docs.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Мэдээлэл олдсонгүй</td></tr>
                                ) : (
                                    docs.map(doc => (
                                        <tr key={doc.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <input 
                                                    type="number" 
                                                    value={doc.order || 0} 
                                                    onChange={(e) => handleUpdateOrder(doc.id, parseInt(e.target.value) || 0)}
                                                    onBlur={reSortDocs}
                                                    className="w-16 h-8 rounded border px-2 text-center text-sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                <div className="flex flex-col">
                                                    <a href={doc.fileUrl} target="_blank" className="text-indigo-600 hover:underline">
                                                        {doc.title}
                                                    </a>
                                                    <span className="text-[10px] text-slate-400 font-mono mt-1">{doc.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                                                    {doc.documentType || "Тодорхойгүй"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{new Date(doc.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <button onClick={() => handleEdit(doc)} className="text-indigo-600 hover:text-indigo-800 font-medium">
                                                    Засах
                                                </button>
                                                <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:text-red-700 font-medium">
                                                    Устгах
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
