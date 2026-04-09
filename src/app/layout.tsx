import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { prisma } from '@/lib/prisma'
import ActivitiesDropdown from '@/components/ActivitiesDropdown'
import MobileMenu from '@/components/MobileMenu'

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400','500','600','700','800','900'] })

export const metadata: Metadata = {
    title: 'МҮЗХ — 100 Жилийн Ой | Монголын Үндэсний Зуслангуудын Холбоо',
    description: 'Монголын Үндэсний Зуслангуудын Холбооны 100 жилийн ойн албан ёсны вэбсайт. Уламжлал ба дижитал шинэчлэлийг хослуулсан зуслангийн нэгдсэн каталог.',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    let activityCategories: any[] = [];
    try {
        activityCategories = await prisma.activityCategory.findMany({
            orderBy: { order: "asc" },
            include: { items: { orderBy: { order: "asc" } } },
        });
    } catch (e) {}

    const navLinks = [
        { href: '/', label: 'Нүүр' },
        { href: '/about', label: 'Бидний тухай' },
        { href: '/activities', label: 'Үйл ажиллагаа' },
        { href: '/camps', label: 'Зуслангууд' },
        { href: '/events', label: 'Арга хэмжээ' },
        { href: '/news', label: 'Мэдээлэл' },
        { href: '/legislation', label: 'Хууль тогтоомж' },
        { href: '/recommendations', label: 'Зөвлөмж' },
    ];

    return (
        <html lang="mn">
            <body className={inter.className}>
                <div className="flex min-h-screen flex-col">
                    {/* ===== HEADER ===== */}
                    <header className="sticky top-0 z-50 w-full bg-[#0F1B3D]/95 backdrop-blur-xl border-b border-white/10">
                        <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4 md:px-6">
                            {/* Logo */}
                            <Link href="/" className="flex items-center group">
                                <div className="bg-white rounded-full p-1 shadow-md shadow-[#F5C542]/10 transition-transform group-hover:scale-105 border border-white/20 overflow-hidden">
                                    <img src="/logo.jpg" alt="МҮЗХ 100" className="h-10 md:h-12 w-auto object-contain rounded-full" />
                                </div>
                            </Link>

                            {/* Desktop Nav */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Right side */}
                            <div className="flex items-center gap-3">
                                {/* Mobile menu button */}
                                <MobileMenu links={navLinks} categories={activityCategories} />
                            </div>
                        </div>
                    </header>

                    {/* ===== MAIN ===== */}
                    <main className="flex-1">
                        {children}
                    </main>

                    {/* ===== FOOTER ===== */}
                    <footer className="bg-[#0F1B3D] text-white border-t border-white/10">
                        <div className="container mx-auto px-4 md:px-6">
                            {/* Main footer */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
                                {/* Brand */}
                                <div className="lg:col-span-1">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-2xl font-black text-white">МҮЗХ</span>
                                        <span className="text-2xl font-black text-[#F5C542]">100</span>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        Монголын Үндэсний Зуслангуудын Холбоо нь 100 жилийн түүхтэй, залуу хойч үеийнхээ хөгжлийг дэмжигч байгууллага.
                                    </p>
                                    {/* Social Icons */}
                                    <div className="flex items-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F5C542] hover:text-[#0F1B3D] flex items-center justify-center text-white/60 transition-all duration-300" aria-label="Facebook">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F5C542] hover:text-[#0F1B3D] flex items-center justify-center text-white/60 transition-all duration-300" aria-label="Instagram">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F5C542] hover:text-[#0F1B3D] flex items-center justify-center text-white/60 transition-all duration-300" aria-label="Telegram">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Холбоосууд</h4>
                                    <ul className="space-y-3">
                                        <li><Link href="/about" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Бидний тухай</Link></li>
                                        <li><Link href="/100-years" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">100 Жилийн Ой</Link></li>
                                        <li><Link href="/camps" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Зуслангууд</Link></li>
                                        <li><Link href="/events" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Арга хэмжээ</Link></li>
                                    </ul>
                                </div>

                                {/* Events */}
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Мэдээлэл</h4>
                                    <ul className="space-y-3">
                                        <li><Link href="/news" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Мэдээ мэдээлэл</Link></li>
                                        <li><Link href="/activities" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Үйл ажиллагаа</Link></li>
                                        <li><Link href="/legislation" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Хууль тогтоомж</Link></li>
                                        <li><Link href="/recommendations" className="text-sm text-white/50 hover:text-[#F5C542] transition-colors">Зөвлөмж</Link></li>
                                    </ul>
                                </div>

                                {/* Contact */}
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Холбоо барих</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-sm text-white/50">
                                            <span className="mt-0.5">📍</span>
                                            <span>Улаанбаатар хот, СБД, Их сургуулийн гудамж</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-white/50">
                                            <span>📞</span>
                                            <span>+976 7011-1234</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-white/50">
                                            <span>✉️</span>
                                            <span>info@myc.mn</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom bar */}
                            <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs text-white/40">
                                    © 1926-{new Date().getFullYear()} Монголын Үндэсний Зуслангуудын Холбоо. Бүх эрх хуулиар хамгаалагдсан.
                                </p>
                                <div className="flex items-center gap-6">
                                    <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Нууцлалын бодлого</Link>
                                    <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Үйлчилгээний нөхцөл</Link>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}
