import { useEffect, useRef, useState } from 'react'
import { HERO_STATS } from '../constants'

const TOP_DESTINATIONS = [
  { flag: '🇺🇸', country: 'AQSH', name: 'Biznes vizasi (B1/B2)', badge: '98%', selectValue: 'AQSH (B1/B2)' },
  { flag: '🇬🇧', country: 'Buyuk Britaniya', name: 'Ishchi viza', badge: '97%', selectValue: 'Buyuk Britaniya' },
  { flag: '🇩🇪', country: 'Germaniya', name: 'Shengen Biznes', badge: '99%', selectValue: 'Shengen (Germaniya)' },
  { flag: '🇨🇦', country: 'Kanada', name: 'Viza kalit ostida', badge: '96%', selectValue: 'Kanada' },
]

function NavBar({ onCTAClick, menuOpen, setMenuOpen }) {
  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime/10 border border-lime/30 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#C2D100" strokeWidth="1.2" fill="none"/>
              <path d="M8 4L11 5.75V9.25L8 11L5 9.25V5.75L8 4Z" fill="#C2D100" fillOpacity="0.3"/>
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">
            <span className="text-white">SEM </span><span className="text-lime">VISA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {[['#services','Xizmatlar'],['#team','Mutaxassislar'],['#testimonials','Sharhlar']].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-white/50 hover:text-white transition-colors">
              {label}
            </a>
          ))}
          <button onClick={onCTAClick} className="btn-lime">
            Bepul tahlil →
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={menuOpen}
          className="md:hidden w-11 h-11 flex flex-col justify-center gap-1.5 items-center"
        >
          <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}/>
          <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-4 flex flex-col gap-1">
          {[['#services','Xizmatlar'],['#team','Mutaxassislar'],['#testimonials','Sharhlar']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
               className="text-sm text-white/60 py-3 border-b border-border last:border-0">
              {label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); onCTAClick() }} className="btn-lime mt-3 text-center">
            Bepul viza tahlilini olish →
          </button>
        </div>
      )}
    </nav>
  )
}

export default function Hero({ onCTAClick, onDestinationClick }) {
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
      <NavBar onCTAClick={onCTAClick} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section ref={sectionRef} id="hero" className="bg-bg py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Badge */}
          <div>
            <span className="section-label">
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse"/>
              VIZA KONSALTINGI №1 BIZNES UCHUN
            </span>
          </div>

          {/* H1 — LCP: opacity:0 yo'q, darhol ko'rinadi */}
          <h1
            className="mt-4 font-sans text-[28px] md:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-white max-w-3xl"
          >
            Viza rad etilishi xavfidan qutuling:{' '}
            <span className="text-lime">Birinchi urinishda 98% natija.</span>
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
            <button onClick={onCTAClick} className="btn-lime flex items-center justify-center gap-2 text-[15px]">
              Bepul viza tahlilini olish
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            <a href="#services" className="btn-outline-lime text-center text-[15px]">
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
              <div key={label} className="stat-badge">
                <span className="text-lime text-2xl md:text-3xl font-extrabold leading-none">{value}</span>
                <span className="mt-1 text-[10px] text-white/35 uppercase tracking-wide leading-tight">{label}</span>
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
                  className="card px-4 py-3 flex items-center justify-between gap-4 hover:border-lime/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{flag}</span>
                    <div>
                      <p className="text-[10px] text-lime/70 font-bold uppercase tracking-wide">{country}</p>
                      <p className="text-sm font-medium text-white/80">{name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-lime bg-lime/10 border border-lime/20 px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                    <svg className="text-white/20 group-hover:text-lime transition-colors" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
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
