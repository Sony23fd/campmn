import React from "react";
import { prisma } from "@/lib/prisma";

const demoPartners = [
    { name: "ОУЗХ", type: "Олон Улсын Байгууллага", logo: "https://placehold.co/400x160/2563eb/ffffff?text=ОУЗХ&font=montserrat" },
    { name: "АНДОЗХ", type: "Бүс Нутгийн Холбоо", logo: "https://placehold.co/400x160/16a34a/ffffff?text=АНДОЗХ&font=montserrat" },
    { name: "АРТЕК", type: "ОУ-ын Хүүхдийн Төв", logo: "https://placehold.co/400x160/db2777/ffffff?text=АРТЕК&font=montserrat" },
    { name: "ОРЛЕНОК", type: "ОУ-ын Хүүхдийн Төв", logo: "https://placehold.co/400x160/06b6d4/ffffff?text=ОРЛЕНОК&font=montserrat" },
    { name: "ОКЕАН", type: "Бүх Оросын Хүүхдийн Төв", logo: "https://placehold.co/400x160/eab308/000000?text=ОКЕАН&font=montserrat" },
    { name: "СМЕНА", type: "Хүүхдийн Төв", logo: "https://placehold.co/400x160/f97316/ffffff?text=СМЕНА&font=montserrat" },
    { name: "БНХАУ", type: "Түншлэл", logo: "https://placehold.co/400x160/dc2626/ffffff?text=БНХАУ&font=montserrat" },
    { name: "НАЙРАМДАЛ", type: "ОУХНЦ", logo: "https://placehold.co/400x160/9333ea/ffffff?text=НАЙРАМДАЛ&font=montserrat" },
    { name: "БСШУЯ", type: "Төрийн Байгууллага", logo: "https://placehold.co/400x160/0d9488/ffffff?text=БСШУЯ&font=montserrat" },
];

export default async function PartnerCarousel() {
    let dbPartners = await prisma.partner.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
    });

    const activePartners = dbPartners.length > 0 ? dbPartners : demoPartners;
    
    // Дубликат хийж scroll-г тасралтгүй харагдуулах
    const duplicatedPartners = [...activePartners, ...activePartners, ...activePartners];

    return (
        <section className="w-full py-12 md:py-20 bg-slate-50 overflow-hidden border-t">
            <div className="container px-4 md:px-6 mx-auto mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
                    Хамтран Ажиллагч Байгууллагууд
                </h2>
                <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                    Олон улсын болон үндэсний түвшний байгууллагуудтай нягт хамтран ажилладаг.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-image-gradient">
                <div className="flex w-max animate-marquee hover:pause-animation items-center gap-8 px-4">
                    {duplicatedPartners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center w-[200px] sm:w-[240px] bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <div className="w-full aspect-[2.5/1] relative bg-white flex items-center justify-center overflow-hidden">
                                {partner.logo ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl font-bold text-slate-400">{partner.name}</span>
                                )}
                            </div>
                            <div className="w-full py-3 px-4 bg-white border-t border-slate-50 text-center">
                                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide truncate">{partner.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
