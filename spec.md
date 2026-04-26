# Personal Website — Design Brief

**Owner:** Erdem
**Domain:** TBD (erdem.dev / erdem.com.tr / similar)
**Purpose:** Personal portfolio — engineering work, education, projects, and a creative playground
**Status:** Initial brief, v0.1
**Last updated:** April 2026

---

## 1. Vision in One Sentence

A personal portfolio with the **editorial, playful, pastel-luxury feel of [marvis.com](https://www.marvis.com)** — translated into a backend-heavy full-stack engineer's world. Not a CV. Not a dark-mode dev template. A *product*.

## 2. The Core Reference: Why Marvis

The Marvis toothpaste site is the north star. What I want from it specifically:

- **Editorial layout.** Generous whitespace, magazine-style typography hierarchy, images treated as artifacts not decorations.
- **Pastel-luxury palette.** Warm off-whites, dusty blues/greens, rich accent colors. Not neon, not "cyberpunk dev," not minimalist black-on-white.
- **Strong display typography.** A confident serif or distinctive display face for headlines. Clean sans for body. Italic used as a real design choice, not an afterthought.
- **Sticky scroll transformations.** Sections that pin and morph as you scroll past — text changing, images cross-fading, color palette shifting between sections.
- **Horizontal scroll moments.** Used selectively, e.g. the projects gallery.
- **Image scrubbing / sequence animations.** Where appropriate (e.g. "show me how a request flows through Devredin's stack" as a frame-by-frame scroll-scrubbed sequence).
- **Playful cursor + micro-interactions.** Custom cursor, magnetic buttons, subtle hover states that feel intentional.
- **Smooth, premium motion.** Lenis or similar smooth-scroll. Easing curves that feel expensive.

What I do **not** want from Marvis: literal toothpaste imagery, the e-commerce structure, the country selector. Just the *feel*.

## 3. Tone & Personality

- Confident but not loud. The work does the talking.
- Editorial seriousness *with* playful interaction.
- Reads "engineer who cares about design," not "designer who learned to code."
- Avoid: corporate-speak, AI buzzwords, generic "passionate developer about clean code" copy.
- Bilingual sprinkles welcome — a Turkish word or phrase used where it actually lands better than English (subject to designer's call).

## 4. Other References (Secondary)

| Reference | What I want from it |
|---|---|
| [marvis.com](https://www.marvis.com) | **Primary.** Everything in section 2. |
| [rauno.me](https://rauno.me) | Tasteful micro-interactions, devtool aesthetic for the playground |
| [linear.app](https://linear.app) | How premium scroll motion *feels* |
| [josh.comeau.com](https://josh.comeau.com) | Inline interactive explainers — for the playground |
| [bruno-simon.com](https://bruno-simon.com) | Reference for **playground only**, not the main site |

## 5. Site Architecture

Single long-scroll page with deep links. Sticky side nav on desktop, top nav on mobile, that highlights the active section.

```
1. Hero / Intro
2. About
3. Experience
4. Selected Projects
5. Tech Stack
6. Education
7. Playground
8. Writing  (placeholder for future)
9. Contact / Footer
```

Each section deep-linkable: `/#projects`, `/#playground`, etc.

---

## 6. Section-by-Section Content & Direction

### 6.1 Hero / Intro

**Content:**
- Name: **Erdem**
- Role line: *Full-stack engineer. CTO @ Devredin. CS @ İYTE.*
- Sub-line: editorial one-liner — designer to iterate. Working draft: *"I build the quiet systems that run when no one's watching."*
- Two CTAs: `See my work` → projects, `Get in touch` → contact
- Subtle status pill (CMS-toggleable): e.g. *"Open to summer 2026 opportunities"*

**Design direction:**
- Big editorial display type for the name. Pastel background, possibly with a subtle grain texture (very Marvis).
- Name animates in: not a generic fade — something more deliberate, e.g. each letter staggers up from below with a slight rotation, or a soft blur-to-sharp transition.
- Background: a generative shape (blob, gradient, or animated SVG pattern) that drifts slowly and reacts subtly to cursor.
- Custom cursor introduced here, persists across the site.

### 6.2 About

**Working copy (designer to refine):**
> I'm a third-year Computer Engineering student at İYTE and CTO at Devredin, Turkey's business-transfer marketplace. Most of what I do is invisible — Postgres replication, Cloudflare workers, AI tooling that runs in production. The good stuff is usually behind a server.
>
> Outside work, I read database papers, organize Secret Santas for hundreds of engineering students, and plan road trips that have nothing to do with code.

**Design direction:**
- Two-column on desktop: editorial portrait on one side (treated like a magazine photo, with caption), text on the other.
- Photo should feel real — not LinkedIn. Casual, intentional, well-composed. (I'll supply.)
- Marvis trick: on scroll, the photo's frame *changes* — color border swaps, caption rewrites, or a second photo cross-fades in.
- 2–3 inline "facts" as little editorial pills: `Based in İzmir`, `Currently reading: DDIA Ch. 3`, `Cafés > dorm room`. CMS-editable.

### 6.3 Experience

**Actual entries:**

**CTO — Devredin** *(start date — present)*
- 2.5% equity. Lead all engineering at Turkey's business-transfer marketplace.
- Migrated production from Nginx/Apache to a modern Debian + Nginx stack.
- Built `mcp.devredin.com` — an MCP server exposing platform data to AI tools.
- Designed the AI-powered weekly business report generator and listing valuation module, grounded in empirical data from 1,261+ active listings.
- Set up the CDN layer (Cloudflare with image transformations, replacing BunnyCDN). Handled a production security incident (SSH brute force → crypto miner) and hardened all servers.
- Owned the EİDS Faz-2 commercial real estate integration with the Ministry of Trade.

**Co-founder / Engineer — benzersor.com** *(start date — present)*
- 10% equity. Stealth project. *(Keep description vague until launch.)*

*(Add earlier roles / freelance as needed.)*

**Design direction:**
- Vertical timeline, but Marvis-style: each role is a "spread" with display type for the company name, italic for the role, body for the bullets. Like a magazine feature.
- Sticky section header: as you scroll through experience, the company name pins to one side and morphs to the next as you cross thresholds. (Marvis does exactly this.)
- Optional accent: a small rotating word/badge per role (e.g. "infra," "AI," "data") that animates in as the section enters.

### 6.4 Selected Projects

**Featured projects (4–6, curated):**

1. **Devredin MCP Server** — `mcp.devredin.com`
   - One of the first production MCP deployments in Turkey. Exposes the marketplace's database to AI tooling for analytics and ops.
   - Stack: Node.js, MCP protocol, PostgreSQL, Cloudflare.
   - Visual: terminal-style demo, log stream, or short scree[118;1:3un recording.

2. **AI Weekly Business Report Generator (Devredin)**
   - Generates editorial-quality weekly reports from raw marketplace data using LLMs grounded in SQL.
   - Stack: PostgreSQL, LLM APIs, prompt orchestration, scheduled jobs.
   - Visual: a "before/after" — raw data table morphing into a polished report page.

3. **Listing Valuation Module (Devredin)**
   - Empirical valuation engine built on 1,261+ active listings. Replaces gut-feel pricing with data.
   - Visual: distribution chart, interactive estimator (could be a real working widget).

4. **SiksokHarita** — Real-time campus shuttle tracking (İYTE)
   - HCI course project. Live shuttle positions on a campus map.
   - Stack: React, Java Spring Boot, PostgreSQL.
   - Visual: animated map preview.

5. **iyteyilbasi Secret Santa** — community project
   - Built the platform; matched 200+ İYTE engineering students for the New Year exchange.
   - Visual: warm, festive, off-brand-on-purpose.

6. **benzersor.com** *(stealth — placeholder card)*

**Design direction:**
- **Horizontal scroll gallery** here — very Marvis. Each project = a full "spread" you scroll through sideways while the page is pinned vertically.
- Each spread: large project image/visual + project name in display type + 2–3 line description + a "case study →" link to a dedicated page (future).
- Hovering over a project triggers a subtle visual shift (image zoom, color overlay, cursor changes label to `View →`).
- Mobile fallback: stacked cards with the same editorial treatment, no horizontal scroll.

### 6.5 Tech Stack

**Real stack:**

- **Languages:** TypeScript, Java, Python, SQL
- **Frontend:** React, Next.js, Tailwind
- **Backend:** Node.js, Spring Boot, Prisma
- **Data:** PostgreSQL (incl. replication), Redis
- **Infra:** Debian, Nginx, AWS Lightsail, Cloudflare (CDN, Workers, Email Routing)
- **AI/Tooling:** MCP servers, LLM APIs, CodeRabbit
- **Other:** SEO (Core Web Vitals, structured data), DataForSEO API

**Design direction:**
- **Not** a logo grid. Logo grids are dead.
- Editorial table or tag cloud where each tech is set in italic display type, sized by frequency of use.
- On hover: a small inline note appears — *"Postgres replication is what I'm currently studying for CENG 465."* Personal, opinionated, not generic.
- Possible Marvis-style touch: a sticky section where as you scroll, the "category" word on one side morphs (`languages → frontend → backend → infra`) while the items list updates on the other side.

### 6.6 Education

**Content:**
- **İzmir Institute of Technology (İYTE)** — BSc Computer Engineering, 3rd year, 3.93 GPA.
- Notable courses: CENG 465 *Designing Data-Intensive Applications*, CENG 318 *HCI*, MATH 313 *Cryptography*.
- *(Optionally:)* YKS national university entrance exam — top ~2,600 of ~3M.

**Design direction:**
- Compact section, not the headline. One editorial card.
- Fun touch: a small ticker or scroll-revealed list of *"things I'm currently learning"* — pulled from a CMS or even a JSON file I update myself. (Ties into the live-feel of the site.)

### 6.7 Playground

This is the section I'm most excited about — and the most Marvis-divergent. It's a deliberate gear-shift: the editorial site opens up into a **devtool playground**.

**Ideas (designer + I to pick 2–3 to start):**

- **Live Devredin pulse.** A small live widget pulling sanitized stats from the Devredin MCP server (e.g. number of active listings, recent activity heatmap). Proves the MCP isn't a toy.
- **Listing valuation toy.** Type a category + region + revenue, get an instant estimate based on real distribution data. Educational, not a real quote.
- **Postgres replication visualizer.** An animated diagram showing primary → replica with simulated lag. Tied to my CENG 465 work, doubles as an explainer.
- **Terminal Easter egg.** Press `~` anywhere on the site to open a fake terminal with a few commands (`whoami`, `cat about.md`, `ls projects/`). Devs love this and it's on-brand.
- **Generative art piece.** Something Marvis-adjacent — a slow generative pattern using p5/canvas, signed and dated.

**Design direction:**
- Section transition: the editorial palette **dims**, type shifts to mono, the page feels like it's "switching modes." This contrast is the point.
- Each playground piece sits in its own framed module with a short caption (what it does, what's behind it).
- Performance budget matters here — keep heavy stuff lazy-loaded and behind interaction.

### 6.8 Writing *(placeholder)*

A simple list-style section reserved for future blog posts / notes. Hide if empty for v1.

### 6.9 Contact / Footer

- One bold sentence: *"Working on something I should know about?"*
- Email button (mailto), GitHub, LinkedIn, X/Twitter (if active).
- Footer: built with [stack], colophon link, current year, "made in İzmir."
- Optional: a small now-playing or "currently" line (book / song / problem I'm working on) — keeps the site feeling alive between updates.

---

## 7. Visual System

### Typography
- **Display:** a confident serif or distinctive display face. Suggestions to explore: *PP Editorial New, GT Super, Söhne Breit, Tiempos Headline.* Designer's call.
- **Body:** clean modern sans. *Inter, Söhne, GT America, Geist.*
- **Mono:** for the playground, code, data. *JetBrains Mono, GT America Mono, Berkeley Mono.*
- Italic is used intentionally for emphasis and rhythm, not just for citations.

### Color
- **Base:** warm off-white / paper tone. Avoid pure white.
- **Ink:** rich near-black, slightly warm. Avoid pure #000.
- **Accent palette:** 3–4 dusty pastels (e.g. dusty blue, sage, terracotta, mustard). Used as section accents — each section can subtly shift palette as you scroll.
- **Dark mode:** optional v2. Default is light/editorial.

### Imagery
- Editorial photography style. Real photos, real grain.
- Project visuals are framed like magazine plates with captions.
- Diagrams hand-drawn-feeling but precise (think Edward Tufte meets Wallpaper magazine).
- No stock illustration. No generic isometric scenes.

### Motion Principles
- Smooth scroll (Lenis or equivalent).
- Easing: long, generous curves. Nothing snappy.
- Reveal animations are scroll-driven, not time-based.
- Hover states have weight — they should feel like the cursor is pressing on something soft.
- Reduced-motion preference is fully respected — all transforms degrade to simple fades.

---

## 8. Suggested Tech Stack (for the build)

Open to designer's preference, but my defaults:

- **Framework:** Next.js (App Router) or Astro
- **Styling:** Tailwind CSS + a small set of custom CSS variables for the palette
- **Motion:** Framer Motion + Lenis (smooth scroll) + GSAP (for the heavier scroll-pinned sequences à la Marvis)
- **3D (playground only):** Three.js or React Three Fiber
- **CMS:** lightweight — MDX files in the repo, or Sanity if I want to update from a phone
- **Deploy:** Vercel or Cloudflare Pages
- **Analytics:** Plausible or Umami (privacy-first)

## 9. Performance & Quality Bar

- Lighthouse: 95+ Performance, 100 Accessibility on desktop.
- Largest Contentful Paint < 2.0s on 4G.
- The site feels fast *first*, fancy second. Animations never block interaction.
- Fully responsive: desktop (1440+), laptop (1280), tablet (768), mobile (375). Mobile is not an afterthought — Marvis nails mobile and so should this.
- Accessible: full keyboard navigation, focus states, alt text, semantic HTML, prefers-reduced-motion.

## 10. Deliverables From Designer

Phase 1 — *Direction*
- Moodboard (1 page)
- Typography + color system
- 2 hero variations

Phase 2 — *Design*
- Full desktop design for all 9 sections
- Mobile design for all 9 sections
- Motion notes / Figma prototype for the key scroll moments (hero, experience pinning, projects horizontal scroll, playground transition)

Phase 3 — *Handoff*
- Figma file with components and tokens
- A short Loom walking through the motion intent
- Asset export package

## 11. Open Questions

- Do we go single long-scroll or split projects into individual case-study pages from day one? *Lean: long-scroll for v1, case studies in v2.*
- Domain: `.dev`, `.com.tr`, or other? *Pending.*
- Photo shoot: do I shoot fresh editorial portraits or use what I have? *Probably fresh — happy to plan a half-day in İzmir.*
- Bilingual (TR/EN) toggle from launch, or English-only v1? *Lean: EN v1, TR v2.*

## 12. Timeline (Rough)

- **Week 1–2:** Phase 1 (direction)
- **Week 3–5:** Phase 2 (design)
- **Week 6:** Phase 3 (handoff)
- **Week 7–10:** Build (I'll do this myself unless we agree otherwise)
- **Target soft launch:** before fall semester 2026.

---

*This is v0.1 — meant to be a starting point for conversation, not a contract. Mark anything that's wrong, missing, or boring.*
