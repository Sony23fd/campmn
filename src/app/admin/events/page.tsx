// src/app/admin/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminEvents() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        eventType: "CONFERENCE",
        isOpen: true
    });

    async function fetchEvents() {
        setLoading(true);
        try {
            const response = await fetch("/api/events");
            const data = await response.json();
            if (Array.isArray(data)) setEvents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/events/${editingId}` : "/api/events";
            const method = editingId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    startDate: new Date(formData.startDate).toISOString(),
                    endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
                }),
            });
            if (res.ok) {
                handleCancel();
                fetchEvents();
            } else {
                alert(editingId ? "Арга хэмжээ засахад алдаа гарлаа." : "Арга хэмжээ нэмэхэд алдаа гарлаа.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (eventItem: any) => {
        setEditingId(eventItem.id);
        const dateObj = new Date(eventItem.startDate);
        const formattedDate = dateObj.toISOString().split('T')[0];
        
        const endFormattedDate = eventItem.endDate ? new Date(eventItem.endDate).toISOString().split('T')[0] : "";
        
        setFormData({
            title: eventItem.title || "",
            description: eventItem.description || "",
            content: eventItem.content || "",
            startDate: formattedDate,
            endDate: endFormattedDate,
            imageUrl: eventItem.imageUrl || "",
            eventType: eventItem.eventType || "CONFERENCE",
            isOpen: eventItem.isOpen !== undefined ? eventItem.isOpen : true,
        });
        setAdding(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Энэ арга хэмжээг устгах уу?")) return;
        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            if (res.ok) fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setAdding(false);
        setEditingId(null);
        setFormData({ title: "", description: "", content: "", startDate: "", endDate: "", imageUrl: "", eventType: "CONFERENCE", isOpen: true });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Арга хэмжээ, Бүртгэл</h1>
                    <p className="text-muted-foreground">Олон улсын хурал болон солилцооны хөтөлбөрүүдийн удирдлага.</p>
                </div>
                <button
                    onClick={adding ? handleCancel : () => setAdding(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm"
                >
                    {adding ? "Цуцлах" : "+ Шинэ Арга Хэмжээ"}
                </button>
            </div>

            {adding && (
                <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8">
                    <h3 className="font-semibold text-lg mb-4">{editingId ? "Арга хэмжээ засах" : "Арга хэмжээ үүсгэх"}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Гарчиг *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Жишээ: Олон улсын судлаачдын 3-р хурал"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Төрөл *</label>
                                <select
                                    value={formData.eventType}
                                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                                >
                                    <option value="CONFERENCE">Хурал, зөвлөгөөн</option>
                                    <option value="EXCHANGE_PROGRAM">Солилцооны хөтөлбөр (Артек г.м)</option>
                                    <option value="TRAINING">Сургалт</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Эхлэх огноо *</label>
                                <input
                                    required
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Дуусах огноо</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Зураг (URL)</label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="https://... эсвэл /images/event.jpg"
                                />
                            </div>
                            <div className="space-y-2 col-span-2 text-sm">
                                <label className="font-medium">Хураангуй тайлбар (Картан дээр харагдах)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 min-h-[80px]"
                                />
                            </div>
                            <div className="space-y-2 col-span-2 text-sm">
                                <label className="font-medium">Дэлгэрэнгүй агуулга, Хөтөлбөр (HTML байж болно)</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 min-h-[200px]"
                                    placeholder="Арга хэмжээний дэлгэрэнгүй танилцуулга, хөтөлбөрийн хэсгийг энд бичнэ үү."
                                />
                            </div>
                            <div className="col-span-2 flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="isOpen"
                                    checked={formData.isOpen}
                                    onChange={(e) => setFormData({ ...formData, isOpen: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="isOpen" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Бүртгэл нээлттэй эсэх
                                </label>
                            </div>
                        </div>
                        <div className="pt-4 flex gap-2">
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                                {editingId ? "Шинэчлэх" : "Хадгалах"}
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
                            <th className="px-4 py-3">Огноо</th>
                            <th className="px-4 py-3">Бүртгэл</th>
                            <th className="px-4 py-3 text-right">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8">Ачаалж байна...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Системд бүртгэлтэй арга хэмжээ олдсонгүй.</td></tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event.id} className="border-b hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium">{event.title}</td>
                                    <td className="px-4 py-3 text-slate-500">{event.eventType}</td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {new Date(event.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${event.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {event.isOpen ? 'Нээлттэй' : 'Хаагдсан'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={`/admin/events/${event.id}/registrations`} className="text-green-600 hover:text-green-800 text-sm font-medium mr-3">
                                            Бүртгэлүүд ({event._count?.registrations || 0})
                                        </Link>
                                        <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Засах</button>
                                        <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Устгах</button>
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
