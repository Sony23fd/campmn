// src/app/admin/camps/page.tsx
"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface Camp {
    id: string;
    name: string;
    location: string;
    capacity: number;
    badge?: string;
    isActive: boolean;
}

export default function AdminCamps() {
    const [camps, setCamps] = useState<Camp[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        capacity: "",
        establishedAt: "",
        contactPhone: "",
        contactEmail: "",
        website: "",
        imageUrl: "",
        ageCategories: "",
        campDirection: "",
        locationMapUrl: "",
        badge: "",
    });

    const [shifts, setShifts] = useState<{name: string, date: string, price: string}[]>([]);
    const [programs, setPrograms] = useState<{title: string, description: string}[]>([]);
    const [groups, setGroups] = useState<{title: string, description: string, imageUrl?: string}[]>([]);

    const handleAddShift = () => setShifts([...shifts, { name: "", date: "", price: "" }]);
    const handleRemoveShift = (i: number) => setShifts(shifts.filter((_, idx) => idx !== i));
    const handleShiftChange = (i: number, field: string, value: string) => {
        const newShifts = [...shifts];
        (newShifts[i] as any)[field] = value;
        setShifts(newShifts);
    };

    const handleAddProgram = () => setPrograms([...programs, { title: "", description: "" }]);
    const handleRemoveProgram = (i: number) => setPrograms(programs.filter((_, idx) => idx !== i));
    const handleProgramChange = (i: number, field: string, value: string) => {
        const newProgs = [...programs];
        (newProgs[i] as any)[field] = value;
        setPrograms(newProgs);
    };

    async function fetchCamps() {
        setLoading(true);
        try {
            const response = await fetch("/api/camps");
            const data = await response.json();
            if (Array.isArray(data)) setCamps(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCamps();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/camps/${editingId}` : "/api/camps";
            const method = editingId ? "PUT" : "POST";
            const body = {
                ...formData,
                shiftsData: shifts,
                programsData: programs,
                groupsData: groups,
            };
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                handleCancel();
                fetchCamps();
            } else {
                alert(editingId ? "Зуслан засахад алдаа гарлаа." : "Зуслан нэмэхэд алдаа гарлаа.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (camp: any) => {
        setEditingId(camp.id);
        setFormData({
            name: camp.name || "",
            description: camp.description || "",
            location: camp.location || "",
            capacity: camp.capacity ? camp.capacity.toString() : "",
            establishedAt: camp.establishedAt ? camp.establishedAt.toString() : "",
            contactPhone: camp.contactPhone || "",
            contactEmail: camp.contactEmail || "",
            website: camp.website || "",
            imageUrl: camp.imageUrl || "",
            ageCategories: camp.ageCategories || "",
            campDirection: camp.campDirection || "",
            locationMapUrl: camp.locationMapUrl || "",
            badge: camp.badge || "",
        });
        setShifts(camp.shiftsData ? (Array.isArray(camp.shiftsData) ? camp.shiftsData : JSON.parse(camp.shiftsData as string)) : []);
        setPrograms(camp.programsData ? (Array.isArray(camp.programsData) ? camp.programsData : JSON.parse(camp.programsData as string)) : []);
        setGroups(camp.groupsData ? (Array.isArray(camp.groupsData) ? camp.groupsData : JSON.parse(camp.groupsData as string)) : []);
        setAdding(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Энэ зусланг устгах уу?")) return;
        try {
            const res = await fetch(`/api/camps/${id}`, { method: "DELETE" });
            if (res.ok) fetchCamps();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setAdding(false);
        setEditingId(null);
        setFormData({ name: "", description: "", location: "", capacity: "", establishedAt: "", contactPhone: "", contactEmail: "", website: "", imageUrl: "", ageCategories: "", campDirection: "", locationMapUrl: "", badge: "" });
        setShifts([]);
        setPrograms([]);
        setGroups([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Зуслангуудын удирдлага</h1>
                    <p className="text-muted-foreground">Системд бүртгэлтэй бүх зуслангийн мэдээлэл.</p>
                </div>
                <button
                    onClick={adding ? handleCancel : () => setAdding(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm"
                >
                    {adding ? "Цуцлах" : "+ Шинэ зуслан нэмэх"}
                </button>
            </div>

            {adding && (
                <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8">
                    <h3 className="font-semibold text-lg mb-4">{editingId ? "Зуслан засах" : "Шинэ зуслан бүртгэх"}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Зуслангийн нэр *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Жишээ: Найрамдал"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Байршил</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Жишээ: Төв аймаг..."
                                />
                            </div>
                            <div className="space-y-2 col-span-2 text-sm">
                                <label className="font-medium">Танилцуулга</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 min-h-[100px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Хүчин чадал (хүүхдийн тоо)</label>
                                <input
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Байгуулагдсан он</label>
                                <input
                                    type="number"
                                    value={formData.establishedAt}
                                    onChange={(e) => setFormData({ ...formData, establishedAt: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Жишээ: 1978"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Утасны дугаар</label>
                                <input
                                    type="text"
                                    value={formData.contactPhone}
                                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">И-мэйл хаяг</label>
                                <input
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Вэбсайт эсвэл FB хуудас</label>
                                <input
                                    type="text"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Зурагны холбоос (Image/Upload)</label>
                                <ImageUpload
                                    value={formData.imageUrl}
                                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Насны ангилал</label>
                                <input
                                    type="text"
                                    value={formData.ageCategories}
                                    onChange={(e) => setFormData({ ...formData, ageCategories: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Жишээ: 6-18 нас"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Онцлох/Топ Badge</label>
                                <input
                                    type="text"
                                    value={formData.badge}
                                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Топ, Онцлох, Зүүн бүс гэх мэт..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Үйл ажиллагааны чиглэл</label>
                                <input
                                    type="text"
                                    value={formData.campDirection}
                                    onChange={(e) => setFormData({ ...formData, campDirection: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Жишээ: Экологи төвлөрсөн, Амралт сувилал..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Газрын зураг (Map Embed URL)</label>
                                <input
                                    type="text"
                                    value={formData.locationMapUrl}
                                    onChange={(e) => setFormData({ ...formData, locationMapUrl: e.target.value })}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    placeholder="Google Maps iframe URL..."
                                />
                            </div>

                            {/* Shifts Builder */}
                            <div className="col-span-2 space-y-4 pt-4 border-t mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold">Ээлжийн хуваарь</label>
                                    <button type="button" onClick={handleAddShift} className="text-xs bg-slate-100 border px-3 py-1.5 rounded-md hover:bg-slate-200">+ Ээлж нэмэх</button>
                                </div>
                                {shifts.map((shift, i) => (
                                    <div key={`shift-${i}`} className="flex gap-2 items-center bg-slate-50 p-3 rounded-md border">
                                        <input type="text" value={shift.name} onChange={(e) => handleShiftChange(i, "name", e.target.value)} placeholder="Нэр (Ж нь: 1-р ээлж)" className="w-1/3 border rounded px-2 py-1 text-sm" />
                                        <input type="text" value={shift.date} onChange={(e) => handleShiftChange(i, "date", e.target.value)} placeholder="Хугацаа (Ж нь: 06/15-06/22)" className="w-1/3 border rounded px-2 py-1 text-sm" />
                                        <input type="text" value={shift.price} onChange={(e) => handleShiftChange(i, "price", e.target.value)} placeholder="Үнэ (Ж нь: 450,000₮)" className="w-1/3 border rounded px-2 py-1 text-sm" />
                                        <button type="button" onClick={() => handleRemoveShift(i)} className="text-red-500 font-bold px-2">X</button>
                                    </div>
                                ))}
                            </div>

                            {/* Programs Builder */}
                            <div className="col-span-2 space-y-4 pt-4 border-t mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold">Хөтөлбөрүүд</label>
                                    <button type="button" onClick={handleAddProgram} className="text-xs bg-slate-100 border px-3 py-1.5 rounded-md hover:bg-slate-200">+ Хөтөлбөр нэмэх</button>
                                </div>
                                {programs.map((prog, i) => (
                                    <div key={`prog-${i}`} className="flex gap-2 items-start bg-slate-50 p-3 rounded-md border flex-col">
                                        <div className="flex justify-between w-full">
                                            <input type="text" value={prog.title} onChange={(e) => handleProgramChange(i, "title", e.target.value)} placeholder="Хөтөлбөрийн нэр (Ж нь: Сагсан бөмбөг)" className="w-full border rounded px-2 py-1 text-sm" />
                                            <button type="button" onClick={() => handleRemoveProgram(i)} className="text-red-500 font-bold px-4 ml-2">X</button>
                                        </div>
                                        <textarea value={prog.description} onChange={(e) => handleProgramChange(i, "description", e.target.value)} placeholder="Тайлбар" className="w-full border rounded px-2 py-1 text-sm h-16" />
                                    </div>
                                ))}
                            </div>

                            {/* Groups Builder */}
                            <div className="col-span-2 space-y-4 pt-4 border-t mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold">Бүлгүүдийн танилцуулга</label>
                                    <button type="button" onClick={() => setGroups([...groups, { title: "", description: "" }])} className="text-xs bg-slate-100 border px-3 py-1.5 rounded-md hover:bg-slate-200">+ Бүлэг нэмэх</button>
                                </div>
                                {groups.map((group, i) => (
                                    <div key={`group-${i}`} className="flex gap-2 items-start bg-slate-50 p-3 rounded-md border flex-col">
                                        <div className="flex justify-between w-full">
                                            <input type="text" value={group.title} onChange={(e) => {
                                                const newGroups = [...groups];
                                                newGroups[i].title = e.target.value;
                                                setGroups(newGroups);
                                            }} placeholder="Бүлгийн нэр (Ж нь: Ахлах бүлэг)" className="w-full border rounded px-2 py-1 text-sm mr-2" />
                                            <button type="button" onClick={() => setGroups(groups.filter((_, idx) => idx !== i))} className="text-red-500 font-bold px-4 ml-2">X</button>
                                        </div>
                                        <ImageUpload value={group.imageUrl || ""} onChange={(url) => {
                                            const newGroups = [...groups];
                                            newGroups[i].imageUrl = url;
                                            setGroups(newGroups);
                                        }} className="w-full" label="Бүлгийн зураг" />
                                        <textarea value={group.description} onChange={(e) => {
                                            const newGroups = [...groups];
                                            newGroups[i].description = e.target.value;
                                            setGroups(newGroups);
                                        }} placeholder="Тайлбар" className="w-full border rounded px-2 py-1 text-sm h-16" />
                                    </div>
                                ))}
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
                            <th className="px-4 py-3">Нэр</th>
                            <th className="px-4 py-3">Байршил</th>
                            <th className="px-4 py-3">Хүчин чадал</th>
                            <th className="px-4 py-3">Төлөв</th>
                            <th className="px-4 py-3 text-right">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8">Ачаалж байна...</td></tr>
                        ) : camps.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Бүртгэлтэй зуслан олдсонгүй.</td></tr>
                        ) : (
                            camps.map(camp => (
                                <tr key={camp.id} className="border-b hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium">
                                        {camp.name}
                                        {camp.badge && <span className="ml-2 bg-[#F5C542]/20 text-[#0F1B3D] text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">{camp.badge}</span>}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">{camp.location || "-"}</td>
                                    <td className="px-4 py-3 text-slate-500">{camp.capacity || "-"}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                                            Идэвхтэй
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleEdit(camp)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Засах</button>
                                        <button onClick={() => handleDelete(camp.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Устгах</button>
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
