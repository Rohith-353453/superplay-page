'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Accessibility, Menu, X, Zap } from 'lucide-react'
import { siteConfig, type HeaderTheme } from '@/lib/site-config'

export function SiteHeader() {
  const [theme, setTheme] = useState<HeaderTheme>('light')
  const [menuOpen, setMenuOpen] = useState(false)

  const updateTheme = useCallback(() => {
    const probeY = 48
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header]'),
    )
    for (const section of sections) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= probeY && rect.bottom >= probeY) {
        setTheme((section.dataset.header as HeaderTheme) ?? 'light')
        return
      }
    }
  }, [])

  useEffect(() => {
    updateTheme()
    window.addEventListener('scroll', updateTheme, { passive: true })
    window.addEventListener('resize', updateTheme)
    return () => {
      window.removeEventListener('scroll', updateTheme)
      window.removeEventListener('resize', updateTheme)
    }
  }, [updateTheme])

  const isDark = theme === 'dark' // dark = dark text on a light panel
  const fg = isDark ? 'text-neutral-900' : 'text-white'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
          {/* Left: accessibility + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Accessibility options"
              className={`grid size-9 place-items-center rounded-md bg-black/10 backdrop-blur-sm transition-colors hover:bg-black/20 ${fg}`}
            >
              <Accessibility className="size-5" />
            </button>

            <a
              href="#top"
              aria-label={`${siteConfig.logoText} home`}
              className={`flex items-center gap-1.5 ${fg}`}
            >
              <span className="grid size-8 place-items-center rounded-lg bg-[#ffc700] text-neutral-900 shadow-md">
                <Zap className="size-5 fill-current" />
              </span>
              <span className="font-display text-2xl tracking-tight md:text-3xl">
                {siteConfig.logoText}
              </span>
            </a>
          </div>

          {/* Right: play + menu */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.playCta.href}
              className={`rounded-full px-6 py-2.5 font-display text-lg tracking-wide shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 ${
                isDark
                  ? 'bg-neutral-900 text-white focus-visible:ring-neutral-900/30'
                  : 'bg-white text-neutral-900 focus-visible:ring-white/40'
              }`}
            >
              {siteConfig.playCta.label}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`grid size-11 place-items-center rounded-full transition-colors hover:bg-black/10 ${fg}`}
            >
              <Menu className="size-7" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#5b0f2b] text-white"
          >
            <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
              <span className="font-display text-2xl md:text-3xl">
                {siteConfig.logoText}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-white/10"
              >
                <X className="size-7" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {siteConfig.nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl uppercase tracking-tight text-white/70 transition-colors hover:text-white sm:text-6xl md:text-7xl"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
