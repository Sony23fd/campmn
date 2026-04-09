"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WaveHeader from "@/components/WaveHeader";

interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl?: string;
    createdAt: string;
    type: string;
    author?: {
        name: string;
    }
}

const demoPosts: Post[] = [
    { id: "1", slug: "demo-1", title: "Олон улсын зуслангийн эрдэмтэн судлаачдын хурал болно", excerpt: "Ази номхон далайн орнуудын болон бусад олон улсын судлаачид оролцох уг хурлын бүртгэл эхэллээ.", createdAt: "2024-03-01T00:00:00Z", type: "NEWS", author: { name: "Админ" } },
    { id: "2", slug: "demo-2", title: "Артектай хамтран ажиллах санамж бичиг зурлаа", excerpt: "Монголын хүүхэд багачуудыг ОХУ-ын Хар тэнгисийн эрэгт байрлах дэлхийд танигдсан Артек зусланд амраах хөтөлбөрийг албан ёсоор эхлүүллээ.", createdAt: "2024-03-05T00:00:00Z", type: "NEWS", author: { name: "Админ" } },
    { id: "3", slug: "demo-3", title: "Зуслангийн удирдлага, багш нарын сургалт", excerpt: "Зуны амралт эхлэхээс өмнө зуслангийн багш, ажилчдад зориулсан 3 өдрийн сургалтыг зохион байгууллаа.", createdAt: "2024-03-10T00:00:00Z", type: "NEWS", author: { name: "С.Батбилэг" } },
];

export default function NewsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("/api/posts?type=NEWS");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPosts(data.length > 0 ? data : demoPosts);
                }
            } catch (error) {
                console.error("Failed to load news", error);
                setPosts(demoPosts);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans pb-24 text-[#0F1B3D]">
            {/* Navy Header Banner */}
            <WaveHeader title="СҮҮЛИЙН ҮЕИЙН ШИНЭ СОНИН" subtitle="МҮЗХ-ны цаг үеийн үйл ажиллагаа болон зуслангийн салбарын онцлох мэдээллүүд." />

            <div className="container mx-auto px-4 max-w-7xl relative z-20 pt-16">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0F1B3D]"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, i) => (
                            <Link href={`/news/${post.slug || post.id}`} key={post.id} className="block group">
                                <article className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                                    {/* Image */}
                                    <div className="aspect-video w-full bg-slate-100 relative overflow-hidden shrink-0">
                                        {post.imageUrl ? (
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl bg-slate-100 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">📰</div>
                                        )}
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#0F1B3D] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">Мэдээ</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-[#D4A843] uppercase tracking-widest mb-3">
                                            {new Date(post.createdAt).toLocaleDateString('mn-MN', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-[#0F1B3D] group-hover:text-blue-600 transition-colors line-clamp-2 mb-3 leading-tight">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt || (post as any).content?.substring(0, 100).replace(/<[^>]+>/g, '') + '...'}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-[#0F1B3D]/5 text-[#0F1B3D] flex items-center justify-center text-[10px] font-bold border border-[#0F1B3D]/10">
                                                    {(post.author?.name || "А")[0]}
                                                </div>
                                                <span className="text-xs font-bold text-slate-600">{post.author?.name || "Админ"}</span>
                                            </div>
                                            <div className="text-[#0F1B3D] font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Унших <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm max-w-2xl mx-auto mt-12">
                        <div className="text-6xl mb-6">📭</div>
                        <h3 className="text-2xl font-black text-[#0F1B3D] mb-2">Одоогоор мэдээ алга байна</h3>
                        <p className="text-slate-500 font-medium">Тун удахгүй шинэ мэдээллүүд нэмэгдэх болно.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
