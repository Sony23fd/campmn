// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        camps: 0,
        events: 0,
        posts: 0
    });

    useEffect(() => {
        // Basic parallel data fetching for the dashboard
        async function loadStats() {
            try {
                const [campsRes, eventsRes, postsRes] = await Promise.all([
                    fetch("/api/camps"),
                    fetch("/api/events"),
                    fetch("/api/posts")
                ]);

                const camps = await campsRes.json();
                const events = await eventsRes.json();
                const posts = await postsRes.json();

                setStats({
                    camps: camps.length || 0,
                    events: events.length || 0,
                    posts: posts.length || 0
                });
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            }
        }

        loadStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Дашбоард</h1>
                <p className="text-muted-foreground">Системийн ерөнхий статистик мэдээлэл.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Нийт Зуслангууд</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.camps}</div>
                        <p className="text-xs text-muted-foreground">Идэвхтэй бүртгэлтэй байна</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Нийт Мэдээлэл</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.posts}</div>
                        <p className="text-xs text-muted-foreground">Вэбсайт дээр нийтлэгдсэн</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Арга хэмжээ, Хөтөлбөр</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.events}</div>
                        <p className="text-xs text-muted-foreground">Бүртгэл нээлттэй болон хаалттай</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow mt-8">
                <div className="p-6 flex flex-col space-y-1.5">
                    <h3 className="font-semibold leading-none tracking-tight">Шуурхай үйлдэл</h3>
                </div>
                <div className="p-6 pt-0 flex gap-4">
                    <a href="/admin/camps" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Шинэ зуслан нэмэх
                    </a>
                    <a href="/admin/posts" className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm">
                        Мэдээ оруулах
                    </a>
                </div>
            </div>
        </div>
    );
}
