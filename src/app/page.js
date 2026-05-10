"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
function Cloud({ x, y, scale = 1, opacity = 0.25, rotate = 0 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 70"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: `${120 * scale}px`,
        opacity,
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
        userSelect: "none",
        filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
      }}
    >
      <defs>
        <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g fill="#7f1d1d" filter="url(#ds)">
        <ellipse cx="60" cy="45" rx="38" ry="18" />
        <circle cx="40" cy="36" r="14" />
        <circle cx="60" cy="28" r="17" />
        <circle cx="80" cy="34" r="13" />
        <circle cx="24" cy="48" r="9" />
        <circle cx="96" cy="46" r="8" />
        <path d="M18 50 Q10 58 18 62 Q26 66 28 56" />
        <path d="M102 48 Q110 56 102 62 Q94 66 92 56" />
      </g>
    </svg>
  );
}

const CLOUDS = [
  { x: "6%",  y: "6%",  scale: 0.75, opacity: 0.30, rotate: -8  },
  { x: "68%", y: "2%",  scale: 1.05, opacity: 0.32, rotate: 6   },
  { x: "86%", y: "28%", scale: 0.6,  opacity: 0.22, rotate: -4  },
  { x: "2%",  y: "52%", scale: 0.9,  opacity: 0.28, rotate: 10  },
  { x: "58%", y: "74%", scale: 0.7,  opacity: 0.20, rotate: -6  },
  { x: "34%", y: "86%", scale: 0.55, opacity: 0.18, rotate: 4   },
  { x: "78%", y: "78%", scale: 0.8,  opacity: 0.24, rotate: -10 },
];

const BG_CHARS = [
  { c: "日", left: "10%", top: "18%", size: 160, opacity: 0.04, rotate: -12 },
  { c: "本", left: "82%", top: "22%", size: 140, opacity: 0.035, rotate: 8 },
  { c: "語", left: "48%", top: "60%", size: 200, opacity: 0.03, rotate: -6 },
  { c: "学", left: "20%", top: "78%", size: 120, opacity: 0.04, rotate: 10 },
  { c: "習", left: "72%", top: "80%", size: 110, opacity: 0.035, rotate: -8 },
];

const SLIDES = [
  {
    img: "/images/hero-student.jpg",
    label: "Start Your Preparation For JLPT N5 Level To Study In Japan",
    badge: "JLPT - N5",
  },
  {
    img: "/images/hero-female.jpg",
    label: "Certified Sensei With Years of JLPT Coaching Experience",
    badge: "Expert Guidance",
  },
  {
    img: "/images/hero-worker.jpg",
    label: "SSW Certification & Work Opportunities in Japan",
    badge: "SSW Cert",
  },
];

function CloudBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {CLOUDS.map((c, i) => <Cloud key={i} {...c} />)}
      {BG_CHARS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            fontSize: b.size,
            opacity: b.opacity,
            transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,
            color: "white",
            lineHeight: 1,
            fontWeight: 900,
            pointerEvents: "none",
            userSelect: "none",
            mixBlendMode: "overlay",
            filter: "blur(0.5px)",
          }}
          aria-hidden
        >
          {b.c}
        </div>
      ))}
    </div>
  );
}

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        className="flex gap-2 w-full overflow-hidden rounded-2xl"
        style={{ height: "380px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="relative rounded-xl overflow-hidden cursor-pointer"
            style={{
              flex: i === active ? 5 : 1,
              transition: "flex 0.55s cubic-bezier(.77,0,.18,1)",
              minWidth: 0,
              background: "#1a0a0a",
            }}
          >
            <img
              src={s.img}
              alt={s.badge}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 transition-opacity duration-300"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
                opacity: i === active ? 1 : 0,
              }}
            >
              <p className="text-white text-sm font-bold leading-snug mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {s.label}
              </p>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white text-xs">
                {s.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-red-600" : "w-3 bg-white/25"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const NAV = [
  { label: "Courses",    href: "/courses"    },
  { label: "About",      href: "/about"      },
  { label: "Gallery",    href: "/gallery"    },
  { label: "Contact",    href: "/contact"    },
  { label: "Jobs",       href: "/jobs"       },
];

const STATS = [
  { kanji: "語", label: "JLPT N5",  value: "0 days" },
  { kanji: "学", label: "JLPT N4",  value: "0 days" },
  { kanji: "人", label: "Students", value: "200+"   },
  { kanji: "仕", label: "SSW Cert", value: "Soon"   },
];

const FEATURES = [
  { k: "導", t: "Expert Guidance",      d: "Certified sensei with years of JLPT coaching experience."   },
  { k: "学", t: "Structured Courses",   d: "N5 to N4 preparation programs with clear milestones."       },
  { k: "界", t: "Global Opportunities", d: "Alumni network spanning schools and companies across Japan." },
];

const TESTIMONIALS = [
  { name: "Ahmed K.",   city: "Rawalpindi", text: "OHAYO gave me the push I needed. I am now preparing to move to Japan."   },
  { name: "Hassan R.",  city: "Islamabad",  text: "Joined after a friend recommended it. Feels like a family, not a class." },
  { name: "Zeeshan S.", city: "Karachi",    text: "Fell in love with Japanese culture. The team is incredibly dedicated."   },
  { name: "Ali Z.",     city: "Peshawar",   text: "Best JLPT prep in Pakistan. Solid, practical, and very encouraging."     },
];

const GALLERY_ITEMS = [
  { label: "チーム", src: "/banner.jpeg", href: "/gallery/team" },
  { label: "先生", src: "/images/teacher.jpg", href: "/gallery/teacher" },
  { label: "学生", src: "/images/student.jpg", href: "/gallery/student" },
  { label: "日本語", src: "/images/japanese.jpg", href: "/gallery/japanese" },
];

export default function OhayoPage() {
  
  const [tIdx, setTIdx] = useState(0);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <CloudBg />

      {/* ── NAV ── */}
   <Header />
      {/* ── HERO ── */}
      <section className="relative z-10 min-h-[90vh] flex flex-col lg:flex-row lg:items-center px-6 sm:px-12 lg:px-20 py-24 gap-12">

        {/* Left: text content */}
        <div className="flex flex-col justify-center flex-1">
          <p className="text-red-600 text-xs  tracking-[0.5em] uppercase mb-6 font-bold">Japan Training Center · Pakistan</p>

          <h1 className="text-7xl sm:text-8xl lg:text-[70px] font-black leading-none mb-2 tracking-tighter">
            OHAYO
          </h1>
            <h3 className="text-5xl sm:text-6xl lg:text-[70px] font-black leading-none mb-2 tracking-tighter">
            PAKISTAN
          </h3>
          <div className="text-white/40 text-3xl sm:text-4xl font-black tracking-[0.3em] mb-8">おはようパキスタン</div>

          <p className="text-white/80 text-base sm:text-lg max-w-md leading-relaxed mb-10">
            Learn Japanese the right way. Expert JLPT N5 and N4 preparation for study and work in Japan.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true" target="_blank" className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black tracking-[0.2em] uppercase rounded transition-all hover:shadow-lg hover:shadow-red-600/30">
              Get Admission
            </a>
            <Link href={"/Courses"} className="px-8 py-3.5 border border-white/10 hover:border-white/30 text-white/85 hover:text-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-all">
              Our Courses
            </Link>
          </div>
        </div>

        {/* Right: carousel — full width on mobile, 45% on desktop */}
        <div className="w-full lg:w-[45%] shrink-0 relative">
          {/* JLPT N4 badge */}
          {/* <div className="absolute -top-4 -left-4 z-10 hidden sm:block">
            <div className="bg-red-600 rounded-xl px-4 py-2 text-center shadow-xl shadow-red-900/40">
              <div className="text-white/90 text-[10px] font-bold tracking-wider uppercase">Prep Now</div>
              <div className="text-white text-lg font-black">JLPT N4</div>
            </div>
          </div> */}
          <HeroCarousel />
        </div>

      </section>

      {/* ── STATS ── */}
      {/* <section className="relative z-10 border-y border-white/5 px-6 sm:px-12 lg:px-20 py-16">
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-10 text-center">なぜ OHAYO？</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {STATS.map(s => (
            <div key={s.label} className="bg-black px-8 py-10 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors">
              <span className="text-5xl font-black text-white/30 group-hover:text-red-600/30 transition-colors mb-3 select-none">{s.kanji}</span>
              <span className="text-3xl font-black text-white mb-1">{s.value}</span>
              <span className="text-white/40 text-xs tracking-widest uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── FREE COURSE BANNER ── */}
      <section className="relative z-10 px-6 sm:px-12 lg:px-20 py-16">
        <div className="rounded-2xl bg-red-600 px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 pointer-events-none overflow-hidden">
            <Cloud x="10%" y="10%" scale={1.2} opacity={1} rotate={5} />
          </div>
          <div>
            <p className="text-red-200 text-xs tracking-[0.4em] uppercase mb-2">無料 · Free</p>
            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Free Online<br />JLPT Course
            </h3>
            <p className="text-red-200/60 text-sm mt-2">July Session · Limited Seats</p>
          </div>
          <a href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true" target="_blank" className="shrink-0 px-8 py-3.5 bg-white text-red-600 font-black text-xs tracking-[0.2em] uppercase rounded hover:bg-red-50 transition-all">
            Join Now →
          </a>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative z-10 px-6 sm:px-12 lg:px-20 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-3">
          {[
            { label: "チーム", src: "/banner.jpeg" },
            { label: "先生", src: "/images/teacher.jpg" },
            { label: "学生", src: "/images/student.jpg" },
            { label: "日本語", src: "/images/japanese.jpg" },
          ].map(({ label, src }, i) => (
            <div
              key={label}
              className={`${i === 0 ? "col-span-2" : ""} aspect-video rounded-xl bg-white/[0.03] border border-white/[0.05] overflow-hidden`}
            >
              <img
                src={src}
                alt={label}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-red-600 text-xs tracking-[0.5em] uppercase mb-4">About Us</p>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
            Greetings from<br />the <span className="text-red-600">OHAYO</span> Team
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 text-sm sm:text-base">
            For over two years we have helped students and professionals prepare for a successful
            future in Japan through expert language education and cultural guidance.
          </p>
          <blockquote className="border-l border-red-600 pl-5 mb-8">
            <p className="text-white/70 text-sm italic leading-relaxed">
              "We believe in opening doors to global opportunities — one student at a time."
            </p>
            <footer className="text-red-600 text-xs font-bold tracking-wider uppercase mt-2">
              — Afzal Ahmed, CEO
            </footer>
          </blockquote>
          <a href="/about" className="text-xs tracking-[0.2em] uppercase text-white/80 hover:text-red-500 transition-colors font-bold">
            More About Us →
          </a>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative z-10 border-t border-white/5 px-6 sm:px-12 lg:px-20 py-20">
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-2 text-center">強み</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-14">
          Why <span className="text-red-600">OHAYO</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.t} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-red-600/40 transition-all hover:bg-white/[0.04]">
              <div className="text-5xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors mb-5 select-none">{f.k}</div>
              <h3 className="text-white font-bold mb-2 text-base">{f.t}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="relative z-10 border-t border-white/5 px-6 sm:px-12 lg:px-20 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-red-600 text-xs tracking-[0.5em] uppercase mb-2">ギャラリー</p>
            <h2 className="text-3xl font-black">Our Gallery</h2>
          </div>
          <a href="/gallery" className="text-white/70 hover:text-red-500 text-xs tracking-widest uppercase transition-colors font-bold">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {GALLERY_ITEMS.map((g, i) => (
            <Link
              key={g.label}
              href={g.href}
              className={`${i === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2" : ""} aspect-video rounded-xl bg-white/[0.03] border border-white/[0.05] overflow-hidden hover:border-red-600/30 transition-all group`}
            >
              <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
                <span className="text-white/90 font-black text-sm bg-black/30 px-2 py-1 rounded select-none">{g.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 border-t border-white/5 px-6 sm:px-12 lg:px-20 py-20">
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-2 text-center">学生の声</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-14">Student Reviews</h2>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 sm:p-10 mb-6 min-h-[160px]">
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-6">
              "{TESTIMONIALS[tIdx].text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-black">
                {TESTIMONIALS[tIdx].name[0]}
              </div>
              <div>
                <div className="text-white text-sm font-bold">{TESTIMONIALS[tIdx].name}</div>
                <div className="text-white/60 text-xs">{TESTIMONIALS[tIdx].city}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setTIdx(i => Math.max(0, i - 1))}
              disabled={tIdx === 0}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-white/12 bg-white/5 hover:bg-red-600 hover:border-red-600 flex items-center justify-center text-white/90 hover:text-white transition-shadow shadow-sm hover:shadow-red-600/30 disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-4 px-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all rounded-full ${i === tIdx ? "w-10 h-3 bg-red-600 shadow-lg" : "w-3 h-3 bg-white/70 hover:bg-white"}`}
                />
              ))}
            </div>

            <button
              onClick={() => setTIdx(i => Math.min(TESTIMONIALS.length - 1, i + 1))}
              disabled={tIdx === TESTIMONIALS.length - 1}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-white/12 bg-white/5 hover:bg-red-600 hover:border-red-600 flex items-center justify-center text-white/90 hover:text-white transition-shadow shadow-sm hover:shadow-red-600/30 disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="relative z-10 border-t border-white/5 px-6 sm:px-12 lg:px-20 py-24 text-center">
        <p className="text-red-600 text-xs tracking-[0.5em] uppercase mb-4">お問い合わせ</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
          Contact us<br /><span className="text-white/60">any time</span>
        </h2>
        <p className="text-white/65 text-sm max-w-md mx-auto mb-10">
          Have questions about courses or admissions? We are here to help you get to Japan.
        </p>
        <Link href={"/contact"} className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs tracking-[0.25em] uppercase rounded transition-all hover:shadow-xl hover:shadow-red-600/30">
          Contact Us
        </Link>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/60 text-xs tracking-wide">
          <span>✉ ohayopakistan@gmail.com</span>
          <span>📞 +92 329-505838</span>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer/>
    </div>
  );
}