"use client";

import { useEffect, useState } from "react";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import Link from "next/link";
import WaveHeader from "@/components/WaveHeader";

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
                setEvents(demoEvents);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const parseDateInfo = (dateStr: string) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return { month, day };
    };

    // Separate featured event
    const featuredEvent = (events as any[]).find(e => e.isFeatured) || events[0];
    const secondaryEvents = events.filter(e => e.id !== (featuredEvent?.id)).slice(0, 2);
    const otherEvents = events.filter(e => e.id !== (featuredEvent?.id) && !secondaryEvents.find(se => se.id === e.id));

    return (
        <div className="min-h-screen bg-white font-sans pb-32 text-[#0F1B3D]">
            {/* Navy Header Banner */}
            <WaveHeader title="АРГА ХЭМЖЭЭ" subtitle="Олон улсын болон үндэсний хэмжээний арга хэмжээ, хурал, солилцооны хөтөлбөрийн мэдээлэл." />

            <div className="container mx-auto px-4 max-w-7xl relative z-20 pt-16">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0F1B3D]"></div>
                    </div>
                ) : events.length > 0 ? (
                    <div className="space-y-12">
                        {/* FEATURED GRID (1 LARGE + 2 SMALL) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Large Featured Card */}
                            {featuredEvent && (
                                <div className="lg:col-span-7 xl:col-span-7">
                                    <FeaturedEventCard 
                                        event={featuredEvent} 
                                        openModal={openModal} 
                                        parseDateInfo={parseDateInfo}
                                    />
                                </div>
                            )}

                            {/* Secondary Horizontal Cards */}
                            <div className="lg:col-span-12 lg:hidden"></div> {/* Spacer for mobile */}
                            <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6">
                                {secondaryEvents.map(event => (
                                    <SecondaryEventCard 
                                        key={event.id} 
                                        event={event} 
                                        openModal={openModal} 
                                        parseDateInfo={parseDateInfo}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* REMAINDER GRID */}
                        {otherEvents.length > 0 && (
                            <div className="pt-12 border-t border-slate-100">
                                <h3 className="text-xl font-black mb-8 border-l-4 border-[#D4A843] pl-4 uppercase tracking-tight">Бусад арга хэмжээнүүд</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {otherEvents.map((event) => (
                                        <EventCard key={event.id} event={event} openModal={openModal} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm max-w-2xl mx-auto mt-20">
                        <div className="text-7xl mb-6">📅</div>
                        <h3 className="text-2xl font-black text-[#0F1B3D] mb-3">Одоогоор зарлагдсан арга хэмжээ алга байна</h3>
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

function FeaturedEventCard({ event, openModal, parseDateInfo }: any) {
    const { month, day } = parseDateInfo(event.startDate);
    
    return (
        <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-xl">
            {/* Image Container */}
            <div className="relative aspect-[16/8] overflow-hidden">
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-7xl opacity-20">🎫</div>
                )}
                
                {/* Gold Date Circle */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-[#D4A843] rounded-full flex flex-col items-center justify-center text-white shadow-xl z-20 border-2 border-white">
                    <span className="text-[12px] font-black leading-none">{month}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest mb-0.5">Сарын</span>
                    <span className="text-[12px] font-black leading-none">{day}</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="text-[#D4A843] text-[10px] font-black uppercase tracking-[0.2em] mb-3">Онцлох арга хэмжээ</div>
                <h2 className="text-xl md:text-2xl font-black text-[#0F1B3D] leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                </h2>
                <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2 leading-relaxed">
                    {event.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <button 
                        disabled={!event.isOpen}
                        onClick={() => openModal(event.id, event.title)}
                        className="bg-[#0F1B3D] text-white px-6 h-10 rounded-full font-black text-[10px] hover:bg-blue-600 transition-all hover:shadow-lg disabled:opacity-50"
                    >
                        Бүртгүүлэх
                    </button>
                    <Link href={`/events/${event.id}`} className="flex items-center gap-2 text-[#0F1B3D] font-black text-[10px] group/link">
                        Дэлгэрэнгүй 
                        <span className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center transition-all group-hover/link:bg-slate-50 group-hover/link:translate-x-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function SecondaryEventCard({ event, openModal, parseDateInfo }: any) {
    const { month, day } = parseDateInfo(event.startDate);

    return (
        <div className="group bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl h-full sm:h-[180px]">
            {/* Image Thumbnail */}
            <div className="w-full sm:w-1/3 relative overflow-hidden bg-slate-50 flex-shrink-0">
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">📅</div>
                )}
                
                {/* Smaller Date Circle */}
                <div className="absolute top-2 right-2 w-12 h-12 bg-[#D4A843] rounded-full flex flex-col items-center justify-center text-white shadow-md border-2 border-white z-20">
                    <span className="text-[10px] font-black leading-none">{month}</span>
                    <span className="text-[6px] font-bold uppercase tracking-[0.05em]">{day}</span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 min-w-0">
                <h3 className="text-md font-black text-[#0F1B3D] leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                </h3>
                <p className="text-[12px] text-slate-500 line-clamp-2 font-medium mb-3">
                    {event.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <button 
                        disabled={!event.isOpen}
                        onClick={() => openModal(event.id, event.title)}
                        className="bg-[#0F1B3D] text-white px-4 h-8 rounded-full font-black text-[10px] hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        Бүртгүүлэх
                    </button>
                    <Link href={`/events/${event.id}`} className="text-[#0F1B3D] font-black text-[10px] flex items-center gap-1.5 group/link">
                        Дэлгэрэнгүй
                        <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function EventCard({ event, openModal }: any) {
    return (
        <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
             <div className="aspect-[16/10] relative overflow-hidden bg-slate-50">
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-10">📅</div>
                )}
             </div>
             <div className="p-6 flex flex-col flex-1">
                <h4 className="font-black text-[#0F1B3D] mb-2 line-clamp-1">{event.title}</h4>
                <p className="text-xs text-slate-500 mb-6 line-clamp-2">{event.description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <button 
                        onClick={() => openModal(event.id, event.title)}
                        className="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800"
                    >
                        Бүртгүүлэх
                    </button>
                    <Link href={`/events/${event.id}`} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                    </Link>
                </div>
             </div>
        </div>
    );
}
