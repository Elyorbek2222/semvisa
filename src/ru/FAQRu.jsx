import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const FAQS = [
  {
    q: "Сколько времени занимает получение визы?",
    a: "Сроки получения визы зависят от страны. Шенгенская виза обычно оформляется за 5–15 рабочих дней, виза США — 2–8 недель, канадская — 2–4 недели. С нашей услугой ускорения сроки можно сократить.",
  },
  {
    q: "Можно ли подавать повторно после отказа?",
    a: "Да, повторная подача после отказа возможна. SEM VISA анализирует причины отказа в течение 72 часов, выявляет ошибки и готовит более сильное заявление на основе новой стратегии. 247 клиентов получили визу после отказа.",
  },
  {
    q: "Сколько денег должно быть на счёте для визы США?",
    a: "Для визы США B1/B2 точная сумма не установлена, однако консул проверяет экономическую стабильность. Стратегия финансового профиля очень важна — необходимо правильно представить опыт работы, доход и имущество. SEM VISA разрабатывает эту стратегию индивидуально.",
  },
  {
    q: "Что нужно для шенгенской визы?",
    a: "Для шенгена: паспорт, фото, туристическая страховка, бронь отеля и авиабилета, выписка из банка, справка с места работы. SEM VISA готовит полное досье документов — успешность 99%.",
  },
  {
    q: "Как подготовиться к собеседованию в посольстве?",
    a: "Необходимо чётко знать цель поездки, полностью изучить документы и отработать возможные вопросы консула. SEM VISA проводит 3 тренировочных собеседования в условиях реального посольства, видеоанализ и работу над невербальным поведением.",
  },
  {
    q: "Сложно ли получить канадскую визу?",
    a: "Канадская виза относительно сложная, но при правильных документах и стратегии успешность составляет 96%. Ключевые факторы: финансовая стабильность, история путешествий и чёткое указание цели поездки.",
  },
  {
    q: "Сколько стоит визовый консалтинг?",
    a: "Стоимость услуги определяется в зависимости от страны и сложности. Заполните форму для бесплатной начальной консультации — наш специалист свяжется с вами в течение 24 часов и предоставит точную цену и стратегию.",
  },
  {
    q: "Как начать работу с SEM VISA?",
    a: "Процесс состоит из 4 этапов: 1) Оставьте онлайн-заявку, 2) Специалист свяжется в течение 24 часов и проанализирует ситуацию, 3) Предоставляется индивидуальная стратегия с процентом успешности, 4) Документы готовятся, виза получается. Первая консультация — бесплатно.",
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
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-surface hover:bg-surface-2 transition-colors group"
      >
        <span className={`text-sm font-medium transition-colors ${open ? 'text-gold' : 'text-white/85 group-hover:text-white'}`}>{item.q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? 'rotate-45 border-gold bg-gold/10 scale-110' : 'border-border group-hover:border-gold/50'}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={open ? '#D4AF37' : 'rgba(255,255,255,0.4)'} strokeWidth="1.6" className="transition-colors">
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

export default function FAQRu({ onCTAClick }) {
  const headRef = useInView()

  return (
    <section id="faq-ru" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full"/>
            Часто задаваемые вопросы
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Вопросы и <span className="gold-gradient">ответы</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 max-w-lg">
            Чёткие ответы на самые частые вопросы наших клиентов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        <div className="mt-8 card px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.05)] bg-gradient-to-r from-surface to-gold/5">
          <div>
            <p className="font-bold text-white text-base">Не нашли ответа на вопрос?</p>
            <p className="text-sm text-white/60 mt-1">Получите бесплатную консультацию — наш специалист свяжется в течение 24 часов</p>
          </div>
          <button onClick={onCTAClick} className="btn-gold shrink-0 px-8">
            Бесплатная консультация →
          </button>
        </div>

      </div>
    </section>
  )
}
