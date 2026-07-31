'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

const NavBar: FC = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();
  // hrefs can carry a hash ('/#top'), so compare on the path part only
  const isActive = (href: string) => pathname === (href.split('#')[0] || '/');
  const onContact = pathname === '/contact';

  return (
    <header className="chrome-bar sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-signal"
          onClick={close}
        >
          <span className="brand-mark">
            <Image
              src="/assets/techdebt-mark.png"
              alt="Tech Debt Nordics"
              width={30}
              height={30}
              priority
            />
          </span>
          <span className="leading-none">
            <span className="t-heading block text-base text-white">
              TECH DEBT
            </span>
            <span className="t-hud block text-[9px] !tracking-[0.4em] text-signal">
              NORDICS
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`nav-link t-hud text-xs${isActive(link.href) ? ' is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* On /contact the CTA would just reload the page. It stays in the DOM
            but invisible so the nav links keep their position - the header is
            sticky across pages, and dropping the element outright would shunt
            them sideways on this page only. */}
        <Link
          href="/contact"
          aria-hidden={onContact}
          className={`ghost-btn t-hud !px-4 !py-2 text-[11px] !tracking-[0.12em]${
            onContact ? ' invisible' : ''
          }`}
        >
          Book consultation →
        </Link>

        <button
          type="button"
          className="nav-toggle flex md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav-toggle-bars ${open ? 'is-open' : ''}`}>
            <i />
            <i />
            <i />
          </span>
        </button>
      </nav>

      {open && (
        <div className="mobile-menu flex flex-col md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`mobile-link t-hud${isActive(link.href) ? ' is-active' : ''}`}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
          {!onContact && (
            <Link
              href="/contact"
              className="neon-btn mobile-cta"
              onClick={close}
            >
              Book consultation →
            </Link>
          )}
        </div>
      )}

      <span className="chrome-edge bottom-0" aria-hidden="true" />
    </header>
  );
};

export default NavBar;
