import { prisma } from "@/lib/prisma";
import AnimatedCounter from "@/components/AnimatedCounter";
import PartnerCarousel from "@/components/PartnerCarousel";
import WaveHeader from "../../components/WaveHeader";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Бидний тухай | МҮЗХ — 100 Жил",
    description: "Монголын Үндэсний Зуслангуудын Холбооны Танилцуулга",
};

export default async function AboutPage() {
    const settingsRows = await prisma.siteSetting.findMany();
    const settings = settingsRows.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    const boardMembers = await prisma.post.findMany({
        where: { type: "BOARD_MEMBER", published: true },
        orderBy: { createdAt: "asc" }
    });

    const allPartners = await prisma.partner.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" }
    });
    const nationalPartners = allPartners.filter(p => p.type === "NATIONAL");
    const internationalPartners = allPartners.filter(p => p.type === "INTERNATIONAL");

    const heroImage = settings.about_hero_image || "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop";
    const heroTitle = settings.about_hero_title || "БИДНИЙ ТУХАЙ";
    const heroSubtitle = settings.about_hero_subtitle || "Монголын Үндэсний Зуслангуудын Холбооны Танилцуулга";
    
    const introTitle = settings.about_intro_title || "МОНГОЛЫН ҮНДЭСНИЙ ЗУСЛАНГУУДЫН ХОЛБООНЫ ТАНИЛЦУУЛГА";
    const introText = settings.about_intro_text || "Монголын Үндэсний Зуслангуудын Холбоо (МҮЗХ) нь үүсгэн байгуулагч гишүүдийн санаачилгаар байгуулагдсан үндэсний хэмжээний төрийн бус байгууллага юм.";
    const introImage = settings.about_intro_image || "https://images.unsplash.com/photo-1523240715632-6103d7bef905?q=80&w=2070&auto=format&fit=crop";

    const missionText = settings.about_mission_text || "Зуслангийн салбарын хөгжлийг бодлогын түвшинд дэмжих, мэргэжил арга зүйн зөвлөгөө өгөх, хүний нөөцийн чадавхыг бэхжүүлэх.";
    const visionTitle = settings.about_vision_title || "Алсын хараа";
    const visionText = settings.about_vision_text || "Зуслангуудын холбоо нь салбарын тэргүүлэгч, олон улсын жишигт нийцсэн хүүхэд хөгжлийн төв байх.";
    const visionImage = settings.about_vision_image || "";

    const structureTitle = settings.about_structure_title || "Бүтэц засаглал";
    const structureText = settings.about_structure_text || "МҮЗХ нь Удирдах зөвлөл, Хяналтын зөвлөл, Ажлын алба гэсэн бүтэцтэйгээр үйл ажиллагаагаа явуулдаг.";
    const structureImage = settings.about_structure_image || "";

    let timeline: any[] = [];
    try {
        const parsed = JSON.parse(settings.about_timeline || "[]");
        if (parsed && parsed.length > 0) {
            timeline = parsed;
        } else {
            timeline = [
                { year: "1926", title: "Үүсгэн байгуулагдсан", description: "Монгол улсад үйл ажиллагаа явуулж буй зуслангуудыг нэгтгэв." },
                { year: "2012", title: "ОУЗХ-ны гишүүн", description: "Олон улсын зуслангийн холбоо (ICF)-ны жинхэнэ гишүүн байгууллага болсон." },
                { year: "2025", title: "100 жилийн ой", description: "100 жилийн ойгоо тэмдэглэн, шинэ зууны алхамаа эхлүүлсэн." }
            ];
        }
    } catch (e) { }

    return (
        <div className="min-h-screen font-sans text-[#0F1B3D]">

            {/* ===== INTRODUCTION ===== */}
            <section className="pt-32 pb-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-0" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <div className="w-12 h-1.5 bg-[#D4A843] rounded-full" />
                            <h2 className="text-3xl md:text-5xl font-black text-[#0F1B3D] leading-tight uppercase">
                                {introTitle}
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed text-justify">
                                {introText}
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#0F1B3D]/5 rounded-3xl -rotate-2" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img src={introImage} alt="Intro" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MISSION & VISION GRID ===== */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -z-0" />
                <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Mission Card */}
                        <div className="bg-white p-10 md:p-14 rounded-[3rem] border-t-8 border-[#0F1B3D] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-0 group-hover:bg-[#0F1B3D]/5 transition-colors" />
                            <div className="relative z-10 space-y-6">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#0F1B3D]/5 text-[#0F1B3D] text-xs font-bold uppercase tracking-widest">Mission</span>
                                <h2 className="text-3xl md:text-4xl font-black text-[#0F1B3D] tracking-tight">Бидний эрхэм зорилго</h2>
                                <div className="w-12 h-1 bg-[#D4A843] rounded-full" />
                                <p className="text-lg text-slate-600 font-medium leading-relaxed text-justify">{missionText}</p>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white p-10 md:p-14 rounded-[3rem] border-t-8 border-[#D4A843] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-0 group-hover:bg-[#D4A843]/5 transition-colors" />
                            <div className="relative z-10 space-y-6">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4A843]/10 text-[#D4A843] text-xs font-bold uppercase tracking-widest">Vision</span>
                                <h2 className="text-3xl md:text-4xl font-black text-[#0F1B3D] tracking-tight">{visionTitle}</h2>
                                <div className="w-12 h-1 bg-[#0F1B3D] rounded-full" />
                                <p className="text-lg text-slate-600 font-medium leading-relaxed text-justify">{visionText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STRUCTURE & GOVERNANCE ===== */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center mb-16 space-y-4">
                        <div className="w-20 h-1.5 bg-gradient-to-r from-[#0F1B3D] to-[#F5C542] rounded-full mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-black text-[#0F1B3D] uppercase tracking-tight">
                            {structureTitle}
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-3xl mx-auto text-justify">
                            {structureText}
                        </p>
                    </div>
                    
                    {structureImage && (
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute inset-0 bg-blue-50 rounded-[3rem] -z-10 blur-3xl opacity-50" />
                            <div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl border border-slate-100">
                                <img 
                                    src={structureImage} 
                                    alt="Structure" 
                                    className="w-full h-auto rounded-2xl shadow-inner border border-slate-50" 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== BOARD MEMBERS ===== */}
            {boardMembers.length > 0 && (
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <div className="text-center mb-16 space-y-4">
                            <div className="w-20 h-1.5 bg-gradient-to-r from-[#0F1B3D] to-[#F5C542] rounded-full mx-auto" />
                            <h2 className="text-3xl md:text-4xl font-black text-[#0F1B3D]">Удирдах зөвлөл</h2>
                            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                                МҮЗХ-ны бодлого, стратегийн хэрэгжилтийг хангаж, салбарын хөгжлийг түүчээлэгч манлайлагчид.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {boardMembers.map((member, i) => (
                                <div key={member.id} className="group flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className={`absolute inset-0 rounded-2xl ${i % 2 === 0 ? 'bg-[#F5C542] -rotate-6' : 'bg-[#1A2B5C] rotate-6'} group-hover:rotate-0 transition-transform duration-300 opacity-50`} />
                                        <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                                            {member.imageUrl ? (
                                                <img src={member.imageUrl} alt={member.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-300">
                                                    {member.title.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0F1B3D] mb-1 group-hover:text-blue-600 transition-colors">{member.title}</h3>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                                        {member.excerpt || "Удирдах зөвлөлийн гишүүн"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TIMELINE ===== */}
            {timeline.length > 0 && (
                <section className="bg-[#0F1B3D] text-white py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A2B5C] rounded-full blur-[100px] opacity-40 -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843] rounded-full blur-[100px] opacity-15 -ml-20 -mb-20" />

                    <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-[#F5C542] uppercase tracking-widest mb-4 border border-white/10">
                                Түүхэн замнал
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-white">Хөгжил, Хүрсэн Үр Дүн</h2>
                        </div>

                        <div className="space-y-12">
                            {timeline.map((event: any, i: number) => (
                                <div key={i} className="flex items-start gap-6">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-12 h-12 rounded-full bg-[#D4A843] text-[#0F1B3D] font-black text-sm flex items-center justify-center shadow-lg shadow-yellow-500/20">
                                            {event.year?.substring(0, 4)}
                                        </div>
                                    </div>
                                    <div className="glass-card rounded-xl p-6 flex-1">
                                        <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                                        <p className="text-white/60 font-medium">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== COOPERATION ===== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                    {nationalPartners.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-xl font-bold text-[#0F1B3D] mb-8 flex items-center gap-3">
                                <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg">🇲🇳</span>
                                Үндэсний хэмжээнд
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {nationalPartners.map(p => (
                                    <div key={p.id} className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                                        {p.logo ? (
                                            <img src={p.logo} alt={p.name} className="h-12 w-auto object-contain mb-3" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-black text-blue-600 mb-3">{p.name.charAt(0)}</div>
                                        )}
                                        <p className="text-xs font-bold text-slate-700">{p.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {internationalPartners.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-[#0F1B3D] mb-8 flex items-center gap-3">
                                <span className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-lg">🌍</span>
                                Олон улсын түвшний
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {internationalPartners.map(p => (
                                    <div key={p.id} className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                                        {p.logo ? (
                                            <img src={p.logo} alt={p.name} className="h-12 w-auto object-contain mb-3" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl font-black text-amber-600 mb-3">{p.name.charAt(0)}</div>
                                        )}
                                        <p className="text-xs font-bold text-slate-700">{p.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {allPartners.length === 0 && (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 text-lg">Одоогоор хамтрагч байгууллага нэмэгдээгүй байна.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== PARTNER CAROUSEL ===== */}
            <section className="bg-slate-50 py-16">
                <PartnerCarousel />
            </section>
        </div>
    );
}
