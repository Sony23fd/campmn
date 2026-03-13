// src/app/admin/layout.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 hidden md:block">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <span className="text-white font-bold text-lg">МҮЗХ Админ</span>
                </div>
                <nav className="p-4 space-y-1">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Үндсэн</p>
                    <a href="/admin" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        📊 Дашбоард
                    </a>
                    
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Хуудсууд (Pages)</p>
                    <a href="/admin/home" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        🏠 Нүүр Хуудас
                    </a>
                    <a href="/admin/about" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        🏢 Бидний Тухай
                    </a>
                    <a href="/admin/anniversary" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        🎉 100 Жилийн Ой
                    </a>

                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Бичлэг ба Контент</p>
                    <a href="/admin/news" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        📰 Мэдээлэл
                    </a>
                    <a href="/admin/events" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        📅 Арга хэмжээ, Бүртгэл
                    </a>

                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Мэдээллийн Сан</p>
                    <a href="/admin/camps" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        🏕️ Зуслангууд
                    </a>
                    <a href="/admin/partners" className="block px-4 py-2 text-sm rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        🤝 Түншүүд
                    </a>

                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Тохиргоо</p>
                    <a href="/admin/settings" className="block px-4 py-2 text-sm text-slate-400 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                        ⚙️ Ерөнхий тохиргоо
                    </a>
                    
                    <a href="/" className="block px-4 py-2 mt-8 text-sm text-slate-600 hover:text-white transition-colors border-t border-slate-800 pt-4">
                        ← Вэбсайт руу буцах
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white dark:bg-zinc-900 border-b flex items-center justify-between px-6">
                    <h2 className="text-lg font-medium">Удирдлагын хэсэг</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{session.user?.name || "Админ"}</span>
                        <LogoutButton />
                    </div>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
