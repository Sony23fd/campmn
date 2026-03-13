import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EventDetailRegisterButton from "@/components/EventDetailRegisterButton";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const event = await prisma.event.findUnique({ where: { id: params.id } });
    if (!event) return { title: "Арга хэмжээ олдсонгүй" };
    return { title: `${event.title} | МҮЗХ` };
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
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header / Hero Section */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <Link href="/events" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Бүх арга хэмжээ рүү буцах
                    </Link>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                {getTypeLabel(event.eventType)}
                            </span>
                            {event.isOpen ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                    Бүртгэл нээлттэй
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                                    Бүртгэл хаагдсан
                                </span>
                            )}
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                            {event.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-6 text-sm md:text-base text-slate-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="font-medium">{formatDateRange(event.startDate, event.endDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="font-medium">{event.location || "Тодорхойгүй"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {event.imageUrl && (
                            <div className="rounded-2xl overflow-hidden border bg-white shadow-sm aspect-video relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={event.imageUrl} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">Ерөнхий мэдээлэл</h2>
                            <p className="text-slate-600 whitespace-pre-wrap leading-relaxed text-lg mb-8">
                                {event.description}
                            </p>

                            {event.content && (
                                <>
                                    <hr className="my-8 border-slate-100" />
                                    <h2 className="text-2xl font-bold mb-4">Хөтөлбөр ба дэлгэрэнгүй</h2>
                                    <div 
                                        className="prose prose-slate max-w-none md:prose-lg"
                                        dangerouslySetInnerHTML={{ __html: event.content }}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border p-6 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold mb-2">Бүртгэл</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                {event.isOpen 
                                    ? "Та доорх товч дээр дарж энэхүү арга хэмжээнд бүртгүүлэх боломжтой." 
                                    : "Уучлаарай, энэхүү арга хэмжээний бүртгэл хаагдсан байна."}
                            </p>
                            
                            <EventDetailRegisterButton 
                                eventId={event.id}
                                eventTitle={event.title}
                                isOpen={event.isOpen}
                            />
                            
                            <hr className="my-6 border-slate-100" />
                            <div className="text-sm space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Эхлэх:</span>
                                    <span className="font-medium">{event.startDate.toLocaleDateString('mn-MN')}</span>
                                </div>
                                {event.endDate && (
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Дуусах:</span>
                                    <span className="font-medium">{event.endDate.toLocaleDateString('mn-MN')}</span>
                                </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Хаана:</span>
                                    <span className="font-medium text-right max-w-[150px]">{event.location || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
