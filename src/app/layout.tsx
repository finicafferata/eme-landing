import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/types/sanity";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inconsolata",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EME Estudio",
    template: "%s | EME Estudio"
  },
  description: "Portfolio de EME Estudio - Alfombras, Textil, Cerámica",
  keywords: ["alfombras", "textil", "cerámica", "diseño", "artesanía", "EME Estudio", "Buenos Aires"],
  authors: [{ name: "EME Estudio" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://eme-estudio.com",
    siteName: "EME Estudio",
    title: "EME Estudio - Alfombras, Textil, Cerámica",
    description: "Portfolio de EME Estudio - Alfombras, Textil, Cerámica",
  },
  twitter: {
    card: "summary_large_image",
    title: "EME Estudio",
    description: "Portfolio de EME Estudio - Alfombras, Textil, Cerámica",
  },
};

async function getSettings(): Promise<SiteSettings> {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);
  return settings || {
    contactInfo: {
      address: "José Penna 989, San Isidro (1642)\nBuenos Aires, Argentina",
      email: "",
      phone: ""
    },
    footerCTA: "Para preguntas, cotizaciones, talleres"
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="es">
      <body
        className={`${inconsolata.variable} font-sans antialiased`}
      >
        <Header settings={settings} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
