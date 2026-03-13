"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { gtmEvent } from "@/lib/gtm";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#faq", label: "FAQ" },
  { href: "#presupuesto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 shadow-sm border-b border-slate-100 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/logo-icon.png"
              alt="Fumigaciones Norte"
              width={38}
              height={38}
              className={`object-contain transition-all duration-300 ${
                scrolled
                  ? "[filter:brightness(0)_saturate(100%)_invert(26%)_sepia(50%)_saturate(700%)_hue-rotate(100deg)_brightness(95%)_contrast(100%)]"
                  : "[filter:brightness(0)_invert(1)]"
              }`}
            />
            <div className="leading-tight">
              <span
                className={`font-bold text-base tracking-tight block transition-colors ${
                  scrolled ? "text-green-800" : "text-white"
                }`}
              >
                Fumigaciones Norte
              </span>
              <span
                className={`text-xs font-medium block transition-colors ${
                  scrolled ? "text-slate-500" : "text-green-200"
                }`}
              >
                Control Integrado de Plagas
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => gtmEvent("nav_click", { label: l.label.toLowerCase() })}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-700 hover:text-green-700 hover:bg-green-50"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#presupuesto"
              onClick={() => gtmEvent("cta_click", { source: "navbar", label: "presupuesto_gratis" })}
              className="hidden sm:inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Phone size={14} />
              Presupuesto gratis
            </a>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => { setOpen(false); gtmEvent("nav_click", { label: l.label.toLowerCase(), source: "mobile_menu" }); }}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#presupuesto"
              onClick={() => { setOpen(false); gtmEvent("cta_click", { source: "navbar_mobile", label: "presupuesto_gratis" }); }}
              className="mt-2 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <Phone size={14} />
              Presupuesto gratis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
