import { useEffect, useRef, useState } from 'react'

const HERO_STATS = [
  { value: '15+', label: 'Лет опыта' },
  { value: '12 000+', label: 'Одобренных виз' },
  { value: '98%', label: 'С первой попытки' },
  { value: '247', label: 'Спасённых дел после отказа (2025)' },
]

const TOP_DESTINATIONS = [
  { flag: '🇺🇸', country: 'США', name: 'Деловая виза (B1/B2)', badge: '98%', selectValue: 'США (B1/B2)' },
  { flag: '🇬🇧', country: 'Великобритания', name: 'Рабочая виза', badge: '97%', selectValue: 'Великобритания' },
  { flag: '🇩🇪', country: 'Германия', name: 'Шенген Бизнес', badge: '99%', selectValue: 'Шенген (Германия)' },
  { flag: '🇨🇦', country: 'Канада', name: 'Виза под ключ', badge: '96%', selectValue: 'Канада' },
]

function NavBarRu({ onCTAClick, menuOpen, setMenuOpen, onLangSwitch }) {
  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
              <path d="M8 4L11 5.75V9.25L8 11L5 9.25V5.75L8 4Z" fill="#D4AF37" fillOpacity="0.3"/>
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">
            <span className="text-white">SEM </span><span className="text-gold">VISA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {[['#services-ru','Услуги'],['#team-ru','Специалисты'],['#testimonials-ru','Отзывы']].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-white/50 hover:text-white transition-colors">
              {label}
            </a>
          ))}
          {/* Language switcher */}
          <button
            onClick={onLangSwitch}
            className="flex items-center gap-1.5 border border-gold/30 rounded-lg px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold/10 transition-all"
          >
            🇺🇿 UZ
          </button>
          <button onClick={onCTAClick} className="btn-gold">
            Бесплатный анализ →
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onLangSwitch}
            className="flex items-center gap-1 border border-gold/30 rounded-lg px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold/10 transition-all"
          >
            🇺🇿 UZ
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            className="w-11 h-11 flex flex-col justify-center gap-1.5 items-center"
          >
            <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}/>
            <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-4 flex flex-col gap-1">
          {[['#services-ru','Услуги'],['#team-ru','Специалисты'],['#testimonials-ru','Отзывы']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
               className="text-sm text-white/60 py-3 border-b border-border last:border-0 hover:text-gold transition-colors">
              {label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); onCTAClick() }} className="btn-gold mt-3 text-center">
            Получить бесплатный анализ визы →
          </button>
        </div>
      )}
    </nav>
  )
}

export default function HeroRu({ onCTAClick, onDestinationClick, onLangSwitch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-fade]')
    const timers = []
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        els?.forEach((el, i) => {
          const t = setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, i * 110)
          timers.push(t)
        })
        observer.disconnect()
      }
    }, { threshold: 0.05 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      <NavBarRu onCTAClick={onCTAClick} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLangSwitch={onLangSwitch} />

      <section ref={sectionRef} id="hero-ru" className="bg-bg py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          <div>
            <span className="section-label">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"/>
              ВИЗОВЫЙ КОНСАЛТИНГ №1 ДЛЯ БИЗНЕСА
            </span>
          </div>

          <h1 className="mt-4 font-sans text-[28px] md:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-white max-w-3xl">
            Избавьтесь от риска отказа в визе:{' '}
            <span className="gold-gradient drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">98% результат с первой попытки.</span>
          </h1>

          <p
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-4 text-sm md:text-base text-white/50 leading-relaxed max-w-xl"
          >
            Мы не просто заполняем документы — мы выстраиваем юридическую стратегию,
            при которой у консула не остаётся вопросов. Пройдите 3-этапный аудит
            документов перед подачей в посольство.
          </p>

          <div
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <button onClick={onCTAClick} className="btn-gold flex items-center justify-center gap-2 text-[15px]">
              Получить бесплатный анализ
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            <a href="#services-ru" className="btn-outline-gold text-center text-[15px]">
              Ознакомиться с услугами
            </a>
          </div>

          <div
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {HERO_STATS.map(({ value, label }) => (
              <div key={label} className="stat-badge hover:border-gold/30 transition-colors">
                <span className="text-gold text-2xl md:text-3xl font-extrabold leading-none">{value}</span>
                <span className="mt-1 text-[10px] text-white/40 uppercase tracking-wide leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <div
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-8"
          >
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Популярные направления</p>
            <div className="flex flex-col gap-2">
              {TOP_DESTINATIONS.map(({ flag, country, name, badge, selectValue }) => (
                <div
                  key={country}
                  onClick={() => onDestinationClick(selectValue)}
                  className="card px-4 py-3 flex items-center justify-between gap-4 hover:border-gold/40 transition-all cursor-pointer group hover:bg-surface-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl drop-shadow-md">{flag}</span>
                    <div>
                      <p className="text-[10px] text-gold/80 font-bold uppercase tracking-wide">{country}</p>
                      <p className="text-sm font-medium text-white/90">{name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                      {badge}
                    </span>
                    <svg className="text-white/20 group-hover:text-gold transition-colors duration-300 transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 3l4 4-4 4"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
