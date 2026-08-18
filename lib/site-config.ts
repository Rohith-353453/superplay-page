/**
 * -------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH — edit everything about the page from here.
 * -------------------------------------------------------------------------
 * Change colors, copy, logo text, CTA links and the floating illustrations
 * without touching any component code. Swap fonts in `app/layout.tsx`.
 * -------------------------------------------------------------------------
 */

export type HeaderTheme = 'light' | 'dark'

export interface FloatingAsset {
  /** Path to the illustration (drop new PNGs in /public/assets and point here). */
  src: string
  alt: string
  /** Wrapper positioning + size (Tailwind classes). */
  className: string
  /** Vertical parallax strength in px (larger = moves more on scroll). */
  parallax?: number
  /** Idle float animation. */
  float?: { y?: number; rotate?: number; duration?: number; delay?: number }
  /** Hide on small screens to reduce clutter. */
  hideOnMobile?: boolean
}

export interface StorySection {
  id: string
  eyebrow?: string
  title: string
  body: string
  /** Panel background color. */
  bg: string
  /** Body / paragraph text color. */
  color: string
  /** Headline color. */
  titleColor: string
  /** Controls header contrast while this panel is under the header. */
  headerTheme: HeaderTheme
  cta?: { label: string; href: string }
  assets: FloatingAsset[]
}

export interface SiteConfig {
  logoText: string
  nav: { label: string; href: string }[]
  playCta: { label: string; href: string }
  hero: StorySection
  sections: StorySection[]
  cookie: {
    message: string
    linkLabel: string
    linkHref: string
    dismissLabel: string
  }
  footer: {
    tagline: string
    links: { label: string; href: string }[]
    copyright: string
  }
}

/* ---- Illustration paths (all die-cut, transparent PNGs) ---- */
const A = {
  mascotRun: '/assets/mascot-run.png',
  mascotCheer: '/assets/mascot-cheer.png',
  mascotPeek: '/assets/mascot-peek.png',
  coin: '/assets/coin.png',
  ticket: '/assets/ticket.png',
  globe: '/assets/globe.png',
  domino: '/assets/domino.png',
}

export const siteConfig: SiteConfig = {
  logoText: 'SuperPlay',
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Games', href: '#top' },
    { label: 'About', href: '#top' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#top' },
  ],
  playCta: { label: 'Play', href: '#top' },

  /* ---------------------------- HERO ---------------------------- */
  hero: {
    id: 'started',
    title: 'How It Started',
    body: 'In 2019, our core team of gaming and film industry veterans set out with a simple goal: build a billion-dollar company by delivering delightful, casual, evergreen games.',
    bg: '#5b0f2b',
    color: '#e8b9c7',
    titleColor: '#8a3a54',
    headerTheme: 'light',
    assets: [
      {
        src: A.mascotRun,
        alt: 'Playful mascot running with earbuds',
        className:
          'left-[-4%] bottom-[6%] w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px]',
        parallax: 70,
        float: { y: -14, rotate: -3, duration: 6 },
      },
      {
        src: A.ticket,
        alt: 'Golden token',
        className:
          'right-[10%] top-[26%] w-[110px] sm:w-[150px] md:w-[190px]',
        parallax: 120,
        float: { y: 16, rotate: 10, duration: 5 },
        hideOnMobile: true,
      },
    ],
  },

  /* ------------------------ STORY SECTIONS ---------------------- */
  sections: [
    {
      id: 'going',
      title: "How It's Going",
      body: "We shot past our billion dollar goal. Our games are global hits and we've proven we can play and win at the highest levels. But this success is not the finish line \u2013 it's a launchpad.",
      bg: '#f6f1e3',
      color: '#4a4038',
      titleColor: '#1b1b1b',
      headerTheme: 'dark',
      assets: [
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'left-[16%] top-[6%] w-[70px] sm:w-[95px]',
          parallax: 90,
          float: { y: -18, rotate: 12, duration: 5.5 },
          hideOnMobile: true,
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'left-[9%] top-[28%] w-[95px] sm:w-[130px]',
          parallax: 140,
          float: { y: 20, rotate: -8, duration: 6.5, delay: 0.4 },
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'left-[19%] bottom-[24%] w-[120px] sm:w-[170px]',
          parallax: 60,
          float: { y: 14, rotate: 6, duration: 7 },
          hideOnMobile: true,
        },
        {
          src: A.ticket,
          alt: 'Golden token',
          className: 'right-[6%] top-[34%] w-[140px] sm:w-[200px] md:w-[260px]',
          parallax: 110,
          float: { y: -16, rotate: -10, duration: 6 },
        },
      ],
    },
    {
      id: 'benchmark',
      title: 'We aim to be the Benchmark',
      body: "We're still pushing boundaries, breaking records, and celebrating every win along the way. Our mission is to turn our current and future games into lasting hits that don't just top the charts, but set the gold standard in gaming.",
      bg: '#8a2be2',
      color: '#f0e2ff',
      titleColor: '#c79bf2',
      headerTheme: 'light',
      assets: [
        {
          src: A.mascotCheer,
          alt: 'Mascot celebrating with arms in the air',
          className:
            'left-[-3%] top-[20%] w-[210px] sm:w-[280px] md:w-[340px] lg:w-[400px]',
          parallax: 80,
          float: { y: -18, rotate: 3, duration: 5.5 },
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'right-[12%] top-[16%] w-[80px] sm:w-[110px]',
          parallax: 130,
          float: { y: 18, rotate: -12, duration: 6 },
          hideOnMobile: true,
        },
        {
          src: A.ticket,
          alt: 'Golden token',
          className: 'right-[6%] bottom-[18%] w-[120px] sm:w-[170px]',
          parallax: 70,
          float: { y: -14, rotate: 8, duration: 6.5 },
          hideOnMobile: true,
        },
      ],
    },
    {
      id: 'globe',
      title: 'All Over the Globe',
      body: "We've built a world-class team of talented, driven individuals in 4 office locations, and we're still growing!",
      bg: '#161616',
      color: '#c9c9c9',
      titleColor: '#f4f4f4',
      headerTheme: 'light',
      assets: [
        {
          src: A.globe,
          alt: 'Cartoon globe with location pins',
          className:
            'right-[-6%] top-[8%] w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px]',
          parallax: 90,
          float: { y: -16, rotate: 6, duration: 8 },
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'left-[12%] bottom-[26%] w-[90px] sm:w-[120px]',
          parallax: 120,
          float: { y: 16, rotate: -10, duration: 6 },
          hideOnMobile: true,
        },
      ],
    },
    {
      id: 'mindset',
      title: 'While keeping a Winning Mindset',
      body: 'We move fast, we play to win, and we never lose the joy that got us here. Every teammate is an owner, every launch is a chance to make players smile, and every day is game day.',
      bg: '#ffc700',
      color: '#3a2f00',
      titleColor: '#1b1b1b',
      headerTheme: 'dark',
      assets: [
        {
          src: A.mascotPeek,
          alt: 'Mascot peeking from the corner',
          className:
            'left-[-2%] bottom-[2%] w-[190px] sm:w-[250px] md:w-[300px]',
          parallax: 60,
          float: { y: -10, rotate: -2, duration: 5 },
        },
        {
          src: A.domino,
          alt: 'Playful domino game tile',
          className: 'right-[6%] bottom-[22%] w-[150px] sm:w-[210px] md:w-[260px]',
          parallax: 110,
          float: { y: 18, rotate: 10, duration: 6 },
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'left-[24%] top-[10%] w-[70px] sm:w-[95px]',
          parallax: 140,
          float: { y: 16, rotate: -12, duration: 6.5 },
          hideOnMobile: true,
        },
      ],
    },
    {
      id: 'careers',
      eyebrow: 'Join the team',
      title: 'Come build the future of play with us',
      body: 'We are always looking for exceptional, playful, ambitious people to join the journey. If that sounds like you, we should talk.',
      bg: '#1740e6',
      color: '#d9e2ff',
      titleColor: '#ffffff',
      headerTheme: 'light',
      cta: { label: 'See Careers', href: '#careers' },
      assets: [
        {
          src: A.ticket,
          alt: 'Golden token',
          className: 'left-[8%] top-[16%] w-[120px] sm:w-[180px]',
          parallax: 110,
          float: { y: -16, rotate: -8, duration: 6 },
          hideOnMobile: true,
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'right-[10%] top-[22%] w-[100px] sm:w-[140px]',
          parallax: 90,
          float: { y: 18, rotate: 12, duration: 6.5 },
        },
        {
          src: A.coin,
          alt: 'Gold coin',
          className: 'right-[20%] bottom-[20%] w-[70px] sm:w-[95px]',
          parallax: 140,
          float: { y: -14, rotate: -10, duration: 5.5 },
          hideOnMobile: true,
        },
      ],
    },
  ],

  cookie: {
    message:
      'We use cookies and similar technologies to operate our website, to analyze traffic and might use them for personalizing content and ads. Some cookies are essential to make this site work; others help us improve your experience.',
    linkLabel: 'Privacy Notice.',
    linkHref: '#top',
    dismissLabel: 'Got It',
  },

  footer: {
    tagline: 'Delightful, casual, evergreen games — played all over the globe.',
    links: [
      { label: 'Games', href: '#top' },
      { label: 'Careers', href: '#careers' },
      { label: 'Privacy', href: '#top' },
      { label: 'Contact', href: '#top' },
    ],
    copyright: `\u00a9 ${new Date().getFullYear()} SuperPlay. All rights reserved.`,
  },
}
