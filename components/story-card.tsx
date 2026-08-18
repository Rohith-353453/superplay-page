'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import type { StorySection } from '@/lib/site-config'
import { ParallaxFloat } from './parallax-float'

const EASE = [0.16, 1, 0.3, 1] as const

const textContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const textItem: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

export function StoryCard({
  section,
  index,
  isHero = false,
}: {
  section: StorySection
  index: number
  isHero?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  // Fires as soon as the panel's top edge crosses ~85% of the viewport height,
  // which is deterministic even while panels are stacked with negative margins.
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  const radius = '2.5rem'
  const clipHidden = `inset(100% 0% 0% 0% round ${radius})`
  const clipShown = `inset(0% 0% 0% 0% round ${radius})`

  // The whole colored panel wipes up from the bottom when it enters view.
  const revealProps = isHero
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : reduce
      ? { initial: false as const }
      : {
          initial: { clipPath: clipHidden },
          animate: { clipPath: inView ? clipShown : clipHidden },
        }

  return (
    <section
      ref={ref}
      id={section.id}
      data-header={section.headerTheme}
      className={[
        'relative isolate',
        isHero ? '' : '-mt-10 md:-mt-16',
      ].join(' ')}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        {...revealProps}
        transition={{ duration: 0.95, ease: EASE }}
        className={[
          'relative overflow-hidden',
          isHero
            ? 'min-h-svh'
            : 'min-h-[80svh] rounded-t-[2.5rem] md:rounded-t-[4rem]',
          'flex items-center justify-center',
          'px-6 py-24 md:px-10 md:py-32',
        ].join(' ')}
        style={{ backgroundColor: section.bg, color: section.color }}
      >
        {/* Floating illustrations */}
        {section.assets.map((asset, i) => (
          <ParallaxFloat key={`${section.id}-${i}`} asset={asset} />
        ))}

        {/* Text column */}
        <motion.div
          variants={reduce ? undefined : textContainer}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : inView || isHero ? 'show' : 'hidden'}
          className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          {section.eyebrow ? (
            <motion.span
              variants={reduce ? undefined : textItem}
              className="mb-5 inline-block rounded-full border border-white/40 px-4 py-1 font-sans text-xs font-bold uppercase tracking-[0.25em]"
            >
              {section.eyebrow}
            </motion.span>
          ) : null}

          <motion.h2
            variants={reduce ? undefined : textItem}
            className="font-display text-5xl uppercase leading-[0.86] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ color: section.titleColor }}
          >
            {section.title}
          </motion.h2>

          <motion.p
            variants={reduce ? undefined : textItem}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl md:text-2xl"
          >
            {section.body}
          </motion.p>

          {section.cta ? (
            <motion.a
              variants={reduce ? undefined : textItem}
              href={section.cta.href}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-base font-extrabold uppercase tracking-wide text-neutral-900 shadow-xl transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:translate-y-0"
            >
              {section.cta.label}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </motion.a>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  )
}
