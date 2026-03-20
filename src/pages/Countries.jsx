import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { countries } from '../data/countries'

function getLang() {
  if (typeof window === 'undefined') return 'uz'
  return localStorage.getItem('semvisa_lang') || 'uz'
}

const DIFF_COLOR = {
  easy:   'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  hard:   'text-red-400 bg-red-400/10 border-red-400/25',
}

export default function Countries() {
  const lang = getLang()
  const isRu = lang === 'ru'

  const title = isRu
    ? 'Визы по странам 2026 — из Узбекистана | SEM VISA'
    : 'Mamlakatlar bo\'yicha vizalar 2026 — Uzbekistondan | SEM VISA'
  const desc = isRu
    ? 'Все визы из Узбекистана: США, Шенген, Великобритания, Канада, ОАЭ, Таиланд, Корея, Австралия, Япония. Необходимые документы, стоимость, сроки.'
    : 'Barcha vizalar O\'zbekistondan: AQSH, Shengen, UK, Kanada, BAA, Tailand, Koreya, Avstraliya, Yaponiya. Kerakli hujjatlar, narxlar, muddatlar.'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isRu ? 'Визы по странам' : 'Mamlakatlar bo\'yicha vizalar',
    description: desc,
    url: 'https://semvisa.vercel.app/vizalar',
    numberOfItems: countries.length,
    itemListElement: countries.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isRu ? c.nameRu : c.nameUz,
      url: `https://semvisa.vercel.app/vizalar/${c.slug}`,
    })),
  }

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href="https://semvisa.vercel.app/vizalar" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
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
            <Link to="/blog" className="text-sm text-white/50 hover:text-white transition-colors hidden md:block">
              Blog
            </Link>
            <Link to="/#booking" className="btn-gold text-xs px-4 py-2">
              {isRu ? 'Консультация →' : 'Konsultatsiya →'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full"/>
            {isRu ? 'Направления 2026' : 'Yo\'nalishlar 2026'}
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white">
            {isRu ? 'Визы по ' : 'Mamlakatlar bo\'yicha '}
            <span className="text-gold">{isRu ? 'странам' : 'vizalar'}</span>
          </h1>
          <p className="mt-3 text-sm text-white/40 max-w-xl leading-relaxed">
            {isRu
              ? 'Выберите страну — узнайте всё о визе: документы, стоимость, сроки, пошаговый процесс.'
              : 'Mamlakatni tanlang — viza haqida hamma narsa: hujjatlar, narx, muddat, qadamma-qadam jarayon.'}
          </p>

          {/* Difficulty legend */}
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { key: 'easy',   labelUz: 'Oson',       labelRu: 'Легко' },
              { key: 'medium', labelUz: 'O\'rtacha',  labelRu: 'Средне' },
              { key: 'hard',   labelUz: 'Qiyin',      labelRu: 'Сложно' },
            ].map(d => (
              <span key={d.key} className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${DIFF_COLOR[d.key]}`}>
                {isRu ? d.labelRu : d.labelUz}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Country grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {countries.map(c => (
            <Link
              key={c.slug}
              to={`/vizalar/${c.slug}`}
              className="group relative rounded-2xl border border-border bg-surface overflow-hidden hover:border-gold/30 transition-all hover:shadow-[0_4px_24px_rgba(212,175,55,0.08)]"
            >
              {/* Country image */}
              <div className="h-40 overflow-hidden">
                <img src={c.image} alt={isRu ? c.nameRu : c.nameUz}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  loading="lazy" />
                <div className="absolute inset-0 h-40 bg-gradient-to-t from-surface via-surface/40 to-transparent"/>
              </div>

              <div className="p-5 -mt-2 relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.flag}</span>
                    <h2 className="text-sm font-extrabold text-white group-hover:text-gold transition-colors">
                      {isRu ? c.nameRu : c.nameUz}
                    </h2>
                  </div>
                  <span className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${DIFF_COLOR[c.difficulty]}`}>
                    {isRu ? c.difficultyRu : c.difficultyUz}
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-white/30">{c.visaType}</p>

                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3">
                  {[
                    { l: isRu ? 'Сбор' : 'To\'lov', v: c.fee },
                    { l: isRu ? 'Срок' : 'Muddat', v: isRu ? c.processingTimeRu : c.processingTimeUz },
                    { l: isRu ? 'Успех' : 'Natija', v: c.successRate },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <p className="text-[9px] text-white/25 uppercase tracking-wider">{l}</p>
                      <p className="text-xs font-bold text-gold mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] text-white/30 group-hover:text-gold/70 transition-colors">
                  {isRu ? 'Подробнее' : 'Batafsil'}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 via-surface to-surface p-7 md:p-9 text-center">
          <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">
            {isRu ? 'Бесплатная консультация' : 'Bepul konsultatsiya'}
          </p>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {isRu
              ? 'Не знаете с чего начать?'
              : 'Qayerdan boshlashni bilmaysizmi?'}
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-md mx-auto">
            {isRu
              ? 'Наш специалист бесплатно проанализирует ваш случай и подскажет оптимальный путь.'
              : 'Mutaxassisimiz sizning holatingizni bepul tahlil qiladi va eng to\'g\'ri yo\'lni ko\'rsatadi.'}
          </p>
          <Link to="/#booking" className="btn-gold inline-flex items-center gap-2 mt-5 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
            {isRu ? 'Оставить заявку' : 'Ariza qoldirish'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
