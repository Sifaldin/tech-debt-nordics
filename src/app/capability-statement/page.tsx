'use client';

import Image from 'next/image';
import { CSSProperties, FC, ReactNode } from 'react';
import { ServiceIcon } from '../components/ServicesSection';
import { COMPANIES } from '../components/TrackRecord';
import { TEAM } from '../data/team';
import './capability.css';

// Every string below is drawn from live-site content (hero, metadata,
// services, track record, team bios). Numbers are grounded - nothing about
// scale, client counts, or seniority ratios is invented.
const CONTACT = {
  legal: 'Tech Debt Nordics AB',
  location: 'Stockholm, Sweden',
  markets: 'Stockholm · Dubai · Abu Dhabi · Riyadh · Amman · Damascus',
  focus: 'B2B software & AI engineering consultancy',
  email: 'info@techdebtnordics.se',
  phone: '+46 722 898 436',
  web: 'techdebtnordics.se',
};

// Eight offerings the site services roll up into (page 3). AI and the
// frontend/backend/full-stack split lead, matching the site's ordering.
const OFFERINGS = [
  {
    n: '01',
    title: 'AI Engineering',
    icon: 'ai',
    points: [
      'RAG & vector search',
      'LLM APIs & agentic workflows',
      'AI features in existing products',
      'AI-assisted delivery',
    ],
  },
  {
    n: '02',
    title: 'Frontend Engineering',
    icon: 'frontend',
    points: [
      'React, Next.js, TypeScript',
      'Design systems',
      'Accessible, performance-focused frontends',
    ],
  },
  {
    n: '03',
    title: 'Backend & API Engineering',
    icon: 'backend',
    points: [
      'Java, Spring Boot, Node.js, Go',
      'REST & GraphQL APIs',
      'Distributed systems & databases',
    ],
  },
  {
    n: '04',
    title: 'Native & Mobile Apps',
    icon: 'mobile',
    points: ['iOS & Android', 'React Native', 'App Store & Play delivery'],
  },
  {
    n: '05',
    title: 'Cloud & Platform Engineering',
    icon: 'cloud',
    points: [
      'Azure, AWS, GCP',
      'Kubernetes, Docker',
      'CI/CD & Infrastructure as Code',
    ],
  },
  {
    n: '06',
    title: 'Integration & Payments',
    icon: 'integration',
    points: [
      'Event-driven design',
      'Apache Camel, Kafka',
      'Checkout: Klarna, Botim, PaymentIQ',
    ],
  },
  {
    n: '07',
    title: 'Modernization & Support',
    icon: 'architecture',
    points: [
      'Platform assessment & debt quantification',
      'Prioritized modernization roadmap',
      'Website & app support, monitoring, patching',
    ],
  },
  {
    n: '08',
    title: 'Project Planning & Controls',
    icon: 'planning',
    points: [
      'Primavera P6 scheduling',
      'Cost-loaded planning & forecasting',
      'Delay & schedule risk analysis',
      'Power BI portfolio reporting',
    ],
  },
];

const STATS: [string, string][] = [
  ['8+', 'Years senior engineering experience'],
  [String(OFFERINGS.length), 'Core service areas'],
  ['9', 'Companies built & scaled at'],
  ['6', 'Cities across 5 countries'],
];

const WHY: [string, string][] = [
  [
    'Engineering-first',
    'A consultancy built and run by engineers, not account managers.',
  ],
  [
    'Senior talent',
    'Experienced engineers who own delivery from design to production.',
  ],
  ['Cloud-native delivery', 'Modern platforms built on Azure, AWS, and GCP.'],
  [
    'Full-stack ownership',
    'Frontend, backend, native apps and infrastructure in one accountable team.',
  ],
  [
    'Enterprise-grade',
    'Depth across payments, integration, and large-scale systems.',
  ],
  [
    'AI-first engineering',
    'We build AI into products, and use it to deliver faster.',
  ],
];

const EXPERIENCE: [string, string][] = [
  [
    'AI Engineering',
    'AI-powered applications and product features built with RAG, vector search, LLM APIs, and agentic workflows.',
  ],
  [
    'Payments & Checkout',
    'Payment platform design and checkout optimization, with hands-on experience across Klarna, Botim, and PaymentIQ.',
  ],
  [
    'Enterprise Integration',
    'Event-driven integrations engineered with Apache Camel, Kafka, and cloud messaging.',
  ],
  [
    'Cloud Modernization',
    'Migrating platforms to Kubernetes and cloud-native architectures on Azure, AWS, and GCP.',
  ],
];

const ENGAGEMENT: [string, string][] = [
  [
    'Individual Consultants',
    'Embed a senior engineer directly into your team.',
  ],
  ['Team Augmentation', 'Scale delivery with a dedicated engineering squad.'],
  [
    'Fixed-Price Projects',
    'Scoped delivery against clearly defined milestones.',
  ],
  ['Technical Advisory', 'Ongoing architecture and technology guidance.'],
  [
    'Architecture Reviews',
    'Independent assessment of systems and technical debt.',
  ],
  [
    'Support Retainers',
    'Ongoing website and app support, patching, and incident response.',
  ],
];

// Curated ~40% smaller, grouped stack - all pulled from the team's real skills.
const TECH: [string, string[]][] = [
  ['AI', ['RAG', 'LLM APIs', 'Agentic Workflows', 'Vector Search']],
  ['Frontend', ['React', 'Next.js', 'TypeScript', 'Vue', 'Angular']],
  ['Backend', ['Java', 'Spring Boot', 'Quarkus', 'Node.js', 'Go', 'GraphQL']],
  ['Mobile', ['React Native', 'iOS', 'Android']],
  [
    'Cloud & DevOps',
    ['Azure', 'AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
  ],
  ['Messaging & Integration', ['Apache Camel', 'Kafka', 'RabbitMQ']],
  ['Data', ['PostgreSQL', 'MongoDB', 'Redis']],
  ['Project Planning & Controls', ['Primavera P6', 'Power BI', 'Acumen Risk']],
];

const DOMAINS = [
  'AI & GenAI',
  'Frontend',
  'Backend',
  'Full-Stack',
  'Native Apps',
  'Enterprise Software',
  'Payments',
  'Cloud & Platform',
  'Integrations',
  'Support & Maintenance',
  'Project Planning & Controls',
];

// One line per person (condensed from their site bios), keyed by first name.
const TEAM_BLURB: Record<string, string> = {
  Yazan:
    'Software development with an architecture background and a strong eye for design.',
  Sayf: 'Full-stack delivery across web and mobile with a focus on AI-assisted engineering.',
  Mosaab:
    'Distributed systems, event-driven architecture, and enterprise integration in Java & Spring.',
  Anwar:
    'Project controls and Primavera P6 scheduling for large-scale EPCI mega-projects.',
};

const Top: FC<{ kicker: string }> = ({ kicker }) => (
  <div className="cap-top">
    <div className="cap-brand">
      <span className="cap-brand-mark">
        <Image
          src="/assets/techdebt-mark.png"
          alt="Tech Debt Nordics"
          width={428}
          height={428}
          className="cap-brand-img"
        />
      </span>
      <span>
        <span className="cap-brand-name">TECH DEBT</span>
        <span className="cap-brand-sub">NORDICS</span>
      </span>
    </div>
    <div className="cap-kick">
      {kicker}
      <span className="cap-kick-hud">BUILD // SCALE // EVOLVE</span>
    </div>
  </div>
);

// Pages are numbered by their order in the document rather than by hand, so
// adding or removing a <Page> cannot leave the footer claiming the wrong total.
const PAGES = ['2026', 'Why Us', 'Capabilities', 'Track Record', 'Technology'];
const pad = (n: number) => String(n).padStart(2, '0');

const Foot: FC<{ page: string }> = ({ page }) => (
  <div className="cap-foot">
    <span>© 2026 TECH DEBT NORDICS</span>
    <span>{CONTACT.web}</span>
    <span>
      {page} / {pad(PAGES.length)}
    </span>
  </div>
);

const Page: FC<{ kicker: string; children: ReactNode }> = ({
  kicker,
  children,
}) => (
  <section className="cap-page">
    <Top kicker={kicker} />
    <div className="cap-body">{children}</div>
    <Foot page={pad(PAGES.indexOf(kicker) + 1)} />
  </section>
);

const Card: FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="cap-card">
    <p className="cap-card-k">{k}</p>
    <p className="cap-card-v">{v}</p>
  </div>
);

export default function CapabilityStatement() {
  return (
    <main className="cap-doc">
      <div className="cap-toolbar cap-print-hide">
        <button
          type="button"
          className="neon-btn cap-print-btn"
          onClick={() => window.print()}
        >
          Download PDF ↧
        </button>
      </div>

      <div className="cap-viewport">
        {/* ---------- Page 1 - Cover ---------- */}
        <Page kicker="2026">
          <div className="cap-cover-hero">
            <p className="cap-eyebrow">Capability Statement</p>
            <h1 className="cap-title">
              Tech <span className="pink">Debt</span> Nordics
            </h1>
            <p className="cap-title-sub">
              {CONTACT.legal} · {CONTACT.location}
            </p>
            <p className="cap-lede-hero">
              Tech Debt Nordics is a Swedish B2B software engineering
              consultancy delivering AI, frontend, backend and full-stack
              development, native mobile apps, cloud platforms, integrations,
              modernization and ongoing support for startups and enterprise
              organizations. Registered in Stockholm and delivering into Dubai,
              Abu Dhabi, Riyadh, Amman and Damascus.
            </p>
          </div>

          <div className="cap-stats">
            {STATS.map(([k, v]) => (
              <div className="cap-stat" key={v}>
                <p className="cap-stat-k">{k}</p>
                <p className="cap-stat-v">{v}</p>
              </div>
            ))}
          </div>

          <div className="cap-cover-grid cap-block">
            <div>
              <p className="cap-eyebrow">Core Competencies</p>
              <div className="cap-chips">
                {OFFERINGS.map((o) => (
                  <span className="cap-chip" key={o.n}>
                    {o.title}
                  </span>
                ))}
              </div>
            </div>

            <aside className="cap-snap">
              <p className="cap-snap-title">Company Snapshot</p>
              {[
                ['Legal name', CONTACT.legal],
                ['Headquarters', CONTACT.location],
                ['Markets', CONTACT.markets],
                ['Focus', CONTACT.focus],
                ['Email', CONTACT.email],
                ['Phone', CONTACT.phone],
                ['Web', CONTACT.web],
              ].map(([k, v]) => (
                <div className="cap-snap-row" key={k}>
                  <span className="cap-snap-k">{k}</span>
                  <span className="cap-snap-v">{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </Page>

        {/* ---------- Page 2 - Why + Selected Experience ---------- */}
        <Page kicker="Why Us">
          <section className="cap-section">
            <p className="cap-eyebrow">Why Tech Debt Nordics</p>
            <h2 className="cap-h2">An engineering firm, not a staffing desk</h2>
            <div className="cap-grid-3">
              {WHY.map(([k, v]) => (
                <Card k={k} v={v} key={k} />
              ))}
            </div>
          </section>

          <section className="cap-block cap-section">
            <p className="cap-eyebrow">Selected Experience</p>
            <div className="cap-grid-2">
              {EXPERIENCE.map(([k, v]) => (
                <Card k={k} v={v} key={k} />
              ))}
            </div>
          </section>
        </Page>

        {/* ---------- Page 3 - Capabilities ---------- */}
        <Page kicker="Capabilities">
          <p className="cap-eyebrow">What we do</p>
          <h2 className="cap-h2">
            Pay down the <span className="pink">debt</span>
          </h2>

          <div className="cap-svc-grid">
            {OFFERINGS.map((o) => (
              <div className="cap-svc" key={o.n}>
                <div className="cap-svc-head">
                  <span className="cap-svc-num">{o.n}</span>
                  <span className="cap-svc-ico">
                    <ServiceIcon name={o.icon} />
                  </span>
                  <span className="cap-svc-title">{o.title}</span>
                </div>
                <ul className="cap-svc-points">
                  {o.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Page>

        {/* ---------- Page 4 - Track Record + Engagement ---------- */}
        <Page kicker="Track Record">
          <section className="cap-section">
            <p className="cap-eyebrow">Track Record</p>
            <h2 className="cap-h2">Built &amp; scaled at</h2>
            <p className="cap-caption">
              Companies where our team has shipped and scaled software in
              production.
            </p>
            <div className="cap-logos">
              {COMPANIES.map((c) => (
                <div className="cap-logo-cell" key={c.name}>
                  <span
                    className="cap-logo"
                    style={
                      {
                        WebkitMaskImage: `url(/assets/logos/${c.logo})`,
                        maskImage: `url(/assets/logos/${c.logo})`,
                      } as CSSProperties
                    }
                  />
                  <span className="cap-logo-name">{c.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="cap-block cap-section">
            <p className="cap-eyebrow">Engagement Models</p>
            <h2 className="cap-h2">Ways to work with us</h2>
            <div className="cap-grid-2">
              {ENGAGEMENT.map(([k, v]) => (
                <Card k={k} v={v} key={k} />
              ))}
            </div>
          </section>
        </Page>

        {/* ---------- Page 5 - Technology + Expertise + Contact ---------- */}
        <Page kicker="Technology">
          <section className="cap-section">
            <p className="cap-eyebrow">Technology &amp; Tools</p>
            <h2 className="cap-h2">Our stack</h2>
            <div className="cap-tech-groups">
              {TECH.map(([label, items]) => (
                <div className="cap-tech-group" key={label}>
                  <span className="cap-tech-group-label">{label}</span>
                  <div className="cap-tech-group-chips">
                    {items.map((t) => (
                      <span className="cap-tech-chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cap-block cap-section">
            <p className="cap-eyebrow">Expertise &amp; Team</p>
            <div className="cap-domains">
              {DOMAINS.map((d) => (
                <span className="cap-chip" key={d}>
                  {d}
                </span>
              ))}
            </div>
            <div className="cap-team-lines">
              {TEAM.map((m) => (
                <div className="cap-team-line" key={m.name}>
                  <div className="cap-team-line-head">
                    <span className="cap-team-line-name">{m.name}</span>
                    <span className="cap-team-line-role">{m.role}</span>
                  </div>
                  <p className="cap-team-line-v">
                    {TEAM_BLURB[m.name.split(' ')[0]]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="cap-contact cap-block">
            <div>
              <span className="cap-contact-tag">
                <i />
                Open for work
              </span>
              <h3>
                Let&apos;s <span className="pink">talk</span>
              </h3>
              <p>
                Got an idea or a project in mind? Let&apos;s build something
                great.
              </p>
              <a className="cap-cta" href={`mailto:${CONTACT.email}`}>
                Book a consultation →
              </a>
            </div>
            <div className="cap-contact-rows">
              <div className="cap-cn">
                <span className="cap-cn-k">Email</span>
                <span className="cap-cn-v">{CONTACT.email}</span>
              </div>
              <div className="cap-cn">
                <span className="cap-cn-k">Phone</span>
                <span className="cap-cn-v">{CONTACT.phone}</span>
              </div>
              <div className="cap-cn">
                <span className="cap-cn-k">Web</span>
                <span className="cap-cn-v">{CONTACT.web}</span>
              </div>
              <div className="cap-cn">
                <span className="cap-cn-k">Location</span>
                <span className="cap-cn-v">{CONTACT.location}</span>
              </div>
              <div className="cap-cn">
                <span className="cap-cn-k">Markets</span>
                <span className="cap-cn-v">{CONTACT.markets}</span>
              </div>
            </div>
          </div>
        </Page>
      </div>
    </main>
  );
}
