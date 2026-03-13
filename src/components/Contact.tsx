"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Instagram,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfonos",
    lines: ["011 4702-7271", "011 5563-7084"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["fumigacionesnorte.arg@gmail.com"],
  },
  {
    icon: Clock,
    title: "Horario de atención",
    lines: ["Todos los días", "8:00 hs a 21:30 hs"],
  },
  {
    icon: MapPin,
    title: "Zona de cobertura",
    lines: ["Capital Federal", "Gran Buenos Aires"],
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Contacto
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Estamos para ayudarle
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Comuníquese con nosotros por cualquiera de los siguientes medios.
            Atendemos todos los días.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-700 mb-4">
                <c.icon size={22} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                {c.title}
              </h3>
              {c.lines.map((l) => (
                <p key={l} className="text-slate-600 text-sm">
                  {l}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Social + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://www.facebook.com/Fumigaciones-Norte-1815119762033122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <Facebook size={18} />
            Facebook
          </a>
          <a
            href="https://www.instagram.com/fumigaciones_norte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-pink-400 hover:text-pink-600 transition-colors text-sm font-medium"
          >
            <Instagram size={18} />
            @fumigaciones_norte
          </a>
          <a
            href="https://wa.link/r1ff5h"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors text-sm font-semibold"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
