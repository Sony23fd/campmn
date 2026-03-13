"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface Camp {
    id: string;
    name: string;
    description: string;
    location: string;
    capacity: number;
    imageUrl?: string;
    ageCategories?: string;
    campDirection?: string;
}

// Extract unique locations from camps, plus an "All" option
const getAllLocations = (camps: Camp[]) => {
    const locs = camps.map(c => c.location).filter(Boolean);
    return ["Бүх байршил", ...Array.from(new Set(locs))];
};

const getAllAgeCategories = (camps: Camp[]) => {
    const ages = camps.map(c => c.ageCategories).filter(Boolean) as string[];
    // Simplistic split logic since it's just strings currently
    const allAges = new Set<string>();
    ages.forEach(a => {
        a.split(',').map(s => s.trim()).filter(Boolean).forEach(s => allAges.add(s));
    });
    return ["Бүх нас", ...Array.from(allAges)];
};

const getAllDirections = (camps: Camp[]) => {
    const dirs = camps.map(c => c.campDirection).filter(Boolean) as string[];
    const allDirs = new Set<string>();
    dirs.forEach(d => {
        d.split(',').map(s => s.trim()).filter(Boolean).forEach(s => allDirs.add(s));
    });
    return ["Бүх чиглэл", ...Array.from(allDirs)];
}

export default function CampsPage() {
    const [camps, setCamps] = useState<Camp[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("Бүх байршил");
    const [selectedAge, setSelectedAge] = useState("Бүх нас");
    const [selectedDirection, setSelectedDirection] = useState("Бүх чиглэл");

    const [locations, setLocations] = useState<string[]>(["Бүх байршил"]);
    const [ageCategories, setAgeCategories] = useState<string[]>(["Бүх нас"]);
    const [directions, setDirections] = useState<string[]>(["Бүх чиглэл"]);

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

    // Derived state for filtered camps
    const filteredCamps = useMemo(() => {
        return camps.filter(camp => {
            const matchesSearch = camp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  (camp.description && camp.description.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesLocation = selectedLocation === "Бүх байршил" || camp.location === selectedLocation;
            
            const matchesAge = selectedAge === "Бүх нас" || (camp.ageCategories && camp.ageCategories.includes(selectedAge));
            
            const matchesDirection = selectedDirection === "Бүх чиглэл" || (camp.campDirection && camp.campDirection.includes(selectedDirection));

            return matchesSearch && matchesLocation && matchesAge && matchesDirection;
        });
    }, [camps, searchQuery, selectedLocation, selectedAge, selectedDirection]);

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-yellow-300 pb-24 font-sans">
            {/* Header Hero - Playful & Vibrant */}
            <div className="bg-blue-600 pt-24 pb-32 px-4 mb-20 relative overflow-hidden rounded-b-[3rem] shadow-2xl">
                {/* Decorative floating shapes */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-yellow-400 text-slate-900 font-black mb-6 border-2 border-yellow-300 shadow-md transform -rotate-2">
                        ⛺ Зуслангийн Каталог
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-md">
                        Монголын Үндэсний <span className="text-yellow-300 relative inline-block">Зуслангууд
                            <svg className="absolute -bottom-2 left-0 w-full h-4 text-yellow-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="6" fill="transparent"/>
                            </svg>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-medium">
                        Хүүхэд залуучуудын чөлөөт цагаа зөв боловсон өнгөрүүлэх, хөгжих таатай орчинг бүрдүүлсэн шилдэг зуслангуудын мэдээллийн нэгдсэн сан.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Modern Filters Section - Chunky floating block */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-slate-100 p-6 md:p-8 mb-16 relative z-20 -mt-36">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        
                        {/* Search Bar */}
                        <div className="w-full">
                            <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest">Хайлт</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-xl">🔍</span>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Нэр, түлхүүр үг..."
                                    className="block w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl bg-slate-50 font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                                />
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="w-full">
                            <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest">Байршил</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-xl">📍</span>
                                </div>
                                <select 
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="block w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233b82f6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
                                >
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Age Category Filter */}
                        <div className="w-full">
                            <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest">Нас</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-xl">🧒</span>
                                </div>
                                <select 
                                    value={selectedAge}
                                    onChange={(e) => setSelectedAge(e.target.value)}
                                    className="block w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233b82f6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
                                >
                                    {ageCategories.map(age => (
                                        <option key={age} value={age}>{age}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Camp Direction Filter */}
                        <div className="w-full">
                            <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest">Чиглэл</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-xl">🎯</span>
                                </div>
                                <select 
                                    value={selectedDirection}
                                    onChange={(e) => setSelectedDirection(e.target.value)}
                                    className="block w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl bg-slate-50 font-bold text-slate-700 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233b82f6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
                                >
                                    {directions.map(dir => (
                                        <option key={dir} value={dir}>{dir}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                    
                    {/* Active Filters Clear Button */}
                    {(searchQuery || selectedLocation !== "Бүх байршил" || selectedAge !== "Бүх нас" || selectedDirection !== "Бүх чиглэл") && (
                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedLocation("Бүх байршил");
                                    setSelectedAge("Бүх нас");
                                    setSelectedDirection("Бүх чиглэл");
                                }}
                                className="inline-flex items-center text-sm bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl hover:bg-red-200 transition-colors"
                            >
                                ✖ Шүүлтүүрүүдийг арилгах
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                {!loading && (
                    <div className="mb-8 flex items-center justify-center md:justify-start">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-xl text-blue-800 font-bold border-2 border-blue-200">
                            <span>Илэрц:</span>
                            <span className="bg-white px-2 py-0.5 rounded-md text-blue-600 shadow-sm">{filteredCamps.length}</span>
                        </div>
                    </div>
                )}

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="w-16 h-16 rounded-full border-8 border-slate-200 border-t-blue-600 animate-spin"></div>
                    </div>
                ) : filteredCamps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCamps.map((camp, i) => (
                            <div key={camp.id} className={`group bg-white rounded-[2rem] border-2 border-slate-100 shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 flex-grow h-full ${i % 3 === 0 ? 'hover:rotate-1' : i % 3 === 1 ? 'hover:-rotate-1' : ''}`}>
                                {/* Image frame */}
                                <div className="aspect-[4/3] w-full relative bg-slate-200 overflow-hidden shrink-0 m-2 rounded-[1.5rem]" style={{ width: 'calc(100% - 16px)' }}>
                                    {camp.imageUrl ? (
                                        <img 
                                            src={camp.imageUrl} 
                                            alt={camp.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-5xl bg-slate-100">⛺</div>
                                    )}
                                    
                                    {/* Location Badge */}
                                    {camp.location && (
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-white text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-md border-2 border-slate-100 flex items-center">
                                                📍 {camp.location}
                                            </span>
                                        </div>
                                    )}

                                    {/* Direction Pill on hover (bottom left) */}
                                    {camp.campDirection && (
                                        <div className="absolute bottom-3 left-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <span className="bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-md border-2 border-yellow-300">
                                                ★ {camp.campDirection.split(',')[0]}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col pt-4">
                                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">{camp.name}</h3>
                                    <p className="text-sm text-slate-500 mb-6 line-clamp-3 font-medium flex-grow">
                                        {camp.description || "Танилцуулга ороогүй байна."}
                                    </p>
                                    
                                    {/* Meta info */}
                                    <div className="mt-auto pt-4 border-t-2 border-slate-100 border-dashed grid grid-cols-2 gap-4 mb-6 shrink-0">
                                        <div className="flex flex-col bg-slate-50 p-2 rounded-xl text-center">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Нас</span>
                                            <span className="text-sm font-bold text-slate-800">{camp.ageCategories || "-"}</span>
                                        </div>
                                        <div className="flex flex-col bg-slate-50 p-2 rounded-xl text-center">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Багтаамж</span>
                                            <span className="text-sm font-bold text-slate-800">{camp.capacity ? `${camp.capacity}` : "-"}</span>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link 
                                        href={`/camps/${camp.id}`} 
                                        className="shrink-0 inline-flex items-center justify-center w-full bg-blue-600 text-white rounded-2xl py-3.5 text-base font-bold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 group-hover:rotate-1"
                                    >
                                        Дэлгэрэнгүй
                                        <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-slate-100 border-dashed shadow-sm">
                        <div className="text-7xl mb-6 animate-bounce">🙈</div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">Өө, илэрц олдсонгүй!</h3>
                        <p className="text-slate-500 max-w-md mx-auto font-medium text-lg">Таны хайлт болон шүүлтүүрт тохирох зуслан одоогоор алга байна.</p>
                        <button 
                            onClick={() => { 
                                setSearchQuery(""); 
                                setSelectedLocation("Бүх байршил"); 
                                setSelectedAge("Бүх нас");
                                setSelectedDirection("Бүх чиглэл");
                            }}
                            className="mt-8 px-8 py-3 bg-yellow-400 text-slate-900 font-black rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg"
                        >
                            Шүүлтүүрийг арилгах
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
