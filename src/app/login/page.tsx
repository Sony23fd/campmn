"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError(res.error);
                setLoading(false);
            } else {
                router.push("/admin");
                router.refresh(); // Refresh layout to check session
            }
        } catch (err) {
            setError("Алдаа гарлаа. Дахин оролдоно уу.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
            <div className="mx-auto w-full max-w-md space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <h1 className="text-3xl font-bold">МҮЗХ Админ</h1>
                    <p className="text-sm text-slate-500">Системд нэвтрэх хэсэг</p>
                </div>

                <div className="rounded-lg border bg-white shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
                                Имэйл хаяг
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="admin@zus.mn"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">
                                Нууц үг
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {error && (
                            <div className="text-sm font-medium text-red-500 text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-xs text-slate-500">
                        (Тестэр: admin@zus.mn / admin123)
                    </div>
                </div>

                <div className="text-center text-sm">
                    <a href="/" className="text-blue-600 hover:underline">
                        ← Вэбсайт руу буцах
                    </a>
                </div>
            </div>
        </div>
    );
}
