# SEM VISA — SEO Audit Hisoboti
**Sana:** 2026-03-20
**Sayt:** https://semvisa.vercel.app
**Biznes:** Local Service — Visa Consulting, Toshkent

---

## 📊 SEO Health Score: 62 / 100

| Kategoriya | Vazn | Ball |
|---|---|---|
| Technical SEO | 22% | 54/100 |
| Content Quality (E-E-A-T) | 23% | 71/100 |
| On-Page SEO | 20% | 65/100 |
| Schema / Structured Data | 10% | 55/100 |
| Performance (CWV) | 10% | 65/100 |
| AI Search Readiness (GEO) | 10% | 68/100 |
| Images | 5% | 70/100 |

---

## 🔴 CRITICAL (Darhol tuzatish)

### C-1 — vercel.json rewrite xatosi ✅ DONE (2026-03-20)
**Muammo:** 23/24 sahifa 404 qaytaradi. `vite-react-ssg` `dist/blog.html` yaratadi, lekin rewrite `/blog/index.html` qidiradi.
**Fayl:** `vercel.json`
**Fix:**
```json
// Eski:
"destination": "/$1/index.html"
// Yangi:
"destination": "/$1.html"
```
**Ta'sir:** Barcha blog, vizalar sahifalari Google'da indekslanadi.

---

### C-2 — og:image 404 ✅ PENDING
**Muammo:** `/og-image.png` `public/` da yo'q. Barcha OG preview singan.
**Fayl:** `public/og-image.png`
**Fix:** 1200×630px rasm yaratib `public/og-image.png` sifatida joylash.
**Ta'sir:** Google, Telegram, WhatsApp previewlar tuzaladi.

---

### C-3 — reviewCount: 12000 spam signal ✅ PENDING
**Muammo:** Schema'da `reviewCount: 12000` ko'rsatilgan, lekin 3rd-party review manba yo'q. Google manual action berishi mumkin.
**Fayl:** `index.html` (LocalBusiness schema)
**Fix:** Haqiqiy review platformasi (Google Maps, 2GIS) `sameAs` bilan qo'shish yoki `reviewCount` ni real raqamga o'zgartirish.

---

### C-4 — Rus tili Google'da ko'rinmaydi ✅ PENDING
**Muammo:** `localStorage` orqali til almashtirish — crawlerlar faqat O'zbek versiyasini ko'radi.
**Fix (katta ish):** `/ru/` prefix bilan alohida static route'lar yaratish.

---

## 🟠 HIGH (1 hafta ichida)

### H-1 — Blog post so'z soni kam ✅ PENDING
**Muammo:** 600-750 so'z (minimum 1500 bo'lishi kerak).
**Fayl:** `src/data/blogPosts.js`
**Fix:** Har bir postga +750-900 so'z qo'shish: case study, Q&A, SEM VISA jarayon bo'limi.

### H-2 — CountryVisa FAQPage schema yo'q ✅ PENDING
**Muammo:** Har bir mamlakat sahifasida 4-5 savol bor, lekin JSON-LD schema yo'q.
**Fayl:** `src/pages/CountryVisa.jsx`
**Fix:** `faqSchema` ob'ekti qo'shish va `<Helmet>` ga inject qilish.
```js
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }))
}
```

### H-3 — Hero H1 rus foydalanuvchi uchun o'zbekcha ✅ PENDING
**Muammo:** `Hero.jsx` da H1 hardcoded o'zbek tilida.
**Fayl:** `src/components/Hero.jsx`
**Fix:** `isRu` conditional qo'shish.

### H-4 — SearchAction non-functional ✅ PENDING
**Muammo:** `index.html` da `/blog?q=` SearchAction bor, lekin Blog.jsx da search logic yo'q.
**Fayl:** `index.html` (WebSite schema)
**Fix:** SearchAction'ni o'chirish yoki blog'da search qo'shish.

### H-5 — CountryVisa H1 keyword yo'q ✅ PENDING
**Muammo:** H1 = `"AQSH (Amerika)"` — faqat mamlakat nomi, keyword emas.
**Fayl:** `src/pages/CountryVisa.jsx`
**Fix:** H1 = `"AQSH vizasi — B1/B2 | SEM VISA"` ko'rinishida.

### H-6 — CSP header yo'q ✅ PENDING
**Fayl:** `vercel.json`
**Fix:** `Content-Security-Policy` header qo'shish.

### H-7 — hreflang teglari yo'q ✅ PENDING
**Fayl:** `index.html`
**Fix (minimal):**
```html
<link rel="alternate" hreflang="uz" href="https://semvisa.vercel.app/" />
<link rel="alternate" hreflang="ru" href="https://semvisa.vercel.app/" />
<link rel="alternate" hreflang="x-default" href="https://semvisa.vercel.app/" />
```

### H-8 — BlogPosting author Organization → Person ✅ PENDING
**Fayl:** `src/pages/BlogPost.jsx`
**Fix:**
```json
"author": {
  "@type": "Person",
  "@id": "https://semvisa.vercel.app/#sardorbek",
  "name": "Sardorbek Orifjonov"
}
```

---

## 🟡 MEDIUM (1 oy ichida)

### M-1 — Rasmiy manbalarga havolalar yo'q ✅ PENDING
**Fayl:** `src/data/blogPosts.js` (har bir postda)
**Fix:** travel.state.gov, VFS Global, IRCC havolalar qo'shish.

### M-2 — Blog listing thin content ✅ PENDING
**Muammo:** ~250 so'z (minimum 500).
**Fayl:** `src/pages/Blog.jsx`
**Fix:** 150-200 so'zlik editorial intro qo'shish.

### M-3 — Blog → Visa sahifasiga internal link yo'q ✅ PENDING
**Fix:** AQSH blog post → `/vizalar/aqsh` ga CTA link.

### M-4 — og:type="article" service sahifalarida noto'g'ri ✅ PENDING
**Fayl:** `src/pages/CountryVisa.jsx`
**Fix:** `og:type` = `"website"` ga o'zgartirish.

### M-5 — Jamoa familiyasiz (E-E-A-T) ✅ PENDING
**Fayl:** `src/components/Team.jsx`, `index.html`
**Fix:** To'liq ism-familiya qo'shish.

### M-6 — llms.txt plain text sifatida serve bo'lmayapti ✅ PENDING
**Fayl:** `vercel.json`
**Fix:** Static fayl sifatida serve qilish uchun rewrite exception qo'shish.

### M-7 — IndexNow avtomatik yuborilmaydi ✅ PENDING
**Fix:** GitHub Action yoki Vercel deploy hook qo'shish.

### M-8 — Service.name = mamlakat nomi ✅ PENDING
**Fayl:** `src/pages/CountryVisa.jsx`
**Fix:** `name` = `"AQSH vizasi — SEM VISA konsaltingi"`.

---

## ⚪ LOW (Keyingi sprint)

| # | Muammo | Fayl | Status |
|---|---|---|---|
| L-1 | dateModified = datePublished (har doim) | `BlogPost.jsx` | PENDING |
| L-2 | Breadcrumb "Bosh sahifa" hardcoded (rus uchun) | `BlogPost.jsx` | PENDING |
| L-3 | Mobil menyu CTA lokalizatsiya yo'q | `Hero.jsx` | PENDING |
| L-4 | "Har hafta yangilanadi" — haftalik post bo'lmasa noto'g'ri | `Blog.jsx` | PENDING |

---

## 🤖 GEO — AI Search Readiness

**Ball: 68 / 100**

| Platform | Ball |
|---|---|
| Google AI Overviews | 62/100 |
| ChatGPT Search | 71/100 |
| Perplexity | 69/100 |
| Yandex AI | 58/100 |

### GEO Ustuvor harakatlar:
1. Google Business Profile yaratish (eng tez natija)
2. Wikidata entity qo'shish — "SEM VISA Consulting" (`Q-item`)
3. YouTube kanal — "AQSH vizasi 2026" video (~0.74 korrelyatsiya)
4. Homepage ga `FAQPage` + `LocalBusiness` schema qo'shish
5. Rus kontent `/ru/` prefix bilan static route qilish

---

## ✅ Yaxshi ishlayotganlar

- robots.txt: GPTBot, ClaudeBot, PerplexityBot — barchaga ruxsat ✅
- SSG (`vite-react-ssg`) to'g'ri sozlangan ✅
- llms.txt mavjud (mazmun yaxshi, serve xatosi bor) ⚠️
- LocalBusiness schema — 2 ofis, telefon, ish vaqti ✅
- FAQPage schema — 8 savol ✅
- IndexNow key fayli joylashtirilgan ✅
- HTTPS + HSTS + X-Frame-Options ✅
- Blog H2 hierarchy, jadvallar, sanalar ✅

---

## 📈 Taxminiy natijalar

| Holat | Ball |
|---|---|
| Hozir | 62/100 |
| C-1, C-2, C-3 tuzatilgandan keyin | ~72/100 |
| Barcha Critical + High bajarilgandan keyin | ~80/100 |
| To'liq optimizatsiya (3 oy) | ~88/100 |

---

## 📁 Muhim fayllar

| Fayl | Nima uchun muhim |
|---|---|
| `vercel.json` | Rewrite, headers, CSP |
| `public/index.html` | Schema, meta, hreflang |
| `src/pages/BlogPost.jsx` | BlogPosting schema, author |
| `src/pages/CountryVisa.jsx` | FAQPage schema, H1, og:type |
| `src/pages/Blog.jsx` | Editorial intro, SearchAction |
| `src/data/blogPosts.js` | Kontent hajmi, internal links |
| `src/components/Hero.jsx` | H1 lokalizatsiya |
| `public/sitemap.xml` | URL coverage, lastmod |
| `public/llms.txt` | AI crawlers uchun |
