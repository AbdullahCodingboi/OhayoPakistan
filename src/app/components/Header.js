import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import React from 'react'

const COURSES = [
  { label: "Basic Japanese", href: "/courses/practice" },
  { label: "JLPT N5",        href: "/courses/jlpt-n5"        },
  { label: "JLPT N4",        href: "/courses/jlpt-n4"        },
  // { label: "SSW",            href: "/courses/ssw"            },
];

const NAV = [
  { label: "Home",       href: "/"         },
  { label: "About Us",   href: "/about"    },
  { label: "Contact Us", href: "/contact"  },
  { label: "Gallery",    href: "/gallery"  },
  // { label: "Jobs",       href: "/jobs"     },
];

const Header = () => {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [coursesOpen, setCoursesOpen]   = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 sm:px-12 lg:px-20 h-18 border-b border-white/5">
      <Link href="/" className="flex items-center">
        <img
          className="w-24 h-24 rounded-full flex items-center justify-center mt-2 text-sm font-black"
          src="/logo2.jpeg"
        />
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-10 items-center">

        {/* Static links before Courses */}
        <li>
          <Link href="/" className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors">
            Home
          </Link>
        </li>

        {/* Courses dropdown */}
        <li className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setCoursesOpen((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={coursesOpen}
            className="flex items-center gap-1 text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
          >
            Courses
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {coursesOpen && (
            <div className="absolute top-full border-2 border-white/10 left-0 mt-2 w-44 bg-[#000000] rounded shadow-lg py-1 z-50">
              {COURSES.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  onClick={() => setCoursesOpen(false)}
                  className="block px-4 py-2 text-sm text-white/80 hover:bg-[#e8c98a]/40 hover:text-red-700 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </li>

        {/* Remaining static links */}
        {NAV.filter(l => l.label !== "Home").map(l => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}

        {/* Practice link */}
        <li>
          <Link
            href="/courses/practice"
            className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
          >
            Practice
          </Link>
        </li>
      </ul>

      <a
        href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
        target="_blank"
        className="hidden md:block px-5 py-2 mt-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white text-xs font-bold tracking-widest uppercase rounded transition-all"
      >
        Apply Now
      </a>

      {/* Mobile hamburger */}
      <button className="md:hidden text-white/85 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
          {menuOpen
            ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
          }
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black border-b border-white/10 px-6 py-4 flex flex-col gap-4 md:hidden">
          <Link
            href="/"
            className="text-white/85 text-sm tracking-widest uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Courses accordion */}
          <div className="bg-[#000000]">
            <button
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="flex items-center gap-2 text-white/85 text-sm tracking-widest uppercase w-full text-left"
            >
              Courses
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${mobileCoursesOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileCoursesOpen && (
              <div className="mt-2 ml-4 flex flex-col gap-3">
                {COURSES.map(c => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="text-white/65 text-sm tracking-widest uppercase"
                    onClick={() => { setMenuOpen(false); setMobileCoursesOpen(false); }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV.filter(l => l.label !== "Home").map(l => (
            <Link
              key={l.label}
              href={l.href}
              className="text-white/85 text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/courses/practice"
            className="text-white/85 text-sm tracking-widest uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Practice
          </Link>

          <a
            href="https://docs.google.com/forms/d/15aMcUMq4f8Xt98LAMRA0tE3D9mmAC2KXSIyAQE5NuEM/viewform?edit_requested=true"
            target="_blank"
            className="mt-2 w-full py-3 border border-red-600 text-red-500 text-xs font-bold tracking-widest uppercase rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;