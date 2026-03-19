# SEM VISA — Loyiha Yo'l Xaritasi va Checklist

> Oxirgi yangilanish: 2026-03-20

---

## ✅ QILINGAN ISHLAR

### Blog va Kontent
- [x] 7 ta asosiy blog post yozildi (AQSH, Shengen, UK, Kanada, Rad javobi, Dubai, Koreya, Tailand, Bank ko'chirmasi, Vizasiz mamlakatlar)
- [x] Barcha blog postlar 2026 yil ma'lumotlari bilan yangilandi
- [x] Har blog postga **hero rasm** (Unsplash) qo'shildi
- [x] Blog postlarda **Telegram + WhatsApp share** tugmalari qo'shildi
- [x] Blog maqolalar oxirida **"Bepul konsultatsiya" CTA** mavjud
- [x] Dubai posti yangilandi: "Viza kerak emas!" (2024 yangiligi)

### Texnik SEO
- [x] Schema.org: LocalBusiness, FAQ, Review, Article — o'rnatilgan
- [x] `sitemap.xml` — 22 URL (blog + vizalar sahifalar)
- [x] `robots.txt` — ochiq, barcha crawlerlarga ruxsat
- [x] Google Analytics (G-PQ90XC4PR0) o'rnatilgan
- [x] Yandex.Metrika (107702356) — webvisor, clickmap bilan
- [x] **Vercel Analytics** o'rnatilgan (`@vercel/analytics`)
- [x] React Helmet — har sahifada dinamik meta teglari
- [x] Open Graph teglari — Facebook/Telegram ulashish uchun
- [x] Canonical URL — har sahifada

### Mamlakatlar Sahifalari (yangi!)
- [x] **`/vizalar`** — barcha mamlakatlar indeks sahifasi (UZ + RU)
- [x] **`/vizalar/aqsh`** — AQSH B1/B2 viza sahifasi
- [x] **`/vizalar/shengen`** — Shengen vizasi sahifasi
- [x] **`/vizalar/uk`** — Buyuk Britaniya vizasi
- [x] **`/vizalar/kanada`** — Kanada TRV vizasi
- [x] **`/vizalar/dubay`** — Dubai vizasiz kirish
- [x] **`/vizalar/tailand`** — Tailand Visa-on-Arrival
- [x] **`/vizalar/koreya`** — Janubiy Koreya C-3-9
- [x] **`/vizalar/avstraliya`** — Avstraliya Visitor Visa
- [x] **`/vizalar/yaponiya`** — Yaponiya turist vizasi
- [x] Har sahifada: hujjatlar checklist, qadamma-qadam jarayon, FAQ, CTA
- [x] **Ikki tilda**: O'zbek + Rus (localStorage dan til aniqlanadi)

### Navigatsiya
- [x] Desktop: **"Vizalar" dropdown menyu** — hover qilinganda 9 mamlakat ko'rinadi
- [x] Mobil: **"Mamlakatlar bo'yicha vizalar"** linki qo'shildi
- [x] Til switcher: UZ ↔ RU (localStorage da saqlanadi)

### Lead Generation
- [x] BookingForm — Telegram Bot API bilan (lidlar Telegram ga keladi)
- [x] BookingForm — **"Bizni qayerdan bildingiz?"** referral field
- [x] UTM tracking — manba (Telegram Mini App vs organik)
- [x] Form validation — telefon (+998 format), email

### PWA
- [x] `vite-plugin-pwa` o'rnatilgan
- [x] Mobil ilova sifatida o'rnatish imkoni

---

## ⏳ NAVBATDAGI ISHLAR (Prioritet bo'yicha)

### 🔴 YUQORI PRIORITET (1-2 hafta)

#### Google va Yandex
- [ ] **Google Search Console** ga saytni qo'shish va sitemap yuborish
  - URL: search.google.com/search-console
  - Sitemap URL: https://semvisa.vercel.app/sitemap.xml
- [ ] **Google Business Profile** yaratish
  - Manzil 1: Katta Xitmontepa ko'chasi 12a/1
  - Manzil 2: Kichik halqa yo'li, Park City TJM
  - Telefon, ish vaqti, rasmlar qo'shish
  - Mijozlardan 5 yulduz so'rash
- [ ] **Yandex Business** (yandex.uz/business) ro'yxatdan o'tish
- [ ] **2GIS** — ofisni qo'shish

#### Telegram
- [ ] Telegram kanal yaratish (`@semvisa` yoki `@vizakonsulting`)
  - Har kuni 1 post: viza tips, muvaffaqiyat hikoyalari
  - Blog maqolalarni share qilish
  - Pinned message: Mini App linki
- [ ] Bot avtomatizatsiya: /start → avto-javob + forma

### 🟡 O'RTA PRIORITET (2-4 hafta)

#### Kontent
- [ ] 10+ yangi blog maqolalar (Uzbek tilida):
  - [ ] "Viza intervyu savollar va javoblar 2026 — 50 ta savol"
  - [ ] "Invitation letter (taklif xati) namunasi 2026"
  - [ ] "Viza foto talablari — barcha mamlakatlar 2026"
  - [ ] "Travel history nima va u vizaga qanday ta'sir qiladi"
  - [ ] "Multiple entry viza qanday olish 2026"
  - [ ] "Shengen viza uchun sug'urta qayerdan olish"
  - [ ] "Yaponiya viza 2026 — to'liq qo'llanma"
  - [ ] "Avstraliya viza 2026 — to'liq qo'llanma"
  - [ ] "Rossiya vizasi 2026 O'zbekistondan"
  - [ ] "Hindiston vizasi 2026"

- [ ] **Rus tilida blog postlar** (5-10 ta):
  - [ ] "Виза в США 2026 из Узбекистана"
  - [ ] "Шенгенская виза 2026 — документы"
  - [ ] "Виза в Южную Корею 2026"
  - [ ] "Дубай без визы 2026"
  - [ ] "Страны без визы для граждан Узбекистана"

#### SEO Texnik
- [ ] **FAQ Schema** — har vizalar sahifasiga qo'shish (featured snippet uchun)
- [ ] **HowTo Schema** — blog postlardagi "qadamma-qadam" bo'limlarga
- [ ] **BreadcrumbList Schema** — barcha sahifalarga
- [ ] Blog maqolalar ichiga **rasmlar URL** qo'shish (markdown `![alt](url)` format)

### 🟢 PAST PRIORITET (1-3 oy)

#### Yangi funksiyalar
- [ ] **Viza kalkulyator** (interaktiv: davlat + holat → muvaffaqiyat foizi)
- [ ] **Email newsletter** signup — BookingForm da checkbox
- [ ] **Referral sahifasi** (`/referral`) — "Do'stingizni yuboring → chegirma"
- [ ] **WhatsApp tugmasi** — saytda doim ko'rinadigan sticky button

#### Backlink strategiya
- [ ] Expat.uz, Kun.uz, Spot.uz ga maqola berish
- [ ] Visaforums.com da O'zbekiston bo'yicha javoblar yozish
- [ ] Aviabilet agentliklari bilan link almashuv
- [ ] Wikipedia "Visa requirements for Uzbekistani citizens" mention

#### Video kontent
- [ ] YouTube kanal: "Viza Savollari" playlist
  - "Viza intervyusida nima deyish kerak?"
  - "Bank ko'chirmasini qanday tayyorlash?"
  - "Dubai ga vizasiz borish — to'liq qo'llanma"
- [ ] Instagram Reels / TikTok (60 soniyalik qisqa videolar)

#### Yangi mamlakatlar sahifalari
- [ ] `/vizalar/hindiston` — Hindiston e-visa
- [ ] `/vizalar/malayziya` — Malayziya vizasiz
- [ ] `/vizalar/gruziya` — Gruziya 365 kun vizasiz
- [ ] `/vizalar/turkiya` — Turkiya vizasiz
- [ ] `/vizalar/rossiya` — Rossiya vizasi

---

## 📊 SAYT STATISTIKASI (2026-03-20)

| Ko'rsatkich | Qiymat |
|-------------|--------|
| Blog postlar | 11 ta |
| Mamlakat sahifalari | 9 ta |
| Sitemap URL | 22 ta |
| Tillar | 2 (UZ + RU) |
| Analytics | Google GA4 + Yandex + Vercel |

---

## 🔗 MUHIM LINKLAR

| Xizmat | URL / ID |
|--------|---------|
| Sayt | https://semvisa.vercel.app |
| Google Analytics | G-PQ90XC4PR0 |
| Yandex Metrika | 107702356 |
| Sitemap | https://semvisa.vercel.app/sitemap.xml |
| Google Search Console | search.google.com/search-console |
| Google Business | business.google.com |
| Yandex Business | business.yandex.uz |

---

## 🏆 RAQIB TAHLILI: EVIS.UZ

| Ko'rsatkich | EVIS.UZ | SEM VISA |
|-------------|---------|----------|
| Blog postlar | 10 (9 oy eski!) | **11 (bugun yangi)** |
| Mamlakat sahifalari | 20 | **9 (kengaytirilmoqda)** |
| FAQ Schema | Yo'q | **Bor** |
| Yandex blog bloklanishi | **Ha (xato!)** | Yo'q |
| Ikki til | Ha | **Ha (UZ+RU)** |
| Aniq statistika | Noaniq | **98%, 12,000+, 247** |
| Vizasiz mamlakatlar maqola | Yo'q | **Bor** |
| Dubai yangiligi | Yo'q | **Bor** |
