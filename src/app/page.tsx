import Link from "next/link";
import PartnerCarousel from "@/components/PartnerCarousel";
import { prisma } from "@/lib/prisma";

// Removed static latestNews array

export default async function Home() {
    // Fetch dynamic site settings
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
    }, {} as Record<string, string>);

    // Default values if settings not found
    const heroTitle = settingsMap.heroTitle || "Монголын Зуслангийн Салбарын";
    const heroSubtitle = settingsMap.heroSubtitle || "Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан зуслангийн хөгжлийн үндэсний тогтолцоо.";
    const stat1Year = settingsMap.stat1Year || "2006";
    const stat1Label = settingsMap.stat1Label || "Байгуулагдсан он";
    const stat2Number = settingsMap.stat2Number || "100+";
    const stat2Label = settingsMap.stat2Label || "Бүртгэлтэй Зуслан";
    const stat3Year = settingsMap.stat3Year || "2012";
    const stat3Label = settingsMap.stat3Label || "ОУЗХ-ны гишүүн";
    const stat4Number = settingsMap.stat4Number || "15+";
    const stat4Label = settingsMap.stat4Label || "ОУ-ын түншлэл";

    // Anniversary section defaults
    const anniversaryHeroBadge = settingsMap.anniversary_hero_badge || "1925 - 2025";
    const anniversaryTitle = settingsMap.anniversary_hero_title || "100 Жилийн Ой";
    const anniversaryText = settingsMap.anniversary_hero_text || "Монголын Үндэсний Зуслангуудын Холбооны түүхт 100 жилийн ойд зориулагдсан онцгой үйл ажиллагаа, хөтөлбөрүүдтэй танилцана уу.";
    
    // About Us section defaults
    const aboutTitle = settingsMap.about_hero_title || "БИДНИЙ ТУХАЙ";
    const aboutMission = settingsMap.about_mission_text || "Монголын Үндэсний Зуслангуудын Холбоо (МҮЗХ) нь үүсгэн байгуулагч гишүүдийн санаачилгаар 2006 онд байгуулагдсан үндэсний хэмжээний гишүүддээ үйлчилдэг төрийн бус байгууллага юм.";
    const aboutImage = settingsMap.about_hero_image || "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop";

    // Fetch dynamic content
    const latestPosts = await prisma.post.findMany({
        where: { type: 'NEWS', published: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
    });

    const featuredCamps = await prisma.camp.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 4,
    });

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 selection:bg-yellow-300">
            {/* Hero Section (Split Screen, Playful) */}
            <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-white">
                {/* Wavy Background Decoration */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <svg className="absolute left-0 top-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 250C150 250 300 150 450 150C600 150 750 250 900 350C1050 450 1200 450 1350 350C1400 316.667 1440 250 1440 250V800H0V250Z" fill="#3B82F6"/>
                    </svg>
                </div>

                <div className="container relative z-10 px-4 md:px-6 mx-auto py-12 lg:py-0">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="flex flex-col space-y-8 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div className="inline-flex w-max items-center rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-bold text-yellow-800">
                                🌟 Зуны амралт эхэллээ!
                            </div>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                                {heroTitle.split("100").length > 1 ? (
                                    <>
                                        {heroTitle.split("100")[0]} <br/>
                                        <span className="text-blue-600 relative inline-block">
                                            100 Жилийн Ой
                                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                                            </svg>
                                        </span>
                                        {heroTitle.split("100")[1]}
                                    </>
                                ) : (
                                    <>{heroTitle}</>
                                )}
                            </h1>
                            <p className="text-slate-600 text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
                                {heroSubtitle}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 pt-2 pb-8">
                                <Link
                                    href="/camps"
                                    className="inline-flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-8 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
                                >
                                    Зуслан хайх
                                    <svg className="w-6 h-6 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                                <Link
                                    href="/about"
                                    className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300"
                                >
                                    Бидний тухай
                                </Link>
                            </div>
                        </div>

                        {/* Playful Image Area */}
                        <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-in fade-in slide-in-from-right-8 duration-1000 delay-150">
                            {/* Colorful Blob Backgrounds */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[100%] aspect-square bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                            {/* Masked Image inside a rounded shape */}
                            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden" 
                                 style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1500&auto=format&fit=crop" 
                                    alt="Kids jumping at camp" 
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-3xl shadow-xl flex items-center space-x-4 border border-slate-100 transform -rotate-6">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <span className="text-2xl">🌲</span>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Байгаль орчин</div>
                                    <div className="font-bold text-slate-800">100% Эрүүл агаар</div>
                                </div>
                            </div>

                            <div className="absolute top-12 -right-8 bg-white p-4 rounded-3xl shadow-xl flex items-center space-x-4 border border-slate-100 transform rotate-3 hidden md:flex">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Хөтөлбөр</div>
                                    <div className="font-bold text-slate-800">Хөгжилтэй түүдэг гал</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Playful Statistics */}
            <section className="w-full py-16 bg-blue-600 relative z-20 overflow-hidden transform skew-y-1 origin-top-left -mt-4">
                <div className="container px-4 mx-auto transform -skew-y-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-6 rounded-3xl bg-blue-500/30 hover:bg-blue-500/50 transition-colors">
                            <div className="text-5xl font-black text-white">{stat1Year}</div>
                            <div className="text-sm font-bold text-blue-200 uppercase tracking-wider">{stat1Label}</div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-6 rounded-3xl bg-blue-500/30 hover:bg-blue-500/50 transition-colors">
                            <div className="text-5xl font-black text-yellow-300">{stat2Number}</div>
                            <div className="text-sm font-bold text-blue-200 uppercase tracking-wider">{stat2Label}</div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-6 rounded-3xl bg-blue-500/30 hover:bg-blue-500/50 transition-colors">
                            <div className="text-5xl font-black text-white">{stat3Year}</div>
                            <div className="text-sm font-bold text-blue-200 uppercase tracking-wider">{stat3Label}</div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-6 rounded-3xl bg-blue-500/30 hover:bg-blue-500/50 transition-colors">
                            <div className="text-5xl font-black text-yellow-300">{stat4Number}</div>
                            <div className="text-sm font-bold text-blue-200 uppercase tracking-wider">{stat4Label}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Anniversary Banner Teaser - Bright & Bold */}
            <section className="w-full py-24 bg-yellow-400 text-slate-900 relative">
                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_0_0_rgba(0,0,0,0.1)]">
                        <div className="space-y-6 flex-1">
                            <div className="inline-flex items-center rounded-2xl bg-yellow-100 px-4 py-2 text-sm font-black text-yellow-800 uppercase tracking-widest border-2 border-yellow-300">
                                🎊 {anniversaryHeroBadge}
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-blue-600">
                                {anniversaryTitle}
                            </h2>
                            <p className="text-xl text-slate-600 font-medium max-w-xl">
                                {anniversaryText}
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href="/anniversary" className="group relative inline-block text-lg font-black text-white">
                                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-slate-900 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span className="relative flex h-16 items-center justify-center rounded-2xl border-2 border-slate-900 bg-blue-600 px-8 transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
                                    Дэлгэрэнгүй үзэх
                                    <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Teaser Section - Chunky UI */}
            <section className="w-full py-24 bg-slate-50">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid gap-16 lg:grid-cols-2 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Decorative background shape */}
                            <div className="absolute inset-0 bg-blue-100 translate-x-6 translate-y-6 rounded-[3rem]"></div>
                            <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden border-4 border-white shadow-xl">
                                <img 
                                    src={aboutImage} 
                                    alt="About MCAA" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-900/80 to-transparent p-6 text-white text-center font-bold text-xl">
                                    Хүүхдийн төлөө хамтдаа
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-600 mb-2">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                {aboutTitle}
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative">
                                {/* Quote mark decoration */}
                                <span className="absolute -top-4 -left-2 text-5xl text-blue-200 font-serif">"</span>
                                {aboutMission.length > 300 ? aboutMission.substring(0, 300) + '...' : aboutMission}
                            </p>
                            <Link href="/about" className="inline-flex items-center text-blue-600 font-bold text-xl hover:text-blue-800 transition-colors group">
                                Дэлгэрэнгүй унших 
                                <span className="ml-3 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Camps Section - Hover Cards */}
            <section className="w-full py-24 bg-white overflow-hidden">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col text-center items-center mb-16 space-y-4">
                        <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-700 uppercase tracking-widest">
                            Амрах орчин
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Гишүүн Зуслангууд</h2>
                        <p className="text-slate-500 text-xl font-medium max-w-2xl">
                            Инээд хөөр, дурсамж дүүрэн зуны амралтыг бүтээх шилдэг зуслангуудтай танилцана уу.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredCamps.length > 0 ? (
                            featuredCamps.map((camp, i) => (
                                <Link href={`/camps/${camp.id}`} key={camp.id} className="group flex flex-col items-center">
                                    {/* Playful staggered rotation based on index */}
                                    <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] p-3 bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border-2 border-slate-100 transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)] group-hover:border-blue-300 ${i % 2 === 0 ? 'rotate-1 group-hover:rotate-0' : '-rotate-1 group-hover:rotate-0'}`}>
                                        <div className="w-full h-1/2 rounded-t-[2rem] overflow-hidden mb-4 relative">
                                            <img
                                                src={camp.imageUrl || "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80"}
                                                alt={camp.name}
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Badge */}
                                            <div className="absolute top-3 left-3 bg-yellow-400 text-slate-900 text-xs font-black uppercase px-3 py-1.5 rounded-full">
                                                ★ Топ
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4 flex flex-col flex-1 text-center">
                                            <h3 className="font-black text-xl text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                                                {camp.name}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-500 line-clamp-2 bg-slate-50 p-2 rounded-xl mt-auto">
                                                📍 {camp.location || 'Байршил алга'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-slate-500 col-span-full text-center font-bold text-xl bg-slate-50 py-12 rounded-3xl">Одоогоор бүртгэлтэй зуслан алга байна.</p>
                        )}
                    </div>
                    
                    <div className="mt-16 flex justify-center">
                        <Link href="/camps" className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-100 px-8 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 border-2 border-slate-200 hover:border-slate-300">
                            Бүх зусланг харах
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest News / Announcements - Colorful Blocks */}
            <section className="w-full py-24 bg-slate-900 text-white rounded-t-[4rem] relative z-30">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                        <div className="w-20 h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full mb-4"></div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Мэдээ, Мэдээлэл</h2>
                        <p className="max-w-2xl text-slate-400 text-xl font-medium">
                            МҮЗХ-ны цаг үеийн үйл ажиллагаа, чухал мэдэгдлүүд.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {latestPosts.length > 0 ? (
                            latestPosts.map((news, i) => {
                                // Rotate background colors for news cards
                                const bgColors = ['bg-blue-600', 'bg-yellow-400', 'bg-white'];
                                const textColors = ['text-white', 'text-slate-900', 'text-slate-900'];
                                const timeColors = ['text-blue-200', 'text-yellow-800', 'text-slate-500'];
                                const excerptColors = ['text-blue-100', 'text-yellow-900/80', 'text-slate-600'];
                                
                                const colorIndex = i % 3;
                                
                                return (
                                <Link href={`/news/${news.slug || news.id}`} key={news.id} className={`group flex flex-col overflow-hidden rounded-[2rem] p-6 transition-transform duration-300 hover:scale-[1.03] ${bgColors[colorIndex]} ${textColors[colorIndex]}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="uppercase tracking-widest font-black text-xs px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm shadow-sm ring-1 ring-black/5">
                                            Мэдээлэл
                                        </div>
                                        <div className={`text-sm font-bold ${timeColors[colorIndex]}`}>
                                            {new Date(news.createdAt).toLocaleDateString('mn-MN', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    
                                    <h3 className="font-black text-2xl line-clamp-3 mb-4 leading-snug">
                                        {news.title}
                                    </h3>
                                    
                                    <p className={`line-clamp-3 font-medium text-sm leading-relaxed ${excerptColors[colorIndex]}`}>
                                        {news.excerpt || news.content?.substring(0, 100).replace(/<[^>]+>/g, '') + '...'}
                                    </p>
                                    
                                    <div className="mt-8 flex justify-end">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm group-hover:bg-black/20 transition-colors`}>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform rotate-45 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </Link>
                                )
                            })
                        ) : (
                            <p className="text-slate-500 col-span-full text-center">Шинэ мэдээлэл олдсонгүй.</p>
                        )}
                    </div>
                </div>
            </section>

            <PartnerCarousel />
        </div>
    )
}
