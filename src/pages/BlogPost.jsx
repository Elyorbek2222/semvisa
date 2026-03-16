import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
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

  const idx = blogPosts.findIndex(p => p.slug === slug)
  const related = blogPosts.filter((_, i) => i !== idx).slice(0, 2)
  const prev = blogPosts[idx - 1] ?? null
  const next = blogPosts[idx + 1] ?? null

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{post.metaTitle || post.title} | SEM VISA</title>
        <meta name="description" content={post.metaDesc || post.excerpt} />
        {post.keywords && <meta name="keywords" content={post.keywords} />}
        <link rel="canonical" href={`https://semvisa.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDesc || post.excerpt} />
        <meta property="og:url" content={`https://semvisa.vercel.app/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.metaDesc || post.excerpt,
          "datePublished": post.date,
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
            Blog
          </Link>
        </div>
      </nav>

      {/* Article header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || ''}`}>
              {post.category}
            </span>
            <span className="text-[11px] text-white/20">{formatDate(post.date)}</span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1 text-[11px] text-white/20">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="5.5" cy="5.5" r="4.5"/>
                <path d="M5.5 3v2.5l1.5 1.5"/>
              </svg>
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-[1.2]">
            {post.title}
          </h1>

          <blockquote className="mt-5 flex gap-4 bg-gold/5 border border-gold/15 rounded-xl px-5 py-4">
            <span className="text-gold/40 text-3xl font-serif leading-none mt-1 shrink-0">"</span>
            <p className="text-[14px] text-white/50 leading-relaxed italic">
              {post.excerpt}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="space-y-1">
          {renderContent(post.content)}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 via-surface to-surface overflow-hidden">
          <div className="p-7 md:p-9">
            <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">Bepul konsultatsiya</p>
            <h3 className="text-xl font-extrabold text-white">Sizning holatingizni tahlil qilaylik</h3>
            <p className="mt-2 text-sm text-white/40 leading-relaxed max-w-md">
              Maqolada yozilgan holatga tushib qoldingizmi? Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/#booking" className="btn-gold inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                Ariza qoldirish
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
                </svg>
              </Link>
              <Link to="/blog" className="btn-outline-gold inline-flex items-center gap-2">
                Boshqa maqolalar
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
                  Oldingi maqola
                </span>
                <p className="text-[13px] font-semibold text-white/70 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                  {prev.title}
                </p>
              </Link>
            ) : <div />}

            {next ? (
              <Link to={`/blog/${next.slug}`} className="group flex flex-col gap-2 p-5 rounded-2xl border border-border bg-surface hover:border-gold/30 transition-all text-right">
                <span className="flex items-center justify-end gap-1.5 text-[11px] text-white/25 group-hover:text-gold/60 transition-colors">
                  Keyingi maqola
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.5 2.5L8 6l-3.5 3.5"/>
                  </svg>
                </span>
                <p className="text-[13px] font-semibold text-white/70 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                  {next.title}
                </p>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] text-white/25 uppercase tracking-widest">Shuningdek o'qing</span>
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
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[p.category] || ''}`}>
                    {p.category}
                  </span>
                  <p className="mt-3 text-[13px] font-bold text-white/75 group-hover:text-white line-clamp-2 leading-snug transition-colors">
                    {p.title}
                  </p>
                  <p className="mt-2 text-[11px] text-white/25">{p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
