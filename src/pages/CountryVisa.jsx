import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { countries } from '../data/countries'

function getLang() {
  return localStorage.getItem('semvisa_lang') || 'uz'
}

const DIFF_COLOR = {
  easy:   'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  hard:   'text-red-400 bg-red-400/10 border-red-400/25',
}

export default function CountryVisa() {
  const { slug } = useParams()
  const country = countries.find(c => c.slug === slug)
  if (!country) return <Navigate to="/vizalar" replace />

  const lang = getLang()
  const isRu = lang === 'ru'

  const meta   = isRu ? country.metaRu   : country.metaUz
  const docs   = isRu ? country.documentsRu : country.documentsUz
  const steps  = isRu ? country.stepsRu  : country.stepsUz
  const faq    = isRu ? country.faqRu    : country.faqUz
  const name   = isRu ? country.nameRu   : country.nameUz
  const diff   = isRu ? country.difficultyRu : country.difficultyUz
  const procTime = isRu ? country.processingTimeRu : country.processingTimeUz

  const blogLink = isRu ? '/' : '/blog'
  const homeLink = '/'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description: meta.desc,
    url: `https://semvisa.vercel.app/vizalar/${slug}`,
    touristType: { '@type': 'Audience', audienceType: 'tourists' },
  }

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={`https://semvisa.vercel.app/vizalar/${slug}`} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:image" content={country.image} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link to={homeLink} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
                <path d="M8 4L11 5.75V9.25L8 11L5 9.25V5.75L8 4Z" fill="#D4AF37" fillOpacity="0.3"/>
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight">
              <span className="text-white">SEM </span><span className="text-gold">VISA</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/vizalar" className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 9.5L3.5 6 7 2.5"/>
              </svg>
              {isRu ? 'Все визы' : 'Barcha vizalar'}
            </Link>
            <Link to={homeLink} className="btn-gold text-xs px-3 py-1.5">
              {isRu ? 'Консультация →' : 'Konsultatsiya →'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <img src={country.image} alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-15" loading="eager" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-4xl">{country.flag}</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${DIFF_COLOR[country.difficulty]}`}>
              {diff}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {name}
            <span className="block text-gold text-xl md:text-2xl font-semibold mt-1">
              {country.visaType}
            </span>
          </h1>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: isRu ? 'Сбор' : 'To\'lov', value: country.fee },
              { label: isRu ? 'Срок' : 'Muddat', value: procTime },
              { label: isRu ? 'Успех' : 'Muvaffaqiyat', value: country.successRate },
              { label: isRu ? 'Тип визы' : 'Viza turi', value: country.visaType.split(' ')[0] },
            ].map(({ label, value }) => (
              <div key={label} className="bg-surface border border-border rounded-xl p-4">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-lg font-extrabold text-gold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-10">

          {/* Documents checklist */}
          <div>
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-white mb-5">
              <span className="w-1 h-5 bg-gold rounded-full shrink-0"/>
              {isRu ? 'Необходимые документы' : 'Kerakli hujjatlar'}
            </h2>
            <div className="space-y-2">
              {docs.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-surface hover:border-gold/30 transition-all">
                  <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#D4AF37" strokeWidth="2">
                      <polyline points="2,5 4,7 8,3"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/70 leading-relaxed">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-white mb-5">
              <span className="w-1 h-5 bg-gold rounded-full shrink-0"/>
              {isRu ? 'Как подать заявку — шаг за шагом' : 'Qanday ariza berish — qadamma-qadam'}
            </h2>
            <div className="space-y-1">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full border border-gold/30 bg-gold/8 flex items-center justify-center shrink-0 text-[11px] font-extrabold text-gold">
                      {step.n}
                    </div>
                    {i < steps.length - 1 && <div className="w-px h-8 bg-border mt-1"/>}
                  </div>
                  <div className="pb-6 pt-1">
                    <p className="text-sm font-bold text-white/90">{step.title}</p>
                    <p className="text-xs text-white/45 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-white mb-5">
              <span className="w-1 h-5 bg-gold rounded-full shrink-0"/>
              {isRu ? 'Часто задаваемые вопросы' : 'Ko\'p so\'raladigan savollar'}
            </h2>
            <div className="space-y-2">
              {faq.map((item, i) => (
                <details key={i} className="group border border-border rounded-xl bg-surface overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-white/80 hover:text-white transition-colors list-none">
                    {item.q}
                    <svg className="shrink-0 ml-3 transition-transform group-open:rotate-180" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 5l5 5 5-5"/>
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-border pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">

          {/* CTA card */}
          <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 via-surface to-surface p-6">
            <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-2">
              {isRu ? 'Бесплатная консультация' : 'Bepul konsultatsiya'}
            </p>
            <h3 className="text-base font-extrabold text-white">
              {isRu
                ? `Нужна виза в ${name}?`
                : `${name} vizasi kerakmi?`}
            </h3>
            <p className="mt-2 text-xs text-white/40 leading-relaxed">
              {isRu
                ? 'Наши специалисты свяжутся с вами в течение 24 часов.'
                : 'Mutaxassisimiz 24 soat ichida siz bilan bog\'lanadi.'}
            </p>
            <Link to="/#booking" className="btn-gold w-full flex items-center justify-center gap-2 mt-4 text-sm shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
              {isRu ? 'Оставить заявку' : 'Ariza qoldirish'}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
              </svg>
            </Link>
            <div className="mt-4 space-y-2">
              <a href="tel:+998712755555" className="flex items-center gap-2 text-xs text-white/50 hover:text-gold transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2h3l1.5 3L4.5 6a7.5 7.5 0 0 0 1.5 1.5L7 5.5l3 1.5V10C4.5 10 2 7.5 2 2z"/>
                </svg>
                +998 71 275 55 55
              </a>
              <a href="tel:+998983667773" className="flex items-center gap-2 text-xs text-white/50 hover:text-gold transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2h3l1.5 3L4.5 6a7.5 7.5 0 0 0 1.5 1.5L7 5.5l3 1.5V10C4.5 10 2 7.5 2 2z"/>
                </svg>
                +998 98 366 77 73
              </a>
            </div>
          </div>

          {/* Other countries */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">
              {isRu ? 'Другие визы' : 'Boshqa vizalar'}
            </p>
            <div className="space-y-1">
              {countries.filter(c => c.slug !== slug).slice(0, 6).map(c => (
                <Link key={c.slug} to={`/vizalar/${c.slug}`}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-bg hover:border-gold/20 border border-transparent transition-all">
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-xs text-white/60 hover:text-white transition-colors">
                    {isRu ? c.nameRu : c.nameUz}
                  </span>
                </Link>
              ))}
              <Link to="/vizalar" className="flex items-center gap-2 text-xs text-gold/70 hover:text-gold px-3 py-2 mt-1 transition-colors">
                {isRu ? 'Все страны →' : 'Barcha mamlakatlar →'}
              </Link>
            </div>
          </div>

          {/* Blog link */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">
              {isRu ? 'Полезные статьи' : 'Foydali maqolalar'}
            </p>
            <Link to={blogLink} className="text-xs text-gold/70 hover:text-gold transition-colors">
              {isRu ? 'Читать блог о визах →' : 'Viza haqida blog maqolalar →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
