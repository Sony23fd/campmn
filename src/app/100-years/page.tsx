import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PartnerCarousel from "@/components/PartnerCarousel";
import WaveHeader from "../../components/WaveHeader";

export const metadata: Metadata = {
    title: "100 Жилийн Ой — Түүхэн замнал | МҮЗХ",
    description: "Монголын Үндэсний Зуслангуудын Холбооны 100 жилийн түүхэн замнал (1926-2026)",
};

export const dynamic = "force-dynamic";

export default async function AnniversaryPage() {
    const dbSettings = await prisma.siteSetting.findMany({
        where: {
            key: {
                in: [
                    'anniversary_video_url',
                    'anniversary_hero_title',
                    'anniversary_hero_text',
                    'anniversary_accordions',
                    'anniversary_intro_title',
                    'anniversary_intro_text',
                    'anniversary_greeting_image',
                    'anniversary_greeting_name',
                    'anniversary_greeting_role',
                    'anniversary_greeting_text',
                ]
            }
        }
    });

    const sm = dbSettings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    const videoUrl = sm['anniversary_video_url'] || "https://www.youtube.com/embed/A6XUVjK9W4o";
    const heroTitle = sm['anniversary_hero_title'] || "Зууны Нөлөөлөл (1926–2026)";
    const heroText = sm['anniversary_hero_text'] || "Монголын Үндэсний Зуслангийн Холбооны 100 жилийн ойг угтаж түүхэн замналаа эргэн дурсаж байна.";
    const introTitle = sm['anniversary_intro_title'] || "Үйл ажиллагаа ба Хөтөлбөрүүд";
    const introText = sm['anniversary_intro_text'] || "Ойн баярын хүрээнд зохион байгуулагдах албан ёсны хөтөлбөрүүд болон уулзалтууд.";

    // Greeting settings
    const greetingImage = sm['anniversary_greeting_image'] || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop";
    const greetingName = sm['anniversary_greeting_name'] || "Б. Болд";
    const greetingRole = sm['anniversary_greeting_role'] || "МҮЗХ-ны Тэргүүн";
    const greetingText = sm['anniversary_greeting_text'] || "Монгол улсад зуслангийн салбар үүсэж хөгжсөний 100 жилийн ойн баярын мэндийг нийт салбарын хамт олон, хүүхэд багачууд та бүхэндээ хүргэе.";

    // Fetch Timeline Events from database
    const timeline = await (prisma as any).timelineEvent.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" }
    });

    // Research posts
    const researchPosts = await prisma.post.findMany({
        where: { type: "RESEARCH", published: true },
        orderBy: { createdAt: "desc" },
    });

    // Accordions
    let accordions: any[] = [];
    try {
        accordions = JSON.parse(sm['anniversary_accordions'] || "[]");
    } catch (e) { }

    return (
        <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans text-[#0F1B3D] overflow-hidden">
            {/* BACKGROUND DECORATIONS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Top Left Gold Blurs */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A843]/10 rounded-full blur-[100px]" />
                <div className="absolute top-20 right-10 w-20 h-20 bg-[#D4A843]/20 rounded-full blur-[30px]" />
                {/* Abstract Gold Shapes via CSS (resembling the drops) */}
                <div className="absolute top-40 left-10 w-12 h-16 bg-gradient-to-br from-[#F5C542] to-[#D4A843] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-40 blur-[2px] animate-pulse" />
                <div className="absolute top-80 right-20 w-16 h-24 bg-gradient-to-br from-[#ffffff] to-[#f4f4f4] rounded-[50%_50%_30%_70%/50%_60%_40%_50%] shadow-lg opacity-80" />
                <div className="absolute top-[30%] left-[80%] w-8 h-8 bg-[#D4A843] rounded-full opacity-60 blur-[1px]" />
                <div className="absolute top-[50%] left-[10%] w-14 h-14 bg-white rounded-full shadow-2xl opacity-90 blur-[1px]" />
            </div>

            {/* ===== GREETING SECTION ===== */}
            <section className="relative z-10 pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-white/50 flex flex-col md:flex-row items-center gap-10">
                        {/* Image */}
                        <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 transition-transform hover:scale-105 duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F5C542] to-[#D4A843] rounded-full blur-md opacity-30 -z-10 translate-y-4" />
                            <img
                                src={greetingImage}
                                alt={greetingName}
                                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                            />
                        </div>
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <svg className="w-10 h-10 text-[#D4A843] opacity-50 mx-auto md:mx-0 -mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                            <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed">
                                "{greetingText}"
                            </p>
                            <div>
                                <h4 className="text-xl font-bold text-[#0F1B3D]">{greetingName}</h4>
                                <p className="text-sm font-semibold text-[#D4A843] uppercase tracking-wider">{greetingRole}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-12 pb-20 z-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-16 text-center max-w-4xl mx-auto space-y-8">
                        {/* Video Container */}
                        <div className="mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] bg-black aspect-video relative group border border-white/20">
                            {/* Golden Seal inside Video Container */}
                            <div className="absolute -top-4 -right-4 md:top-4 md:-right-8 z-20 w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-[#F5C542] via-[#ffe38a] to-[#D4A843] rounded-full flex flex-col items-center justify-center p-2 shadow-2xl border-4 border-white shrink-0 hover:scale-105 transition-transform duration-300">
                                <div className="border border-white/40 w-full h-full rounded-full flex flex-col items-center justify-center pt-2">
                                    <span className="text-white text-3xl md:text-5xl font-black leading-none drop-shadow-md">100</span>
                                    <span className="text-[#0F1B3D] text-[10px] md:text-sm font-black uppercase tracking-widest leading-none mt-1">YEARS</span>
                                </div>
                            </div>

                            <iframe
                                className="w-full h-full relative z-10"
                                src={videoUrl}
                                title="100 Жилийн Ойн Танилцуулга"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>

                        <div className="space-y-4 px-4">
                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#D4A843] via-[#D4A843] to-[#b38827] tracking-tighter">
                                {heroTitle}
                            </h1>
                            <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
                                {heroText}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PROGRAMS / ACCORDIONS SECTION ===== */}
            {accordions && accordions.length > 0 && (
                <section className="relative z-10 pb-24">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-[#0F1B3D] mb-4">{introTitle}</h2>
                            <p className="text-slate-500 font-medium max-w-2xl mx-auto">{introText}</p>
                        </div>
                        <div className="space-y-4">
                            {accordions.map((item: {title: string, content: string}, i: number) => (
                                <details key={i} className="group bg-white rounded-2xl border border-slate-200 shadow-sm [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-lg text-[#0F1B3D] hover:bg-slate-50 transition-colors">
                                        {item.title}
                                        <span className="shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 bg-white group-open:-rotate-180 transition-transform duration-300">
                                            <svg className="w-5 h-5 text-[#D4A843]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                                        {item.content}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TIMELINE SECTION ===== */}
            <section className="relative z-10 pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    {/* TIMELINE TITLE */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-[#F5C542]/10 text-[#D4A843] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#F5C542]/20 shadow-sm">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            Түүхэн замнал
                        </div>
                        <h2 className="text-4xl font-black">Түүхэн замнал</h2>
                    </div>

                    {/* TIMELINE COMPONENT */}
                    <div className="relative max-w-5xl mx-auto">
                        {/* Golden Center Line */}
                        <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F5C542]/0 via-[#F5C542] to-[#F5C542]/0 -translate-x-1/2 rounded-full" />

                        <div className="space-y-16">
                            {timeline.length > 0 ? (timeline as any[]).map((event: any, index: number) => (
                                <div key={event.id} className={`relative flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row justify-end md:justify-center`}>

                                    {/* Golden Dot */}
                                    <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#F5C542] shadow-[0_0_15px_rgba(245,197,66,0.5)] z-10 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0F1B3D]" />
                                    </div>

                                    {/* Year indicator pointing to dot */}
                                    <div className={`absolute left-20 md:left-auto md:w-0 w-auto ${index % 2 === 0 ? 'md:right-1/2 md:pr-10 md:text-right' : 'md:left-1/2 md:pl-10 md:text-left'} -mt-8 md:mt-0 font-black text-3xl md:text-5xl text-[#0F1B3D]/10 z-0 select-none`}>
                                        {event.year}
                                    </div>

                                    {/* Content Card (Image + Text overlapping) */}
                                    <div className={`w-[calc(100%-60px)] md:w-[45%] ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} relative z-10 group`}>
                                        <div className="relative">
                                            {/* Image Layer */}
                                            {(event.imageUrl || event.videoUrl) && (
                                                <div className="relative aspect-[4/3] md:aspect-[3/2] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-white/50">
                                                    {event.videoUrl ? (
                                                        <div className="w-full h-full bg-slate-900 absolute inset-0">
                                                            {/* Fake Play Button for styling if needed, or straight iframe */}
                                                            <iframe className="w-full h-full relative z-10" src={event.videoUrl} frameBorder="0" allowFullScreen />
                                                        </div>
                                                    ) : (
                                                        <img src={event.imageUrl!} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    )}
                                                </div>
                                            )}

                                            {/* Text Block overlapping/attached bottom */}
                                            <div className={`relative ${event.imageUrl || event.videoUrl ? '-mt-10 mx-4 md:-mt-12 md:mx-6' : 'mx-0'} bg-white/90 backdrop-blur-xl rounded-2xl p-5 md:p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] border border-white z-20 transition-transform group-hover:-translate-y-2 duration-300`}>
                                                <h3 className="text-lg md:text-xl font-bold text-[#0F1B3D] leading-tight mb-2">
                                                    {event.title}
                                                </h3>
                                                {event.description && (
                                                    <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed line-clamp-3">
                                                        {event.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 text-slate-400 font-medium">
                                    Түүхэн замналын мэдээлэл одоогоор алга байна.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PARTNERS SECTION ===== */}
            <div className="relative z-10 bg-white pt-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0F1B3D]"></h2>
                    <p className="text-slate-500 text-sm mt-2"></p>
                </div>
                <PartnerCarousel />
            </div>
        </div>
    );
}
