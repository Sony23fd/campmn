"use client";

import { useEffect, useState } from "react";

interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl?: string;
    createdAt: string;
    type: string;
    author: {
        name: string;
    }
}
const demoPosts: Post[] = [
    { id: "1", slug: "demo-1", title: "Олон улсын зуслангийн эрдэмтэн судлаачдын хурал болно", excerpt: "Ази номхон далайн орнуудын болон бусад олон улсын судлаачид оролцох уг хурлын бүртгэл эхэллээ.", createdAt: "2024-03-01T00:00:00Z", type: "NEWS", author: { name: "Админ" } },
    { id: "2", slug: "demo-2", title: "Артектай хамтран ажиллах санамж бичиг зурлаа", excerpt: "Монголын хүүхэд багачуудыг ОХУ-ын Хар тэнгисийн эрэгт байрлах дэлхийд танигдсан Артек зусланд амраах хөтөлбөрийг албан ёсоор эхлүүллээ.", createdAt: "2024-03-05T00:00:00Z", type: "NEWS", author: { name: "Админ" } },
    { id: "3", slug: "demo-3", title: "Зуслангийн удирдлага, багш нарын сургалт", excerpt: "Зуны амралт эхлэхээс өмнө зуслангийн багш, ажилчдад зориулсан 3 өдрийн сургалтыг зохион байгууллаа.", createdAt: "2024-03-10T00:00:00Z", type: "NEWS", author: { name: "С.Батбилэг" } },
];

import Link from "next/link";

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
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('mn-MN');
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-yellow-300 pb-24 font-sans">
            {/* Playful Header Section */}
            <div className="bg-yellow-400 pt-24 pb-32 px-4 mb-20 relative overflow-hidden rounded-b-[3rem] shadow-2xl">
                {/* Decorative floating shapes */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[60px] opacity-40 translate-x-1/2 -translate-y-1/2 animate-blob"></div>
                <div className="absolute bottom-0 left-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-[60px] opacity-60 animate-blob animation-delay-2000"></div>
                
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="inline-block py-1.5 px-5 rounded-full bg-white text-blue-600 font-black mb-6 border-2 border-blue-100 shadow-md transform rotate-2">
                        📰 Шинэ сонин
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6 drop-shadow-sm">
                        Мэдээ, <span className="text-blue-600 relative inline-block">Мэдээлэл
                            <svg className="absolute -bottom-2 left-0 w-full h-4 text-blue-400 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="6" fill="transparent"/>
                            </svg>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-800 max-w-2xl mx-auto font-medium">
                        Цаг үеийн болон байгууллагын онцлох мэдээ, үйл явдлуудтай танилцаарай.
                    </p>
                </div>

                {/* Wavy bottom divider (optional, but adds to the theme) */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)'}}></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-20 -mt-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-8 border-slate-200 border-b-yellow-400 border-r-blue-500"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, i) => (
                            <Link href={`/news/${post.slug || post.id}`} key={post.id} className="block group">
                                <article className={`bg-white rounded-[2rem] border-4 border-slate-100 p-3 shadow-lg flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-300 ${i % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'}`}>
                                    {/* Image Container */}
                                    <div className="aspect-[4/3] w-full rounded-[1.5rem] bg-slate-100 relative overflow-hidden flex items-center justify-center shrink-0 border-2 border-slate-50">
                                        {post.imageUrl ? (
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                        ) : (
                                            <div className="text-6xl group-hover:animate-bounce">📰</div>
                                        )}
                                        
                                        {/* Floating Date Badge */}
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur font-black text-slate-800 rounded-xl px-3 py-2 shadow-md border-2 border-slate-100 flex flex-col items-center justify-center leading-none text-center transform -rotate-3 group-hover:rotate-0 transition-transform">
                                            <span className="text-blue-600 text-xl block mb-0.5">{new Date(post.createdAt).getDate()}</span>
                                            <span className="text-[10px] uppercase tracking-wider">{new Date(post.createdAt).toLocaleString('mn-MN', { month: 'short' })}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col pt-6">
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">Мэдээ</span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black leading-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-3 mb-3">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 font-medium line-clamp-3 text-base flex-grow">
                                            {post.excerpt || "Дэлгэрэнгүйг энд дарж орж үзнэ үү."}
                                        </p>

                                        {/* Author Footer */}
                                        <div className="flex items-center space-x-3 text-sm text-slate-500 mt-6 pt-4 border-t-2 border-dashed border-slate-100 shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-black border-2 border-yellow-200">
                                                {(post.author?.name || "А")[0]}
                                            </div>
                                            <div className="font-bold text-slate-700">{post.author?.name || "Админ"}</div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-200 shadow-sm max-w-2xl mx-auto mt-12">
                        <div className="text-7xl mb-6">📭</div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Одоогоор мэдээ алга байна</h3>
                        <p className="text-slate-500 font-medium">Тун удахгүй шинэ мэдээллүүд нэмэгдэх болно.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
