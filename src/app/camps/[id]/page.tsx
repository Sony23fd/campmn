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
        return { title: "Олдсонгүй | МҮЗХ" };
    }

    return {
        title: `${camp.name} | МҮЗХ Зуслан`,
        description: camp.description?.substring(0, 160) || "Монголын Үндэсний Зуслангуудын Холбооны гишүүн зуслан",
    };
}

export default async function CampDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const camp = await prisma.camp.findUnique({
        where: { id: resolvedParams.id }
    });

    if (!camp || !camp.isActive) {
        notFound();
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="w-full h-[400px] md:h-[500px] relative bg-slate-200">
                {camp.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        src={camp.imageUrl} 
                        alt={camp.name} 
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-200">
                        <svg className="w-20 h-20 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L28 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-xl">Зураг оруулаагүй байна</span>
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Content over hero */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white container mx-auto">
                    <div className="mb-4">
                        <Link href="/camps" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Бүх зуслан руу буцах
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{camp.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {camp.location || "Байршил тодорхойгүй"}
                        </span>
                        {(camp as any).ageCategories && (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    Нас: {(camp as any).ageCategories}
                                </span>
                            </>
                        )}
                        {(camp as any).campDirection && (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Чиглэл: {(camp as any).campDirection}
                                </span>
                            </>
                        )}
                        {camp.establishedAt && (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {camp.establishedAt} онд байгуулагдсан
                                </span>
                            </>
                        )}
                        {camp.capacity && (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    Нэг ээлжиндээ {camp.capacity} хүүхэд
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
                
                {/* Main Body */}
                <div className="flex-1 space-y-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Зуслангийн Танилцуулга</h2>
                        {camp.description ? (
                            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                                {camp.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">Одоогоор дэлгэрэнгүй танилцуулга оруулаагүй байна.</p>
                        )}
                    </div>

                    {/* Shifts */}
                    {Array.isArray((camp as any).shiftsData) && ((camp as any).shiftsData).length > 0 && (
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-8">
                            <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Ээлжийн Хуваарь</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border">
                                    <thead className="bg-slate-50 text-slate-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3 border-b">Ээлжийн нэр</th>
                                            <th className="px-4 py-3 border-b">Хугацаа</th>
                                            <th className="px-4 py-3 border-b">Төлбөр</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {((camp as any).shiftsData).map((shift: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                                <td className="px-4 py-3 font-medium text-slate-900">{shift.name}</td>
                                                <td className="px-4 py-3 text-slate-600">{shift.date}</td>
                                                <td className="px-4 py-3 text-green-600 font-semibold">{shift.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Groups (Accordion) */}
                    {Array.isArray((camp as any).groupsData) && ((camp as any).groupsData).length > 0 && (
                        <GroupsAccordion groups={(camp as any).groupsData} />
                    )}

                    {/* Programs (Accordion) */}
                    {Array.isArray((camp as any).programsData) && ((camp as any).programsData).length > 0 && (
                        <ProgramsAccordion programs={(camp as any).programsData} />
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[350px] space-y-6 shrink-0 sticky top-24 self-start">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 text-slate-900 border-b pb-4">Холбоо Барих</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Утас</p>
                                    <p className="text-slate-900 font-medium">{camp.contactPhone || "-"}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">И-мэйл</p>
                                    <p className="text-slate-900 font-medium break-all">{camp.contactEmail || "-"}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Вэб эсвэл FB</p>
                                    {camp.website ? (
                                        <a href={camp.website.startsWith('http') ? camp.website : `https://${camp.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline break-all">
                                            {camp.website}
                                        </a>
                                    ) : (
                                        <p className="text-slate-900 font-medium">-</p>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Map Detail */}
                    {(camp as any).locationMapUrl && (
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
                            <h3 className="text-lg font-bold mb-4 text-slate-900 px-2">Байршил</h3>
                            <div 
                                className="w-full h-[250px] rounded-xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full"
                                dangerouslySetInnerHTML={{ __html: (camp as any).locationMapUrl }}
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
