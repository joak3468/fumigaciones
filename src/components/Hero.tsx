"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AntTrail from "@/components/AntTrail";
import { gtmEvent } from "@/lib/gtm";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950" />

      {/* Animated ant trail — above gradient (z:5), below content (z:10) */}
      <AntTrail />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-400 text-sm font-semibold tracking-[0.2em] uppercase mb-5"
        >
          Control Integrado de Plagas — Buenos Aires
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
        >
          Plagas bajo control.
          <br />
          <span className="text-green-400">Siempre.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Fumigaciones, desratización y control profesional para hogares,
          empresas e industrias. Productos autorizados por ANMAT.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#presupuesto"
            onClick={() => gtmEvent("cta_click", { source: "hero", label: "solicitar_presupuesto" })}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold text-base px-10 py-4 rounded-xl shadow-lg shadow-green-950/50 transition-all hover:-translate-y-0.5"
          >
            Solicitar presupuesto gratis
          </a>
          <a
            href="https://wa.link/r1ff5h"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gtmEvent("whatsapp_click", { source: "hero" })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white font-semibold text-base px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            "Certificados ANMAT",
            "Ministerio de Salud",
            "Baja toxicidad",
            "Factura oficial",
            "Atención todos los días",
          ].map((t) => (
            <span key={t} className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="w-1 h-1 rounded-full bg-green-500" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors"
      >
        <ChevronDown size={26} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
