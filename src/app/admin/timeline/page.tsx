"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

interface TimelineEvent {
    id: string;
    year: string;
    title: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    order: number;
    isActive: boolean;
}

export default function TimelineAdminPage() {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        year: "",
        title: "",
        description: "",
        imageUrl: "",
        videoUrl: "",
        order: 0,
        isActive: true,
    });
    const [message, setMessage] = useState("");

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/timeline");
            if (res.ok) setEvents(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchEvents(); }, []);

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            year: "",
            title: "",
            description: "",
            imageUrl: "",
            videoUrl: "",
            order: 0,
            isActive: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        const url = editingId ? `/api/timeline/${editingId}` : "/api/timeline";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setMessage(editingId ? "Амжилттай засагдлаа!" : "Шинэ үйл явдал нэмэгдлээ!");
                resetForm();
                fetchEvents();
            } else {
                setMessage("Алдаа гарлаа.");
            }
        } catch (e) {
            setMessage("Серверийн алдаа.");
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleEdit = (event: TimelineEvent) => {
        setEditingId(event.id);
        setFormData({
            year: event.year,
            title: event.title,
            description: event.description || "",
            imageUrl: event.imageUrl || "",
            videoUrl: event.videoUrl || "",
            order: event.order,
            isActive: event.isActive,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Устгах уу?")) return;
        await fetch(`/api/timeline/${id}`, { method: "DELETE" });
        fetchEvents();
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Уншиж байна...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Түүхэн замнал (Timeline)</h1>
                <p className="text-muted-foreground">100 Жилийн ойн түүхэн замнал хуудсанд харагдах үйл явдлуудыг удирдах</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-xl bg-card">
                        <h2 className="text-xl font-semibold">{editingId ? "Засварлах" : "Шинэ үйл явдал нэмэх"}</h2>
                        {message && <div className="p-3 text-sm rounded bg-green-50 text-green-700 border border-green-200">{message}</div>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Он *</label>
                            <input required value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Жишээ: 1926" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Гарчиг *</label>
                            <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Жишээ: МҮЗХ байгуулагдсан" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Тайлбар</label>
                            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="flex w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Дэлгэрэнгүй..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Зураг URL</label>
                            <ImageUpload 
                                value={formData.imageUrl} 
                                onChange={(url) => setFormData({...formData, imageUrl: url})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Видео YouTube URL</label>
                            <input value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="https://youtube.com/..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Эрэмбэ</label>
                            <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" />
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button type="submit" disabled={saving} className="flex-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 font-medium text-sm">
                                {saving ? "Хадгалж байна..." : editingId ? "Шинэчлэх" : "Нэмэх"}
                            </button>
                            {editingId && (
                                <button type="button" onClick={resetForm} className="flex-1 rounded-md bg-slate-200 text-slate-800 hover:bg-slate-300 h-10 px-4 py-2 text-sm">
                                    Цуцлах
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="md:col-span-2">
                    <div className="border rounded-xl bg-white overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">#</th>
                                    <th className="px-6 py-3 font-semibold">Он</th>
                                    <th className="px-6 py-3 font-semibold">Гарчиг</th>
                                    <th className="px-6 py-3 font-semibold">Төрөл</th>
                                    <th className="px-6 py-3 font-semibold">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {events.length === 0 ? (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Үйл явдал олдсонгүй</td></tr>
                                ) : events.map(event => (
                                    <tr key={event.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-400">{event.order}</td>
                                        <td className="px-6 py-4 font-bold text-blue-600">{event.year}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 max-w-[200px] truncate">{event.title}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {event.videoUrl ? <span className="text-red-500 text-xs font-bold px-2 py-1 bg-red-50 rounded">ВИДЕО</span> : 
                                             event.imageUrl ? <span className="text-blue-500 text-xs font-bold px-2 py-1 bg-blue-50 rounded">ЗУРАГ</span> : 
                                             <span className="text-slate-500 text-xs font-bold px-2 py-1 bg-slate-100 rounded">ТЕКСТ</span>}
                                        </td>
                                        <td className="px-6 py-4 space-x-3">
                                            <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-800 font-medium">Засах</button>
                                            <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700 font-medium">Устгах</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
