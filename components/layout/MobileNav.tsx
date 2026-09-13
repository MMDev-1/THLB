'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  IconChevronDown,
  IconFacebook,
  IconInstagram,
  IconSearch,
  IconTikTok,
  IconUser,
  IconX,
} from '@/components/icons';
import type { NavItem } from '@/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface MobileNavProps {
  navItems: NavItem[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  /* ---- Open / close helpers ---- */
  const open = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setExpandedIndex(null);
    /* Restore focus to the element that opened the drawer */
    requestAnimationFrame(() => {
      prevFocusRef.current?.focus();
    });
  }, []);

  /* ---- Listen for the toggle-mobile-nav custom event from Header ---- */
  useEffect(() => {
    const handler = () => {
      setIsOpen((prev) => {
        if (prev) {
          setExpandedIndex(null);
          requestAnimationFrame(() => {
            prevFocusRef.current?.focus();
          });
          return false;
        }
        prevFocusRef.current = document.activeElement as HTMLElement;
        return true;
      });
    };
    window.addEventListener('toggle-mobile-nav', handler);
    return () => window.removeEventListener('toggle-mobile-nav', handler);
  }, []);

  /* ---- Close on route change ---- */
  useEffect(() => {
    if (isOpen) {
      close();
    }
    // Only react to pathname changes, not isOpen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ---- Body scroll lock ---- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ---- Focus trap + Escape ---- */
  useEffect(() => {
    if (!isOpen) return;

    /* Focus close button on open */
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key !== 'Tab') return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  /* ---- Accordion toggle ---- */
  const toggleAccordion = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  /* ---- Collect all promo tiles from mega menus ---- */
  const allPromos = navItems.flatMap(
    (item) => item.megaMenu?.promos ?? [],
  );

  return (
    <>
      {/* ---- Overlay ---- */}
      <div
        className={`mobile-nav-overlay ${isOpen ? 'mobile-nav-overlay--visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ---- Drawer ---- */}
      <div
        ref={drawerRef}
        className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* ---- Top bar: close + search ---- */}
        <div className="mobile-nav__top">
          <button
            ref={closeButtonRef}
            className="mobile-nav__close"
            onClick={close}
            aria-label="Close menu"
            type="button"
          >
            <IconX width={22} height={22} />
          </button>

          <Link
            href="/search"
            className="mobile-nav__search"
            onClick={close}
          >
            <IconSearch width={18} height={18} />
            <span>Search</span>
          </Link>
        </div>

        {/* ---- Menu items ---- */}
        <nav className="mobile-nav__menu" aria-label="Mobile menu">
          <ul className="mobile-nav__list">
            {navItems.map((item, index) => {
              const hasChildren =
                item.megaMenu && item.megaMenu.columns.length > 0;
              const isExpanded = expandedIndex === index;

              return (
                <li key={item.label} className="mobile-nav__item">
                  {hasChildren ? (
                    <>
                      <button
                        className={`mobile-nav__link mobile-nav__link--parent ${
                          isExpanded ? 'mobile-nav__link--expanded' : ''
                        }`}
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isExpanded}
                        type="button"
                      >
                        {item.label}
                        <IconChevronDown
                          className={`mobile-nav__chevron ${
                            isExpanded ? 'mobile-nav__chevron--open' : ''
                          }`}
                          width={16}
                          height={16}
                        />
                      </button>

                      <div
                        className={`mobile-nav__accordion ${
                          isExpanded ? 'mobile-nav__accordion--open' : ''
                        }`}
                      >
                        <ul className="mobile-nav__sub-list">
                          {/* View all link */}
                          <li>
                            <Link
                              href={item.href}
                              className="mobile-nav__sub-link mobile-nav__sub-link--view-all"
                            >
                              View all {item.label}
                            </Link>
                          </li>
                          {item.megaMenu!.columns.map((column) => (
                            <li key={column.title}>
                              <span className="mobile-nav__sub-heading">
                                {column.title}
                              </span>
                              <ul className="mobile-nav__sub-sub-list">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="mobile-nav__sub-link"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="mobile-nav__link">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---- Promo tiles horizontal scroll ---- */}
        {allPromos.length > 0 && (
          <div className="mobile-nav__promos">
            <div className="mobile-nav__promos-scroll">
              {allPromos.map((promo) => (
                <Link
                  key={promo.href}
                  href={promo.href}
                  className="mobile-nav__promo"
                >
                  <div className="mobile-nav__promo-image">
                    {promo.badge && (
                      <span className="mobile-nav__promo-badge">
                        {promo.badge}
                      </span>
                    )}
                  </div>
                  <span className="mobile-nav__promo-title">
                    {promo.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ---- Footer ---- */}
        <div className="mobile-nav__footer">
          <Link href="/account" className="mobile-nav__footer-link">
            <IconUser width={18} height={18} />
            <span>My Account</span>
          </Link>

          <div className="mobile-nav__currency">
            <span className="mobile-nav__currency-label">Currency</span>
            <span className="mobile-nav__currency-value">USD $</span>
          </div>

          <div className="mobile-nav__social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav__social-link"
              aria-label="Instagram"
            >
              <IconInstagram width={20} height={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav__social-link"
              aria-label="Facebook"
            >
              <IconFacebook width={20} height={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav__social-link"
              aria-label="TikTok"
            >
              <IconTikTok width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
