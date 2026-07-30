'use client';

import Image from 'next/image';
import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Reveal from './Reveal';

// Sayf's stack, from his CV (frontend-leaning full-stack + strong AI/GenAI).
// Yazan reuses the same set per request.
const SAYF_SKILLS = [
  'RAG',
  'LLM APIs',
  'Agentic Workflows',
  'Vector Search',
  'React',
  'React Native',
  'Vue',
  'Angular',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Go',
  'Java',
  'Spring Boot',
  'GraphQL',
  'Kafka',
  'Redis',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'GCP',
  'Kubernetes',
  'Terraform',
];

interface Member {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  skills: string[];
}

export const TEAM: Member[] = [
  {
    name: 'Sayf Abbas',
    role: 'Senior Software Engineer',
    bio: 'I take joy in finding a problem worth solving as much as I enjoy implementing the solution. I’m a tireless results-driver, positive-minded, and passionate engineer who works across the stack with a slight preference to frontend. I love picking up new technologies and I’m passionate about AI-assisted development and the velocity it brings to engineering.',
    imageSrc: '/assets/sayf.jpeg',
    skills: SAYF_SKILLS,
  },
  {
    name: 'Mosaab Abbas',
    role: 'Senior Software Engineer',
    bio: 'Senior Backend Engineer with 8+ years designing distributed systems, event-driven architectures, and enterprise integration platforms with Java and Spring. Deep expertise in application modernization, cloud-native services, messaging, and performance optimization.',
    imageSrc: '/assets/mosaab.jpeg',
    skills: [
      'Java',
      'Spring Boot',
      'Quarkus',
      'Spring Security',
      'WebFlux',
      'GraphQL',
      'Apache Camel',
      'Kafka',
      'RabbitMQ',
      'Azure Service Bus',
      'AWS',
      'Azure',
      'Docker',
      'Kubernetes',
      'Terraform',
      'PostgreSQL',
      'DynamoDB',
      'Grafana',
      'Prometheus',
      'ELK Stack',
      'JUnit',
      'CI/CD',
      'GitHub Actions',
      'React',
    ],
  },
  {
    name: 'Anwar Abbas',
    role: 'Planning Lead',
    bio: 'Planning Lead with 15+ years delivering large-scale infrastructure and EPCI mega-projects across Europe and the Middle East. Expert in Primavera P6 scheduling, cost-loaded planning, delay analysis, risk management, and executive Power BI reporting.',
    imageSrc: '/assets/anwar.jpeg',
    skills: [
      'Primavera P6',
      'Power BI',
      'Acumen Risk',
      'AutoCAD',
      'Project Controls',
      'EPCI Scheduling',
      'Cost-Loaded Scheduling',
      'Delay Analysis',
      'Risk Analysis',
      'Stakeholder Mgmt',
      'Resource Planning',
      'Team Leadership',
    ],
  },
  {
    name: 'Yazan Abbas',
    role: 'Senior Software Engineer',
    bio: 'A fearless problem solving software developer. Able to self-direct and handle multiple, competing priorities. A background in architecture gives me a great eye for design, and I love to pick up new technology every now and then.',
    imageSrc: '/assets/yazan.jpeg',
    skills: SAYF_SKILLS,
  },
];

const TeamCarousel: FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  // the flat, untransformed element the wheel/touch gestures are captured on
  const sceneRef = useRef<HTMLDivElement>(null);
  // points at whichever face of the active card is currently showing (bio or
  // skills) — the thing the chevrons scroll.
  const faceRef = useRef<HTMLDivElement>(null);
  // a tap kicks off a ~0.7s orient/flip animation during which the card slides
  // under the cursor; `settleRef` marks when so we can tell "card moved" leaves
  // from real ones, and `overCardRef` tracks whether the pointer is on any card.
  const settleRef = useRef(0);
  const overCardRef = useRef(false);
  const [active, setActive] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [orient, setOrient] = useState(0);
  const [nav, setNav] = useState({ show: false, top: true, bottom: false });

  const N = TEAM.length;

  // read the cylinder's current spin angle (degrees) from its live transform
  const readSpinAngle = () => {
    const el = carouselRef.current;
    if (!el) return 0;
    const t = getComputedStyle(el).transform;
    if (!t || t === 'none') return 0;
    const p = new DOMMatrix(t).transformPoint(new DOMPoint(0, 0, 1, 0));
    return (Math.atan2(p.x, p.z) * 180) / Math.PI;
  };

  // Tap an inactive card: turn the cylinder so it faces front (flat) and show
  // its bio. Tap the active card again: flip between bio and skills. (Rotated
  // 3D faces can't be touch-scrolled, so facing front is what makes it work.)
  const select = (i: number) => {
    settleRef.current = Date.now();
    if (active === i) {
      setFlipped((f) => !f);
      return;
    }
    const spin = readSpinAngle();
    const target = -(spin + (i * 360) / N);
    // rotate the shortest way from the current orientation
    setOrient((cur) => cur + ((((target - cur) % 360) + 540) % 360) - 180);
    setActive(i);
    setFlipped(false);
  };

  // Which card is nearest the front right now — the spin keeps moving, so this
  // is read live off the transform rather than tracked in state.
  const frontIndex = () => {
    const spin = readSpinAngle();
    let best = 0;
    let bestOff = 360;
    for (let i = 0; i < N; i++) {
      // a card faces front when its world angle is a multiple of 360
      const a = (((orient + spin + (i * 360) / N) % 360) + 360) % 360;
      const d = Math.min(a, 360 - a);
      if (d < bestOff) {
        bestOff = d;
        best = i;
      }
    }
    return best;
  };

  // Step to the next/previous member on demand instead of waiting for the spin
  // to bring them round.
  const step = (dir: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const from = active ?? frontIndex();
    select((from + dir + N) % N);
  };

  // Leaving the card area (mouse out on desktop, tap outside a card on mobile)
  // lets the cylinder spin again. Keep `orient` where it is so it resumes from
  // the centered card instead of rotating back to that card's old slot first.
  const resume = () => {
    setActive(null);
    setFlipped(false);
  };

  const enterCard = () => {
    overCardRef.current = true;
  };

  // Leaving a card resumes the spin — but a tap's orient/flip animation slides
  // the card out from under a still cursor, firing a bogus leave. While that
  // animation is settling we defer and re-check: resume only if the pointer
  // truly isn't on a card once it finishes.
  const leaveCard = () => {
    overCardRef.current = false;
    const settling = 750 - (Date.now() - settleRef.current);
    if (settling > 0) {
      window.setTimeout(() => {
        if (!overCardRef.current) resume();
      }, settling);
      return;
    }
    resume();
  };

  // touch-scrolling doesn't work inside the 3D card on mobile Safari, so the
  // shown face gets small neon chevrons that scroll it programmatically.
  const measure = useCallback(() => {
    const el = faceRef.current;
    if (!el) {
      setNav({ show: false, top: true, bottom: false });
      return;
    }
    setNav({
      show: el.scrollHeight > el.clientHeight + 2,
      top: el.scrollTop <= 1,
      bottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 1,
    });
  }, []);

  useEffect(() => {
    measure();
  }, [active, flipped, measure]);

  // Hit-testing inside the card is not trustworthy: the cylinder runs a
  // compositor-driven transform animation under a perspective, so the browser
  // resolves "what's under the pointer" against a transform that doesn't match
  // what's painted — only a band of the card ever routes the wheel/drag to the
  // scroll port. So the gesture is captured on .carousel-scene, which is flat
  // and hit-tests normally, and applied to the shown face by hand (same trick
  // the chevrons use). Anywhere on the card — or the scene around it — scrolls.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // returns false when there's nothing to scroll or we're already at the end,
    // so the gesture falls through to the page instead of being swallowed
    const scrollShownFace = (dy: number) => {
      const el = faceRef.current;
      if (!el) return false;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return false;
      const next = Math.min(max, Math.max(0, el.scrollTop + dy));
      if (next === el.scrollTop) return false;
      el.scrollTop = next;
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (scrollShownFace(e.deltaY)) e.preventDefault();
    };

    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const dy = lastY - y;
      lastY = y;
      if (scrollShownFace(dy)) e.preventDefault();
    };

    // non-passive so preventDefault can cancel the page scroll / pan
    scene.addEventListener('wheel', onWheel, { passive: false });
    scene.addEventListener('touchstart', onTouchStart, { passive: true });
    scene.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      scene.removeEventListener('wheel', onWheel);
      scene.removeEventListener('touchstart', onTouchStart);
      scene.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const scrollFace = (dir: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    // at the top/bottom the chevron is off: still swallow the click (so it
    // can't bubble up and flip the card) but don't attempt to scroll, else
    // the content visibly bounces against the end.
    if ((dir < 0 && nav.top) || (dir > 0 && nav.bottom)) return;
    const el = faceRef.current;
    if (!el) return;
    // gentle step. The skills grid overflows by only a little, so step by a
    // fraction of its own overflow (~a few taps to traverse, capped small) so
    // it never lurches; the bio has more room, so a bigger fixed nudge.
    const step = flipped
      ? Math.max(8, Math.min((el.scrollHeight - el.clientHeight) / 3, 18))
      : 44;
    el.scrollBy({ top: dir * step, behavior: 'smooth' });
  };

  // Chevrons live inside whichever face is showing so they flip with the card.
  // Rendered only for the active card's shown, overflowing face.
  const chevrons = (
    <div className="card-scroll">
      <button
        type="button"
        className={`card-scroll-btn${nav.top ? ' is-off' : ''}`}
        aria-disabled={nav.top}
        onClick={scrollFace(-1)}
        aria-label="Scroll up"
      >
        <svg
          viewBox="0 0 24 24"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        className={`card-scroll-btn${nav.bottom ? ' is-off' : ''}`}
        aria-disabled={nav.bottom}
        onClick={scrollFace(1)}
        aria-label="Scroll down"
      >
        <svg
          viewBox="0 0 24 24"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );

  // A selected card holds the spin paused (steady through flip/orient). It's
  // cleared on leaving the card (card-3d onMouseLeave), so the pause is
  // card-scoped, not scene-wide.
  const frozen = active !== null;

  return (
    <section id="team" className="page-top page-bottom overflow-hidden px-6">
      <Reveal>
        <div className="mb-6 text-center">
          <h2 className="t-heading text-4xl md:text-5xl">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-signal to-progress bg-clip-text text-transparent">
              Team
            </span>
          </h2>
        </div>
      </Reveal>

      {/* the resume-on-leave lives on the wrapper so moving from the cylinder
          down to the prev/next controls doesn't restart the spin */}
      <div
        className="carousel-wrap mx-auto max-w-[860px]"
        onMouseLeave={resume}
      >
        <div
          ref={sceneRef}
          className={`carousel-scene ${frozen ? 'is-frozen' : ''}`}
          onClick={resume}
        >
          <div
            className="carousel-orient"
            style={{ transform: `rotateY(${orient}deg)` }}
          >
            <div className="carousel" ref={carouselRef}>
              {TEAM.map((member, i) => {
                const isActive = active === i;
                const isFlipped = isActive && flipped;
                const firstName = member.name.split(' ')[0];
                return (
                  <div
                    key={member.name}
                    className="card-3d"
                    onMouseEnter={enterCard}
                    onMouseLeave={leaveCard}
                    style={
                      {
                        '--i': `${i}`,
                        '--n': `${TEAM.length}`,
                      } as CSSProperties
                    }
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        select(i);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          select(i);
                        }
                      }}
                      aria-pressed={isFlipped}
                      aria-label={`${member.name} — tap to ${isActive ? 'flip' : 'focus'}`}
                      className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}
                    >
                      {/* Front — portrait + bio */}
                      <div className="card-face card-front items-center p-4 text-center">
                        {/* the whole inner area scrolls, not just the bio, so a
                            finger can land anywhere on the card */}
                        <div
                          className="card-scrollport items-center"
                          ref={isActive && !flipped ? faceRef : undefined}
                          onScroll={isActive && !flipped ? measure : undefined}
                        >
                          <div
                            className="card-portrait mb-2.5 rounded-full p-[2px]"
                            style={{
                              background:
                                'linear-gradient(135deg, var(--color-signal), var(--color-progress))',
                            }}
                          >
                            <Image
                              src={member.imageSrc}
                              alt={member.name}
                              className="rounded-full"
                              width={96}
                              height={96}
                            />
                          </div>
                          <h3 className="card-name">{member.name}</h3>
                          <p className="card-role mt-1.5 mb-2">{member.role}</p>
                          <p className="card-bio w-full text-left text-white">
                            {member.bio}
                          </p>
                        </div>
                        <span className="flip-hint">skills ↦</span>
                        {isActive && !flipped && nav.show && chevrons}
                      </div>

                      {/* Back — blinking neon skill chips */}
                      <div className="card-face card-back p-4">
                        <p className="eyebrow mb-2 pt-1 text-center !text-[9px]">
                          {firstName} · Stack
                        </p>
                        <div
                          className="card-scrollport"
                          ref={isActive && flipped ? faceRef : undefined}
                          onScroll={isActive && flipped ? measure : undefined}
                        >
                          <div className="skill-grid">
                            {member.skills.map((skill, si) => (
                              <span
                                key={skill}
                                className={`skill-chip${si % 2 ? ' alt' : ''}`}
                                style={
                                  {
                                    animationDelay: `${(si % 6) * 0.22}s`,
                                  } as CSSProperties
                                }
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="flip-hint">↩ back</span>
                        {isActive && flipped && nav.show && chevrons}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="carousel-base" aria-hidden="true" />
        </div>

        <div className="carousel-nav">
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={step(-1)}
            aria-label="Previous team member"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="carousel-dots">
            {TEAM.map((member, i) => (
              <button
                key={member.name}
                type="button"
                className={`carousel-dot${active === i ? ' is-on' : ''}`}
                aria-label={member.name}
                aria-current={active === i ? 'true' : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  select(i);
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-nav-btn"
            onClick={step(1)}
            aria-label="Next team member"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;
