"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Partner {
    id: string;
    name: string;
    type: string;
    logo: string | null;
    isActive: boolean;
}

export default function PartnersAdminPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    
    // Form state
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [logo, setLogo] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const fetchPartners = async () => {
        try {
            const res = await fetch("/api/partners");
            if (res.ok) {
                const data = await res.json();
                setPartners(data);
            }
        } catch (error) {
            console.error("Failed to fetch partners", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        const partnerData = { name, type, logo, isActive: true };

        try {
            const url = editingId ? `/api/partners/${editingId}` : "/api/partners";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(partnerData),
            });

            if (res.ok) {
                setMessage(editingId ? "Амжилттай засагдлаа!" : "Лого амжилттай нэмэгдлээ!");
                resetForm();
                fetchPartners();
                router.refresh();
            } else {
                setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
            }
        } catch (error) {
            console.error("Error saving partner", error);
            setMessage("Серверт холбогдоход алдаа гарлаа.");
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleEdit = (partner: Partner) => {
        setEditingId(partner.id);
        setName(partner.name);
        setType(partner.type);
        setLogo(partner.logo || "");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setType("");
        setLogo("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.match(/image.*/)) {
                alert("Зөвхөн зураг оруулна уу.");
                e.target.value = "";
                return;
            }

            const reader = new FileReader();
            reader.onloadend = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        // Encode to WebP or PNG depending on if transparency is needed, let's use WebP for smaller size
                        const dataUrl = canvas.toDataURL("image/webp", 0.8);
                        
                        // Check if the compressed size is within safe limits (e.g. < 500KB)
                        if (dataUrl.length > 500 * 1024) {
                            alert("Зураг хэт том байна. Өөр жижиг хэмжээтэй зураг сонгоно уу.");
                            setLogo("");
                        } else {
                            setLogo(dataUrl);
                        }
                    }
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Энэ логог устгах уу?")) return;

        try {
            const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchPartners();
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Хамтрагчид / Лого</h1>
                <p className="text-muted-foreground">Нүүр хуудасны эргэлддэг логонуудыг эндээс нэмж, хасах боломжтой.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-xl bg-card">
                        <h2 className="text-xl font-semibold mb-4">{editingId ? "Засварлах" : "Шинээр нэмэх"}</h2>
                        {message && (
                            <div className="p-3 text-sm rounded bg-green-50 text-green-700 border border-green-200">
                                {message}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Байгууллагын нэр *</label>
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Жишээ нь: ОУЗХ"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Төрөл *</label>
                            <input
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Жишээ нь: Олон Улсын Байгууллага"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Логоны зураг оруулах *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-slate-200 cursor-pointer"
                            />
                            {logo && (
                                <div className="mt-3 mb-2 p-2 border rounded-md bg-slate-50 inline-block">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={logo} alt="Preview" className="h-16 object-contain" />
                                </div>
                            )}
                            <p className="text-xs text-muted-foreground font-medium mt-2">Эсвэл интернэт дэх линкийг шууд хуулж тавьж болно:</p>
                            <input
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="https://.../logo.png"
                            />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
                            >
                                {saving ? "Хадгалж байна..." : (editingId ? "Шинэчлэх" : "Нэмэх")}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium bg-slate-200 text-slate-800 hover:bg-slate-300 h-10 px-4 py-2"
                                >
                                    Цуцлах
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="md:col-span-2">
                    <div className="border rounded-xl overflow-hidden bg-white">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Лого</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Нэр & Төрөл</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {partners.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                                            Мэдээлэл олдсонгүй
                                        </td>
                                    </tr>
                                ) : (
                                    partners.map(partner => (
                                        <tr key={partner.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                {partner.logo ? (
                                                    <div className="w-24 h-10 bg-slate-100 rounded border flex items-center justify-center overflow-hidden">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-10 bg-slate-100 rounded border flex items-center justify-center text-xs text-slate-400">
                                                        Зураггүй
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{partner.name}</div>
                                                <div className="text-xs text-slate-500">{partner.type}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleEdit(partner)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4"
                                                >
                                                    Засах
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(partner.id)}
                                                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                                                >
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
