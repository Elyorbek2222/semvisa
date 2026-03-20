import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogPosts } from '../data/blogPosts'
import { blogPostsRu } from '../data/blogPostsRu'

function getLang() {
  return localStorage.getItem('semvisa_lang') || 'uz'
}

const CATEGORY_COLORS = {
  // UZ
  'AQSH Vizasi':           'text-sky-400   bg-sky-400/8   border-sky-400/25',
  'Shengen Vizasi':        'text-violet-400 bg-violet-400/8 border-violet-400/25',
  'Intervyu Tayyorgarligi':'text-emerald-400 bg-emerald-400/8 border-emerald-400/25',
  'Kanada Vizasi':         'text-rose-400  bg-rose-400/8  border-rose-400/25',
  'Buyuk Britaniya Vizasi':'text-gold      bg-gold/8      border-gold/25',
  'Rad Javobi':            'text-red-400   bg-red-400/8   border-red-400/25',
  'BAA Vizasi':            'text-amber-400 bg-amber-400/8 border-amber-400/25',
  // RU
  'Виза в США':            'text-sky-400   bg-sky-400/8   border-sky-400/25',
  'Шенгенская виза':       'text-violet-400 bg-violet-400/8 border-violet-400/25',
  'Виза в Великобританию': 'text-gold      bg-gold/8      border-gold/25',
  'Виза в Канаду':         'text-rose-400  bg-rose-400/8  border-rose-400/25',
  'Отказ в визе':          'text-red-400   bg-red-400/8   border-red-400/25',
  'ОАЭ / Дубай':           'text-amber-400 bg-amber-400/8 border-amber-400/25',
  'Безвизовые страны':     'text-emerald-400 bg-emerald-400/8 border-emerald-400/25',
  'Таиланд / ЮВА':         'text-teal-400  bg-teal-400/8  border-teal-400/25',
  'Виза в Корею':          'text-pink-400  bg-pink-400/8  border-pink-400/25',
  'Финансовые документы':  'text-cyan-400  bg-cyan-400/8  border-cyan-400/25',
}

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function getLocalizedPost(post, isRu) {
  const ru = blogPostsRu[post.slug]
  if (isRu && ru) {
    return {
      ...post,
      title: ru.titleRu,
      excerpt: ru.excerptRu,
      category: ru.categoryRu,
      readTime: ru.readTimeRu,
    }
  }
  return post
}

function NavBar({ isRu }) {
  return (
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

        <div className="flex items-center gap-5">
          <Link to="/#booking" className="hidden sm:block text-sm text-white/50 hover:text-white transition-colors">
            {isRu ? 'Бесплатная консультация' : 'Bepul maslahat'}
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 9.5L3.5 6 7 2.5"/>
            </svg>
            {isRu ? 'Главная' : 'Bosh sahifa'}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function Blog() {
  const lang = getLang()
  const isRu = lang === 'ru'

  const localizedPosts = blogPosts.map(p => getLocalizedPost(p, isRu))
  const [featured, ...rest] = localizedPosts

  const metaTitle = isRu
    ? 'Блог — Советы по визам | SEM VISA Consulting'
    : "Blog — Viza bo'yicha maslahatlar | SEM VISA Consulting"
  const metaDesc = isRu
    ? 'Блог SEM VISA: советы и лайфхаки по получению виз в США, Шенген, Великобританию, Канаду, ОАЭ. Реальный опыт и профессиональные рекомендации.'
    : "SEM VISA blogida AQSH, Shengen, Buyuk Britaniya, Kanada, Dubai vizalari haqida amaliy maslahatlar, lifehacklar va mutaxassis tavsiyalari."

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={isRu
          ? 'блог виза, виза США, шенгенская виза, виза Канада, Дубай виза, консультация виза Ташкент'
          : "viza blog, AQSH vizasi, Shengen vizasi, Kanada vizasi, Dubai vizasi, viza maslahat Toshkent"} />
        <link rel="canonical" href="https://semvisa.vercel.app/blog" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content="https://semvisa.vercel.app/blog" />
        <meta property="og:type" content="website" />
      </Helmet>
      <NavBar isRu={isRu} />

      {/* Page header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            {isRu ? 'БЛОГ' : 'BLOG'}
          </span>
          <h1 className="mt-4 text-3xl md:text-[44px] font-extrabold leading-tight text-white">
            {isRu ? 'Полезная информация' : "Viza bo'yicha"}{' '}
            <span className="gold-gradient">
              {isRu ? 'о визах' : "foydali ma'lumotlar"}
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/40 max-w-lg leading-relaxed">
            {isRu
              ? 'Практические советы, лайфхаки и секреты успешного получения визы от наших специалистов.'
              : "Mutaxassislarimizdan amaliy maslahatlar, lifehacklar va viza olishda muvaffaqiyatga erishish sirlari."}
          </p>
          <div className="mt-6 flex items-center gap-6 text-[11px] text-white/25">
            <span>
              <span className="text-gold font-bold text-sm">{blogPosts.length}</span>{' '}
              {isRu ? 'статей' : "ta maqola"}
            </span>
            <span className="w-px h-3 bg-border" />
            <span>{isRu ? 'Обновляется каждую неделю' : 'Har hafta yangilanadi'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-10">

        {/* Featured post */}
        <Link
          to={`/blog/${featured.slug}`}
          className="group block rounded-2xl border border-border bg-surface overflow-hidden hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.06)]"
        >
          <div className="p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-gold bg-gold/10 border border-gold/25 px-3 py-1 rounded-full uppercase tracking-widest">
                {isRu ? 'Рекомендуем' : 'Tavsiya etiladi'}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${CATEGORY_COLORS[featured.category] || ''}`}>
                {featured.category}
              </span>
            </div>

            <h2 className="text-xl md:text-3xl font-extrabold text-white leading-snug group-hover:text-gold transition-colors duration-300 max-w-2xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/45 leading-relaxed max-w-2xl line-clamp-2">
              {featured.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[11px] text-white/25">
                <span>{formatDate(featured.date, lang)}</span>
                <span className="w-px h-3 bg-border" />
                <span className="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <circle cx="5.5" cy="5.5" r="4.5"/>
                    <path d="M5.5 3v2.5l1.5 1.5"/>
                  </svg>
                  {featured.readTime}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gold/60 group-hover:text-gold transition-colors">
                {isRu ? 'Читать статью' : "Maqolani o'qish"}
                <svg className="group-hover:translate-x-1 transition-transform duration-200" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
                </svg>
              </span>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-300 rounded-full" />

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || ''}`}>
                    {post.category}
                  </span>
                  <span className="text-[10px] text-white/20 font-mono">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                </div>

                <h2 className="text-[15px] font-bold text-white leading-snug group-hover:text-gold transition-colors duration-300 flex-1">
                  {post.title}
                </h2>

                <p className="text-[13px] text-white/35 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-white/20">
                    <span>{formatDate(post.date, lang)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <circle cx="5" cy="5" r="4"/>
                        <path d="M5 2.5V5l1.5 1.5"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                  <svg className="text-white/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl border border-gold/15 bg-gradient-to-br from-gold/5 via-surface to-surface p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] text-gold/60 uppercase tracking-widest font-bold mb-2">
              {isRu ? 'Бесплатная консультация' : 'Bepul konsultatsiya'}
            </p>
            <h3 className="text-xl font-extrabold text-white">
              {isRu ? 'Есть вопросы?' : 'Savolingiz bormi?'}
            </h3>
            <p className="mt-1.5 text-sm text-white/40 max-w-sm leading-relaxed">
              {isRu
                ? 'Наш специалист бесплатно проанализирует вашу ситуацию и оценит шансы на получение визы.'
                : "Mutaxassisimiz sizning holatingizni bepul tahlil qiladi va natija ehtimolini aytib beradi."}
            </p>
          </div>
          <Link
            to="/#booking"
            className="btn-gold shrink-0 inline-flex items-center gap-2 shadow-[0_4px_24px_rgba(212,175,55,0.2)]"
          >
            {isRu ? 'Получить консультацию' : 'Bepul maslahat olish'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  )
}
