"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ── Cloud + BG (consistent with site) ─────────────────────────────────────────
function Cloud({ x, y, scale = 1, opacity = 0.25, rotate = 0, id = "dsa" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70"
      style={{
        position: "absolute", left: x, top: y, width: `${120 * scale}px`,
        opacity, transform: `rotate(${rotate}deg)`,
        pointerEvents: "none", userSelect: "none",
        filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
      }}
    >
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g fill="#7f1d1d" filter={`url(#${id})`}>
        <ellipse cx="60" cy="45" rx="38" ry="18" />
        <circle cx="40" cy="36" r="14" /><circle cx="60" cy="28" r="17" />
        <circle cx="80" cy="34" r="13" /><circle cx="24" cy="48" r="9" />
        <circle cx="96" cy="46" r="8" />
        <path d="M18 50 Q10 58 18 62 Q26 66 28 56" />
        <path d="M102 48 Q110 56 102 62 Q94 66 92 56" />
      </g>
    </svg>
  );
}

const CLOUDS = [
  { x: "5%",  y: "4%",  scale: 0.75, opacity: 0.28, rotate: -7,  id: "ca" },
  { x: "69%", y: "2%",  scale: 1.0,  opacity: 0.30, rotate: 5,   id: "cb" },
  { x: "87%", y: "26%", scale: 0.55, opacity: 0.20, rotate: -4,  id: "cc" },
  { x: "1%",  y: "54%", scale: 0.85, opacity: 0.26, rotate: 9,   id: "cd" },
  { x: "59%", y: "73%", scale: 0.65, opacity: 0.18, rotate: -6,  id: "ce" },
  { x: "31%", y: "87%", scale: 0.5,  opacity: 0.16, rotate: 4,   id: "cf" },
  { x: "77%", y: "81%", scale: 0.75, opacity: 0.22, rotate: -10, id: "cg" },
];

const BG_CHARS = [
  { c: "入", left: "9%",  top: "16%", size: 165, opacity: 0.04,  rotate: -11 },
  { c: "学", left: "83%", top: "21%", size: 145, opacity: 0.035, rotate: 8   },
  { c: "試", left: "47%", top: "57%", size: 205, opacity: 0.03,  rotate: -5  },
  { c: "験", left: "19%", top: "76%", size: 125, opacity: 0.04,  rotate: 10  },
  { c: "合", left: "73%", top: "79%", size: 115, opacity: 0.035, rotate: -8  },
];

const HERO_CHARS = [
  { c: "入", x: 11,  y: 22,  size: 50, dur: 7,   delay: 0    },
  { c: "学", x: 76,  y: 13,  size: 44, dur: 8.5, delay: 1.3  },
  { c: "試", x: 89,  y: 62,  size: 58, dur: 6.5, delay: 0.6  },
  { c: "験", x: 5,   y: 66,  size: 36, dur: 9,   delay: 2.1  },
  { c: "合", x: 51,  y: 76,  size: 48, dur: 7.5, delay: 1.0  },
  { c: "格", x: 63,  y: 7,   size: 40, dur: 8,   delay: 2.6  },
  { c: "日", x: 34,  y: 43,  size: 34, dur: 10,  delay: 0.4  },
  { c: "本", x: 92,  y: 33,  size: 30, dur: 6,   delay: 1.7  },
];

const KANJI_KF = HERO_CHARS.map(({ c }) => {
  const n = `afk${c.codePointAt(0)}`;
  return `@keyframes ${n} {
    0%   { transform:translateY(0px)   translateX(0px)  rotate(-5deg); opacity:0.20; }
    25%  { transform:translateY(-15px) translateX(6px)  rotate(3deg);  opacity:0.30; }
    50%  { transform:translateY(-23px) translateX(-5px) rotate(-2deg); opacity:0.24; }
    75%  { transform:translateY(-9px)  translateX(8px)  rotate(6deg);  opacity:0.32; }
    100% { transform:translateY(0px)   translateX(0px)  rotate(-5deg); opacity:0.20; }
  }`;
}).join("\n");

function FloatingKanji({ c, x, y, size, dur, delay }) {
  const n = `afk${c.codePointAt(0)}`;
  return (
    <span style={{
      position:"absolute", left:`${x}%`, top:`${y}%`,
      fontSize:`${size}px`, color:"rgba(255,255,255,0.9)",
      fontWeight:900, pointerEvents:"none", userSelect:"none",
      lineHeight:1, willChange:"transform,opacity", opacity:0.20,
      animation:`${n} ${dur}s ease-in-out ${delay}s infinite`,
    }} aria-hidden>{c}</span>
  );
}

function CloudBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {CLOUDS.map((c, i) => <Cloud key={i} {...c} />)}
      {BG_CHARS.map((b, i) => (
        <div key={i} style={{
          position:"absolute", left:b.left, top:b.top,
          fontSize:b.size, opacity:b.opacity,
          transform:`translate(-50%,-50%) rotate(${b.rotate}deg)`,
          color:"white", lineHeight:1, fontWeight:900,
          pointerEvents:"none", userSelect:"none",
          mixBlendMode:"overlay", filter:"blur(0.5px)",
        }} aria-hidden>{b.c}</div>
      ))}
    </div>
  );
}

// ── Course card data ───────────────────────────────────────────────────────────
const COURSES = [
  {
    num: "Course#01",
    title: "JLPT N5 & N4",
    details: [
      { label: "Course Duration", value: "14 Weeks" },
      { label: "Test Date", value: "December 2025" },
    ],
  },
  {
    num: "Course#02",
    title: "JLCT N4 & N5",
    details: [
      { label: "Course Duration", value: "10 Weeks" },
      { label: "Test Date", value: "02 November" },
    ],
  },
  {
    num: "Course#03",
    title: "JFT Basic",
    details: [],
    badge: "Coming Soon",
  },
  {
    num: "Course#04",
    title: "SSW Skill Test",
    details: [
      { label: "Course Duration", value: "4 Weeks" },
      { label: "Categories", value: "Driver, Building Cleaning, Agriculture, Construction." },
    ],
  },
];

function CourseCard({ num, title, details, badge }) {
  return (
    <div className="relative flex flex-col p-5 rounded-sm transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-wide" style={{ color: "#ef4444" }}>{num}</span>
        <svg className="w-4 h-4 text-red-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>

      <h3 className="text-white font-bold text-lg mb-3" style={{ letterSpacing: "-0.01em" }}>{title}</h3>

      {badge && (
        <span className="inline-block text-xs px-2 py-0.5 rounded-sm mb-2 self-start"
          style={{ background: "rgba(153,27,27,0.35)", color: "#fca5a5", border: "1px solid rgba(185,28,28,0.4)" }}>
          {badge}
        </span>
      )}

      <div className="space-y-1.5 mt-auto">
        {details.map((d, i) => (
          <p key={i} className="text-xs text-white/50">
            {d.label}: <strong className="text-white/80 font-semibold">{d.value}</strong>
          </p>
        ))}
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-sm"
        style={{ background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.5), transparent)" }} />
    </div>
  );
}

// ── Form field helpers ─────────────────────────────────────────────────────────
const inputCls = "w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/35 text-sm focus:outline-none focus:border-red-600/60 focus:bg-white/8 transition-all duration-200";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

function FInput({ type = "text", placeholder }) {
  return <input type={type} className={inputCls} placeholder={placeholder} />;
}
function FSelect({ placeholder, options }) {
  return (
    <div className="relative">
      <select className={selectCls} defaultValue="">
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">▾</div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AdmissionsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700;800&display=swap');
        body { background: #0a0a0a; }
        ${KANJI_KF}
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu  { animation: fadeUp 0.65s ease both; }
        .fu1 { animation-delay:0.1s; }
        .fu2 { animation-delay:0.22s; }
        .fu3 { animation-delay:0.34s; }
        select option { background:#1a1a1a; color:white; }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden"
        style={{ fontFamily:"'Outfit', sans-serif", background:"#0a0a0a" }}>
        <CloudBg />
        <Header />

        {/* ── Hero banner ── */}
        <section className="relative z-10 overflow-hidden"
          style={{ background:"linear-gradient(135deg,#7f1d1d 0%,#991b1b 45%,#450a0a 100%)", minHeight:260 }}>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {HERO_CHARS.map((h, i) => <FloatingKanji key={i} {...h} />)}
          </div>

          {/* grain */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            opacity:0.4,
          }} />

          {/* vertical lines */}
          <div className="absolute right-0 top-0 h-full pointer-events-none" style={{ width:220, opacity:0.08 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} className="absolute top-0 h-full"
                style={{ left:i*44, width:1, background:"white" }} />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:grid md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm fu">
                入学申請
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight fu fu1"
                style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.03em" }}>
                Get Admit Today!
              </h1>
              <p className="text-white/65 text-sm leading-relaxed max-w-md fu fu2">
                Discover the experiences of learners who have transformed their Japanese language
                journey with our programs. From mastering JLPT N5 and N4 to securing SSW
                opportunities, our students share their success stories and how our courses
                helped them achieve their goals.
              </p>
            </div>

            {/* Right — decorative image slot */}
            <div className="hidden md:flex items-center justify-center fu fu3">
              <div className="relative w-64 h-52 rounded-sm overflow-hidden"
                style={{
                  background:"rgba(0,0,0,0.25)",
                  border:"1px solid rgba(255,255,255,0.1)",
                }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 3h16.5A.75.75 0 0121 3.75v13.5A.75.75 0 0120.25 18H3.75A.75.75 0 013 17.25V3.75A.75.75 0 013.75 3z" />
                  </svg>
                  <span className="text-white/20 text-xs tracking-widest uppercase">Hero Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Current Courses ── */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-red-500/70 mb-2">現在のコース</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ letterSpacing:"-0.02em" }}>
              Current Courses
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-4" style={{ background:"linear-gradient(90deg,transparent,#991b1b,transparent)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {COURSES.map((c, i) => <CourseCard key={i} {...c} />)}
          </div>
        </section>

        {/* ── Admission Form ── */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — image slot */}
            <div className="relative rounded-sm overflow-hidden"
              style={{ minHeight:460, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)" }}>
              {/* top-left label */}
              <div className="absolute top-5 left-5 z-10">
                <p className="text-white font-bold text-2xl leading-tight" style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.04em" }}>
                  start<br />learning
                </p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <svg className="w-9 h-9 opacity-15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 3h16.5A.75.75 0 0121 3.75v13.5A.75.75 0 0120.25 18H3.75A.75.75 0 013 17.25V3.75A.75.75 0 013.75 3z" />
                </svg>
                <span className="text-white/15 text-xs tracking-widest uppercase">Promo Image</span>
              </div>
              {/* decorative "JAPANESE" text overlay */}
              <div className="absolute bottom-6 left-4 right-4 text-center pointer-events-none">
                <span className="text-5xl font-black tracking-widest"
                  style={{ color:"rgba(153,27,27,0.25)", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.15em" }}>
                  JAPANESE
                </span>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <p className="text-xs uppercase tracking-widest text-red-500/70 mb-2">入学フォーム</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ letterSpacing:"-0.02em" }}>
                Admission Form
              </h2>

              <div className="space-y-3">
                <FInput placeholder="Your Full Name ?" />
                <FInput type="email" placeholder="Your Email ?" />
                <FInput type="tel" placeholder="Your Phone Number ?" />
                <FInput placeholder="Your City ?" />

                <FSelect placeholder="Select a Course" options={[
                  "JLPT N5 & N4","JLCT N4 & N5","JFT Basic","SSW Skill Test"
                ]} />

                <FSelect placeholder="How you'll attend classes?" options={[
                  "Online","In-Person","Hybrid"
                ]} />

                <FSelect placeholder="Select Your Education Level" options={[
                  "Matriculation","Intermediate","Bachelors","Masters","Other"
                ]} />

                <FSelect placeholder="Previous Japanese Language Experience" options={[
                  "None","Beginner (N5)","Elementary (N4)","Intermediate (N3)","Advanced"
                ]} />

                <textarea
                  className={inputCls}
                  placeholder="Any questions in your mind...?"
                  rows={4}
                />

                <button
                  className="w-full py-3.5 text-sm font-semibold tracking-widest uppercase text-white rounded-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background:"linear-gradient(135deg,#b91c1c,#7f1d1d)",
                    border:"1px solid rgba(185,28,28,0.5)",
                    letterSpacing:"0.1em",
                  }}
                >
                  Submit Application →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer placeholder ── */}
        <Footer />
      </div>
    </>
  );
}