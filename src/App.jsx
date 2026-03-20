import { useRef, useState } from 'react'
import { TRUST_STRIP_STATS } from './constants'
import Hero from './components/Hero'
import Services from './components/Services'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import BookingForm from './components/BookingForm'

export default function App({ onLangSwitch }) {
  const bookingRef = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState('')

  const scrollToBooking = (country = '') => {
    if (country) setSelectedCountry(country)
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* 1. Hero */}
      <Hero onCTAClick={scrollToBooking} onDestinationClick={scrollToBooking} onLangSwitch={onLangSwitch} />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Trust strip */}
      <div className="bg-surface border-y border-border py-4 px-4 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {TRUST_STRIP_STATS.map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-gold font-bold text-sm drop-shadow-sm">{value}</span>
                <span className="text-white/30 text-xs hidden sm:inline">·</span>
                <span className="text-white/35 text-xs">{label}</span>
              </div>
            ))}
          </div>
          <span className="section-label shrink-0">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"/>
            ISHONCHLI HAMKOR
          </span>
        </div>
      </div>

      {/* 2. Services */}
      <Services />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* 3. Team */}
      <Team />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* 4. Testimonials */}
      <Testimonials />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* 5. FAQ */}
      <FAQ onCTAClick={scrollToBooking} />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* 6. Booking */}
      <BookingForm formRef={bookingRef} selectedCountry={selectedCountry} />

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
                <path d="M8 4L11 5.75V9.25L8 11L5 9.25V5.75L8 4Z" fill="#D4AF37" fillOpacity="0.3"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-[15px]"><span className="text-white">SEM </span><span className="text-gold">VISA</span></span>
              <p className="text-[10px] text-white/25 mt-0.5">Viza konsaltingi — 2011-yildan beri</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/35">
            {[['#services','Xizmatlar'],['#team','Mutaxassislar'],['#testimonials','Sharhlar'],['#faq','FAQ'],['#booking','Aloqa']].map(([href,label]) => (
              <a key={href} href={href} className="hover:text-gold transition-colors">{label}</a>
            ))}
          </div>

          <p className="text-[11px] text-white/20">
            © 2026 SEM VISA Consulting. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  )
}
