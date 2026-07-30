'use client';

import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Reveal from './Reveal';

export const SERVICES = [
  {
    n: '01',
    title: 'Tech Debt Audit',
    points: [
      'Platform assessment',
      'Debt quantification',
      'Prioritized roadmap',
    ],
    outcome: 'Actionable plan, measurable impact.',
    icon: 'audit',
  },
  {
    n: '02',
    title: 'Software Architecture',
    points: ['Scalable design', 'System strategy', 'Technical leadership'],
    outcome: 'Resilient architecture built for scale.',
    icon: 'architecture',
  },
  {
    n: '03',
    title: 'Integration Engineering',
    points: ['Event-driven design', 'Apache Camel, Kafka', 'APIs & messaging'],
    outcome: 'Reliable integrations that scale.',
    icon: 'integration',
  },
  {
    n: '04',
    title: 'Payments & Checkout',
    points: [
      'Payment platform design',
      'Checkout optimization',
      'Klarna, Botim, PaymentIQ',
    ],
    outcome: 'Secure, high-performing payment experiences.',
    icon: 'payments',
  },
  {
    n: '05',
    title: 'Frontend Engineering',
    points: [
      'React, Next.js, TypeScript',
      'Performance focused',
      'Accessible by design',
    ],
    outcome: 'Fast, accessible interfaces users love.',
    icon: 'frontend',
  },
  {
    n: '06',
    title: 'Cloud & Platform Engineering',
    points: [
      'Azure, AWS, GCP',
      'Cloud-native delivery',
      'Kubernetes, Docker',
      'CI/CD & IaC',
    ],
    outcome: 'Scalable platforms in the cloud.',
    icon: 'cloud',
  },
  {
    n: '07',
    title: 'Project Planning & Controls',
    points: [
      'Primavera P6 scheduling',
      'Cost-loaded planning & forecasting',
      'Delay & schedule risk analysis',
      'Power BI portfolio reporting',
    ],
    outcome: 'Predictable delivery for complex mega-projects.',
    icon: 'planning',
  },
];

// fixed height pattern for the bottom signal-meter ticks
const TICKS = [4, 7, 10, 6, 8, 5, 9, 4, 7, 11, 6, 8, 5, 9, 4, 7, 10, 6];

// per-card glow: tint (cyan-dominant, pink accents) + where the light sits
const GLOW = [
  { rgb: '53, 210, 230', x: '22%', y: '-6%', i: '0.30' },
  { rgb: '255, 70, 160', x: '80%', y: '8%', i: '0.24' },
  { rgb: '170, 238, 255', x: '48%', y: '26%', i: '0.26' },
  { rgb: '53, 210, 230', x: '26%', y: '42%', i: '0.22' },
  { rgb: '255, 70, 160', x: '82%', y: '30%', i: '0.26' },
  { rgb: '170, 238, 255', x: '52%', y: '-4%', i: '0.24' },
  { rgb: '53, 210, 230', x: '30%', y: '12%', i: '0.28' },
];

export const ServiceIcon: FC<{ name: string }> = ({ name }) => {
  const p = {
    width: 62,
    height: 62,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const dot = { fill: 'currentColor', stroke: 'none' as const };
  switch (name) {
    case 'audit':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="21" />
          <circle cx="32" cy="32" r="13" />
          <circle cx="32" cy="32" r="4.5" {...dot} />
          <path d="M32 5v7M32 52v7M5 32h7M52 32h7" />
          <circle cx="44" cy="20" r="2.6" {...dot} />
        </svg>
      );
    case 'architecture':
      return (
        <svg {...p}>
          <rect x="24" y="8" width="16" height="12" rx="2" />
          <rect x="7" y="42" width="16" height="12" rx="2" />
          <rect x="41" y="42" width="16" height="12" rx="2" />
          <path d="M32 20v10M15 30h34M15 30v12M49 30v12" />
        </svg>
      );
    case 'integration':
      return (
        <svg {...p}>
          <circle cx="32" cy="14" r="4" />
          <circle cx="15" cy="42" r="4" />
          <circle cx="49" cy="42" r="4" />
          <circle cx="32" cy="33" r="5" />
          <path d="M32 18v10M28 36 19 40M36 36 45 40" />
        </svg>
      );
    case 'payments':
      return (
        <svg {...p}>
          <rect x="7" y="15" width="37" height="27" rx="4" />
          <path d="M7 24h37" />
          <path d="M13 35h9" />
          <path d="M45 32 53 35v6c0 4-3.5 6-8 8-4.5-2-8-4-8-8v-6Z" />
          <path d="M41.5 41.5 44 44l4.5-5.5" />
        </svg>
      );
    case 'frontend':
      return (
        <svg {...p}>
          <rect x="8" y="12" width="48" height="40" rx="4" />
          <path d="M8 22h48" />
          <circle cx="14" cy="17" r="1.6" {...dot} />
          <circle cx="20" cy="17" r="1.6" {...dot} />
          <rect x="13" y="28" width="13" height="17" rx="1.5" />
          <path d="M31 29h16M31 35h16M31 41h10" />
        </svg>
      );
    case 'planning':
      return (
        <svg {...p}>
          <rect x="10" y="13" width="28" height="7" rx="2.5" />
          <rect x="22" y="28" width="28" height="7" rx="2.5" />
          <rect x="14" y="43" width="22" height="7" rx="2.5" />
          <path d="M30 8v48" />
          <circle cx="30" cy="8" r="2.4" {...dot} />
        </svg>
      );
    case 'cloud':
    default:
      return (
        <svg {...p}>
          <path d="M20 33h21a8 8 0 0 0 1-16A11 11 0 0 0 18 21a7 7 0 0 0 2 12Z" />
          <rect x="15" y="39" width="34" height="8" rx="2" />
          <rect x="15" y="49" width="34" height="8" rx="2" />
          <circle cx="21" cy="43" r="1.5" {...dot} />
          <circle cx="21" cy="53" r="1.5" {...dot} />
        </svg>
      );
  }
};

// left/right chevrons for the scroll arrows
const NavArrow: FC<{ dir: 'prev' | 'next' }> = ({ dir }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={dir === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
);

const ServicesSection: FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  // whether the strip overflows, and whether we're pinned to either end —
  // drives the arrows' enabled state and the edge fade masks.
  const [edge, setEdge] = useState({ scroll: false, start: true, end: false });

  const measure = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setEdge({
      scroll: el.scrollWidth > el.clientWidth + 1,
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // scroll by roughly one card + gap per click
  const nudge = (d: number) => () => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.svc-tile');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: d * step, behavior: 'smooth' });
  };

  // fade a given edge only when there's hidden content that way
  const canPrev = edge.scroll && !edge.start;
  const canNext = edge.scroll && !edge.end;
  const mask =
    `linear-gradient(90deg, ${canPrev ? 'transparent 0' : '#000 0'}, ` +
    `#000 44px, #000 calc(100% - 44px), ` +
    `${canNext ? 'transparent 100%' : '#000 100%'})`;

  return (
    <section id="services" className="page-bottom px-6 pt-6">
      <Reveal>
        <div className="mx-auto mb-12 max-w-6xl text-center">
          <h2 className="t-heading text-3xl sm:text-4xl md:text-5xl">
            <span className="text-white">Pay down the </span>
            <span className="neon-word pink neon-flicker">debt</span>
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="svc-strip-wrap mx-auto max-w-[1320px]">
          <button
            type="button"
            className={`svc-nav svc-nav-prev${canPrev ? '' : ' is-off'}`}
            onClick={nudge(-1)}
            aria-label="Scroll services left"
          >
            <NavArrow dir="prev" />
          </button>
          <div
            className="svc-strip"
            ref={stripRef}
            onScroll={measure}
            style={{ WebkitMaskImage: mask, maskImage: mask }}
          >
            {SERVICES.map((s, i) => (
              <div
                className="svc-tile"
                key={s.title}
                style={
                  {
                    '--off': i % 2 === 0 ? '-20px' : '20px',
                    '--glow-rgb': GLOW[i].rgb,
                    '--gx': GLOW[i].x,
                    '--gy': GLOW[i].y,
                    '--gi': GLOW[i].i,
                    animationDelay: `${i * 0.6}s`,
                  } as CSSProperties
                }
              >
                <div className="svc-ico neon-icon">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3 className="svc-title t-card-title">{s.title}</h3>
                <ul className="svc-bullets">
                  {s.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="svc-outcome">
                  <span className="svc-outcome-label">Outcome</span>
                  <p className="svc-outcome-text card-copy">{s.outcome}</p>
                </div>
                <div className="svc-ticks" aria-hidden="true">
                  {TICKS.map((h, k) => (
                    <i key={k} style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={`svc-nav svc-nav-next${canNext ? '' : ' is-off'}`}
            onClick={nudge(1)}
            aria-label="Scroll services right"
          >
            <NavArrow dir="next" />
          </button>
        </div>
      </Reveal>
    </section>
  );
};

export default ServicesSection;
