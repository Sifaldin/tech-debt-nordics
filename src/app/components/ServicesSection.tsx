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

// `practice` marks a card as belonging to a distinct practice rather than the
// software engineering line. Absent on the engineering cards, set on the
// project controls ones so the two are never presented as the same offering.
type Service = {
  n: string;
  title: string;
  points: string[];
  outcome: string;
  icon: string;
  practice?: string;
};

// Ordered by what we want to be found for: AI and the three engineering
// disciplines (frontend / backend / full-stack) lead, then the delivery
// capabilities that show we take on whatever the problem needs. Project
// controls sits at the end as its own practice.
export const SERVICES: Service[] = [
  {
    n: '01',
    title: 'AI Engineering',
    points: [
      'RAG & vector search',
      'LLM APIs & agentic workflows',
      'AI features in existing products',
      'AI-assisted delivery',
    ],
    outcome: 'AI that ships to production, not to a demo.',
    icon: 'ai',
  },
  {
    n: '02',
    title: 'Frontend Engineering',
    points: [
      'React, Next.js, TypeScript',
      'Design systems',
      'Performance focused',
      'Accessible by design',
    ],
    outcome: 'Fast, accessible interfaces users love.',
    icon: 'frontend',
  },
  {
    n: '03',
    title: 'Backend & API Engineering',
    points: [
      'Java, Spring Boot, Node.js, Go',
      'REST & GraphQL APIs',
      'Distributed systems',
      'Databases & performance',
    ],
    outcome: 'Backends that hold up under real load.',
    icon: 'backend',
  },
  {
    n: '04',
    title: 'Full-Stack Product Delivery',
    points: [
      'End-to-end ownership',
      'Discovery to production',
      'One accountable team',
    ],
    outcome: 'From idea to live product, no handoff gaps.',
    icon: 'fullstack',
  },
  {
    n: '05',
    title: 'Native & Mobile Apps',
    points: [
      'iOS & Android',
      'React Native',
      'App Store & Play delivery',
      'Offline & device APIs',
    ],
    outcome: 'Apps that feel native, on every device.',
    icon: 'mobile',
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
    title: 'Integration Engineering',
    points: ['Event-driven design', 'Apache Camel, Kafka', 'APIs & messaging'],
    outcome: 'Reliable integrations that scale.',
    icon: 'integration',
  },
  {
    n: '08',
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
    n: '09',
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
    n: '10',
    title: 'Software Architecture',
    points: ['Scalable design', 'System strategy', 'Technical leadership'],
    outcome: 'Resilient architecture built for scale.',
    icon: 'architecture',
  },
  {
    n: '11',
    title: 'Support & Maintenance',
    points: [
      'Website & app support',
      'Upgrades & security patching',
      'Monitoring & incident response',
      'Retainer or on-demand',
    ],
    outcome: 'Someone who answers when it breaks.',
    icon: 'support',
  },
  // --- Project controls. A separate practice from the software work above:
  // different discipline, different clients, different team (Anwar). Tagged so
  // the cards read as their own thing rather than another engineering service.
  {
    n: '12',
    title: 'Planning & Scheduling',
    practice: 'Project Planning & Controls',
    points: [
      'Primavera P6 scheduling',
      'Cost-loaded & resource-loaded plans',
      'Baseline development & forecasting',
      'Progress measurement',
    ],
    outcome: 'A schedule the whole programme can plan against.',
    icon: 'planning',
  },
  {
    n: '13',
    title: 'Schedule Risk & Delay Analysis',
    practice: 'Project Planning & Controls',
    points: [
      'Acumen Risk & QSRA',
      'Delay and disruption analysis',
      'Claims and EOT support',
      'Power BI portfolio reporting',
    ],
    outcome: 'Know where the programme slips before it slips.',
    icon: 'risk',
  },
];

// fixed height pattern for the bottom signal-meter ticks
const TICKS = [4, 7, 10, 6, 8, 5, 9, 4, 7, 11, 6, 8, 5, 9, 4, 7, 10, 6];

// per-card glow: tint (cyan-dominant, pink accents) + where the light sits.
// Shorter than SERVICES on purpose - indexed modulo, so the pattern repeats
// and adding a service never needs a matching entry here.
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
    // neural graph + spark - AI engineering
    case 'ai':
      return (
        <svg {...p}>
          <circle cx="13" cy="18" r="3.4" />
          <circle cx="13" cy="46" r="3.4" />
          <circle cx="32" cy="32" r="5" />
          <circle cx="51" cy="20" r="3.4" />
          <circle cx="51" cy="44" r="3.4" />
          <path d="M16 20.5 27.5 29M16 43.5 27.5 35M36.5 29.5 48 22M36.5 34.5 48 42" />
          <path d="M32 6v5M29.5 8.5h5" />
        </svg>
      );
    // layered server rack + database - backend & APIs
    case 'backend':
      return (
        <svg {...p}>
          <rect x="11" y="10" width="42" height="13" rx="3" />
          <rect x="11" y="27" width="42" height="13" rx="3" />
          <path d="M11 47v-3h42v3" />
          <ellipse cx="32" cy="52" rx="11" ry="4.5" />
          <circle cx="18" cy="16.5" r="1.7" {...dot} />
          <circle cx="18" cy="33.5" r="1.7" {...dot} />
          <path d="M40 16.5h7M40 33.5h7" />
        </svg>
      );
    // window over a stack - full-stack ownership, top to bottom
    case 'fullstack':
      return (
        <svg {...p}>
          <rect x="10" y="8" width="44" height="18" rx="3" />
          <path d="M10 15h44" />
          <circle cx="15.5" cy="11.5" r="1.4" {...dot} />
          <rect x="10" y="30" width="44" height="11" rx="3" />
          <rect x="10" y="45" width="44" height="11" rx="3" />
          <circle cx="16" cy="35.5" r="1.6" {...dot} />
          <circle cx="16" cy="50.5" r="1.6" {...dot} />
          <path d="M26 35.5h20M26 50.5h20" />
        </svg>
      );
    // handset - native & mobile apps
    case 'mobile':
      return (
        <svg {...p}>
          <rect x="19" y="6" width="26" height="52" rx="5" />
          <path d="M19 15h26M19 49h26" />
          <path d="M28.5 10.5h7" />
          <circle cx="32" cy="53.5" r="2" {...dot} />
          <path d="M26 25h12M26 32h12M26 39h8" />
        </svg>
      );
    // S-curve trending off a baseline with a warning marker - schedule risk
    case 'risk':
      return (
        <svg {...p}>
          <path d="M9 54h46" />
          <path d="M9 47h4" />
          <path d="M13 47c9 0 12-24 20-24s11 12 21 12" strokeDasharray="5 4" />
          <path d="M13 51c9 0 13-16 21-16s11 8 20 8" />
          <path d="M46 10v9" />
          <circle cx="46" cy="24" r="1.9" {...dot} />
        </svg>
      );
    // shield with a check - ongoing support & maintenance
    case 'support':
      return (
        <svg {...p}>
          <path d="M32 6 12 14v16c0 14 8.5 22 20 28 11.5-6 20-14 20-28V14L32 6Z" />
          <path d="M23 32.5 29.5 39 42 26" />
        </svg>
      );
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
  // whether the strip overflows, and whether we're pinned to either end -
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
    <section id="services" className="px-6 pt-6 pb-20">
      <Reveal>
        <div className="mx-auto mb-12 max-w-6xl text-center">
          <p className="eyebrow mb-3">What we build</p>
          <h2 className="t-heading text-3xl sm:text-4xl md:text-5xl">
            <span className="text-white">Pay down the </span>
            <span className="neon-word pink neon-flicker">debt</span>
          </h2>
          <p className="card-copy mx-auto mt-5 max-w-2xl text-slate-300/85">
            B2B engineering across the whole stack: AI, frontend, backend,
            native apps, cloud and the support that keeps them alive. If it
            needs building, we build it.
          </p>
          <p className="card-copy mx-auto mt-3 max-w-2xl text-slate-400">
            Separately, we run a Project Planning &amp; Controls practice for
            construction and energy programmes. Different discipline, different
            team, same bar for delivery.
          </p>
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
            {SERVICES.map((s, i) => {
              const g = GLOW[i % GLOW.length];
              // a labelled rule opens each new practice, so the strip reads as
              // grouped runs rather than one undifferentiated list of 13
              const opensPractice = !!s.practice && !SERVICES[i - 1]?.practice;
              return (
                <React.Fragment key={s.title}>
                  {opensPractice && (
                    <div className="svc-divider">
                      <span className="svc-divider-line" aria-hidden="true" />
                      <span className="svc-divider-label t-hud">
                        {s.practice}
                      </span>
                      <span className="svc-divider-line" aria-hidden="true" />
                    </div>
                  )}
                  <div
                    className="svc-tile"
                    style={
                      {
                        '--off': i % 2 === 0 ? '-20px' : '20px',
                        '--glow-rgb': g.rgb,
                        '--gx': g.x,
                        '--gy': g.y,
                        '--gi': g.i,
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
                </React.Fragment>
              );
            })}
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
