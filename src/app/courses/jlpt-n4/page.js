"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer  from "@/app/components/Footer";
// ── Floating kanji ────────────────────────────────────────────────────────────
const HERO_CHARS = [
  { c: "四", x: 5,  y: 12, size: 58, dur: 7,   delay: 0    },
  { c: "話", x: 80, y: 7,  size: 46, dur: 8.5, delay: 1.2  },
  { c: "文", x: 90, y: 55, size: 52, dur: 6.5, delay: 0.5  },
  { c: "法", x: 3,  y: 68, size: 38, dur: 9,   delay: 2.0  },
  { c: "読", x: 56, y: 78, size: 50, dur: 7.5, delay: 1.0  },
  { c: "解", x: 70, y: 4,  size: 42, dur: 8,   delay: 2.5  },
  { c: "N", x: 38, y: 40, size: 80, dur: 10,  delay: 0.3  },
  { c: "4", x: 93, y: 28, size: 72, dur: 6,   delay: 1.6  },
];

const KANJI_KF = HERO_CHARS.map(({ c }) => {
  const n = `hk4${c.codePointAt(0)}`;
  return `@keyframes ${n} {
    0%   { transform: translateY(0px)   translateX(0px)  rotate(-4deg); opacity: 0.16; }
    25%  { transform: translateY(-13px) translateX(5px)  rotate(3deg);  opacity: 0.26; }
    50%  { transform: translateY(-21px) translateX(-4px) rotate(-2deg); opacity: 0.20; }
    75%  { transform: translateY(-7px)  translateX(8px)  rotate(5deg);  opacity: 0.28; }
    100% { transform: translateY(0px)   translateX(0px)  rotate(-4deg); opacity: 0.16; }
  }`;
}).join("\n");

function FloatingKanji({ c, x, y, size, dur, delay }) {
  const n = `hk4${c.codePointAt(0)}`;
  return (
    <span aria-hidden style={{
      position:"absolute", left:`${x}%`, top:`${y}%`,
      fontSize:`${size}px`, color:"rgba(255,255,255,0.9)",
      fontWeight:900, pointerEvents:"none", userSelect:"none",
      lineHeight:1, opacity:0.16,
      animation:`${n} ${dur}s ease-in-out ${delay}s infinite`,
    }}>{c}</span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const EXAM_SECTIONS = [
  { section:"Language Knowledge (Vocabulary & Grammar)", duration:"30 min", questions:"~35", score:60, passing:19 },
  { section:"Reading", duration:"60 min", questions:"~32", score:60, passing:19 },
  { section:"Listening", duration:"35 min", questions:"~35", score:60, passing:19 },
  { section:"Total", duration:"125 min", questions:"~102", score:180, passing:90, bold:true },
];

const TREND_DATA = [
  { year:2015, val:750 }, { year:2016, val:810 }, { year:2017, val:880 },
  { year:2018, val:960 }, { year:2019, val:1030 }, { year:2020, val:520 },
  { year:2021, val:700 }, { year:2022, val:790 }, { year:2023, val:910 },
  { year:2024, val:980 },
];

const KEY_INFO = [
  { label:"Level",          value:"Intermediate — second easiest of the five JLPT levels (N5 to N1)" },
  { label:"Prerequisite",   value:"Recommended to have passed JLPT N5 or equivalent knowledge" },
  { label:"Purpose",        value:"Certifies ability to understand Japanese in everyday situations beyond basic level" },
  { label:"Skills Tested",  value:"Vocabulary (~1,500 words), grammar (~170 patterns), reading, and listening" },
  { label:"Kanji",          value:"Approximately 300 kanji required for the exam" },
  { label:"Test Frequency", value:"Twice a year in Japan (July & December); once a year in some regions" },
  { label:"Certificate",    value:"JLPT certificates do not expire and are recognized globally" },
];

const TIPS = [
  "Expand your kanji knowledge to ~300 characters with readings and stroke order.",
  "Build vocabulary to ~1,500 words using spaced-repetition apps like Anki.",
  "Study ~170 grammar patterns — focus on て-form, potential form, and conditionals.",
  "Read NHK Web Easy news articles daily to build reading speed and comprehension.",
  "Practice listening with Shadowing: Let's Speak Japanese or JLPT N4 audio drills.",
  "Take timed practice exams to manage the longer test duration (125 minutes).",
  "Review N5 material thoroughly — N4 builds directly on N5 grammar and vocabulary.",
];

const CAREERS = [
  { icon:"✈️", title:"Working Holiday Visa",   desc:"N4 certification strengthens applications for Japan working holiday programs and exchange visas." },
  { icon:"🏢", title:"Entry-Level Japan Jobs",  desc:"Many companies hiring for Japan-facing roles value N4 as a sign of genuine language commitment." },
  { icon:"🎌", title:"Cultural Exchange",       desc:"Enables meaningful daily conversation with Japanese speakers, opening doors to cultural immersion." },
  { icon:"📚", title:"University Preparation",  desc:"Required or recommended for some Japanese university preparatory and language programs." },
  { icon:"🚀", title:"Pathway to N3",           desc:"N4 is the critical bridge to N3, which is widely recognized as the first professionally useful level." },
  { icon:"💡", title:"Business Foundation",     desc:"Demonstrates commitment that impresses Japanese employers even for roles not requiring fluency." },
];

// ── Inline sparkline chart ────────────────────────────────────────────────────
function TrendChart() {
  const W = 600, H = 180, PAD = { t:20, r:20, b:36, l:56 };
  const inner = { w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b };
  const minV = 0, maxV = 1200;
  const xs = TREND_DATA.map((_,i) => PAD.l + (i/(TREND_DATA.length-1))*inner.w);
  const ys = TREND_DATA.map(d => PAD.t + inner.h - ((d.val-minV)/(maxV-minV))*inner.h);
  const pathD = TREND_DATA.map((_,i)=>`${i===0?"M":"L"}${xs[i].toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const areaD = pathD + ` L${xs[xs.length-1].toFixed(1)},${(PAD.t+inner.h).toFixed(1)} L${PAD.l},${(PAD.t+inner.h).toFixed(1)} Z`;
  const yTicks = [0,200,400,600,800,1000,1200];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto"}}>
      {yTicks.map(v=>{
        const cy = PAD.t + inner.h - ((v-minV)/(maxV-minV))*inner.h;
        return (
          <g key={v}>
            <line x1={PAD.l} y1={cy} x2={PAD.l+inner.w} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x={PAD.l-8} y={cy+4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.3)">{v}</text>
          </g>
        );
      })}
      <path d={areaD} fill="rgba(220,38,38,0.12)"/>
      <path d={pathD} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {TREND_DATA.map((d,i)=>(
        <circle key={i} cx={xs[i]} cy={ys[i]} r="3.5" fill="#ef4444" stroke="#0a0a0a" strokeWidth="1.5"/>
      ))}
      {TREND_DATA.map((d,i)=>(
        <text key={i} x={xs[i]} y={H-6} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">{d.year}</text>
      ))}
      <text x={14} y={PAD.t+inner.h/2} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)"
        transform={`rotate(-90,14,${PAD.t+inner.h/2})`}>Test-Takers (Thousands)</text>
    </svg>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, active, label, children }) {
  if (active !== id) return null;
  return (
    <section id={id} style={{animation:"fadeUp 0.5s ease both"}}>
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-6 rounded-sm shrink-0" style={{background:"#dc2626"}}/>
      <h2 className="text-xl md:text-2xl font-black text-white"
        style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>
        {children}
      </h2>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JlptN4Page() {
  const [activeTab, setActiveTab] = useState("overview");

  const TABS = [
    { id:"overview", label:"Overview"     },
    { id:"exam",     label:"Exam Pattern" },
    { id:"dates",    label:"Test Dates"   },
    { id:"careers",  label:"Careers"      },
    { id:"tips",     label:"Prep Tips"    },
    { id:"trends",   label:"Trends"       },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700&display=swap');
        ${KANJI_KF}

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu  { animation:fadeUp 0.7s ease both; }
        .fu1 { animation-delay:0.1s; }
        .fu2 { animation-delay:0.22s; }
        .fu3 { animation-delay:0.35s; }

        .tab-btn { transition:all 0.2s ease; }
        .tab-btn:hover { color:white !important; }
        .info-row:nth-child(even) { background:rgba(255,255,255,0.025); }
        .info-row:hover { background:rgba(220,38,38,0.06) !important; }
        .tip-item:hover { border-color:rgba(220,38,38,0.4) !important; background:rgba(220,38,38,0.04) !important; }
        .career-card:hover { border-color:rgba(220,38,38,0.5) !important; transform:translateY(-3px); }
        .career-card { transition:all 0.25s ease; }
        .n4-badge { background:rgba(37,99,235,0.15); border:1px solid rgba(37,99,235,0.35); color:#60a5fa; }
      `}</style>
    <Header/>
      <div className="relative min-h-screen overflow-x-hidden" style={{fontFamily:"'Outfit',sans-serif",background:"#0a0a0a"}}>

        {/* ── HERO ── */}
        <section className="relative z-10 overflow-hidden" style={{
          background:"linear-gradient(135deg,#7f1d1d 0%,#991b1b 40%,#450a0a 100%)",
          minHeight:300,
        }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {HERO_CHARS.map((h,i)=><FloatingKanji key={i} {...h}/>)}
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            opacity:0.4,
          }}/>
          <div className="absolute right-0 top-0 h-full pointer-events-none" style={{width:200,opacity:0.07}}>
            {[0,1,2,3,4].map(i=>(
              <div key={i} className="absolute top-0 h-full" style={{left:i*40,width:1,background:"white"}}/>
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-20">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 mb-5 fu">
              <Link href="/courses" className="text-xs tracking-widest uppercase text-red-200/60 hover:text-red-200 transition-colors">Courses</Link>
              <span className="text-red-200/30 text-xs">›</span>
              <span className="text-xs tracking-widest uppercase text-red-200/40">JLPT N4</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                {/* N4 vs N5 pill */}
                <div className="flex items-center gap-2 mb-4 fu">
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm">
                    <span>中級</span>
                    <span className="text-red-300/30">·</span>
                    <span>Intermediate Level</span>
                  </div>
                  <div className="n4-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold tracking-widest uppercase">
                    <span>↑</span>
                    <span>Above N5</span>
                  </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-3 fu fu1"
                  style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>
                  JLPT N4
                </h1>
                <p className="text-white/55 max-w-md text-sm leading-relaxed fu fu2">
                  The first milestone of real fluency. Build on your N5 foundation with ~1,500 vocabulary words, 300 kanji, and 170 grammar patterns that unlock meaningful everyday conversation in Japan.
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex gap-3 fu fu3">
                {[
                  {v:"180",  l:"Total Points"},
                  {v:"125",  l:"Minutes"},
                  {v:"~102", l:"Questions"},
                ].map((s,i)=>(
                  <div key={i} className="text-center px-5 py-3 rounded-sm"
                    style={{background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.1)"}}>
                    <div className="text-3xl font-black text-white" style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>{s.v}</div>
                    <div className="text-xs tracking-widest uppercase mt-0.5" style={{color:"rgba(255,255,255,0.35)"}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* N4 vs N5 comparison strip */}
            <div className="mt-8 mb-6 p-4 rounded-sm fu fu3" style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.08)"}}>
              <div className="text-xs tracking-widest uppercase mb-3" style={{color:"rgba(255,255,255,0.35)"}}>N4 vs N5 at a Glance</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {label:"Vocabulary", n5:"~800",  n4:"~1,500"},
                  {label:"Kanji",      n5:"~100",  n4:"~300"},
                  {label:"Grammar",    n5:"~80",   n4:"~170 patterns"},
                  {label:"Time",       n5:"105min",n4:"125 min"},
                ].map((c,i)=>(
                  <div key={i}>
                    <div className="text-xs tracking-widest uppercase mb-1.5" style={{color:"rgba(255,255,255,0.3)"}}>{c.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-sm" style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.4)"}}>N5: {c.n5}</span>
                      <span className="text-white/30 text-xs">→</span>
                      <span className="text-xs px-2 py-0.5 rounded-sm font-bold" style={{background:"rgba(220,38,38,0.2)",color:"#fca5a5"}}>N4: {c.n4}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 fu fu3">
              <a
                href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
                target="_blank" rel="noreferrer"
                className="px-7 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{background:"white",color:"#7f1d1d"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#fef2f2";}}
                onMouseLeave={e=>{e.currentTarget.style.background="white";}}
              >Enroll Now →</a>
              <Link
                href="/courses/jlpt-n5"
                className="px-7 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.6)"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.45)";e.currentTarget.style.color="white";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.2)";e.currentTarget.style.color="rgba(255,255,255,0.6)";}}
              >← View N5 First</Link>
              <Link
                href="/courses"
                className="px-7 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{background:"transparent",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.4)"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.color="rgba(255,255,255,0.4)";}}
              >All Courses</Link>
            </div>
          </div>
        </section>

        {/* ── STICKY TABS ── */}
        <div className="sticky top-0 z-40" style={{background:"#111",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="max-w-5xl mx-auto px-6 flex gap-0 overflow-x-auto">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setActiveTab(t.id)}
                className="tab-btn shrink-0 px-5 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200"
                style={{
                  color: activeTab===t.id ? "white" : "rgba(255,255,255,0.35)",
                  borderBottom: activeTab===t.id ? "2px solid #dc2626" : "2px solid transparent",
                  background:"transparent",
                }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-14">

          {/* OVERVIEW */}
          <Section id="overview" active={activeTab} label="What is JLPT N4?">
            <p className="text-sm leading-relaxed mb-5" style={{color:"rgba(255,255,255,0.65)"}}>
              JLPT N4 is the second level of the Japanese Language Proficiency Test, one step above N5. It certifies the ability to understand basic Japanese used in a variety of everyday situations. Test-takers are expected to read and listen to topics encountered in daily life and school settings, and understand them with near-accurate comprehension.
            </p>
            <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.65)"}}>
              The exam requires approximately 1,500 vocabulary words, 300 kanji, and 170 grammar patterns. Conducted by the Japan Foundation and JEES, N4 is widely recognized in Japan's education and entry-level employment sectors as proof of meaningful Japanese communication ability.
            </p>

            <div className="mt-8">
              <SectionLabel>Key Information</SectionLabel>
              <div className="mt-4 rounded-sm overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.07)"}}>
                {KEY_INFO.map((item,i)=>(
                  <div key={i} className="info-row flex gap-4 px-5 py-3.5 transition-colors duration-200"
                    style={{borderBottom:i<KEY_INFO.length-1?"1px solid rgba(255,255,255,0.05)":"none"}}>
                    <span className="text-xs font-bold tracking-widest uppercase shrink-0 w-36 pt-0.5" style={{color:"#ef4444"}}>{item.label}</span>
                    <span className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.65)"}}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* EXAM PATTERN */}
          <Section id="exam" active={activeTab} label="Exam Pattern & Marks Distribution">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              The JLPT N4 exam has a total score of 180 points across three sections. To pass, you need an overall score of at least 90/180 (50%) and a minimum of 19/60 (31.67%) in each individual section. All questions are multiple-choice.
            </p>

            <div className="overflow-x-auto rounded-sm" style={{border:"1px solid rgba(255,255,255,0.08)"}}>
              <table className="w-full text-sm" style={{borderCollapse:"collapse",minWidth:480}}>
                <thead>
                  <tr style={{background:"#dc2626"}}>
                    {["Section","Duration","Questions","Score","Passing Score"].map(h=>(
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-white">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EXAM_SECTIONS.map((row,i)=>(
                    <tr key={i} style={{
                      background: row.bold ? "rgba(220,38,38,0.08)" : i%2===0 ? "rgba(255,255,255,0.02)" : "transparent",
                      borderBottom:"1px solid rgba(255,255,255,0.05)",
                    }}>
                      <td className="px-4 py-3" style={{color:row.bold?"white":"rgba(255,255,255,0.7)",fontWeight:row.bold?700:400}}>{row.section}</td>
                      <td className="px-4 py-3" style={{color:"rgba(255,255,255,0.6)",fontWeight:row.bold?700:400}}>{row.duration}</td>
                      <td className="px-4 py-3" style={{color:"rgba(255,255,255,0.6)",fontWeight:row.bold?700:400}}>{row.questions}</td>
                      <td className="px-4 py-3" style={{color:row.bold?"#ef4444":"rgba(255,255,255,0.6)",fontWeight:row.bold?700:400}}>{row.score}</td>
                      <td className="px-4 py-3" style={{color:row.bold?"#ef4444":"rgba(255,255,255,0.6)",fontWeight:row.bold?700:400}}>{row.passing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Score breakdown */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                {label:"Vocab & Grammar", pct:60, color:"#ef4444"},
                {label:"Reading",         pct:60, color:"#f97316"},
                {label:"Listening",       pct:60, color:"#eab308"},
              ].map((s,i)=>(
                <div key={i} className="p-4 rounded-sm" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="text-xs tracking-widest uppercase mb-2" style={{color:"rgba(255,255,255,0.4)"}}>{s.label}</div>
                  <div className="text-2xl font-black text-white mb-2" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{s.pct} pts</div>
                  <div className="h-1.5 rounded-full" style={{background:"rgba(255,255,255,0.07)"}}>
                    <div className="h-full rounded-full" style={{width:"100%",background:s.color}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Passing score callout */}
            <div className="mt-5 px-5 py-4 rounded-sm flex items-start gap-4" style={{background:"rgba(220,38,38,0.06)",border:"1px solid rgba(220,38,38,0.2)"}}>
              <div className="shrink-0 text-2xl font-black text-red-500 mt-0.5" style={{fontFamily:"'Bebas Neue',sans-serif"}}>90</div>
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-red-400 mb-1">Overall Pass Score</div>
                <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>
                  N4 requires a higher overall pass mark (90/180 = 50%) compared to N5 (80/180 = 44.44%), reflecting the increased difficulty. You must also score at least 19/60 in every section — a low score in one section will fail you regardless of your total.
                </p>
              </div>
            </div>
          </Section>

          {/* TEST DATES */}
          <Section id="dates" active={activeTab} label="Test Dates for 2026">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              JLPT N4 is held on the same dates as all other JLPT levels. Plan your preparation timeline to allow at least 3–6 months of focused study before your target date.
            </p>

            <div className="space-y-3 mb-5">
              {[
                {date:"July 5, 2026",     reg:"Registration opens mid-March", status:"Upcoming", color:"#22c55e"},
                {date:"December 6, 2026", reg:"Registration opens mid-August", status:"Upcoming", color:"#22c55e"},
              ].map((d,i)=>(
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 rounded-sm"
                  style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="flex items-center gap-4">
                    <div className="text-center px-4 py-2 rounded-sm" style={{background:"rgba(220,38,38,0.12)",border:"1px solid rgba(220,38,38,0.2)"}}>
                      <div className="text-xs tracking-widest uppercase" style={{color:"rgba(255,255,255,0.4)"}}>{d.date.split(" ")[0]}</div>
                      <div className="text-2xl font-black text-white" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{d.date.split(" ")[1].replace(",","")}</div>
                      <div className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>{d.date.split(" ")[2]}</div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{d.date}</div>
                      <div className="text-xs mt-0.5" style={{color:"rgba(255,255,255,0.45)"}}>{d.reg}</div>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm"
                    style={{background:`${d.color}22`,color:d.color,border:`1px solid ${d.color}44`}}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Study timeline */}
            <div className="mt-6">
              <SectionLabel>Recommended Study Timeline</SectionLabel>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {month:"Months 1–2", focus:"Vocabulary & Kanji", desc:"Learn 750 new words and 200 new kanji on top of your N5 base using spaced repetition."},
                  {month:"Months 3–4", focus:"Grammar & Reading",  desc:"Master 170 grammar patterns and practice reading NHK Easy News articles daily."},
                  {month:"Month 5–6",  focus:"Mock Exams",         desc:"Take full timed practice tests weekly. Review mistakes and target weak sections."},
                ].map((t,i)=>(
                  <div key={i} className="p-4 rounded-sm" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{color:"#ef4444"}}>{t.month}</div>
                    <div className="text-sm font-bold text-white mb-2">{t.focus}</div>
                    <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 px-5 py-4 rounded-sm" style={{background:"rgba(234,179,8,0.06)",border:"1px solid rgba(234,179,8,0.15)"}}>
              <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>
                <span className="font-bold text-yellow-400">Note: </span>
                Test availability varies by region. Some locations may offer only one session per year. Verify with your local Japanese Cultural Institute or test center.
              </p>
            </div>
          </Section>

          {/* CAREERS */}
          <Section id="careers" active={activeTab} label="Career Opportunities with JLPT N4">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              JLPT N4 is the first level that begins to open real doors in Japan. It signals to employers, universities, and visa authorities that you can communicate meaningfully in everyday Japanese. While N3 and above are often required for professional roles, N4 serves as a respected stepping stone.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAREERS.map((c,i)=>(
                <div key={i} className="career-card p-5 rounded-sm"
                  style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="text-2xl mb-3">{c.icon}</div>
                  <div className="text-sm font-bold text-white mb-2">{c.title}</div>
                  <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.55)"}}>{c.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* PREP TIPS */}
          <Section id="tips" active={activeTab} label="Preparation Tips">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              N4 demands significantly more commitment than N5. Expect 350–500 hours of total study time for students starting from N5 level. Here's how to make those hours count:
            </p>
            <div className="space-y-3">
              {TIPS.map((tip,i)=>(
                <div key={i} className="tip-item flex gap-4 items-start px-5 py-4 rounded-sm transition-all duration-200"
                  style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <span className="shrink-0 w-7 h-7 rounded-sm flex items-center justify-center text-xs font-black text-white"
                    style={{background:"#dc2626"}}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <p className="text-sm leading-relaxed pt-0.5" style={{color:"rgba(255,255,255,0.65)"}}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Resource callout */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {title:"Recommended Books",  items:["Nihongo So-Matome N4","Tobira Gateway","Anki N4 Vocabulary Deck"]},
                {title:"Useful Apps & Sites", items:["WaniKani (kanji)","Jisho.org (dictionary)","NHK Web Easy (reading)"]},
              ].map((r,i)=>(
                <div key={i} className="p-5 rounded-sm" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:"#ef4444"}}>{r.title}</div>
                  <ul className="space-y-2">
                    {r.items.map((item,j)=>(
                      <li key={j} className="flex items-center gap-2 text-sm" style={{color:"rgba(255,255,255,0.6)"}}>
                        <span className="w-1 h-1 rounded-full shrink-0" style={{background:"#ef4444"}}/>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* TRENDS */}
          <Section id="trends" active={activeTab} label="Trends in JLPT N4 Pakistan (2015–2024)">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              Interest in JLPT N4 has grown steadily as more Pakistanis pursue Japan's Specified Skilled Worker (SSW) visa and academic opportunities. The chart below shows worldwide test-taker trends; Pakistan-specific growth mirrors and often exceeds this global curve.
            </p>
            <div className="p-5 rounded-sm" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5" style={{background:"#ef4444"}}/>
                <span className="text-xs tracking-widest uppercase" style={{color:"rgba(255,255,255,0.4)"}}>JLPT Test-Takers (Thousands)</span>
              </div>
              <TrendChart/>
            </div>
          </Section>

          {/* ── ENROLL CTA ── */}
          <div className="p-8 md:p-12 rounded-sm relative overflow-hidden"
            style={{background:"linear-gradient(135deg,#7f1d1d 0%,#991b1b 50%,#450a0a 100%)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-9xl font-black text-white/5 select-none pointer-events-none"
              style={{fontFamily:"serif"}}>合格</div>
            <div className="relative z-10 max-w-lg">
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm">
                中級への第一歩
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-none mb-4"
                style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>
                REACH THE NEXT<br/>
                <span style={{color:"rgba(255,255,255,0.5)"}}>LEVEL WITH JLPT N4</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Join Ohayo Pakistan's JLPT N4 course and unlock the intermediate Japanese proficiency that employers and universities in Japan demand.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
                  target="_blank" rel="noreferrer"
                  className="inline-block px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                  style={{background:"white",color:"#7f1d1d"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#fef2f2";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="white";}}
                >Enroll Now →</a>
                <Link
                  href="/courses/jlpt-n5"
                  className="inline-block px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                  style={{background:"transparent",border:"1px solid rgba(255,255,255,0.3)",color:"rgba(255,255,255,0.7)"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.6)";e.currentTarget.style.color="white";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.3)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}
                >Start with N5 instead</Link>
              </div>
            </div>
          </div>

        </main>
        <div className="h-20"/>
      </div>
      <Footer/>
    </>
  );
}