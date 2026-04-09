import { Metadata } from "next";
import WaveHeader from "../../components/WaveHeader";

export const metadata: Metadata = {
    title: "Үйл ажиллагаа | МҮЗХ — 100 Жил",
    description: "Монголын Үндэсний Зуслангуудын Холбооны үйл ажиллагааны чиглэлүүд",
};

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {

    return (
        <div className="min-h-screen bg-white font-sans text-[#0F1B3D] pb-24">
            {/* Navy Header Banner */}
            <WaveHeader title="ЧИГЛЭЛ, СТРАТЕГИ БА ЗОРИЛТ" subtitle="МҮЗХ-ны хөгжлийн бодлого, хүүхэд хамгаалал болон чанарын удирдлагын цогц чиглэлүүд." />

            {/* ===== STRATEGY SECTION ===== */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-slate-50 rounded-full blur-[100px] -z-0 -mr-40 -mt-20 opacity-50" />
                <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                id: "01",
                                title: "Хүүхдийн хөгжил, хамгаалал, оролцоо",
                                items: [
                                    "Зуслангийн орчинд аюулгүй, хамгаалагдсан орчны стандартыг нэвтрүүлэх",
                                    "Бодлого, стандарт, эрх зүйн баримт бичиг, хөтөлбөр боловсруулахад оролцох",
                                    "Мэргэжлийн байгууллагуудтай хамтран судалгаа, мэдээллийн сан бүрдүүлэх",
                                    "Төрийн байгууллагуудтай хамтын ажиллагааг өргөжүүлэх, сурталчлах",
                                    "Магадлан итгэмжлэл, чанарын баталгаажуулалтын тогтолцоог хөгжүүлж ажиллах"
                                ],
                                icon: "🛡️"
                            },
                            {
                                id: "02",
                                title: "Хөтөлбөрийн чанар, үнэлгээ",
                                items: [
                                    "Хүүхдийн хөгжлийн хөтөлбөрийн хэрэгжилтэд үнэлгээ, дүгнэлт хийх",
                                    "Нас, хөгжлийн онцлогт тохирсон уян хатан хөтөлбөрийг шинэчлэх",
                                    "Хүүхдийн оролцоог дэмжсэн сайн туршлага, арга зүйг түгээх"
                                ],
                                icon: "⭐"
                            },
                            {
                                id: "03",
                                title: "Эрдэм шинжилгээ, инноваци",
                                items: [
                                    "Хөгжлийн хөтөлбөрийн арга зүйн нэгдсэн бодлогыг хэрэгжүүлэх",
                                    "Хүүхдийн хөгжлийг үнэлэх шинжлэх ухааны суурь судалгааг хийх",
                                    "Олон улсын хамтын ажиллагааг өргөжүүлж төсөл хөтөлбөр хэрэгжүүлэх",
                                    "Цахим платформыг хөгжүүлж, мэдээллийн хүртээмжийг хангах"
                                ],
                                icon: "🔬"
                            },
                            {
                                id: "04",
                                title: "Хүний нөөцийн тогтвортой хөгжил",
                                items: [
                                    "Салбарын хүний нөөцийн сургалт, мэргэжлийн хөгжлийг дэмжих",
                                    "Их дээд сургуулиудтай хамтран арга зүйч, багш нарыг бэлтгэх",
                                    "Мэргэшүүлэх сургалт, стандарт, чадамжийн хүрээ боловсруулах",
                                    "Ажилтнуудын нийгмийн баталгааг сайжруулахад нөлөөлөх",
                                    "Олон улсын сайн туршлагыг судалж нутагшуулах"
                                ],
                                icon: "👥"
                            }
                        ].map((strategy, i) => (
                            <div key={i} className="bg-slate-50/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-[#D4A843]/20 transition-all group duration-500 relative">
                                <div className="absolute top-8 right-10 text-6xl font-black text-[#0F1B3D]/5 select-none">{strategy.id}</div>
                                <div className="relative z-10 space-y-6">
                                    <div className="text-4xl">{strategy.icon}</div>
                                    <h3 className="text-2xl font-black text-[#0F1B3D] leading-tight">{strategy.title}</h3>
                                    <ul className="space-y-3">
                                        {strategy.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium text-sm leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] mt-2 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FUTURE MEASURES SECTION ===== */}
            <section className="py-24 bg-[#0F1B3D] text-white relative overflow-hidden">
                {/* Decorative gradients */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A843]/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                
                <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#F5C542] text-xs font-bold uppercase tracking-widest border border-white/5">Action Plan</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Цаашид авах арга хэмжээ</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* 1. Legal Environment */}
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                            <h4 className="text-xl font-bold text-[#F5C542] mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-[#F5C542]/20 flex items-center justify-center text-lg">⚖️</span>
                                Эрх зүйн орчинг дэмжих
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Хүүхдийн зусланд өмчийн хэлбэр харгалзахгүй хувьсах зардал олгох заалтын хэрэгжилтийг хангах",
                                    "Боловсролын хуулинд хүүхдийг анги хамт олноороо зуслангийн хөтөлбөрт хамрагдах заалт нэмэх",
                                    "Зуслангуудыг газрын төлбөрөөс чөлөөлөх, хөнгөлөлт үзүүлэх зохицуулалтыг Газрын тухай хуульд оруулах",
                                    "Тодорхой чиглэлийн хөтөлбөр (эх оронч, хөдөлмөрийн дадал) хэрэгжүүлж буй зусланд санхүүжилт олгох"
                                ].map((txt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed group">
                                        <svg className="w-5 h-5 text-[#F5C542] shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                        {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. Current Conditions */}
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                            <h4 className="text-xl font-bold text-[#F5C542] mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg">🏗️</span>
                                Хүүхдийн зуслангийн өнөөгийн нөхцөл
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "“Хүүхдийн зуслангийн үйл ажиллагааг зохицуулах Зөвлөл” байгуулах",
                                    "Зусланд эрх олгох, магадлан итгэмжлэх нийгмийн зохицуулалтыг бий болгох",
                                    "Авто замыг сайжруулах, хөрөнгө оруулалтын дэмжлэг үзүүлэх талаар гэрээнд заах",
                                    "Сургууль, дотуур байрны барилгыг зуны хугацаанд өдрийн зуслангийн зориулалтаар ашиглах",
                                    "Хүүхдийн зуслангийн нэгдсэн мэдээллийн санг баяжуулах, шинэчлэх"
                                ].map((txt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed group">
                                        <svg className="w-5 h-5 text-[#F5C542] shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                        {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 3. Investment */}
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                            <h4 className="text-xl font-bold text-[#F5C542] mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-lg">💰</span>
                                Хөрөнгө оруулалтыг дэмжих
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Хүүхдийн зуслангийн материаллаг баазыг шинэчлэх, хөрөнгө оруулалтыг нийгмийн хариуцлагын хүрээнд шийдэх",
                                    "2026 оныг 'Хүүхдийн зусланд хөрөнгө оруулалт хийх жил' болгон зарлах"
                                ].map((txt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed group">
                                        <svg className="w-5 h-5 text-[#F5C542] shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                        {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. Human Resources */}
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                            <h4 className="text-xl font-bold text-[#F5C542] mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-lg">👩‍🏫</span>
                                Хүний нөөц, ажилтны ур чадвар
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Оюутны зуны дадлагыг хүүхдийн зусланг түшиглэн зохион байгуулах хэлбэрт шилжүүлэх",
                                    "Зуслангийн хүний нөөцийг мэргэшсэн ажилтнаар бүрдүүлэх, тасралтгүй бэлтгэх",
                                    "Тогооч, эмч, багш нарыг зусланд богино болон урт хугацаагаар ажиллуулах боломжийг хэрэгжүүлэх"
                                ].map((txt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed group">
                                        <svg className="w-5 h-5 text-[#F5C542] shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                        {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
