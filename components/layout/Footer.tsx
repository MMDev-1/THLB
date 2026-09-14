import Link from 'next/link';

import { IconFacebook, IconInstagram, IconTikTok } from '@/components/icons';
import type { NavLink } from '@/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface FooterColumn {
  title: string;
  links: NavLink[];
}

interface FooterProps {
  columns: FooterColumn[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Footer({ columns }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      {/* ---- Top: Newsletter + Link columns ---- */}
      <div className="site-footer__top">
        {/* Newsletter / Brand column */}
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo" aria-label="The Hoodie LB — Home">
            THE HOODIE LB
          </Link>
          <p className="site-footer__tagline">
            Comfort you can wear — designed for lounging, bingeing, and everything in between.
          </p>

          {/* Social icons */}
          <div className="site-footer__social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social-link"
              aria-label="Instagram"
            >
              <IconInstagram width={20} height={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social-link"
              aria-label="Facebook"
            >
              <IconFacebook width={20} height={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social-link"
              aria-label="TikTok"
            >
              <IconTikTok width={20} height={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title} className="site-footer__column">
            <h3 className="site-footer__column-title">{col.title}</h3>
            <ul className="site-footer__list">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="site-footer__bottom">
        <p className="site-footer__copyright">
          &copy; {currentYear} The Hoodie LB. All rights reserved.
        </p>
        <div className="site-footer__legal">
          <Link href="/pages/privacy" className="site-footer__legal-link">
            Privacy Policy
          </Link>
          <span className="site-footer__legal-separator" aria-hidden="true">
            ·
          </span>
          <Link href="/pages/terms" className="site-footer__legal-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
