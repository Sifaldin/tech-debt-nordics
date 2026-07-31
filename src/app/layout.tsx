import type { Metadata } from 'next';
import {
  Chakra_Petch,
  Inter,
  JetBrains_Mono,
  Rajdhani,
  Share_Tech_Mono,
} from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { SITE_URL } from './site';

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  weight: ['500', '700'],
  subsets: ['latin'],
});

const chakraPetch = Chakra_Petch({
  variable: '--font-chakra',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech',
  weight: '400',
  subsets: ['latin'],
});

const TITLE =
  'Tech Debt Nordics: B2B Software, AI & Full-Stack Engineering Consultancy';
const DESCRIPTION =
  'B2B software engineering consultancy. An EU company based in Stockholm, working across Europe, the Gulf and the Levant, and remote worldwide. Senior frontend, backend, full-stack and AI engineers building web platforms, native apps, cloud infrastructure and integrations. Separate Project Planning and Controls practice for Primavera P6 scheduling and schedule risk analysis.';

// The cities we take work in. Each one is named explicitly (rather than rolled
// up as "the Middle East") so it can be matched on its own in local search, and
// each is mirrored in the visible Locations band and the JSON-LD areaServed.
const CITIES: [city: string, region: string, country: string][] = [
  ['Stockholm', 'Stockholm County', 'SE'],
  ['Dubai', 'Dubai', 'AE'],
  ['Abu Dhabi', 'Abu Dhabi', 'AE'],
  ['Riyadh', 'Riyadh Province', 'SA'],
  ['Amman', 'Amman Governorate', 'JO'],
  ['Damascus', 'Damascus Governorate', 'SY'],
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // page titles set just their own name; the brand is appended here
    template: '%s | Tech Debt Nordics',
  },
  description: DESCRIPTION,
  keywords: [
    'B2B software consultancy',
    'B2B frontend development',
    'B2B backend development',
    'full stack development agency',
    'AI consultancy',
    'AI development company',
    'AI integration services',
    'LLM and RAG development',
    'AI agent development',
    'frontend consultancy Stockholm',
    'backend engineering consultancy',
    'full stack engineers Sweden',
    'native app development',
    'iOS and Android app development',
    'React and Next.js consultancy',
    'Java and Spring Boot consultancy',
    'cloud and platform engineering',
    'software engineering consultancy Sweden',
    'website support and maintenance',
    'technical debt reduction',
    'legacy system modernization',
    'software consultancy Nordics',
    'project controls consultancy',
    'Primavera P6 consultant',
    'Primavera P6 scheduling services',
    'planning engineer consultancy',
    'delay and schedule risk analysis',
    'EPCI project planning',
    'cost-loaded scheduling',
    'EU software consultancy',
    'European software development partner',
    'remote software engineering team',
    'remote development team Europe',
    'nearshore software development EU',
    'hire remote developers Europe',
    'EU based AI consultancy',
    // city terms, generated so the list can never drift from CITIES / the
    // visible Locations band
    ...CITIES.flatMap(([city]) => [
      `software development company ${city}`,
      `AI development company ${city}`,
      `frontend developers ${city}`,
      `backend developers ${city}`,
      `full stack developers ${city}`,
      `app development ${city}`,
      `IT consultancy ${city}`,
    ]),
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Tech Debt Nordics',
    locale: 'en_US',
    type: 'website',
    images: ['/assets/techdebt.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/assets/techdebt.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

// Structured data so search engines read the offering as B2B software
// engineering (frontend, backend, full-stack, AI, native apps, support) rather
// than inferring "web agency" from the copy alone.
const ORGANIZATION_LD = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Tech Debt Nordics',
  legalName: 'Tech Debt Nordics AB',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/techdebt-mark.png`,
  image: `${SITE_URL}/assets/techdebt.png`,
  description: DESCRIPTION,
  email: 'info@techdebtnordics.se',
  telephone: '+46722898436',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Stockholm',
    addressCountry: 'SE',
  },
  areaServed: [
    ...CITIES.map(([name, region, country]) => ({
      '@type': 'City',
      name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: name,
        addressRegion: region,
        addressCountry: country,
      },
    })),
    // As a Swedish AB we can supply services freely across the EU/EEA, so the
    // whole bloc is listed alongside the individual markets we already work in.
    ...[
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Germany',
      'Netherlands',
      'France',
      'Spain',
      'Italy',
      'Ireland',
      'Belgium',
      'Poland',
      'Portugal',
      'Austria',
      'Switzerland',
      'United Kingdom',
      'United Arab Emirates',
      'Saudi Arabia',
      'Jordan',
      'Syria',
    ].map((name) => ({ '@type': 'Country', name })),
    { '@type': 'AdministrativeArea', name: 'European Union' },
    { '@type': 'AdministrativeArea', name: 'European Economic Area' },
    { '@type': 'Place', name: 'Europe' },
    { '@type': 'Place', name: 'Nordics' },
    { '@type': 'Place', name: 'Middle East' },
    // remote delivery has no geographic limit
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: [
    'Frontend engineering',
    'Backend engineering',
    'Full-stack development',
    'Artificial intelligence',
    'Generative AI',
    'Large language models',
    'Retrieval-augmented generation',
    'AI agents',
    'Native mobile app development',
    'Cloud and platform engineering',
    'Enterprise integration',
    'Payments and checkout',
    'Technical debt reduction',
    'Website support and maintenance',
    'Project planning and controls',
    'Primavera P6 scheduling',
    'Cost-loaded planning and forecasting',
    'Delay and schedule risk analysis',
    'EPCI and infrastructure mega-projects',
  ],
  serviceType: [
    'B2B software engineering',
    'Frontend engineering',
    'Backend and API engineering',
    'Full-stack development',
    'AI engineering',
    'Native and cross-platform app development',
    'Cloud and platform engineering',
    'Integration engineering',
    'Application support and maintenance',
    'Project planning and controls',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering services',
    itemListElement: [
      'AI Engineering: LLM, RAG, agents and AI-assisted delivery',
      'Frontend Engineering: React, Next.js, TypeScript',
      'Backend & API Engineering: Java, Spring Boot, Node.js, Go',
      'Native & Cross-Platform Apps: iOS, Android, React Native',
      'Cloud & Platform Engineering: Azure, AWS, GCP, Kubernetes',
      'Integration Engineering: Kafka, Apache Camel, APIs',
      'Payments & Checkout Engineering',
      'Technical Debt Audit & Modernization',
      'Support & Maintenance',
      'Project Planning & Controls: Primavera P6, cost-loaded planning, delay and schedule risk analysis, Power BI reporting',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

// Names the site as an entity distinct from the company, and lets Google
// associate the two. Emitted in the same @graph as the organization.
const WEBSITE_LD = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Tech Debt Nordics',
  description: DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

// One graph rather than separate script tags, so the @id references between
// the nodes actually resolve for consumers.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [ORGANIZATION_LD, WEBSITE_LD],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${chakraPetch.variable} ${rajdhani.variable} ${shareTechMono.variable} saldo-backdrop antialiased flex min-h-dvh flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <NavBar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
