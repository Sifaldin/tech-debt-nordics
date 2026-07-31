import React, { CSSProperties, FC } from 'react';

// Replaces the 642kB techstack.png. The raster could not gain an AI row, and
// AI is now the lead service, so the hero image contradicted the headline.
// Rendered as markup instead: the stack is real text (indexable, and every
// term here is one clients search for), it costs no image bytes, and adding a
// row is a line of code.
//
// The original's vendor logos are deliberately not reproduced. Redrawing
// third-party brand marks by hand would be both inaccurate and a trademark
// liability; the HUD bar treatment carries the design on its own.
//
// Integration and Messaging are merged: the PNG listed Kafka and RabbitMQ in
// both, and merging keeps the panel the same height with the AI row added.
const ROWS: { icon: string; label: string; items: string[] }[] = [
  {
    icon: 'ai',
    label: 'AI',
    items: ['RAG', 'LLM APIs', 'Agentic Workflows', 'Vector Search'],
  },
  {
    icon: 'code',
    label: 'Languages',
    items: ['Java', 'TypeScript', 'JavaScript', 'Go'],
  },
  {
    icon: 'layers',
    label: 'Frameworks',
    items: ['Spring Boot', 'Quarkus', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    icon: 'share',
    label: 'Integration & Messaging',
    // four, not five: a fifth wraps to a second line and strands a divider at
    // the line start. REST APIs is the one dropped, since it already appears
    // under Backend & API Engineering in the services strip.
    items: ['Apache Camel', 'Apache Kafka', 'RabbitMQ', 'ActiveMQ'],
  },
  {
    icon: 'cloud',
    label: 'Cloud / DevOps',
    items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
  },
  {
    icon: 'data',
    label: 'Data',
    items: ['PostgreSQL', 'MariaDB', 'MongoDB', 'Redis'],
  },
  {
    icon: 'tools',
    label: 'Tools & Testing',
    items: [
      'GitHub',
      'GitHub Actions',
      'Argo CD',
      'REST Assured',
      'Playwright',
    ],
  },
  {
    icon: 'monitor',
    label: 'Monitoring',
    items: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog'],
  },
];

const RowIcon: FC<{ name: string }> = ({ name }) => {
  const p = {
    width: 22,
    height: 22,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 3.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const dot = { fill: 'currentColor', stroke: 'none' as const };
  switch (name) {
    case 'ai':
      return (
        <svg {...p}>
          <circle cx="14" cy="18" r="4" />
          <circle cx="14" cy="46" r="4" />
          <circle cx="32" cy="32" r="5.5" />
          <circle cx="50" cy="20" r="4" />
          <circle cx="50" cy="44" r="4" />
          <path d="M17.5 20.5 27 28.5M17.5 43.5 27 35.5M37 28.5 46.5 22.5M37 35.5 46.5 41.5" />
        </svg>
      );
    case 'code':
      return (
        <svg {...p}>
          <path d="M22 20 8 32l14 12M42 20l14 12-14 12M36 14 28 50" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...p}>
          <path d="M32 8 8 20l24 12 24-12L32 8Z" />
          <path d="M8 32l24 12 24-12M8 44l24 12 24-12" />
        </svg>
      );
    case 'share':
      return (
        <svg {...p}>
          <circle cx="48" cy="14" r="6" />
          <circle cx="48" cy="50" r="6" />
          <circle cx="14" cy="32" r="6" />
          <path d="M19.5 29 42.5 17M19.5 35 42.5 47" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...p}>
          <path d="M20 44h22a10 10 0 0 0 1.5-20A13 13 0 0 0 18 28a8 8 0 0 0 2 16Z" />
          <path d="M32 34v14M26 42l6 6 6-6" />
        </svg>
      );
    case 'data':
      return (
        <svg {...p}>
          <ellipse cx="32" cy="16" rx="18" ry="7" />
          <path d="M14 16v32c0 3.9 8.1 7 18 7s18-3.1 18-7V16" />
          <path d="M14 32c0 3.9 8.1 7 18 7s18-3.1 18-7" />
        </svg>
      );
    case 'tools':
      return (
        <svg {...p}>
          <path d="M43 8a13 13 0 0 0-11.8 18.4L8 49.6 14.4 56l23.2-23.2A13 13 0 0 0 56 21l-8.5 8.5-6-1.5-1.5-6L48.5 13A13 13 0 0 0 43 8Z" />
        </svg>
      );
    case 'monitor':
    default:
      return (
        <svg {...p}>
          <rect x="7" y="12" width="50" height="34" rx="4" />
          <path d="M24 56h16M32 46v10" />
          <path d="M16 34l8-9 7 6 9-12 8 8" />
          <circle cx="24" cy="25" r="1.8" {...dot} />
        </svg>
      );
  }
};

const TechStack: FC = () => (
  <div className="ts-panel">
    <div className="ts-head">
      <span className="ts-head-label t-hud">Tech Stack</span>
      <span className="ts-head-line" aria-hidden="true" />
    </div>

    <ul className="ts-rows">
      {ROWS.map((row, i) => (
        <li
          className="ts-row"
          key={row.label}
          style={{ '--d': `${i * 0.09}s` } as CSSProperties}
        >
          <span className="ts-row-ico" aria-hidden="true">
            <RowIcon name={row.icon} />
          </span>
          <span className="ts-row-label t-hud">{row.label}</span>
          <span className="ts-row-rule" aria-hidden="true" />
          <span className="ts-row-items">
            {row.items.map((item) => (
              <span className="ts-chip" key={item}>
                {item}
              </span>
            ))}
          </span>
          <span className="ts-row-nub" aria-hidden="true" />
        </li>
      ))}
    </ul>
  </div>
);

export default TechStack;
