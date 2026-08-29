/**
 * CENTRALISED MEDIA MANIFEST — remote Orglife assets only.
 *
 * Nothing here is downloaded or duplicated into /public. Every entry points at
 * the live asset on the company's own infrastructure:
 *   • orglife.vercel.app  — site assets (logos, stills)
 *   • res.cloudinary.com  — video, via Orglife's own Cloudinary account
 *
 * Cloudinary delivery parameters (`q_auto:eco,f_auto,w_*`) are applied in the
 * URL rather than by re-encoding anything: the AI Films master is 17.8 MB,
 * and the same remote asset delivered at w_1280 is 2.4 MB.
 */

const ORGLIFE = 'https://orglife.vercel.app'
const CLOUDINARY = 'https://res.cloudinary.com/dpblcamaw/video/upload'

/** Cloudinary video, delivered at a sane weight for the web. */
const video = (version: string, id: string, width = 1280): string =>
  `${CLOUDINARY}/q_auto:eco,f_auto,w_${width}/${version}/${id}.mp4`

/** A still lifted from that same video, used as its poster frame. */
const poster = (version: string, id: string, second = 2, width = 1280): string =>
  `${CLOUDINARY}/so_${second},q_auto,f_jpg,w_${width}/${version}/${id}.jpg`

/**
 * A still shown large enough to be read as an image in its own right, so it
 * asks for a better extract than a poster frame needs. `c_fill` with an
 * explicit ratio crops in Cloudinary rather than letting object-fit crop a
 * letterboxed frame — several of these films carry baked-in black bars.
 */
const still = (
  version: string,
  id: string,
  second: number,
  width: number,
  ratio: string,
): string =>
  `${CLOUDINARY}/so_${second},q_auto:good,f_jpg,w_${width},ar_${ratio},c_fill,g_auto/${version}/${id}.jpg`

export interface VideoAsset {
  readonly kind: 'video'
  /** Full-width delivery, for full-bleed contexts. */
  readonly src: string
  /** Lighter cut for grid cards, which never render full-bleed. */
  readonly srcPreview: string
  readonly poster: string
  readonly alt: string
}

export interface ImageAsset {
  readonly kind: 'image'
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  /**
   * Portrait crop for narrow screens. The template's full-bleed box is 548px
   * tall at 390px wide, so a 16:9 frame cover-crops to roughly 2.4x zoom;
   * Cloudinary re-crops the same remote asset instead.
   */
  readonly portraitSrc?: string
}

export type MediaAsset = VideoAsset | ImageAsset

const AI_FILMS_V = 'v1787655396'
const AI_ADS_V = 'v1787655398'
const AIGIO_V = 'v1787655396'
const HOME_V1 = 'v1784795221'
const HOME_V2 = 'v1784795213'
const TOMORROW_V = 'v1784795218'

export const media = {
  /* ── Identity ─────────────────────────────────────────────── */
  orglifeLogo: {
    kind: 'image',
    src: `${ORGLIFE}/images/logos/footer_logo_white_orglife.svg`,
    alt: 'Orglife Industries',
    width: 160,
    height: 40,
  },

  /* ── AI Films ─────────────────────────────────────────────── */
  aiFilms: {
    kind: 'video',
    src: video(AI_FILMS_V, 'AI_Films_dtmc77'),
    srcPreview: video(AI_FILMS_V, 'AI_Films_dtmc77', 960),
    poster: poster(AI_FILMS_V, 'AI_Films_dtmc77', 16),
    alt: 'AI film sequence',
  },

  /* ── AI Advertising ───────────────────────────────────────── */
  aiAdCampaigns: {
    kind: 'video',
    src: video(AI_ADS_V, 'AI_Ad_Campaigns_aibr85'),
    srcPreview: video(AI_ADS_V, 'AI_Ad_Campaigns_aibr85', 960),
    poster: poster(AI_ADS_V, 'AI_Ad_Campaigns_aibr85', 12),
    alt: 'AI advertising campaign sequence',
  },

  /* ── AI brand platform work ───────────────────────────────── */
  aigio: {
    kind: 'video',
    src: video(AIGIO_V, 'AIGIO_nycrut'),
    srcPreview: video(AIGIO_V, 'AIGIO_nycrut', 960),
    poster: poster(AIGIO_V, 'AIGIO_nycrut', 12),
    alt: 'AI brand platform sequence',
  },

  /* ── Cinematic / brand film ───────────────────────────────── */
  reelPrimary: {
    kind: 'video',
    src: video(HOME_V1, 'WEBSITE_HOMEPAGE_1ST_VIDEO_fw32g7', 1600),
    srcPreview: video(HOME_V1, 'WEBSITE_HOMEPAGE_1ST_VIDEO_fw32g7', 960),
    poster: poster(HOME_V1, 'WEBSITE_HOMEPAGE_1ST_VIDEO_fw32g7', 22, 1920),
    alt: 'Cinematic brand sequence',
  },
  reelSecondary: {
    kind: 'video',
    src: video(HOME_V2, 'WEBSITE_HOMEPAGE_2ST_VIDEO_xd6txn'),
    srcPreview: video(HOME_V2, 'WEBSITE_HOMEPAGE_2ST_VIDEO_xd6txn', 960),
    poster: poster(HOME_V2, 'WEBSITE_HOMEPAGE_2ST_VIDEO_xd6txn', 4),
    alt: 'Cinematic brand sequence',
  },
  investInTomorrow: {
    kind: 'video',
    src: video(TOMORROW_V, 'WEBSITE_-_INVEST_IN_TOMO_njohum'),
    srcPreview: video(TOMORROW_V, 'WEBSITE_-_INVEST_IN_TOMO_njohum', 960),
    poster: poster(TOMORROW_V, 'WEBSITE_-_INVEST_IN_TOMO_njohum', 8),
    alt: 'Brand film sequence',
  },

  /* ── Full-bleed stills (the template's scaleDown frames) ──── */
  stillPrimary: {
    kind: 'image',
    src: still(HOME_V2, 'WEBSITE_HOMEPAGE_2ST_VIDEO_xd6txn', 4, 1920, '16:9'),
    portraitSrc: still(HOME_V2, 'WEBSITE_HOMEPAGE_2ST_VIDEO_xd6txn', 4, 900, '2:3'),
    alt: 'Frame from a cinematic brand sequence',
    width: 1920,
    height: 1080,
  },
  stillSecondary: {
    kind: 'image',
    src: still(TOMORROW_V, 'WEBSITE_-_INVEST_IN_TOMO_njohum', 24, 1920, '16:9'),
    portraitSrc: still(TOMORROW_V, 'WEBSITE_-_INVEST_IN_TOMO_njohum', 24, 900, '2:3'),
    alt: 'Frame from a brand film sequence',
    width: 1920,
    height: 1080,
  },
  stillTertiary: {
    kind: 'image',
    src: still(AI_ADS_V, 'AI_Ad_Campaigns_aibr85', 12, 1920, '16:9'),
    portraitSrc: still(AI_ADS_V, 'AI_Ad_Campaigns_aibr85', 12, 900, '2:3'),
    alt: 'Frame from an AI advertising sequence',
    width: 1920,
    height: 1080,
  },

  /* ── Editorial stills ─────────────────────────────────────── */
  aboutStill: {
    kind: 'image',
    src: still(AI_FILMS_V, 'AI_Films_dtmc77', 16, 1080, '7:10'),
    alt: 'Frame from an AI film sequence',
    width: 1080,
    height: 1350,
  },
  ctaStill: {
    kind: 'image',
    src: still(HOME_V2, 'WEBSITE_HOMEPAGE_2ST_VIDEO_xd6txn', 4, 1080, '7:10'),
    alt: 'Frame from a cinematic brand sequence',
    width: 1080,
    height: 1350,
  },
  liveExperience: {
    kind: 'image',
    src: `${ORGLIFE}/assets/Home_page/CREATING%20MEMORIES%20THROUGH%20LIVE%20EXPERIENCES/webp/Concerts.webp`,
    alt: 'Live experience production',
    width: 1200,
    height: 800,
  },
} as const satisfies Record<string, MediaAsset>

export type MediaKey = keyof typeof media

export const getMedia = (key: MediaKey): MediaAsset => media[key]

/** Orglife's own client-logo marquee, used for the partner strip. */
export const clientLogos: readonly string[] = Array.from(
  { length: 12 },
  (_, i) => `${ORGLIFE}/assets/Logo/client-logo-marquee/${i + 1}.png`,
)

export const REMOTE_HOSTS = ['orglife.vercel.app', 'res.cloudinary.com'] as const
