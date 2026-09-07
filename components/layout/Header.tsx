'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IconMenu, IconSearch, IconShoppingBag, IconUser } from '@/components/icons';
import { Logo } from '@/components/icons/Logo';
import { MegaMenu } from '@/components/layout/MegaMenu';
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
const HOVER_INTENT_MS = 150;
const HOVER_CLOSE_MS = 150;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Header({ navItems, variant = 'solid' }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [cartCount] = useState(0);
  const [badgeBump, setBadgeBump] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [keyboardActivated, setKeyboardActivated] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevCartCountRef = useRef(0);
  const hoverIntentRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenuIndexRef = useRef<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Keep ref in sync so stable callbacks can read current state */
  useEffect(() => {
    openMenuIndexRef.current = openMenuIndex;
  }, [openMenuIndex]);

  /* ---- Scroll-based compact mode via IntersectionObserver ---- */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
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

  /* ---- Close mega menu on Escape ---- */
  useEffect(() => {
    if (openMenuIndex === null) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const idx = openMenuIndexRef.current;
        setOpenMenuIndex(null);
        setKeyboardActivated(false);
        if (idx !== null) triggerRefs.current[idx]?.focus();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [openMenuIndex]);

  /* ---- Close when focus leaves the header entirely ---- */
  useEffect(() => {
    if (openMenuIndex === null) return;

    const handleFocusOut = (e: FocusEvent) => {
      const header = (e.currentTarget as Document).querySelector('.header');
      if (header && !header.contains(e.relatedTarget as Node)) {
        setOpenMenuIndex(null);
        setKeyboardActivated(false);
      }
    };

    document.addEventListener('focusout', handleFocusOut);
    return () => document.removeEventListener('focusout', handleFocusOut);
  }, [openMenuIndex]);

  /* ---- Cleanup hover timers ---- */
  useEffect(() => {
    return () => {
      if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  /* ---- Hover intent: open with delay, switch instantly ---- */
  const handleNavItemMouseEnter = useCallback(
    (index: number) => {
      if (!navItems[index]?.megaMenu) {
        // Hovering a plain link while a menu is open — start close
        if (openMenuIndexRef.current !== null) {
          if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
          closeTimerRef.current = setTimeout(() => {
            setOpenMenuIndex(null);
            setKeyboardActivated(false);
          }, HOVER_CLOSE_MS);
        }
        return;
      }

      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

      if (openMenuIndexRef.current !== null) {
        // Another panel already open — switch immediately
        if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
        setOpenMenuIndex(index);
        setKeyboardActivated(false);
      } else {
        // Nothing open — apply intent delay
        hoverIntentRef.current = setTimeout(() => {
          setOpenMenuIndex(index);
          setKeyboardActivated(false);
        }, HOVER_INTENT_MS);
      }
    },
    [navItems],
  );

  const handleNavItemMouseLeave = useCallback(() => {
    if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenMenuIndex(null);
      setKeyboardActivated(false);
    }, HOVER_CLOSE_MS);
  }, []);

  const handlePanelMouseEnter = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handlePanelMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setOpenMenuIndex(null);
      setKeyboardActivated(false);
    }, HOVER_CLOSE_MS);
  }, []);

  /* ---- Keyboard toggle for trigger buttons ---- */
  const handleTriggerClick = useCallback(
    (index: number) => {
      if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

      if (openMenuIndexRef.current === index) {
        setOpenMenuIndex(null);
        setKeyboardActivated(false);
      } else {
        setOpenMenuIndex(index);
        setKeyboardActivated(true);
      }
    },
    [],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTriggerClick(index);
      }
    },
    [handleTriggerClick],
  );

  /* ---- Mobile menu ---- */
  const handleMobileMenuOpen = useCallback(() => {
    window.dispatchEvent(new CustomEvent('toggle-mobile-nav'));
  }, []);

  /* ---- CSS class construction ---- */
  const headerClasses = [
    'header',
    isCompact ? 'header--compact' : '',
    variant === 'transparent' && !isCompact ? 'header--transparent' : '',
    openMenuIndex !== null && navItems[openMenuIndex]?.megaMenu
      ? 'header--mega-open'
      : '',
  ]
    .filter(Boolean)
    .join(' ');

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
                {navItems.map((item, index) => (
                  <li
                    key={item.label}
                    className="header__nav-item"
                    onMouseEnter={() =>
                      handleNavItemMouseEnter(index)
                    }
                    onMouseLeave={handleNavItemMouseLeave}
                  >
                    {item.megaMenu ? (
                      <button
                        ref={(el) => {
                          triggerRefs.current[index] = el;
                        }}
                        className={`header__nav-link header__nav-link--trigger ${
                          openMenuIndex === index
                            ? 'header__nav-link--active'
                            : ''
                        }`}
                        aria-expanded={openMenuIndex === index}
                        aria-controls={`mega-menu-${index}`}
                        onClick={() => handleTriggerClick(index)}
                        onKeyDown={(e) => handleTriggerKeyDown(e, index)}
                        type="button"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="header__nav-link"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ---- Center zone — logo ---- */}
          <div className="header__center">
            <Link
              href="/"
              className="header__logo-link"
              aria-label="The Hoodie LB — Home"
            >
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

        {/* ---- Mega Menu Panels ---- */}
        {navItems.map((item, index) =>
          item.megaMenu ? (
            <MegaMenu
              key={item.label}
              id={`mega-menu-${index}`}
              data={item.megaMenu}
              isOpen={openMenuIndex === index}
              viewAllHref={item.href}
              viewAllLabel={item.label}
              onMouseEnter={handlePanelMouseEnter}
              onMouseLeave={handlePanelMouseLeave}
              focusOnOpen={
                keyboardActivated && openMenuIndex === index
              }
            />
          ) : null,
        )}
      </header>

      {/* ---- Page backdrop when mega-menu is open ---- */}
      <div
        className={`mega-menu-backdrop ${
          openMenuIndex !== null && navItems[openMenuIndex]?.megaMenu
            ? 'mega-menu-backdrop--visible'
            : ''
        }`}
        onClick={() => {
          setOpenMenuIndex(null);
          setKeyboardActivated(false);
        }}
        aria-hidden="true"
      />
    </>
  );
}
