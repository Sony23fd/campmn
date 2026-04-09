"use client";

import { useState, useEffect } from "react";

interface Faq {
    id: string;
    category: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
}

export default function FaqsAdminPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [category, setCategory] = useState("Ерөнхий");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [order, setOrder] = useState(0);
    const [message, setMessage] = useState("");

    const fetchFaqs = async () => {
        try {
            const res = await fetch("/api/faqs");
            if (res.ok) setFaqs(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchFaqs(); }, []);

    const resetForm = () => {
        setEditingId(null);
        setCategory("Ерөнхий");
        setQuestion("");
        setAnswer("");
        setOrder(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        const payload = { category, question, answer, order };
        const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setMessage(editingId ? "Амжилттай засагдлаа!" : "Шинэ FAQ нэмэгдлээ!");
                resetForm();
                fetchFaqs();
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

    const handleEdit = (faq: Faq) => {
        setEditingId(faq.id);
        setCategory(faq.category || "Ерөнхий");
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setOrder(faq.order);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Устгах уу?")) return;
        await fetch(`/api/faqs/${id}`, { method: "DELETE" });
        fetchFaqs();
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Уншиж байна...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Зөвлөмж & FAQ</h1>
                <p className="text-muted-foreground">Түгээмэл асуулт, хариултуудыг удирдах. Зөвлөмжийн нийтлэлүүдийг &quot;Мэдээлэл&quot; цэснээс RECOMMENDATION төрлөөр нэмнэ.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-xl bg-card">
                        <h2 className="text-xl font-semibold">{editingId ? "Засварлах" : "Шинэ FAQ нэмэх"}</h2>
                        {message && <div className="p-3 text-sm rounded bg-green-50 text-green-700 border border-green-200">{message}</div>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ангилал *</label>
                            <input required value={category} onChange={(e) => setCategory(e.target.value)} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Ерөнхий, Төлбөр, Захиалга..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Асуулт *</label>
                            <input required value={question} onChange={(e) => setQuestion(e.target.value)} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Жишээ: Зуслан хэзээ эхэлдэг вэ?" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Хариулт *</label>
                            <textarea required value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} className="flex w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Хариултын тайлбар..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Эрэмбэ</label>
                            <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" />
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
                                    <th className="px-6 py-3 font-semibold">Ангилал</th>
                                    <th className="px-6 py-3 font-semibold">Асуулт</th>
                                    <th className="px-6 py-3 font-semibold">Хариулт</th>
                                    <th className="px-6 py-3 font-semibold">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {faqs.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">FAQ олдсонгүй</td></tr>
                                ) : faqs.map(faq => (
                                    <tr key={faq.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-400">{faq.order}</td>
                                        <td className="px-6 py-4 font-medium text-slate-700">{faq.category}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 max-w-[200px] truncate">{faq.question}</td>
                                        <td className="px-6 py-4 text-slate-600 max-w-[250px] truncate">{faq.answer}</td>
                                        <td className="px-6 py-4 space-x-3">
                                            <button onClick={() => handleEdit(faq)} className="text-blue-600 hover:text-blue-800 font-medium">Засах</button>
                                            <button onClick={() => handleDelete(faq.id)} className="text-red-500 hover:text-red-700 font-medium">Устгах</button>
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
