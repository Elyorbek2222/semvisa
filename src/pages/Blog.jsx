import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const CATEGORY_COLORS = {
  'AQSH Vizasi': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Shengen Vizasi': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Intervyu Tayyorgarligi': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Kanada Vizasi': 'text-red-400 bg-red-400/10 border-red-400/20',
  'Buyuk Britaniya Vizasi': 'text-gold bg-gold/10 border-gold/20',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
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
          <Link to="/" className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 11L5 7l4-4"/>
            </svg>
            Bosh sahifa
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"/>
            BLOG
          </span>
          <h1 className="mt-4 font-sans text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Viza bo'yicha{' '}
            <span className="gold-gradient">foydali ma'lumotlar</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/45 max-w-xl leading-relaxed">
            Mutaxassislarimizdan amaliy maslahatlar, lifehacklar va viza olishda muvaffaqiyatga erishish sirlari.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card p-6 flex flex-col gap-4 hover:border-gold/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Category */}
              <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || 'text-gold bg-gold/10 border-gold/20'}`}>
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-base font-bold text-white leading-snug group-hover:text-gold transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-white/40 leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-3 text-[11px] text-white/25">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium text-gold/70 group-hover:text-gold transition-colors">
                  O'qish
                  <svg className="transform group-hover:translate-x-0.5 transition-transform" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.5 6h7M6 3l3 3-3 3"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card p-8 text-center">
          <h3 className="text-xl font-bold text-white">Savolingiz bormi?</h3>
          <p className="mt-2 text-sm text-white/40 max-w-md mx-auto">
            Bepul konsultatsiya oling — mutaxassisimiz sizning holatingizni tahlil qiladi.
          </p>
          <Link to="/#booking" className="btn-gold inline-flex items-center gap-2 mt-5">
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
