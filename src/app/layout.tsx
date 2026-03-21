import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "@/components/ui/BackToTop";
import MobileContactBar from "@/components/layout/MobileContactBar";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";

const siteUrl = process.env.SITE_URL ?? "https://sk-promstroy.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ПромСтрой — Коммерческое строительство в Самаре",
    template: "%s | ПромСтрой",
  },
  description: "Коммерческое строительство и ремонт в Самаре с 2015 года. Офисы, рестораны, торговые центры, склады. Полный цикл.",
  keywords: ["строительство Самара", "коммерческое строительство", "ремонт офисов Самара", "ПромСтрой"],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ПромСтрой",
    url: "/",
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
  foundingDate: "2015",
  description: "Коммерческое строительство и ремонт в Самаре с 2015 года",
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
        {/* Yandex Webmaster ownership verification — set NEXT_PUBLIC_YANDEX_VERIFICATION in Vercel env vars */}
        {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
          <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
        )}
        {/* Yandex.Metrica — set NEXT_PUBLIC_METRICA_ID in Vercel env vars */}
        {process.env.NEXT_PUBLIC_METRICA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__METRICA_ID=${process.env.NEXT_PUBLIC_METRICA_ID};

                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
                ym(${process.env.NEXT_PUBLIC_METRICA_ID},'init',{
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true
                });
              `,
            }}
          />
        )}
      </head>
      <body>
        {children}
        <BackToTop />
        <MobileContactBar />
        <PageTransitionOverlay />
      </body>
    </html>
  );
}
