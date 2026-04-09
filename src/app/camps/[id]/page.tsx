import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import ProgramsAccordion from "@/components/ProgramsAccordion";
import GroupsAccordion from "@/components/GroupsAccordion";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const camp = await prisma.camp.findUnique({
        where: { id: resolvedParams.id }
    });

    if (!camp) {
        return { title: "Олдсонгүй | МҮЗХ — 100 Жил" };
    }

    return {
        title: `${camp.name} | МҮЗХ Зуслан`,
        description: camp.description?.substring(0, 160) || "Монголын Үндэсний Зуслангуудын Холбооны гишүүн зуслан",
    };
}

export const dynamic = "force-dynamic";

export default async function CampDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const camp = await prisma.camp.findUnique({
        where: { id: resolvedParams.id }
    });

    if (!camp || !camp.isActive) {
        notFound();
    }

    const ageCategories = (camp as any).ageCategories;
    const campDirection = (camp as any).campDirection;
    const shiftsData = (camp as any).shiftsData as any[];
    const groupsData = (camp as any).groupsData as any[];
    const programsData = (camp as any).programsData as any[];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Hero Section with Image Background */}
            <div className="relative h-[60vh] md:h-[70vh] min-h-[450px] overflow-hidden bg-[#0F1B3D]">
                {camp.imageUrl ? (
                    <img 
                        src={camp.imageUrl} 
                        alt={camp.name} 
                        className="w-full h-full object-cover opacity-60" 
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10 bg-[#0F1B3D]">
                        <svg className="w-32 h-32 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L28 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                )}
                
                {/* Gradient and Wave overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B3D] via-[#0F1B3D]/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center pt-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl space-y-6">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                <Link href="/camps" className="hover:text-[#F5C542] transition-colors">Зуслангууд</Link>
                                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                                <span className="text-[#F5C542] truncate">{camp.name}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-[#F5C542] text-[#0F1B3D] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                                    ГИШҮҮН ЗУСЛАН
                                </span>
                                {camp.location && (
                                    <span className="bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                                        📍 {camp.location}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
                                {camp.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 text-sm font-bold text-white/70">
                                {ageCategories && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5C542]">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                        </div>
                                        <span>Нас: {ageCategories}</span>
                                    </div>
                                )}
                                {campDirection && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5C542]">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                        <span>Чиглэл: {campDirection}</span>
                                    </div>
                                )}
                                {camp.capacity && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5C542]">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <span>Багтаамж: {camp.capacity}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className="container mx-auto px-4 relative z-20 -mt-20 flex flex-col lg:flex-row gap-8">
                
                {/* Main Body */}
                <div className="flex-1 space-y-8">
                    <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
                        <h2 className="text-2xl font-black text-[#0F1B3D] mb-8 pb-4 border-b-2 border-slate-100 flex items-center gap-3">
                            <span className="w-10 h-10 bg-[#0F1B3D] text-[#F5C542] rounded-xl flex items-center justify-center text-lg">⛺</span>
                            Зуслангийн Танилцуулга
                        </h2>
                        {camp.description ? (
                            <div className="prose prose-slate max-w-none 
                                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                                prose-headings:text-[#0F1B3D] prose-headings:font-black">
                                {camp.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 italic font-medium p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                                Одоогоор дэлгэрэнгүй танилцуулга оруулаагүй байна.
                            </p>
                        )}
                    </div>

                    {/* Shifts Table */}
                    {Array.isArray(shiftsData) && shiftsData.length > 0 && (
                        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                            <h2 className="text-2xl font-black text-[#0F1B3D] mb-8 pb-4 border-b-2 border-slate-100 flex items-center gap-3">
                                <span className="w-10 h-10 bg-[#0F1B3D] text-[#F5C542] rounded-xl flex items-center justify-center text-lg">📅</span>
                                Ээлжийн Хуваарь
                            </h2>
                            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4 border-b">Ээлжийн нэр</th>
                                            <th className="px-6 py-4 border-b">Хугацаа</th>
                                            <th className="px-6 py-4 border-b">Төлбөр</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {shiftsData.map((shift: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-[#0F1B3D]">{shift.name}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-500">{shift.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-emerald-600 font-black px-3 py-1 bg-emerald-50 rounded-full text-sm">{shift.price}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Groups and Programs */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {Array.isArray(groupsData) && groupsData.length > 0 && (
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                                <h2 className="text-xl font-black text-[#0F1B3D] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-[#0F1B3D] text-[#F5C542] rounded-lg flex items-center justify-center text-sm">👥</span>
                                    Бүлэг ангилал
                                </h2>
                                <GroupsAccordion groups={groupsData} />
                            </div>
                        )}

                        {Array.isArray(programsData) && programsData.length > 0 && (
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                                <h2 className="text-xl font-black text-[#0F1B3D] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-[#0F1B3D] text-[#F5C542] rounded-lg flex items-center justify-center text-sm">📋</span>
                                    Хөтөлбөрүүд
                                </h2>
                                <ProgramsAccordion programs={programsData} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[350px] space-y-6 shrink-0 lg:sticky lg:top-24 lg:self-start">
                    {/* Contact Card */}
                    <div className="bg-[#0F1B3D] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A843] rounded-full blur-[80px] opacity-10 -mr-16 -mt-16"></div>
                        
                        <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
                            <span className="text-[#F5C542]">📞</span> Холбоо Барих
                        </h3>
                        <ul className="space-y-8 relative z-10">
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 text-[#F5C542] rounded-xl shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Утас</p>
                                    <p className="font-bold text-lg">{camp.contactPhone || "-"}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 text-[#F5C542] rounded-xl shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">И-мэйл</p>
                                    <p className="font-bold text-sm break-all">{camp.contactEmail || "-"}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 text-[#F5C542] rounded-xl shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Вэб / Сошиал</p>
                                    {camp.website ? (
                                        <a href={camp.website.startsWith('http') ? camp.website : `https://${camp.website}`} target="_blank" rel="noopener noreferrer" className="text-[#F5C542] font-bold text-sm hover:underline break-all block">
                                            {camp.website}
                                        </a>
                                    ) : (
                                        <p className="font-bold text-white/60">-</p>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Map Detail */}
                    {(camp as any).locationMapUrl && (
                        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                            <h3 className="text-sm font-black text-[#0F1B3D] uppercase tracking-widest mb-4 px-2">📍 Байршил</h3>
                            <div 
                                className="w-full h-[250px] rounded-2xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full border border-slate-100"
                                dangerouslySetInnerHTML={{ __html: (camp as any).locationMapUrl }}
                            />
                        </div>
                    )}

                    <Link href="/camps" className="flex items-center justify-center w-full py-4 text-sm font-bold text-slate-400 hover:text-[#0F1B3D] transition-colors">
                        ← Жагсаалт руу буцах
                    </Link>
                </div>
            </div>
        </div>
    );
}
