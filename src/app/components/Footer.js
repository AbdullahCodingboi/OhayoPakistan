import React, { useState } from "react";
const INITIAL_FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Admissions", href: "/admissions" },
];

const INITIAL_FOOTER_COURSES = [
  { label: "JLPT N5", href: "/courses/jlpt-n5" },
  { label: "JLPT N4", href: "/courses/jlpt-n4" },
  // { label: "SSW", href: "/courses/ssw" },
  { label: "Basic Japanese", href: "/courses/basic-japanese" },
];

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState(INITIAL_FOOTER_LINKS);
  const [footerCourses, setFooterCourses] = useState(INITIAL_FOOTER_COURSES);
  const [editing, setEditing] = useState(false);

  function updateLink(index, value) {
    setFooterLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], href: value };
      return next;
    });
  }

  function updateCourse(index, value) {
    setFooterCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], href: value };
      return next;
    });
  }

  function resetLinks() {
    setFooterLinks(INITIAL_FOOTER_LINKS);
    setFooterCourses(INITIAL_FOOTER_COURSES);
    setEditing(false);
  }

  return (
    <footer
      style={{
        background: "#c0001c",
        color: "#fff",
        padding: "56px 40px 0",
        marginTop: 40,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1.5fr",
          gap: 48,
          paddingBottom: 12,
          maxWidth: 1100,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#c0001c",
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                お
              </span>
            </div>
            <span
              style={{
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: 2,
              }}
            >
              OHAYO
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              opacity: 0.7,
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            Pakistan Japan Training Center
          </div>
          <div style={{ display: "flex", gap: 10 }}>
           
              <a
                
                href="https://www.instagram.com/ohayopakistan/"
                style={{
                  color: "#fff",
                  fontSize: 11,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                ig
              </a>
           
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 13,
                marginBottom: 6,
                letterSpacing: 1,
              }}
            >
              Links
            </div>
            <div>
              {/* <button
                onClick={() => setEditing((e) => !e)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                  fontSize: 11,
                  padding: "6px 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {editing ? "Done" : "Edit"}
              </button> */}
            </div>
          </div>

          {footerLinks.map((l, idx) => (
            <div key={l.label} style={{ marginBottom: 10 }}>
              <a
                href={l.href || "#"}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.95)",
                  fontSize: 13,
                  marginBottom: 6,
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
              {editing && (
                <input
                  value={l.href}
                  onChange={(e) => updateLink(idx, e.target.value)}
                  placeholder="Enter URL (e.g. /about)"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#fff",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 13,
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            Courses
          </div>

          {footerCourses.map((c, idx) => (
            <div key={c.label} style={{ marginBottom: 10 }}>
              <a
                href={c.href || "#"}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.95)",
                  fontSize: 13,
                  marginBottom: 6,
                  textDecoration: "none",
                }}
              >
                {c.label}
              </a>
              {editing && (
                <input
                  value={c.href}
                  onChange={(e) => updateCourse(idx, e.target.value)}
                  placeholder="Enter URL (e.g. /courses/jlpt-n5)"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#fff",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 13,
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            Contact
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              lineHeight: 2,
            }}
          >
            <div>📍 Inside Tameer-e-Millat Academy Near Quest Education System Morgah., Rawalpindi</div>
            <div>✉ ohayopakistan@gmail.com</div>
            <div>📞 +92 329-505838</div>
          </div>
        </div>
      </div>

      {editing && (
        <div
          style={{
            maxWidth: 1100,
            margin: "8px auto 0",
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setEditing(false)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "#fff",
              color: "#c0001c",
              border: "none",
              fontWeight: 700,
            }}
          >
            Save
          </button>
          <button
            onClick={resetLinks}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              fontWeight: 700,
            }}
          >
            Reset
          </button>
        </div>
      )}

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          padding: "18px 0",
          maxWidth: 1100,
          margin: "16px auto 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          OHAYO PAKISTAN JAPAN TRAINING CENTER
        </div>
        <div style={{ fontSize: 11, opacity: 0.6 }}>
          {/* © {new Date().getFullYear()} OHAYO Pakistan. All rights reserved. */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;