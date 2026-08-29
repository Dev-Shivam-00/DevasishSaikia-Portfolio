# Devasish Saikia — Portfolio

The **Bronx** HTML template (`night-mode/` variant) rebuilt as a production
Next.js / TypeScript site, with its content and media replaced by Devasish
Saikia's — positioned around **AI films, AI advertising and creative direction**.

Next.js App Router · strict TypeScript · GSAP (ScrollSmoother / ScrollTrigger) ·
Nodemailer. No Tailwind: the template's own stylesheets are the design system.

## Running it

```bash
npm install
cp .env.example .env.local   # SMTP + site URL
npm run dev                  # http://localhost:3000
```

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Template fidelity

The template is the UI source of truth; only content and media changed. Every
section, in the template's original order:

`hero → full-image → featured work → about → partners → expertise → philosophy
→ full-image → experience → process → engagements → full-image → FAQ → CTA →
footer`

Its interactions were reimplemented, not approximated — preloader, live clock,
full-screen popup menu, magic cursor, expertise popup, ScrollSmoother, the
`.scaleDown` scrub, sticky-heading pinning, back-to-top, and all twelve
`data-animation` reveal types with the template's own trigger offsets and
easing. jQuery and Bootstrap are gone; GSAP comes from npm.

[ASSETS.md](ASSETS.md) records exactly what was carried over, dropped, and why.

## Before launch

1. **Project data** — `data/projects.ts` has real Orglife media with
   `PROJECT 01`-style placeholder titles. No project name, client, year or
   result was invented.
2. **Contact facts** — `email`, `linkedinUrl` and `NEXT_PUBLIC_SITE_URL` in
   `data/site.ts`. Links for unset values are omitted rather than guessed.

## Media

All media is remote — nothing is copied into `/public`. `data/media.ts` is the
only place a URL appears, and it is the single switch: a slot holding a film
renders an autoplaying `<video>`, a slot holding a still renders an `<Image>`.
Callers pass a key and never care which it is, so a slot can be swapped from
still to film in the manifest alone.

Films play muted, looped and inline. Nothing is fetched until the element is
near the viewport and playback pauses the moment it leaves — a page of six films
would otherwise pull ~10 MB on load. Cards use a lighter 960px cut (1.5 MB)
rather than the full-width one, and the poster frame — a still lifted from the
film itself — holds the layout until the first frame decodes. Under
`prefers-reduced-motion` no video is requested at all and the poster renders as
a plain image.

Cloudinary delivery parameters keep the masters sane: AI Films is 17.8 MB at
source and 1.5 MB as delivered to a card.

## Contact form

```
form → POST /api/contact → rate limit → zod → honeypot → SMTP → inbox
```

SMTP credentials are read only inside `lib/email.ts`, which is marked
`server-only`. A delivery failure and a missing SMTP config return an identical
generic error, so the response never reveals whether SMTP is configured. The
honeypot is answered with a success response so bots learn nothing, and an
in-process limiter caps a client at 8 submissions per 10 minutes.

## Notes on robustness

- **Scrolling.** The template pins `main.bronx-main` with
  `position: fixed; overflow: hidden` and depends entirely on ScrollSmoother to
  move content inside it — so with JS unavailable or reduced motion on, the page
  could not scroll at all. Here the unpinned state is the default and the fixed
  state is applied only once ScrollSmoother has actually mounted
  (`html.smoother-active`), and only above 809px. ScrollSmoother is desktop-only:
  a transform-driven smoother fights native momentum scrolling on touch devices,
  which left mobile unable to scroll.
- **Dark mode.** The template's own `dark-mode.css` has the rule that darkens
  `.experience-box`, `.favourite-stack-box` and the expertise popup commented
  out, so those surfaces kept a light `#f5f5f7` background behind white text.
  Restored in `styles/overrides.css`.
- **Reduced motion.** ScrollSmoother, the magic cursor and all reveals are
  skipped; the page renders as static layout and every video falls back to its
  poster frame.
- **Accessibility.** Section titles are `<h2>` and card titles `<h3>` so the
  document runs h1 → h2 → h3 (the template styled these by tag, so its rules are
  mirrored onto the new tags in `styles/overrides.css` — same values, no visual
  change). Both dialogs set `inert` when closed, move focus on open, trap Tab,
  and close on Escape. Every form control has a real label. All interactive
  targets meet the 24 px minimum.

## Structure

```
_template-reference/  the original Bronx template — reference only, delete
                      before deploying; nothing in the app imports from it
app/            layout (fonts, SEO, JSON-LD), page, api/contact, sitemap, robots
components/
  effects/      TemplateEffects (GSAP), ScrollReveal, animation vocabulary
  layout/       Header, PopupMenu, MenuContext, Preloader, MagicCursor,
                LocalTime, Footer
  sections/     Hero, FullImage, FeaturedWork, About, Partners, Expertise,
                Philosophy, Career, Process, Engagements, Faq, Contact
  ui/           Media (image/video switch), AutoplayVideo
data/           site, navigation, projects, experience, media
lib/            email, validation, rate-limit, structured-data, focus
styles/
  base.css      reboot + the few Bootstrap utilities the markup uses
  template/     the template's stylesheets, verbatim
  overrides.css additions only — documented, never redefinitions
```
