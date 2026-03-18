import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "@/components/ui/BackToTop";

const siteUrl = process.env.SITE_URL ?? "https://promstroy-samara.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ПромСтрой — Коммерческое строительство в Самаре",
    template: "%s | ПромСтрой",
  },
  description: "Коммерческое строительство и ремонт в Самаре с 2008 года. Офисы, рестораны, торговые центры, склады. Полный цикл.",
  keywords: ["строительство Самара", "коммерческое строительство", "ремонт офисов Самара", "ПромСтрой"],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ПромСтрой",
    url: "/",
    // OG image: add /public/images/og.jpg (1200×630) when ready
    // images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteUrl,
  url: siteUrl,
  name: "ПромСтрой",
  telephone: "+79277111103",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Самара",
    addressRegion: "Самарская область",
    addressCountry: "RU",
  },
  areaServed: {
    "@type": "State",
    name: "Самарская область",
  },
  foundingDate: "2008",
  description: "Коммерческое строительство и ремонт в Самаре с 2008 года",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A2B3D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
