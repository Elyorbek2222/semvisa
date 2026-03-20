import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

/* ─── Markdown renderer ─────────────────────────── */
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold text-white/90">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-surface-2 text-gold px-1.5 py-0.5 rounded text-[13px] font-mono">{part.slice(1, -1)}</code>
    return part
  })
}

function renderContent(content) {
  const lines = content.trim().split('\n')
  const elements = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-[15px] font-bold text-white/90 mt-8 mb-2">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="flex items-center gap-3 text-lg md:text-xl font-extrabold text-white mt-10 mb-4">
          <span className="w-1 h-6 bg-gold rounded-full shrink-0" />
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**') && line.slice(2, -2).indexOf('**') === -1) {
      elements.push(
        <p key={key++} className="font-bold text-white/90 mt-5 mb-1 text-[15px]">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="flex items-start gap-2.5 text-[14px] text-white/55 leading-relaxed py-0.5">
          <span className="mt-2 w-1 h-1 rounded-full bg-gold/60 shrink-0" />
          <span>{renderInline(line.slice(2))}</span>
        </li>
      )
    } else if (/^\d+\. /.test(line)) {
      const num = line.match(/^(\d+)\./)[1]
      elements.push(
        <li key={key++} className="flex items-start gap-3 text-[14px] text-white/55 leading-relaxed py-1">
          <span className="shrink-0 w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[10px] font-bold text-gold mt-0.5">
            {num}
          </span>
          <span>{renderInline(line.replace(/^\d+\. /, ''))}</span>
        </li>
      )
    } else if (line.startsWith('| ') && line.includes(' | ')) {
      if (line.includes('---')) continue
      const cells = line.split('|').map(c => c.trim()).filter(Boolean)
      const isHeader = lines[i + 1]?.includes('---')
      elements.push(
        <tr key={key++} className={isHeader ? 'border-b border-gold/20' : 'border-b border-border last:border-0'}>
          {cells.map((cell, ci) => isHeader ? (
            <th key={ci} className="text-left px-4 py-3 text-[11px] font-bold text-gold/70 uppercase tracking-wider bg-gold/5">
              {cell}
            </th>
          ) : (
            <td key={ci} className="px-4 py-3 text-[13px] text-white/55 leading-relaxed">
              {renderInline(cell)}
            </td>
          ))}
        </tr>
      )
    } else if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(line)) {
      const m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      elements.push(
        <img key={key++} src={m[2]} alt={m[1]}
          className="w-full rounded-2xl my-6 border border-border object-cover max-h-72"
          loading="lazy" />
      )
    } else if (line === '') {
      elements.push(<div key={key++} className="h-3" />)
    } else {
      elements.push(
        <p key={key++} className="text-[14px] md:text-[15px] text-white/55 leading-[1.85]">
          {renderInline(line)}
        </p>
      )
    }
  }

  // wrap <tr> into tables
  const wrapped = []
  let tableRows = []
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].type === 'tr') {
      tableRows.push(elements[i])
    } else {
      if (tableRows.length) {
        wrapped.push(
          <div key={`tbl-${i}`} className="overflow-x-auto my-6 rounded-xl border border-border">
            <table className="w-full">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        )
        tableRows = []
      }
      wrapped.push(elements[i])
    }
  }
  if (tableRows.length) {
    wrapped.push(
      <div key="tbl-end" className="overflow-x-auto my-6 rounded-xl border border-border">
        <table className="w-full"><tbody>{tableRows}</tbody></table>
      </div>
    )
  }
  return wrapped
}
/* ─────────────────────────────────────────────────── */

function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border">
      <div
        className="h-full bg-gradient-to-r from-gold/80 to-gold transition-all duration-75"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const lang = getLang()
  const isRu = lang === 'ru'
  const ru = blogPostsRu[post.slug]

  // Localized fields
  const title    = isRu && ru ? ru.titleRu    : post.title
  const excerpt  = isRu && ru ? ru.excerptRu  : post.excerpt
  const category = isRu && ru ? ru.categoryRu : post.category
  const readTime = isRu && ru ? ru.readTimeRu : post.readTime
  const metaTitle = isRu && ru ? ru.metaTitleRu : (post.metaTitle || post.title)
  const metaDesc  = isRu && ru ? ru.metaDescRu  : (post.metaDesc  || post.excerpt)
  const keywords  = isRu && ru ? ru.keywordsRu  : post.keywords
  const content   = isRu && ru ? ru.contentRu   : post.content

  const idx = blogPosts.findIndex(p => p.slug === slug)
  const related = blogPosts.filter((_, i) => i !== idx).slice(0, 2)
  const prev = blogPosts[idx - 1] ?? null
  const next = blogPosts[idx + 1] ?? null

  const getRelTitle = (p) => isRu && blogPostsRu[p.slug] ? blogPostsRu[p.slug].titleRu : p.title
  const getRelCat   = (p) => isRu && blogPostsRu[p.slug] ? blogPostsRu[p.slug].categoryRu : p.category

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{metaTitle} | SEM VISA</title>
        <meta name="description" content={metaDesc} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={`https://semvisa.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={`https://semvisa.vercel.app/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        {post.heroImage && <meta property="og:image" content={post.heroImage} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": metaDesc,
          "datePublished": post.date,
          "inLanguage": isRu ? "ru" : "uz",
          "author": { "@type": "Organization", "name": "SEM VISA Consulting" },
          "publisher": {
            "@type": "Organization",
            "name": "SEM VISA Consulting",
            "url": "https://semvisa.vercel.app"
          },
          "mainEntityOfPage": `https://semvisa.vercel.app/blog/${post.slug}`
        })}</script>
      </Helmet>
      <ReadingProgress />

      {/* NavBar */}
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
          <Link
            to="/blog"
            className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 9.5L3.5 6 7 2.5"/>
            </svg>
            {isRu ? 'Блог' : 'Blog'}
          </Link>
        </div>
      </nav>

      {/* Article header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${CATEGORY_COLORS[category] || ''}`}>
              {category}
            </span>
            <span className="text-[11px] text-white/20">{formatDate(post.date, lang)}</span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1 text-[11px] text-white/20">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="5.5" cy="5.5" r="4.5"/>
                <path d="M5.5 3v2.5l1.5 1.5"/>
              </svg>
              {readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-[1.2]">
            {title}
          </h1>

          {post.heroImage && (
            <div className="mt-6 rounded-2xl overflow-hidden border border-border">
              <img src={post.heroImage} alt={title}
                className="w-full object-cover max-h-64 md:max-h-80" loading="lazy" />
            </div>
          )}

          <blockquote className="mt-5 flex gap-4 bg-gold/5 border border-gold/15 rounded-xl px-5 py-4">
            <span className="text-gold/40 text-3xl font-serif leading-none mt-1 shrink-0">"</span>
            <p className="text-[14px] text-white/50 leading-relaxed italic">
              {excerpt}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="space-y-1">
          {renderContent(content)}
        </div>

        {/* Share buttons */}
        {(() => {
          const url = encodeURIComponent(`https://semvisa.vercel.app/blog/${post.slug}`)
          const shareTitle = encodeURIComponent(title)
          return (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-[11px] text-white/25 uppercase tracking-widest">
                {isRu ? 'Поделиться:' : 'Ulashish:'}
              </span>
              <a
                href={`https://t.me/share/url?url=${url}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface hover:border-sky-400/40 hover:text-sky-400 text-white/50 text-xs font-medium transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
                </svg>
                Telegram
              </a>
              <a
                href={`https://wa.me/?text=${shareTitle}%20${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface hover:border-emerald-400/40 hover:text-emerald-400 text-white/50 text-xs font-medium transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          )
        })()}

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 via-surface to-surface overflow-hidden">
          <div className="p-7 md:p-9">
            <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">
              {isRu ? 'Бесплатная консультация' : 'Bepul konsultatsiya'}
            </p>
            <h3 className="text-xl font-extrabold text-white">
              {isRu ? 'Разберём вашу ситуацию' : 'Sizning holatingizni tahlil qilaylik'}
            </h3>
            <p className="mt-2 text-sm text-white/40 leading-relaxed max-w-md">
              {isRu
                ? 'Попали в описанную в статье ситуацию? Наш специалист свяжется с вами в течение 24 часов.'
                : "Maqolada yozilgan holatga tushib qoldingizmi? Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/#booking" className="btn-gold inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                {isRu ? 'Оставить заявку' : 'Ariza qoldirish'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
                </svg>
              </Link>
              <Link to="/blog" className="btn-outline-gold inline-flex items-center gap-2">
                {isRu ? 'Другие статьи' : 'Boshqa maqolalar'}
              </Link>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="group flex flex-col gap-2 p-5 rounded-2xl border border-border bg-surface hover:border-gold/30 transition-all">
                <span className="flex items-center gap-1.5 text-[11px] text-white/25 group-hover:text-gold/60 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7.5 9.5L4 6l3.5-3.5"/>
                  </svg>
                  {isRu ? 'Предыдущая статья' : 'Oldingi maqola'}
                </span>
                <p className="text-[13px] font-semibold text-white/70 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                  {getRelTitle(prev)}
                </p>
              </Link>
            ) : <div />}

            {next ? (
              <Link to={`/blog/${next.slug}`} className="group flex flex-col gap-2 p-5 rounded-2xl border border-border bg-surface hover:border-gold/30 transition-all text-right">
                <span className="flex items-center justify-end gap-1.5 text-[11px] text-white/25 group-hover:text-gold/60 transition-colors">
                  {isRu ? 'Следующая статья' : 'Keyingi maqola'}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.5 2.5L8 6l-3.5 3.5"/>
                  </svg>
                </span>
                <p className="text-[13px] font-semibold text-white/70 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                  {getRelTitle(next)}
                </p>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] text-white/25 uppercase tracking-widest">
                {isRu ? 'Также читайте' : "Shuningdek o'qing"}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(p => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group relative p-5 rounded-2xl border border-border bg-surface hover:border-gold/30 transition-all overflow-hidden"
                >
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-gold/0 group-hover:bg-gold/40 transition-all rounded-full" />
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[getRelCat(p)] || ''}`}>
                    {getRelCat(p)}
                  </span>
                  <p className="mt-3 text-[13px] font-bold text-white/75 group-hover:text-white line-clamp-2 leading-snug transition-colors">
                    {getRelTitle(p)}
                  </p>
                  <p className="mt-2 text-[11px] text-white/25">
                    {isRu && blogPostsRu[p.slug] ? blogPostsRu[p.slug].readTimeRu : p.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
