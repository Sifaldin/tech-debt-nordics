import type { Metadata } from 'next';
import TeamCarousel from '../components/TeamCarousel';
import { TEAM } from '../data/team';
import { SITE_URL } from '../site';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Senior frontend, backend, full-stack and AI engineers who have built and scaled software at Klarna, Visa, Tink, Tietoevry, Kindred and Ubiquiti.',
  alternates: { canonical: '/team' },
};

// Person nodes for the named engineers, generated from the same TEAM array the
// carousel renders so the markup can never describe someone the page does not.
// The bios and skills are real, which is the point: who does the work is a
// credibility signal, and the carousel alone leaves it invisible to crawlers.
//
// This is an AboutPage, not a ProfilePage. Google's ProfilePage requires a
// single Person or Organization as mainEntity (the one subject of the profile),
// and Search Console flagged the old ProfilePage here as missing mainEntity.
// A team page describes several people, so the honest shape is an AboutPage
// whose mainEntity is an ItemList of the engineers.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/team#webpage`,
  name: 'Our Team | Tech Debt Nordics',
  url: `${SITE_URL}/team`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Tech Debt Nordics engineering team',
    numberOfItems: TEAM.length,
    itemListElement: TEAM.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        '@id': `${SITE_URL}/team#${m.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: m.name,
        jobTitle: m.role,
        description: m.bio,
        image: `${SITE_URL}${m.imageSrc}`,
        knowsAbout: m.skills,
        worksFor: { '@id': `${SITE_URL}/#organization` },
      },
    })),
  },
};

export default function TeamPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <TeamCarousel />
    </main>
  );
}
