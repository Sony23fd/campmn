import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import WaveHeader from "@/components/WaveHeader";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
    title: "Зөвлөмж | МҮЗХ — 100 Жил",
    description: "Зуслангийн салбарын зөвлөмжүүд болон түгээмэл асуулт хариулт",
};

export const dynamic = "force-dynamic";

export default async function RecommendationsPage() {
    const recommendationPosts = await prisma.post.findMany({
        where: { type: "RECOMMENDATION", published: true },
        orderBy: { createdAt: "desc" },
    });

    const faqs = await prisma.faq.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    });

    return (
        <div className="min-h-screen bg-white font-sans text-[#0F1B3D]">
            {/* Navy Header Banner */}
            <WaveHeader title="ЗӨВЛӨМЖ & ТҮГЭЭМЭЛ АСУУЛТ" subtitle="Зуслангийн салбарын мэргэжилтнүүдийн зөвлөмж, удирдамж, түгээмэл тавигддаг асуултуудын хариулт." />

            {/* Recommendation Articles */}
            {recommendationPosts.length > 0 && (
                <section className="container mx-auto px-4 max-w-6xl relative z-20 -mt-16 mb-24">
                    <h2 className="text-2xl font-black text-[#0F1B3D] mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 bg-[#F5C542] rounded-lg flex items-center justify-center text-sm">✨</span>
                        Зөвлөмжийн нийтлэлүүд
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendationPosts.map(post => (
                            <a key={post.id} href={`/news/${post.slug}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                {post.imageUrl && (
                                    <div className="aspect-video bg-slate-100 overflow-hidden">
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#0F1B3D] group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{post.title}</h3>
                                    {post.excerpt && <p className="text-sm text-slate-500 line-clamp-3 font-medium">{post.excerpt}</p>}
                                    <div className="mt-4 text-xs font-bold text-[#D4A843] uppercase tracking-widest leading-none">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="container mx-auto px-4 max-w-5xl relative z-20 pb-24">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-slate-100/50 text-slate-500 border border-slate-200 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        FAQ
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0F1B3D]">Түгээмэл Асуулт & Хариулт</h2>
                    <p className="mt-3 text-slate-500 font-medium max-w-lg mx-auto">ТАХ болон зусланд бүртгүүлэхэд шаардагдах мэдээллүүдтэй танилцаарай.</p>
                </div>

                {faqs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                        <div className="text-5xl mb-6">❓</div>
                        <p className="text-slate-500 font-medium">Одоогоор FAQ нэмэгдээгүй байна.</p>
                    </div>
                ) : (
                    <FaqClient faqs={faqs.map(f => ({ ...f, category: f.category || "Ерөнхий" }))} />
                )}
            </section>
        </div>
    );
}
