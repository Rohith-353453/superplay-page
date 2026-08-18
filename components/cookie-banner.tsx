'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { siteConfig } from '@/lib/site-config'

const STORAGE_KEY = 'sp-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  const { cookie } = siteConfig

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-4xl rounded-3xl border border-black/5 bg-[#f7f3ea] p-5 text-neutral-800 shadow-2xl md:inset-x-0 md:p-6"
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-sm leading-relaxed md:text-[15px]">
              {cookie.message}{' '}
              <a
                href={cookie.linkHref}
                className="font-bold underline underline-offset-2 hover:text-neutral-950"
              >
                {cookie.linkLabel}
              </a>
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 rounded-full bg-neutral-900 px-7 py-3 font-sans text-sm font-extrabold uppercase tracking-wide text-white transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900/30"
            >
              {cookie.dismissLabel}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
