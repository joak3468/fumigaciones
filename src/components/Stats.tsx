"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+500", label: "Clientes satisfechos" },
  { value: "9", label: "Tipos de plagas tratadas" },
  { value: "100%", label: "Productos certificados" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-green-800 py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-green-200 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
