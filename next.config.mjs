/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Clickjacking — deny all framing (marketing site never needs to be embedded)
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // DNS prefetch can leak visited URLs — disable
          { key: "X-DNS-Prefetch-Control", value: "off" },
          // HSTS: tell browsers to only connect via HTTPS for 2 years
          // Only meaningful over HTTPS, so skip in dev (which runs on HTTP)
          ...(!isDev
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
            : []),
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-eval' required in dev for Next.js webpack source maps
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://mc.yandex.ru"
                : "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://mc.yandex.ru",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // mc.yandex.ru needed for Yandex.Metrica noscript pixel
              "img-src 'self' data: blob: https://mc.yandex.ru",
              "media-src 'self'",
              "font-src 'self' https://fonts.gstatic.com",
              // Dev: allow WebSocket for HMR; prod: self + external APIs only
              isDev
                ? "connect-src 'self' ws://localhost:* wss://localhost:* https://api.telegram.org https://formspree.io https://vitals.vercel-insights.com https://va.vercel-scripts.com https://mc.yandex.ru"
                : "connect-src 'self' https://api.telegram.org https://formspree.io https://vitals.vercel-insights.com https://va.vercel-scripts.com https://mc.yandex.ru",
              // No framing from any origin (consistent with X-Frame-Options: DENY)
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
