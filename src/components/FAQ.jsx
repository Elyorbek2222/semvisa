import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const FAQS = [
  {
    q: "Viza olish uchun qancha vaqt kerak?",
    a: "Viza olish muddati davlatga qarab farq qiladi. Shengen vizasi odatda 5–15 ish kunida, AQSH vizasi 2–8 hafta, Kanada vizasi 2–4 haftada rasmiylashtiriladi. Tezlashtirish xizmatimiz orqali bu muddatni qisqartirish mumkin.",
  },
  {
    q: "Viza rad javobi olgandan keyin qayta topshirish mumkinmi?",
    a: "Ha, rad javobidan keyin qayta topshirish mumkin. SEM VISA rad javobi sabablarini 72 soat ichida huquqiy tahlil qiladi, xatolarni aniqlaydi va yangi strategiya asosida kuchliroq ariza tayyorlaydi. 247 ta mijoz rad javobidan keyin viza olgan.",
  },
  {
    q: "AQSH vizasi uchun bank hisobida qancha pul bo'lishi kerak?",
    a: "AQSH B1/B2 vizasi uchun aniq miqdor belgilanmagan, lekin konsul iqtisodiy barqarorlikni tekshiradi. Moliyaviy profil strategiyasi juda muhim — ish tajribasi, daromad va mulkni to'g'ri ko'rsatish kerak. SEM VISA bu strategiyani individual tarzda ishlab chiqadi.",
  },
  {
    q: "Shengen vizasi uchun nima kerak?",
    a: "Shengen vizasi uchun: pasport, foto, sayohat sug'urtasi, bronlangan mehmonxona va aviabilet, bank ko'chirmasi, ish joyi ma'lumotnomasi. SEM VISA to'liq hujjat dosyesini tayyorlaydi — muvaffaqiyat darajasi 99%.",
  },
  {
    q: "Elchixona suhbatiga qanday tayyorlanish kerak?",
    a: "Sayohat maqsadini aniq bilish, hujjatlaringizni to'liq o'rganish va konsulning mumkin savollari bo'yicha mashq qilish kerak. SEM VISA real elchixona sharoitidagi 3 ta repetitsion suhbat, video tahlil va noverbal xulq-atvor ustida ishlaydi.",
  },
  {
    q: "Kanada vizasini olish qiyinmi?",
    a: "Kanada vizasi nisbatan murakkab, lekin to'g'ri hujjatlar va strategiya bilan 96% muvaffaqiyatga erishish mumkin. Asosiy omillar: iqtisodiy barqarorlik, sayohat tarixi va maqsadning aniq ko'rsatilishi.",
  },
  {
    q: "Viza konsalting xizmati qancha turadi?",
    a: "Xizmat narxi davlat va murakkablik darajasiga qarab belgilanadi. Bepul boshlang'ich maslahat uchun formani to'ldiring — mutaxassisimiz 24 soat ichida siz bilan bog'lanib, aniq narx va strategiyani taqdim etadi.",
  },
  {
    q: "SEM VISA bilan ishlash qanday boshlanadi?",
    a: "Jarayon 4 bosqichdan iborat: 1) Onlayn ariza qoldiring, 2) Mutaxassis 24 soat ichida bog'lanib holatingizni tahlil qiladi, 3) Individual strategiya va muvaffaqiyat foizi taqdim etiladi, 4) Hujjatlar tayyorlanadi va viza olinadi. Birinchi maslahat bepul.",
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const ref = useInView({ delay: index * 60 })

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(12px)', transition: 'all 0.5s ease' }}
      className="border border-border rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-surface hover:bg-surface/80 transition-colors"
      >
        <span className="text-sm font-medium text-white/85">{item.q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-45 border-lime/40' : ''}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={open ? '#C2D100' : 'rgba(255,255,255,0.4)'} strokeWidth="1.6">
            <path d="M5 1v8M1 5h8"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-surface border-t border-border">
          <p className="text-sm text-white/50 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ({ onCTAClick }) {
  const headRef = useInView()

  return (
    <section id="faq" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-lime rounded-full"/>
            Ko'p so'raladigan savollar
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Savol va <span className="text-lime">javoblar</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg">
            Mijozlarimiz eng ko'p so'raydigan savollarga aniq javoblar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        <div className="mt-8 card px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">Savolingiz javobsiz qoldimi?</p>
            <p className="text-xs text-white/40 mt-0.5">Bepul maslahat oling — mutaxassisimiz 24 soat ichida bog'lanadi</p>
          </div>
          <button onClick={onCTAClick} className="btn-lime shrink-0">
            Bepul maslahat →
          </button>
        </div>

      </div>
    </section>
  )
}
