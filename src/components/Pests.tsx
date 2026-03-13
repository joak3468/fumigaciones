"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tagColors: Record<string, string> = {
  Rastreros: "bg-green-100 text-green-800",
  Voladores: "bg-sky-100 text-sky-800",
  Roedores: "bg-orange-100 text-orange-800",
  Parásitos: "bg-rose-100 text-rose-800",
  Arácnidos: "bg-violet-100 text-violet-800",
  Aves: "bg-slate-200 text-slate-700",
};

const pests = [
  {
    num: "01",
    name: "Cucarachas",
    tag: "Rastreros",
    treatment: "Gel biocida y pulverización de contacto en grietas, zócalos y zonas de tránsito.",
  },
  {
    num: "02",
    name: "Mosquitos",
    tag: "Voladores",
    treatment: "Nebulización térmica o en frío y tratamientos larvicidas en desagües y superficies de agua.",
  },
  {
    num: "03",
    name: "Roedores",
    tag: "Roedores",
    treatment: "Estaciones de cebado con rodenticidas y trampas de captura en puntos estratégicos.",
  },
  {
    num: "04",
    name: "Pulgas",
    tag: "Parásitos",
    treatment: "Fumigación ambiental y tratamiento de superficies con insecticidas de acción residual.",
  },
  {
    num: "05",
    name: "Arañas",
    tag: "Arácnidos",
    treatment: "Pulverización perimetral en rincones y zonas de actividad, dentro y fuera del inmueble.",
  },
  {
    num: "06",
    name: "Alacranes",
    tag: "Arácnidos",
    treatment: "Tratamiento perimetral y sellado de posibles ingresos al inmueble.",
  },
  {
    num: "07",
    name: "Hormigas",
    tag: "Rastreros",
    treatment: "Cebos en gel y en polvo aplicados en caminos de tránsito y nidos.",
  },
  {
    num: "08",
    name: "Palomas",
    tag: "Aves",
    treatment: "Sistemas de exclusión, púas de disuasión y tratamientos ahuyentadores homologados.",
  },
  {
    num: "09",
    name: "Chinches de cama",
    tag: "Parásitos",
    treatment: "Fumigación química especializada con productos de alta penetración y acción residual.",
  },
  {
    num: "10",
    name: "Avispas",
    tag: "Voladores",
    treatment: "Eliminación de nidos y tratamiento preventivo en áreas y construcciones de riesgo.",
  },
  {
    num: "11",
    name: "Vinchucas",
    tag: "Parásitos",
    treatment: "Pulverización de insecticidas residuales en paredes, techos y rendijas.",
  },
  {
    num: "12",
    name: "Moscas",
    tag: "Voladores",
    treatment: "Trampas de luz UV, control larvario en focos y tratamiento de superficies de apoyo.",
  },
];

export default function Pests() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="plagas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Plagas más frecuentes
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Las tratamos todas
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Cada especie requiere un protocolo específico. Contamos con la experiencia
            y los productos adecuados para cada caso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pests.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-green-300 hover:shadow-md rounded-2xl p-5 transition-all duration-200"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-4xl font-black text-slate-100 group-hover:text-green-100 select-none transition-colors">
                {p.num}
              </span>

              {/* Tag */}
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${tagColors[p.tag]}`}
              >
                {p.tag}
              </span>

              {/* Name */}
              <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 pr-8">
                {p.name}
              </h3>

              {/* Treatment */}
              <p className="text-slate-500 text-sm leading-relaxed">{p.treatment}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-green-500 rounded-b-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
