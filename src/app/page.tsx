import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "PestControlService",
  name: "Fumigaciones Norte",
  description:
    "Empresa especializada en control, tratamiento y prevención de plagas. Productos autorizados por el Ministerio de Salud y ANMAT.",
  url: "https://fumigacionesnorte.com.ar",
  logo: "https://fumigacionesnorte.com.ar/images/logo.png",
  image: "https://fumigacionesnorte.com.ar/images/logo.png",
  telephone: "+54-11-5563-7084",
  email: "contacto@fumigacionesnorte.com.ar",
  areaServed: [
    { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
    { "@type": "AdministrativeArea", name: "Gran Buenos Aires" },
  ],
  serviceType: [
    "Desinsectación",
    "Desratización",
    "Control de cucarachas",
    "Control de mosquitos",
    "Control de roedores",
    "Fumigación de hogares",
    "Fumigación comercial",
  ],
  priceRange: "$$",
  currenciesAccepted: "ARS",
  paymentAccepted: "Efectivo, Transferencia bancaria",
  sameAs: [
    "https://www.facebook.com/FumigacionesNorteArgentina",
    "https://www.instagram.com/fumigaciones_norte",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Hay que retirarse mientras se está fumigando?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Se recomienda retirarse del área tratada aproximadamente entre una y dos horas luego de la fumigación. Después de ese tiempo puede ingresar ventilando los ambientes.",
      },
    },
    {
      "@type": "Question",
      name: "¿Tengo mascotas, puedo fumigar igual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. La aplicación de los productos se realiza en lugares específicos y fuera del alcance de las mascotas. Recomendamos retirar los animales durante la aplicación y ventilar el espacio antes de que regresen.",
      },
    },
    {
      "@type": "Question",
      name: "¿Tengo un bebé, puedo fumigar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Nuestro personal toma todas las medidas de precaución para aplicar los productos fuera del alcance de los niños. Los productos son de baja toxicidad y en las dosis aplicadas no representan riesgo para la salud.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los productos que se utilizan son tóxicos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestros productos son de baja toxicidad y están autorizados por el Ministerio de Salud y ANMAT. Las dosis aplicadas no afectan la salud de personas ni mascotas cuando se respetan los tiempos de permanencia indicados.",
      },
    },
    {
      "@type": "Question",
      name: "¿Posee algún costo la visita para el presupuesto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. La visita y el asesoramiento inicial son completamente sin cargo. El presupuesto se entrega únicamente con visita previa al lugar a tratar.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué zonas trabajan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trabajamos en Capital Federal y Gran Buenos Aires. Ante cualquier consulta sobre cobertura en su zona, no dude en contactarnos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Emiten factura?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Emitimos factura oficial por todos nuestros servicios.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clients />
        <Services />
        <Process />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
