import { Zap } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <footer
      data-header="light"
      className="relative z-[40] bg-[#161616] px-6 pb-14 pt-20 text-neutral-300 md:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-1.5 text-white">
            <span className="grid size-8 place-items-center rounded-lg bg-[#ffc700] text-neutral-900">
              <Zap className="size-5 fill-current" />
            </span>
            <span className="font-display text-3xl tracking-tight">
              {siteConfig.logoText}
            </span>
          </div>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-neutral-400">
            {siteConfig.footer.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {siteConfig.footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 pt-6 text-sm text-neutral-500">
        {siteConfig.footer.copyright}
      </div>
    </footer>
  )
}
