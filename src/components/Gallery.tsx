"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/images/galery/uno.jpeg", cat: "exterior" },
  { src: "/images/galery/dos.jpeg", cat: "interior" },
  { src: "/images/galery/tres.jpeg", cat: "exterior" },
  { src: "/images/galery/cuatro.jpeg", cat: "interior" },
  { src: "/images/galery/cinco.jpeg", cat: "exterior" },
  { src: "/images/galery/seis.jpeg", cat: "interior" },
  { src: "/images/galery/ocho.jpeg", cat: "exterior" },
  { src: "/images/galery/nueve.jpeg", cat: "interior" },
  { src: "/images/galery/diez.jpeg", cat: "exterior" },
  { src: "/images/galery/once.jpeg", cat: "interior" },
  { src: "/images/galery/doce.jpeg", cat: "exterior" },
  { src: "/images/galery/trece.jpeg", cat: "interior" },
  { src: "/images/galery/new1.jpeg", cat: "exterior" },
  { src: "/images/galery/new2.jpeg", cat: "interior" },
  { src: "/images/galery/new3.jpeg", cat: "exterior" },
];

const filters = [
  { key: "all", label: "Todos" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = filter === "all" ? images : images.filter((i) => i.cat === filter);

  const prev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };
  const next = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  };

  return (
    <section id="galeria" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Nuestro trabajo
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Galería de trabajos realizados
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-green-700 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-green-400 hover:text-green-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(i)}
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={`Trabajo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/70 hover:text-white p-2"
            >
              <ChevronLeft size={36} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={`Trabajo ${lightbox + 1}`}
                width={900}
                height={600}
                className="object-contain max-h-[85vh] w-auto mx-auto rounded-xl"
              />
              <p className="text-center text-white/40 text-sm mt-3">
                {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white/70 hover:text-white p-2"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
