import React from "react";
import { prisma } from "@/lib/prisma";

const demoPartners = [
    { name: "ОУЗХ", type: "Олон Улсын Байгууллага", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=ОУЗХ&font=montserrat" },
    { name: "АНДОЗХ", type: "Бүс Нутгийн Холбоо", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=АНДОЗХ&font=montserrat" },
    { name: "АРТЕК", type: "ОУ-ын Хүүхдийн Төв", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=АРТЕК&font=montserrat" },
    { name: "ОРЛЕНОК", type: "ОУ-ын Хүүхдийн Төв", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=ОРЛЕНОК&font=montserrat" },
    { name: "ОКЕАН", type: "Бүх Оросын Хүүхдийн Төв", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=ОКЕАН&font=montserrat" },
    { name: "СМЕНА", type: "Хүүхдийн Төв", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=СМЕНА&font=montserrat" },
    { name: "БНХАУ", type: "Түншлэл", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=БНХАУ&font=montserrat" },
    { name: "НАЙРАМДАЛ", type: "ОУХНЦ", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=НАЙРАМДАЛ&font=montserrat" },
    { name: "БСШУЯ", type: "Төрийн Байгууллага", logo: "https://placehold.co/400x160/0F1B3D/F5C542?text=БСШУЯ&font=montserrat" },
];

export default async function PartnerCarousel() {
    let dbPartners = [];
    try {
        dbPartners = await prisma.partner.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "asc" },
        });
    } catch (e) {
        console.error("Partner Carousel error:", e);
    }

    const activePartners = dbPartners.length > 0 ? dbPartners : demoPartners;
    
    // Duplicating for infinite marquee
    const duplicatedPartners = [...activePartners, ...activePartners, ...activePartners];

    return (
        <section className="w-full py-16 md:py-24 bg-white overflow-hidden relative">
            <div className="container px-4 md:px-6 mx-auto mb-16 text-center">
                <div className="inline-flex items-center rounded-full bg-[#0F1B3D]/5 px-4 py-1.5 text-xs font-black text-[#0F1B3D] mb-6 uppercase tracking-[0.2em]">
                    🤝 Хамтын ажиллагаа
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0F1B3D]">
                    Хамтран Ажиллагч Байгууллагууд
                </h2>
                <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
                    Олон улсын болон үндэсний түвшний байгууллагуудтай нягт хамтран ажиллаж, ирээдүйг хамтдаа бүтээж байна.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-image-gradient py-4">
                <div className="flex w-max animate-marquee hover:pause-animation items-center gap-6 md:gap-10 px-4">
                    {duplicatedPartners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#F5C542]/30 transition-all duration-500 cursor-pointer min-w-[200px] md:min-w-[260px] group"
                        >
                            <div className="h-12 md:h-16 relative bg-white flex items-center justify-center">
                                {partner.logo ? (
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-full w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                                    />
                                ) : (
                                    <span className="text-xl font-black text-slate-300 group-hover:text-[#0F1B3D] transition-colors uppercase tracking-widest">{partner.name}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#F5C542]/20 to-transparent"></div>
        </section>
    );
}
