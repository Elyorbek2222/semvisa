# SEM VISA — SEO Tuzatishlar Checklisti
**Audit sanasi:** 2026-03-20 | **Umumiy ball:** 56/100

---

## CRITICAL — Darhol (bugun)

- [ ] 1. `vercel.json` yaratish
  - Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS
  - Trailing-slash redirect (/blog/ -> /blog)
  - Fayl: vercel.json (project root)

- [ ] 2. `llms.txt` yaratish
  - ChatGPT Search, Perplexity, Claude uchun sayt tavsifi
  - Barcha muhim sahifalar royxati
  - Fayl: public/llms.txt

- [ ] 3. `robots.txt` yangilash
  - GPTBot, ClaudeBot, PerplexityBot uchun explicit Allow qoidalari
  - Fayl: public/robots.txt

- [ ] 4. `og-image.png` yaratish
  - Olcham: 1200x630px
  - Fayl: public/og-image.png
  - Taar: Telegram, WhatsApp ulashishda rasm korinadi

---

## HIGH — Schema tuzatishlari (bugun/ertaga)

- [ ] 5. `index.html` — LocalBusiness schema tuzatish
  - 2 ta LocalBusiness blokni birlashtirish (reviews ichiga qoshish)
  - reviewCount: "12000" -> reviewCount: 12000 (string -> number)
  - ratingValue: "5" -> ratingValue: 5
  - address ni arraydan single object ga ozgartirish
  - openingHoursSpecification ni array qilish
  - WebSite + SearchAction bloki qoshish
  - Fayl: index.html

- [ ] 6. `BlogPost.jsx` — Article schema yaxshilash
  - @type: "Article" -> "BlogPosting"
  - image: post.heroImage qoshish (required for Google)
  - publisher.logo ImageObject qoshish (required for Google)
  - dateModified qoshish
  - BreadcrumbList schema qoshish (Home -> Blog -> Article)
  - Fayl: src/pages/BlogPost.jsx

- [ ] 7. `CountryVisa.jsx` — Schema almashtirish
  - TouristDestination -> Service (serviceType: "Visa Consulting")
  - BreadcrumbList schema qoshish (Home -> Vizalar -> Country)
  - Fayl: src/pages/CountryVisa.jsx

- [ ] 8. `Blog.jsx` — CollectionPage schema qoshish
  - CollectionPage JSON-LD schema
  - Fayl: src/pages/Blog.jsx

---

## MEDIUM — Performance va kontent (bu hafta)

- [ ] 9. `main.jsx` — Lazy loading
  - React.lazy() + Suspense bilan Blog, BlogPost, Countries, CountryVisa
  - LCP 300-600ms yaxshilanadi
  - Fayl: src/main.jsx

- [ ] 10. Sitemap cleanup
  - changefreq teglarini olib tashlash (Google etiborsiz qoldiradi)
  - priority teglarini olib tashlash (deprecated)
  - Blog postlari lastmod ni blogPosts.js dagi date dan olish
  - Fayl: public/sitemap.xml va dist/sitemap.xml

- [ ] 11. Footer tuzatish
  - "Semtravel Premium" -> "SEM VISA Consulting"
  - "2025" -> "2026"
  - Fayl: src/App.jsx (line 107), src/AppRu.jsx

- [ ] 12. CountryVisa rasm atributlari
  - Unsplash rasmlarga width, height, loading="lazy" qoshish
  - CLS oldini oladi
  - Fayl: src/pages/CountryVisa.jsx

- [ ] 13. BlogPost hero rasm atributlari
  - width, height belgilash (CLS oldini oladi)
  - Fayl: src/pages/BlogPost.jsx

---

## LOW — Keyinroq (keyingi hafta)

- [ ] 14. IndexNow protokoli
  - Bing va Yandex avtomatik xabardor boladi
  - Fayl: public/{key}.txt + deploy hook

- [ ] 15. E-E-A-T yaxshilash
  - "Abdurakhim" -> Toliq familiyasi qoshish
  - Jamoaning LinkedIn profil linklari
  - Google Reviews / 2GIS linki

- [ ] 16. About sahifasi yaratish
  - YMYL (yuridik xizmat) sayt uchun majburiy
  - Kompaniya manzili, raqami, royxatdan otish
  - Route: /about

- [ ] 17. Privacy Policy sahifasi
  - Booking formada shaxsiy malumot yigilmoqda
  - Route: /privacy

---

## KATTA LOYIHA — SSR/Prerender (kelgusi sprint)

- [ ] 18. React CSR -> Prerender/SSG
  - Barcha muammolarning ildiz sababi
  - Google, ChatGPT, Perplexity hech narsa kormaydi hozir
  - Variant A: vite-plugin-ssg qoshish (oson)
  - Variant B: Next.js ga kochirish (kuchliroq)
  - Bu 1 ta ozgarish butun skorni +20-25 ball oshiradi

---

## Natijalar (barcha tuzatishlardan keyin)

| Kategoriya     | Hozir  | Maqsad |
|----------------|--------|--------|
| Technical SEO  | 61/100 | 82/100 |
| Content Quality| 54/100 | 68/100 |
| Schema         | 61/100 | 91/100 |
| Sitemap        | 74/100 | 90/100 |
| Performance    | 68/100 | 78/100 |
| GEO / AI Search| 31/100 | 65/100 |
| JAMI           | 56/100 | 79/100 |

---

Har bir task bajarilgandan keyin [ ] -> [x] qiling
