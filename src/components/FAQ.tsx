"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Hay que retirarse mientras se está fumigando?",
    a: "Se recomienda retirarse del área tratada aproximadamente entre una y dos horas luego de la fumigación. Después de ese tiempo puede ingresar ventilando los ambientes.",
  },
  {
    q: "¿Tengo mascotas, puedo fumigar igual?",
    a: "Sí. La aplicación de los productos se realiza en lugares específicos y fuera del alcance de las mascotas. Recomendamos retirar los animales durante la aplicación y ventilar el espacio antes de que regresen.",
  },
  {
    q: "¿Tengo un bebé, puedo fumigar?",
    a: "Sí. Nuestro personal toma todas las medidas de precaución para aplicar los productos fuera del alcance de los niños. Los productos son de baja toxicidad y en las dosis aplicadas no representan riesgo para la salud.",
  },
  {
    q: "¿Los productos que se utilizan son tóxicos?",
    a: "Nuestros productos son de baja toxicidad y están autorizados por el Ministerio de Salud y ANMAT. Las dosis aplicadas no afectan la salud de personas ni mascotas cuando se respetan los tiempos de permanencia indicados.",
  },
  {
    q: "¿Posee algún costo la visita para el presupuesto?",
    a: "No. La visita y el asesoramiento inicial son completamente sin cargo. El presupuesto se entrega únicamente con visita previa al lugar a tratar.",
  },
  {
    q: "¿En qué zonas trabajan?",
    a: "Trabajamos en Capital Federal y Gran Buenos Aires. Ante cualquier consulta sobre cobertura en su zona, no dude en contactarnos.",
  },
  {
    q: "¿Emiten factura?",
    a: "Sí. Emitimos factura oficial por todos nuestros servicios.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      className="border border-slate-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm sm:text-base pr-4">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-green-700 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Preguntas frecuentes
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Resolvemos sus dudas
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
