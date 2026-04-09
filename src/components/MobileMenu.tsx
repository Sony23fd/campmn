"use client";
import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
    links: { href: string; label: string }[];
    categories: any[];
}

export default function MobileMenu({ links, categories }: MobileMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Hamburger button */}
            <button
                onClick={() => setOpen(!open)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle menu"
            >
                {open ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Overlay */}
            {open && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
                    <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-[#0F1B3D] shadow-2xl overflow-y-auto animate-slide-right">
                        {/* Close */}
                        <div className="flex items-center justify-between p-5 border-b border-white/10">
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-black text-white">МҮЗХ</span>
                                <span className="text-lg font-black text-[#F5C542]">100</span>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="p-5 space-y-1">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-semibold transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}


                        </nav>

                    </div>
                </div>
            )}
        </>
    );
}
