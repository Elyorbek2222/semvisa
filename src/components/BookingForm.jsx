import { useRef, useState } from 'react'

const COUNTRIES = [
  "AQSH (B1/B2)",
  "Buyuk Britaniya",
  "Kanada",
  "Shengen (Germaniya)",
  "Shengen (Fransiya)",
  "Shengen (Italiya)",
  "Shengen (Niderlandiya)",
  "Avstraliya",
  "Boshqa yo'nalish",
]

const STEPS = [
  { id: 1, label: "Ariza qabul qilindi", done: true },
  { id: 2, label: "Hujjatlar tekshirilmoqda", done: false },
  { id: 3, label: "Viza natijasi", done: false },
]

export default function BookingForm({ formRef }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Ismingizni kiriting"
    if (!form.phone.trim()) e.phone = "Telefon raqamingizni kiriting"
    if (!form.email.trim() || !form.email.includes('@')) e.email = "To'g'ri email kiriting"
    if (!form.country) e.country = "Davlatni tanlang"
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <section id="booking" ref={formRef} className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-lime rounded-full"/>
            Bepul konsultatsiya
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Viza olish imkoniyatingizni{' '}
            <span className="text-lime">10 daqiqada hisoblang.</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-xl leading-relaxed">
            Anketani to'ldiring va biz sizning holatingizni tahlil qilib, natija ehtimolini foizlarda aytib beramiz.
            Hech qanday majburiyatsiz — faqat faktlarga asoslangan professional maslahat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Form */}
          <div className="lg:col-span-3 card p-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C2D100" strokeWidth="2">
                    <polyline points="5,14 10,20 23,8"/>
                  </svg>
                </div>
                <div>
                  <p className="font-extrabold text-white text-xl">Ariza qabul qilindi!</p>
                  <p className="text-sm text-white/45 mt-2 max-w-xs mx-auto">
                    Mutaxassisimiz <span className="text-lime font-semibold">24 soat</span> ichida siz bilan bog'lanadi.
                  </p>
                </div>
                {/* Mini status tracker */}
                <div className="w-full max-w-xs mt-2">
                  {STEPS.map((step, i) => (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          step.done ? 'bg-lime border-lime' : 'border-white/15'
                        }`}>
                          {step.done && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0F1115" strokeWidth="1.8">
                              <polyline points="2,5 4,7 8,3"/>
                            </svg>
                          )}
                          {!step.done && i === 1 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-lime/50 animate-pulse"/>
                          )}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="w-px h-6 bg-border mt-1"/>
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`text-xs ${step.done ? 'text-lime font-medium' : i === 1 ? 'text-white/60' : 'text-white/25'}`}>
                          {step.label}
                        </p>
                        {step.done && <p className="text-[10px] text-white/30 mt-0.5">Bajarildi</p>}
                        {!step.done && i === 1 && <p className="text-[10px] text-white/30 mt-0.5">Jarayonda</p>}
                        {!step.done && i === 2 && <p className="text-[10px] text-white/25 mt-0.5">Navbatda</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',email:'',country:'',message:'' }) }}
                  className="btn-outline-lime mt-2"
                >
                  Yangi ariza
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1.5">
                    To'liq ismingiz <span className="text-lime">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ismingizni kiriting"
                    className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                      outline-none transition-colors focus:border-lime/50
                      ${errors.name ? 'border-red-500/50' : 'border-border'}`}
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1.5">
                      Telefon raqamingiz <span className="text-lime">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+998 90 123 45 67"
                      className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                        outline-none transition-colors focus:border-lime/50
                        ${errors.phone ? 'border-red-500/50' : 'border-border'}`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1.5">
                      Email <span className="text-lime">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                        outline-none transition-colors focus:border-lime/50
                        ${errors.email ? 'border-red-500/50' : 'border-border'}`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Country select */}
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1.5">
                    Sizni qaysi davlat qiziqtiradi? <span className="text-lime">*</span>
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm outline-none
                      transition-colors focus:border-lime/50 appearance-none cursor-pointer
                      ${form.country ? 'text-white' : 'text-white/25'}
                      ${errors.country ? 'border-red-500/50' : 'border-border'}`}
                  >
                    <option value="" disabled>Davlatni tanlang</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-surface text-white">{c}</option>
                    ))}
                  </select>
                  {errors.country && <p className="text-[11px] text-red-400 mt-1">{errors.country}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="text-[11px] text-white/40 uppercase tracking-wide block mb-1.5">
                    Xabaringiz (ixtiyoriy)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Savollaringizni qoldiring..."
                    className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-white
                      placeholder-white/25 outline-none transition-colors focus:border-lime/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-lime w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="8" cy="8" r="6" strokeOpacity="0.3"/>
                        <path d="M8 2a6 6 0 0 1 6 6"/>
                      </svg>
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      Ariza yuborish
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/25">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="5" width="8" height="6" rx="1"/>
                    <path d="M4 5V4a2 2 0 0 1 4 0v1"/>
                  </svg>
                  Ma'lumotlaringiz xavfsizligi kafolatlanadi
                </p>
              </form>
            )}
          </div>

          {/* Right info panel */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {/* Process card */}
            <div className="card p-5">
              <p className="text-[11px] text-white/30 uppercase tracking-widest mb-4">Jarayon qanday ishlaydi</p>
              <div className="space-y-1">
                {[
                  { step: '01', title: 'Ariza qabul qilinadi', desc: 'Anketani to\'ldiring' },
                  { step: '02', title: 'Tahlil o\'tkaziladi', desc: '24 soat ichida javob' },
                  { step: '03', title: 'Strategiya taqdim etiladi', desc: 'Muvaffaqiyat foizi bilan' },
                  { step: '04', title: 'Viza olinadi', desc: 'Kafolatli natija' },
                ].map(({ step, title, desc }, i, arr) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        i === 0 ? 'bg-lime border-lime text-bg' : 'border-border text-white/30'
                      }`}>
                        {i === 0 ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0F1115" strokeWidth="1.8">
                            <polyline points="2,5 4,7 8,3"/>
                          </svg>
                        ) : step}
                      </div>
                      {i < arr.length - 1 && <div className="w-px h-5 bg-border mt-1"/>}
                    </div>
                    <div className="pb-3">
                      <p className={`text-xs font-medium ${i === 0 ? 'text-lime' : 'text-white/55'}`}>{title}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="card p-5 flex flex-col gap-3">
              <p className="text-[11px] text-white/30 uppercase tracking-widest">Bog'lanish</p>
              {[
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 2h4l1.5 3.5L5.5 7a9 9 0 0 0 1.5 1.5l1.5-2L12 7.5V12c-5.5 0-10-4.5-10-10z"/>
                    </svg>
                  ),
                  label: 'Telefon',
                  value: '+998 71 200 00 00',
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="3" width="12" height="8" rx="1"/>
                      <path d="M1 3l6 5 6-5"/>
                    </svg>
                  ),
                  label: 'Email',
                  value: 'info@semtravel.uz',
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 1C4.8 1 3 2.8 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.2-1.8-4-4-4z"/>
                      <circle cx="7" cy="5" r="1.5"/>
                    </svg>
                  ),
                  label: 'Manzil',
                  value: 'Toshkent, Chilonzor tumani',
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0 text-lime">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wide">{label}</p>
                    <p className="text-xs text-white/70 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
