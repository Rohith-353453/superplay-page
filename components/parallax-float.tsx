'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import type { FloatingAsset } from '@/lib/site-config'

export function ParallaxFloat({ asset }: { asset: FloatingAsset }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallax = asset.parallax ?? 60
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  const float = asset.float ?? {}

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduce ? undefined : { y }}
      className={[
        'pointer-events-none absolute z-10 select-none',
        asset.hideOnMobile ? 'hidden sm:block' : '',
        asset.className,
      ].join(' ')}
    >
      <motion.img
        src={asset.src}
        alt=""
        draggable={false}
        className="h-full w-full object-contain drop-shadow-2xl"
        animate={
          reduce
            ? undefined
            : {
                y: [0, float.y ?? -12, 0],
                rotate: [0, float.rotate ?? 4, 0],
              }
        }
        transition={{
          duration: float.duration ?? 6,
          delay: float.delay ?? 0,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}
