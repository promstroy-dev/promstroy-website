# Production Hardening — Task Status (2026-03-18)

## Phase 1: Critical Fixes ✅
- [x] API route: wrap req.json() in try/catch → return 400 on bad body
- [x] API route: fix HTML injection — switch parse_mode to MarkdownV2 + escapeMd()
- [x] API route: fix silent failure — return 500 when all delivery channels fail

## Phase 2: Infrastructure ✅
- [x] next.config.mjs: security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP)
- [x] next.config.mjs: CSP includes Google Fonts (fonts.googleapis.com + fonts.gstatic.com)
- [x] next.config.mjs: image optimization config
- [x] public/robots.txt: created
- [x] next-sitemap.config.js: configured, sitemap generates on build
- [x] package.json: postbuild runs next-sitemap
- [x] layout.tsx: metadataBase, manifest, theme-color, apple-mobile meta
- [x] layout.tsx: enriched JSON-LD (url, @id, areaServed, priceRange)
- [x] Remove framer-motion (unused, ~50KB dead bundle)
- [x] Remove next-seo (unused)
- [x] public/manifest.json: created

## Phase 3: Performance + Accessibility ✅
- [x] HeroFull: preload="metadata" on video element
- [x] HeroFull: skip parallax/mouse effects when prefers-reduced-motion
- [x] StatsBanner: skip counter animation when prefers-reduced-motion
- [x] StickyHeader: body scroll lock when mobile menu is open
- [x] useReducedMotion hook created
- [x] not-found.tsx (404) and error.tsx (error boundary) added

## Phase A: API Hardening ✅
- [x] Rate limiting: 4 req/IP/15min, in-memory, periodic cleanup
- [x] API: 429 response with user-facing Russian message
- [x] InquiryForm: handles 429 with distinct message
- [x] Payload validation: field types, trim, max lengths enforced in API

## Phase B: Placeholder Suppression ✅
- [x] company.ts: removed all bracket placeholders ([N]+, [email], [Адрес], [ИНН], [ОГРН])
- [x] StatsBanner: filters out empty-value stats, grid adapts to count (3 stats → md:grid-cols-3)
- [x] Footer: conditionally renders email, address, INN/OGRN only when non-empty
- [x] About page: removed fake team lead block (👤 emoji, placeholder name)
- [x] About page: removed fake testimonials ([Имя клиента], [Компания])
- [x] Privacy page: replaced blank placeholder with real privacy policy structure

## Phase C: Polish ✅
- [x] TiltCard: disabled on touch-primary devices (hover: none media query)
- [x] manifest.json added
- [x] Apple mobile web app meta tags added
- [x] OG image: gracefully commented out (won't cause broken share images)
- [x] JSON-LD: enriched with real fields (url, areaServed, priceRange)
- [x] Privacy page: production-safe content

## Remaining — Requires Owner Content (BLOCKING FOR REAL LAUNCH)
- [ ] company.ts: add real email
- [ ] company.ts: add real office address
- [ ] company.ts: add ИНН and ОГРН
- [ ] company.ts: add real completed projects count → add back to stats array
- [ ] About page: add real team lead name/photo (replace the team block)
- [ ] About page: add real client testimonials
- [ ] /public/images/og.jpg: 1200×630 OG image for social sharing
  → then uncomment openGraph.images in layout.tsx
- [ ] robots.txt: confirm domain name (currently promstroy-samara.ru)
- [x] Set NEXT_PUBLIC_FORMSPREE_ID for fallback delivery (xgonrzje) ✅

## Post-Launch
- [ ] Yandex.Metrica analytics
- [ ] Apple touch icon (192×192 PNG)
- [ ] Real project photos in /public/images/projects/
