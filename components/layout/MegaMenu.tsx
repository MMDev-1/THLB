'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import type { MegaMenuData } from '@/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface MegaMenuProps {
  id: string;
  data: MegaMenuData;
  isOpen: boolean;
  viewAllHref: string;
  viewAllLabel: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  /** When true, focus first link on open (keyboard activation) */
  focusOnOpen: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MegaMenu({
  id,
  data,
  isOpen,
  viewAllHref,
  viewAllLabel,
  onMouseEnter,
  onMouseLeave,
  focusOnOpen,
}: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Focus the first link when opened via keyboard */
  useEffect(() => {
    if (isOpen && focusOnOpen && panelRef.current) {
      requestAnimationFrame(() => {
        const firstLink =
          panelRef.current?.querySelector<HTMLAnchorElement>('a');
        firstLink?.focus();
      });
    }
  }, [isOpen, focusOnOpen]);

  return (
    <div
      ref={panelRef}
      id={id}
      className={`mega-menu ${isOpen ? 'mega-menu--open' : ''}`}
      role="region"
      aria-label={`${viewAllLabel} menu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mega-menu__inner">
        {/* ---- Link columns ---- */}
        <div className="mega-menu__content">
          <div className="mega-menu__columns">
            {data.columns.map((column) => (
              <div key={column.title} className="mega-menu__column">
                <h3 className="mega-menu__column-title">{column.title}</h3>
                <ul className="mega-menu__column-links">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="mega-menu__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link href={viewAllHref} className="mega-menu__view-all">
            View all {viewAllLabel.toLowerCase()}
          </Link>
        </div>

        {/* ---- Promo tiles ---- */}
        {data.promos && data.promos.length > 0 && (
          <div className="mega-menu__promos">
            {data.promos.map((promo) => (
              <Link
                key={promo.href}
                href={promo.href}
                className="mega-menu__promo"
              >
                <div className="mega-menu__promo-image">
                  {promo.badge && (
                    <span className="mega-menu__promo-badge">
                      {promo.badge}
                    </span>
                  )}
                </div>
                <span className="mega-menu__promo-title">{promo.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
