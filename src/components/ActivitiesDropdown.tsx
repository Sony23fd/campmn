"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ActivityItem {
    id: string;
    title: string;
    slug: string;
}

interface ActivityCategory {
    id: string;
    name: string;
    slug: string;
    items: ActivityItem[];
}

export default function ActivitiesDropdown({ categories }: { categories: ActivityCategory[] }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative h-full flex items-center">
            <button
                onClick={() => setOpen(!open)}
                onMouseEnter={() => setOpen(true)}
                className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-1.5"
            >
                Үйл ажиллагаа
                <svg className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180 text-[#F5C542]' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {open && (
                <div 
                    onMouseLeave={() => setOpen(false)}
                    className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 mt-2 bg-[#0F1B3D] rounded-2xl shadow-2xl border border-white/10 p-6 min-w-[500px] z-[60] animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-300"
                >
                    {categories.length === 0 ? (
                        <p className="text-sm text-white/40 text-center py-4">Одоогоор чиглэл нэмэгдээгүй байна.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-8">
                            {categories.map(cat => (
                                <div key={cat.id} className="space-y-4">
                                    <Link 
                                        href="/activities"
                                        onClick={() => setOpen(false)}
                                        className="text-[10px] font-black text-[#F5C542] uppercase tracking-[0.2em] mb-4 block hover:opacity-80 transition-all border-b border-white/5 pb-2"
                                    >
                                        {cat.name}
                                    </Link>
                                    <div className="space-y-1">
                                        {cat.items.slice(0, 5).map(item => (
                                            <Link
                                                key={item.id}
                                                href={`/activities/${cat.slug}/${item.slug}`}
                                                onClick={() => setOpen(false)}
                                                className="block text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2 -mx-3 transition-all truncate"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                        {cat.items.length > 5 && (
                                            <p className="text-[10px] text-white/20 font-bold px-3">+{cat.items.length - 5} бусад...</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between">
                        <Link 
                            href="/activities" 
                            onClick={() => setOpen(false)}
                            className="text-xs font-bold text-white/40 hover:text-[#F5C542] transition-colors flex items-center gap-1.5 group"
                        >
                            Бүх үйл ажиллагааг үзэх
                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </Link>
                        <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">МҮЗХ 100</span>
                    </div>
                </div>
            )}
        </div>
    );
}
