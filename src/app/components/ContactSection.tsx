import React, { FC } from 'react';
import Reveal from './Reveal';

const ContactSection: FC = () => (
  <section id="contact" className="page-top page-bottom px-6">
    <div className="mx-auto max-w-4xl">
      <div className="t-hud mb-4 flex items-center justify-between px-1 text-[10px] !tracking-[0.22em] text-slate-500">
        <span>T.D.N {'//'} CONTACT</span>
        <span className="text-signal/70">
          BUILD {'//'} SCALE {'//'} EVOLVE
        </span>
      </div>

      <Reveal>
        <div className="neon-stage">
          <div className="neon-sign text-center">
            <span className="neon-accent">
              <i />
              Open for work
            </span>

            <h3 className="t-hero mb-4 text-6xl leading-[0.95] md:text-8xl">
              <span className="neon-word">Let&apos;s </span>
              <span className="neon-word pink">Talk</span>
            </h3>

            <p className="card-copy mx-auto mb-8 max-w-lg text-slate-300/85">
              A new AI feature, a frontend or backend team to plug into, a
              native app, or a platform that needs rescuing. Tell us what you
              need built and we&apos;ll tell you how we&apos;d do it.
            </p>

            <a href="mailto:info@techdebtnordics.se" className="neon-btn">
              Contact us →
            </a>

            <div className="card-copy mt-8 space-y-1.5 text-sm text-slate-300/85">
              <p>
                Email{' '}
                <a href="mailto:info@techdebtnordics.se" className="link-neon">
                  info@techdebtnordics.se
                </a>
              </p>
              <p>
                Phone{' '}
                <a href="tel:+46722898436" className="link-neon t-num">
                  +46 722 898 436
                </a>
              </p>
              <p className="pt-1 text-slate-400">
                Stockholm · Dubai · Abu Dhabi · Riyadh · Amman · Damascus
              </p>
            </div>
          </div>
          <span className="neon-floor" aria-hidden="true" />
        </div>
      </Reveal>
    </div>
  </section>
);

export default ContactSection;
