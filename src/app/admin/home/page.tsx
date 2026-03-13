"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomeSettings() {
    const [settings, setSettings] = useState({
        heroTitle: "Монголын Зуслангийн Салбарын 100 Жилийн Ой",
        heroSubtitle: "Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан зуслангийн хөгжлийн үндэсний тогтолцоо.",
        stat1Year: "2006",
        stat1Label: "Байгуулагдсан он",
        stat2Number: "100+",
        stat2Label: "Бүртгэлтэй Зуслан",
        stat3Year: "2012",
        stat3Label: "ОУЗХ-ны гишүүн",
        stat4Number: "15+",
        stat4Label: "ОУ-ын түншлэл",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await fetch("/api/settings");
                if (res.ok) {
                    const data = await res.json();
                    if (Object.keys(data).length > 0) {
                        setSettings(prev => ({ ...prev, ...data }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch settings", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        // Just post this subset; /api/settings safely merges DB state
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage("Тохиргоо амжилттай хадгалагдлаа!");
                router.refresh();
            } else {
                setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
            }
        } catch (error) {
            console.error("Error saving settings", error);
            setMessage("Серверт холбогдоход алдаа гарлаа.");
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Нүүр Хуудас</h1>
                    <p className="text-muted-foreground">Нүүр хуудсанд харагдах текстүүд болон статистик үзүүлэлтүүд.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                {message && (
                    <div className={`p-4 rounded-md text-sm font-medium ${message.includes("амжилттай") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                        {message}
                    </div>
                )}

                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Нүүр Хэсэг (Hero Section)</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Үндсэн Гарчиг</label>
                        <textarea
                            name="heroTitle"
                            value={settings.heroTitle}
                            onChange={handleChange}
                            rows={2}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Дэд Тайлбар</label>
                        <textarea
                            name="heroSubtitle"
                            value={settings.heroSubtitle}
                            onChange={handleChange}
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm space-y-6">
                    <h2 className="text-xl font-semibold">Статистик үзүүлэлтүүд</h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* Box 1 */}
                        <div className="space-y-3 p-4 bg-slate-50 border rounded-lg">
                            <h3 className="font-medium text-sm text-slate-500">Блок 1</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тоо тооцоолол</label>
                                <input type="text" name="stat1Year" value={settings.stat1Year} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тайлбар</label>
                                <input type="text" name="stat1Label" value={settings.stat1Label} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="space-y-3 p-4 bg-slate-50 border rounded-lg">
                            <h3 className="font-medium text-sm text-slate-500">Блок 2</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тоо тооцоолол</label>
                                <input type="text" name="stat2Number" value={settings.stat2Number} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тайлбар</label>
                                <input type="text" name="stat2Label" value={settings.stat2Label} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="space-y-3 p-4 bg-slate-50 border rounded-lg">
                            <h3 className="font-medium text-sm text-slate-500">Блок 3</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тоо тооцоолол</label>
                                <input type="text" name="stat3Year" value={settings.stat3Year} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тайлбар</label>
                                <input type="text" name="stat3Label" value={settings.stat3Label} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                        </div>

                        {/* Box 4 */}
                        <div className="space-y-3 p-4 bg-slate-50 border rounded-lg">
                            <h3 className="font-medium text-sm text-slate-500">Блок 4</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тоо тооцоолол</label>
                                <input type="text" name="stat4Number" value={settings.stat4Number} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Тайлбар</label>
                                <input type="text" name="stat4Label" value={settings.stat4Label} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.refresh()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium border bg-white hover:bg-slate-100 h-10 px-4 py-2"
                    >
                        Буцах
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-6 py-2 disabled:opacity-50"
                    >
                        {saving ? "Хадгалж байна..." : "Хадгалах"}
                    </button>
                </div>
            </form>
        </div>
    );
}
