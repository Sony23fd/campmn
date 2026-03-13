"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EventRegistrationsPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const [eventTitle, setEventTitle] = useState("");
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        age: "",
        school: "",
    });

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/events/${eventId}/registrations`);
            if (res.ok) {
                const data = await res.json();
                setEventTitle(data.eventTitle);
                setRegistrations(data.registrations);
            }
        } catch (error) {
            console.error("Error fetching registrations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (eventId) {
            fetchRegistrations();
        }
    }, [eventId]);

    const updateStatus = async (regId: string, currentStatus: string, newStatus: string) => {
        if (currentStatus === newStatus) return;
        
        try {
            const res = await fetch(`/api/registrations/${regId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            
            if (res.ok) {
                fetchRegistrations();
            } else {
                alert("Төлөв өөрчлөхөд алдаа гарлаа.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId,
                    ...formData,
                    age: formData.age ? parseInt(formData.age, 10) : undefined,
                }),
            });

            if (res.ok) {
                setAdding(false);
                setFormData({ firstName: "", lastName: "", phone: "", email: "", age: "", school: "" });
                fetchRegistrations();
            } else {
                const data = await res.json();
                alert(data.error || "Бүртгэл нэмэхэд алдаа гарлаа.");
            }
        } catch (err) {
            alert("Сүлжээний алдаа гарлаа.");
        }
    };

    const handleDelete = async (regId: string) => {
        if (!confirm("Энэ бүртгэлийг устгахдаа итгэлтэй байна уу?")) return;
        
        try {
            const res = await fetch(`/api/registrations/${regId}`, { method: "DELETE" });
            if (res.ok) {
                fetchRegistrations();
            } else {
                alert("Устгахад алдаа гарлаа.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "APPROVED":
                return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">Баталгаажсан</span>;
            case "REJECTED":
                return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">Татгалзсан</span>;
            default:
                return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">Хүлээгдэж буй</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/events" className="p-2 border rounded-md hover:bg-slate-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Бүртгэлүүд</h1>
                        <p className="text-muted-foreground">{eventTitle || "Уншиж байна..."}</p>
                    </div>
                </div>
                <button
                    onClick={() => setAdding(!adding)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm"
                >
                    {adding ? "Цуцлах" : "+ Шинэ бүртгэл нэмэх"}
                </button>
            </div>

            {adding && (
                <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm mb-8">
                    <form onSubmit={handleAddSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Овог *</label>
                                <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Нэр *</label>
                                <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Утас *</label>
                                <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">И-мэйл *</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Нас</label>
                                <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Сургууль / Байгууллага</label>
                                <input type="text" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
                            </div>
                        </div>
                        <div className="pt-4 flex gap-2">
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                                Бүртгэх
                            </button>
                            <button type="button" onClick={() => setAdding(false)} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300">
                                Цуцлах
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b text-slate-500 font-medium">
                        <tr>
                            <th className="px-4 py-3">Овог, Нэр</th>
                            <th className="px-4 py-3">Утас</th>
                            <th className="px-4 py-3">И-мэйл</th>
                            <th className="px-4 py-3">Нас & Сургууль</th>
                            <th className="px-4 py-3">Огноо</th>
                            <th className="px-4 py-3">Төлөв</th>
                            <th className="px-4 py-3 text-right">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} className="text-center py-8">Ачаалж байна...</td></tr>
                        ) : registrations.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-8 text-slate-500">Бүртгэл олдсонгүй.</td></tr>
                        ) : (
                            registrations.map((reg) => (
                                <tr key={reg.id} className="border-b hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium">{reg.lastName} {reg.firstName}</td>
                                    <td className="px-4 py-3 text-slate-600">{reg.phone}</td>
                                    <td className="px-4 py-3 text-slate-600">{reg.email}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {reg.age ? `${reg.age} нас ` : ""}
                                        {reg.school && <span className="text-slate-400">({reg.school})</span>}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {new Date(reg.createdAt).toLocaleDateString("mn-MN")}{" "}
                                        {new Date(reg.createdAt).toLocaleTimeString("mn-MN", { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(reg.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        {reg.status !== "APPROVED" && (
                                            <button 
                                                onClick={() => updateStatus(reg.id, reg.status, "APPROVED")} 
                                                className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded hover:bg-green-100 font-medium"
                                            >
                                                Баталгаажуулах
                                            </button>
                                        )}
                                        {reg.status === "PENDING" && (
                                            <button 
                                                onClick={() => updateStatus(reg.id, reg.status, "REJECTED")} 
                                                className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded hover:bg-red-100 font-medium"
                                            >
                                                Татгалзах
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(reg.id)} 
                                            className="text-xs text-red-500 hover:text-red-700 font-bold ml-2 p-1"
                                            title="Бүртгэл устгах"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
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
