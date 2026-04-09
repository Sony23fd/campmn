import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug);
    
    const post = await prisma.post.findFirst({
        where: isUuid 
            ? { OR: [{ slug: params.slug }, { id: params.slug }] }
            : { slug: params.slug }
    });
    if (!post) return { title: "Нийтлэл олдсонгүй" };
    return { title: `${post.title} | МҮЗХ — 100 Жил` };
}

export const dynamic = "force-dynamic";

export default async function NewsDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug);

    const post = await prisma.post.findFirst({
        where: isUuid ? {
            OR: [
                { slug: params.slug },
                { id: params.slug }
            ],
            published: true
        } : {
            slug: params.slug,
            published: true
        },
        include: {
            author: { select: { name: true } }
        }
    });

    if (!post) {
        notFound();
    }

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('mn-MN', options);
    };

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
                        <Link href="/news" className="hover:text-[#F5C542] transition-colors">Мэдээлэл</Link>
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                        <span className="text-[#F5C542] truncate max-w-[250px]">{post.title}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-[#F5C542]/20 border border-[#F5C542]/30 px-3 py-1 rounded-full text-[10px] font-bold text-[#F5C542] uppercase tracking-[0.2em]">
                            {post.type === "NEWS" ? "Мэдээ Мэдээлэл" : post.type === "RESEARCH" ? "Судалгаа" : "Зөвлөмж"}
                        </span>
                        <span className="text-white/40 text-xs font-bold whitespace-nowrap">{formatDate(post.createdAt)}</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Content Body */}
            <section className="container mx-auto px-4 max-w-4xl relative z-20 -mt-12">
                <article className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-12">
                    {post.imageUrl && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-10 bg-slate-100 shadow-lg border border-slate-100">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {post.excerpt && (
                        <div className="mb-10 text-xl md:text-2xl text-[#0F1B3D] font-bold leading-relaxed border-l-4 border-[#F5C542] pl-6 italic">
                            {post.excerpt}
                        </div>
                    )}
                    
                    {/* Content styling via Tailwind Prose */}
                    <div 
                        className="prose prose-slate max-w-none 
                        prose-headings:text-[#0F1B3D] prose-headings:font-black
                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-[#0F1B3D]
                        prose-a:text-blue-600 prose-a:font-bold hover:prose-a:underline
                        prose-img:rounded-2xl prose-img:shadow-md
                        prose-ul:list-disc prose-ol:list-decimal"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Author Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#0F1B3D]/5 flex items-center justify-center text-[#0F1B3D] font-black text-lg border border-[#0F1B3D]/10">
                            {(post.author?.name || "А").charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-black text-[#0F1B3D] leading-none mb-1">{post.author?.name || "МҮЗХ Админ"}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Нийтлэгч</p>
                        </div>
                    </div>
                </article>

                {/* Return button */}
                <div className="mt-16 text-center">
                    <Link href="/news" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0F1B3D] text-white font-bold hover:bg-[#1A2B5C] transition-all shadow-lg hover:shadow-[#0F1B3D]/25">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                        Мэдээний жагсаалт руу буцах
                    </Link>
                </div>
            </section>
        </div>
    );
}
