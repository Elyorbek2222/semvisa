import { useInView } from '../hooks/useInView'

const REVIEWS = [
  {
    initials: 'SR',
    name: 'Sardor Rahimov',
    title: "Tadbirkor, IT soha",
    club: 'Business Club Toshkent',
    country: '🇺🇸 AQSH',
    date: 'Noyabr 2024',
    result: '10 yillik viza olindi',
    text: "AQSHga ikki marta rad javobi olgandim. Bu yerda xatolarimni tushuntirishdi, 3 kun tayyorlandik va uchinchi urinishda 10 yillik viza oldim. Raqamlar bilan ishlashlari yoqdi.",
    verified: true,
  },
  {
    initials: 'MA',
    name: 'Malika Abduvaliyeva',
    title: "Yurist, Abduvaliyeva Legal Group",
    club: 'Business Club Samarqand',
    country: '🇩🇪 Shengen',
    date: 'Avgust 2024',
    result: '5 kunda viza tayyor',
    text: "Shengen vizasini 5 kun ichida olishimga yordam berishdi. Hech qanday 'individual yondashuv' kabi quruq gaplarsiz, darrov ishga o'tishdi. Tavsiya qilaman!",
    verified: true,
  },
  {
    initials: 'JT',
    name: 'Javohir Toirov',
    title: "Boshqaruvchi direktor, Silk Capital",
    club: 'Business Club Toshkent',
    country: '🇨🇦 Kanada',
    date: 'Yanvar 2025',
    result: 'Kanada tasdiqlandi',
    text: "Kompaniya haqiqiy mutaxassislar qo'lida. Hujjatlarimda muammo bor edi, lekin ular topgan yechim tufayli hozir Kanadaman. Hammasi shartnomada yozilganidek bo'ldi.",
    verified: true,
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} yulduz`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#C2D100" aria-hidden="true">
          <path d="M6 1l1.27 3.9H11L8.18 7.1 9.45 11 6 8.9 2.55 11l1.27-3.9L1 4.9h3.73L6 1z"/>
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  const ref = useInView({ delay: index * 120 })

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
      className="card flex flex-col"
    >
      {/* Header */}
      <div className="p-5 border-b border-border flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center shrink-0">
          <span className="text-lime font-bold text-sm">{review.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white truncate">{review.name}</p>
            {review.verified && (
              <span className="shrink-0 flex items-center gap-1 text-[10px] text-lime/70 bg-lime/10 px-2 py-0.5 rounded-full">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#C2D100" strokeWidth="1.5">
                  <polyline points="1.5,4.5 3.5,6.5 7.5,2.5"/>
                </svg>
                Tasdiqlangan
              </span>
            )}
          </div>
          <p className="text-[11px] text-white/40 mt-0.5">{review.title}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StarRating />
          <span className="text-[11px] text-white/30">{review.date}</span>
        </div>
        <span className="text-[11px] text-lime/80 font-medium">{review.country}</span>
      </div>

      {/* Text */}
      <div className="p-5 flex-1">
        <p className="text-sm text-white/55 leading-relaxed">"{review.text}"</p>
      </div>

      {/* Result badge — document status style */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-2.5 bg-lime/10 border border-lime/20 rounded-xl px-4 py-2.5">
          <div className="w-2 h-2 rounded-full bg-lime animate-pulse"/>
          <span className="text-xs font-semibold text-lime">{review.result}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const headRef = useInView()

  return (
    <section id="testimonials" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-lime rounded-full"/>
            Mijozlar sharhlari
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Tadbirkorlar <span className="text-lime">nima deydi</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg">
            Business Club a'zolarining haqiqiy hikoyalari — ularga aniqlik va tezlik muhim edi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 card px-5 py-5 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '4.97', label: "O'rtacha reyting" },
            { value: '12 000+', label: 'Mijozlar' },
            { value: '98%', label: 'Muvaffaqiyat' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-lime font-extrabold text-xl md:text-2xl">{value}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
