import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PartnerCarousel from "@/components/PartnerCarousel";
import WaveHeader from "../../components/WaveHeader";
import AnniversaryEvents from "@/components/AnniversaryEvents";

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

    // Fetch Events for the events section
    const anniversaryEvents = await prisma.event.findMany({
        where: { isOpen: true },
        orderBy: { startDate: "asc" },
        take: 3
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



            {/* ===== ANNIVERSARY EVENTS SECTION ===== */}
            <AnniversaryEvents 
                events={anniversaryEvents.map(e => ({
                    ...e,
                    startDate: e.startDate.toISOString(), // Ensure serializable
                }))} 
            />



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
