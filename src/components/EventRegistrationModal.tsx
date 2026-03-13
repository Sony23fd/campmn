"use client";

import { useState } from "react";

interface EventRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
    eventTitle: string;
}

export default function EventRegistrationModal({ isOpen, onClose, eventId, eventTitle }: EventRegistrationModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        school: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || "Бүртгэл амжилтгүй боллоо.");
            }
        } catch (err) {
            setError("Сүлжээний алдаа гарлаа.");
        } finally {
            setLoading(false);
        }
    };

    const resetFormAndClose = () => {
        setSuccess(false);
        setError(null);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", age: "", school: "" });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={resetFormAndClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Бүртгүүлэх</h3>
                        <p className="text-sm text-slate-500 line-clamp-1">{eventTitle}</p>
                    </div>
                    <button onClick={resetFormAndClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Амжилттай бүртгэгдлээ!</h4>
                            <p className="text-slate-600 mb-8">Мэдээллийг хүлээн авлаа. Бид тантай тун удахгүй холбогдох болно.</p>
                            <button onClick={resetFormAndClose} className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors">
                                Хаах
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Овог <span className="text-red-500">*</span></label>
                                    <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" placeholder="Оргил" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Нэр <span className="text-red-500">*</span></label>
                                    <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" placeholder="Батаа" />
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700">Утасны дугаар <span className="text-red-500">*</span></label>
                                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" placeholder="9911..." />
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700">И-мэйл хаяг <span className="text-red-500">*</span></label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" placeholder="name@example.com" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                                <div className="space-y-1.5 flex flex-col justify-end">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">Нас <span className="text-xs text-slate-400 font-normal">(Сурагч бол)</span></label>
                                    <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" placeholder="Жишээ: 15" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Сургууль / Байгууллага</label>
                                    <input type="text" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white" placeholder="Сургууль эсвэл ажлын газар" />
                                </div>
                            </div>
                            
                            <div className="pt-6">
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center">
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : "Бүртгэл илгээх"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
