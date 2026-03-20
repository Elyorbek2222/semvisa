import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function getLang() {
  if (typeof window === 'undefined') return 'uz'
  return localStorage.getItem('semvisa_lang') || 'uz'
}

const TEAM = [
  {
    name: 'Sardorbek Orifjonov',
    role: { uz: 'Asoschi va Viza Strategi', ru: 'Основатель и Визовый Стратег' },
    exp:  { uz: '15 yillik tajriba', ru: '15 лет опыта' },
    desc: {
      uz: 'Har bir keysni yuridik jihatdan chuqur tahlil qiladi. AQSH, Kanada va Buyuk Britaniya vizalarida ixtisoslashgan murakkab keyslar bo\'yicha yetakchi mutaxassis.',
      ru: 'Глубокий юридический анализ каждого кейса. Ведущий специалист по сложным визам США, Канады и Великобритании.',
    },
    knows: ['AQSH vizasi', 'Kanada vizasi', 'Buyuk Britaniya', 'Murakkab keyslar'],
  },
  {
    name: 'Abdurakhim Yusupov',
    role: { uz: 'Viza bo\'yicha Menejer', ru: 'Менеджер по визам' },
    exp:  { uz: '5 yillik tajriba', ru: '5 лет опыта' },
    desc: {
      uz: 'Shengen, AQSH va Kanada vizalarini tez va ishonchli rasmiylashtirishga ixtisoslashgan. 500+ muvaffaqiyatli keys.',
      ru: 'Специализируется на быстром оформлении Шенген, США и Канады. 500+ успешных кейсов.',
    },
    knows: ['Shengen vizasi', 'AQSH vizasi', 'Kanada vizasi'],
  },
  {
    name: 'Elyorbek Mirzayev',
    role: { uz: 'Direktor', ru: 'Директор' },
    exp:  { uz: '15 yillik tajriba', ru: '15 лет опыта' },
    desc: {
      uz: 'Kompaniya strategiyasi va mijozlar bilan munosabatlarni boshqaradi. To\'liq sayohat paketi xizmatlari.',
      ru: 'Управляет стратегией компании и клиентскими отношениями. Полный пакет туристических услуг.',
    },
    knows: ['Biznes rivojlantirish', 'Sayohat arxitekturasi'],
  },
]

const OFFICES = [
  {
    name: { uz: '1-filial — Katta Xitmontepa', ru: 'Офис 1 — Катта Хитмонтепа' },
    address: 'Katta Xitmontepa ko\'chasi 12a/1, Toshkent',
    mapLink: 'https://maps.google.com/?q=Katta+Xitmontepa+12a/1+Tashkent',
  },
  {
    name: { uz: '2-filial — Park City TJM', ru: 'Офис 2 — Парк Сити ТЦ' },
    address: 'Kichik halqa yo\'li, Park City TJM, Toshkent',
    mapLink: 'https://maps.google.com/?q=Park+City+TJM+Tashkent',
  },
]

export default function About() {
  const lang = getLang()
  const isRu = lang === 'ru'

  const t = {
    title:        isRu ? 'О компании SEM VISA' : 'SEM VISA haqida',
    metaTitle:    isRu ? 'О компании SEM VISA Consulting | Виза-консультинг Ташкент' : 'SEM VISA Consulting haqida | Toshkentda viza konsaltingi',
    metaDesc:     isRu
      ? 'SEM VISA Consulting — визовый консалтинг в Ташкенте с 2011 года. 12 000+ одобренных виз, 98% с первой попытки. 2 офиса в Ташкенте.'
      : 'SEM VISA Consulting — 2011 yildan Toshkentda viza konsaltingi. 12 000+ tasdiqlangan viza, birinchi urinishda 98% muvaffaqiyat. Toshkentda 2 filial.',
    founded:      isRu ? 'Основана в 2011 году' : '2011 yilda tashkil etilgan',
    missionTitle: isRu ? 'Наша миссия' : 'Bizning missiyamiz',
    missionText:  isRu
      ? 'Мы помогаем гражданам Узбекистана получать визы с первой попытки — через юридически грамотную подготовку документов, индивидуальную стратегию и реальную поддержку на каждом этапе процесса.'
      : 'O\'zbekiston fuqarolariga birinchi urinishda viza olishda yordam beramiz — huquqiy jihatdan puxta hujjat tayyorlash, individual strategiya va jarayonning har bir bosqichida haqiqiy yordam orqali.',
    teamTitle:    isRu ? 'Наша команда' : 'Bizning jamoamiz',
    officesTitle: isRu ? 'Наши офисы' : 'Bizning filiallarimiz',
    hours:        isRu ? 'Пн–Сб, 09:00–18:00' : 'Du–Sha, 09:00–18:00',
    statsTitle:   isRu ? 'SEM VISA raqamlarda' : 'SEM VISA raqamlarda',
    contactTitle: isRu ? 'Связаться с нами' : 'Biz bilan bog\'lanish',
    backHome:     isRu ? '← Главная' : '← Bosh sahifa',
    cta:          isRu ? 'Бесплатная консультация' : 'Bepul konsultatsiya',
    ctaBtn:       isRu ? 'Оставить заявку' : 'Ariza qoldirish',
  }

  const stats = [
    { value: '2011', label: isRu ? 'Год основания' : 'Tashkil yili' },
    { value: '15+',  label: isRu ? 'Лет опыта' : 'Yillik tajriba' },
    { value: '12 000+', label: isRu ? 'Одобренных виз' : 'Tasdiqlangan viza' },
    { value: '98%',  label: isRu ? 'С первой попытки' : 'Birinchi urinishda' },
    { value: '247',  label: isRu ? 'Спасённых отказов' : 'Qutqarilgan rad javoblari' },
    { value: '2',    label: isRu ? 'Офиса в Ташкенте' : 'Toshkentda filial' },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t.metaTitle,
    description: t.metaDesc,
    url: 'https://semvisa.vercel.app/about',
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': 'https://semvisa.vercel.app/#business',
      name: 'SEM VISA Consulting',
      foundingDate: '2011-01-01',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Katta Xitmontepa ko\'chasi 12a/1',
        addressLocality: 'Toshkent',
        addressCountry: 'UZ',
      },
    },
  }

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDesc} />
        <link rel="canonical" href="https://semvisa.vercel.app/about" />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDesc} />
        <meta property="og:url" content="https://semvisa.vercel.app/about" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Nav */}
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
          <Link to="/" className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 9.5L3.5 6 7 2.5"/>
            </svg>
            {isRu ? 'Главная' : 'Bosh sahifa'}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">{t.founded}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{t.title}</h1>
          <p className="mt-4 text-base text-white/50 leading-relaxed max-w-2xl">{t.missionText}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-14">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-surface border border-border rounded-2xl p-5 text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-gold">{value}</p>
              <p className="mt-1 text-[11px] text-white/40 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <h2 className="flex items-center gap-3 text-xl font-extrabold text-white mb-6">
            <span className="w-1 h-5 bg-gold rounded-full shrink-0"/>
            {t.teamTitle}
          </h2>
          <div className="space-y-4">
            {TEAM.map(member => (
              <div key={member.name} className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border bg-surface">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 text-lg font-extrabold text-gold">
                  {member.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-bold text-white text-[15px]">{member.name}</p>
                    <span className="text-[10px] text-gold/60 font-bold uppercase tracking-widest border border-gold/20 rounded-full px-2 py-0.5">
                      {member.exp[isRu ? 'ru' : 'uz']}
                    </span>
                  </div>
                  <p className="text-[12px] text-gold/70 font-semibold mb-2">{member.role[isRu ? 'ru' : 'uz']}</p>
                  <p className="text-[13px] text-white/50 leading-relaxed">{member.desc[isRu ? 'ru' : 'uz']}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {member.knows.map(k => (
                      <span key={k} className="text-[10px] text-white/30 bg-white/5 border border-border rounded-full px-2.5 py-0.5">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div>
          <h2 className="flex items-center gap-3 text-xl font-extrabold text-white mb-6">
            <span className="w-1 h-5 bg-gold rounded-full shrink-0"/>
            {t.officesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICES.map(office => (
              <div key={office.address} className="p-6 rounded-2xl border border-border bg-surface space-y-3">
                <p className="font-bold text-white text-[14px]">{office.name[isRu ? 'ru' : 'uz']}</p>
                <p className="text-[13px] text-white/50">{office.address}</p>
                <p className="text-[12px] text-white/30">{t.hours}</p>
                <a href={office.mapLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] text-gold/70 hover:text-gold transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="5" cy="5" r="3.5"/><path d="M5 8.5V11M5 1V3.5M1 5h2.5M8.5 5H11"/>
                  </svg>
                  {isRu ? 'Открыть на карте' : 'Xaritada ko\'rish'}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-4 p-5 rounded-2xl border border-border bg-surface flex flex-wrap gap-4">
            <a href="tel:+998712755555" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h3l1.5 3L4.5 6a7.5 7.5 0 0 0 1.5 1.5L7 5.5l3 1.5V10C4.5 10 2 7.5 2 2z"/>
              </svg>
              +998 71 275 55 55
            </a>
            <a href="tel:+998983667773" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h3l1.5 3L4.5 6a7.5 7.5 0 0 0 1.5 1.5L7 5.5l3 1.5V10C4.5 10 2 7.5 2 2z"/>
              </svg>
              +998 98 366 77 73
            </a>
            <a href="mailto:semtraveluz@mail.ru" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="12" height="8" rx="1.5"/><path d="M1 4l6 4.5L13 4"/>
              </svg>
              semtraveluz@mail.ru
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 via-surface to-surface p-7 md:p-9">
          <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-2">{t.cta}</p>
          <h3 className="text-xl font-extrabold text-white">
            {isRu ? 'Готовы помочь с вашей визой' : 'Sizning vizangizda yordam berishga tayyormiz'}
          </h3>
          <p className="mt-2 text-sm text-white/40 max-w-md leading-relaxed">
            {isRu
              ? 'Заполните форму — специалист свяжется с вами в течение 24 часов с индивидуальной стратегией.'
              : "Formani to'ldiring — mutaxassis 24 soat ichida siz bilan bog'lanadi va individual strategiya taqdim etadi."}
          </p>
          <Link to="/#booking" className="btn-gold inline-flex items-center gap-2 mt-5 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
            {t.ctaBtn}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  )
}
