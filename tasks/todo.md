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

---

# Business Value Sprint — 2026-03-19

## SEO / Schema ✅
- [x] FAQ JSON-LD (FAQPage schema) added to homepage — enables rich snippets in Google + Yandex
- [x] BreadcrumbList JSON-LD added to /proekty/[slug] pages
- [x] BreadcrumbList JSON-LD added to /uslugi/[slug] pages
- [x] OG image: auto-generated via next/og (opengraph-image.tsx) — dark branded design
- [x] OG image comment removed from layout.tsx metadata (now handled automatically)

## UX / Conversion ✅
- [x] MobileContactBar component: fixed bottom bar on mobile — Позвонить + Telegram
- [x] MobileContactBar added to root layout (every page)

## Real Content ✅
- [x] Restaurant project (ул. Ленинградская, 51): filled with real data — 300 м², 2025, 5 works, professional description
- [x] Нежилое здание ул. Чекистов: filled — 1300 м², 2026, 17 works, генподрядчик note
- [x] Торговый центр Усть-Кинельский: filled — 800 м², 2024, 16 works, генподрядчик note
- [x] Магазин Усть-Кинельский: filled — 250 м², 2025, 4 works
- [x] Дом купца Иванова (ОКН), ул. Венцека: filled — 1600 м², 2023, heritage restoration
- [x] typeMap in uslugi/[slug] updated to cover new project types (Склад, Магазин, Реставрация)

## Legal / Trust ✅
- [x] company.ts: ИНН 632507052478 added
- [x] company.ts: ОГРНИП 324632700128069 added
- [x] company.ts: legal address added (443124, г. Самара, Просека 6-я, д. 144, кв. 11)
- [x] Footer: shows "ИП Алимбеков О.В." + labeled ИНН/ОГРНИП
- [x] Set NEXT_PUBLIC_FORMSPREE_ID for fallback delivery (xgonrzje) ✅

---

## Remaining — Requires Owner Content
- [ ] Real project photos → /public/images/projects/ → fill images[] arrays in projects.ts
- [ ] About page: real team lead info (name/photo/role)
- [ ] About page: real client testimonials (2–3 quotes)
- [ ] company.ts: completed projects count confirmed → add to stats array
- [ ] Yandex.Metrica: family sends 8-digit counter ID → add as NEXT_PUBLIC_METRICA_ID in Vercel env vars (script + form goal already wired)
- [ ] Yandex Webmaster Tools: family sends meta-tag verification code → add as NEXT_PUBLIC_YANDEX_VERIFICATION in Vercel env vars (tag already wired in layout.tsx) → family clicks "Проверить"
- [ ] Yandex.Business listing: family creates listing at business.yandex.ru (entirely owner-side)
- [ ] Domain DNS: sk-promstroy.ru pending propagation — check Vercel Domains panel, hit Refresh when green
- [ ] SITE_URL env var in Vercel: update from promstroy-samara.ru → https://sk-promstroy.ru once domain verified
- [ ] Brand name confirmed: ПромСтрой (trade name, legal entity is ИП Алимбеков О.В.)

## Post-Launch / Growth (defer)
- [ ] Apple touch icon (192×192 PNG)
- [ ] CRM integration when lead volume justifies it
- [ ] Blog/news section when content person available
