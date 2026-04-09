"use client";

import React, { useState } from "react";
import Link from "next/link";
import EventRegistrationModal from "./EventRegistrationModal";

interface Event {
    id: string;
    title: string;
    description: string | null;
    startDate: string | Date;
    imageUrl: string | null;
    isOpen: boolean;
}

interface AnniversaryEventsProps {
    events: Event[];
    title?: string;
    subtitle?: string;
}

export default function AnniversaryEvents({ events, title = "Ойн Арга Хэмжээнүүд", subtitle = "100 жилийн ойн хүрээнд зохион байгуулагдах албан ёсны арга хэмжээнүүд" }: AnniversaryEventsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);

    const openModal = (id: string, title: string) => {
        setSelectedEvent({ id, title });
        setIsModalOpen(true);
    };

    const parseDateInfo = (dateStr: string | Date) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return { month, day };
    };

    if (!events || events.length === 0) return null;

    return (
        <section className="relative z-10 pb-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-[#D4A843]/10 text-[#D4A843] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#D4A843]/20 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-ping" />
                        Арга хэмжээ
                    </div>
                    <h2 className="text-4xl font-black text-[#0F1B3D] tracking-tight">{title}</h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => {
                        const { month, day } = parseDateInfo(event.startDate);
                        return (
                            <div key={event.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-[#D4A843]/20">
                                {/* Image Area */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    {event.imageUrl ? (
                                        <img 
                                            src={event.imageUrl} 
                                            alt={event.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-6xl opacity-20">📅</div>
                                    )}
                                    
                                    {/* Date Overlay */}
                                    <div className="absolute top-4 right-4 w-14 h-14 bg-[#D4A843] rounded-2xl flex flex-col items-center justify-center text-white shadow-xl z-20 border-2 border-white/50 backdrop-blur-sm">
                                        <span className="text-[14px] font-black leading-none">{day}</span>
                                        <span className="text-[7px] font-bold uppercase tracking-[0.1em] mt-1">{month} САР</span>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B3D]/80 via-[#0F1B3D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-[#0F1B3D] mb-3 line-clamp-2 leading-tight group-hover:text-[#D4A843] transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-3 leading-relaxed">
                                        {event.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between gap-4">
                                        <button
                                            disabled={!event.isOpen}
                                            onClick={() => openModal(event.id, event.title)}
                                            className="bg-[#0F1B3D] text-white px-6 h-11 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#D4A843] transition-all disabled:opacity-30 disabled:hover:bg-[#0F1B3D]"
                                        >
                                            {event.isOpen ? "Бүртгүүлэх" : "Бүртгэл хаагдсан"}
                                        </button>
                                        <Link 
                                            href={`/events/${event.id}`} 
                                            className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-[#0F1B3D] hover:bg-slate-50 hover:text-[#D4A843] hover:border-[#D4A843]/30 transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedEvent && (
                <EventRegistrationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    eventId={selectedEvent.id}
                    eventTitle={selectedEvent.title}
                />
            )}
        </section>
    );
}
