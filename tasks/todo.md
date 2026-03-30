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

---

# Cross-page Consistency & Polish Pass — 2026-03-20

## Stats ✅
- [x] company.ts: replaced "Самара / и область" with "2015 / год основания" — all 3 stats now numeric
- [x] StatsBanner: added geographic anchor line ("Самара и Самарская область") below stats grid

## Project Cards ✅
- [x] "Фото готовится" label replaced with styled tag "Фото · в работе" (more intentional, higher opacity)
- [x] Added works count to metadata row if project.works.length > 0
- [x] Card body separator border strengthened (rgba(84,119,146,0.14))
- [x] Metadata pill separators changed from horizontal dashes to vertical lines (h-3 w-px)

## Service Detail CTA Card ✅
- [x] Removed rounded-lg (inconsistent with architectural language)
- [x] Added top structural rule + left accent rule (matches system card pattern)
- [x] Button now uses .btn-primary class
- [x] Added phone call option below CTA button

## Project Detail Page ✅
- [x] Gallery placeholder: replaced rounded-lg bg-bg-mid with architectural blueprint-grid treatment
- [x] CTA card: same architectural treatment as service detail card

## About Page ✅
- [x] Right card: full hierarchy overhaul — structural marks, section label, name/role, separator, body, region, CTA
- [x] Removed placeholder "Лицензии и допуски — раздел в разработке" block
- [x] Replaced with intentional horizontal "Документы" row with real copy and CTA link

## FAQ Section ✅
- [x] Reduced header mb-14 → mb-10 (tighter rhythm)
- [x] Added left border indicator on open accordion row (brass gradient)
- [x] Open row: button and answer text indented pl-4 to align with left indicator
- [x] Closed question text opacity: 0.75 → 0.82

## Trust Block ✅
- [x] duration-250 → duration-200 (standard Tailwind class)

## Process Steps ✅
- [x] Body text at rest: rgba(122,142,152,0.65) → rgba(148,180,193,0.72) — improved contrast
- [x] Mobile "Шаг N" label: text-[9px] → text-[10px]

## Page Hero Consistency ✅
- [x] Added label prop to PageHero (default: "ПромСтрой")
- [x] Bottom padding: pb-14 → pb-16
- [x] O kompanii page: label="О компании"
- [x] Proekty page: label="Проекты"
- [x] Uslugi page + service detail: label="Услуги"
- [x] Kontakty page: label="Контакты" + added subtitle
- [x] Service detail PageHero: label="Услуги"

## Form/CTA System ✅
- [x] uslugi/page.tsx: bottom CTA button uses .btn-primary, section has border-t

---

## Remaining — Requires Owner Content
- [ ] Real project photos → /public/images/projects/ → fill images[] arrays in projects.ts
- [ ] About page: real team lead info (name/photo/role)
- [ ] About page: real client testimonials (2–3 quotes)
- [ ] company.ts: completed projects count confirmed → add to stats array
- [ ] Yandex.Metrica: family sends 8-digit counter ID → add as NEXT_PUBLIC_METRICA_ID in Vercel env vars (script + form goal already wired)
- [ ] Yandex Webmaster Tools: family sends meta-tag verification code → add as NEXT_PUBLIC_YANDEX_VERIFICATION in Vercel env vars (tag already wired in layout.tsx) → family clicks "Проверить"
- [x] Yandex.Business listing: created ✅ (confirmed 2026-03-20, owner-side)
- [x] Domain DNS: sk-promstroy.ru — DNS servers set in nic.ru, Vercel confirmed configuration, domain live ✅ (2026-03-20)
- [x] SITE_URL env var in Vercel: updated to https://sk-promstroy.ru ✅ (2026-03-20)
- [ ] Brand name confirmed: ПромСтрой (trade name, legal entity is ИП Алимбеков О.В.)

## Site Architecture Audit — 2026-03-30

### Trust & Conversion Fixes ✅
- [x] TrustMarquee: fixed "18 лет" → "11 лет" (was contradicting StatsBanner which correctly says 11)
- [x] Contact page: added "Что будет дальше" 3-step lead reassurance section
- [x] About page: replaced thin Documents strip with full Credentials + Geography section (SRO, permits, guarantee, geographic coverage)
- [x] CTASection: contextual headlines per page (services, projects, service detail)
- [x] Projects index: added intro paragraph + CTASection (was missing CTA)
- [x] Service detail pages: added "Типичные сроки" timeline hint from service data
- [x] Service type: added optional `timeline` field

### Remaining — Requires Owner Content
- [ ] Owner to confirm SRO membership number → display on About page credentials section
- [ ] Owner to provide SRO issuing organization name → display on About page
- [ ] Real project photos → still images: [] for all projects (biggest trust gap)

## Post-Launch / Growth (defer)
- [ ] Apple touch icon (192×192 PNG)
- [ ] CRM integration when lead volume justifies it
- [ ] Blog/news section when content person available
