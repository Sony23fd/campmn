"use client";

import { useEffect, useState } from "react";
import EventRegistrationModal from "@/components/EventRegistrationModal";

interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    imageUrl?: string;
    eventType: string;
    isOpen: boolean;
}
const demoEvents: Event[] = [
    { id: "1", title: "Олон Улсын Зуслангийн Эрдэмтэн Судлаачдын 3-р Хурал", description: "Ази Номхон Далайн орнуудын болон бусад олон улсын судлаачид оролцох.", startDate: "2024-10-15T00:00:00Z", location: "Улаанбаатар хот", eventType: "CONFERENCE", isOpen: true },
    { id: "2", title: "Артек ОУХТ Солилцооны Хөтөлбөр 2024", description: "ОХУ-ын Артек зусланд амрах хүүхдүүдийн бүртгэл.", startDate: "2024-06-01T00:00:00Z", location: "ОХУ, Гурзуф", eventType: "EXCHANGE_PROGRAM", isOpen: true },
    { id: "3", title: "Зуслангийн Удирдлагын Нэгдсэн Сургалт", description: "Зуслангуудын удирдлага, менежерүүдэд зориулсан чадавхжуулах сургалт.", startDate: "2024-05-10T00:00:00Z", location: "Цонжин болдог", eventType: "TRAINING", isOpen: false },
];

import Link from "next/link";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [selectedEventTitle, setSelectedEventTitle] = useState("");

    const openModal = (id: string, title: string) => {
        setSelectedEventId(id);
        setSelectedEventTitle(title);
        setIsModalOpen(true);
    };

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("/api/events");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setEvents(data.length > 0 ? data : demoEvents);
                }
            } catch (error) {
                console.error("Failed to load events", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const formatDateRange = (start: string, end?: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const startDateString = new Date(start).toLocaleDateString('mn-MN', options);
        if (end) {
            const endDateString = new Date(end).toLocaleDateString('mn-MN', options);
            if (startDateString !== endDateString) return `${startDateString} - ${endDateString}`;
        }
        return startDateString;
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'CONFERENCE': return 'Хурал, зөвлөгөөн';
            case 'EXCHANGE_PROGRAM': return 'Солилцооны хөтөлбөр';
            case 'TRAINING': return 'Сургалт';
            default: return 'Бусад';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-yellow-300 pb-24 font-sans">
            {/* Playful Header Section */}
            <div className="bg-blue-600 pt-24 pb-32 px-4 mb-20 relative overflow-hidden rounded-b-[3rem] shadow-2xl">
                {/* Decorative floating shapes */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
                
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-yellow-400 text-slate-900 font-black mb-6 border-2 border-yellow-300 shadow-md transform rotate-2">
                        🎉 Арга хэмжээ
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-md">
                        Хөтөлбөр, <span className="text-yellow-300 relative inline-block">Арга хэмжээ
                            <svg className="absolute -bottom-2 left-0 w-full h-4 text-yellow-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="6" fill="transparent"/>
                            </svg>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-medium">
                        Олон улсын болон үндэсний хэмжээний арга хэмжээ, хурал, солилцооны хөтөлбөрийн мэдээлэл.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-20 -mt-36">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 rounded-full border-8 border-slate-200 border-t-yellow-400 animate-spin"></div>
                    </div>
                ) : events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, i) => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                formatDateRange={formatDateRange}
                                getTypeLabel={getTypeLabel}
                                openModal={openModal}
                                index={i}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-slate-100 border-dashed shadow-sm max-w-2xl mx-auto mt-20">
                        <div className="text-7xl mb-6 animate-bounce">📅</div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">Одоогоор зарлагдсан арга хэмжээ алга байна</h3>
                        <p className="text-slate-500 max-w-md mx-auto font-medium text-lg">Тун удахгүй шинэ арга хэмжээнүүд нэмэгдэх болно.</p>
                    </div>
                )}
            </div>

            {/* Registration Modal */}
            <EventRegistrationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                eventId={selectedEventId}
                eventTitle={selectedEventTitle}
            />
        </div>
    );
}

function EventCard({ event, formatDateRange, getTypeLabel, openModal, index }: { 
    event: Event; 
    formatDateRange: (start: string, end?: string) => string; 
    getTypeLabel: (type: string) => string;
    openModal: (id: string, title: string) => void;
    index: number;
}) {
    return (
        <div className={`group bg-white rounded-[2rem] border-2 border-slate-100 shadow-lg flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}>
            {/* Image Placeholder or Actual Image */}
            <div className={`aspect-[4/3] w-full relative bg-slate-200 shrink-0 m-2 rounded-[1.5rem] overflow-hidden ${!event.imageUrl && 'flex items-center justify-center'}`} style={{ width: 'calc(100% - 16px)' }}>
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="text-6xl bg-slate-100 w-full h-full flex items-center justify-center">🎟️</div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl shadow-md border-2 border-yellow-300">
                        {getTypeLabel(event.eventType)}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    {event.isOpen ? (
                        <span className="bg-green-400 text-slate-900 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl shadow-md border-2 border-green-300">
                            Нээлттэй
                        </span>
                    ) : (
                        <span className="bg-slate-300 text-slate-600 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl shadow-md border-2 border-slate-200">
                            Хаагдсан
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-3 line-clamp-2 leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                
                <p className="text-sm font-medium text-slate-500 flex-grow mb-6 line-clamp-3">
                    {event.description}
                </p>
                
                <div className="space-y-3 shrink-0 bg-slate-50 rounded-[1.5rem] p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <span className="font-bold text-sm text-slate-700">{formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                </div>
                
                <div className="mt-auto flex gap-3 shrink-0">
                    <button
                        disabled={!event.isOpen}
                        onClick={() => openModal(event.id, event.title)}
                        className="flex-1 inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-black text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none shadow-blue-500/30"
                    >
                        Бүртгүүлэх
                    </button>
                    <Link href={`/events/${event.id}`} className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-slate-200 text-slate-500 hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 transition-colors">
                        <span className="text-xl">➔</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
