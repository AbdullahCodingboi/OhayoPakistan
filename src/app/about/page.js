"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";

const NAV_LINKS = ["Home", "Courses", "About Us", "Contact Us", "Gallery", "Jobs"];

const FEATURES = [
  { icon: "▣", title: "Learn",   desc: "Build a strong foundation in Japanese through structured, expert-led courses." },
  { icon: "⬡", title: "Grow",    desc: "Develop personally and professionally through focused, guided learning."       },
  { icon: "◈", title: "Connect", desc: "Bridge cultures by embracing language and creating global opportunities."       },
  { icon: "◎", title: "Achieve", desc: "Turn your goals into reality with real pathways to Japan."                     },
];

const JOURNEY = [
  {
    year: "2023", title: "Launch", side: "right",
    desc: "We expanded our programs with full-fledged JLPT N5 and N4 preparation courses. With dedicated faculty and a growing student community, OHAYO became a trusted name for Japanese language learning in Pakistan.",
  },
  {
    year: "2024", title: "Expansion", side: "left",
    desc: "Dozens of students successfully passed JLPT exams, and many secured interviews and SSW opportunities for Japan. We enhanced our curriculum with mock tests, cultural workshops, and personalized guidance.",
  },
  {
    year: "2026", title: "Innovation", side: "right",
    desc: "OHAYO Pakistan continues to lead with purpose — supporting more students in achieving their dream of studying and working in Japan. With improved teaching methods and expert mentorship, brighter futures await.",
  },
];

const MISSION_KANJI = ["学", "語", "日", "本", "人"];

const TEAM = [
  { name: "Shahan Siddiqui", role: "Instructor & CTO", pic: "/Shahan.png" },
  { name: "Afzaal Siddiqui", role: "CEO & Lead Instructor", pic: "/Afzal.png" },
  
  { name: "Ubaidullah Siddiqui", role: "Instructor", pic: "/obaid.png" },
];

const FOOTER_LINKS   = ["Home", "About Us", "Contact Us", "Admissions"];
const FOOTER_COURSES = ["JLPT N5", "JLPT N4", "SSW", "Basic Japanese"];

function FeatureCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "#c0001c" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16, padding: "24px 20px",
        background: hovered ? "#1a0000" : "#111",
        transition: "all 0.2s", cursor: "default",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 14, color: "#c0001c",
      }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: "#fff" }}>{title}</div>
      <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

export default function OhayoAboutPage() {
  const [missionIdx, setMissionIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setMissionIdx(i => (i + 1) % MISSION_KANJI.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#000", color: "#fff", overflowX: "hidden", minHeight: "100vh" }}>

      {/* ── NAV ── */}
     <Header />

      {/* ── HERO: vertical half-pill flush to left edge, touching nav ── */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "400px 1fr",
        minHeight: "calc(100vh - 64px)",
        alignItems: "stretch",
      }}>
        {/* LEFT: vertical half-pill — flat left, rounded right */}
        <div style={{
          borderRadius: "0 999px 999px 0",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.07)",
          borderLeft: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: 560,
        }}>
          {/* Inner image area */}
          <div style={{
  width: "78%", height: "72%",
  borderRadius: "0 999px 999px 0",
  background: "transparent",
  border: "5px solid rgba(192,0,28,0.2)",
  display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center",
  gap: 4,
}}>
  {["学", "ぶ", "日", "本", "語"].map((k, i) => (
    <span key={i} style={{
      fontSize: 38, fontFamily: "serif", lineHeight: 1.2,
      color: i % 2 === 0 ? "rgba(192,0,28,0.7)" : "rgba(255,255,255,0.08)",
    }}>{k}</span>
  ))}
</div>

          {/* こんにちは badge */}
          <div style={{
            position: "absolute", top: 40, right: 28,
            background: "#fff", color: "#000",
            borderRadius: 8, padding: "6px 14px",
            fontSize: 13, fontWeight: 800,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}>こんにちは</div>

          {/* Bottom red label */}
          <div style={{
            position: "absolute", bottom: 32, left: 0,
            background: "#c0001c",
            padding: "7px 20px", borderRadius: "0 20px 20px 0",
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", color: "#fff",
          }}>OHAYO · JAPAN CENTER</div>
        </div>

        {/* RIGHT: About text */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 64px 80px 60px",
        }}>
          <p style={{ color: "#c0001c", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>
            About Us
          </p>
          <h2 style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.15, marginBottom: 24 }}>
            Greetings from<br />the <span style={{ color: "#c0001c" }}>OHAYO</span> Team
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
            OHAYO Pakistan is a leading Japanese language institute dedicated to helping students and professionals build a successful future in Japan. We specialize in JLPT N5 and N4 preparation with expert guidance and practical learning.
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.85 }}>
            With a focus on quality education and cultural understanding, OHAYO is your trusted partner on the path to Japan.
          </p>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 16,
        }}>
          <FeatureCard {...FEATURES[0]} />

          {/* Center OHAYO logo panel — spans 2 rows */}
          <div style={{
            gridRow: "1 / 3",
            background: "#111", borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8, padding: 40,
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
              {["O","H","A","Y","O"].map((c, i) => (
                <span key={i} style={{
                  color: i % 2 === 0 ? "#fff" : "#c0001c",
                  fontSize: 46, fontWeight: 900, letterSpacing: -1,
                  fontFamily: "Georgia, serif",
                }}>{c}</span>
              ))}
            </div>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginTop: 14 }}>
              Japanese Center · Pakistan
            </div>
          </div>

          <FeatureCard {...FEATURES[1]} />
          <FeatureCard {...FEATURES[2]} />
          <FeatureCard {...FEATURES[3]} />
        </div>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ color: "#c0001c", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>
          Our Story
        </p>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 900, marginBottom: 72 }}>Our Journey</h2>

        <div style={{ position: "relative" }}>
          {/* Center vertical red line */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 2, background: "#c0001c", transform: "translateX(-50%)", zIndex: 0,
          }} />

          {JOURNEY.map((j, idx) => (
            <div key={j.year} style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 1fr",
              marginBottom: idx < JOURNEY.length - 1 ? 60 : 0,
              alignItems: "center",
              position: "relative", zIndex: 1,
            }}>
              {/* Left content */}
              {j.side === "left" ? (
                <div style={{
                  background: "#111", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: "22px 28px", marginRight: 24,
                }}>
                  <div style={{ color: "#c0001c", fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{j.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.75 }}>{j.desc}</div>
                </div>
              ) : <div />}

              {/* Center: vertical pill + dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{
                  background: "#c0001c", borderRadius: 999,
                  padding: "20px 12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    writingMode: "vertical-rl", textOrientation: "mixed",
                    color: "#fff", fontSize: 12, fontWeight: 900, letterSpacing: 2, lineHeight: 1,
                  }}>{j.year}</span>
                </div>
                <div style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: "#000", border: "3px solid #c0001c",
                }} />
              </div>

              {/* Right content */}
              {j.side === "right" ? (
                <div style={{
                  background: "#111", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: "22px 28px", marginLeft: 24,
                }}>
                  <div style={{ color: "#c0001c", fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{j.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.75 }}>{j.desc}</div>
                </div>
              ) : <div />}
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          background: "#111", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden",
        }}>
          <div style={{ padding: "52px 48px" }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24 }}>Our Mission</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>
              At OHAYO Pakistan, our mission is to empower students and professionals across Pakistan with the language skills, cultural understanding, and confidence needed to thrive in Japan.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>
              We are committed to providing high-quality Japanese language education — focused on JLPT N5 and N4 levels — while guiding learners toward meaningful academic and career opportunities.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.85, marginBottom: 36 }}>
              Through expert instruction, personalized support, and a vision rooted in excellence, we aim to be the bridge that connects dreams with reality.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["Learn", "Connect", "Succeed"].map(b => (
                <button key={b} style={{
                  padding: "8px 20px", border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 20, background: "transparent",
                  fontSize: 12, cursor: "pointer", color: "rgba(255,255,255,0.75)", letterSpacing: 1,
                }}>{b}</button>
              ))}
            </div>
          </div>
          <div style={{
            borderLeft: "1px solid rgba(255,255,255,0.07)", background: "#0a0a0a",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 28, padding: 40,
          }}>
            <div style={{ fontSize: 128, fontWeight: 900, color: "#c0001c", fontFamily: "serif", lineHeight: 1 }}>
              {MISSION_KANJI[missionIdx]}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {MISSION_KANJI.map((_, i) => (
                <button key={i} onClick={() => setMissionIdx(i)} style={{
                  width: i === missionIdx ? 28 : 8, height: 8, borderRadius: 99,
                  border: "none", cursor: "pointer", padding: 0,
                  background: i === missionIdx ? "#c0001c" : "rgba(255,255,255,0.2)",
                  transition: "all 0.3s",
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MEET OUR TEAM ── */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#c0001c", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}>
          The People Behind OHAYO
        </p>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 900, marginBottom: 52 }}>Meet Our Team</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
       {TEAM.map(m => (
  <div key={m.name} style={{
    borderRadius: 16, overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)", background: "#111",
  }}>
    <img
      src={m.pic}
      alt={m.name}
      style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block",}}
    />
    <div style={{ background: "#c0001c", padding: "14px 18px" }}>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{m.name}</div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 3 }}>{m.role}</div>
    </div>
  </div>
))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#c0001c", color: "#fff", padding: "56px 40px 0", marginTop: 40 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.5fr",
          gap: 48, paddingBottom: 48, maxWidth: 1100, margin: "0 auto",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#c0001c", fontWeight: 900, fontSize: 16 }}>お</span>
              </div>
              <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>OHAYO PAKISTAN</span>
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 20, lineHeight: 1.6 }}>Pakistan Japan Training Center</div>
            <div style={{ display: "flex", gap: 10 }}>
              {["f", "ig", "wa"].map(s => (
                <a key={s} href="#" style={{
                  color: "#fff", fontSize: 11, width: 30, height: 30, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none", fontWeight: 700,
                }}>{s}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 18, letterSpacing: 1 }}>Links</div>
            {FOOTER_LINKS.map(l => (
              <a key={l} href="#" style={{ display: "block", color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 10, textDecoration: "none" }}>{l}</a>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 18, letterSpacing: 1 }}>Courses</div>
            {FOOTER_COURSES.map(c => (
              <a key={c} href="#" style={{ display: "block", color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 10, textDecoration: "none" }}>{c}</a>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 18, letterSpacing: 1 }}>Contact</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 2 }}>
              <div>📍 Inside Tameer-e-Millat Academy Near Quest Education System Morgah., Rawalpindi</div>
              <div>✉ ohayopakistan@gmail.com</div>
              <div>📞 +92 3295050838</div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.2)", padding: "18px 0",
          maxWidth: 1100, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontWeight: 900, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>
            OHAYO PAKISTAN JAPAN TRAINING CENTER
          </div>
          {/* <div style={{ fontSize: 11, opacity: 0.6 }}>© {new Date().getFullYear()} OHAYO Pakistan. All rights reserved.</div> */}
        </div>
      </footer>
    </div>
  );
}