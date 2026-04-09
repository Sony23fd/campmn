import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { categorySlug: string; itemSlug: string } }) {
    const p = await params;
    const item = await prisma.activityItem.findUnique({
        where: { slug: p.itemSlug },
        include: { category: true },
    });
    if (!item) return { title: "Олдсонгүй" };
    return {
        title: `${item.title} | ${item.category.name} | МҮЗХ — 100 Жил`,
        description: item.content.substring(0, 160).replace(/<[^>]+>/g, ''),
    };
}

export default async function ActivityItemPage({ params }: { params: { categorySlug: string; itemSlug: string } }) {
    const p = await params;

    const item = await prisma.activityItem.findUnique({
        where: { slug: p.itemSlug },
        include: { category: { include: { items: { orderBy: { order: "asc" } } } } },
    });

    if (!item || item.category.slug !== p.categorySlug) {
        notFound();
    }

    const siblingItems = item.category.items.filter(i => i.id !== item.id);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Navy Header Banner */}
            <div className="bg-[#0F1B3D] pt-16 pb-24 px-4 relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A2B5C] rounded-full opacity-50 blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843] rounded-full opacity-10 blur-[80px] -ml-20 -mb-20"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <Link href="/activities" className="hover:text-[#F5C542] transition-colors">Үйл ажиллагаа</Link>
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                        <Link href="/activities" className="hover:text-[#F5C542] transition-colors">{item.category.name}</Link>
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                        <span className="text-[#F5C542] truncate max-w-[200px]">{item.title}</span>
                    </div>

                    <div className="inline-flex items-center rounded-full bg-[#F5C542]/20 border border-[#F5C542]/30 px-4 py-1.5 text-[10px] font-bold text-[#F5C542] mb-4 uppercase tracking-[0.2em]">
                        {item.category.name}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        {item.title}
                    </h1>
                </div>
            </div>

            {/* Content Body */}
            <section className="container mx-auto px-4 max-w-4xl relative z-20 -mt-12">
                <article className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-12">
                    {item.imageUrl && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-10 bg-slate-100 shadow-lg border border-slate-100">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    
                    {/* Content styling via Tailwind Pros */}
                    <div 
                        className="prose prose-slate max-w-none 
                        prose-headings:text-[#0F1B3D] prose-headings:font-black
                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-[#0F1B3D]
                        prose-a:text-blue-600 prose-a:font-bold hover:prose-a:underline
                        prose-img:rounded-2xl prose-img:shadow-md
                        prose-ul:list-disc prose-ol:list-decimal"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    />

                    {/* Meta info bottom */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Чиглэл:</span>
                            <span className="text-xs font-bold text-[#D4A843] bg-amber-50 px-3 py-1 rounded-full">{item.category.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            Холбоо барих: info@myc.mn
                        </div>
                    </div>
                </article>

                {/* Sibling Items Suggestions */}
                {siblingItems.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8 border-b-2 border-slate-200 pb-4">
                            <h3 className="text-xl font-black text-[#0F1B3D] uppercase tracking-tight flex items-center gap-2">
                                <span className="w-6 h-6 bg-[#0F1B3D] text-[#F5C542] rounded-lg flex items-center justify-center text-xs">🔗</span>
                                Бусад нийтлэлүүд
                            </h3>
                            <Link href="/activities" className="text-xs font-black text-[#D4A843] hover:underline uppercase tracking-widest">Бүх үйл ажиллагаа</Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {siblingItems.slice(0, 3).map(si => (
                                <Link 
                                    key={si.id}
                                    href={`/activities/${item.category.slug}/${si.slug}`}
                                    className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-[#D4A843]/30 transition-all duration-300 flex flex-col h-full"
                                >
                                    <h4 className="font-bold text-[#0F1B3D] group-hover:text-blue-600 transition-colors mb-4 line-clamp-2 leading-tight flex-grow">{si.title}</h4>
                                    <div className="flex items-center gap-1 text-[10px] font-black text-[#D4A843] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                        Унших <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Return button */}
                <div className="mt-16 text-center">
                    <Link href="/activities" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0F1B3D] text-white font-bold hover:bg-[#1A2B5C] transition-all shadow-lg hover:shadow-[#0F1B3D]/25">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                        Бүх үйл ажиллагаа руу буцах
                    </Link>
                </div>
            </section>
        </div>
    );
}
