import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Fumigaciones Norte",
  description: "Política de privacidad y tratamiento de datos personales de Fumigaciones Norte.",
  robots: "noindex, nofollow",
};

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Política de Privacidad</h1>
        <p className="text-slate-500 text-sm mb-10">Última actualización: abril de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Responsable del tratamiento</h2>
          <p className="text-slate-600 leading-relaxed">
            Fumigaciones Norte, con domicilio en la Ciudad Autónoma de Buenos Aires, Argentina,
            es responsable del tratamiento de los datos personales recolectados a través del sitio web
            <strong> fumigacionesnorte.com.ar</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed mt-2">
            Contacto: <a href="mailto:fumigacionesnorte.arg@gmail.com" className="text-green-700 hover:underline">fumigacionesnorte.arg@gmail.com</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Datos que recolectamos</h2>
          <p className="text-slate-600 leading-relaxed">
            A través del formulario de solicitud de presupuesto recolectamos los siguientes datos personales:
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li>Nombre y apellido</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Zona o barrio</li>
            <li>Tipo de espacio y descripción del problema</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Finalidad del tratamiento</h2>
          <p className="text-slate-600 leading-relaxed">
            Los datos recolectados se utilizan exclusivamente para:
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li>Responder a su solicitud de presupuesto</li>
            <li>Coordinar la visita de evaluación sin cargo</li>
            <li>Comunicarnos con usted en relación al servicio solicitado</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            No utilizamos sus datos para envío de publicidad no solicitada ni los cedemos a terceros.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Base legal</h2>
          <p className="text-slate-600 leading-relaxed">
            El tratamiento de sus datos se realiza con su consentimiento expreso al completar y enviar
            el formulario de contacto, conforme a lo establecido en la{" "}
            <strong>Ley N° 25.326 de Protección de Datos Personales</strong> de la República Argentina
            y su normativa complementaria.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Conservación de los datos</h2>
          <p className="text-slate-600 leading-relaxed">
            Sus datos personales se conservan únicamente durante el tiempo necesario para gestionar
            su consulta y el servicio prestado. Una vez finalizada la relación comercial, los datos
            son eliminados de nuestros sistemas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Sus derechos</h2>
          <p className="text-slate-600 leading-relaxed">
            De acuerdo con la Ley N° 25.326, usted tiene derecho a:
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li><strong>Acceso:</strong> conocer qué datos personales suyos tenemos registrados</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de sus datos</li>
            <li><strong>Confidencialidad:</strong> oponerse al tratamiento de sus datos</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            Para ejercer cualquiera de estos derechos, puede contactarnos en{" "}
            <a href="mailto:fumigacionesnorte.arg@gmail.com" className="text-green-700 hover:underline">
              fumigacionesnorte.arg@gmail.com
            </a>.
            La DNPDP (Dirección Nacional de Protección de Datos Personales) es el organismo competente
            para recibir denuncias en caso de incumplimiento.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Cookies y herramientas de análisis</h2>
          <p className="text-slate-600 leading-relaxed">
            Este sitio utiliza Google Analytics y Google Tag Manager para analizar el tráfico web
            de forma anónima y mejorar la experiencia del usuario. Estas herramientas pueden utilizar
            cookies propias de Google. Para más información, consulte la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              Política de Privacidad de Google
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Seguridad</h2>
          <p className="text-slate-600 leading-relaxed">
            Implementamos medidas técnicas y organizativas para proteger sus datos personales contra
            acceso no autorizado, alteración, divulgación o destrucción. El sitio opera bajo
            protocolo HTTPS con certificado SSL.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Modificaciones</h2>
          <p className="text-slate-600 leading-relaxed">
            Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio
            será publicado en esta página con la fecha de actualización correspondiente.
          </p>
        </section>
      </div>
    </main>
  );
}
