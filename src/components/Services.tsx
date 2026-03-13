"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bug, Rat, Wind, Droplets, Bird, Building } from "lucide-react";

const services = [
  {
    icon: Bug,
    title: "Desinsectación",
    badge: "Más solicitado",
    desc: "Control y eliminación de insectos rastreros y voladores: cucarachas, hormigas, moscas, mosquitos, pulgas, arañas y más. Aplicación por gel, pulverización o nebulización según el caso.",
  },
  {
    icon: Rat,
    title: "Desratización",
    badge: null,
    desc: "Control integral de roedores mediante estaciones de cebado con rodenticidas, trampas de captura y sellado de ingresos. Monitoreo continuo para industrias y consorcios.",
  },
  {
    icon: Wind,
    title: "Nebulización",
    badge: null,
    desc: "Dispersión de microgotas de insecticida en el aire para el control de mosquitos y otros insectos voladores en grandes superficies, jardines y espacios verdes.",
  },
  {
    icon: Bird,
    title: "Control de aves",
    badge: null,
    desc: "Disuasión y exclusión de palomas mediante púas, redes y sistemas físicos homologados. Sin daño al animal. Solución permanente para edificios y estructuras.",
  },
  {
    icon: Droplets,
    title: "Limpieza de tanques",
    badge: null,
    desc: "Higienización, desinfección y sanitización de tanques de agua potable. Incluye remoción de sedimentos, lavado a presión, biocidas autorizados y emisión de certificado habilitante.",
  },
  {
    icon: Building,
    title: "Fumigación industrial",
    badge: null,
    desc: "Tratamientos específicos para depósitos, plantas de producción, frigoríficos y locales gastronómicos. Protocolos documentados que cumplen normativas SENASA, INAL e INTI.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Nuestros servicios
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Soluciones para cada situación
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Cada servicio está diseñado para el problema específico. No aplicamos
            tratamientos genéricos — siempre comenzamos con un diagnóstico.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-green-300 hover:shadow-md rounded-2xl p-6 transition-all duration-200"
            >
              {s.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                  {s.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl bg-green-100 group-hover:bg-green-200 text-green-700 flex items-center justify-center mb-4 transition-colors">
                <s.icon size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
