import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EventDetailRegisterButton from "@/components/EventDetailRegisterButton";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const event = await prisma.event.findUnique({ where: { id: params.id } });
    if (!event) return { title: "Арга хэмжээ олдсонгүй" };
    return { title: `${event.title} | МҮЗХ — 100 Жил` };
}

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const event = await prisma.event.findUnique({
        where: { id: params.id }
    });

    if (!event) {
        notFound();
    }

    const formatDateRange = (start: Date, end?: Date | null) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const startDateString = start.toLocaleDateString('mn-MN', options);
        if (end) {
            const endDateString = end.toLocaleDateString('mn-MN', options);
            if (startDateString !== endDateString) return `${startDateString} аас ${endDateString}`;
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
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Navy Header Banner */}
            <div className="bg-[#0F1B3D] pt-16 pb-32 md:pb-48 px-4 relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A2B5C] rounded-full opacity-50 blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843] rounded-full opacity-10 blur-[80px] -ml-20 -mb-20"></div>

                <div className="container mx-auto max-w-5xl relative z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <Link href="/events" className="hover:text-[#F5C542] transition-colors">Арга хэмжээ</Link>
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                        <span className="text-[#F5C542] truncate max-w-[250px]">{event.title}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="bg-[#F5C542]/20 border border-[#F5C542]/30 px-3 py-1.5 rounded-full text-[10px] font-bold text-[#F5C542] uppercase tracking-[0.2em]">
                            {getTypeLabel(event.eventType)}
                        </span>
                        {event.isOpen ? (
                            <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
                                Бүртгэл нээлттэй
                            </span>
                        ) : (
                            <span className="bg-slate-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full">
                                Бүртгэл хаагдсан
                            </span>
                        )}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-12 max-w-4xl">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold text-white/50 uppercase tracking-widest pb-8">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#F5C542]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span>{formatDateRange(event.startDate, event.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#F5C542]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>{event.location || "Тодорхойгүй"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-20 -mt-24 md:-mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {event.imageUrl && (
                            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white aspect-video relative">
                                <img 
                                    src={event.imageUrl} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl">
                            <h2 className="text-2xl font-black text-[#0F1B3D] mb-6 pb-4 border-b-2 border-slate-100 flex items-center gap-3">
                                <span className="w-10 h-10 bg-[#0F1B3D] text-[#F5C542] rounded-xl flex items-center justify-center text-lg">ℹ️</span>
                                Ерөнхий мэдээлэл
                            </h2>
                            <p className="text-[#0F1B3D] whitespace-pre-wrap leading-relaxed text-lg mb-8 font-medium italic opacity-70">
                                {event.description}
                            </p>

                            {event.content && (
                                <>
                                    <hr className="my-10 border-slate-100" />
                                    <h2 className="text-2xl font-black text-[#0F1B3D] mb-6 flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#0F1B3D] text-[#F5C542] rounded-xl flex items-center justify-center text-lg">📝</span>
                                        Хөтөлбөр ба дэлгэрэнгүй
                                    </h2>
                                    <div 
                                        className="prose prose-slate max-w-none 
                                        prose-headings:text-[#0F1B3D] prose-headings:font-black
                                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                                        prose-strong:text-[#0F1B3D]
                                        prose-a:text-blue-600 prose-a:font-bold hover:prose-a:underline"
                                        dangerouslySetInnerHTML={{ __html: event.content }}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-32 lg:self-start lg:pt-12">
                        <div className="bg-[#0F1B3D] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A843] rounded-full blur-[80px] opacity-10 -mr-16 -mt-16"></div>
                            
                            <h3 className="text-lg font-black mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
                                <span className="text-[#F5C542]">📌</span> Бүртгэл
                            </h3>
                            <p className="text-sm font-medium text-white/50 mb-8 leading-relaxed">
                                {event.isOpen 
                                    ? "Та доорх товч дээр дарж энэхүү арга хэмжээнд бүртгүүлэх боломжтой." 
                                    : "Уучлаарай, энэхүү арга хэмжээний бүртгэл хаагдсан байна."}
                            </p>
                            
                            <EventDetailRegisterButton 
                                eventId={event.id}
                                eventTitle={event.title}
                                isOpen={event.isOpen}
                            />
                            
                            <div className="mt-10 pt-8 border-t border-white/10 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F5C542]">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Эхлэх</p>
                                        <p className="font-bold text-sm tracking-tight">{event.startDate.toLocaleDateString('mn-MN')}</p>
                                    </div>
                                </div>
                                {event.endDate && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F5C542]">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Дуусах</p>
                                            <p className="font-bold text-sm tracking-tight">{event.endDate.toLocaleDateString('mn-MN')}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F5C542]">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Байршил</p>
                                        <p className="font-bold text-sm tracking-tight leading-tight">{event.location || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/events" className="flex items-center justify-center w-full py-4 text-sm font-bold text-slate-400 hover:text-[#0F1B3D] transition-colors">
                            ← Бүх арга хэмжээ руу буцах
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
