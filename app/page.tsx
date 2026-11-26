import SiteExperience from '@/components/site-experience'
import { siteConfig } from '@/lib/site'
import { dictionaries } from '@/lib/i18n/dictionaries'
import { getLocale } from '@/lib/i18n/server'

export default async function Page() {
  const locale = await getLocale()
  const { meta, team } = dictionaries[locale]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.arabicName,
        description: meta.description,
        inLanguage: locale,
        publisher: { '@id': `${siteConfig.url}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.author,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [siteConfig.links.github],
        member: team.members.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
        })),
      },
      {
        '@type': 'VideoGame',
        '@id': `${siteConfig.url}/#game`,
        name: siteConfig.name,
        alternateName: siteConfig.arabicName,
        description: meta.description,
        url: siteConfig.url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        genre: ['Narrative adventure', 'Exploration', 'Puzzle'],
        gamePlatform: ['PC', 'Web'],
        applicationCategory: 'Game',
        operatingSystem: 'Windows, Web',
        inLanguage: locale,
        countryOfOrigin: { '@type': 'Country', name: 'Morocco' },
        author: { '@id': `${siteConfig.url}/#organization` },
        publisher: { '@id': `${siteConfig.url}/#organization` },
        creator: { '@id': `${siteConfig.url}/#organization` },
        keywords: siteConfig.keywords.join(', '),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteExperience />
    </>
  )
}
