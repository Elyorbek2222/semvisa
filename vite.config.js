import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { blogPosts } from './src/data/blogPosts.js'
import { countries } from './src/data/countries.js'

const BASE = 'https://semvisa.vercel.app'

function esc(str) {
  if (!str) return ''
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function jsonld(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
}

function injectSEO(html, { title, desc, url, ogImage, extraHead = '' }) {
  const img = ogImage || `${BASE}/og-image.png`
  let r = html
  r = r.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  r = r.replace(/<meta name="description"[^>]*\/?>/,   `<meta name="description" content="${esc(desc)}">`)
  r = r.replace(/<meta property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${esc(title)}">`)
  r = r.replace(/<meta property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${esc(desc)}">`)
  r = r.replace(/<meta property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${url}">`)
  r = r.replace(/<meta property="og:image"[^>]*\/?>/, `<meta property="og:image" content="${img}">`)
  r = r.replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${url}">`)
  r = r.replace(/<meta name="twitter:title"[^>]*\/?>/, `<meta name="twitter:title" content="${esc(title)}">`)
  r = r.replace(/<meta name="twitter:description"[^>]*\/?>/, `<meta name="twitter:description" content="${esc(desc)}">`)
  r = r.replace(/<meta name="twitter:image"[^>]*\/?>/, `<meta name="twitter:image" content="${img}">`)
  if (extraHead) r = r.replace('</head>', `${extraHead}\n</head>`)
  return r
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/icon.svg', 'icons/apple-touch-icon-180x180.png'],
      manifest: {
        name: 'SEM VISA Consulting',
        short_name: 'SEM VISA',
        description: 'Toshkentda viza konsaltingi. AQSH, Shengen, Buyuk Britaniya, Kanada vizalari. 98% muvaffaqiyat.',
        theme_color: '#0F1115',
        background_color: '#0F1115',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'uz',
        categories: ['business', 'travel'],
        icons: [
          { src: 'icons/pwa-64x64.png',            sizes: '64x64',    type: 'image/png' },
          { src: 'icons/pwa-192x192.png',           sizes: '192x192',  type: 'image/png' },
          { src: 'icons/pwa-512x512.png',           sizes: '512x512',  type: 'image/png' },
          { src: 'icons/maskable-icon-512x512.png', sizes: '512x512',  type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],

  ssgOptions: {
    onPageRendered(route, html) {
      // ── Blog post ─────────────────────────────────────────
      const blogMatch = route.match(/^\/blog\/(.+)$/)
      if (blogMatch) {
        const post = blogPosts.find(p => p.slug === blogMatch[1])
        if (post) {
          const title = `${post.metaTitle || post.title} | SEM VISA`
          const desc  = post.metaDesc || post.excerpt
          const url   = `${BASE}/blog/${post.slug}`
          const schema = jsonld({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.metaDesc || post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'uz',
            image: post.heroImage || `${BASE}/og-image.png`,
            author: { '@type': 'Organization', name: 'SEM VISA Consulting', url: BASE },
            publisher: {
              '@type': 'Organization',
              name: 'SEM VISA Consulting',
              url: BASE,
              logo: { '@type': 'ImageObject', url: `${BASE}/icons/icon.svg`, width: 512, height: 512 },
            },
            mainEntityOfPage: url,
          })
          const breadcrumb = jsonld({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
          })
          return injectSEO(html, { title, desc, url, ogImage: post.heroImage, extraHead: schema + '\n' + breadcrumb })
        }
      }

      // ── Country visa page ─────────────────────────────────
      const vizalarMatch = route.match(/^\/vizalar\/(.+)$/)
      if (vizalarMatch) {
        const country = countries.find(c => c.slug === vizalarMatch[1])
        if (country) {
          const { title, desc } = country.metaUz
          const url  = `${BASE}/vizalar/${country.slug}`
          const name = country.nameUz
          const schema = jsonld({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name,
            serviceType: 'Visa Consulting',
            description: desc,
            url,
            provider: { '@type': 'LocalBusiness', '@id': `${BASE}/#business`, name: 'SEM VISA Consulting' },
            areaServed: { '@type': 'Country', name: 'Uzbekistan' },
          })
          const breadcrumb = jsonld({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Vizalar', item: `${BASE}/vizalar` },
              { '@type': 'ListItem', position: 3, name, item: url },
            ],
          })
          return injectSEO(html, { title, desc, url, ogImage: country.image, extraHead: schema + '\n' + breadcrumb })
        }
      }

      // ── Blog list ─────────────────────────────────────────
      if (route === '/blog') {
        return injectSEO(html, {
          title: "Blog — Viza bo'yicha maslahatlar | SEM VISA Consulting",
          desc:  "SEM VISA blogida AQSH, Shengen, Buyuk Britaniya, Kanada, Dubai vizalari haqida amaliy maslahatlar, lifehacklar va mutaxassis tavsiyalari.",
          url:   `${BASE}/blog`,
        })
      }

      // ── Countries list ────────────────────────────────────
      if (route === '/vizalar') {
        return injectSEO(html, {
          title: "Mamlakatlar bo'yicha vizalar 2026 — Uzbekistondan | SEM VISA",
          desc:  "Barcha vizalar O'zbekistondan: AQSH, Shengen, UK, Kanada, BAA, Tailand, Koreya, Avstraliya, Yaponiya. Kerakli hujjatlar, narxlar, muddatlar.",
          url:   `${BASE}/vizalar`,
        })
      }

      // ── About ─────────────────────────────────────────────
      if (route === '/about') {
        return injectSEO(html, {
          title: "SEM VISA Consulting haqida | Toshkentda viza konsaltingi",
          desc:  "SEM VISA Consulting — 2011 yildan Toshkentda viza konsaltingi. 12 000+ tasdiqlangan viza, birinchi urinishda 98% muvaffaqiyat. Toshkentda 2 filial.",
          url:   `${BASE}/about`,
        })
      }

      // ── Privacy ───────────────────────────────────────────
      if (route === '/privacy') {
        return injectSEO(html, {
          title: "Maxfiylik siyosati | SEM VISA Consulting",
          desc:  "SEM VISA Consulting maxfiylik siyosati — shaxsiy ma'lumotlaringizni qanday to'playmiz, ishlatamiz va himoya qilamiz.",
          url:   `${BASE}/privacy`,
        })
      }

      return html
    },
  },
})
