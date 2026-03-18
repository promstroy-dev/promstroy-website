import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: {
    default: "ПромСтрой — Коммерческое строительство в Самаре",
    template: "%s | ПромСтрой",
  },
  description: "Коммерческое строительство и ремонт в Самаре с 2008 года. Офисы, рестораны, торговые центры, склады. Полный цикл.",
  keywords: ["строительство Самара", "коммерческое строительство", "ремонт офисов Самара", "ПромСтрой"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ПромСтрой",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ПромСтрой",
  telephone: "+79277111103",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Самара",
    addressCountry: "RU",
  },
  foundingDate: "2008",
  description: "Коммерческое строительство и ремонт в Самаре с 2008 года",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
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
