"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ── Cloud SVG ──────────────────────────────────────────────────────────────────
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

// ── Floating kanji — each gets unique keyframe so animations never clash ───────
const HERO_CHARS = [
  { c: "連", x: 12,  y: 25,  size: 52, dur: 7,    delay: 0    },
  { c: "絡", x: 74,  y: 12,  size: 42, dur: 8.5,  delay: 1.4  },
  { c: "先", x: 87,  y: 58,  size: 60, dur: 6.5,  delay: 0.7  },
  { c: "旅", x: 5,   y: 68,  size: 38, dur: 9,    delay: 2.0  },
  { c: "夢", x: 48,  y: 72,  size: 46, dur: 7.5,  delay: 1.0  },
  { c: "道", x: 62,  y: 8,   size: 40, dur: 8,    delay: 2.5  },
  { c: "学", x: 33,  y: 40,  size: 34, dur: 10,   delay: 0.3  },
  { c: "語", x: 92,  y: 30,  size: 30, dur: 6,    delay: 1.8  },
];

// Pre-build all keyframes as one <style> block so they're injected once
const KANJI_KEYFRAMES = HERO_CHARS.map(({ c }) => {
  const name = `fk${c.codePointAt(0)}`;
  return `
    @keyframes ${name} {
      0%   { transform: translateY(0px)   translateX(0px)  rotate(-5deg); opacity: 0.20; }
      25%  { transform: translateY(-16px) translateX(7px)  rotate(3deg);  opacity: 0.30; }
      50%  { transform: translateY(-24px) translateX(-5px) rotate(-2deg); opacity: 0.24; }
      75%  { transform: translateY(-10px) translateX(9px)  rotate(6deg);  opacity: 0.32; }
      100% { transform: translateY(0px)   translateX(0px)  rotate(-5deg); opacity: 0.20; }
    }
  `;
}).join("\n");

function FloatingKanji({ c, x, y, size, dur, delay }) {
  const name = `fk${c.codePointAt(0)}`;
  return (
    <span
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
        color: "rgba(255,255,255,0.9)",
        fontWeight: 900,
        pointerEvents: "none",
        userSelect: "none",
        lineHeight: 1,
        willChange: "transform, opacity",
        // Start visible at base opacity so the delay doesn't cause a pop-in
        opacity: 0.20,
        animation: `${name} ${dur}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden
    >
      {c}
    </span>
  );
}

// ── Background layer ───────────────────────────────────────────────────────────
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

// ── Input field ────────────────────────────────────────────────────────────────
function Field({ type = "text", placeholder, textarea = false }) {
  const cls =
    "w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-red-500/70 focus:bg-white/10 transition-all duration-200";
  return textarea ? (
    <textarea className={cls} placeholder={placeholder} rows={5} />
  ) : (
    <input type={type} className={cls} placeholder={placeholder} />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&family=Outfit:wght@300;400;600;700&display=swap');
        body { background: #0a0a0a; }

        ${KANJI_KEYFRAMES}

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
      `}</style>

      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ fontFamily: "'Outfit', sans-serif", background: "#0a0a0a" }}
      >
        <CloudBg />
        <Header />

        {/* ── Hero banner ── */}
        <section
          className="relative z-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #450a0a 100%)",
            minHeight: 340,
          }}
        >
          {/* floating kanji — rendered inside hero so they clip to it */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {HERO_CHARS.map((h, i) => <FloatingKanji key={i} {...h} />)}
          </div>

          {/* grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
              opacity: 0.4,
            }}
          />

          {/* decorative vertical lines */}
          <div className="absolute right-0 top-0 h-full pointer-events-none" style={{ width: 220, opacity: 0.08 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute top-0 h-full" style={{ left: i * 44, width: 1, background: "white" }} />
            ))}
          </div>

          {/* content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="inline-block px-3 py-1 mb-5 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm fade-up">
              お問い合わせ
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight fade-up fade-up-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              Contact Us
            </h1>
            <p className="text-white/70 max-w-lg text-base leading-relaxed fade-up fade-up-2">
              Have questions or ready to start your journey to Japan? Our team at AXEL
              Pakistan is here to guide you — whether it's about courses, visas, or
              career support. Reach out today and let's take the next step together.
            </p>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

          {/* Left — Get in touch */}
          <div className="fade-up fade-up-1">
            <h2 className="text-2xl font-semibold text-white mb-8" style={{ letterSpacing: "-0.01em" }}>
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "rgba(127,29,29,0.35)", border: "1px solid rgba(185,28,28,0.4)" }}>
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-white/80 text-sm leading-relaxed">B-43 2nd floor Changezy Street, B-block,<br />Satellite town, Rawalpindi, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "rgba(127,29,29,0.35)", border: "1px solid rgba(185,28,28,0.4)" }}>
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-white/80 text-sm">+92 329-5050838</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "rgba(127,29,29,0.35)", border: "1px solid rgba(185,28,28,0.4)" }}>
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white/80 text-sm">info@apjtc.com</p>
                </div>
              </div>
            </div>
            {[
  // { label: "F", href: "https://facebook.com/yourpage" },
  { label: "IG", href: "https://www.instagram.com/ohayopakistan/" },
  { label: "WA", href: "https://wa.me/3295050838" },
].map((s) => (
  <a
    key={s.label}
    href={s.href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-sm text-white/50 hover:text-white text-xs font-bold transition-colors duration-200 flex items-center justify-center"
    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
  >
    {s.label}
  </a>
))}
          </div>

          {/* Right — Send a message */}
          {/* <div className="fade-up fade-up-2">
            <h2 className="text-2xl font-semibold text-white mb-8" style={{ letterSpacing: "-0.01em" }}>
              Send a Message
            </h2>
            <div className="space-y-4">
              <Field placeholder="Your Name" />
              <Field type="email" placeholder="Your Email" />
              <Field type="tel" placeholder="Your Phone Number" />
              <Field placeholder="Your Message" textarea />
              <button
                className="w-full py-3 text-sm font-semibold tracking-wide text-white rounded-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #991b1b, #7f1d1d)", border: "1px solid rgba(185,28,28,0.5)", letterSpacing: "0.05em" }}
              >
                Send Message →
              </button>
            </div>
          </div> */}
        </section>

        {/* ── Footer ── */}
        <Footer/>
      </div>
    </>
  );
}