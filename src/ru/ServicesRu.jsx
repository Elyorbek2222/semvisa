import { useInView } from '../hooks/useInView'

const SERVICES = [
  {
    id: '01',
    flag: '🇺🇸',
    tag: 'США / ВЕЛИКОБРИТАНИЯ / КАНАДА',
    title: "Сложные визы",
    pain: "\"Паспорт пустой или доход низкий — всё равно откажут.\"",
    result: "Мы правильно формируем ваши социальные и экономические связи. В результате консул воспринимает вас как надёжного путешественника.",
    features: [
      "Полное досье документов",
      "Стратегия финансового профиля",
      "Надёжное сопроводительное письмо",
      "Подготовка к вопросам консула",
    ],
    badge: '98%',
    badgeLabel: 'Одобрение',
  },
  {
    id: '02',
    flag: '🔄',
    tag: 'ПОСЛЕ ОТКАЗА',
    title: "Получение визы после отказа",
    pain: "\"Один раз получил отказ — теперь путь закрыт.\"",
    result: "Анализируем причины отказа за 72 часа и готовим новое заявление с исправленными ошибками.",
    features: [
      "Юридический анализ письма об отказе",
      "Выявление ошибок в документах",
      "Стратегия повторной подачи",
      "Личное сопровождение на каждом этапе",
    ],
    badge: '72ч',
    badgeLabel: 'Время анализа',
  },
  {
    id: '03',
    flag: '🎯',
    tag: 'ПСИХОЛОГИЧЕСКАЯ ПОДГОТОВКА',
    title: "Симуляция собеседования",
    pain: "\"Боюсь неожиданных вопросов консула.\"",
    result: "Пройдёте 3 тренировочных собеседования в условиях реального посольства. У вас будет логичный готовый ответ на любой вопрос.",
    features: [
      "Симуляция реального собеседования",
      "Работа со стрессом и тревогой",
      "Видеоанализ и обратная связь",
      "Коррекция невербального поведения",
    ],
    badge: '100%',
    badgeLabel: 'Уверенность',
  },
]

function ServiceCard({ s, index }) {
  const ref = useInView({ delay: index * 120 })

  return (
    <article
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
      className="card flex flex-col hover:border-gold/40 transition-colors group cursor-pointer hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
    >
      <div className="p-5 border-b border-border flex items-center justify-between bg-gradient-to-br from-surface to-surface-2 group-hover:from-surface-2 group-hover:to-surface transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-3xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">{s.flag}</span>
          <div>
            <p className="text-[10px] text-gold/80 font-bold tracking-widest uppercase">{s.tag}</p>
            <p className="text-sm font-semibold text-white leading-tight mt-0.5">{s.title}</p>
          </div>
        </div>
        <div className="text-right shrink-0 ml-2">
          <p className="text-gold font-extrabold text-lg leading-none drop-shadow-sm">{s.badge}</p>
          <p className="text-[10px] text-white/40 mt-0.5">{s.badgeLabel}</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
          <p className="text-[10px] text-red-400/80 uppercase tracking-wide font-semibold mb-1">Проблема</p>
          <p className="text-xs text-white/60 italic leading-relaxed">{s.pain}</p>
        </div>
        <div className="bg-gold/5 border border-gold/15 rounded-xl p-3">
          <p className="text-[10px] text-gold uppercase tracking-wide font-semibold mb-1">Результат</p>
          <p className="text-xs text-white/80 leading-relaxed font-medium">{s.result}</p>
        </div>

        <ul className="space-y-2.5 flex-1 mt-2">
          {s.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-xs text-white/60">
              <svg className="shrink-0 mt-0.5 text-gold drop-shadow-sm" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="2,6.5 5,9.5 11,3.5"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-5 pb-5 pt-4 border-t border-border bg-surface-2/50 group-hover:bg-surface transition-colors">
        <a href="#booking-ru" className="flex items-center justify-between text-xs font-bold text-gold cursor-pointer">
          <span className="tracking-wide">ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</span>
          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-bg transition-colors duration-300">
            <svg className="group-hover:translate-x-0.5 transition-transform" width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </div>
        </a>
      </div>
    </article>
  )
}

export default function ServicesRu() {
  const headRef = useInView()

  return (
    <section id="services-ru" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full"/>
            Наши услуги
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Популярные <span className="gold-gradient">услуги</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 max-w-lg leading-relaxed">
            Каждая услуга — конкретный ответ на конкретную проблему предпринимателя. Мы продаём не надежду — мы продаём систему.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>

        <div className="mt-6 card px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.05)] bg-gradient-to-r from-surface to-gold/5">
          <div>
            <p className="font-bold text-white text-base">Нестандартная ситуация?</p>
            <p className="text-sm text-white/60 mt-1 max-w-md">Опишите свою ситуацию — в течение 24 часов найдём индивидуальное гарантированное решение.</p>
          </div>
          <a href="#booking-ru" className="btn-gold shrink-0 px-8">
            Описать ситуацию →
          </a>
        </div>

      </div>
    </section>
  )
}
