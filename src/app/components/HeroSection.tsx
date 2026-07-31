import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const HeroSection: FC = () => (
  <section id="top" className="page-top relative overflow-hidden px-6 pb-10">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
      {/* Left - headline */}
      <div className="relative">
        <span className="t-num absolute -top-8 left-0 hidden text-xs tracking-[0.4em] text-slate-500 lg:block"></span>
        <h1 className="t-hero glow mb-4 text-5xl leading-[0.95] text-white md:text-7xl xl:text-8xl">
          Tech Debt
          <br />
          Nordics
        </h1>
        {/* keyword-bearing subhead: the terms clients actually search for
            (B2B, frontend, backend, full-stack, AI) sit directly under the h1 */}
        <p className="hero-sub eyebrow mb-5 !text-[0.8rem] leading-relaxed">
          B2B frontend · backend · full-stack · AI engineering
        </p>
        <p className="mb-9 max-w-lg text-base leading-relaxed text-slate-300/85 md:text-lg">
          We&apos;re engineers, not a web shop. Senior full-stack, backend,
          frontend and AI specialists who build whatever the problem needs: web
          platforms, native apps, AI features, cloud infrastructure, and the
          ongoing support to keep it all running.
        </p>
        <Link href="/contact" className="neon-btn">
          Book a consultation →
        </Link>
      </div>

      {/* Right - tech-stack graphic layered over the city backdrop */}
      {/* overhang capped at 20px: the section's px-6 leaves only 24px of gutter
          when the viewport sits at the container's max width, so a bigger pull
          would put the graphic within 3px of the edge (or under it) at 1024px
          and 1280px exactly */}
      <div className="techstack-wrap w-full min-w-0 lg:w-[calc(100%_+_1.25rem)] lg:-mr-5 xl:-mr-5">
        <Image
          src="/assets/techstack.png"
          alt="Tech Debt Nordics technology stack: languages, frameworks, integration, messaging, cloud and DevOps, data, tooling, and monitoring."
          width={1280}
          height={841}
          className="techstack-img"
          priority
        />
        <span className="techstack-sweep" aria-hidden="true" />
      </div>
    </div>
  </section>
);

export default HeroSection;
