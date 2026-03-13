"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        // Generic site wide settings can go here. Since we extracted the rest, 
        // we can leave this almost empty or ready for social links / contact info.
        contact_email: "info@zuslan.mn",
        contact_phone: "+976 99000000",
        address: "Улаанбаатар хот",
        facebook_url: "https://facebook.com/zuslan"
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
            // Хуудсыг дахин шинэчлээд, 3 секундын дараа мессежийг арилгана
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
                    <h1 className="text-3xl font-bold tracking-tight">Нийтлэг Тохиргоо</h1>
                    <p className="text-muted-foreground">Вэбсайтын нийтлэг мэдээлэл болон холбоос.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                {message && (
                    <div className={`p-4 rounded-md text-sm font-medium ${message.includes("амжилттай") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                        {message}
                    </div>
                )}

                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Холбоо Барих Мэдээлэл</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Имэйл Хаяг</label>
                        <input
                            type="text"
                            name="contact_email"
                            value={settings.contact_email}
                            onChange={handleChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Утасны Дугаар</label>
                        <input
                            type="text"
                            name="contact_phone"
                            value={settings.contact_phone}
                            onChange={handleChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Хаяг</label>
                        <input
                            type="text"
                            name="address"
                            value={settings.address}
                            onChange={handleChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Facebook Линк</label>
                        <input
                            type="text"
                            name="facebook_url"
                            value={settings.facebook_url}
                            onChange={handleChange}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
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
