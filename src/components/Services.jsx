import { useEffect, useRef } from 'react'

const SERVICES = [
  {
    id: '01',
    flag: '🇺🇸',
    tag: 'AQSH / BUYUK BRITANIYA / KANADA',
    title: "Murakkab vizalar",
    pain: "\"Pasportim bo'sh yoki daromadim kam, baribir rad javobi berishadi.\"",
    result: "Biz sizning ijtimoiy va iqtisodiy aloqalaringizni to'g'ri shakllantiramiz. Natijada konsul sizni ishonchli sayyoh sifatida ko'radi.",
    features: [
      "To'liq hujjat dosyesi tayyorlash",
      "Moliyaviy profil strategiyasi",
      "Ishonchli cover letter",
      "Konsul savollariga tayyorgarlik",
    ],
    badge: '98%',
    badgeLabel: 'Tasdiqlash',
  },
  {
    id: '02',
    flag: '🔄',
    tag: 'RAD JAVOBIDAN KEYIN',
    title: "Rad javobidan keyin viza olish",
    pain: "\"Bir marta 'otkaz' oldim, endi yo'lim yopiq.\"",
    result: "Rad javobi sabablarini 72 soat ichida huquqiy tahlil qilamiz va xatolarni tuzatib, qayta ishonchli ariza tayyorlaymiz.",
    features: [
      "Rad xati huquqiy tahlili",
      "Hujjatlardagi xatolarni aniqlash",
      "Qayta topshirish strategiyasi",
      "Har bosqichda shaxsiy kuzatish",
    ],
    badge: '72ч',
    badgeLabel: 'Tahlil vaqti',
  },
  {
    id: '03',
    flag: '🎯',
    tag: 'PSIXOLOGIK TAYYORGARLIK',
    title: "Suhbat simulyatsiyasi",
    pain: "\"Konsulning kutilmagan savollaridan qo'rqaman.\"",
    result: "Real elchixona sharoitidagi 3 ta repetitsion suhbatdan o'tasiz. Sizda har qanday savolga mantiqiy va tayyor javob bo'ladi.",
    features: [
      "Real suhbat simulyatsiyasi",
      "Stress va xavotir bilan ishlash",
      "Video tahlil va fikr-mulohaza",
      "Noverbal xulq-atvorni tuzatish",
    ],
    badge: '100%',
    badgeLabel: 'Ishonch',
  },
]

function ServiceCard({ s, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = '1'
              ref.current.style.transform = 'translateY(0)'
            }
          }, index * 120)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
      className="card flex flex-col hover:border-lime/30 transition-colors group cursor-pointer"
    >
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{s.flag}</span>
          <div>
            <p className="text-[10px] text-lime/70 font-bold tracking-widest uppercase">{s.tag}</p>
            <p className="text-sm font-semibold text-white leading-tight mt-0.5">{s.title}</p>
          </div>
        </div>
        <div className="text-right shrink-0 ml-2">
          <p className="text-lime font-extrabold text-lg leading-none">{s.badge}</p>
          <p className="text-[10px] text-white/35 mt-0.5">{s.badgeLabel}</p>
        </div>
      </div>

      {/* Pain / Result */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
          <p className="text-[10px] text-red-400/70 uppercase tracking-wide font-semibold mb-1">Muammo</p>
          <p className="text-xs text-white/50 italic leading-relaxed">{s.pain}</p>
        </div>
        <div className="bg-lime/5 border border-lime/15 rounded-xl p-3">
          <p className="text-[10px] text-lime/70 uppercase tracking-wide font-semibold mb-1">Natija</p>
          <p className="text-xs text-white/60 leading-relaxed">{s.result}</p>
        </div>

        <ul className="space-y-2.5 flex-1">
          {s.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-xs text-white/50">
              <svg className="shrink-0 mt-0.5 text-lime" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="2,6.5 5,9.5 11,3.5"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 border-t border-border pt-4">
        <a href="#booking" className="flex items-center justify-between text-xs font-semibold text-lime">
          <span>Maslahat olish</span>
          <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 7h10M8 3l4 4-4 4"/>
          </svg>
        </a>
      </div>
    </article>
  )
}

export default function Services() {
  const headRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (headRef.current) {
            headRef.current.style.opacity = '1'
            headRef.current.style.transform = 'translateY(0)'
          }
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (headRef.current) observer.observe(headRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-lime rounded-full"/>
            Xizmatlarimiz
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Ommabop <span className="text-lime">xizmatlar</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg leading-relaxed">
            Har bir xizmat — tadbirkorning muayyan muammosiga aniq javob. Biz umid sotmaymiz — biz tizim sotamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>

        <div className="mt-6 card px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">Noodatiy holat bormi?</p>
            <p className="text-xs text-white/40 mt-0.5">Vaziyatingizni tasvirlab bering — 24 soat ichida individual yechim topamiz</p>
          </div>
          <a href="#booking" className="btn-lime shrink-0">
            Vaziyatni tasvirlash →
          </a>
        </div>

      </div>
    </section>
  )
}
