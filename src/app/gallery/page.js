"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ── Cloud + BG (same as ContactPage) ──────────────────────────────────────────
function Cloud({ x, y, scale = 1, opacity = 0.25, rotate = 0 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 70"
      style={{
        position: "absolute", left: x, top: y,
        width: `${120 * scale}px`, opacity,
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none", userSelect: "none",
        filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
      }}
    >
      <defs>
        <filter id="ds2" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g fill="#7f1d1d" filter="url(#ds2)">
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
  { x: "4%",  y: "3%",  scale: 0.8,  opacity: 0.28, rotate: -6  },
  { x: "70%", y: "1%",  scale: 1.0,  opacity: 0.30, rotate: 5   },
  { x: "88%", y: "25%", scale: 0.55, opacity: 0.20, rotate: -4  },
  { x: "1%",  y: "55%", scale: 0.85, opacity: 0.26, rotate: 9   },
  { x: "60%", y: "72%", scale: 0.65, opacity: 0.18, rotate: -7  },
  { x: "32%", y: "88%", scale: 0.5,  opacity: 0.16, rotate: 4   },
  { x: "76%", y: "80%", scale: 0.75, opacity: 0.22, rotate: -10 },
];

const BG_CHARS = [
  { c: "写", left: "8%",  top: "15%", size: 170, opacity: 0.04, rotate: -10 },
  { c: "真", left: "84%", top: "20%", size: 145, opacity: 0.035, rotate: 7  },
  { c: "旅", left: "46%", top: "55%", size: 210, opacity: 0.03,  rotate: -5 },
  { c: "思", left: "18%", top: "75%", size: 125, opacity: 0.04,  rotate: 11 },
  { c: "出", left: "74%", top: "78%", size: 115, opacity: 0.035, rotate: -9 },
];

// Floating kanji for the hero — unique keyframe per char
const HERO_CHARS = [
  { c: "写", x: 10,  y: 20,  size: 50, dur: 7,   delay: 0    },
  { c: "真", x: 78,  y: 14,  size: 44, dur: 8.5, delay: 1.3  },
  { c: "旅", x: 88,  y: 60,  size: 58, dur: 6.5, delay: 0.6  },
  { c: "思", x: 6,   y: 65,  size: 36, dur: 9,   delay: 2.1  },
  { c: "出", x: 50,  y: 75,  size: 48, dur: 7.5, delay: 1.0  },
  { c: "記", x: 64,  y: 8,   size: 40, dur: 8,   delay: 2.6  },
  { c: "念", x: 35,  y: 42,  size: 34, dur: 10,  delay: 0.4  },
  { c: "光", x: 93,  y: 32,  size: 30, dur: 6,   delay: 1.7  },
];

const KANJI_KF = HERO_CHARS.map(({ c }) => {
  const n = `gfk${c.codePointAt(0)}`;
  return `@keyframes ${n} {
    0%   { transform: translateY(0px)   translateX(0px)  rotate(-5deg); opacity: 0.20; }
    25%  { transform: translateY(-15px) translateX(6px)  rotate(3deg);  opacity: 0.30; }
    50%  { transform: translateY(-23px) translateX(-5px) rotate(-2deg); opacity: 0.24; }
    75%  { transform: translateY(-9px)  translateX(8px)  rotate(6deg);  opacity: 0.32; }
    100% { transform: translateY(0px)   translateX(0px)  rotate(-5deg); opacity: 0.20; }
  }`;
}).join("\n");

function FloatingKanji({ c, x, y, size, dur, delay }) {
  const n = `gfk${c.codePointAt(0)}`;
  return (
    <span
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        fontSize: `${size}px`, color: "rgba(255,255,255,0.9)",
        fontWeight: 900, pointerEvents: "none", userSelect: "none",
        lineHeight: 1, willChange: "transform, opacity", opacity: 0.20,
        animation: `${n} ${dur}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden
    >{c}</span>
  );
}

function CloudBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {CLOUDS.map((c, i) => <Cloud key={i} {...c} />)}
      {BG_CHARS.map((b, i) => (
        <div key={i} style={{
          position: "absolute", left: b.left, top: b.top,
          fontSize: b.size, opacity: b.opacity,
          transform: `translate(-50%,-50%) rotate(${b.rotate}deg)`,
          color: "white", lineHeight: 1, fontWeight: 900,
          pointerEvents: "none", userSelect: "none",
          mixBlendMode: "overlay", filter: "blur(0.5px)",
        }} aria-hidden>{b.c}</div>
      ))}
    </div>
  );
}

// ── Empty image placeholder ────────────────────────────────────────────────────
function ImgSlot({ aspect = "aspect-video", label = "" }) {
  return (
    <div
      className={`relative w-full ${aspect} overflow-hidden rounded-sm`}
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* subtle red corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8"
        style={{ background: "linear-gradient(135deg, rgba(153,27,27,0.5) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-8 h-8"
        style={{ background: "linear-gradient(315deg, rgba(153,27,27,0.3) 0%, transparent 70%)" }} />

      {/* grid lines */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.15) 39px,rgba(255,255,255,0.15) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.15) 39px,rgba(255,255,255,0.15) 40px)",
        }}
      />

      {/* centre icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <svg className="w-7 h-7 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 3h16.5A.75.75 0 0121 3.75v13.5A.75.75 0 0120.25 18H3.75A.75.75 0 013 17.25V3.75A.75.75 0 013.75 3z" />
        </svg>
        {label && <span className="text-white/20 text-xs tracking-widest uppercase">{label}</span>}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700&display=swap');
        body { background: #0a0a0a; }
        ${KANJI_KF}

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu  { animation: fadeUp 0.7s ease both; }
        .fu1 { animation-delay: 0.1s; }
        .fu2 { animation-delay: 0.25s; }

        .img-slot:hover { transform: scale(1.02); border-color: rgba(185,28,28,0.45) !important; }
        .img-slot { transition: transform 0.25s ease, border-color 0.25s ease; }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden"
        style={{ fontFamily: "'Outfit', sans-serif", background: "#0a0a0a" }}>
        <CloudBg />
        <Header />

        {/* ── Hero banner ── */}
        <section
          className="relative z-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #450a0a 100%)",
            minHeight: 280,
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {HERO_CHARS.map((h, i) => <FloatingKanji key={i} {...h} />)}
          </div>

          {/* grain */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            opacity: 0.4,
          }} />

          {/* vertical lines */}
          <div className="absolute right-0 top-0 h-full pointer-events-none" style={{ width: 220, opacity: 0.08 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} className="absolute top-0 h-full" style={{ left: i*44, width: 1, background: "white" }} />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-18">
            <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border border-red-300/30 text-red-200/70 rounded-sm fu">
              ギャラリー
            </div>
            <h1
              className="text-5xl md:text-7xl font-black text-white mb-4 leading-none fu fu1"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              OHAYO PAKISTAN'S<br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>EPIC VISUAL JOURNEY</span>
            </h1>
            <p className="text-white/60 max-w-md text-sm leading-relaxed fu fu2">
              A visual archive of our classes, events, and milestones — moments that define the
              OHAYO Pakistan journey toward Japan.
            </p>
          </div>
        </section>

        {/* ── Gallery body ── */}
        <main className="relative z-10 max-w-5xl mx-auto px-6 py-14 space-y-6">

          {/* Row 1 — hero duo: tall left + wide right */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 img-slot">
              <ImgSlot aspect="aspect-[3/4]" label="Feature" />
            </div>
            <div className="col-span-2 img-slot">
              <ImgSlot aspect="aspect-[16/9]" label="Hero" />
            </div>
          </div>

          {/* Row 2 — three equal */}
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="img-slot">
                <ImgSlot aspect="aspect-square" />
              </div>
            ))}
          </div>

          {/* Row 3 — three equal landscape */}
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="img-slot">
                <ImgSlot aspect="aspect-video" />
              </div>
            ))}
          </div>

          {/* Row 4 — two wide */}
          <div className="grid grid-cols-2 gap-3">
            {[1,2].map(i => (
              <div key={i} className="img-slot">
                <ImgSlot aspect="aspect-video" />
              </div>
            ))}
          </div>

          {/* Row 5 — three equal */}
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="img-slot">
                <ImgSlot aspect="aspect-video" />
              </div>
            ))}
          </div>

          {/* Row 6 — two equal */}
          <div className="grid grid-cols-3 gap-3">
            {[1,2].map(i => (
              <div key={i} className="img-slot">
                <ImgSlot aspect="aspect-video" />
              </div>
            ))}
          </div>

        </main>

        {/* ── Footer ── */}
        <Footer/>
      </div>
    </>
  );
}