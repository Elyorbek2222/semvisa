import { useInView } from '../hooks/useInView'

const TEAM = [
  {
    initials: 'SO',
    name: 'Sardorbek Orifjonov',
    role: 'Asoschi va Viza Strategi',
    exp: '15 yil',
    bio: "15 yillik tajriba. Har bir keysni yuridik jihatdan chuqur tahlil qilib, mijoz uchun eng ishonchli strategiya ishlab chiqadi.",
    stats: [
      { value: '12 000+', label: 'Hal qilingan keys' },
      { value: '98%', label: 'Muvaffaqiyat' },
    ],
    skills: ['Yuridik maslahat', 'Murakkab vizalar', 'Biznes sayohatlari'],
  },
  {
    initials: 'AR',
    name: 'Abdurakhim',
    role: "Viza bo'yicha menejer",
    exp: '8 yil',
    bio: "Vizalar — mening fishkam! Har qanday murakkablikdagi vizani tez va ishonchli rasmiylashtirishga ixtisoslashgan. Sizning vaqtingiz — eng qimmatli resurs.",
    stats: [
      { value: '5 000+', label: 'Rasmiy viza' },
      { value: '97%', label: 'Tasdiqlash' },
    ],
    skills: ['Shengen vizalar', 'AQSH & Kanada', 'Tezkor rasmiylashtirish'],
  },
  {
    initials: 'EY',
    name: 'Elyorbek',
    role: 'Direktor',
    exp: '6 yil',
    bio: "Vizangizdan tashqari to'liq sayohat paketini tayyorlayman: ekskursiyalar, yopiq aviabiletlar va qo'shimcha xizmatlar. Sizning sayohatingiz — mening loyiham!",
    stats: [
      { value: '3 000+', label: "Tashkil qilingan tur" },
      { value: '100%', label: 'Mijoz mamnuniyati' },
    ],
    skills: ['Sayohat arxitekturasi', 'Ekskursiyalar', 'Yopiq aviabiletlar'],
  },
]

function TeamCard({ member, index }) {
  const ref = useInView({ delay: index * 130 })

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
      className="card overflow-hidden"
    >
      {/* Profile header */}
      <div className="p-5 flex items-center gap-4 border-b border-border">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/30 flex items-center justify-center">
            <span className="text-lime font-extrabold text-lg">{member.initials}</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-lime rounded-full border-2 border-bg"/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">{member.name}</p>
          <p className="text-[11px] text-lime/80 mt-0.5">{member.role}</p>
          <p className="text-[10px] text-white/35 mt-0.5">{member.exp} tajriba</p>
        </div>
        <div className="shrink-0 bg-lime/10 border border-lime/20 rounded-lg px-2.5 py-1.5 text-center">
          <p className="text-lime font-extrabold text-sm leading-none">{member.exp}</p>
          <p className="text-[9px] text-white/35 mt-0.5 uppercase tracking-wide">tajriba</p>
        </div>
      </div>

      {/* Bio */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-xs text-white/45 leading-relaxed">{member.bio}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-px bg-border border-b border-border">
        {member.stats.map(({ value, label }) => (
          <div key={label} className="bg-surface px-4 py-3">
            <p className="text-lime font-extrabold text-base leading-none">{value}</p>
            <p className="text-[10px] text-white/35 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Skills — document status style */}
      <div className="p-5">
        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Ixtisoslik</p>
        <div className="space-y-2.5">
          {member.skills.map((skill, i) => (
            <div key={skill} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                i === 0
                  ? 'bg-lime border-lime'
                  : i === 1
                  ? 'border-lime/50 bg-lime/10'
                  : 'border-white/15 bg-transparent'
              }`}>
                {i === 0 && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#0F1115" strokeWidth="1.8">
                    <polyline points="2,5 4,7 8,3"/>
                  </svg>
                )}
                {i === 1 && <div className="w-1.5 h-1.5 rounded-full bg-lime/60"/>}
                {i === 2 && <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>}
              </div>
              <span className={`text-xs ${i === 0 ? 'text-white font-medium' : i === 1 ? 'text-white/55' : 'text-white/30'}`}>
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const headRef = useInView()

  return (
    <section id="team" className="bg-bg py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headRef}
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 bg-lime rounded-full"/>
            Mutaxassislarimiz
          </span>
          <h2 className="mt-3 font-sans text-2xl md:text-4xl font-extrabold text-white">
            Ishonchli <span className="text-lime">ekspertlar</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg">
            Har bir mutaxassis — konsullik yoki diplomatik soha vakili. Biz tizimni ichidan bilamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
