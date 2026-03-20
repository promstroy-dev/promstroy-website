# Lessons Learned — ПромСтрой

## Production Hardening Pass (2026-03-18)

### L1: Silent form delivery failure is a business-critical bug
**Rule**: Never return `{ok:true}` from the API when both delivery channels (Telegram + Formspree) have failed. The user thinks their lead was submitted, but nothing was sent.
**Fix applied**: API now returns HTTP 500 when all channels fail, form shows "Ошибка отправки. Позвоните нам напрямую."

### L2: HTML injection via parse_mode
**Rule**: Never use `parse_mode: "HTML"` in the Telegram API call when user-submitted content is interpolated directly. Use MarkdownV2 with proper escaping, or no parse_mode.
**Fix applied**: Switched to `parse_mode: "MarkdownV2"` with `escapeMd()` helper.

### L3: Wrap req.json() in try/catch
**Rule**: `req.json()` throws on malformed or empty bodies. Always wrap in try/catch and return 400.

### L4: next.config.mjs should never be empty
**Rule**: Add security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP) and image optimization config before any production deploy.

### L5: Infrastructure files that must exist before launch
- `not-found.tsx` — custom 404 page
- `error.tsx` — global error boundary
- `public/robots.txt` — crawler directives
- `next-sitemap.config.js` — sitemap generation
- `metadataBase` in layout — required for OG URLs to be absolute

### L6: Dead dependencies hurt bundle size
**Rule**: `framer-motion` was in package.json and never imported anywhere. Removed. Always verify that listed dependencies are actually used — `npm ls --prod` or grep `src/` for the import.
`next-seo` was also installed but unused (Next.js 14 has built-in metadata API).

### L7: Body scroll lock for fullscreen overlays
**Rule**: Any fullscreen overlay (mobile menu, modal) must lock `document.body.style.overflow = "hidden"` while open and restore it on unmount.

### L8: Placeholder data visible in production is a launch blocker
**Items still outstanding (owner must provide):**
- `company.ts`: `[N]+` → real project count, `[email@domain.ru]` → real email, `[Адрес офиса]` → real address, `[ИНН: —]` and `[ОГРН: —]` → real legal info
- `o-kompanii/page.tsx`: `[Имя руководителя]`, fake testimonials with `[Имя клиента]`
- `privacy/page.tsx`: Privacy policy is a placeholder

### L9: prefers-reduced-motion must apply to JS animations too
**Rule**: CSS `@media (prefers-reduced-motion)` only covers CSS animations. RAF-driven JS animations (counters, parallax, tilt) need a `useReducedMotion()` hook check.
**Hook added**: `src/hooks/useReducedMotion.ts`

### L10: Video preload
**Rule**: Add `preload="metadata"` to `<video>` elements so the browser only loads metadata (dimensions, duration) rather than the full video on page load.

---

## Process Rules (apply every session)

### L11: Update todo.md and lessons.md after every completed iteration — mandatory
**Rule**: After completing any meaningful unit of work (a feature, a fix, a content update, a sprint), immediately:
1. Mark completed items `[x]` in `tasks/todo.md`
2. Add new `[ ]` items for anything discovered or deferred
3. Add a new lesson to `tasks/lessons.md` if a correction or non-obvious pattern was encountered
Do not wait for the user to ask. This is a default action, not an optional step.

### L12: ИП legal display pattern for Russian business websites
**Rule**: For ИП (Individual Entrepreneur) clients, the legal footer block should read:
`ИП [Фамилия И.О.] · ИНН [12 digits] · ОГРНИП [15 digits]`
The brand/trade name on the website does NOT need to match the legal entity name — this is standard practice in Russia. The ОГРН for ИП is 15 digits and prefixed with 3 (ОГРНИП), not 13 digits like ООО/АО.

### L13: Home address for ИП — display carefully
**Rule**: Russian ИП businesses often register at a home address (кв. = apartment). Add it to `company.ts` for legal completeness but display it subtly in the footer — not in hero sections or contact CTAs. The owner may want to replace it with a commercial address later.

### L14: Project constraint = trust signal
**Rule**: When filling project descriptions, always surface operational constraints (стеснённые условия, no lifting equipment, work without stopping adjacent businesses, closed indoor workspace) as proof of skill, not just as background facts. These are exactly the differentiators B2B clients care about when choosing a contractor.

### L15: ОКН (Объект культурного наследия) projects are premium credentials
**Rule**: If a client has worked on a listed heritage building (ОКН), treat it as a premium trust signal and feature it prominently in the portfolio. Heritage work requires government approval, coordination with preservation authorities, and specialist methods — it signals a level of trust and institutional capability that ordinary construction projects don't.
