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
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/team#profilepage`,
  name: 'Our Team | Tech Debt Nordics',
  url: `${SITE_URL}/team`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: TEAM.map((m) => ({
    '@type': 'Person',
    '@id': `${SITE_URL}/team#${m.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    image: `${SITE_URL}${m.imageSrc}`,
    knowsAbout: m.skills,
    worksFor: { '@id': `${SITE_URL}/#organization` },
  })),
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
