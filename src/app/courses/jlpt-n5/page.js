"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/app/components/Header";
import Footer  from "@/app/components/Footer";
// ── Floating kanji ────────────────────────────────────────────────────────────
const HERO_CHARS = [
  { c: "五", x: 5,  y: 12, size: 58, dur: 7,   delay: 0    },
  { c: "語", x: 80, y: 7,  size: 46, dur: 8.5, delay: 1.2  },
  { c: "力", x: 90, y: 55, size: 52, dur: 6.5, delay: 0.5  },
  { c: "読", x: 3,  y: 68, size: 38, dur: 9,   delay: 2.0  },
  { c: "書", x: 56, y: 78, size: 50, dur: 7.5, delay: 1.0  },
  { c: "聞", x: 70, y: 4,  size: 42, dur: 8,   delay: 2.5  },
  { c: "N", x: 38, y: 40, size: 80, dur: 10,  delay: 0.3  },
  { c: "5", x: 93, y: 28, size: 72, dur: 6,   delay: 1.6  },
];

const KANJI_KF = HERO_CHARS.map(({ c }) => {
  const n = `hk${c.codePointAt(0)}`;
  return `@keyframes ${n} {
    0%   { transform: translateY(0px)   translateX(0px)  rotate(-4deg); opacity: 0.16; }
    25%  { transform: translateY(-13px) translateX(5px)  rotate(3deg);  opacity: 0.26; }
    50%  { transform: translateY(-21px) translateX(-4px) rotate(-2deg); opacity: 0.20; }
    75%  { transform: translateY(-7px)  translateX(8px)  rotate(5deg);  opacity: 0.28; }
    100% { transform: translateY(0px)   translateX(0px)  rotate(-4deg); opacity: 0.16; }
  }`;
}).join("\n");

function FloatingKanji({ c, x, y, size, dur, delay }) {
  const n = `hk${c.codePointAt(0)}`;
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
  { section:"Language Knowledge (Vocabulary)", duration:"25 min", questions:"~30", score:60, passing:19 },
  { section:"Language Knowledge (Grammar) & Reading", duration:"50 min", questions:"~25", score:60, passing:19 },
  { section:"Listening", duration:"30 min", questions:"~20", score:60, passing:19 },
  { section:"Total", duration:"105 min", questions:"~75", score:180, passing:80, bold:true },
];

const TREND_DATA = [
  { year:2015, val:880 }, { year:2016, val:920 }, { year:2017, val:970 },
  { year:2018, val:1050 }, { year:2019, val:1120 }, { year:2020, val:590 },
  { year:2021, val:760 }, { year:2022, val:820 }, { year:2023, val:960 },
  { year:2024, val:1010 },
];

const KEY_INFO = [
  { label:"Level",            value:"Beginner (easiest of the five JLPT levels: N5 to N1)" },
  { label:"Purpose",          value:"Certifies basic proficiency for academic, personal, or early career goals" },
  { label:"Skills Tested",    value:"Vocabulary, grammar, reading, and listening comprehension" },
  { label:"Test Frequency",   value:"Twice a year in Japan (July & December); once a year in some regions" },
  { label:"Certificate",      value:"JLPT certificates do not expire" },
];

const TIPS = [
  "Master hiragana and katakana — essential for reading and writing.",
  "Study ~100 kanji and ~800 vocabulary words using flashcards or apps.",
  "Practice basic grammar: verb forms like 食べる, particles like は and を.",
  "Read simple texts like children's books or manga to improve comprehension.",
  "Listen to beginner-level podcasts or watch anime with subtitles.",
  "Take mock exams to familiarize yourself with the test format and timing.",
];

const CAREERS = [
  { icon:"🎓", title:"Education",          desc:"Required for certain student visas in Japan or as a foundation for further studies." },
  { icon:"🌱", title:"Personal Growth",    desc:"Demonstrates commitment to learning Japanese — useful for cultural immersion or travel." },
  { icon:"💼", title:"Entry-Level Jobs",   desc:"Some companies value N5 for roles in tourism or retail requiring basic Japanese." },
  { icon:"📈", title:"Pathway to Higher", desc:"Prepares you for N4 and beyond, which are more valued in professional settings." },
];

// ── Inline sparkline chart (SVG) ──────────────────────────────────────────────
function TrendChart() {
  const W = 600, H = 180, PAD = { t:20, r:20, b:36, l:56 };
  const inner = { w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b };
  const minV = 0, maxV = 1200;
  const xs = TREND_DATA.map((d,i) => PAD.l + (i / (TREND_DATA.length-1)) * inner.w);
  const ys = TREND_DATA.map(d => PAD.t + inner.h - ((d.val - minV)/(maxV - minV))*inner.h);
  const pathD = TREND_DATA.map((d,i) => `${i===0?"M":"L"}${xs[i].toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const areaD = pathD + ` L${xs[xs.length-1].toFixed(1)},${(PAD.t+inner.h).toFixed(1)} L${PAD.l},${(PAD.t+inner.h).toFixed(1)} Z`;
  const yTicks = [0,200,400,600,800,1000,1200];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto" }}>
      {/* Y grid + labels */}
      {yTicks.map(v => {
        const cy = PAD.t + inner.h - ((v-minV)/(maxV-minV))*inner.h;
        return (
          <g key={v}>
            <line x1={PAD.l} y1={cy} x2={PAD.l+inner.w} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x={PAD.l-8} y={cy+4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.3)">{v}</text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={areaD} fill="rgba(220,38,38,0.12)" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {/* Points */}
      {TREND_DATA.map((d,i) => (
        <circle key={i} cx={xs[i]} cy={ys[i]} r="3.5" fill="#ef4444" stroke="#0a0a0a" strokeWidth="1.5"/>
      ))}
      {/* X labels */}
      {TREND_DATA.map((d,i) => (
        <text key={i} x={xs[i]} y={H-6} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">{d.year}</text>
      ))}
      {/* Y axis label */}
      <text x={14} y={PAD.t+inner.h/2} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)"
        transform={`rotate(-90,14,${PAD.t+inner.h/2})`}>Test-Takers (Thousands)</text>
    </svg>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JlptN5Page() {
  const [activeTab, setActiveTab] = useState("overview");

  const TABS = [
    { id:"overview",  label:"Overview" },
    { id:"exam",      label:"Exam Pattern" },
    { id:"dates",     label:"Test Dates" },
    { id:"careers",   label:"Careers" },
    { id:"tips",      label:"Prep Tips" },
    { id:"trends",    label:"Trends" },
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

        .tab-btn { transition: all 0.2s ease; }
        .tab-btn:hover { color: white !important; }

        .info-row:nth-child(even) { background: rgba(255,255,255,0.025); }
        .info-row:hover { background: rgba(220,38,38,0.06) !important; }

        .tip-item:hover { border-color: rgba(220,38,38,0.4) !important; background: rgba(220,38,38,0.04) !important; }
        .career-card:hover { border-color: rgba(220,38,38,0.5) !important; transform: translateY(-3px); }
        .career-card { transition: all 0.25s ease; }
      `}</style>
    <Header/>
      <div className="relative min-h-screen overflow-x-hidden" style={{ fontFamily:"'Outfit',sans-serif", background:"#0a0a0a" }}>

        {/* ── HERO ── */}
        <section className="relative z-10 overflow-hidden" style={{
          background:"linear-gradient(135deg,#7f1d1d 0%,#991b1b 40%,#450a0a 100%)",
          minHeight:300,
        }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {HERO_CHARS.map((h,i) => <FloatingKanji key={i} {...h}/>)}
          </div>
          {/* grain */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            opacity:0.4,
          }}/>
          {/* vertical lines */}
          <div className="absolute right-0 top-0 h-full pointer-events-none" style={{width:200,opacity:0.07}}>
            {[0,1,2,3,4].map(i=>(
              <div key={i} className="absolute top-0 h-full" style={{left:i*40,width:1,background:"white"}}/>
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-20">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 mb-5 fu">
              <Link href="/courses" className="text-xs tracking-widest uppercase text-red-200/60 hover:text-red-200 transition-colors">
                Courses
              </Link>
              <span className="text-red-200/30 text-xs">›</span>
              <span className="text-xs tracking-widest uppercase text-red-200/40">JLPT N5</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm fu">
                  <span>初級</span>
                  <span className="text-red-300/30">·</span>
                  <span>Beginner Level</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-3 fu fu1"
                  style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>
                  JLPT N5
                </h1>
                <p className="text-white/55 max-w-md text-sm leading-relaxed fu fu2">
                  The gateway to Japanese proficiency. Master 800 vocabulary words, 100 kanji, and foundational grammar recognized worldwide by the Japan Foundation.
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex gap-3 fu fu3">
                {[
                  {v:"180",l:"Total Points"},
                  {v:"105",l:"Minutes"},
                  {v:"~75",l:"Questions"},
                ].map((s,i)=>(
                  <div key={i} className="text-center px-5 py-3 rounded-sm"
                    style={{background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.1)"}}>
                    <div className="text-3xl font-black text-white" style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>{s.v}</div>
                    <div className="text-xs tracking-widest uppercase mt-0.5" style={{color:"rgba(255,255,255,0.35)"}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-8 fu fu3">
              <a
                href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
                target="_blank" rel="noreferrer"
                className="px-7 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{background:"white",color:"#7f1d1d"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#fef2f2";}}
                onMouseLeave={e=>{e.currentTarget.style.background="white";}}
              >
                Enroll Now →
              </a>
              <Link
                href="/courses"
                className="px-7 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{background:"transparent",border:"1px solid rgba(255,255,255,0.25)",color:"rgba(255,255,255,0.7)"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.5)";e.currentTarget.style.color="white";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}
              >
                ← All Courses
              </Link>
            </div>
          </div>
        </section>

        {/* ── STICKY NAV TABS ── */}
        <div className="sticky top-0 z-40" style={{background:"#111",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="max-w-5xl mx-auto px-6 flex gap-0 overflow-x-auto">
            {TABS.map(t=>(
              <button
                key={t.id}
                onClick={()=>setActiveTab(t.id)}
                className="tab-btn shrink-0 px-5 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200"
                style={{
                  color: activeTab===t.id ? "white" : "rgba(255,255,255,0.35)",
                  borderBottom: activeTab===t.id ? "2px solid #dc2626" : "2px solid transparent",
                  background:"transparent",
                }}
              >{t.label}</button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-14">

          {/* OVERVIEW */}
          <Section id="overview" active={activeTab} label="What is JLPT N5?">
            <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,0.65)"}}>
              JLPT N5 tests your ability to understand basic Japanese used in everyday situations. It focuses on simple phrases, greetings, and sentences, requiring familiarity with approximately 800 vocabulary words, 100 kanji, and basic grammar structures like verb conjugations and particles. The test is conducted by the Japan Foundation and Japan Educational Exchanges and Services (JEES) and is recognized worldwide.
            </p>

            <div className="mt-8">
              <SectionLabel>Key Information</SectionLabel>
              <div className="mt-4 rounded-sm overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.07)"}}>
                {KEY_INFO.map((item,i)=>(
                  <div key={i} className="info-row flex gap-4 px-5 py-3.5 transition-colors duration-200"
                    style={{borderBottom: i<KEY_INFO.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none"}}>
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
              The JLPT N5 exam is divided into three sections with a total score of 180 points. To pass, you need an overall score of at least 80/180 (44.44%) and a minimum of 19/60 (31.67%) in each section. All questions are multiple-choice with four options.
            </p>

            {/* Table */}
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

            {/* Score breakdown visual */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                {label:"Vocabulary",pct:60,color:"#ef4444"},
                {label:"Grammar & Reading",pct:60,color:"#f97316"},
                {label:"Listening",pct:60,color:"#eab308"},
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
          </Section>

          {/* TEST DATES */}
          <Section id="dates" active={activeTab} label="Test Dates for 2026">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              The JLPT N5 is scheduled for the following dates in 2026. Registration opens several months before each session.
            </p>

            <div className="space-y-3">
              {[
                {date:"July 5, 2026",    reg:"Registration opens mid-March",  status:"Upcoming",  color:"#22c55e"},
                {date:"December 6, 2026",reg:"Registration opens mid-August", status:"Upcoming",  color:"#22c55e"},
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

          </Section>

          {/* CAREERS */}
          <Section id="careers" active={activeTab} label="Career Opportunities with JLPT N5">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              While JLPT N5 is an entry-level certification and may not directly qualify you for advanced roles, it serves as a stepping stone for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </Section>

          {/* TRENDS */}
          <Section id="trends" active={activeTab} label="Trends in JLPT N5 Pakistan (2015–2024)">
            <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(255,255,255,0.65)"}}>
              The JLPT has seen significant growth in popularity over the past decade, reflecting increased global interest in Japanese language and culture. Below is a graph showing the number of test-takers worldwide from 2015 to 2024 (data for 2024 is based on July session estimates).
            </p>
            <div className="p-5 rounded-sm" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
              {/* Legend */}
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
                今すぐ始める
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-none mb-4"
                style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.04em"}}>
                START YOUR<br/>
                <span style={{color:"rgba(255,255,255,0.5)"}}>JLPT N5 JOURNEY</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Join Ohayo Pakistan's JLPT N5 course and build a solid foundation in Japanese with expert guidance.
              </p>
              <a
                href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
                target="_blank" rel="noreferrer"
                className="inline-block px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{background:"white",color:"#7f1d1d"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#fef2f2";}}
                onMouseLeave={e=>{e.currentTarget.style.background="white";}}
              >
                Enroll Now →
              </a>
            </div>
          </div>

        </main>

        <div className="h-20"/>
      </div>
      <Footer/>
    </>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────────────
function Section({ id, active, label, children }) {
  const isVisible = active === id || active === "overview";
  if (!isVisible && active !== id) return null;

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