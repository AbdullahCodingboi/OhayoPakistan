import { useState } from "react";
import Link from "next/link";
import React from 'react'

const Header = () => {
    const NAV = [
  { label: "Courses",    href: "/courses"    },
  { label: "About",      href: "/about"      },
  { label: "Gallery",    href: "/gallery"    },
  { label: "Contact",    href: "/contact"    },
  { label: "Practice",       href: "/courses/basic-japanese"       },
];
const [menuOpen, setMenuOpen] = useState(false);
  return (
  <nav className="relative z-50 flex items-center justify-between px-6 sm:px-12 lg:px-20 h-16 border-b border-white/5">
  <Link href="/" className="flex items-center gap-3">
    <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm font-black">お</span>
    <span className="font-black tracking-[0.25em] text-lg uppercase">OHAYO</span>
  </Link>

  <ul className="hidden md:flex gap-10">
    {NAV.map(l => (
      <li key={l.label}>
        <Link
          href={l.href}
          className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
        >
          {l.label}
        </Link>
      </li>
    ))}
  </ul>

  <Link
    href="/admissions"
    className="hidden md:block px-5 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white text-xs font-bold tracking-widest uppercase rounded transition-all"
  >
    Apply Now
  </Link>

  <button className="md:hidden text-white/85 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      {menuOpen
        ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
        : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
      }
    </svg>
  </button>

  {menuOpen && (
    <div className="absolute top-full left-0 right-0 bg-black border-b border-white/10 px-6 py-4 flex flex-col gap-4 md:hidden">
      {NAV.map(l => (
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
        href="/admissions"
        className="mt-2 w-full py-3 border border-red-600 text-red-500 text-xs font-bold tracking-widest uppercase rounded text-center"
        onClick={() => setMenuOpen(false)}
      >
        Apply Now
      </Link>
    </div>
  )}
</nav>

  )
}

export default Header