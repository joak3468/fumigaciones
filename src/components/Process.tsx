"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, MapPin, Syringe, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Consulta sin cargo",
    desc: "Contáctenos por teléfono, WhatsApp o mediante el formulario. Le respondemos en menos de 24 horas.",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Visita de evaluación",
    desc: "Un técnico visita el lugar sin costo para evaluar la situación y determinar el tratamiento adecuado.",
  },
  {
    icon: Syringe,
    step: "03",
    title: "Tratamiento profesional",
    desc: "Aplicamos el protocolo específico para cada plaga con productos de baja toxicidad autorizados por ANMAT.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Seguimiento y garantía",
    desc: "Verificamos la efectividad del tratamiento y brindamos el seguimiento necesario para asegurar resultados.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">
            Nuestro proceso
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Un proceso ordenado y transparente, desde la primera consulta
            hasta la resolución completa del problema.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-green-800/50 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {s.step}
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-900/50 text-green-400 mb-4 mt-2">
                <s.icon size={22} />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
