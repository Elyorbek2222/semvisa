import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function getLang() {
  if (typeof window === 'undefined') return 'uz'
  return localStorage.getItem('semvisa_lang') || 'uz'
}

const SECTIONS_UZ = [
  {
    title: '1. Qanday ma\'lumotlar to\'planadi',
    text: 'Booking formasini to\'ldirganda siz quyidagi ma\'lumotlarni berasiz: to\'liq ism, telefon raqam, email manzil va viza turi. Bu ma\'lumotlar faqat sizning arizangizni ko\'rib chiqish uchun ishlatiladi.',
  },
  {
    title: '2. Ma\'lumotlar qanday ishlatiladi',
    text: 'To\'plangan ma\'lumotlar faqat SEM VISA Consulting mutaxassislari tomonidan siz bilan bog\'lanish va viza konsultatsiyasi xizmati ko\'rsatish uchun ishlatiladi. Uchinchi shaxslarga, reklama maqsadlarida yoki savdo uchun hech qachon uzatilmaydi.',
  },
  {
    title: '3. Ma\'lumotlar qanchalik saqlanadi',
    text: 'Shaxsiy ma\'lumotlaringiz xizmat ko\'rsatish davomida va undan keyin 3 yil davomida saqlanadi. Har qanday vaqtda ma\'lumotlaringizni o\'chirib tashlashimizni so\'rashingiz mumkin.',
  },
  {
    title: '4. Cookies va analitika',
    text: 'Saytimiz Google Analytics va Yandex.Metrika xizmatlaridan foydalanadi. Bu xizmatlar sayt trafigini o\'rganish uchun anonim ma\'lumotlar to\'playdi. Cookies orqali shaxsiy ma\'lumotlar saqlanmaydi.',
  },
  {
    title: '5. Uchinchi tomon xizmatlari',
    text: 'SEM VISA saytida Telegram Mini App SDK va Google Fonts integratsiyasi mavjud. Bu xizmatlar o\'zlarining maxfiylik siyosatiga ega. Biz ularning ma\'lumot to\'plash amaliyoti uchun javobgar emasmiz.',
  },
  {
    title: '6. Ma\'lumotlaringiz ustidan nazorat',
    text: 'Siz istalgan vaqtda: (1) saqlangan ma\'lumotlaringiz ro\'yxatini so\'rashingiz, (2) noto\'g\'ri ma\'lumotlarni tuzatishni talab qilishingiz, (3) barcha ma\'lumotlaringizni o\'chirishni so\'rashingiz mumkin. Buning uchun semtraveluz@mail.ru manziliga yozing.',
  },
  {
    title: '7. Aloqa',
    text: 'Maxfiylik siyosatimiz haqida savollaringiz bo\'lsa, semtraveluz@mail.ru manziliga yoki +998 71 275 55 55 raqamiga murojaat qiling.',
  },
]

const SECTIONS_RU = [
  {
    title: '1. Какие данные собираются',
    text: 'При заполнении формы заявки вы предоставляете: полное имя, номер телефона, email-адрес и тип визы. Эти данные используются исключительно для рассмотрения вашей заявки.',
  },
  {
    title: '2. Как используются данные',
    text: 'Собранные данные используются только специалистами SEM VISA Consulting для связи с вами и оказания консультационных услуг по визам. Они никогда не передаются третьим лицам, не используются в рекламных целях и не продаются.',
  },
  {
    title: '3. Сроки хранения данных',
    text: 'Ваши персональные данные хранятся в течение всего периода оказания услуг и ещё 3 года после его окончания. Вы можете в любое время запросить удаление своих данных.',
  },
  {
    title: '4. Cookies и аналитика',
    text: 'Наш сайт использует Google Analytics и Яндекс.Метрику для анализа трафика. Эти сервисы собирают анонимные данные. Через cookies персональные данные не хранятся.',
  },
  {
    title: '5. Сторонние сервисы',
    text: 'На сайте SEM VISA интегрированы Telegram Mini App SDK и Google Fonts. Эти сервисы имеют собственную политику конфиденциальности. Мы не несём ответственности за их практики сбора данных.',
  },
  {
    title: '6. Управление вашими данными',
    text: 'Вы вправе в любое время: (1) запросить список сохранённых данных, (2) потребовать исправления неверных данных, (3) запросить удаление всех ваших данных. Напишите на semtraveluz@mail.ru.',
  },
  {
    title: '7. Контакты',
    text: 'По вопросам, связанным с нашей политикой конфиденциальности, обращайтесь на semtraveluz@mail.ru или по телефону +998 71 275 55 55.',
  },
]

export default function Privacy() {
  const lang = getLang()
  const isRu = lang === 'ru'

  const metaTitle = isRu
    ? 'Политика конфиденциальности | SEM VISA Consulting'
    : 'Maxfiylik siyosati | SEM VISA Consulting'
  const metaDesc = isRu
    ? 'Политика конфиденциальности SEM VISA Consulting — как мы собираем, используем и защищаем ваши персональные данные.'
    : 'SEM VISA Consulting maxfiylik siyosati — shaxsiy ma\'lumotlaringizni qanday to\'playmiz, ishlatamiz va himoya qilamiz.'

  const sections = isRu ? SECTIONS_RU : SECTIONS_UZ

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href="https://semvisa.vercel.app/privacy" />
        <meta name="robots" content="noindex, follow" />
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

      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">
            {isRu ? 'Последнее обновление: 20 марта 2026' : 'Oxirgi yangilanish: 20-mart 2026'}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            {isRu ? 'Политика конфиденциальности' : 'Maxfiylik siyosati'}
          </h1>
          <p className="mt-3 text-sm text-white/40 leading-relaxed">
            {isRu
              ? 'Настоящая политика описывает, как SEM VISA Consulting собирает, использует и защищает персональные данные пользователей сайта semvisa.vercel.app.'
              : 'Ushbu siyosat SEM VISA Consulting kompaniyasining semvisa.vercel.app saytida foydalanuvchilarning shaxsiy ma\'lumotlarini qanday to\'plashi, ishlatishi va himoya qilishini tavsiflaydi.'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="p-6 rounded-2xl border border-border bg-surface">
            <h2 className="font-bold text-white text-[15px] mb-3">{section.title}</h2>
            <p className="text-[14px] text-white/55 leading-relaxed">{section.text}</p>
          </div>
        ))}

        {/* Footer note */}
        <div className="text-center pt-4">
          <p className="text-[12px] text-white/25">
            © 2026 SEM VISA Consulting
          </p>
          <Link to="/" className="mt-2 inline-block text-[12px] text-gold/50 hover:text-gold transition-colors">
            {isRu ? '← Вернуться на главную' : '← Bosh sahifaga qaytish'}
          </Link>
        </div>
      </div>
    </div>
  )
}
