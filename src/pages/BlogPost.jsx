import { useParams, Link, Navigate } from 'react-router-dom'
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

function renderContent(content) {
  const lines = content.trim().split('\n')
  const elements = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-bold text-white mt-7 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-extrabold text-white mt-10 mb-4 pb-2 border-b border-border">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**') && !line.slice(2).includes('**')) {
      elements.push(
        <p key={key++} className="font-bold text-white/90 mt-4 mb-1">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-white/60 text-sm leading-relaxed ml-4 list-disc">
          {renderInline(line.slice(2))}
        </li>
      )
    } else if (/^\d+\. /.test(line)) {
      elements.push(
        <li key={key++} className="text-white/60 text-sm leading-relaxed ml-4 list-decimal">
          {renderInline(line.replace(/^\d+\. /, ''))}
        </li>
      )
    } else if (line.startsWith('| ') && line.includes(' | ')) {
      // Skip table separator rows
      if (line.includes('---')) continue
      const cells = line.split('|').map(c => c.trim()).filter(Boolean)
      const isHeader = lines[i + 1]?.includes('---')
      elements.push(
        <tr key={key++} className={isHeader ? 'border-b border-gold/30' : 'border-b border-border'}>
          {cells.map((cell, ci) => isHeader ? (
            <th key={ci} className="text-left px-3 py-2 text-xs font-bold text-gold/80 uppercase tracking-wide">
              {cell}
            </th>
          ) : (
            <td key={ci} className="px-3 py-2 text-sm text-white/60">
              {cell}
            </td>
          ))}
        </tr>
      )
    } else if (line === '') {
      elements.push(<div key={key++} className="h-2" />)
    } else {
      elements.push(
        <p key={key++} className="text-white/60 text-sm leading-relaxed">
          {renderInline(line)}
        </p>
      )
    }
  }

  // Wrap table rows
  const wrapped = []
  let tableRows = []
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].type === 'tr') {
      tableRows.push(elements[i])
    } else {
      if (tableRows.length > 0) {
        wrapped.push(
          <div key={`table-${i}`} className="overflow-x-auto my-5">
            <table className="w-full bg-surface-2 rounded-xl overflow-hidden border border-border">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        )
        tableRows = []
      }
      wrapped.push(elements[i])
    }
  }
  if (tableRows.length > 0) {
    wrapped.push(
      <div key="table-end" className="overflow-x-auto my-5">
        <table className="w-full bg-surface-2 rounded-xl overflow-hidden border border-border">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    )
  }

  return wrapped
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-surface-2 text-gold px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>
    }
    return part
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const currentIndex = blogPosts.findIndex(p => p.slug === slug)
  const related = blogPosts.filter((_, i) => i !== currentIndex).slice(0, 2)

  return (
    <div className="min-h-screen bg-bg">
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
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 11L5 7l4-4"/>
            </svg>
            Blog
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        {/* Meta */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || 'text-gold bg-gold/10 border-gold/20'}`}>
              {post.category}
            </span>
            <span className="text-[11px] text-white/25">{formatDate(post.date)}</span>
            <span className="text-[11px] text-white/25">·</span>
            <span className="text-[11px] text-white/25">{post.readTime}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-white/45 leading-relaxed border-l-2 border-gold/30 pl-4">
            {post.excerpt}
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Content */}
        <div className="space-y-1">
          {renderContent(post.content)}
        </div>

        {/* CTA banner */}
        <div className="mt-12 card p-6 bg-gradient-to-br from-gold/5 to-transparent border-gold/20">
          <p className="text-xs text-gold/70 uppercase tracking-widest font-bold mb-2">Bepul konsultatsiya</p>
          <h3 className="text-lg font-bold text-white">Sizning holatingizni tahlil qilaylik</h3>
          <p className="mt-1 text-sm text-white/40 leading-relaxed">
            Maqolada yozilgan holatga tushib qoldingizmi? Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi.
          </p>
          <Link to="/#booking" className="btn-gold inline-flex items-center gap-2 mt-4 text-sm">
            Ariza qoldirish
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
            </svg>
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <p className="text-[11px] text-white/30 uppercase tracking-widest mb-4">Shuningdek o'qing</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(p => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="card p-4 hover:border-gold/30 transition-all group"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[p.category] || 'text-gold bg-gold/10 border-gold/20'}`}>
                    {p.category}
                  </span>
                  <p className="mt-2 text-sm font-bold text-white/80 group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {p.title}
                  </p>
                  <p className="mt-1 text-[11px] text-white/30">{p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
