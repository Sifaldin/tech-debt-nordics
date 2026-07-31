import React, { CSSProperties, FC } from 'react';
import Reveal from './Reveal';

// Cities we take work in. Stockholm is the registered base; the rest are
// markets the team has delivered into (the Gulf and the Levant, via Botim in
// the UAE and 15+ years of EPCI mega-projects across the Middle East). Named
// explicitly rather than as "the Middle East" so each city is searchable.
export const LOCATIONS: { city: string; country: string; base?: boolean }[] = [
  { city: 'Stockholm', country: 'Sweden', base: true },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Abu Dhabi', country: 'UAE' },
  { city: 'Riyadh', country: 'Saudi Arabia' },
  { city: 'Amman', country: 'Jordan' },
  { city: 'Damascus', country: 'Syria' },
];

const Locations: FC = () => (
  <section id="locations" className="loc-band page-bottom px-6 pt-12">
    <Reveal>
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow mb-3">Where we work</p>
        <h2 className="loc-copy t-heading mb-4 text-2xl sm:text-3xl">
          EU company, global delivery
        </h2>
        <p className="loc-copy card-copy mx-auto mb-7 max-w-2xl">
          Tech Debt Nordics AB is a Swedish company, so we can contract and
          deliver anywhere in the EU and EEA with no visa or entity paperwork.
          We work remotely by default, and come on site when a project needs it.
        </p>

        {/* The two practices, side by side and separately labelled. They serve
            the same regions but are different disciplines with different
            teams, so they are never described in one merged sentence. */}
        <div className="loc-practices mx-auto mb-8 max-w-3xl">
          <div className="loc-practice">
            <span className="loc-practice-tag t-hud">Software engineering</span>
            <p className="loc-copy card-copy">
              B2B frontend, backend, full-stack and AI engineering across
              Europe, the Gulf and the Levant.
            </p>
          </div>
          <div className="loc-practice">
            <span className="loc-practice-tag t-hud is-controls">
              Project Planning &amp; Controls
            </span>
            <p className="loc-copy card-copy">
              Primavera P6 planning, scheduling and schedule risk analysis for
              construction and energy programmes, in those same regions.
            </p>
          </div>
        </div>

        <ul className="loc-grid">
          {LOCATIONS.map((l, i) => (
            <li
              className={`loc-chip${l.base ? ' is-base' : ''}`}
              key={l.city}
              style={{ animationDelay: `${(i % 6) * 0.28}s` } as CSSProperties}
            >
              <span className="loc-dot" aria-hidden="true" />
              <span className="loc-chip-text">
                <span className="loc-chip-city">{l.city}</span>
                <span className="loc-chip-country">{l.country}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="loc-reach t-hud mt-6 text-[10px] text-slate-400">
          + Anywhere in the EU &amp; EEA · Remote worldwide
        </p>
      </div>
    </Reveal>
  </section>
);

export default Locations;
