"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Productos autorizados por el Ministerio de Salud y ANMAT",
  "Baja toxicidad — seguro para personas, niños y mascotas",
  "Insumos de laboratorios líderes en sanidad ambiental",
  "Factura oficial en todos los servicios",
  "Visita de evaluación sin cargo",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/port.jpg"
                alt="Equipo Fumigaciones Norte"
                width={640}
                height={460}
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-4 sm:right-6 bg-green-700 text-white rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-2xl font-bold leading-none">+15</p>
              <p className="text-green-200 text-xs mt-1">años de experiencia</p>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pt-6 lg:pt-0"
          >
            <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
              Quiénes somos
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              Empresa especializada
              <br />
              en sanidad ambiental
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Somos una empresa con más de 15 años de trayectoria en el control,
              tratamiento y prevención de plagas en Capital Federal y Gran Buenos Aires.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Trabajamos con protocolos precisos, insumos autorizados por ANMAT y mínimo
              impacto ambiental. Cada intervención incluye un diagnóstico previo sin cargo
              y el seguimiento necesario para garantizar resultados duraderos.
            </p>

            <div className="space-y-3">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-green-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
