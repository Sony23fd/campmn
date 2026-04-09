import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AnimatedCounter from "@/components/AnimatedCounter";
import PartnerCarousel from "@/components/PartnerCarousel";

export const dynamic = "force-dynamic";

export default async function Home() {
    const settings = await prisma.siteSetting.findMany();
    const s = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    const heroTitle = s.heroTitle !== undefined ? s.heroTitle : "Монголын Зуслангийн Салбарын 100 Жилийн Ой";
    const heroSubtitle = s.heroSubtitle !== undefined ? s.heroSubtitle : "Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан зуслангийн хөгжлийн үеийн үеийн төлөөлөл.";

    const stat1Title = s.home_stat1_title || "1926";
    const stat1Sub = s.home_stat1_subtitle || "Байгуулагдсан он";
    const stat2Title = s.home_stat2_title || "100+";
    const stat2Sub = s.home_stat2_subtitle || "Бүртгэлтэй зуслан";
    const stat3Title = s.home_stat3_title || "2012";
    const stat3Sub = s.home_stat3_subtitle || "ОУЗХ-ны гишүүн";
    const stat4Title = s.home_stat4_title || "15+";
    const stat4Sub = s.home_stat4_subtitle || "ОУ-ын түншлэл";

    const heroBtn1Text = s.hero_btn1_text !== undefined ? s.hero_btn1_text : "Зуслан хайх";
    const heroBtn1Link = s.hero_btn1_link || "/camps";
    const heroBtn2Text = s.hero_btn2_text !== undefined ? s.hero_btn2_text : "Бидний тухай";
    const heroBtn2Link = s.hero_btn2_link || "/about";

    const heroImg1 = s.hero_img1 || "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop";
    const heroImg2 = s.hero_img2 || "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=600&auto=format&fit=crop";
    const heroImg3 = s.hero_img3 || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop";
    const heroImg4 = s.hero_img4 || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600&auto=format&fit=crop";
    const heroImg5 = s.hero_img5 || "https://images.unsplash.com/photo-1529156069898-49953eb1b5b6?q=80&w=600&auto=format&fit=crop";

    const featuredCamps = await prisma.camp.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 4,
    });

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-[#0F1B3D]">
            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-24 pb-36 overflow-hidden bg-[#0F1B3D]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4A843]/20 rounded-full blur-[120px] -z-0 translate-x-1/3 -translate-y-1/3 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1a2c5b] rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/4" />
                
                <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        
                        {/* Left - Hero Content */}
                        <div className="space-y-8 animate-fade-up">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#F5C542] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C542] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C542]"></span>
                                </span>
                                Түүхт 100 Жилийн Ой
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] tracking-tight text-white drop-shadow-md">
                                {heroTitle}
                            </h1>
                            <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                                {heroSubtitle}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                {heroBtn1Text && (
                                    <Link
                                        href={heroBtn1Link}
                                        className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#F5C542] to-[#D4A843] text-[#0F1B3D] px-10 text-sm font-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,197,66,0.4)]"
                                    >
                                        {heroBtn1Text}
                                    </Link>
                                )}
                                {heroBtn2Text && (
                                    <Link
                                        href={heroBtn2Link}
                                        className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 text-white px-10 text-sm font-bold hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
                                    >
                                        {heroBtn2Text}
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Right - Hero Bubble Images */}

                        <div className="relative h-[500px] md:h-[650px] w-full animate-fade-up animation-delay-300 pointer-events-none scale-105 md:scale-110 origin-center pl-8 md:pl-0">
                            {/* Central Large Bubble */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full border-4 border-white shadow-2xl overflow-hidden z-20">
                                <img src={heroImg1} alt="Зуслангийн хүүхдүүд" className="w-full h-full object-cover" />
                            </div>
                            
                            {/* Top right medium bubble */}
                            <div className="absolute top-[5%] right-[0%] md:top-[8%] md:right-[5%] w-36 h-36 md:w-52 md:h-52 rounded-full border-4 border-white shadow-xl overflow-hidden z-10 animate-float animation-delay-1000">
                                <img src={heroImg2} alt="Адал явдал" className="w-full h-full object-cover" />
                            </div>

                            {/* Top left small bubble */}
                            <div className="absolute top-[15%] left-[10%] w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden z-10 animate-float animation-delay-3000">
                                <img src={heroImg3} alt="Сургалт" className="w-full h-full object-cover" />
                            </div>

                            {/* Bottom left medium bubble */}
                            <div className="absolute bottom-[10%] left-[5%] md:bottom-[15%] md:left-[5%] w-36 h-36 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden z-30 animate-float animation-delay-2000">
                                <img src={heroImg4} alt="Найзууд" className="w-full h-full object-cover" />
                            </div>

                            {/* Bottom right small bubble */}
                            <div className="absolute bottom-[15%] right-[5%] md:bottom-[20%] md:right-[10%] w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden z-10 animate-float animation-delay-4000">
                                <img src={heroImg5} alt="Хамт олон" className="w-full h-full object-cover" />
                            </div>

                            {/* Decorative gold dots */}
                            <div className="absolute top-[40%] right-[5%] w-4 h-4 bg-[#D4A843] rounded-full blur-[1px] shadow-[0_0_15px_#D4A843]" />
                            <div className="absolute bottom-[10%] left-[40%] w-6 h-6 bg-white/20 rounded-full backdrop-blur opacity-50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== INTERACTIVE STATS ===== */}
            <section className="relative z-20 -mt-16 mb-20">
                <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { value: stat1Title, label: stat1Sub },
                            { value: stat2Title, label: stat2Sub },
                            { value: stat3Title, label: stat3Sub },
                            { value: stat4Title, label: stat4Sub },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col items-center justify-center min-h-[140px] hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.2)] transition-all duration-500">
                                <AnimatedCounter value={stat.value} className="text-3xl lg:text-4xl font-black text-[#0F1B3D] mb-2 drop-shadow-sm" />
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center leading-tight">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ГИШҮҮН ЗУСЛАНГУУД (FEATURED CAMPS) ===== */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F5C542]/5" />
                <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black mb-3">Гишүүн Зуслангууд</h2>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Монголын үндэсний, салбарын гишүүн зуслангууд</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {(featuredCamps.length > 0 ? featuredCamps : [
                            { id: '1', name: 'Эрдэнэс Хүүхдийн Зуслан', badge: 'Онцлох', location: 'Төв аймаг, Зуслан', imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80', description: 'Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан...' },
                            { id: '2', name: 'Шонхор Зуслан', badge: 'Олон улсын', location: 'Сэлэнгэ аймаг', imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&q=80', description: 'Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан...' },
                            { id: '3', name: 'Хандгай Зуслан', badge: 'Топ зуслан', location: 'Төв аймаг', imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80', description: 'Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан...' },
                            { id: '4', name: 'Найрамдал Зуслан', badge: 'Орчин үеийн', location: 'Улаанбаатар', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80', description: 'Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан...' },
                        ]).map((camp: any, i: number) => (
                            <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <div className="relative aspect-square overflow-hidden">
                                    <img src={camp.imageUrl || 'https://placehold.co/400x400/eeeeee/aaaaaa?text=Image'} alt={camp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    {camp.badge && (
                                        <div className="absolute top-4 left-4 bg-[#F5C542] text-[#0F1B3D] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                                            {camp.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-black leading-tight mb-2 line-clamp-2">{camp.name}</h3>
                                    <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-3 leading-relaxed flex-1">
                                        {camp.description || 'Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан зуслангийн хөгжлийн үйл явц.'}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span className="truncate">{camp.location || 'Байршил тодорхойгүй'}</span>
                                    </div>
                                    <Link
                                        href={`/camps/${camp.id}`}
                                        className="w-full text-center py-3 bg-[#0F1B3D] text-white text-xs font-bold rounded-full hover:bg-blue-600 transition-colors"
                                    >
                                        Зуслан хайх
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PARTNERS ===== */}
            <PartnerCarousel />
            
        </div>
    );
}
