import { useInView } from '../hooks/useInView'

const TEAM = [
  {
    initials: 'SO',
    name: 'Сардорбек Орифжонов',
    role: 'Основатель и Визовый Стратег',
    exp: '15 лет',
    bio: "15 лет опыта. Каждое дело анализирует глубоко с юридической точки зрения и разрабатывает наиболее надёжную стратегию для клиента.",
    stats: [
      { value: '12 000+', label: 'Решённых дел' },
      { value: '98%', label: 'Успешность' },
    ],
    skills: ['Юридические консультации', 'Сложные визы', 'Деловые поездки'],
  },
  {
    initials: 'AR',
    name: 'Абдурахим',
    role: "Визовый менеджер",
    exp: '5 лет',
    bio: "Визы — моя специализация! Профессионально занимаюсь оформлением виз любой сложности быстро и надёжно. Ваше время — самый ценный ресурс.",
    stats: [
      { value: '5 000+', label: 'Оформленных виз' },
      { value: '97%', label: 'Одобрение' },
    ],
    skills: ['Шенгенские визы', 'США и Канада', 'Срочное оформление'],
  },
  {
    initials: 'EY',
    name: 'Элёрбек',
    role: 'Директор',
    exp: '15 лет',
    bio: "Помимо визы подготовлю полный туристический пакет: экскурсии, подтверждённые авиабилеты и дополнительные услуги. Ваше путешествие — мой проект!",
    stats: [
      { value: '3 000+', label: "Организованных туров" },
      { value: '100%', label: 'Удовлетворённость' },
    ],
    skills: ['Туристическая архитектура', 'Экскурсии', 'Подтверждённые билеты'],
  },
]

function TeamCard({ member, index }) {
  const ref = useInView({ delay: index * 130 })

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
      className="card overflow-hidden hover:border-gold/30 hover:shadow-[0_4px_20px_rgba(212,175,55,0.08)] transition-all duration-300 group"
    >
      <div className="p-5 flex items-center gap-4 border-b border-border bg-gradient-to-br from-surface to-surface-2 group-hover:from-surface-2 group-hover:to-surface transition-colors">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:scale-105 transition-transform duration-300">
            <span className="text-gold font-extrabold text-lg drop-shadow-sm">{member.initials}</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gold rounded-full border-2 border-bg shadow-[0_0_5px_rgba(212,175,55,0.5)]"/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm truncate">{member.name}</p>
          <p className="text-[11px] text-gold/80 mt-0.5 font-medium">{member.role}</p>
          <p className="text-[10px] text-white/35 mt-0.5">Опыт: {member.exp}</p>
        </div>
        <div className="shrink-0 bg-gold/10 border border-gold/20 rounded-lg px-2.5 py-1.5 text-center">
          <p className="text-gold font-extrabold text-sm leading-none">{member.exp}</p>
          <p className="text-[9px] text-white/40 mt-0.5 uppercase tracking-wide">опыт</p>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-border bg-surface-2/30">
        <p className="text-xs text-white/55 leading-relaxed min-h-[60px]">{member.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border border-b border-border">
        {member.stats.map(({ value, label }) => (
          <div key={label} className="bg-surface px-4 py-3 hover:bg-surface-2 transition-colors">
            <p className="text-gold font-extrabold text-base leading-none drop-shadow-sm">{value}</p>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      <div className="p-5">
        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Специализация</p>
        <div className="space-y-2.5">
          {member.skills.map((skill, i) => (
            <div key={skill} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${
                i === 0 ? 'bg-gold border-gold' : i === 1 ? 'border-gold/50 bg-gold/10' : 'border-white/15 bg-transparent'
              }`}>
                {i === 0 && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0F0E0D" strokeWidth="2">
                    <polyline points="2,5 4,7 8,3"/>
                  </svg>
                )}
                {i === 1 && <div className="w-1.5 h-1.5 rounded-full bg-gold/70"/>}
                {i === 2 && <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>}
              </div>
              <span className={`text-xs ${i === 0 ? 'text-white font-bold tracking-wide' : i === 1 ? 'text-white/70 font-medium' : 'text-white/40'}`}>
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TeamRu() {
  const headRef = useInView()

  return (
    <section id="team-ru" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full"/>
            Наши специалисты
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Надёжные <span className="gold-gradient">эксперты</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 max-w-lg">
            Каждый специалист — представитель консульской или дипломатической сферы. Мы знаем систему изнутри.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
