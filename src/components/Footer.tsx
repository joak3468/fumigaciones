import Image from "next/image";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#presupuesto", label: "Presupuesto online" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/logo-icon.png"
                alt="Fumigaciones Norte"
                width={34}
                height={34}
                className="object-contain [filter:brightness(0)_invert(1)] opacity-80"
              />
              <span className="text-white font-bold text-base">
                Fumigaciones Norte
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Control integrado de plagas. Protegemos su hogar y empresa con
              productos autorizados por ANMAT y el Ministerio de Salud.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-500 hover:text-green-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>011 5563-7084</li>
              <li>fumigacionesnorte.arg@gmail.com</li>
              <li className="pt-1">Todos los días · 8:00 a 21:30 hs</li>
              <li className="pt-1">Capital Federal y Gran Buenos Aires</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Fumigaciones Norte. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
