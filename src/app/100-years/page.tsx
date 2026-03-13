import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PartnerCarousel from "@/components/PartnerCarousel";

export const metadata: Metadata = {
    title: "100 Жилийн Ой | МҮЗХ",
    description: "Монголын Үндэсний Зуслангуудын Холбооны 100 жилийн ойн арга хэмжээ, хөтөлбөрүүд",
};

export default async function AnniversaryPage() {
    // Татаж авах хэрэгтэй бүх тохиргоог нэгтгэнэ
    const dbSettings = await prisma.siteSetting.findMany({
        where: {
            key: {
                in: [
                    'anniversary_video_url', 
                    'anniversary_hero_badge',
                    'anniversary_hero_title',
                    'anniversary_hero_text',
                    'anniversary_logo_url',
                    'anniversary_intro_title', 
                    'anniversary_intro_text', 
                    'anniversary_accordions'
                ]
            }
        }
    });

    const settingsMap = dbSettings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);
    
    // Хэрвээ админаас өгөгдөл оруулаагүй бол default placeholder харуулна
    const videoUrl = settingsMap['anniversary_video_url'] || "https://www.youtube.com/embed/A6XUVjK9W4o"; 
    const heroBadge = settingsMap['anniversary_hero_badge'] || "1925 - 2025";
    const heroTitle = settingsMap['anniversary_hero_title'] || "100 Жилийн Ой";
    const heroText = settingsMap['anniversary_hero_text'] || "Монголын Үндэсний Зуслангуудын Холбооны түүхт 100 жилийн ойд зориулагдсан онцгой үйл ажиллагаа, хөтөлбөрүүдтэй танилцана уу.";
    const logoUrl = settingsMap['anniversary_logo_url'] || "/100-logo.jpg";

    const introTitle = settingsMap['anniversary_intro_title'] || "Үйл ажиллагаа ба Хөтөлбөрүүд";
    const introText = settingsMap['anniversary_intro_text'] || "Ойн баярын хүрээнд зохион байгуулагдах албан ёсны хөтөлбөрүүд болон уулзалтууд.";

    let accordions = [];
    try {
        accordions = JSON.parse(settingsMap['anniversary_accordions'] || "[]");
    } catch (e) {}

    return (
        <div className="w-full flex flex-col min-h-screen">
            {/* Нүүр хэсэг */}
            <section className="container py-12 lg:py-24 mx-auto px-4 relative">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    {/* 100 Years Logo */}
                    {logoUrl && (
                        <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={logoUrl} 
                                alt="100 Жилийн Ой Лого" 
                                className="w-full h-full object-contain drop-shadow-xl"
                            />
                        </div>
                    )}

                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4 font-semibold tracking-wider">
                        {heroBadge}
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary drop-shadow-sm">
                        {heroTitle}
                    </h1>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed whitespace-pre-wrap">
                        {heroText}
                    </p>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl rounded-full"></div>
                </div>

                {/* Видео Танилцуулга */}
                <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black aspect-video relative group">
                    <iframe 
                        className="w-full h-full"
                        src={videoUrl} 
                        title="100 Жилийн Ойн Танилцуулга" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen>
                    </iframe>
                </div>
            </section>

            {/* Хөтөлбөрүүдийн Аккордион (Дээр нь гарч ирнэ) */}
            <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{introTitle}</h2>
                    <p className="mt-4 text-lg text-slate-600 whitespace-pre-wrap">{introText}</p>
                </div>

                <div className="space-y-4">
                    {accordions.length > 0 ? (
                        accordions.map((acc: any, index: number) => (
                            <details key={index} className="group border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-slate-900">{acc.title || "Гарчиггүй"}</span>
                                        </div>
                                    </div>
                                    <span className="transition duration-300 group-open:-rotate-180 bg-slate-100 p-2 rounded-full text-slate-500 group-hover:bg-primary/10 group-hover:text-primary">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-2 text-slate-600 border-t border-slate-100 bg-slate-50/50">
                                    <p className="whitespace-pre-wrap leading-relaxed">{acc.content || "Дэлгэрэнгүй мэдээлэл оруулаагүй байна."}</p>
                                </div>
                            </details>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500">Одоогоор арга хэмжээ, хөтөлбөрүүд нэмэгдээгүй байна.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Хамтрагч байгууллагууд (Лого Караусель нь доошоо орно) */}
            <PartnerCarousel />
        </div>
    );
}
