"use client";

interface GroupItem {
    title: string;
    description: string;
    imageUrl?: string;
}

export default function GroupsAccordion({ groups }: { groups: GroupItem[] }) {
    if (!groups || groups.length === 0) return null;

    return (
        <div className="mt-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-slate-200 text-slate-900">Бүлгүүд</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {groups.map((group, idx) => (
                    <div key={idx} className="flex flex-col bg-[#274BB7] border border-[#3E5CB4] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {/* Image Header wrapper - fixing aspect ratio to roughly match the card */}
                        <div className="h-[180px] w-full relative bg-[#1E3A8A] overflow-hidden shrink-0">
                            {group.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={group.imageUrl} alt={group.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center opacity-30">
                                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L28 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            
                            {/* Black gradient from bottom of image to highlight white text */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                            
                            {/* Title text overlaid */}
                            <h3 className="absolute bottom-3 left-4 right-4 font-bold text-white text-lg leading-tight z-10">
                                {group.title}
                            </h3>
                        </div>
                        
                        {/* Body text area */}
                        <div className="p-5 flex-1 bg-[#274BB7]">
                            <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-wrap">
                                {group.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
