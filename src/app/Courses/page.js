"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ── Floating kanji background ────────────────────────────────────────────────
const HERO_CHARS = [
  { c: "語", x: 5,  y: 10, size: 60, dur: 7,   delay: 0    },
  { c: "学", x: 80, y: 8,  size: 48, dur: 8.5, delay: 1.3  },
  { c: "習", x: 90, y: 55, size: 54, dur: 6.5, delay: 0.6  },
  { c: "力", x: 3,  y: 65, size: 40, dur: 9,   delay: 2.1  },
  { c: "日", x: 55, y: 80, size: 52, dur: 7.5, delay: 1.0  },
  { c: "本", x: 68, y: 5,  size: 44, dur: 8,   delay: 2.6  },
  { c: "語", x: 38, y: 45, size: 36, dur: 10,  delay: 0.4  },
  { c: "文", x: 92, y: 28, size: 34, dur: 6,   delay: 1.7  },
];

const KANJI_KF = HERO_CHARS.map(({ c }) => {
  const n = `kf${c.codePointAt(0)}`;
  return `@keyframes ${n} {
    0%   { transform: translateY(0px)   translateX(0px)  rotate(-5deg); opacity: 0.18; }
    25%  { transform: translateY(-14px) translateX(5px)  rotate(3deg);  opacity: 0.28; }
    50%  { transform: translateY(-22px) translateX(-4px) rotate(-2deg); opacity: 0.22; }
    75%  { transform: translateY(-8px)  translateX(7px)  rotate(6deg);  opacity: 0.30; }
    100% { transform: translateY(0px)   translateX(0px)  rotate(-5deg); opacity: 0.18; }
  }`;
}).join("\n");

function FloatingKanji({ c, x, y, size, dur, delay }) {
  const n = `kf${c.codePointAt(0)}`;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        fontSize: `${size}px`, color: "rgba(255,255,255,0.9)",
        fontWeight: 900, pointerEvents: "none", userSelect: "none",
        lineHeight: 1, willChange: "transform, opacity", opacity: 0.18,
        animation: `${n} ${dur}s ease-in-out ${delay}s infinite`,
      }}
    >{c}</span>
  );
}

// ── Course data ───────────────────────────────────────────────────────────────
const COURSES = [
  {
    id: "jlpt-n5",
    tag: "#jlptn5",
    level: "Beginner",
    levelColor: "#d97706",
    title: "JLPT N5",
    subtitle: "Foundation of Japanese",
    desc: "Beginner-level Japanese proficiency course covering basic grammar, vocabulary, and kanji. Perfect for those starting their Japanese learning journey.",
    duration: "3 months",
    lessons: "48 lessons",
    img: "/courses/jlpt-n5.jpg",
    href: "/courses/jlpt-n5",
    featured: true,
  },
  {
    id: "jlpt-n4",
    tag: "#jlptn4",
    level: "Intermediate",
    levelColor: "#2563eb",
    title: "JLPT N4",
    subtitle: "Building Proficiency",
    desc: "Intermediate Japanese course building on N5 with more complex grammar and vocabulary. Prepares students for real-world Japanese communication.",
    duration: "4 months",
    lessons: "64 lessons",
    img: "/courses/jlpt-n4.jpg",
    href: "/courses/jlpt-n4",
    featured: false,
  },
  {
    id: "ssw",
    tag: "#ssw",
    level: "Advanced",
    levelColor: "#dc2626",
    title: "SSW",
    subtitle: "Specified Skilled Worker",
    desc: "Specialized Skilled Worker course for professional skills and language training. Tailored for Japan work visa qualification.",
    duration: "5 months",
    lessons: "80 lessons",
    img: "/courses/ssw.jpg",
    href: "/courses/ssw",
    featured: false,
  },
  {
    id: "basic-japanese",
    tag: "#basicjapanese",
    level: "Beginner",
    levelColor: "#d97706",
    title: "Basic Japanese",
    subtitle: "Start Your Journey",
    desc: "Introductory Japanese course to kickstart your interest in the language and culture. No prior experience needed.",
    duration: "2 months",
    lessons: "32 lessons",
    img: "/courses/basic-japanese.jpg",
    href: "/courses/basic-japanese",
    featured: false,
  },
];

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

const STATS = [
  { value: "120+", label: "Students Enrolled" },
  { value: "4.8/5", label: "Average Rating" },
  { value: "4", label: "Active Courses" },
  { value: "98%", label: "Pass Rate" },
];

// ── Image placeholder (until real images are added) ───────────────────────────
function CourseImg({ title, img }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "16/9",
        background: "linear-gradient(135deg, #1c0505 0%, #3b0a0a 50%, #1a0000 100%)",
      }}
    >
      {img && (
        <img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
      )}
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,0.15) 29px,rgba(255,255,255,0.15) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,0.15) 29px,rgba(255,255,255,0.15) 30px)",
      }} />
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-10 h-10" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.6) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-10 h-10" style={{ background: "linear-gradient(315deg, rgba(220,38,38,0.35) 0%, transparent 70%)" }} />
      {/* Kanji watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-8xl font-black text-white/5 select-none pointer-events-none" style={{ fontFamily: "serif" }}>日</span>
      </div>
      {/* Course title fallback */}
      <div className="absolute bottom-3 left-3">
        <span className="text-xs font-bold tracking-widest uppercase text-white/30">{title}</span>
      </div>
    </div>
  );
}

// ── Course Card ───────────────────────────────────────────────────────────────
function CourseCard({ course, index }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-sm"
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
        animation: `fadeUp 0.6s ease both`,
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(220,38,38,0.5)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Featured badge */}
      {course.featured && (
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 text-xs font-bold tracking-widest uppercase rounded-sm"
          style={{ background: "#dc2626", color: "white" }}>
          Popular
        </div>
      )}

      <CourseImg title={course.title} img={course.img} />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tag + Level */}
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{course.tag}</span>
          <span
            className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm"
            style={{
              background: `${course.levelColor}22`,
              color: course.levelColor,
              border: `1px solid ${course.levelColor}44`,
            }}
          >{course.level}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-black text-white leading-none mb-1"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
            {course.title}
          </h3>
          <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>{course.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.6)" }}>
          {course.desc}
        </p>

        {/* Meta */}
        <div className="flex gap-4 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m5-2A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.966 8.966 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{course.lessons}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={course.href}
          className="block w-full text-center py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(220,38,38,0.6)",
            color: "#ef4444",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#dc2626";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#ef4444";
          }}
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? COURSES
    : COURSES.filter(c => c.level === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700&display=swap');
        ${KANJI_KF}

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .fu  { animation: fadeUp 0.7s ease both; }
        .fu1 { animation-delay: 0.1s; }
        .fu2 { animation-delay: 0.22s; }
        .fu3 { animation-delay: 0.35s; }

        .stat-card:hover { border-color: rgba(220,38,38,0.4) !important; }
        .filter-btn:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>

      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ fontFamily: "'Outfit', sans-serif", background: "#0a0a0a" }}
      >

        {/* ── Hero Section ── */}
        <Header/>
        <section
          className="relative z-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #450a0a 100%)",
            minHeight: 320,
          }}
        >
          {/* Floating kanji */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {HERO_CHARS.map((h, i) => <FloatingKanji key={i} {...h} />)}
          </div>

          {/* Grain overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            opacity: 0.4,
          }} />

          {/* Vertical line accents */}
          <div className="absolute right-0 top-0 h-full pointer-events-none" style={{ width: 200, opacity: 0.07 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} className="absolute top-0 h-full" style={{ left: i*40, width: 1, background: "white" }} />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm fu">
              コース一覧
            </div>
            <h1
              className="text-5xl md:text-7xl font-black text-white mb-4 leading-none fu fu1"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              JLPT COURSES<br />
              <span style={{ color: "rgba(255,255,255,0.5)" }}>OFFERED BY OHAYO PAKISTAN</span>
            </h1>
            <p className="text-white/60 max-w-lg text-sm leading-relaxed mb-8 fu fu2">
              We're dedicated to guiding you at every stage of your Japanese journey — from absolute beginner to
              Japan-ready professional. Each course is taught by experienced instructors using practical, goal-oriented methods.
            </p>

            {/* Rating strip */}
            <div className="flex items-center gap-4 fu fu3">
              <div className="flex -space-x-2">
                {["A","B","C"].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-red-900 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: ["#7f1d1d","#991b1b","#b91c1c"][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-xs mt-0.5"><strong className="text-white">4.8/5</strong> · Rated by 120+ students</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <div className="relative z-10" style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="stat-card text-center p-4 rounded-sm transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0f0f0f" }}
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.04em",
                    color: "#ef4444",
                  }}
                >{s.value}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters + Level Tags ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
                ALL COURSES
              </h2>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="filter-btn px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                  style={{
                    background: activeFilter === f ? "#dc2626" : "transparent",
                    color: activeFilter === f ? "white" : "rgba(255,255,255,0.5)",
                    border: activeFilter === f ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Level legend */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "Beginner", color: "#d97706" },
              { label: "Intermediate", color: "#2563eb" },
              { label: "Advanced", color: "#dc2626" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* ── Course Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          {/* ── CTA Banner ── */}
          <div
            className="mt-16 p-8 md:p-12 rounded-sm relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #450a0a 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Kanji watermark */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-9xl font-black text-white/5 select-none pointer-events-none"
              style={{ fontFamily: "serif" }}>入学</div>

            <div className="relative z-10 max-w-lg">
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm">
                今すぐ始める
              </div>
              <h3
                className="text-4xl md:text-5xl font-black text-white leading-none mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                READY TO START<br />
                <span style={{ color: "rgba(255,255,255,0.55)" }}>YOUR JAPAN JOURNEY?</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Join 120+ students already learning Japanese at Ohayo Pakistan. Enroll now and take your first step toward Japan.
              </p>
              <a
                href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                style={{
                  background: "white",
                  color: "#7f1d1d",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                Apply Now →
              </a>
            </div>
          </div>

        </div>

        {/* bottom spacing */}
        <div className="h-20" />
      </div>
      <Footer/>
    </>
  );
}