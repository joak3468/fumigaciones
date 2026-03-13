"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Home,
  UtensilsCrossed,
  Building2,
  Factory,
  GraduationCap,
  Landmark,
} from "lucide-react";

const clients = [
  {
    icon: Home,
    title: "Residencial",
    desc: "Casas, departamentos, countries y barrios privados. Tratamientos puntuales y planes de mantenimiento.",
  },
  {
    icon: UtensilsCrossed,
    title: "Gastronómico",
    desc: "Restaurantes, bares, cocinas industriales y catering. Cumplimiento de normativas SENASA e INAL.",
  },
  {
    icon: Building2,
    title: "Corporativo",
    desc: "Oficinas, edificios de empresas y consorcios. Contratos de mantenimiento con certificación mensual.",
  },
  {
    icon: Factory,
    title: "Industrial",
    desc: "Depósitos, plantas de producción, frigoríficos y logística. Protocolos específicos por rubro.",
  },
  {
    icon: GraduationCap,
    title: "Educativo y salud",
    desc: "Colegios, universidades, clínicas y hospitales. Productos de mínima toxicidad con personal capacitado.",
  },
  {
    icon: Landmark,
    title: "Espacios públicos",
    desc: "Clubes, plazas, estadios y organismos públicos. Tratamientos de amplia cobertura con bajo impacto.",
  },
];

export default function Clients() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clientes" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">
            A quiénes atendemos
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Soluciones para cada sector
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Adaptamos cada intervención al tipo de espacio, la actividad y
            las regulaciones vigentes para cada sector.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clients.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex gap-4 bg-slate-900 border border-slate-800 hover:border-green-800 rounded-2xl p-6 transition-colors"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-green-900/50 group-hover:bg-green-800/60 text-green-400 flex items-center justify-center transition-colors">
                <c.icon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
