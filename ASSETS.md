# Content & Media Inventory

## UI source — the Bronx template

The original **"Bronx – Personal Portfolio HTML5 Template"** now lives entirely
in **`_template-reference/`** — the root HTML pages, `assets/` and `night-mode/`.
The **`night-mode/` variant was the UI source of truth**, since the site is
dark-only.

**Nothing in the app imports or serves anything from that folder**, so it can be
deleted before deployment without touching the build.

What was reverse-engineered from it, and where it now lives:

| Template asset | Where it went |
| --- | --- |
| `assets/css/style.css` · `dark-mode.css` · `responsive.css` | Copied verbatim to `styles/template/` and loaded in `app/layout.tsx` |
| `assets/css/dark-mode.css` lines 117-124 | That block — which darkens `.experience-box`, `.favourite-stack-box`, `.partner-box` and the expertise popup — ships **commented out**, leaving light cards under white text. Restored in `styles/overrides.css` |
| `assets/css/bootstrap.min.css` (155 KB) | **Dropped.** The page used only `row`, `text-right`, `pt-30` and the accordion classes; those live in `styles/base.css` and the accordion is React |
| `assets/js/main.js` — `scroll_animations()` | `components/effects/animations.ts` + `TemplateEffects.tsx` (all 12 `data-animation` values, same trigger offsets) |
| `assets/js/main.js` — preloader, clock, popup menu, cursor, expertise popup | `components/layout/` — `Preloader`, `LocalTime`, `PopupMenu`, `MagicCursor`, and `sections/Expertise` |
| `assets/js/themescroll.js` — ScrollSmoother, `.scaleDown`, sticky pinning, back-to-top | `components/effects/TemplateEffects.tsx` |
| `assets/js/jquery.js`, `bootstrap.bundle.min.js` | **Dropped.** Behaviour reimplemented with React hooks |
| `assets/js/SplitText.min.js` | **Dropped** — loaded by the template but never called |
| `assets/js/jarallax*.js` | Replaced by a GSAP scrub on `[data-parallax]` |
| Bundled GSAP plugin files | Replaced by `gsap` from npm (3.13+ ships ScrollSmoother/ScrollTrigger free) |
| Google Fonts `<link>` (Instrument Sans, Inter Tight) | `next/font/google` in `app/layout.tsx` |
| Line Awesome icon CDN | Dropped; the one icon it provided (FAQ +/−) is inline |
| `assets/imgs/**` (122 files, 26 unique placeholders) | **Not used.** All demo art — `partner-*.svg` are literal grey `140 x 140` boxes |
| `assets/mail/mailer.php` | **Not used.** Posts to the template author's own address |
| `assets/imgs/loader-2.gif` (1.7 MB) | **Not used.** The preloader shows the name instead |

Three things were deliberately **not** carried over:

- **Testimonials** — the block held invented quotes from fictional people. No
  verified testimonials exist, so the section is omitted rather than faked.
- **Awards** — no award is supported by the source material. The block's layout
  is kept and carries factual current **engagements** instead.
- **Pricing** — the expertise popup had a `STARTS AT $3,999` line. Removed.
- **Header mail icon** — the envelope button in the header centre. Removed.
- **Partner card background** — Orglife's client logos are white-on-transparent,
  so the template's light card both hid them and read as a row of blank tiles.
  The logos now float directly on the page.

The template's own weather call (a leaked OpenWeatherMap key, hard-coded to
Sylhet) was replaced by Ahmedabad's fixed coordinates in `data/site.ts`.

## Media source — Orglife, consumed remotely

Every image and video is served from Orglife's own infrastructure. **Nothing is
downloaded into `/public`.** All of it resolves through `data/media.ts`.

Verified live and in use:

| Asset | URL |
| --- | --- |
| AI Films | `res.cloudinary.com/dpblcamaw/…/AI_Films_dtmc77.mp4` |
| AI Ad Campaigns | `…/AI_Ad_Campaigns_aibr85.mp4` |
| AI brand platform (AIGIO) | `…/AIGIO_nycrut.mp4` |
| Brand films ×3 | `…/WEBSITE_HOMEPAGE_1ST_VIDEO_fw32g7.mp4`, `…_2ST_VIDEO_xd6txn.mp4`, `…/WEBSITE_-_INVEST_IN_TOMO_njohum.mp4` |
| Client logos ×12 | `orglife.vercel.app/assets/Logo/client-logo-marquee/1–12.png` |

### Delivery, not re-encoding

The masters are heavy — AI Films is 17.8 MB and the homepage film is 98.8 MB.
Cloudinary transformations are applied **in the URL**, so the same remote asset
is delivered at a sane weight:

- Video: `q_auto:eco,f_auto,w_1280` → AI Films drops **17.8 MB → 2.4 MB**, and
  the `w_960` cut used for grid cards is **1.5 MB**.
- Posters: `so_<seconds>,q_auto,f_jpg,w_*` extracts a frame from the film itself.
- Stills: `q_auto:good` plus `ar_*,c_fill,g_auto` so Cloudinary crops rather than
  letting `object-fit` crop a letterboxed frame. Full-bleed frames also carry a
  `2:3` portrait variant for narrow screens.

Seek points were chosen by sampling each film and picking clean frames — the
naive 2-second default landed on mid-transition motion blur in every one.

## Outstanding

| What | Where | Note |
| --- | --- | --- |
| Project titles, years, clients | `data/projects.ts` | Media is real; titles are `PROJECT 01`-style placeholders because no confirmed names were supplied |
| `email` | `data/site.ts` | Currently `null` — the UI omits the link rather than guessing |
| `linkedinUrl` | `data/site.ts` | Currently `null` |
| `NEXT_PUBLIC_SITE_URL` | `.env` | Drives canonical URL, sitemap and JSON-LD |
