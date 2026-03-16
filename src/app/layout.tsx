import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: "Fumigaciones Norte | Control Integrado de Plagas",
  description:
    "Empresa especializada en control, tratamiento y prevención de plagas. Productos autorizados por el Ministerio de Salud y ANMAT. Servicio en Capital Federal y Gran Buenos Aires.",
  keywords:
    "fumigación, control de plagas, desratización, desinsectación, cucarachas, mosquitos, roedores, Capital Federal, Buenos Aires",
  metadataBase: new URL("https://fumigacionesnorte.com.ar"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo-favicon.png",
    shortcut: "/images/logo-favicon.png",
    apple: "/images/logo-favicon.png",
  },
  openGraph: {
    title: "Fumigaciones Norte | Control Integrado de Plagas",
    description:
      "Servicios profesionales de control y prevención de plagas. Productos de baja toxicidad autorizados por ANMAT. Capital Federal y Gran Buenos Aires.",
    url: "https://fumigacionesnorte.com.ar",
    siteName: "Fumigaciones Norte",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://fumigacionesnorte.com.ar/images/logo.png",
        width: 512,
        height: 512,
        alt: "Fumigaciones Norte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fumigaciones Norte | Control Integrado de Plagas",
    description:
      "Servicios profesionales de control y prevención de plagas. Productos de baja toxicidad autorizados por ANMAT. Capital Federal y Gran Buenos Aires.",
    images: ["https://fumigacionesnorte.com.ar/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body className="antialiased bg-white text-slate-800">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
