"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface Camp {
    id: string;
    name: string;
    description: string;
    location: string;
    imageUrl?: string;
    ageCategories?: string;
    capacity: number;
    campDirection?: string;
    badge?: string;
}

import WaveHeader from "@/components/WaveHeader";

const getAllLocations = (camps: Camp[]) => {
    const locs = camps.map(c => c.location).filter(Boolean);
    return ["Бүгд", ...Array.from(new Set(locs))];
};

const getAllAgeCategories = (camps: Camp[]) => {
    const ages = camps.map(c => c.ageCategories).filter(Boolean) as string[];
    const allAges = new Set<string>();
    ages.forEach(a => {
        a.split(',').map(s => s.trim()).filter(Boolean).forEach(s => allAges.add(s));
    });
    return ["Бүгд", ...Array.from(allAges)];
};

const getAllDirections = (camps: Camp[]) => {
    const dirs = camps.map(c => c.campDirection).filter(Boolean) as string[];
    const allDirs = new Set<string>();
    dirs.forEach(d => {
        d.split(',').map(s => s.trim()).filter(Boolean).forEach(s => allDirs.add(s));
    });
    return ["Бүгд", ...Array.from(allDirs)];
};

const ITEMS_PER_PAGE = 8;

export default function CampsPage() {
    const [camps, setCamps] = useState<Camp[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("Бүгд");
    const [selectedAge, setSelectedAge] = useState("Бүгд");
    const [selectedDirection, setSelectedDirection] = useState("Бүгд");
    const [currentPage, setCurrentPage] = useState(1);

    const [locations, setLocations] = useState<string[]>(["Бүгд"]);
    const [ageCategories, setAgeCategories] = useState<string[]>(["Бүгд"]);
    const [directions, setDirections] = useState<string[]>(["Бүгд"]);

    useEffect(() => {
        async function fetchCamps() {
            try {
                const response = await fetch("/api/camps");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCamps(data);
                    setLocations(getAllLocations(data));
                    setAgeCategories(getAllAgeCategories(data));
                    setDirections(getAllDirections(data));
                }
            } catch (error) {
                console.error("Failed to load camps", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCamps();
    }, []);

    const filteredCamps = useMemo(() => {
        return camps.filter(camp => {
            const matchesSearch = camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (camp.description && camp.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesLocation = selectedLocation === "Бүгд" || camp.location === selectedLocation;
            const matchesAge = selectedAge === "Бүгд" || (camp.ageCategories && camp.ageCategories.includes(selectedAge));
            const matchesDirection = selectedDirection === "Бүгд" || (camp.campDirection && camp.campDirection.includes(selectedDirection));
            return matchesSearch && matchesLocation && matchesAge && matchesDirection;
        });
    }, [camps, searchQuery, selectedLocation, selectedAge, selectedDirection]);

    const totalPages = Math.ceil(filteredCamps.length / ITEMS_PER_PAGE);
    const paginatedCamps = filteredCamps.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedLocation, selectedAge, selectedDirection]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedLocation("Бүгд");
        setSelectedAge("Бүгд");
        setSelectedDirection("Бүгд");
    };

    const hasActiveFilters = searchQuery || selectedLocation !== "Бүгд" || selectedAge !== "Бүгд" || selectedDirection !== "Бүгд";

    return (
        <div className="min-h-screen bg-white font-sans text-[#0F1B3D]">
            {/* ===== HERO BANNER ===== */}
            <WaveHeader title="ЗУСЛАНГИЙН КАТАЛОГ" subtitle="100 Жилийн Аялал: Уламжлал ба Ирээдүй" />

            {/* ===== MAIN CONTENT ===== */}
            <div className="container mx-auto px-4 md:px-6 max-w-7xl pt-16 relative z-20 pb-24">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ===== SIDEBAR FILTERS ===== */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-6 sticky top-24 space-y-6">
                            {/* Search */}
                            <div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Зуслан хайх..."
                                        className="block w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F1B3D]/20 focus:border-[#0F1B3D] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h3 className="text-sm font-bold text-[#0F1B3D] uppercase tracking-widest mb-3 flex items-center justify-between">
                                    Байршил
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map(loc => (
                                        <button
                                            key={loc}
                                            onClick={() => setSelectedLocation(loc)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${selectedLocation === loc ? 'bg-[#0F1B3D] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Age */}
                            <div>
                                <h3 className="text-sm font-bold text-[#0F1B3D] uppercase tracking-widest mb-3">Насны ангилал</h3>
                                <div className="flex flex-wrap gap-2">
                                    {ageCategories.map(age => (
                                        <button
                                            key={age}
                                            onClick={() => setSelectedAge(age)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${selectedAge === age ? 'bg-[#0F1B3D] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Direction */}
                            {directions.length > 1 && (
                                <div>
                                    <h3 className="text-sm font-bold text-[#0F1B3D] uppercase tracking-widest mb-3">Чиглэл</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {directions.map(dir => (
                                            <button
                                                key={dir}
                                                onClick={() => setSelectedDirection(dir)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${selectedDirection === dir ? 'bg-[#0F1B3D] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                            >
                                                {dir}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Clear */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full text-center text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl transition-colors"
                                >
                                    ✕ Шүүлтүүр арилгах
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* ===== CAMP GRID ===== */}
                    <div className="flex-1 min-w-0">
                        {/* Results count */}
                        {!loading && (
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-sm font-bold text-slate-500">
                                    Нийт <span className="text-[#0F1B3D]">{filteredCamps.length}</span> зуслан
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center py-32">
                                <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#0F1B3D] animate-spin" />
                            </div>
                        ) : paginatedCamps.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paginatedCamps.map((camp, i) => (
                                        <div key={camp.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                            {/* Image */}
                                            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                                                {camp.imageUrl ? (
                                                    <img
                                                        src={camp.imageUrl}
                                                        alt={camp.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-4xl bg-slate-100">⛺</div>
                                                )}
                                                {/* Featured badge */}
                                                {camp.badge && (
                                                    <div className="absolute top-4 left-4 bg-[#F5C542] text-[#0F1B3D] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                                                        {camp.badge}
                                                    </div>
                                                )}
                                                {/* Location badge */}
                                                {camp.location && (
                                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                        📍 {camp.location}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-lg font-black text-[#0F1B3D] group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{camp.name}</h3>
                                                <p className="text-xs text-slate-500 font-medium mb-4 flex-grow line-clamp-3 leading-relaxed">
                                                    {camp.description || "Дэлгэрэнгүй мэдээлэл байхгүй."}
                                                </p>

                                                {/* Meta */}
                                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-4">
                                                    {camp.ageCategories && (
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                                            Нас: {camp.ageCategories}
                                                        </span>
                                                    )}
                                                    {camp.capacity > 0 && (
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                            {camp.capacity}
                                                        </span>
                                                    )}
                                                </div>

                                                <Link
                                                    href={`/camps/${camp.id}`}
                                                    className="w-full text-center py-3 bg-[#0F1B3D] text-white text-xs font-bold rounded-full hover:bg-blue-600 transition-colors"
                                                >
                                                    Зуслан хайх
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                                    currentPage === page
                                                        ? 'bg-[#0F1B3D] text-white shadow-lg shadow-slate-300'
                                                        : 'border border-slate-200 text-slate-500 hover:bg-slate-100'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                                <div className="text-6xl mb-6">🔍</div>
                                <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">Илэрц олдсонгүй</h3>
                                <p className="text-slate-500 max-w-md mx-auto mb-6">Таны хайлтад тохирох зуслан одоогоор алга байна.</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-[#F5C542] text-[#0F1B3D] font-bold rounded-full hover:bg-[#FFD700] transition-colors"
                                >
                                    Шүүлтүүр арилгах
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
