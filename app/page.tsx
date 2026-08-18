import { siteConfig } from '@/lib/site-config'
import { SiteHeader } from '@/components/site-header'
import { StoryCard } from '@/components/story-card'
import { CookieBanner } from '@/components/cookie-banner'
import { SiteFooter } from '@/components/site-footer'

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <StoryCard section={siteConfig.hero} index={0} isHero />
        {siteConfig.sections.map((section, i) => (
          <StoryCard key={section.id} section={section} index={i + 1} />
        ))}
      </main>
      <SiteFooter />
      <CookieBanner />
    </>
  )
}
