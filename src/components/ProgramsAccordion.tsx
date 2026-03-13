"use client";

import { useState } from "react";

interface ProgramItem {
    title: string;
    description: string;
}

export default function ProgramsAccordion({ programs }: { programs: ProgramItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!programs || programs.length === 0) return null;

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Хөтөлбөрүүд</h2>
            <div className="space-y-3">
                {programs.map((prog, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-all">
                            <button
                                onClick={() => toggleOpen(idx)}
                                className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                <span className="font-bold text-slate-900 pr-4">{prog.title}</span>
                                <span className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            {isOpen && (
                                <div className="px-5 py-4 border-t border-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                    {prog.description}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
