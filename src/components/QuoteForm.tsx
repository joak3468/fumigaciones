"use client";

import { useState, useRef } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";
import { gtmEvent } from "@/lib/gtm";

const schema = z.object({
  nombre: z.string().min(2, "Ingrese su nombre completo").max(100, "Máximo 100 caracteres"),
  email: z.string().email("Email inválido").max(100, "Máximo 100 caracteres"),
  telefono: z.string().min(6, "Ingrese un teléfono válido").max(20, "Máximo 20 caracteres"),
  plaga: z.string().min(3, "Indique el tipo de plaga o problema").max(100, "Máximo 100 caracteres"),
  zona: z.string().min(3, "Indique su zona o barrio").max(100, "Máximo 100 caracteres"),
  tipo: z.enum(["Casa", "Departamento", "Comercio", "Empresa", "Industrial", "Otro"]),
  comentario: z.string().max(500, "Máximo 500 caracteres").optional(),
});

type FormData = z.infer<typeof schema>;

type ContactLine = { text: string; href?: string };
const contactItems: { icon: React.ElementType; label: string; lines: ContactLine[] }[] = [
  { icon: Phone, label: "Teléfono", lines: [{ text: "011 5563-7084", href: "tel:01155637084" }] },
  { icon: Mail, label: "Email", lines: [{ text: "fumigacionesnorte.arg@gmail.com", href: "mailto:fumigacionesnorte.arg@gmail.com" }] },
  { icon: Clock, label: "Atención", lines: [{ text: "Todos los días" }, { text: "8:00 a 21:30 hs" }] },
  { icon: MapPin, label: "Cobertura", lines: [{ text: "Capital Federal" }, { text: "Gran Buenos Aires" }] },
];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("ok");
        reset();
        gtmEvent("form_submit_success", { tipo: data.tipo, zona: data.zona });
      } else {
        setStatus("error");
        gtmEvent("form_submit_error", { reason: "api_error" });
      }
    } catch {
      setStatus("error");
      gtmEvent("form_submit_error", { reason: "network_error" });
    }
  };

  const input =
    "w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all";

  return (
    <section id="presupuesto" ref={ref} className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">
            Sin cargo — respuesta en menos de 24 hs
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Solicite su presupuesto
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact info — sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-4 order-last lg:order-none"
          >
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Completá el formulario o comunicate directamente con nosotros.
              La visita de evaluación es siempre sin costo.
            </p>

            {contactItems.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-green-900/50 text-green-400 flex items-center justify-center shrink-0">
                  <c.icon size={17} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                    {c.label}
                  </p>
                  {c.lines.map((l) =>
                    l.href ? (
                      <a
                        key={l.text}
                        href={l.href}
                        onClick={() =>
                          gtmEvent(l.href!.startsWith("tel:") ? "phone_click" : "email_click", { source: "form_sidebar" })
                        }
                        className="text-white text-sm hover:text-green-400 transition-colors block"
                      >
                        {l.text}
                      </a>
                    ) : (
                      <p key={l.text} className="text-white text-sm">{l.text}</p>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.link/r1ff5h"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => gtmEvent("whatsapp_click", { source: "form_sidebar" })}
              className="flex items-center justify-center gap-2.5 w-full bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors mt-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Consultar por WhatsApp
            </a>

            {/* Social links */}
            <div className="flex gap-3 pt-1">
              <a
                href="https://www.facebook.com/Fumigaciones-Norte-1815119762033122"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtmEvent("social_click", { platform: "facebook" })}
                className="flex-1 text-center text-xs text-slate-500 hover:text-blue-400 border border-slate-800 hover:border-blue-800 rounded-xl py-2.5 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/fumigaciones_norte"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtmEvent("social_click", { platform: "instagram" })}
                className="flex-1 text-center text-xs text-slate-500 hover:text-pink-400 border border-slate-800 hover:border-pink-800 rounded-xl py-2.5 transition-colors"
              >
                Instagram
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            id="form-solicitar"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-7 order-first lg:order-none"
          >
            {status === "ok" ? (
              <div className="text-center py-12">
                <CheckCircle2 size={52} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Mensaje enviado correctamente
                </h3>
                <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                  Nuestro equipo se comunicará con usted a la brevedad para coordinar
                  la visita de evaluación.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-green-400 text-sm hover:underline"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Nombre completo *
                    </label>
                    <input {...register("nombre")} placeholder="Nombre y apellido" maxLength={100} className={input} />
                    {errors.nombre && (
                      <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Email *
                    </label>
                    <input {...register("email")} type="email" placeholder="tucorreo@gmail.com" maxLength={100} className={input} />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Teléfono *
                    </label>
                    <input {...register("telefono")} placeholder="011 XXXX-XXXX" maxLength={20} className={input} />
                    {errors.telefono && (
                      <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Zona / Barrio *
                    </label>
                    <input {...register("zona")} placeholder="Ej: Palermo, Vicente López" maxLength={100} className={input} />
                    {errors.zona && (
                      <p className="text-red-400 text-xs mt-1">{errors.zona.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Plaga / Problema *
                  </label>
                  <input
                    {...register("plaga")}
                    placeholder="Ej: Cucarachas, hormigas, roedores..."
                    maxLength={100}
                    className={input}
                  />
                  {errors.plaga && (
                    <p className="text-red-400 text-xs mt-1">{errors.plaga.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Tipo de espacio *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {(["Casa", "Departamento", "Comercio", "Empresa", "Industrial", "Otro"] as const).map((t) => (
                      <label
                        key={t}
                        className="flex items-center justify-center gap-1.5 border border-slate-700 rounded-xl px-2 py-2.5 cursor-pointer text-slate-400 hover:border-green-600 hover:text-green-400 transition-colors has-[:checked]:border-green-600 has-[:checked]:text-green-400 has-[:checked]:bg-green-950/30"
                      >
                        <input {...register("tipo")} type="radio" value={t} className="sr-only" />
                        <span className="text-xs font-medium">{t}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tipo && (
                    <p className="text-red-400 text-xs mt-1">{errors.tipo.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Comentarios adicionales
                  </label>
                  <textarea
                    {...register("comentario")}
                    placeholder="Describa la situación con más detalle si lo desea..."
                    rows={3}
                    maxLength={500}
                    className={`${input} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-950/40 border border-red-900 rounded-xl px-4 py-3 text-sm">
                    <AlertCircle size={15} className="shrink-0" />
                    Error al enviar. Intente nuevamente o contáctenos por teléfono.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white font-bold text-base px-6 py-4 rounded-xl transition-colors mt-1"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Solicitar presupuesto
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
