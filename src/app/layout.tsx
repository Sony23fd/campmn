import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
    title: 'Монголын Үндэсний Зуслангуудын Холбоо',
    description: 'МҮЗХ-ны албан ёсны вэбсайт, 100 жилийн ойн мэдээлэл болон зуслангийн нэгдсэн каталог.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="mn">
            <body className={inter.className}>
                <div className="flex min-h-screen flex-col">
                    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                        <div className="container mx-auto flex h-16 items-center justify-between px-4">
                            <div className="flex items-center gap-4">
                                <Link href="/" className="font-bold text-xl text-primary transition-transform hover:scale-105 active:scale-95">
                                    МҮЗХ
                                </Link>
                                <div className="h-6 border-l border-slate-300 hidden sm:block"></div>
                                <Link href="/100-years" className="hidden sm:inline-block relative group">
                                    <span className="text-sm font-semibold text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 inline-block">
                                        100 Жилийн Ой
                                    </span>
                                    <div className="confetti"></div>
                                </Link>
                            </div>
                            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                                <Link href="/" className="hover:text-primary transition-colors">Нүүр</Link>
                                <Link href="/about" className="hover:text-primary transition-colors">Бидний тухай</Link>
                                <Link href="/camps" className="hover:text-primary transition-colors">Зуслангууд</Link>
                                <Link href="/events" className="hover:text-primary transition-colors">Арга хэмжээ</Link>
                                <Link href="/news" className="hover:text-primary transition-colors">Мэдээлэл</Link>
                            </nav>
                            <div className="flex items-center gap-4">
                                <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4">
                                    Нэвтрэх
                                </Link>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1">
                        {children}
                    </main>
                    <footer className="border-t py-6 md:py-0">
                        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
                            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                                © 2006-{new Date().getFullYear()} Монголын Үндэсний Зуслангуудын Холбоо. Бүх эрх хуулиар хамгаалагдсан.
                            </p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}
