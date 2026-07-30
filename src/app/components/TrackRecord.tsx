import React, { CSSProperties, FC } from 'react';
import Reveal from './Reveal';

// Companies the team has built and scaled software at, from the team's CVs
// (Mosaab, Sayf, Anwar) plus Yazan's prior workplace (Ubiquiti). Pedigree, not
// signed clients — see the "Built & scaled at" framing. `mark` is a neon
// monogram coin (real trademarked logos aren't used).
// `logo` is a file in /public/assets/logos (recolored to neon via CSS mask).
// Companies without one fall back to a monogram coin — drop their SVG in that
// folder and add `logo` here to complete the set.
export const COMPANIES: { name: string; mark: string; logo?: string }[] = [
  { name: 'Klarna', mark: 'K', logo: 'klarna.svg' },
  { name: 'Tietoevry', mark: 'TE', logo: 'tietoevry.svg' },
  { name: 'Tink', mark: 'TK', logo: 'tink.svg' },
  { name: 'Visa', mark: 'V', logo: 'visa.svg' },
  { name: 'PaymentIQ', mark: 'PIQ', logo: 'paymentiq.png' },
  { name: 'Botim', mark: 'B', logo: 'botim.png' },
  { name: 'Kindred', mark: 'KD', logo: 'kindred.png' },
  { name: 'NKT', mark: 'NKT', logo: 'nkt.png' },
  { name: 'Ubiquiti', mark: 'U', logo: 'ubiquiti.svg' },
];

const TrackRecord: FC = () => (
  <section id="track-record" className="track-record py-8">
    <Reveal>
      <div className="mx-auto mb-4 max-w-5xl px-6 text-center">
        <p className="tr-lead loc-sign">Built &amp; scaled at</p>
      </div>
    </Reveal>

    <div className="logo-cyl-scene">
      <div
        className="logo-cyl"
        style={{ '--n': COMPANIES.length } as CSSProperties}
      >
        {COMPANIES.map((c, i) => (
          <div
            className="logo-face"
            key={c.name}
            style={{ '--i': i } as CSSProperties}
          >
            {c.logo ? (
              <span
                className="logo-img"
                style={
                  {
                    WebkitMaskImage: `url(/assets/logos/${c.logo})`,
                    maskImage: `url(/assets/logos/${c.logo})`,
                  } as CSSProperties
                }
              />
            ) : (
              <span className="logo-coin">{c.mark}</span>
            )}
            <span className="logo-name">{c.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* static, readable fallback shown when the user prefers reduced motion */}
    <ul className="logo-flat">
      {COMPANIES.map((c) => (
        <li className="logo-flat-item" key={c.name}>
          {c.name}
        </li>
      ))}
    </ul>
  </section>
);

export default TrackRecord;
