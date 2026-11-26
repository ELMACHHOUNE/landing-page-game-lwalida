import SiteExperience from '@/components/site-experience'
import { siteConfig, team } from '@/lib/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: siteConfig.arabicName,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { '@id': `${siteConfig.url}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.author,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
      sameAs: [siteConfig.links.github],
      member: team.map(([name, role]) => ({
        '@type': 'Person',
        name,
        jobTitle: role,
      })),
    },
    {
      '@type': 'VideoGame',
      '@id': `${siteConfig.url}/#game`,
      name: siteConfig.name,
      alternateName: siteConfig.arabicName,
      description: siteConfig.description,
      url: siteConfig.url,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      genre: ['Narrative adventure', 'Exploration', 'Puzzle'],
      gamePlatform: ['PC', 'Web'],
      applicationCategory: 'Game',
      operatingSystem: 'Windows, Web',
      inLanguage: siteConfig.language,
      countryOfOrigin: { '@type': 'Country', name: 'Morocco' },
      author: { '@id': `${siteConfig.url}/#organization` },
      publisher: { '@id': `${siteConfig.url}/#organization` },
      creator: { '@id': `${siteConfig.url}/#organization` },
      keywords: siteConfig.keywords.join(', '),
    },
  ],
}

export default function Page() {
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
