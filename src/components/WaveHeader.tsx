const WaveHeader = ({ 
    title, 
    subtitle,
    badge
}: { 
    title: string; 
    subtitle?: string;
    badge?: string;
}) => {
    return (
        <div className="bg-[#0F1B3D] pt-24 pb-32 px-4 mb-16 relative overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A2B5C] rounded-full opacity-60 blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A843] rounded-full opacity-20 blur-[100px] -ml-24 -mb-24 pointer-events-none"></div>

            <div className="container mx-auto max-w-5xl text-center relative z-10 space-y-6">
                {badge && (
                    <div className="inline-flex items-center rounded-full bg-[#F5C542]/20 border border-[#F5C542]/30 px-5 py-2 text-sm font-bold text-[#F5C542] uppercase tracking-widest">
                        {badge}
                    </div>
                )}
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                    {title}
                </h1>
                
                {subtitle && (
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
            
            {/* Optional wave pattern if requested in future, otherwise using the blobs matches MYC 100 style */}
        </div>
    );
};

export default WaveHeader;
