import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HERO_STATS } from '../constants'
import { countries } from '../data/countries'

const TOP_DESTINATIONS = [
  { flag: '🇺🇸', country: 'AQSH', name: 'Biznes vizasi (B1/B2)', badge: '98%', selectValue: 'AQSH (B1/B2)' },
  { flag: '🇬🇧', country: 'Buyuk Britaniya', name: 'Ishchi viza', badge: '97%', selectValue: 'Buyuk Britaniya' },
  { flag: '🇩🇪', country: 'Germaniya', name: 'Shengen Biznes', badge: '99%', selectValue: 'Shengen (Germaniya)' },
  { flag: '🇨🇦', country: 'Kanada', name: 'Viza kalit ostida', badge: '96%', selectValue: 'Kanada' },
]

function NavBar({ onCTAClick, menuOpen, setMenuOpen, onLangSwitch }) {
  const [vizaOpen, setVizaOpen] = useState(false)
  const lang = typeof window !== 'undefined' ? localStorage.getItem('semvisa_lang') || 'uz' : 'uz'
  const isRu = lang === 'ru'

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

        <div className="hidden md:flex items-center gap-5">
          {[['#services', isRu ? 'Услуги' : 'Xizmatlar'],['#team', isRu ? 'Команда' : 'Mutaxassislar'],['#testimonials', isRu ? 'Отзывы' : 'Sharhlar']].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-white/50 hover:text-white transition-colors">
              {label}
            </a>
          ))}

          {/* Vizalar dropdown */}
          <div className="relative" onMouseEnter={() => setVizaOpen(true)} onMouseLeave={() => setVizaOpen(false)}>
            <Link to="/vizalar" className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
              {isRu ? 'Визы' : 'Vizalar'}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform ${vizaOpen ? 'rotate-180' : ''}`}>
                <path d="M2 4l4 4 4-4"/>
              </svg>
            </Link>
            {vizaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 z-50">
                <div className="bg-surface border border-border rounded-xl shadow-xl overflow-hidden">
                  {countries.map(c => (
                    <Link key={c.slug} to={`/vizalar/${c.slug}`}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gold/8 hover:text-gold text-white/60 text-xs transition-colors">
                      <span>{c.flag}</span>
                      <span>{isRu ? c.nameRu : c.nameUz}</span>
                    </Link>
                  ))}
                  <div className="border-t border-border">
                    <Link to="/vizalar" className="flex items-center gap-2 px-4 py-2.5 text-gold/70 hover:text-gold text-xs transition-colors font-semibold">
                      {isRu ? 'Все страны →' : 'Barcha mamlakatlar →'}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/blog" className="text-sm text-white/50 hover:text-white transition-colors">Blog</Link>
          <button onClick={onLangSwitch} className="flex items-center gap-1.5 border border-gold/30 rounded-lg px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold/10 transition-all">
            {isRu ? '🇺🇿 UZ' : '🇷🇺 RU'}
          </button>
          <button onClick={onCTAClick} className="btn-gold">
            {isRu ? 'Консультация →' : 'Bepul tahlil →'}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={onLangSwitch} className="flex items-center gap-1 border border-gold/30 rounded-lg px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold/10 transition-all">
            {isRu ? '🇺🇿 UZ' : '🇷🇺 RU'}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}
            className="w-11 h-11 flex flex-col justify-center gap-1.5 items-center">
            <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}/>
            <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-4 flex flex-col gap-1">
          {[['#services', isRu ? 'Услуги' : 'Xizmatlar'],['#team', isRu ? 'Команда' : 'Mutaxassislar'],['#testimonials', isRu ? 'Отзывы' : 'Sharhlar']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
               className="text-sm text-white/60 py-3 border-b border-border hover:text-gold transition-colors">{label}</a>
          ))}
          <Link to="/vizalar" onClick={() => setMenuOpen(false)}
            className="text-sm text-white/60 py-3 border-b border-border hover:text-gold transition-colors">
            {isRu ? '🌍 Визы по странам' : '🌍 Mamlakatlar bo\'yicha vizalar'}
          </Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}
            className="text-sm text-white/60 py-3 border-b border-border hover:text-gold transition-colors">
            Blog
          </Link>
          <button onClick={() => { setMenuOpen(false); onCTAClick() }} className="btn-gold mt-3 text-center">
            Bepul viza tahlilini olish →
          </button>
        </div>
      )}
    </nav>
  )
}

export default function Hero({ onCTAClick, onDestinationClick, onLangSwitch }) {
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
      <NavBar onCTAClick={onCTAClick} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLangSwitch={onLangSwitch} />

      <section ref={sectionRef} id="hero" className="bg-bg py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Badge */}
          <div>
            <span className="section-label">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"/>
              VIZA KONSALTINGI №1 BIZNES UCHUN
            </span>
          </div>

          {/* H1 — LCP: opacity:0 yo'q, darhol ko'rinadi */}
          <h1
            className="mt-4 font-sans text-[28px] md:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-white max-w-3xl"
          >
            Viza rad etilishi xavfidan qutuling:{' '}
            <span className="gold-gradient drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Birinchi urinishda 98% natija.</span>
          </h1>

          {/* Subtitle */}
          <p
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-4 text-sm md:text-base text-white/50 leading-relaxed max-w-xl"
          >
            Biz shunchaki hujjat to'ldirmaymiz, balki konsulda savol qoldirmaydigan
            huquqiy strategiya quramiz. Hujjatlaringizni elchixonaga topshirishdan oldin
            3 bosqichli auditdan o'tkazing.
          </p>

          {/* CTAs */}
          <div
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <button onClick={onCTAClick} className="btn-gold flex items-center justify-center gap-2 text-[15px]">
              Bepul viza tahlilini olish
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            <a href="#services" className="btn-outline-gold text-center text-[15px]">
              Xizmatlar bilan tanishish
            </a>
          </div>

          {/* Stats grid */}
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

          {/* Popular destinations */}
          <div
            data-fade
            style={{opacity:0,transform:'translateY(14px)',transition:'all 0.5s ease'}}
            className="mt-8"
          >
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Mashhur yo'nalishlar</p>
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
