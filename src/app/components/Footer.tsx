'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

const LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

const Footer: FC = () => {
  const pathname = usePathname();
  // hrefs can carry a hash ('/#top'), so compare on the path part only
  const isActive = (href: string) => pathname === (href.split('#')[0] || '/');

  return (
    <footer className="chrome-bar">
      <span className="chrome-edge top-0" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <Link href="/" className="flex items-center gap-3 text-signal">
          <span className="brand-mark">
            <Image
              src="/assets/techdebt-mark.png"
              alt="Tech Debt Nordics"
              width={26}
              height={26}
            />
          </span>
          <span className="leading-none">
            <span className="t-heading block text-sm text-white">
              TECH DEBT
            </span>
            <span className="t-hud block text-[8px] !tracking-[0.4em] text-signal">
              NORDICS
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`nav-link t-hud text-xs text-slate-400 transition-colors hover:text-signal${isActive(link.href) ? ' is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="loc-sign t-hud flex items-center gap-2 text-xs !tracking-[0.16em]">
          <span className="loc-dot" aria-hidden="true" />
          STOCKHOLM, SWEDEN
        </div>
      </div>
      <div className="t-hud border-t border-edge/60 px-6 py-4 text-center text-[10px] !tracking-[0.2em] text-slate-500">
        © 2026 TECH DEBT NORDICS - ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
