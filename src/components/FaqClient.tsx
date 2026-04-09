"use client";

import { useState, useMemo } from "react";

interface Faq {
    id: string;
    category: string;
    question: string;
    answer: string;
}

export default function FaqClient({ faqs }: { faqs: Faq[] }) {
    const categories = useMemo(() => {
        const cats = faqs.map(f => f.category || "Ерөнхий");
        return Array.from(new Set(cats));
    }, [faqs]);

    const [activeCategory, setActiveCategory] = useState(categories[0] || "Ерөнхий");

    const filteredFaqs = faqs.filter(f => (f.category || "Ерөнхий") === activeCategory);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.1)] p-4 sticky top-24">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-4 pt-2">Ангилал</h3>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                                    activeCategory === cat 
                                        ? "bg-[#0F1B3D] text-white shadow-md shadow-[#0F1B3D]/20 transform scale-[1.02]" 
                                        : "text-slate-600 hover:bg-slate-50 hover:text-[#0F1B3D]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Accordion Content */}
            <div className="flex-1">
                {filteredFaqs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">Энэ ангилалд мэдээлэл алга байна.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredFaqs.map(faq => (
                            <details key={faq.id} className="group border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                                    <span className="text-lg font-bold text-[#0F1B3D] pr-4">{faq.question}</span>
                                    <span className="transition duration-300 group-open:-rotate-180 bg-slate-100 p-2 rounded-full text-[#0F1B3D] flex-shrink-0 group-hover:bg-[#F5C542] group-hover:text-white">
                                        <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-2 text-slate-600 border-t border-slate-100 bg-slate-50/50">
                                    <p className="whitespace-pre-wrap leading-relaxed font-medium">{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
