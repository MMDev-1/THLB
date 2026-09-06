'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IconMenu, IconSearch, IconShoppingBag, IconUser } from '@/components/icons';
import { Logo } from '@/components/icons/Logo';
import type { NavItem } from '@/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface HeaderProps {
  navItems: NavItem[];
  /** Use "transparent" on the homepage hero; defaults to "solid". */
  variant?: 'solid' | 'transparent';
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADER_H = 88;
const HEADER_H_COMPACT = 64;
const SCROLL_THRESHOLD = 80;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Header({ navItems, variant = 'solid' }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [cartCount] = useState(0); // will be wired to cart store later
  const [badgeBump, setBadgeBump] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevCartCountRef = useRef(0);

  /* ---- Scroll-based compact mode via IntersectionObserver ---- */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel scrolls out of view, header becomes compact
        setIsCompact(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: `-${SCROLL_THRESHOLD}px 0px 0px 0px` },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* ---- Cart badge bump animation ---- */
  useEffect(() => {
    if (cartCount !== prevCartCountRef.current && cartCount > 0) {
      const bumpOn = setTimeout(() => setBadgeBump(true), 0);
      const bumpOff = setTimeout(() => setBadgeBump(false), 300);
      prevCartCountRef.current = cartCount;
      return () => {
        clearTimeout(bumpOn);
        clearTimeout(bumpOff);
      };
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  /* ---- CSS class construction ---- */
  const headerClasses = [
    'header',
    isCompact ? 'header--compact' : '',
    variant === 'transparent' && !isCompact ? 'header--transparent' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleMobileMenuOpen = useCallback(() => {
    // Will be wired to mobile drawer in a later sub-task
    // Dispatching a custom event so the drawer can listen
    window.dispatchEvent(new CustomEvent('toggle-mobile-nav'));
  }, []);

  return (
    <>
      {/* Sentinel element — sits at the very top of the page.
          When it scrolls past SCROLL_THRESHOLD, the header compacts. */}
      <div
        ref={sentinelRef}
        className="header-sentinel"
        aria-hidden="true"
      />

      {/* Skip-to-content — first focusable element */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header
        className={headerClasses}
        style={{
          '--header-h': `${isCompact ? HEADER_H_COMPACT : HEADER_H}px`,
        } as React.CSSProperties}
      >
        <div className="header__inner">
          {/* ---- Left zone ---- */}
          <div className="header__left">
            {/* Mobile hamburger */}
            <button
              className="header__icon-btn header__hamburger"
              onClick={handleMobileMenuOpen}
              aria-label="Open menu"
              type="button"
            >
              <IconMenu width={22} height={22} />
            </button>

            {/* Desktop nav links */}
            <nav className="header__nav" aria-label="Main navigation">
              <ul className="header__nav-list">
                {navItems.map((item) => (
                  <li key={item.label} className="header__nav-item">
                    <Link href={item.href} className="header__nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ---- Center zone — logo ---- */}
          <div className="header__center">
            <Link href="/" className="header__logo-link" aria-label="The Hoodie LB — Home">
              <Logo className="header__logo" />
            </Link>
          </div>

          {/* ---- Right zone — icons ---- */}
          <div className="header__right">
            <button
              className="header__icon-btn"
              aria-label="Search"
              type="button"
            >
              <IconSearch width={20} height={20} />
            </button>

            <Link
              href="/account"
              className="header__icon-btn"
              aria-label="Account"
            >
              <IconUser width={20} height={20} />
            </Link>

            <button
              className="header__icon-btn header__cart-btn"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              type="button"
            >
              <IconShoppingBag width={20} height={20} />
              {cartCount > 0 && (
                <span
                  className={`header__cart-badge ${badgeBump ? 'header__cart-badge--bump' : ''}`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
