"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-xs font-semibold bg-slate-200 hover:bg-slate-300 transition px-3 py-1.5 rounded-md text-slate-700"
        >
            Гарах
        </button>
    );
}
