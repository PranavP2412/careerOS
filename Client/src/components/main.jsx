import { useEffect } from "react";
import arya from "../assets/WhatsApp Image 2026-06-03 at 5.17.44 PM.jpeg"
import sanket from "../assets/WhatsApp Image 2026-06-03 at 5.18.12 PM.jpeg"
import om from "../assets/WhatsApp Image 2026-06-03 at 5.12.18 PM.jpeg"

const services = [
  { icon: "🎯", title: "College & Branch Selection" },
  { icon: "📝", title: "CAP Round Guidance" },
  { icon: "📊", title: "College Prediction" },
  { icon: "🚀", title: "Spot Round Strategy" },
  { icon: "🤝", title: "Personal Mentorship" },
  { icon: "📍", title: "Admission Support" },
  { icon: "⏱️", title: "24/7 Support" },
  { icon: "✅", title: "Quality Assurance" },
];

const painPoints = [
  { icon: "🏛️", text: "Which college should I choose?" },
  { icon: "🧭", text: "Which branch is right for me?" },
  { icon: "🔄", text: "Should I wait for the next CAP round?" },
  { icon: "🗣️", text: "Whose advice should I trust?" },
];

const whyPoints = [
  "Placements & Salary Data",
  "Campus Life & Culture",
  "Coding Culture & Tech Clubs",
  "Return on Investment (ROI)",
  "Future Opportunities",
  "Location & Hostel Facilities",
];

const mentors = [
  {
    name: "Arya",
    score: "MHTCET 96.89 • 2023",
    college: "VJTI Mumbai – EXTC",
    img: arya
  },
  {
    name: "Sanket",
    score: "MHTCET 97.63 • JEE 93.98",
    college: "VJTI Mumbai – Electrical",
    img: sanket,
  },
  {
    name: "Om",
    score: "MHTCET 98.49 • 2023",
    college: "Mumbai – Mechanical",
    img: om,
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-8");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function CareerOSHome() {
  useReveal();

  return (
    <div className="font-sans bg-slate-50 text-slate-900 overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Manrope', sans-serif; }
        .font-display { font-family: 'Bebas Neue', cursive; }
        .reveal { transition: opacity 0.65s ease, transform 0.65s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100svh" }}>
        {/* BG */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1240]/97 via-[#0D1B6E]/92 to-[#1A3BAA]/80" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        {/* NAV */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-4 shrink-0">
          <span className="font-display text-3xl text-white tracking-widest">
            CAREER<span className="text-amber-400">OS</span>
          </span>
          <a
            href="/predict"
            className="bg-amber-400 text-[#0A1240] text-xs font-extrabold tracking-wide px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/40 transition-all duration-200"
          >
            Predict My Percentile →
          </a>
        </nav>

        {/* CONTENT — justify-center on all sizes, content flows naturally with gap */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pb-6 pt-2 max-w-5xl mx-auto w-full gap-3 md:gap-4">

          <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] md:text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit">
            🎓 By Rankers · For Future Rankers
          </span>

          <h1 className="font-display text-[clamp(2.8rem,9vw,6.5rem)] text-white leading-[0.92] tracking-wide">
            DON'T LET<br />
            <span className="text-amber-400">CONFUSION</span><br />
            DECIDE YOUR<br />
            NEXT FOUR YEARS
          </h1>

          <p className="text-white/65 text-sm md:text-base max-w-lg leading-relaxed font-medium">
            Guided by top JEE &amp; MHT-CET rankers. Navigate Maharashtra engineering
            admissions with clarity, confidence, and a real strategy.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/predict"
              className="bg-amber-400 text-[#0A1240] font-extrabold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/40 transition-all duration-200 inline-flex items-center gap-2"
            >
              🎯 Predict My Percentile
            </a>
            <a
              href="#contact"
              className="text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-full border-2 border-white/30 hover:border-white/70 hover:bg-white/5 transition-all duration-200 inline-block"
            >
              Talk to a Mentor
            </a>
          </div>

          {/* Stats — right below buttons, no floating */}
          <div className="flex flex-wrap gap-6 md:gap-10 pt-3 border-t border-white/10 w-full max-w-lg mt-1">
            {[
              { num: "250+", label: "Students Mentored" },
              { num: "2+",   label: "Years Experience" },
              { num: "24/7", label: "Support" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-display text-[1.7rem] md:text-[2rem] text-amber-400 leading-none tracking-wide">{s.num}</span>
                <span className="text-[9px] md:text-[10px] text-white/50 font-semibold tracking-widest uppercase">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          PAIN SECTION
      ════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal opacity-0 translate-y-8 relative rounded-2xl overflow-hidden h-[380px] md:h-[460px] shadow-2xl shadow-blue-900/20">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                alt="Confused student"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1240]/70 to-transparent" />
              <div className="absolute bottom-5 left-5 bg-[#0A1240]/80 backdrop-blur-sm border border-amber-400/20 rounded-xl px-4 py-3">
                <p className="font-display text-3xl text-amber-400 leading-none">100+</p>
                <p className="text-[11px] text-white/60 font-semibold tracking-wide uppercase mt-0.5">PCM Students Guided</p>
              </div>
            </div>

            <div>
              <div className="reveal opacity-0 translate-y-8">
                <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-blue-700 mb-3">You're Not Alone</p>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] text-[#0D1B6E] leading-[1.05] mb-4">
                  CONFUSED ABOUT<br />
                  <span className="text-blue-600">ADMISSIONS?</span>
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
                  Every year, thousands of PCM students stare at cutoff lists and
                  conflicting advice — unsure what to do next.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {painPoints.map((p, i) => (
                  <div
                    key={i}
                    className="reveal opacity-0 translate-y-8 flex items-center gap-4 bg-blue-50 border-l-4 border-blue-700 rounded-xl px-5 py-4 hover:translate-x-1.5 transition-transform duration-200"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span className="text-2xl shrink-0">{p.icon}</span>
                    <span className="text-sm font-semibold text-[#0D1B6E]">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section
        className="relative py-20 px-6 md:px-12 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1240 0%, #0D1B6E 55%, #1A3BAA 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="reveal opacity-0 translate-y-8">
                <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-amber-400 mb-3">What We Offer</p>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] text-white leading-[1.05] mb-4">
                  EVERYTHING YOU NEED.<br />ONE SUPPORT SYSTEM.
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-sm">
                  From the first CAP round to the final spot round — every step covered.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="reveal opacity-0 translate-y-8 bg-white/[0.06] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.11] hover:-translate-y-1 transition-all duration-200 cursor-default"
                    style={{ transitionDelay: `${i * 55}ms` }}
                  >
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <p className="text-[11px] font-extrabold text-white tracking-wide uppercase leading-snug">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0 translate-y-8 flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden h-56">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-amber-400 text-[#0A1240] text-[10px] font-extrabold tracking-wide uppercase px-3 py-1 rounded-full">
                  Student-to-Student Guidance
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden h-36">
                  <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&q=80" alt="Mentorship" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden h-36">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80" alt="Prediction" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY
      ════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="reveal opacity-0 translate-y-8">
                <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-blue-700 mb-3">Smart College Choice</p>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] text-[#0D1B6E] leading-[1.05] mb-4">
                  THE RIGHT COLLEGE ISN'T<br />ALWAYS THE<br />
                  <span className="text-blue-600">HIGHEST CUTOFF.</span>
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                  We help you look beyond percentiles to what truly matters for your four years and your career.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                {whyPoints.map((w, i) => (
                  <div
                    key={i}
                    className="reveal opacity-0 translate-y-8 flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 shadow-sm shadow-blue-900/5 hover:shadow-md hover:shadow-blue-900/10 transition-shadow duration-200"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#0D1B6E] flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 12 10" stroke="#F5C518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1.5,5 4.5,8 10.5,1.5" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-[#0D1B6E]">{w}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0 translate-y-8 flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl shadow-blue-900/15">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80" alt="Campus" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1240]/80 to-transparent flex flex-col justify-end p-5">
                  <p className="font-display text-2xl text-white leading-tight">
                    FOUR YEARS. <span className="text-amber-400">ONE DECISION.</span>
                  </p>
                  <p className="text-[10px] text-white/55 font-semibold tracking-widest uppercase mt-1">Make It Count</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden h-36">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden h-36">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80" alt="Study" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MENTORS
      ════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="reveal opacity-0 translate-y-8 text-center mb-12">
            <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-blue-700 mb-3">Meet the Team</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] text-[#0D1B6E] leading-[1.05] mb-3">
              GUIDED BY TOP<br />
              <span className="text-blue-600">JEE &amp; MHT-CET RANKERS</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
              Currently studying in reputed engineering colleges with 2+ years of
              mentorship experience and 100+ students guided.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mentors.map((m, i) => (
  <div
    key={i}
    className="reveal opacity-0 translate-y-8 group rounded-2xl overflow-hidden border border-blue-50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/12 transition-all duration-300"
    style={{ transitionDelay: `${i * 100}ms` }}
  >
    <div className="h-1.5 bg-gradient-to-r from-[#0D1B6E] to-[#1A3BAA]" />
    
    {/* 1. Increased height from h-52 to h-64 */}
    <div className="relative h-64 overflow-hidden"> 
      
      {/* 2. Added object-top right after object-cover */}
      <img 
        src={m.img} 
        alt={m.name} 
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1240]/60 to-transparent" />
      <span className="absolute bottom-3 left-3 bg-amber-400 text-[#0A1240] text-[10px] font-extrabold tracking-wide px-3 py-1 rounded-full">
        {m.score}
      </span>
    </div>
    
    <div className="px-5 py-5">
      <p className="font-display text-[2rem] text-[#0D1B6E] tracking-widest leading-none mb-1">{m.name}</p>
      <p className="text-sm text-slate-500 font-semibold leading-snug">{m.college}</p>
    </div>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section id="contact" className="relative py-20 px-6 md:px-12 overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1240]/97 via-[#0D1B6E]/94 to-[#1A3BAA]/88" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="reveal opacity-0 translate-y-8">
            <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-amber-400 mb-3">Book Your Session</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[1.05] mb-4">
              STILL CONFUSED?<br />LET'S TALK.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Book a free guidance session. Get clarity on college, branch, and your
              entire admission strategy — from real rankers who've done it.
            </p>
            <a
              href="/predict"
              className="bg-amber-400 text-[#0A1240] font-extrabold text-base px-9 py-4 rounded-full inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/40 transition-all duration-200"
            >
              🎯 Predict My Rank First
            </a>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { icon: "📞", label: "Sanket: 9356605358", href: "https://wa.me/919356605358" },
                { icon: "📞", label: "Arya: 9404168362", href: "https://wa.me/919404168362" },
                { icon: "✉️", label: "Email Us", href: "mailto:Carrerosadmission101@gmail.com" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-white/10 border border-white/15 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-white/18 transition-colors duration-200"
                >
                  <span>{c.icon}</span> {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-[#0A1240] py-6 px-6 text-center">
        <p className="font-display text-xl text-amber-400 tracking-[3px] mb-1">CAREER OS</p>
        <p className="text-[11px] text-white/30 font-medium">
          © 2026 Career OS · By Rankers, For Future Rankers · Carrerosadmission101@gmail.com
        </p>
      </footer>

    </div>
  );
}