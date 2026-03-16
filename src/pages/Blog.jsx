import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const CATEGORY_COLORS = {
  'AQSH Vizasi':           'text-sky-400   bg-sky-400/8   border-sky-400/25',
  'Shengen Vizasi':        'text-violet-400 bg-violet-400/8 border-violet-400/25',
  'Intervyu Tayyorgarligi':'text-emerald-400 bg-emerald-400/8 border-emerald-400/25',
  'Kanada Vizasi':         'text-rose-400  bg-rose-400/8  border-rose-400/25',
  'Buyuk Britaniya Vizasi':'text-gold      bg-gold/8      border-gold/25',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function NavBar() {
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
            Bepul maslahat
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 9.5L3.5 6 7 2.5"/>
            </svg>
            Bosh sahifa
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function Blog() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="min-h-screen bg-bg">
      <NavBar />

      {/* Page header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            BLOG
          </span>
          <h1 className="mt-4 text-3xl md:text-[44px] font-extrabold leading-tight text-white">
            Viza bo'yicha{' '}
            <span className="gold-gradient">foydali ma'lumotlar</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/40 max-w-lg leading-relaxed">
            Mutaxassislarimizdan amaliy maslahatlar, lifehacklar va viza olishda muvaffaqiyatga erishish sirlari.
          </p>
          <div className="mt-6 flex items-center gap-6 text-[11px] text-white/25">
            <span><span className="text-gold font-bold text-sm">{blogPosts.length}</span> ta maqola</span>
            <span className="w-px h-3 bg-border" />
            <span>Har hafta yangilanadi</span>
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
                Tavsiya etiladi
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
                <span>{formatDate(featured.date)}</span>
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
                Maqolani o'qish
                <svg className="group-hover:translate-x-1 transition-transform duration-200" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
                </svg>
              </span>
            </div>
          </div>
          {/* Bottom gold accent line */}
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
              {/* Left gold accent */}
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
                    <span>{formatDate(post.date)}</span>
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
            <p className="text-[10px] text-gold/60 uppercase tracking-widest font-bold mb-2">Bepul konsultatsiya</p>
            <h3 className="text-xl font-extrabold text-white">Savolingiz bormi?</h3>
            <p className="mt-1.5 text-sm text-white/40 max-w-sm leading-relaxed">
              Mutaxassisimiz sizning holatingizni bepul tahlil qiladi va natija ehtimolini aytib beradi.
            </p>
          </div>
          <Link
            to="/#booking"
            className="btn-gold shrink-0 inline-flex items-center gap-2 shadow-[0_4px_24px_rgba(212,175,55,0.2)]"
          >
            Bepul maslahat olish
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  )
}
