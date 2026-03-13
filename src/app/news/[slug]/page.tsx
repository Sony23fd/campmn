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
    return { title: `${post.title} | МҮЗХ` };
}

export const dynamic = "force-dynamic";

export default async function NewsDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug);

    // Attempt to match by slug first, otherwise by id to support both
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
        <div className="bg-white min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
                <Link href="/news" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Мэдээний жагсаалт руу буцах
                </Link>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                        <span className="text-primary">{post.type === "NEWS" ? "Мэдээ Мэдээлэл" : "Холбооны Мэдээ"}</span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                       <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                           {post.excerpt}
                       </p> 
                    )}

                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                            {(post.author?.name || "А").charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{post.author?.name || "Админ"}</p>
                            <p className="text-xs text-slate-500">Нийтлэгч</p>
                        </div>
                    </div>
                </div>

                {post.imageUrl && (
                    <div className="rounded-2xl overflow-hidden bg-slate-100 mb-12 aspect-video w-full shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Article Content */}
                <article className="prose prose-slate md:prose-lg lg:prose-xl max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </div>
        </div>
    );
}
