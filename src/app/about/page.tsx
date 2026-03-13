import { prisma } from "@/lib/prisma";
import AnimatedCounter from "@/components/AnimatedCounter";
import PartnerCarousel from "@/components/PartnerCarousel";
import Image from "next/image";

export const metadata = {
    title: "Бидний тухай | МҮЗХ",
    description: "Монголын Үндэсний Зуслангуудын Холбооны Танилцуулга",
};

export default async function AboutPage() {
    // 1. Fetch settings from DB
    const settingsRows = await prisma.siteSetting.findMany();
    const settings = settingsRows.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    // 2. Fetch Board Members
    const boardMembers = await prisma.post.findMany({
        where: { type: "BOARD_MEMBER", published: true },
        orderBy: { createdAt: "asc" }
    });

    // Extract dynamic variables with fallbacks
    const heroImage = settings.about_hero_image || "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop";
    const heroTitle = settings.about_hero_title || "БИДНИЙ ТУХАЙ";
    const heroSubtitle = settings.about_hero_subtitle || "Монголын Үндэсний Зуслангуудын Холбооны Танилцуулга";
    const missionText = settings.about_hero_title || "Монголын Үндэсний Зуслангуудын Холбоо (МҮЗХ) нь үүсгэн байгуулагч гишүүдийн санаачилгаар 2006 онд байгуулагдсан үндэсний хэмжээний төрийн бус байгууллага юм.";
    
    let timeline: any[] = [];
    try {
        const parsed = JSON.parse(settings.about_timeline || "[]");
        if (parsed && parsed.length > 0) {
            timeline = parsed;
        } else {
            timeline = [
                {year: "2006", title: "Үүсгэн байгуулагдсан", description: "Монгол улсад үйл ажиллагаа явуулж буй зуслангуудыг нэгтгэв."},
                {year: "2012", title: "ОУЗХ-ны гишүүн", description: "Олон улсын зуслангийн холбоо (ICF)-ны жинхэнэ гишүүн байгууллага болсон."},
                {year: "2025", title: "Ази, Номхон далай", description: "Ази, номхон далайн орнуудын зуслангийн холбоог үүсгэн байгууллаа."}
            ];
        }
    } catch(e) {}

    return (
        <div className="bg-slate-50 min-h-screen selection:bg-yellow-300 overflow-hidden font-sans">
            {/* 1. Playful Hero Section */}
            <section className="relative w-full py-16 md:py-24 flex items-center justify-center bg-blue-600 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] z-20 shadow-2xl">
                {/* Playful Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3 animate-blob animation-delay-2000"></div>
                
                {/* Wavy top separator (optional) */}
                <div className="absolute top-0 inset-x-0 h-10 bg-slate-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)'}}></div>

                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-black text-slate-900 border-2 border-yellow-300">
                                ⭐ Бидний тухай
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-sm leading-[1.1]">
                                {heroTitle}
                            </h1>
                            <p className="text-lg md:text-2xl font-medium text-blue-100 max-w-2xl mx-auto lg:mx-0">
                                {heroSubtitle}
                            </p>
                        </div>
                        
                        <div className="relative mx-auto w-full max-w-md lg:max-w-none transform md:rotate-3 transition-transform hover:rotate-0 duration-500">
                            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                                <img 
                                    src={heroImage} 
                                    alt="About MCAA" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6 text-white text-center font-bold text-2xl">
                                    МҮЗХолбоо
                                </div>
                            </div>
                            {/* Floating decorative star */}
                            <div className="absolute -top-6 -right-6 text-6xl drop-shadow-lg animate-bounce duration-1000">
                                ✨
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Interactive Stats Section - Playful Cards */}
            <section className="relative z-30 -mt-10 md:-mt-16 container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white rounded-3xl p-6 text-center shadow-xl border-b-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
                        <AnimatedCounter value={settings.stat1Year || "2006"} className="text-4xl md:text-5xl font-black text-slate-900 block mb-1" />
                        <span className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest">{settings.stat1Label || "Байгуулагдсан он"}</span>
                    </div>
                    <div className="bg-white rounded-3xl p-6 text-center shadow-xl border-b-4 border-yellow-400 hover:-translate-y-2 transition-transform duration-300">
                        <AnimatedCounter value={settings.stat2Number || "100+"} className="text-4xl md:text-5xl font-black text-slate-900 block mb-1" />
                        <span className="text-xs md:text-sm font-bold text-yellow-600 uppercase tracking-widest">{settings.stat2Label || "Бүртгэлтэй Зуслан"}</span>
                    </div>
                    <div className="bg-white rounded-3xl p-6 text-center shadow-xl border-b-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
                        <AnimatedCounter value={settings.stat3Year || "2012"} className="text-4xl md:text-5xl font-black text-slate-900 block mb-1" />
                        <span className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest">{settings.stat3Label || "ОУЗХ-ны гишүүн"}</span>
                    </div>
                    <div className="bg-white rounded-3xl p-6 text-center shadow-xl border-b-4 border-yellow-400 hover:-translate-y-2 transition-transform duration-300">
                        <AnimatedCounter value={settings.stat4Number || "15+"} className="text-4xl md:text-5xl font-black text-slate-900 block mb-1" />
                        <span className="text-xs md:text-sm font-bold text-yellow-600 uppercase tracking-widest">{settings.stat4Label || "ОУ-ын түншлэл"}</span>
                    </div>
                </div>
            </section>

            {/* 4. Main Mission & Values (Moved up, Chunky Cards) */}
            <section className="container mx-auto px-4 py-24 max-w-7xl">
                <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 bg-blue-50 p-8 md:p-12 rounded-[3rem] border-2 border-dashed border-blue-200">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">🎯</div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 drop-shadow-sm">Бидний эрхэм зорилго</h2>
                    <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">
                        {settings.about_mission_text || missionText}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Value Card 1 */}
                    <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-6 border-2 border-blue-600/10 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <span className="text-3xl">⚖️</span>
                        </div>
                        <h4 className="font-black text-2xl mb-4 text-slate-900 leading-tight">Хууль тогтоомж</h4>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Хүүхдийн хөгжил, хамгаалал, оролцооны чиглэлээрх хууль тогтоомж, бодлогын хэрэгжилтийг хангах, салбарын эрх зүйн орчныг боловсронгуй болгох.
                        </p>
                    </div>

                    {/* Value Card 2 */}
                    <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(250,204,21,0.2)] hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-[1.5rem] flex items-center justify-center mb-6 border-2 border-yellow-400/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                            <span className="text-3xl">⭐</span>
                        </div>
                        <h4 className="font-black text-2xl mb-4 text-slate-900 leading-tight">Хөтөлбөрийн чанар</h4>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Нас, хөгжлийн онцлогт тохирсон ялгаатай, уян хатан хөгжлийн хөтөлбөрийг шинэчлэн боловсруулах, үнэлгээ дүгнэлт хийх.
                        </p>
                    </div>

                    {/* Value Card 3 */}
                    <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-6 border-2 border-blue-600/10 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h4 className="font-black text-2xl mb-4 text-slate-900 leading-tight">Судалгаа</h4>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Олон улсын хамтын ажиллагааг өргөжүүлэх, төсөл, хөтөлбөрт хамрагдах, шинжлэх ухааны суурь болон хэрэглээний судалгаа хийх.
                        </p>
                    </div>

                    {/* Value Card 4 */}
                    <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(250,204,21,0.2)] hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-[1.5rem] flex items-center justify-center mb-6 border-2 border-yellow-400/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                            <span className="text-3xl">🤝</span>
                        </div>
                        <h4 className="font-black text-2xl mb-4 text-slate-900 leading-tight">Хүний нөөц</h4>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Салбарын хүний нөөцийн сургалт, мэргэжлийн хөгжлийг дэмжих, зуслангийн багш, нийгмийн ажилтнуудыг бэлтгэх.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Board Members (Playful Grids) */}
            {boardMembers.length > 0 && (
                <section className="container mx-auto px-4 py-20 max-w-7xl">
                    <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
                        <div className="w-20 h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"></div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Удирдах зөвлөл</h2>
                        <p className="text-xl text-slate-500 font-medium max-w-2xl">
                            МҮЗХ-ны бодлого, стратегийн хэрэгжилтийг хангаж, салбарын хөгжлийг түүчээлэгч манлайлагчид.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
                        {boardMembers.map((member, i) => (
                            <div key={member.id} className="group flex flex-col items-center">
                                {/* Playful offset background for portraits */}
                                <div className="relative mb-6">
                                    <div className={`absolute inset-0 rounded-[2.5rem] ${i % 2 === 0 ? 'bg-yellow-300 -rotate-6' : 'bg-blue-300 rotate-6'} group-hover:rotate-0 transition-transform duration-300`}></div>
                                    <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                                        {member.imageUrl ? (
                                            <img 
                                                src={member.imageUrl} 
                                                alt={member.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-5xl font-black text-slate-300">
                                                {member.title.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight text-center group-hover:text-blue-600 transition-colors">{member.title}</h3>
                                <div className="inline-flex bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full text-center">
                                    {member.excerpt || "Удирдах зөвлөлийн гишүүн"}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. Interactive Timeline - Option 2 Style */}
            {timeline.length > 0 && (
                <section className="bg-slate-900 text-white py-24 relative overflow-hidden rounded-[3rem] mx-4 md:mx-12 my-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                    {/* Abstract playful BG shapes */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-40 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-30 -ml-20 -mb-20"></div>
                    
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <div className="text-center mb-16">
                            <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-yellow-300 font-bold tracking-widest uppercase text-sm mb-4 border border-white/20">Түүхэн замнал</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white">Хөгжил, Хүрсэн Үр Дүн</h2>
                        </div>
                        
                        <div className="relative">
                            {/* Central Line */}
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-2 bg-white/10 rounded-full transform -translate-x-1/2"></div>
                            
                            <div className="space-y-16">
                                {timeline.map((event, i) => (
                                    <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        
                                        {/* Mobile structural dot */}
                                        <div className="absolute left-[-20px] md:hidden w-6 h-6 rounded-full bg-blue-500 border-4 border-slate-900"></div>

                                        <div className={`w-full md:w-[45%] lg:w-[42%] p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-blue-400 transition-colors group relative overflow-hidden`}>
                                            {/* decorative year background text */}
                                            <span className="absolute -bottom-4 -right-4 text-7xl font-black text-white/5 select-none transition-transform group-hover:scale-110 group-hover:text-white/10">{event.year}</span>
                                            
                                            <span className="inline-block bg-yellow-400 text-slate-900 font-black text-2xl px-4 py-1.5 rounded-xl mb-4 shadow-lg">{event.year}</span>
                                            <h4 className="text-2xl font-black mb-3 text-white leading-tight">{event.title}</h4>
                                            <p className="text-slate-300 font-medium leading-relaxed relative z-10">{event.description}</p>
                                        </div>

                                        {/* Desktop Dot */}
                                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-[6px] border-white/10 z-10 transition-colors group-hover:border-blue-400 group-hover:bg-blue-500">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 6. Partner Carousel Container styled */}
            <section className="bg-white py-16 px-4 md:px-12">
                <div className="bg-slate-50 rounded-[3rem] py-12 border-2 border-slate-100">
                    <PartnerCarousel />
                </div>
            </section>
        </div>
    );
}
