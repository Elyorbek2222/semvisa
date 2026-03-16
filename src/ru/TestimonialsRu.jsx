import { useInView } from '../hooks/useInView'

const REVIEWS = [
  {
    initials: 'SR',
    name: 'Сардор Рахимов',
    title: "Предприниматель, IT-сфера",
    club: 'Business Club Ташкент',
    country: '🇺🇸 США',
    date: 'Ноябрь 2024',
    result: 'Получена виза на 10 лет',
    text: "Дважды получал отказ в визе США. Здесь объяснили мои ошибки, 3 дня готовились — и с третьей попытки получил визу на 10 лет. Понравился их подход к работе с цифрами.",
    verified: true,
  },
  {
    initials: 'MA',
    name: 'Малика Абдувалиева',
    title: "Юрист, Abduvaliyeva Legal Group",
    club: 'Business Club Самарканд',
    country: '🇩🇪 Шенген',
    date: 'Август 2024',
    result: 'Виза готова за 5 дней',
    text: "Помогли получить шенгенскую визу за 5 дней. Никакого пустого «индивидуального подхода» — сразу к делу. Рекомендую!",
    verified: true,
  },
  {
    initials: 'JT',
    name: 'Жавохир Тоиров',
    title: "Управляющий директор, Silk Capital",
    club: 'Business Club Ташкент',
    country: '🇨🇦 Канада',
    date: 'Январь 2025',
    result: 'Канада одобрена',
    text: "Компания в надёжных руках профессионалов. В документах была проблема, но найденное ими решение позволило мне сейчас быть в Канаде. Всё было именно так, как написано в договоре.",
    verified: true,
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} звёзд`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#D4AF37" aria-hidden="true" className="drop-shadow-[0_0_2px_rgba(212,175,55,0.4)]">
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
      className="card flex flex-col hover:border-gold/30 hover:shadow-[0_4px_20px_rgba(212,175,55,0.05)] transition-all duration-300"
    >
      <div className="p-5 border-b border-border flex items-start gap-3 bg-gradient-to-br from-surface to-surface-2/50">
        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
          <span className="text-gold font-bold text-sm">{review.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white truncate">{review.name}</p>
            {review.verified && (
              <span className="shrink-0 flex items-center gap-1 text-[10px] text-gold/80 bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <polyline points="1.5,4.5 3.5,6.5 7.5,2.5"/>
                </svg>
                Проверено
              </span>
            )}
          </div>
          <p className="text-[11px] text-white/40 mt-0.5">{review.title}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StarRating />
          <span className="text-[11px] text-white/30">{review.date}</span>
        </div>
        <span className="text-[11px] text-gold/80 font-medium bg-gold/5 px-2 py-0.5 rounded">{review.country}</span>
      </div>

      <div className="p-5 flex-1">
        <p className="text-sm text-white/55 leading-relaxed italic block tracking-wide">"{review.text}"</p>
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-center gap-2.5 bg-gold/10 border border-gold/20 rounded-xl px-4 py-2.5 shadow-[0_2px_10px_rgba(212,175,55,0.05)]">
          <div className="w-2.5 h-2.5 rounded-full bg-gold/80 animate-pulse shadow-[0_0_5px_rgba(212,175,55,0.8)]"/>
          <span className="text-xs font-bold text-gold tracking-wide">{review.result}</span>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsRu() {
  const headRef = useInView()

  return (
    <section id="testimonials-ru" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full"/>
            Отзывы клиентов
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Что говорят <span className="gold-gradient">предприниматели</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg">
            Реальные истории членов Business Club — для них главное было точность и скорость.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        <div className="mt-6 card px-5 py-6 grid grid-cols-3 gap-4 text-center bg-gradient-to-r from-surface to-gold/5 border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
          {[
            { value: '4.97', label: "Средний рейтинг" },
            { value: '12 000+', label: 'Клиентов' },
            { value: '98%', label: 'Успешность' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-gold font-extrabold text-2xl md:text-3xl drop-shadow-sm">{value}</p>
              <p className="text-[11px] text-white/40 mt-1 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
