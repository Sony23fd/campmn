import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import WaveHeader from "../../components/WaveHeader";

export const metadata: Metadata = {
    title: "Хууль тогтоомж | МҮЗХ — 100 Жил",
    description: "Монголын Үндэсний Зуслангуудын Холбоотой холбоотой хууль тогтоомж, дүрэм журам",
};

export const dynamic = "force-dynamic";

export default async function LegislationPage() {
    const documents = await prisma.document.findMany({
        orderBy: [{ order: "asc" } as any, { createdAt: "desc" }],
    });

    // Grouping logic
    const categories = ["Хууль", "Журам", "Стандарт", "Бусад"];
    const groupedDocs = documents.reduce((acc, doc) => {
        // Map old types or unknown types to categories or "Бусад"
        let type = doc.documentType || "Бусад";
        if (type === "LEGISLATION") type = "Хууль";
        if (!categories.includes(type)) type = "Бусад";
        
        if (!acc[type]) acc[type] = [];
        acc[type].push(doc);
        return acc;
    }, {} as Record<string, typeof documents>);

    return (
        <div className="min-h-screen bg-white font-sans text-[#0F1B3D] pb-32">
            {/* Navy Header Banner */}
            <WaveHeader title="ЭРХ ЗҮЙН БАРИМТ БИЧИГ" subtitle="МҮЗХ-ны үйл ажиллагаанд мөрдөгдөж буй хууль тогтоомж, дүрэм журам болон стандартууд." />

            {/* Documents List */}
            <section className="container mx-auto px-4 max-w-4xl relative z-20 pt-8">
                {documents.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                        <div className="text-5xl mb-6">📄</div>
                        <p className="text-slate-500 text-lg font-medium">Одоогоор баримт бичиг нэмэгдээгүй байна.</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {categories.map((catName) => {
                            const docs = groupedDocs[catName] || [];
                            if (docs.length === 0) return null;

                            return (
                                <div key={catName} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-xl font-black text-[#0F1B3D] uppercase tracking-tight flex items-center gap-3">
                                            <span className="w-2 h-8 bg-[#D4A843] rounded-full"></span>
                                            {catName === "Хууль" ? "📜 " : catName === "Журам" ? "⚖️ " : catName === "Стандарт" ? "✅ " : "📂 "}
                                            {catName === "Хууль" ? "Хууль тогтоомж" : catName === "Журам" ? "Дүрэм журам" : catName === "Стандарт" ? "Стандартууд" : "Бусад баримт бичиг"}
                                        </h2>
                                        <div className="flex-1 h-px bg-slate-100"></div>
                                    </div>
                                    <div className="grid gap-4">
                                        {docs.map((doc) => (
                                            <a
                                                key={doc.id}
                                                href={doc.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#D4A843]/30 transition-all duration-300 group"
                                            >
                                                <div className="flex-shrink-0 w-14 h-14 bg-red-50 text-red-500 rounded-xl flex flex-col items-center justify-center font-black text-[10px] group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                                    <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    PDF
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-[#0F1B3D] group-hover:text-blue-600 transition-colors text-base mb-1">{doc.title}</h3>
                                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                        <span className="text-[#D4A843]">МҮЗХ баримт</span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#D4A843] group-hover:border-[#D4A843]/20 transition-all">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 5v14m0 0l-6-6m6 6l6-6" /></svg>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
